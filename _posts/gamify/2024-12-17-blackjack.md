---
layout: post
title: Blackjack
permalink: /gamify/blackjack
---

<style>
    body {
        font-family: Arial, sans-serif;
        text-align: center;
        background-color: #121212;
        color: white;
    }
    .container {
        width: 40%;
        margin: auto;
        background-color: #222;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #fff;
    }
    button {
        background-color: black;
        color: white;
        border: 1px solid white;
        padding: 10px;
        margin: 5px;
        cursor: pointer;
    }
    button:disabled {
        background-color: grey;
        cursor: not-allowed;
    }
    .error {
        color: red;
        font-weight: bold;
    }
    .card {
        display: inline-block;
        width: 50px;
        height: 75px;
        border-radius: 5px;
        border: 2px solid white;
        text-align: center;
        line-height: 75px;
        font-size: 20px;
        font-weight: bold;
        margin: 5px;
        background-color: white;
        color: black;
        position: relative;
    }
    .hidden {
        background-color: #888;
        color: #888;
    }
</style>

<div class="container">
    <h1>Blackjack Game</h1>
    <h2>Balance: <span id="balance">$0</span></h2>
    <label for="betAmount">Bet Amount:</label>
    <input type="range" id="betAmount" min="1000" max="1000000" value="1000" oninput="updateBetDisplay()">
    <span id="betValue">$1000</span>
    <button id="startGame">Start Game</button>
    <button id="hit" disabled>Hit</button>
    <button id="stand" disabled>Stand</button>
    <button id="exit">Exit</button>
    <h2>Dealer's Hand</h2>
    <div id="dealerHand"></div>
    <h2>Your Hand</h2>
    <div id="playerHand"></div>
    <p id="gameStatus" class="error"></p>
</div>

<script type="module">
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    const API_URL = `${javaURI}/api/casino/blackjack`;
    let uid = "", balance = 0;

    async function getUID() {
        try {
            const response = await fetch(`${javaURI}/api/person/get`, fetchOptions);
            if (!response.ok) throw new Error(`Server response: ${response.status}`);

            const data = await response.json();
            if (!data || !data.uid) throw new Error("UID not found in response");

            uid = data.uid;
            balance = data.balance; // Use actual user balance
            updateBalanceDisplay();
            updateSliderMax(); // Adjust bet slider based on balance
        } catch (error) {
            document.getElementById("gameStatus").innerText = "Error fetching UID.";
        }
    }

    document.getElementById("startGame").addEventListener("click", async function () {
        await getUID();
        const bet = parseInt(document.getElementById("betAmount").value);

        if (bet > balance) {
            document.getElementById("gameStatus").innerText = "Insufficient balance!";
            return;
        }

        document.getElementById("startGame").disabled = true;  // Disable to prevent flashing

        const requestData = { uid, betAmount: bet };
        const response = await fetch(`${API_URL}/start`, {
            ...fetchOptions, method: "POST", body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            document.getElementById("gameStatus").innerText = "Failed to start game.";
            document.getElementById("startGame").disabled = false;  // Re-enable if error
            return;
        }

        const data = await response.json();
        updateUI(data, true);
    });

    document.getElementById("hit").addEventListener("click", async function () {
        const requestData = { uid };
        const response = await fetch(`${API_URL}/hit`, {
            ...fetchOptions, method: "POST", body: JSON.stringify(requestData)
        });

        if (!response.ok) throw new Error("Failed to hit.");
        const data = await response.json();
        updateUI(data);
    });

    document.getElementById("stand").addEventListener("click", async function () {
        const requestData = { uid };
        const response = await fetch(`${API_URL}/stand`, {
            ...fetchOptions, method: "POST", body: JSON.stringify(requestData)
        });

        if (!response.ok) throw new Error("Failed to stand.");
        const data = await response.json();
        updateUI(data);
    });

    function updateBetDisplay() {
        document.getElementById("betValue").innerText = `$${document.getElementById("betAmount").value}`;
    }

    function updateUI(data, isNewGame = false) {
        let gameState = typeof data.gameState === "string" ? JSON.parse(data.gameState) : data.gameState;

        displayCards(gameState.playerHand, "playerHand");
        displayCards(gameState.dealerHand, "dealerHand", !isNewGame);

        document.getElementById("gameStatus").innerText = `Player Score: ${gameState.playerScore} | Dealer Score: ${isNewGame ? "?" : gameState.dealerScore}`;

        if (data.status === "INACTIVE") {
            let resultMessage = gameState.result === "WIN" ? "You win!" :
                                gameState.result === "LOSE" ? "Dealer wins!" : "It's a draw!";
            document.getElementById("gameStatus").innerText = resultMessage;

            balance = gameState.newBalance;
            updateBalanceDisplay();
            updateSliderMax(); // Adjust bet slider based on new balance
        }

        document.getElementById("hit").disabled = data.status === "INACTIVE";
        document.getElementById("stand").disabled = data.status === "INACTIVE";
    }

    function displayCards(cards, elementId, revealAll = true) {
        const cardContainer = document.getElementById(elementId);
        cardContainer.innerHTML = "";

        cards.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            if (!revealAll && index === 1) {
                cardElement.classList.add("hidden");
                cardElement.innerText = "?";
            } else {
                cardElement.innerText = card;
            }
            cardContainer.appendChild(cardElement);
        });
    }

    function updateBalanceDisplay() {
        document.getElementById("balance").innerText = `$${balance}`;
    }

    function updateSliderMax() {
        let betSlider = document.getElementById("betAmount");
        betSlider.max = Math.max(1000, balance); // Ensure at least 1000 is the max
        updateBetDisplay();
    }

    document.getElementById("exit").addEventListener("click", function () {
        location.reload();
    });

</script>
