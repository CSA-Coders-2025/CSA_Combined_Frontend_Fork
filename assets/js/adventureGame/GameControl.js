import GameEnv from './GameEnv.js';
import GameLevelSquares from './GameLevelSquares.js';
import GameLevelDesert from './GameLevelDesert.js';
import { getStats } from "./StatsManager.js";



const createStatsUI = () => {
    const statsContainer = document.createElement('div');
    statsContainer.id = 'stats-container';
    statsContainer.style.position = 'fixed';
    statsContainer.style.top = '10px';
    statsContainer.style.right = '10px';
    statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    statsContainer.style.color = 'white';
    statsContainer.style.padding = '10px';
    statsContainer.style.borderRadius = '5px';
    statsContainer.innerHTML = `
        <div>Balance: <span id="balance">0</span></div>
        <div>Chat Score: <span id="chatScore">0</span></div>
        <div>Questions Answered: <span id="questionsAnswered">0</span></div>
    `;
    document.body.appendChild(statsContainer);
};

/**
 * The GameControl object manages the game.
 * 
 * This code uses the JavaScript "object literal pattern" which is nice for centralizing control logic.
 * 
 * The object literal pattern is a simple way to create singleton objects in JavaScript.
 * It allows for easy grouping of related functions and properties, making the code more organized and readable.
 * In the context of GameControl, this pattern helps centralize the game's control logic, 
 * making it easier to manage game states, handle events, and maintain the overall flow of the game.
 * 
 * @type {Object}
 * @property {Player} turtle - The player object.
 * @property {Player} fish 
 * @property {function} start - Initialize game assets and start the game loop.
 * @property {function} gameLoop - The game loop.
 * @property {function} resize - Resize the canvas and player object when the window is resized.
 */
const GameControl = {
    intervalID: null, // Variable to hold the timer interval reference
    localStorageTimeKey: "localTimes",
    
    start: function(path) {
        // Create the game environment
        GameEnv.create();
        this.initStatsUI();
        // Load the game level
        const gameLevel = new GameLevelDesert(path);
        // Prepare game objects for the level
        for (let object of gameLevel.objects) {
            if (!object.data) object.data = {};
            new object.class(object.data);
        }
        // Start the game loop
        this.gameLoop();
        getStats();
    },

    gameLoop: function() {
        // Clear the canvas
        GameEnv.clear();
        // Update the game objects
        for (let object of GameEnv.gameObjects) {
            object.update();  // Update the game objects
        }
        // Recursively call the game loop
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    resize: function() {
        // Resize the game environment
        GameEnv.resize();
        // Resize the game objects
        for (let object of GameEnv.gameObjects) {
            object.resize(); // Resize the game objects
        }
    },

    /**
     * Updates and displays the game timer.
     * @function updateTimer
     * @memberof GameControl
     */ 
    saveTime(time, score) {
        if (time == 0) return;
        const userID = GameEnv.userID
        const oldTable = this.getAllTimes()

        const data = {
            userID: userID,
            time: time,
            score: score
        }

        if (!oldTable) {
            localStorage.setItem(this.localStorageTimeKey, JSON.stringify([data]))
            return;
        }

        oldTable.push(data)

        localStorage.setItem(this.localStorageTimeKey, JSON.stringify(oldTable))
    },
    getAllTimes() {
        let timeTable = null;

        try {
            timeTable = localStorage.getItem(this.localStorageTimeKey);
        }
        catch (e) {
            return e;
        }

        return JSON.parse(timeTable)
    },
    updateTimer() {
        const time = GameEnv.time

        if (GameEnv.timerActive) {
            const newTime = time + GameEnv.timerInterval
            GameEnv.time = newTime                
            if (document.getElementById('timeScore')) {
                document.getElementById('timeScore').textContent = (time/1000).toFixed(2) 
            }
                return newTime
            }
            if (document.getElementById('timeScore')) {
                document.getElementById('timeScore').textContent = (time/1000).toFixed(2) 
            }
    },   
    /**
     * Starts the game timer.
     * @function startTimer
     * @memberof GameControl
     */
    startTimer() {
        if (GameEnv.timerActive) {
            console.warn("TIMER ACTIVE: TRUE, TIMER NOT STARTED")
            return;
        }
        
        this.intervalId = setInterval(() => this.updateTimer(), GameEnv.timerInterval);
        GameEnv.timerActive = true;
    },

    /**
     * Stops the game timer.
     * @function stopTimer
     * @memberof GameControl
     */
    stopTimer() {   
        if (!GameEnv.timerActive) return;
        
        this.saveTime(GameEnv.time, GameEnv.coinScore)

        GameEnv.timerActive = false
        GameEnv.time = 0;
        GameEnv.coinScore = 0;
        this.updateCoinDisplay()
        clearInterval(this.intervalID)
    },

    saveTime() {
        const data = {
            userID: GameEnv.userID,
            time: GameEnv.time - 10,
            coinScore: GameEnv.coinScore
        }

        const currDataList = JSON.parse(localStorage.getItem(this.localStorageTimeKey))

        if (!currDataList || !Array.isArray(currDataList)) {
            localStorage.setItem(this.localStorageTimeKey, JSON.stringify([data]))
            return;
        }

        currDataList.push(data)
        
        localStorage.setItem(this.localStorageTimeKey, JSON.stringify(currDataList))
    },  

    // Initialize UI for game stats
    initStatsUI: function() {
        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.style.position = 'fixed';
        statsContainer.style.top = '10px';
        statsContainer.style.right = '10px';
        statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        statsContainer.style.color = 'white';
        statsContainer.style.padding = '10px';
        statsContainer.style.borderRadius = '5px';
        statsContainer.innerHTML = `
            <div>Balance: <span id="balance">0</span></div>
            <div>Chat Score: <span id="chatScore">0</span></div>
            <div>Questions Answered: <span id="questionsAnswered">0</span></div>
        `;
        document.body.appendChild(statsContainer);
    },
};

// Detect window resize events and call the resize function.
window.addEventListener('resize', GameControl.resize.bind(GameControl));

export default GameControl;