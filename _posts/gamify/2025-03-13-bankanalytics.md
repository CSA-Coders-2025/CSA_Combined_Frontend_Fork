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

  .demo-warning {
    color: #ffd700;
    text-align: center;
    padding: 1rem;
    border: 1px solid #ffd700;
    border-radius: 4px;
    margin: 1rem 0;
  }
</style>

<div class="container">
  <h1 class="text-light">Game Analytics Dashboard</h1>

  <div class="game-card">
    <h2 class="game-title">User Overview</h2>
    <div class="text-center mb-4">
      <h4 class="text-warning">User: <span id="username">Loading...</span></h4>
      <h4 class="text-success">Balance: $<span id="balance">0.00</span></h4>
      <div id="demoWarning" class="demo-warning" style="display: none;">
        Live data unavailable - Showing demo data
      </div>
    </div>
  </div>

  <div class="game-card">
    <h2 class="game-title">Combined Analytics</h2>
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
      <h3 class="game-title">Crypto</h3>
      <div class="chart-container">
        <canvas id="cryptominingChart"></canvas>
      </div>
    </div>
    <div class="game-card">
      <h3 class="game-title">Stocks</h3>
      <div class="chart-container">
        <canvas id="stocksChart"></canvas>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script type="module">
// Configuration
const config = {
  javaURI: 'http://localhost:8085',
  demoMode: false,
  gameConfig: {
    'casino_poker': { color: '#FF6384', label: 'Poker' },
    'casino_blackjack': { color: '#4BC0C0', label: 'Blackjack' },
    'casino_dice': { color: '#FFCE56', label: 'Dice' },
    'casino_mines': { color: '#9966FF', label: 'Mines' },
    'stocks': { color: '#28a745', label: 'Stocks' },
    'cryptomining': { color: '#00ffff', label: 'Crypto' }
  },
  demoData: {
    balance: 15000.00,
    profitMap: {
      casino_poker: [[Date.now()-86400000, 500], [Date.now(), 300]],
      casino_blackjack: [[Date.now()-86400000, -200], [Date.now(), 450]],
      casino_dice: [[Date.now()-86400000, 150], [Date.now(), -100]],
      casino_mines: [[Date.now()-86400000, 700], [Date.now(), 200]],
      stocks: [[Date.now()-86400000, 1200], [Date.now(), 800]],
      cryptomining: [[Date.now()-86400000, 300], [Date.now(), 450]]
    }
  }
};

// Chart instances
let combinedChart = null;
const individualCharts = {};

// Data processing     
function processTransactions(transactions) {
  const dailyData = {};
  transactions?.forEach(([timestamp, amount]) => {
    try {
      const date = new Date(typeof timestamp === 'string' ? timestamp : timestamp);
      const dateString = date.toLocaleDateString();
      dailyData[dateString] = (dailyData[dateString] || 0) + Number(amount);
    } catch (e) {
      console.warn('Invalid transaction:', e);
    }       
  });
  return {
    labels: Object.keys(dailyData).sort(),
    values: Object.values(dailyData)
  };
}

// Chart creation
function createChart(ctx, game, data) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: `${config.gameConfig[game].label} Profit/Loss`,
        data: data.values,
        borderColor: config.gameConfig[game].color,
        backgroundColor: `${config.gameConfig[game].color}20`,
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

// Combined chart
function createCombinedChart(data) {
  const ctx = document.getElementById('combinedChart').getContext('2d');
  const datasets = Object.entries(data).map(([game, gameData]) => ({
    label: config.gameConfig[game].label,
    data: gameData.values,
    borderColor: config.gameConfig[game].color,
    backgroundColor: `${config.gameConfig[game].color}20`,
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
        y: { beginAtZero: true, grid: { color: '#ffffff20' }, ticks: { color: '#fff' } },
        x: { grid: { color: '#ffffff10' }, ticks: { color: '#fff' } }
      },
      plugins: { legend: { labels: { color: '#fff' } } }
    }
  });
}

// Data loading
async function loadData() {
  try {
    // First, fetch the user's person ID
    const personResponse = await fetch(`${config.javaURI}/api/person/get`, {
      method: 'GET', // Explicitly set the method to GET
      credentials: 'include'
    });

    if (!personResponse.ok) {
      throw new Error(`Failed to fetch user info: HTTP ${personResponse.status}`);
    }
    const personData = await personResponse.json();
    const personId = personData?.id;
             
    if (!personId) {
      throw new Error('Could not retrieve user ID.');
    }
             
    // Now, fetch bank analytics using the person ID
    const analyticsResponse = await fetch(`${config.javaURI}/bank/analytics/person/${personId}`, {
      credentials: 'include'
    });

    if (!analyticsResponse.ok) {
      throw new Error(`Failed to fetch bank analytics: HTTP ${analyticsResponse.status}`);
    }                                                    
    const analyticsData = await analyticsResponse.json();
             
    if (!analyticsData.success) {
      throw new Error('Invalid analytics response format');
    }             
    return analyticsData.data;
             
  } catch (error) {
    console.warn('Error loading data:', error);
    config.demoMode = true;
    document.getElementById('demoWarning').style.display = 'block';
    return config.demoData;
  }
}

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const bankData = await loadData();

    // Update UI with actual data
    document.getElementById('balance').textContent = bankData.balance.toFixed(2);
    document.getElementById('username').textContent = bankData.username || 'Player'; // Use fetched username

    // Process data
    const processedData = {};
    Object.keys(config.gameConfig).forEach(game => {
      const rawData = bankData.profitMap?.[game] || [];
      processedData[game] = processTransactions(rawData);

      const ctx = document.getElementById(`${game}Chart`)?.getContext('2d');
      if (ctx) individualCharts[game] = createChart(ctx, game, processedData[game]);
    });

    // Create combined chart
    createCombinedChart(processedData);

    // Toggle functionality
    document.querySelectorAll('.toggle-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const game = e.target.dataset.game;
        const isActive = e.target.classList.contains('active');
        e.target.classList.toggle('active', !isActive);

        const dataset = combinedChart.data.datasets
          .find(d => d.label === config.gameConfig[game].label);
        if (dataset) dataset.hidden = isActive;
        combinedChart.update();
      });
    });

  } catch (error) {
    console.error('Initialization failed:', error);
    document.body.innerHTML = `<div class="error-message">Failed to load analytics. Please try again later: ${error}</div>`;
  }
});
</script>