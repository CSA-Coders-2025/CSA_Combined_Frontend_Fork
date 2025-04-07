---
title: Merge Sort Simulation
permalink: /merge-simulation
show_reading_time: false
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            color: black; /* Ensure all text is black */
        }
        .array-container {
            margin: 20px auto;
            display: flex;
            justify-content: center;
        }
        .array-element {
            margin: 5px;
            padding: 10px;
            border: 1px solid black;
            border-radius: 4px;
            background-color: #f0f0f0; /* Light gray background */
            color: black; /* Ensure text is black */
            font-weight: bold; /* Make the text more readable */
            text-align: center; /* Center the text inside the box */
        }
        .step {
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #f9f9f9;
            color: black; /* Ensure step text is black */
        }
        .step strong {
            display: block;
            margin-bottom: 5px;
        }
        .explanation {
            margin-top: 10px;
            font-size: 14px;
            color: black !important; /* Force the text to be black */
        }
        button {
            margin: 10px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <div class="array-container" id="original-array"></div>
    <div id="steps-container"></div>
    <button onclick="startMergeSort()">Start</button>
    <button onclick="nextStep()" disabled id="next">Next Step</button>
    <script>
        let steps = [];
        let stepIndex = 0;
        let arr = [38, 27, 43, 3, 11, 82, 10]; // Updated list
        function displayArray(array, stepIndex, type) {
            const container = document.getElementById('steps-container');
            const stepDiv = document.createElement('div');
            stepDiv.className = 'step';
            // Determine the explanation text based on the step type
            let explanationText = "";
            if (type === "Original") {
                explanationText = "This is the original array before sorting begins.";
            } else if (type === "Splitting") {
                explanationText = "The array is being split into smaller subarrays.";
            } else if (type === "Merging") {
                explanationText = "The subarrays are being merged back together in sorted order.";
            }
            stepDiv.innerHTML = `
                <strong>${type} Step ${stepIndex + 1}:</strong>
                <div class="array-container">
                    ${array.map(num => `<div class="array-element">${num}</div>`).join('')}
                </div>
                <p class="explanation">${explanationText}</p>
            `;
            container.appendChild(stepDiv);
        }
        function mergeSort(array, depth = 0) {
            if (array.length <= 1) return array;
            const mid = Math.floor(array.length / 2);
            const left = array.slice(0, mid);
            const right = array.slice(mid);
            // Log the splitting step
            steps.push({ array: [...array], type: "Splitting" });
            return merge(mergeSort(left, depth + 1), mergeSort(right, depth + 1));
        }
        function merge(left, right) {
            let result = [];
            let i = 0, j = 0;
            while (i < left.length && j < right.length) {
                if (left[i] < right[j]) {
                    result.push(left[i++]);
                } else {
                    result.push(right[j++]);
                }
            }
            result = result.concat(left.slice(i)).concat(right.slice(j));
            // Log the merging step
            steps.push({ array: [...result], type: "Merging" });
            return result;
        }
        function startMergeSort() {
            steps = [];
            stepIndex = 0;
            document.getElementById('steps-container').innerHTML = ''; // Clear previous steps
            displayArray(arr, -1, "Original"); // Display the original array
            mergeSort(arr);
            document.getElementById('next').disabled = false;
        }
        function nextStep() {
            if (stepIndex < steps.length) {
                const step = steps[stepIndex];
                displayArray(step.array, stepIndex, step.type);
                stepIndex++;
            } else if (stepIndex === steps.length) {
                // Add a final infographic-like step for the sorted array
                displayArray(arr, stepIndex, "Sorted");
                const container = document.getElementById('steps-container');
                const finalMessage = document.createElement('p');
                finalMessage.className = 'explanation';
                finalMessage.style.fontWeight = 'bold';
                finalMessage.textContent = "The array is now fully sorted!";
                container.appendChild(finalMessage);
                document.getElementById('next').disabled = true; // Disable the button
            }
        }
    </script>
</body>
</html>
