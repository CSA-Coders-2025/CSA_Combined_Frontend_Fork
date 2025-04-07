---
toc: false
layout: post
title: Seed Tracker
type: ccc
permalink: /student/seedtracker
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Seed Tracker</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
    background-color: black;
    color: white;
    padding: 20px;
    }
    .range-value {
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    margin-top: 8px;
    }
    .btn-custom {
    background-color: white;
    color: black;
    font-weight: bold;
    }
    .btn-custom:hover {
    background-color: rgb(43, 37, 37);
    color: white;
    }
    ::placeholder {
    color: white;
    opacity: 1;
    }
    </style>

</head>
<body>
  {% include nav/toolkits/seed.html %}
  <div class="container">
    <form class="mx-auto" style="max-width: 600px;">
      <div class="mb-3">
        <label for="studentName" class="form-label">Student Name</label>
        <input type="text" class="form-control" id="studentName" placeholder="Enter your name" required>
      </div>
      <div class="mb-3">
        <label for="activityLog" class="form-label">Weekly Activity Log</label>
        <textarea class="form-control" id="activityLog" rows="4" placeholder="Describe what you did this week..." required></textarea>
      </div>
      <div class="mb-3">
        <label for="gradeRequest" class="form-label">Requested Grade (Seed)</label>
        <input type="range" class="form-range" id="gradeRequest" min="0" max="1" step="0.1" value="0.5" oninput="updateRangeValue(this.value)">
        <div class="range-value" id="rangeValue">0.5</div>
      </div>
      <button type="button" class="btn btn-custom w-100" onclick="submitEntry()">Submit Entry</button>
      <div class="text-center mt-3" id="message"></div>
    </form>
  </div>

  <script type="module">
    import { javaURI } from '{{site.baseurl}}/assets/js/api/config.js';

    function updateRangeValue(value) {
      document.getElementById('rangeValue').innerText = value;
    }

    async function submitEntry() {
      const studentName = document.getElementById('studentName').value;
      const activityLog = document.getElementById('activityLog').value;
      const gradeRequest = document.getElementById('gradeRequest').value;
      const messageElement = document.getElementById('message');

      if (!studentName || !activityLog) {
        messageElement.textContent = "Please fill in all fields before submitting.";
        return;
      }

      const entryData = {
        name: studentName,
        comment: activityLog,
        grade: parseFloat(gradeRequest)
      };

      try {
        const response = await fetch(`${javaURI}/api/grades/requests/seed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entryData)
        });

        if (response.ok) {
          const result = await response.json();
          messageElement.textContent = `Entry submitted successfully! Your Entry ID is: ${result.id}`;
        } else {
          throw new Error("Failed to submit entry");
        }
      } catch (error) {
        messageElement.textContent = "Error submitting entry. Please try again.";
        console.error("Submission error:", error);
      }
    }

    document.getElementById('activityLog').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitEntry();
      }
    });
  </script>
</body>
</html>
