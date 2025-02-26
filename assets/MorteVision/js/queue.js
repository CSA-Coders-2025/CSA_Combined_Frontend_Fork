// import uri
import { javaURI } from '../../js/api/config.js';

let assignment = null;
let currentQueue = [];
let person;

document.getElementById('addQueue').addEventListener('click', addToQueue);
document.getElementById('removeQueue').addEventListener('click', removeFromQueue);
document.getElementById('beginTimer').addEventListener('click', startTimer);

// Global array to store person objects fetched from backend for dropdown
let allPersons = [];

let timerInterval;
let timerlength;
let queueUpdateInterval;

const URL = javaURI + "/api/assignments/";
console.log(URL);

/* TIMER FUNCTION */
function startTimer() {
    let time = timerlength;
    document.getElementById('beginTimer').style.display = 'none';
    timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('timerDisplay').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} | Presentation Queue`;
        time--;
        if (time < 0) {
            clearInterval(timerInterval);
            moveToDoneQueue();
            alert("Timer is up! Your presentation is over.");
            document.getElementById('beginTimer').style.display = 'block';
            document.title = "Presentation Queue | Nighthawk Pages";
        }
    }, 1000);
}

// Expose startTimer globally
window.startTimer = startTimer;

/* QUEUE FUNCTIONS */
async function fetchQueue() {
    const response = await fetch(URL + `getQueue/${assignment}`);
    if (response.ok) {
        const data = await response.json();
        updateQueueDisplay(data);
    }
}

async function fetchTimerLength() {
    console.log("Fetching timer length...");
    const response = await fetch(URL + `getPresentationLength/${assignment}`);
    if (response.ok) {
        const data = await response.json();
        timerlength = data;
        document.getElementById('timerDisplay').textContent =
            `${Math.floor(timerlength / 60).toString().padStart(2, '0')}:${(timerlength % 60).toString().padStart(2, '0')}`;
    }
}

async function addToQueue() {
    let list = document.getElementById("notGoneList").children;
    let names = [];
    Array.from(list).forEach(child => {
        names.push(child.textContent);
    });
    if (!null) {
        await fetch(URL + `addToWaiting/${assignment}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([person])
        });
        fetchQueue();
    } else {
        alert("ERROR: You are not in the working list.");
    }
}

async function removeFromQueue() {
    let list = document.getElementById("waitingList").children;
    let names = [];
    Array.from(list).forEach(child => {
        names.push(child.textContent);
    });
    if (names.includes(person)) {
        await fetch(URL + `removeToWorking/${assignment}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([person])
        });
        fetchQueue();
    } else {
        alert("ERROR: You are not in the waiting list.");
    }
}

async function moveToDoneQueue() {
    const firstPerson = [currentQueue[0]];
    await fetch(URL + `doneToCompleted/${assignment}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(firstPerson)
    });
    fetchQueue();
}

async function resetQueue() {
    await fetch(URL + `resetQueue/${assignment}`, { method: 'PUT' });
    fetchQueue();
}

function updateQueueDisplay(queue) {
    currentQueue = queue.waiting;

    const notGoneList = document.getElementById('notGoneList');
    const waitingList = document.getElementById('waitingList');
    const doneList = document.getElementById('doneList');

    notGoneList.innerHTML = queue.working.map(p => `<div class="card">${p}</div>`).join('');
    waitingList.innerHTML = queue.waiting.map(p => `<div class="card">${p}</div>`).join('');
    doneList.innerHTML = queue.completed.map(p => `<div class="card">${p}</div>`).join('');

    // Update global person variable if needed
    if (!person.includes("|")) {
        const matchingPerson = queue.working.find(p => p.includes(person));
        if (matchingPerson) {
            person = matchingPerson;
        }
    }
}

/* PERSON / ASSIGNMENT FUNCTIONS */
async function fetchUser() {
    const response = await fetch(javaURI + `/api/person/get`, {
        method: 'GET',
        cache: "no-cache",
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
            'X-Origin': 'client'
        }
    });
    
    if (response.ok) {
        const userInfo = await response.json();
        person = userInfo.name;
        if (typeof person == 'undefined') {
            alert("Error: You are not logged in. Redirecting you to the login page.");
            let loc = window.location.href;
            loc = loc.split('/').slice(0, -2).join('/') || loc;
            window.location.href = loc + "/toolkit-login";
        }
    }
}

async function showAssignmentModal() {
    const modal = document.getElementById('assignmentModal');
    const modalDropdown = document.getElementById('modalAssignmentDropdown');

    const response = await fetch(URL + 'debug');
    if (response.ok) {
        const assignments = await response.json();
        modalDropdown.innerHTML = assignments.map(a =>
            `<option value="${a.id}">${a.name}</option>`
        ).join('');
    }

    modal.style.display = 'block';

    document.getElementById('confirmAssignment').addEventListener('click', () => {
        const selectedAssignment = modalDropdown.value;
        if (selectedAssignment) {
            assignment = selectedAssignment;
            fetchQueue();
            startQueueUpdateInterval(10);
            fetchTimerLength();
            modal.style.display = 'none';
        } else {
            alert('Please select an assignment.');
        }
    });
}

/* GROUP DROPDOWN FUNCTIONS */
// Fetch persons from backend and populate the group dropdown
async function fetchPersons() {
    const response = await fetch(javaURI + `/api/all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {} // Adjust if needed—some backends might expect an empty JSON object
    });
    if (response.ok) {
        allPersons = await response.json();
        populatePersonDropdown();
    } else {
        console.error("Failed to fetch persons");
    }
}

// Populate the dropdown with person names and their ids as values
function populatePersonDropdown() {
    const dropdown = document.getElementById("personGroupDropdown");
    dropdown.innerHTML = allPersons.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

// Get the currently selected person objects from the dropdown
function getSelectedPersons() {
    const dropdown = document.getElementById("personGroupDropdown");
    const selectedOptions = Array.from(dropdown.selectedOptions); // Get all selected options
    return selectedOptions.map(option => {
        return allPersons.find(p => String(p.id) === option.value); // Match IDs to person objects
    }).filter(p => p); // Remove any null values
}


async function toggleGroupInQueue() {
    const selectedPersons = getSelectedPersons();
    if (selectedPersons.length === 0) {
        alert("Please select at least one person from the dropdown.");
        return;
    }

    // Create a group identifier (comma-separated names)
    const groupIdentifier = selectedPersons.map(p => p.name).join(", ");

    // Check if this combined group identifier exists in the waiting queue
    const isInQueue = currentQueue.includes(groupIdentifier);

    if (isInQueue) {
        // Move to completed queue
        await fetch(URL + `doneToCompleted/${assignment}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([groupIdentifier])
        });
        alert(`Moved group "${groupIdentifier}" to completed queue.`);
    } else {
        // Add to waiting queue
        await fetch(URL + `addToWaiting/${assignment}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([groupIdentifier])
        });
        alert(`Added group "${groupIdentifier}" to waiting queue.`);
    }

    fetchQueue(); // Refresh queue display
}



document.getElementById('groupToggleBtn').addEventListener('click', toggleGroupInQueue);

/* QUEUE UPDATE INTERVAL */
function startQueueUpdateInterval(intervalInSeconds) {
    if (queueUpdateInterval) clearInterval(queueUpdateInterval);
    queueUpdateInterval = setInterval(() => {
        console.log("Updating queue...");
        fetchQueue();
        fetchTimerLength();
    }, intervalInSeconds * 1000);
}

function stopQueueUpdateInterval() {
    if (queueUpdateInterval) clearInterval(queueUpdateInterval);
}

/* INITIAL LOAD */
window.addEventListener('load', () => {
    fetchQueue();
    fetchUser();
    showAssignmentModal();
    fetchPersons();
});
