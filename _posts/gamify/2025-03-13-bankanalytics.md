---
layout: fortunefinders
title: Bank Analytics
permalink: /gamify/bankanalytics
---

<style>
  :root {
    --primary-color: #ff9800;
    --background-color: #1f1f1f;
    --text-color: #ffffff;
    --chart-grid-color: rgba(255, 255, 255, 0.1);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .game-card {
    background-color: #2d2d2d;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .chart-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .chart-container {
    height: 400px;
    position: relative;
  }

  .game-title {
    color: var(--primary-color);
    border-left: 4px solid var(--primary-color);
    padding-left: 1rem;
    margin: 0 0 1.5rem 0;
  }

  .toggle-container {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .toggle-button {
    background: none;
    border: 1px solid currentColor;
    color: var(--text-color);
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .toggle-button.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    font-weight: bold;
  }

  .error-message {
    color: #ff6b6b;
    text-align: center;
    padding: 2rem;
  }
</style>

<div class="container">
  <h1 class="text-light">Game Analytics Dashboard</h1>
  
  <div class="game-card">
    <h2 class="game-title">User Overview</h2>
    <div class="text-center mb-4">
      <h4 class="text-warning">User ID: <span id="userId">Loading...</span></h4>
      <h4 class="text-success">Current Balance: $<span id="balance">0.00</span></h4>
    </div>
  </div>

  <div class="game-card">
    <h2 class="game-title">All Games Combined</h2>
    <div class="toggle-container" id="toggleButtons">
      <button class="toggle-button active" data-game="casino_poker">Poker</button>
      <button class="toggle-button active" data-game="casino_blackjack">Blackjack</button>
      <button class="toggle-button active" data-game="casino_dice">Dice</button>
      <button class="toggle-button active" data-game="casino_mines">Mines</button>
      <button class="toggle-button active" data-game="stocks">Stocks</button>
      <button class="toggle-button active" data-game="cryptomining">Crypto</button>
    </div>
    <div class="chart-container">
      <canvas id="combinedChart"></canvas>
    </div>
  </div>

  <div class="chart-grid">
    <div class="game-card">
      <h3 class="game-title">Poker</h3>
      <div class="chart-container">
        <canvas id="casino_pokerChart"></canvas>
      </div>
    </div>
    <div class="game-card">
      <h3 class="game-title">Blackjack</h3>
      <div class="chart-container">
        <canvas id="casino_blackjackChart"></canvas>
      </div>
    </div>
    <div class="game-card">
      <h3 class="game-title">Dice</h3>
      <div class="chart-container">
        <canvas id="casino_diceChart"></canvas>
      </div>
    </div>
    <div class="game-card">
      <h3 class="game-title">Mines</h3>
      <div class="chart-container">
        <canvas id="casino_minesChart"></canvas>
      </div>
    </div>
    <div class="game-card">
      <h3 class="game-title">Crypto Portfolio</h3>
      <div class="chart-container">
        <canvas id="cryptominingChart"></canvas>
      </div>
    </div>
    <div class="game-card">
      <h3 class="game-title">Stock Portfolio</h3>
      <div class="chart-container">
        <canvas id="stocksChart"></canvas>
      </div>
    </div>
  </div>
</div>

<script type="module">
import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

const gameConfig = {
    'casino_poker': { color: '#FF6384', label: 'Poker' },
    'casino_blackjack': { color: '#4BC0C0', label: 'Blackjack' },
    'casino_dice': { color: '#FFCE56', label: 'Dice' },
    'casino_mines': { color: '#9966FF', label: 'Mines' },
    'stocks': { color: '#28a745', label: 'Stocks' },
    'cryptomining': { color: '#00ffff', label: 'Crypto' }
};

let combinedChart = null;
const individualCharts = {};

async function fetchUserData() {
    try {
        const response = await fetch(`${javaURI}/api/person/get`, {
            ...fetchOptions,
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        return await response.json();
    } catch (error) {
        console.error('User data error:', error);
        showError('Failed to load user data');
        return null;
    }
}

async function fetchBankData(userId) {
    try {
        const response = await fetch(`${javaURI}/bank/analytics/${userId}`, {
            ...fetchOptions,
            credentials: 'include'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Bank data error:', error);
        showError('Failed to load financial data');
        return null;
    }
}

function processGameData(transactions) {
    const dailyData = {};
    transactions?.forEach(([timestamp, amount]) => {
        try {
            const date = new Date(timestamp).toLocaleDateString();
            dailyData[date] = (dailyData[date] || 0) + Number(amount);
        } catch (e) {
            console.warn('Invalid transaction data:', e);
        }
    });
    return {
        labels: Object.keys(dailyData).sort(),
        values: Object.values(dailyData)
    };
}

function createChart(ctx, game, data) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: `${gameConfig[game].label} Profit/Loss`,
                data: data.values,
                borderColor: gameConfig[game].color,
                backgroundColor: `${gameConfig[game].color}20`,
                tension: 0.2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#ffffff20' },
                    ticks: { color: '#fff' }
                },
                x: {
                    grid: { color: '#ffffff10' },
                    ticks: { color: '#fff' }
                }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });
}

function createCombinedChart(data) {
    const ctx = document.getElementById('combinedChart').getContext('2d');
    const datasets = Object.entries(data).map(([game, gameData]) => ({
        label: gameConfig[game].label,
        data: gameData.values,
        borderColor: gameConfig[game].color,
        backgroundColor: `${gameConfig[game].color}20`,
        tension: 0.2,
        hidden: false
    }));

    combinedChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data[Object.keys(data)[0]]?.labels || [],
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#ffffff20' },
                    ticks: { color: '#fff' }
                },
                x: {
                    grid: { color: '#ffffff10' },
                    ticks: { color: '#fff' }
                }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });
}

function showError(message) {
    const container = document.querySelector('.container');
    container.innerHTML += `<div class="error-message">${message}</div>`;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Get user data
        const userData = await fetchUserData();
        if (!userData?.id) {
            showError('Failed to load user information');
            return;
        }
        document.getElementById('userId').textContent = userData.id;

        // Get bank data
        const bankData = await fetchBankData(userData.id);
        if (!bankData) {
            showError('Financial data not available');
            return;
        }

        // Update balance
        document.getElementById('balance').textContent = bankData.balance?.toFixed(2) || '0.00';

        // Process and display charts
        const processedData = {};
        Object.keys(gameConfig).forEach(game => {
            const rawData = bankData.profitMap?.[game] || [];
            processedData[game] = processGameData(rawData);
            
            const ctx = document.getElementById(`${game}Chart`)?.getContext('2d');
            if (ctx) {
                individualCharts[game] = createChart(ctx, game, processedData[game]);
            }
        });

        createCombinedChart(processedData);

        // Add chart toggle functionality
        document.querySelectorAll('.toggle-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const game = e.target.dataset.game;
                const isActive = e.target.classList.contains('active');
                e.target.classList.toggle('active', !isActive);
                
                const dataset = combinedChart.data.datasets.find(d => d.label === gameConfig[game].label);
                if (dataset) dataset.hidden = isActive;
                combinedChart.update();
            });
        });

    } catch (error) {
        console.error('Initialization error:', error);
        showError('Failed to initialize dashboard');
    }
});
</script>