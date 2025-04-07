
import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

//setTimeout(function() {
//    location.reload();
//}, 10000);
const fetchOptions2 = {
    ...fetchOptions,
    credentials: 'omit',
}
let teacherEmail = "jmort1021@gmail.com";
const tinkleURL = javaURI + '/api/tinkle/add';
// Load users from localStorage
function loadUsers() {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : {};
}

// Save users to localStorage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Remove a user from storage
function removeUser(student) {
    delete users[student];
    saveUsers();
}

function getTime()
{
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Ensures 2 digits
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}`;
    return time;
}
// Initialize users from localStorage
let users = loadUsers();
console.log(users);
document.addEventListener("DOMContentLoaded", function() {
    const barcodeInput = document.getElementById("barcode-input");
    barcodeInput.focus();

    window.addEventListener('click', function(event) {
        barcodeInput.focus();
    });
    barcodeInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            let barcode = barcodeInput.value.trim();
            console.log("Scanned Barcode:", barcode);

            // Check if barcode is empty
            if (!barcode) {
                console.log("Empty barcode, ignoring...");
                return;
            }
            
            // Handle returning user
            let currentAway = document.getElementById('current-away').textContent.trim();
            if (users[currentAway] === barcode) {
                console.log("Removing ", currentAway);                    
                var timeIn = getTime();
                var timeOut = localStorage.getItem("timeout");
                var time = `${timeOut}-${timeIn}`;
                
                const postOptions = {
                    ...fetchOptions2,
                    method: 'POST',
                }
                let tinkleBody = {
                    studentEmail: currentAway,
                    timeIn: time
                };

                setTimeout( function() {
                    fetch(tinkleURL, {
                        ...postOptions,
                        body: JSON.stringify(tinkleBody),
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log("Time added to database");
                        } else {
                            alert("Failed to add time to database.");
                        }
                    })
                }
                ,500);
                document.getElementById('current-away').innerHTML = 'Nobody';

                removeUser(currentAway);
                console.log(currentAway, ' removed');
                setTimeout(
                    removeFromQueue(),500);    
                check_glow();
                barcodeInput.value = "";
                return;
            }
            if (currentAway === 'Nobody' & barcode == users[document.getElementById('next-up').textContent])
            {
                fetchQueueData();
                var timeOut = getTime();
                localStorage.setItem("timeout", timeOut);
                location.reload();
            }
            for (const key in users)
            {
                if (barcode == users[key])
                {
                    console.log('duplicate user. Get outta here and wait your turn.');
                    return;
                }
            }

            // Fetch user info from the server
            let name = "";
            const name_by_sid_url = javaURI + `/api/${barcode}`;

            //get name of scanned student 
            fetch(name_by_sid_url, {
                ...fetchOptions2
            })
                .then(response => response.text()) // Using response.text() for a string response.
                .then(data => {
                    if(data != 'Not a valid barcode')
                    {
                        name = data; // Assigning the string data to 'name'.
                        users[name] = barcode;
                        saveUsers();
                        console.log("User added: ", name);
                        addToQueue(name);
                        localStorage.setItem('timeout', getTime());
                        console.log('timeout', getTime());
                    }
                    else
                    {
                        console.log('Get outta here with that invalid id');
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
            
            //add to queue
            function addToQueue(name){
                let queue_load = {
                    "studentName": name,
                    "teacherEmail": teacherEmail,
                    "uri": javaURI
                }
                const queueOptions = {
                    ...fetchOptions2,
                    method:'POST',
                    body: JSON.stringify(queue_load),
                }
                fetch(javaURI + "/api/queue/add", queueOptions)
                .then(response => {
                    if(response.ok)
                    {
                        console.log(name, "added to queue");
                        location.reload();
                    }
                    else {
                        console.log("failed: ", response);
                    }
                })
            }
            //fetch("/scan-barcode", {
                //method: "POST",
            // headers: { "Content-Type": "application/json" },
            //  body: JSON.stringify({ student_id: barcode })
            //})
            //.then(response => response.json())
            //.then(resp => {
            /// if (resp.student) {
                    //users[resp.student] = barcode;
                    //saveUsers(); // Save updated users list
                // console.log("User added:", resp.student);
                // localStorage.setItem('timeout', getTime())
                //   console.log('timeout', getTime());
            // } else {
                //   console.log("Invalid response:", resp);
            // }
            //   location.reload();
            //})
        // .catch(error => console.error("Error:", error));

            // Clear input field and refocus
            barcodeInput.value = "";
        }
    });
});

const teacherName = "jmort1021@gmail.com";

async function fetchLocations() {
    try {
        const response = await fetch(javaURI + '/api/issue/issues', fetchOptions2);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const issues = await response.json();
        const mapContainer = document.querySelector('.map-container');
        
        issues.forEach(issue => {
            if (issue.count == 0) return;
            
            const locElement = document.createElement('div');
            locElement.className = 'location';
            locElement.style.position = 'absolute';
            locElement.style.top = (issue.positionY * 100) + '%';
            locElement.style.left = (issue.positionX * 100) + '%';

            const icon = document.createElement('img');
            icon.src = 'https://i.ibb.co/jPDbhG4H/marker.webp';
            icon.alt = 'Location Icon';
            icon.style.width = '48px';
            icon.style.height = '48px';

            const info = document.createElement('div');
            info.className = 'info';
            info.textContent = `${issue.bathroom} Bathroom: ${issue.issue}`;

            locElement.appendChild(icon);
            locElement.appendChild(info);
            mapContainer.appendChild(locElement);
        });
    } catch (error) {
        console.error('Error fetching issues:', error);
    }
}

window.onload = fetchLocations;

let mortensenQueue = null;
async function fetchQueueData() {
    try {
        const QueueURI = javaURI + "/api/queue/all";
        const response = await fetch(QueueURI, fetchOptions2);

        if (response.status !== 200) return console.error("Failed to fetch queue data.");
        
        const data = await response.json();
        mortensenQueue = data.find(queue => queue.teacherEmail === teacherName);

        if (!mortensenQueue) return console.error("No queue found for the teacher.");

        const queueArray = mortensenQueue.peopleQueue.split(",");
        document.getElementById("current-away").textContent = queueArray[0] || "Nobody";
        document.getElementById("next-up").textContent = queueArray[1] || "None";

        const queueList = document.getElementById("queue-list");
        queueList.innerHTML = "";
        
        queueArray.slice(2).forEach(person => {
            const li = document.createElement("li");
            li.textContent = person;
            queueList.appendChild(li);
            queueList.style.listStyleType = "none";
        });
        check_glow();
    } catch (error) {
        console.error("Error fetching queue data:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchQueueData);

function check_glow() {
    const statusBar = document.getElementById("status-bar");
    if (document.getElementById('current-away').innerText.trim() !== "Nobody") {
        statusBar.textContent = "OCCUPIED";
        statusBar.classList.add("occupied");
        statusBar.classList.remove("unoccupied");
        document.body.classList.add("occupied-glow");
        document.body.classList.remove("unoccupied-glow");
    } else {
        statusBar.textContent = "UNOCCUPIED";
        statusBar.classList.add("unoccupied");
        statusBar.classList.remove("occupied");
        document.body.classList.add("unoccupied-glow");
        document.body.classList.remove("occupied-glow");
    }
}

window.addEventListener('click', function(event) {
    if (event.target && event.target.id == 'leave-now') {
        if (document.getElementById('current-away').innerHTML === 'Nobody') {
            removeFromQueue();
        } else {
            document.getElementById('current-away').innerHTML = 'Nobody';
            check_glow();
        }
    }
});

const deleteOptions = { ...fetchOptions2, method: 'POST' };

function removeFromQueue() {
    fetch(javaURI + "/api/queue/removefront/" + teacherName, deleteOptions)
        .then(response => {
            if (response.ok) {
                console.log('user removed');
            } else {
                alert("Failed to remove from queue.");
            }
        })
        .catch(error => console.error("Error removing from queue:", error));
}

console.log("Script loaded successfully");

function autoRemoveQueue() {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (storedUsers.length === 0) return;

    function processNextUser(index) {
        if (index >= storedUsers.length) {
            localStorage.removeItem('users'); // Clear storage after all users are removed
            document.getElementById('current-away').innerHTML = 'Nobody';
            check_glow();
            return;
        }

        const currentAway = storedUsers[index];
        const timeIn = localStorage.getItem("timeIn");
        const timeOut = getTime();
        const time = `${timeOut}-${timeIn}`;

        const postOptions = {
            ...fetchOptions2,
            method: 'POST',
            body: JSON.stringify({
                studentEmail: currentAway,
                timeIn: time
            }),
        };

        fetch(tinkleURL, postOptions)
            .then(response => {
                if (response.ok) {
                    console.log(`Time added for ${currentAway}`);
                } else {
                    console.error(`Failed to add time for ${currentAway}`);
                }
            })
            .finally(() => {
                removeUser(currentAway); // Remove user from storage
                setTimeout(() => {
                    location.reload(); // Reload after processing each user
                    processNextUser(index + 1); // Continue after reload
                }, 500); // Delay to ensure reload takes effect
            });
    }

    processNextUser(0);
}

setTimeout(autoRemoveQueue, 15000);

const bellSchedule = {
    "regDay": ["08:35", "09:41", "10:55", "11:32", "12:42", "13:13", "14:24", "15:35"],
    "lateStart": ["09:35", "10:34", "11:38", "12:57", "13:27", "14:31", "15:35"],
};

const normDays = ["Monday", "Tuesday", "Thursday", "Friday"];

const lateDays = ["Wednesday"];
function checkTimeAndRun() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Get current time in "HH:MM" format
    const today = now.toLocaleDateString("en-US", { weekday: "long" });

    if (normDays.includes(today)) {
        console.log(`Today's schedule (${today} - Regular Day):`);

        if (bellSchedule.regDay.includes(currentTime)) {
            console.log(`Executing functions at ${currentTime}...`);
            autoRemoveQueue();
        }
    }
    else if (lateDays.includes(today)) {
        console.log(`Today's schedule (${today} - Late Start):`);

        if (bellSchedule.lateStart.includes(currentTime)) {
            console.log(`Executing functions at ${currentTime}...`);
            autoRemoveQueue();
        }
    }
    else {
        console.log(`Today's schedule (${today} - No School):`);
    }
}
// Check every minute
setInterval(checkTimeAndRun, 60000);

