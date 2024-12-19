---
layout: base
title: Adventure Game
permalink: /gamify/adventureGame
---

<head>
    <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"
        rel="stylesheet"
    />
    <style>
                :root {
    --pixel-size: 2px;
    --grid-cell: calc( var(--pixel-size) * 16);
    --bg: #9FA7E4;
 }
 @media( min-width: 700px ) {
    :root {
       --pixel-size: 3px;
    }
 }
 @media( min-width: 1000px ) {
    :root {
       --pixel-size: 4px;
    }
 }
 html, body {
    height: 100%;
 }
 body {
    background: var(--bg);
    display: flex;
    
    justify-content: center;
 }
 .pixel-art {
    image-rendering: pixelated;
 }
.frame {
    width: calc(var(--pixel-size) * 160);
    height: calc(var(--pixel-size) * 144);
    outline: var(--pixel-size) solid #fff;
    z-index: 1;
    position: absolute; /* or 'fixed' if you want it fixed on the screen */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

 .camera {
    width: calc(var(--pixel-size) * 160);
    height: calc(var(--pixel-size) * 144);
    overflow: hidden;
    background: #61DDF7;
    position:relative;
 }
 .chat-score, .balance, .questions-answered {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.4em;
          font-weight: bold;
          color: #333;
          background-color: rgba(255, 255, 255, 0.85); /* Semi-transparent background */
          padding: 10px 15px; /* Add padding for better readability */
          border-radius: 8px; /* Rounded corners */
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
          z-index: 9999; /* Ensure visibility on top */
          top: calc(10px + var(--grid-cell) * 3)
          right: 10px;
       }
 
       .chat-score {
          top: 10px; /* Place near the top */
       }
 
       .balance {
          top: 60px; /* Slightly below .chat-score */
       }
 
       .questions-answered {
          top: 110px; /* Slightly below .balance */
       }
 .map {
    image-rendering: pixelated;
    background-image: url("https://assets.codepen.io/21542/CameraDemoMap.png");
    background-size: 100%;
    width: calc(13 * var(--grid-cell));
    height: calc(10 * var(--grid-cell));
    position: relative;
 }
 .character {
    width: calc( var(--grid-cell)* 2 );
    height: calc( var(--grid-cell)* 2 );
    position: absolute;
    overflow:hidden;
 }
 .npc1 {
    width: calc(var(--grid-cell) * 2);
    height: calc(var(--grid-cell) * 1.5);
    position: absolute;
    left: calc(var(--grid-cell) * 1.8);
    top: calc(var(--grid-cell) * 3.5);
    background: url('{{site.baseurl}}/images/gamify/nerd.png') no-repeat no-repeat;
    background-size: contain;
    z-index: 0;
 }

 .npc2 {
    width: calc(var(--grid-cell) * 2);
    height: calc(var(--grid-cell) * 1.5);
    position: absolute;
    left: calc(var(--grid-cell) * 8);
    top: calc(var(--grid-cell) * 2);
    background: url('{{site.baseurl}}/images/gamify/stockguy.png') no-repeat no-repeat;
    background-size: contain;
    z-index: 0;
 }
 .computer {
    width: calc(var(--grid-cell) * 1);
    height: calc(var(--grid-cell) * 0.8);
    position: absolute;
    left: calc(var(--grid-cell) * 11);
    top: calc(var(--grid-cell) * 4.5);
    background: url('{{site.baseurl}}/images/gamify/computer.png') no-repeat no-repeat;
    background-size: contain;
    z-index: 0;
 }
 .npc3 {
    width: calc(var(--grid-cell) * 1);
    height: calc(var(--grid-cell) * 1.5);
    position: absolute;
    left: calc(var(--grid-cell) * 8);
    top: calc(var(--grid-cell) * 6);
    background: url('{{site.baseurl}}/images/gamify/npc3.png') no-repeat no-repeat;
    background-size: contain;
    z-index: 0;
 }
 .npc4 {
    width: calc(var(--grid-cell) * 1);
    height: calc(var(--grid-cell) * 1.5);
    position: absolute;
    left: calc(var(--grid-cell) * 3);
    top: calc(var(--grid-cell) * 7);
    background: url('{{site.baseurl}}/images/gamify/npc4.png') no-repeat no-repeat;
    background-size: contain;
    z-index: 0;
 }
 .npc5 {
    width: calc(var(--grid-cell) * 1);
    height: calc(var(--grid-cell) * 1.5);
    position: absolute;
    left: calc(var(--grid-cell) * 9);
    top: calc(var(--grid-cell) * 4);
    background: url('{{site.baseurl}}/images/gamify/npc5.png') no-repeat no-repeat;
    background-size: contain;
    z-index: 0;
 }

 .tree2 {
    width: calc(var(--grid-cell) * 3);
    height: calc(var(--grid-cell) * 2);
    position: absolute;
    left: calc(var(--grid-cell) * 9.5);
    top: calc(var(--grid-cell) * 6);
    background: url('{{site.baseurl}}/images/gamify/tree.png') no-repeat no-repeat;
    background-size: contain;
    z-index: 0;
 }
 .tree {
    width: calc(var(--grid-cell) * 2);
    height: calc(var(--grid-cell) * 2);
    position: absolute;
    left: calc(var(--grid-cell) * 1);
    top: calc(var(--grid-cell) * 6);
    background: url('{{site.baseurl}}/images/gamify/tree.png') no-repeat no-repeat;
    background-size: contain;
    z-index: 0;
 }
 .dnhs {
 width: calc(var(--grid-cell) * 2);
 height: calc(var(--grid-cell) * 1.5);
 position: absolute;
 left: calc(var(--grid-cell) * 5.5);
 top: calc(var(--grid-cell) * 0.05);
 background: url('{{site.baseurl}}/images/gamify/dnhs.png') no-repeat no-repeat;
 background-size: contain;
 z-index: 0;
 }
 .shadow {
    width: calc( var(--grid-cell)* 2 );
    height: calc( var(--grid-cell)* 2 );
    position: absolute;
    left:0;
    top:0;
    background: url("https://assets.codepen.io/21542/DemoRpgCharacterShadow.png") no-repeat no-repeat;
    background-size: 100%;
 }
 .leaderboard-button {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: #fff;
    border: 2px solid black;
    padding: 10px;
    cursor: pointer;
    z-index: 100;
 }
 .leaderboard-box {
    display: none;
    position: absolute;
    background-color: white;
    border: 2px solid black;
    padding: 10px;
    z-index: 10;
    cursor: pointer;
 }
 .stocks {
    width: calc(var(--grid-cell) * 1);
    height: calc(var(--grid-cell) * 1);
    position: absolute;
    left: calc(var(--grid-cell) * 12); /* Adjust the position as needed */
    top: calc(var(--grid-cell) * 7); /* Adjust the position as needed */
    background: url('{{site.baseurl}}/images/gamify/stocks.png') no-repeat no-repeat;
    background-size: contain;
    z-index: 1; /* Make sure it appears above other elements */
 }   
 .character_spritesheet {
    position: absolute;
    background: url("https://assets.codepen.io/21542/DemoRpgCharacter.png") no-repeat no-repeat;
    background-size: 100%;
    width: calc( var(--grid-cell)* 8 );
    height: calc( var(--grid-cell)* 8 );
 }
 .character[facing="right"] .character_spritesheet {
    background-position-y: calc( var(--pixel-size) * -32 );
 }
 .character[facing="up"] .character_spritesheet {
    background-position-y: calc( var(--pixel-size) * -64 );
 }
 .character[facing="left"] .character_spritesheet {
    background-position-y: calc( var(--pixel-size) * -96 );
 }
 .character[walking="true"] .character_spritesheet {
    animation: walkAnimation 0.6s steps(4) infinite;
 }
 @keyframes walkAnimation {
   from {
     transform: translate3d(0%,0%,0);
   }
   to {
     transform: translate3d(-100%,0%,0);
   }
 }
 .corner_topleft {
    top: calc(var(--pixel-size) * -1);
    left: calc(var(--pixel-size) * -1);
 }
 .corner_topright {
    top: calc(var(--pixel-size) * -1);
    right: calc(var(--pixel-size) * -1);
 }
 .corner_bottomleft {
    bottom: calc(var(--pixel-size) * -1);
    left: calc(var(--pixel-size) * -1);
 }
 .corner_bottomright {
    bottom: calc(var(--pixel-size) * -1);
    right: calc(var(--pixel-size) * -1);
 }
 .headline {
    position:absolute;
    top:calc(var(--pixel-size) * 2);
    right:calc(var(--pixel-size) * 2);
    width: calc(var(--pixel-size) * 75)
 }
 .dialog-box {
    position: absolute;
    background-color: white;
    border: 1px solid black;
    color: black; /* Text will be black */
    padding: 5px;
    z-index: 10;
    display: none;
}
 .chat-score, .balance {
    font-size: 1.4em;
    font-weight: bold;
    color: #333;
    background-color: rgba(255, 255, 255, 0.85); /* Semi-transparent background */
    padding: 10px 15px; /* Add padding for better readability */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
    position: absolute; /* Keep positioned at the top */
    z-index: 9999; /* Ensure visibility on top */
    right: 10px;
 }
 
 .chat-score {
    top: 10px; /* Place near the top */
 }
 
 .balance {
    top: 60px; /* Slightly below .chat-score */
 }
<!-- 
 .shop-button {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 10px 20px;
    font-size: 1em;
    background-color: #4CAF50;
    color: blue;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 100;
}

.shop-button:hover {
    background-color: #45a049;
} -->

.container {
 width: 90%;
 max-width: 500px;
 padding: 20px;
 background-color: #fff;
 border-radius: 10px;
 box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
 text-align: center;
}

.main-body {
 font-family: Arial, sans-serif;
 display: flex;

 justify-content: center;
 background-color: #f2f2f2;
 margin: 0;
 height: 100vh;
 position: relative;
 flex-direction: column;
}
/* Style for dialog boxes to ensure they appear above the NPCs */
.dialog-box {
 position: absolute;
 background-color: white;
 border: 1px solid black;
 padding: 5px;
 z-index: 10;
 display: none; /* Initially hidden */
}

/* NPC-specific dialog box positioning adjustments */
#npc1-dialog-box {
 top: 200px; /* Adjust based on NPC1's position */
 left: 15px;
}

#npc2-dialog-box {
 top: 100px; /* Adjust based on NPC2's position */
 left: 400px;
}

#teleport-prompt {
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 background-color: white;
 border: 1px solid black;
 padding: 20px;
 z-index: 20;
 display: none;
 text-align: center;
}

#teleport-prompt button {
 margin: 5px;
 padding: 10px;
}
.chat-score, .balance, .questions-answered {
    font-size: 1.4em;
    font-weight: bold;
    color: #333;
    background-color: rgba(255, 255, 255, 0.85); /* Semi-transparent background */
    padding: 10px 15px; /* Add padding for better readability */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
    position: absolute; /* Keep positioned at the top */
    z-index: 9999; /* Ensure visibility on top */
    right: 10px;
 }

 .chat-score {
    top: 100px; /* Place near the top */
 }

 .balance {
    top: 150px; /* Slightly below .chat-score */
 }

 .questions-answered {
    top: 200px; /* Slightly below .balance */
 }
 body {
    font-family: 'Orbitron', sans-serif;
    margin: 0;
    padding: 0;
    background: url('{{site.baseurl}}/images/gamify/back.png') no-repeat center center fixed;
    background-size: cover;
}
.title {
    font-size: 5em;
    font-weight: bold;
    color: #0ccaca;
    text-align: center;
    position: absolute;
    top: 0.00001px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
}
<!-- .shop-button {
    position: absolute;
    top: 150px;
    left: 120px;
    padding: 10px 20px;
    font-size: 1em;
    background-color: #0ccaca;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 1000;
    font-weight: bold;
}
.shop-button:hover {
    background-color: #099a9a;
} -->
.instruction-box {
    font-family: 'Orbitron', sans-serif;
    position: absolute;
    top: 250px;
    left: 50px;
    padding: 20px;
    width: 200px;
    background-color: rgba(255, 255, 255, 0.85);
    color: #333;
    font-size: 1.2em;
    font-weight: bold;
    border-radius: 20px;
    text-align: center;
    z-index: 1000;
    animation: glow 1.5s infinite alternate;
    box-shadow: 0 0 20px #0ccaca, 0 0 40px #0ccaca, 0 0 60px #0ccaca;
}
@keyframes glow {
    from {
        box-shadow: 0 0 10px #0ccaca, 0 0 20px #0ccaca, 0 0 30px #0ccaca;
    }
    to {
        box-shadow: 0 0 20px #0ccaca, 0 0 40px #0ccaca, 0 0 60px #0ccaca;
    }
}
body {
    font-family: 'Orbitron', sans-serif;
    margin: 0;
    padding: 0;
    background: url('{{site.baseurl}}/images/gamify/back.png') no-repeat center center fixed;
    background-size: cover;
}
.title {
    font-size: 5em;
    font-weight: bold;
    color: #0ccaca;
    text-align: center;
    position: absolute;
    top: 0.00001px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
}
<!-- .shop-button {
    font-family: 'Orbitron', sans-serif;
    position: absolute;
    top: 150px;
    left: 120px;
    padding: 10px 20px;
    font-size: 1em;
    background-color: #0ccaca;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 1000;
    font-weight: bold;
}
.shop-button:hover {
    background-color: #099a9a;
} -->
.instruction-box {
    position: absolute;
    top: 250px;
    left: 50px;
    padding: 20px;
    width: 200px;
    background-color: rgba(255, 255, 255, 0.85);
    color: #333;
    font-size: 1.2em;
    font-weight: bold;
    border-radius: 20px;
    text-align: center;
    z-index: 1000;
    animation: glow 1.5s infinite alternate;
    box-shadow: 0 0 20px #0ccaca, 0 0 40px #0ccaca, 0 0 60px #0ccaca;
}
@keyframes glow {
    from {
        box-shadow: 0 0 10px #0ccaca, 0 0 20px #0ccaca, 0 0 30px #0ccaca;
    }
    to {
        box-shadow: 0 0 20px #0ccaca, 0 0 40px #0ccaca, 0 0 60px #0ccaca;
    }
}

.leaderboard-btn {
    font-family: 'Orbitron', sans-serif;
    position: absolute; /* Add positioning */
    top: 180px;         /* Position it above the instruction box */
    left: 75px;         /* Align with the instruction box */
    
    padding: 10px 20px;
    font-size: 1em;
    background-color: #0ccaca;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 1001;      /* Ensure it stays above the instruction box */
    font-weight: bold;
}

.leaderboard-btn:hover {
   background-color: #FFFFFF;
}

.leaderboard-modal {
   display: none;
   position: fixed;
   z-index: 1000;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   overflow: auto;
   background-color: rgba(0, 0, 0, 0.5);
}

.leaderboard-modal-content {
   background-color: white;
   margin: 15% auto;
   padding: 20px;
   border: 1px solid #888;
   width: 80%;
   max-width: 600px;
   border-radius: 10px;
   text-align: center;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
   color: black; /* Change text color to black */
}


.leaderboard-close {
   color: #aaa;
   float: right;
   font-size: 28px;
   font-weight: bold;
   cursor: pointer;
}

.leaderboard-close:hover,
.leaderboard-close:focus {
   color: black;
   text-decoration: none;
   cursor: pointer;
}

#leaderboard-entries div {
   font-family: 'Orbitron', sans-serif;
   font-size: 16px;
   margin: 10px 0;
   padding: 5px 0;
   border-bottom: 1px solid #ddd;
}
.streak-container {
    position: absolute; /* Absolute positioning relative to the nearest positioned parent */
    bottom: 10px; /* Position it 10px from the bottom */
    right: 10px; /* Position it 10px from the right */
    background-color: rgba(255, 255, 255, 0.85); /* Semi-transparent background */
    padding: 15px; /* Add padding for spacing */
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
    font-family: 'Orbitron', sans-serif; /* Matching font */
    font-size: 1.2em; /* Adjust font size */
    color: #333; /* Text color */
    z-index: 1000; /* Ensure it appears above other elements */
    text-align: center; /* Center the content */
}
    </style>
</head>

<body class="main-body">
    <!-- <button class="shop-button" onclick="goToShop()">Shop</button> -->

    <div class="instruction-box">
        How to Play: <br />
        1. Interact with NPCs.<br />
        2. Answer questions.<br />
        3. Earn points.<br />
        4. Use your points in the shop.<br />
        Enjoy and explore the map!
    </div>
    <div class="chat-score">ChatGPT Score: <span id="chatScore"></span></div>
    <div class="balance">Balance: <span id="balance"></span></div>
    <div class="questions-answered">
        Questions Answered: <span id="questionsAnswered"></span>
    </div>
<div class="streak-container">
    <h3>Streak</h3>
    <input type="text" id="user-id-input" placeholder="Enter User Email" />
    <button onclick="setUserId()">Submit</button>
    <button id="add-streak" onclick="addStreak()">Add Streak</button>
    <div class="user-info">
        <p><strong>Current Streak:</strong> <span id="current-streak">0</span></p>
        <p id="max-streak" class="hidden"><strong>Highest Streak:</strong> <span id="max-streak-value">0</span></p>
    </div>
    <div class="message" id="message"></div>
</div>


    <button class="leaderboard-btn" onclick="openLeaderboard()">
        Leaderboard
    </button>

    <div id="leaderboard-modal" class="leaderboard-modal">
        <div class="leaderboard-modal-content">
            <span class="leaderboard-close" onclick="closeLeaderboard()"
                >&times;</span
            >
            <h2>Leaderboard</h2>
            <div id="leaderboard-entries"></div>
        </div>
    </div>

    <div class="frame">
        <div class="corner_topleft"></div>
        <div class="corner_topright"></div>
        <div class="corner_bottomleft"></div>
        <div class="corner_bottomright"></div>
        <div class="camera">
            <div class="map pixel-art">
                <div class="character" facing="down" walking="true">
                    <div class="shadow pixel-art"></div>
                    <div class="character_spritesheet pixel-art"></div>
                </div>
                <div class="tree"></div>
                <div class="tree2"></div>
                <div class="npc1"></div>
                <div class="computer"></div>
                <div class="npc2"></div>
                <div class="dnhs"></div>
                <div class="npc3"></div>
                <div class="npc4"></div>
                <div class="npc5"></div>
      
                <div class="leaderboard-box" id="leaderboard-box">
                    <div class="leaderboard-entry">| Rank | Name | Score |</div>
                    <div class="leaderboard-entry">================</div>
                    <div class="leaderboard-entry">
                        | #1 | ShaneLopezz | 920 |
                    </div>
                    <div class="leaderboard-entry">
                        | #2 | cookieBot34 | 600 |
                    </div>
                    <div class="leaderboard-entry">
                        | #3 | blackifyy08 | 450 |
                    </div>
                    <div class="leaderboard-entry">| #4 | Tanav K | 300 |</div>
                </div>
                <div class="dialog-box" id="dialog-box">
                    Sup, can you help me real quick? (Click)
                </div>
                <div class="dialog-box" id="npc2-dialog-box">
                    Hey there! Can you help me with something? (Click)
                </div>
                <div class="dialog-box" id="npc1-dialog-box">
                    Sup! Unit 1 Popcorn Hack (Click)
                </div>
            </div>
     

                 <script>
                  let userEmail = "";

                function searchStreakByEmail(email) {
                    fetch("http://127.0.0.1:8085/rpg_streak/streak/searchbyemail", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ term: email })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.length > 0) {
                            document.getElementById("current-streak").textContent = data[0].currentStreak ?? 0;
                            document.getElementById("max-streak-value").textContent = data[0].maxStreak ?? 0;
                        } else {
                            document.getElementById("message").textContent = "No streak data found for this email.";
                        }
                    })
                    .catch(error => console.error('Error:', error));
                }

                function setUserId() {
                    const input = document.getElementById("user-id-input").value.trim();
                    if (!input) {
                        alert("Please enter a valid email.");
                        return;
                    }
                    userEmail = input;
                    searchStreakByEmail(userEmail);
                }

                function addStreak() {
                    fetch("http://127.0.0.1:8085/rpg_streak/streak", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: userEmail,         // Change 'userId' to 'email'
                            currentStreak: 1,         // Increment streak
                            maxStreak: 5              // Example max streak
                        })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Failed to update streak");
                        }
                        return response.json();
                    })
                    .then(data => {
                        document.getElementById("current-streak").textContent = data.currentStreak;
                        document.getElementById("max-streak-value").textContent = data.maxStreak;
                        document.getElementById("message").textContent = "Streak updated successfully!";
                    })
                    .catch(error => {
                        console.error('Error updating streak:', error);
                        document.getElementById("message").textContent = "Failed to update streak.";
                    });
                }


            </script>
            <script type="module">
            import { javaURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";
                    // Open leaderboard modal
                    function openLeaderboard() {
                        const modal = document.getElementById("leaderboard-modal");
                        modal.style.display = "block";
                        fetchLeaderboard(); // Fetch and display leaderboard data
                    }
                    window.openLeaderboard = openLeaderboard;

                    // Close leaderboard modal
                    function closeLeaderboard() {
                        const modal = document.getElementById("leaderboard-modal");
                        modal.style.display = "none";
                    }
                    window.closeLeaderboard = closeLeaderboard;

                    function fetchLeaderboard() {
                        fetch(`${javaURI}/rpg_answer/leaderboard`)
                        // fetch(javaURI + '/rpg_answer/leaderboard')
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error("Failed to fetch leaderboard");
                                }
                                return response.json();
                            })
                            .then((data) => {
                                const leaderboardEntries = document.getElementById("leaderboard-entries");
                                leaderboardEntries.innerHTML = "<div>| Rank | Name | Score |</div><hr>";

                                // Sort data by totalScore descending for proper ranking
                                const sortedData = data.sort((a, b) => b.totalScore - a.totalScore);

                                sortedData.forEach((entry, index) => {
                                    const rank = index + 1; // Calculate rank based on order
                                    const userName = entry.userName; // Extract username
                                    const totalScore = entry.totalScore; // Extract total score

                                    // Append each entry to the leaderboard modal content
                                    leaderboardEntries.innerHTML += `<div>| #${rank} | ${userName} | ${totalScore} |</div>`;
                                });
                            })
                            .catch((error) => {
                                console.error("Error fetching leaderboard:", error);
                                document.getElementById("leaderboard-entries").innerHTML = "Failed to load leaderboard.";
                            });
                    }
                    window.fetchLeaderboard = fetchLeaderboard;
            </script>
            <script>
                                var character = document.querySelector(".character");
                                var map = document.querySelector(".map");
                                var x = 90;
                                var y = 80;
                                var held_directions = [];
                                var speed = 1;

                                // NPC1 Interaction with Grading
                                var npc1DialogBox = document.getElementById("npc1-dialog-box");
                                var npc1Dialogue = [
                                    "Sup! Unit 1 Popcorn Hack",
                                    "Which is valid for declaring a variable of type int?",
                                    "1. int 123variable;",
                                    "2. int variable123;",
                                    "3. int variable#123;",
                                    "4. int variable 123"
                                ];
                                var npc1DialogueIndex = 0;

                                npc1DialogBox.addEventListener("click", async function () {
                                    npc1DialogueIndex++;
                                    if (npc1DialogueIndex < npc1Dialogue.length) {
                                        npc1DialogBox.textContent = npc1Dialogue[npc1DialogueIndex];
                                    } else if (npc1DialogueIndex === npc1Dialogue.length) {
                                        const userAnswer = prompt("Enter your choice (e.g., 2):");
                                        if (userAnswer) {
                                            const questionId = 1;
                                            const userId = 1;

                                            const result = await submitAnswer(userAnswer, questionId, userId);
                                            window.location.reload();
                                            await getChatScoreBalance();



                                            alert(`Your response scored: ${result}`);
                                        }
                                    } else {
                                        npc1DialogBox.style.display = "none";
                                        npc1DialogueIndex = 0;
                                    }
                                });
                                // NPC2 Interaction
                                var npc2DialogBox = document.getElementById("npc2-dialog-box");
                var npc2Dialogue = [
                    "Hey!",
                    "I need help with stocks, can you come with me?"
                ];
                var npc2DialogueIndex = 0;

                npc2DialogBox.addEventListener("click", function () {
                    npc2DialogueIndex++;
                    if (npc2DialogueIndex < npc2Dialogue.length) {
                        npc2DialogBox.textContent = npc2Dialogue[npc2DialogueIndex];
                    } else if (npc2DialogueIndex === npc2Dialogue.length) {
                        npc2DialogBox.style.display = "none";
                        const teleport = confirm("Teleport to stocks?");
                        if (teleport) {
                            window.location.href = "{{site.baseurl}}/stocks/home"; // Replace with your desired link
                        }
                    }
                });
                                const blockedZones = [
                                    { x: 17, y: 49.9 }, // NPC1 pos
                                    { x: 16, y: 96 },   // tree
                                    { x: 152, y: 96 },  // tree 2
                                    { x: 167, y: 55 },  // computer
                                    { x: 125, y: 30 },  // NPC2
                                    { x: 120, y: 93 },  // NPC3
                                    { x: 38, y: 103 },   // npc4
                                    { x: 137, y: 55 },  // npc5
                                ];

                                const isBlocked = (newX, newY) => {
                                    return blockedZones.some(zone => {
                                        return Math.abs(zone.x - newX) < 8 && Math.abs(zone.y - newY) < 8;
                                    });
                                };

                                const placeCharacter = () => {
                                    var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--pixel-size"));
                                    const held_direction = held_directions[0];
                                    let newX = x;
                                    let newY = y;
                                    if (held_direction) {
                                        if (held_direction === directions.right) { newX += speed; }
                                        if (held_direction === directions.left) { newX -= speed; }
                                        if (held_direction === directions.down) { newY += speed; }
                                        if (held_direction === directions.up) { newY -= speed; }
                                        if (!isBlocked(newX, newY)) {
                                            x = newX;
                                            y = newY;
                                            character.setAttribute("facing", held_direction);
                                        }
                                    }
                                    character.setAttribute("walking", held_direction ? "true" : "false");

                                    // Boundary limits
                                    var leftLimit = -8;
                                    var rightLimit = (16 * 11) + 8;
                                    var topLimit = -8 + 32;
                                    var bottomLimit = (16 * 7);
                                    if (x < leftLimit) { x = leftLimit; }
                                    if (x > rightLimit) { x = rightLimit; }
                                    if (y < topLimit) { y = topLimit; }
                                    if (y > bottomLimit) { y = bottomLimit; }

                                    // Camera position
                                    var camera_left = pixelSize * 66;
                                    var camera_top = pixelSize * 42;
                                    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
                                    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;

                                    // Check dialog areas
                                    checkDialogArea(x, y);
                                };

                                const checkDialogArea = (x, y) => {
                                    const dialogAreaNPC1 = { left: 16, right: 30, top: 40, bottom: 60 };
                                    const dialogAreaNPC2 = { left: 125, right: 145, top: 30, bottom: 50 };

                                    // NPC1 dialog
                                    if (x >= dialogAreaNPC1.left && x <= dialogAreaNPC1.right && y >= dialogAreaNPC1.top && y <= dialogAreaNPC1.bottom) {
                                        npc1DialogBox.style.display = "block";
                                    } else {
                                        npc1DialogBox.style.display = "none";
                                        npc1DialogueIndex = 0;
                                    }

                                    // NPC2 dialog
                                    if (x >= dialogAreaNPC2.left && x <= dialogAreaNPC2.right && y >= dialogAreaNPC2.top && y <= dialogAreaNPC2.bottom) {
                                        npc2DialogBox.style.display = "block";
                                    } else {
                                        npc2DialogBox.style.display = "none";
                                        npc2DialogueIndex = 0;
                                    }
                                };

                                const step = () => {
                                    placeCharacter();
                                    window.requestAnimationFrame(() => {
                                        step();
                                    });
                                };

                                step();

                                const directions = {
                                    up: "up",
                                    down: "down",
                                    left: "left",
                                    right: "right",
                                };

                                const keys = {
                                    38: directions.up,
                                    37: directions.left,
                                    39: directions.right,
                                    40: directions.down,
                                };

                                document.addEventListener("keydown", (e) => {
                                    var dir = keys[e.which];
                                    if (dir && held_directions.indexOf(dir) === -1) {
                                        held_directions.unshift(dir);
                                    }
                                });

                                document.addEventListener("keyup", (e) => {
                                    var dir = keys[e.which];
                                    var index = held_directions.indexOf(dir);
                                    if (index > -1) {
                                        held_directions.splice(index, 1);
                                    }
                                });

                                function toggleLeaderboard() {
                                    var leaderboardBox = document.getElementById("leaderboard-box");
                                    leaderboardBox.style.display = leaderboardBox.style.display === "block" ? "none" : "block";
                                }

                                function goToShop() {
                                    window.location.href = "{{site.baseurl}}/shop.html";
                                }
            </script>
        </div>
    </div>
    <script type="module">
            import { javaURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";
            function getChatScoreBalance() {
                const personId = 1
                const getChatScoreUrl = `${javaURI}/rpg_answer/getChatScore/` + personId;
                const getBalanceUrl = `${javaURI}/rpg_answer/getBalance/` + personId;
                const getQuestionsAnsweredUrl = `${javaURI}/rpg_answer/getQuestionsAnswered/` + personId;

                fetch(getQuestionsAnsweredUrl, fetchOptions)
                    .then(response => {
                        if (response.status !== 200) {
                            console.log("Database response error: " + response.status);
                            document.getElementById("questionsAnswered").innerHTML = 0;
                        }
                        response.json().then(data => {
                            if (data !== null) {
                                document.getElementById("questionsAnswered").innerHTML = data;
                            }
                        });
                    })
                    .catch(error => {
                        console.error("Fetch error:", error);
                    });

                fetch(getChatScoreUrl, fetchOptions)
                    .then(response => {
                        if (response.status !== 200) {
                            console.log("Database response error: " + response.status);
                            document.getElementById("chatScore").innerHTML = 0;
                        }
                        response.json().then(data => {
                            if (data !== null) {
                                document.getElementById("chatScore").innerHTML = data;
                            }
                        });
                    })
                    .catch(error => {
                        console.error("Fetch error:", error);
                    });

                fetch(getBalanceUrl, fetchOptions)
                    .then(response => {
                        if (response.status !== 200) {
                            console.log("Database response error: " + response.status);
                            document.getElementById("balance").innerHTML = 0;
                        }
                        response.json().then(data => {
                            if (data !== null) {
                                document.getElementById("balance").innerHTML = data;
                            }
                        });
                    })
                    .catch(error => {
                        console.error("Fetch error:", error);
                    });
            }



            async function submitAnswer(content, questionId) {
                        try {
                            const response = await fetch(`${javaURI}/rpg_answer/submitAnswer`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    content: content,
                                    questionId: questionId,
                                    personId: 1
                                })
                            });

                            if (!response.ok) throw new Error("Network response was not ok");

                            const data = await response.json();

                            return data.score || "Error scoring answer"; // Return score

                        } catch (error) {
                            console.error("Error submitting answer:", error);
                            return "Error submitting answer";
                        }
                    }
            window.submitAnswer = submitAnswer;
            window.onload = function() {
                getChatScoreBalance();
            };
    </script>
</body>
