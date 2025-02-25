import { javaURI, fetchOptions } from "../api/config.js";

class Stats {
    constructor(personId) {
        this.personId = personId || 1; // personId can be set to cookie once fixed
        this.endpoints = {
            balance: `${javaURI}/rpg_answer/getBalance/${this.personId}`,
            chatScore: `${javaURI}/rpg_answer/getChatScore/${this.personId}`,
            questionsAnswered: `${javaURI}/rpg_answer/getQuestionsAnswered/${this.personId}`
        };
        this.initStatsUI();
    }

    /**
     * Creates and appends the stats UI to the document body.
     */
    initStatsUI() {
        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.style.position = 'fixed';
        statsContainer.style.top = '75px'; 
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
    }

    /**
     * Fetches and updates the game stats UI (Balance, Chat Score, Questions Answered).
     */
    fetchStats() {
        for (let [key, url] of Object.entries(this.endpoints)) {
            fetch(url, fetchOptions)
                .then(response => response.json())
                .then(data => {
                    document.getElementById(key).innerText = data ?? 0;
                })
                .catch(err => console.error(`Error fetching ${key}:`, err));
        }
    }
}

export default Stats;
