let deck = [];
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;

let credit = 500;
let bet = 0;
let points = 0;
let gameRecord = [];

// 初始化牌堆
function initializeDeck() {
    const suits = ['♥', '♦', '♠', '♣'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

function drawCard() {
    const randomIndex = Math.floor(Math.random() * deck.length);
    return deck.splice(randomIndex, 1)[0];
}

function calculateScore(cards) {
    let score = 0;
    let aceCount = 0;
    cards.forEach(card => {
        if (['J', 'Q', 'K'].includes(card.value)) score += 10;
        else if (card.value === 'A') {
            score += 11;
            aceCount++;
        } else score += parseInt(card.value);
    });
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

function placeBet(amount) {
    bet = amount;
    document.getElementById('bet').textContent = bet;
}

function deal() {
    if (bet === 0) return alert('Please place a bet first!');
    initializeDeck();
    playerCards = [drawCard(), drawCard()];
    dealerCards = [drawCard(), { value: '?', suit: '?' }]; // 第二张隐藏
    playerScore = calculateScore(playerCards);
    updateUI();
}

function updateUI() {
    document.getElementById('player-cards').innerHTML = playerCards.map(c => `<div class="card">${c.value}${c.suit}</div>`).join('');
    document.getElementById('dealer-cards').innerHTML = dealerCards.map(c => `<div class="card">${c.value}${c.suit}</div>`).join('');
    document.getElementById('player-score').textContent = `Score: ${playerScore}`;
    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = points;
}

function chooseReward() {
    let choice = prompt("Choose a reward:\n1. 200 Points: +200 Balance\n2. 1000 Points: Welcome Bonus %\n3. 3000 Points: Free 8.88");
    alert(`You chose: ${choice}`);
}
document.getElementById('deal').addEventListener('click', deal);
