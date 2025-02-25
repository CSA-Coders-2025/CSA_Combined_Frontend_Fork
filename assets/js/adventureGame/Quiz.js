import gameControlInstance from "./GameControl.js";
class Quiz {
    constructor() {
        this.isOpen = false;
        this.dim = false;
        this.currentNpc = null;
        this.currentPage = 0;
    }

    backgroundDim = {
        create: () => {
            this.dim = true;
            console.log("CREATE DIM");
            const dimDiv = document.createElement("div");
            dimDiv.id = "dim";
            dimDiv.style.backgroundColor = "black";
            dimDiv.style.width = "100%";
            dimDiv.style.height = "100%";
            dimDiv.style.position = "absolute";
            dimDiv.style.opacity = "0.8";
            document.body.append(dimDiv);
            dimDiv.style.zIndex = "9998";
            dimDiv.addEventListener("click", this.backgroundDim.remove);
        },

        remove: () => {
            this.dim = false;
            console.log("REMOVE DIM");
            const dimDiv = document.getElementById("dim");
            if (dimDiv) {
                dimDiv.remove();
            }
            this.isOpen = false;
            document.getElementById("promptTitle").style.display = "none";
            const promptDropDown = document.getElementById("promptDropDown");
            promptDropDown.style.width = "0"; 
            promptDropDown.style.top = "0";  
            promptDropDown.style.left = "-100%"; 
            promptDropDown.style.transition = "all 0.3s ease-in-out";
        },
        
    };

    createDisplayTable() {
        const table = document.createElement("table");
        table.className = "table prompt";
    
        // Header row for questions
        const header = document.createElement("tr");
        const th = document.createElement("th");
        th.colSpan = 2;
        th.innerText = "Answer the Questions Below:";
        header.appendChild(th);
        table.appendChild(header);
    
        return table;
    }

    toggleDetails() {
        this.detailed = !this.detailed;
        this.updateDisplay();
    }

    updateTable() {
        const table = this.createDisplayTable();
        // Use `this.currentNpc` to populate questions
        if (this.currentNpc && this.currentNpc.questions) {
            this.currentNpc.questions.forEach((question, index) => {
                const row = document.createElement("tr");
                // Question cell
                const questionCell = document.createElement("td");
                questionCell.innerText = `${index + 1}. ${question}`;
                row.appendChild(questionCell);
                // Input cell
                const inputCell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Your answer here...";
                input.dataset.questionIndex = index; // Tag input with the question index
                inputCell.appendChild(input);
                row.appendChild(inputCell);
                table.appendChild(row);
            });
            // Add submit button
            const submitRow = document.createElement("tr");
            const submitCell = document.createElement("td");
            submitCell.colSpan = 2;
            submitCell.style.textAlign = "center";
            const submitButton = document.createElement("button");
            submitButton.innerText = "Submit";
            submitButton.addEventListener("click", this.handleSubmit.bind(this)); // Attach submission handler
            submitCell.appendChild(submitButton);
            submitRow.appendChild(submitCell);
            table.appendChild(submitRow);
        } else {
            const row = document.createElement("tr");
            const noQuestionsCell = document.createElement("td");
            noQuestionsCell.colSpan = 2;
            noQuestionsCell.innerText = "No questions available.";
            row.appendChild(noQuestionsCell);
            table.appendChild(row);
        }
        // Wrap the table in a scrollable container
        const container = document.createElement("div");
        container.style.maxHeight = "400px"; // Limit height for scrollability
        container.style.overflowY = "auto"; // Enable vertical scrolling
        container.style.border = "1px solid #ccc"; // Optional: add a border
        container.style.padding = "10px"; // Optional: add some padding
        container.appendChild(table);
        return container;
    }

    handleSubmit() {
        // Collect all answers
        const inputs = document.querySelectorAll("input[type='text']");
        const answers = Array.from(inputs).map(input => ({
            questionIndex: input.dataset.questionIndex,
            answer: input.value.trim()
        }));
        console.log("Submitted Answers:", answers);
    
        // Handle the submission logic (e.g., save answers, validate, etc.)
        alert("Your answers have been submitted!");
    
        // Close the prompt and go back to the main level
        this.isOpen = false;
        this.backgroundDim.remove();
    }
    

    updateDisplay() {
        const table = document.getElementsByClassName("table scores")[0];
        const detailToggleSection = document.getElementById("detail-toggle-section");
        const clearButtonRow = document.getElementById("clear-button-row");
        const pagingButtonsRow = document.getElementById("paging-buttons-row");

        if (detailToggleSection) {
            detailToggleSection.remove();
        }

        if (table) {
            table.remove(); //remove old table if it is there
        }

        if (pagingButtonsRow) {
            pagingButtonsRow.remove();
        }

        if (clearButtonRow) {
            clearButtonRow.remove();
        }

        document.getElementById("promptDropDown").append(this.updateTable()); //update new 
    }

    backPage() {
        if (this.currentPage - 1 === 0) {
            return;
        }

        this.currentPage -= 1;
        this.updateDisplay();
    }

    frontPage() {
        this.currentPage += 1;
        this.updateDisplay();
    }

    openPanel(npc) {
        const promptDropDown = document.querySelector('.promptDropDown');
        const promptTitle = document.getElementById("promptTitle");

        // Close any existing prompt before opening a new one
        if (this.isOpen) {
            this.backgroundDim.remove(); // Ensures previous dim is removed
        }

        this.currentNpc = npc; // Assign the current NPC when opening the panel
        this.isOpen = true;

        // Ensure the previous content inside promptDropDown is removed
        promptDropDown.innerHTML = ""; 

        promptTitle.style.display = "block";

        // Add the new title
        promptTitle.innerHTML = npc?.title || "Questions";
        promptDropDown.appendChild(promptTitle);

        // Display the new questions
        promptDropDown.appendChild(this.updateTable());

        // Handle the background dim effect
        this.backgroundDim.create();

        promptDropDown.style.position = "fixed";
        promptDropDown.style.zIndex = "9999";
        promptDropDown.style.width = "70%"; 
        promptDropDown.style.top = "15%";
        promptDropDown.style.left = "15%"; 
        promptDropDown.style.transition = "all 0.3s ease-in-out"; 
    }

    initialize() {
        const promptTitle = document.createElement("div");
        promptTitle.id = "promptTitle";
        document.getElementById("promptDropDown").appendChild(promptTitle);
    }

}

export default Quiz;
