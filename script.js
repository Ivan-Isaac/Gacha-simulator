/* ==========================================================
   1. STATE & CONFIGURATION
   ========================================================== */

let totalPulls = 0;
let gemsSpent = 0;
let rmSpent = 0;
let hasTriggeredFirstUR = false; // Tracks if the jackpot roast has played

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

// Spending milestones with custom guilt-trip copy
const GUILT_MILESTONES = [
    { threshold: 20, title: "🍜 SNACK TIME SACRIFICED", message: "That RM 20 could have bought you 2 decent bowls of Pan Mee or 6 cups of Teh Tarik." },
    { threshold: 50, title: "⛽ ROAD TRIP CANCELED", message: "You just burnt a full tank of RON95 petrol on pure RNG." },
    { threshold: 100, title: "🛒 GROCERY RUN WIPED", message: "RM 100 gone. That's a week's worth of groceries, eggs, and Milo down the drain." },
    { threshold: 250, title: "💡 TNB & UNIFI IN SHAMBLES", message: "You could have paid your monthly electricity and home WiFi with that pull streak." },
    { threshold: 500, title: "🚨 CALL CREDIT COUNSELING (AKPK)", message: "RM 500 spent. That could have been a round-trip flight or half an iPad." }
];

let triggeredMilestones = new Set();


/* ==========================================================
   2. CORE LOGIC & GACHA ROLLS
   ========================================================== */

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
    let pulledURThisBatch = false;

    for (let i = 0; i < amount; i++) {
        const rarity = rollGacha();
        inventory[rarity]++;

        if (rarity === 'ur') {
            pulledURThisBatch = true;
        }

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

    // Priority 1: Check if an Ultra Rare was drawn
    if (pulledURThisBatch && !hasTriggeredFirstUR) {
        hasTriggeredFirstUR = true;
        showURJackpotModal();
    } else {
        // Priority 2: Check standard spending milestones
        checkGuiltMilestones();
    }
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
    hasTriggeredFirstUR = false;
    inventory = { regular: 0, rare: 0, sr: 0, ssr: 0, ur: 0 };
    triggeredMilestones.clear();
    document.getElementById('results').innerHTML = '';
    updateUI();
}


/* ==========================================================
   3. MODAL HANDLERS
   ========================================================== */

function checkGuiltMilestones() {
    for (const m of GUILT_MILESTONES) {
        if (rmSpent >= m.threshold && !triggeredMilestones.has(m.threshold)) {
            triggeredMilestones.add(m.threshold);
            showGuiltModal(m.title, m.message);
            break;
        }
    }
}

function showGuiltModal(title, message) {
    const modal = document.getElementById('guilt-modal');
    document.getElementById('guilt-title').innerText = title;
    document.getElementById('guilt-spent').innerText = `Total Wasted: RM ${rmSpent.toFixed(2)}`;
    document.getElementById('guilt-message').innerText = message;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

function showURJackpotModal() {
    const modal = document.getElementById('ur-modal');
    document.getElementById('ur-stats').innerText = `Cost: ${totalPulls} Pulls (RM ${rmSpent.toFixed(2)})`;
    document.getElementById('ur-message').innerText = 
        `You finally beat the 0.2% odds and got the rainbow pixel! But look at the number above... was it truly worth it?`;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}


/* ==========================================================
   4. EVENT LISTENERS
   ========================================================== */

document.getElementById('pull-1-btn').addEventListener('click', () => performPull(1));
document.getElementById('pull-10-btn').addEventListener('click', () => performPull(10));
document.getElementById('reset-btn').addEventListener('click', reset);

document.getElementById('guilt-close-btn').addEventListener('click', () => {
    const modal = document.getElementById('guilt-modal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
});

document.getElementById('ur-close-btn').addEventListener('click', () => {
    const modal = document.getElementById('ur-modal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
});