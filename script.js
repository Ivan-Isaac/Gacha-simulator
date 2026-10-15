// State Variables
let totalPulls = 0;
let gemsSpent = 0;
let rmSpent = 0;

let inventory = {
    regular: 0,
    rare: 0,
    sr: 0,
    ssr: 0,
    ur: 0
};

// Realistic 5-Tier Commercial Rates (Must sum up to 100)
const RATES = {
    regular: 85.0, // 85%
    rare: 10.0,    // 10%
    sr: 4.0,       // 4%
    ssr: 0.8,      // 0.8%
    ur: 0.2        // 0.2%
};

function rollGacha() {
    let roll = Math.random() * 100;

    if (roll <= RATES.ur) return 'ur';
    roll -= RATES.ur;

    if (roll <= RATES.ssr) return 'ssr';
    roll -= RATES.ssr;

    if (roll <= RATES.sr) return 'sr';
    roll -= RATES.sr;

    if (roll <= RATES.rare) return 'rare';

    return 'regular';
}

function getDisplayData(rarity) {
    switch(rarity) {
        case 'regular': return { name: 'Regular', className: 'regular' };
        case 'rare': return { name: 'Rare', className: 'rare' };
        case 'sr': return { name: 'Super Rare', className: 'super-rare' };
        case 'ssr': return { name: 'SSR', className: 'super-super-rare' };
        case 'ur': return { name: 'Ultra Rare', className: 'ultra-rare' };
    }
}

function performPull(amount) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (let i = 0; i < amount; i++) {
        const rarity = rollGacha();
        inventory[rarity]++;

        totalPulls++;
        gemsSpent += 10;
        rmSpent += 2.00;

        const displayData = getDisplayData(rarity);
        const card = document.createElement('div');
        card.className = `card ${displayData.className}`;
        card.innerText = displayData.name;
        card.style.animationDelay = `${i * 0.05}s`;

        resultsDiv.appendChild(card);
    }

    updateUI();
}

function updateUI() {
    document.getElementById('total-pulls').innerText = totalPulls;
    document.getElementById('gems-spent').innerText = gemsSpent;
    document.getElementById('rm-spent').innerText = `RM ${rmSpent.toFixed(2)}`;

    document.getElementById('count-regular').innerText = inventory.regular;
    document.getElementById('count-rare').innerText = inventory.rare;
    document.getElementById('count-sr').innerText = inventory.sr;
    document.getElementById('count-ssr').innerText = inventory.ssr;
    document.getElementById('count-ur').innerText = inventory.ur;
}

function reset() {
    totalPulls = 0;
    gemsSpent = 0;
    rmSpent = 0;
    inventory = { regular: 0, rare: 0, sr: 0, ssr: 0, ur: 0 };
    document.getElementById('results').innerHTML = '';
    updateUI();
}

// Event Listeners
document.getElementById('pull-1-btn').addEventListener('click', () => performPull(1));
document.getElementById('pull-10-btn').addEventListener('click', () => performPull(10));
document.getElementById('reset-btn').addEventListener('click', reset);