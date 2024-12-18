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

// 随机抽牌
function drawCard() {
    const randomIndex = Math.floor(Math.random() * deck.length);
    return deck.splice(randomIndex, 1)[0];
}

// 计算得分
function calculateScore(cards) {
    let score = 0;
    let aceCount = 0;
    for (let card of cards) {
        if (['J', 'Q', 'K'].includes(card.value)) score += 10;
        else if (card.value === 'A') {
            aceCount++;
            score += 11;
        } else score += parseInt(card.value);
    }
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

// 下注
function placeBet(amount) {
    if (credit >= amount) {
        bet = amount;
        document.getElementById('bet').textContent = bet;
    } else {
        alert('Not enough credit!');
    }
}

// 发牌功能
function deal() {
    if (bet === 0) {
        alert('Please place a bet first!');
        return;
    }
    initializeDeck();
    playerCards = [drawCard(), drawCard()];
    dealerCards = [drawCard(), drawCard()];
    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards);
    updateUI();
}

// 更新界面
function updateUI() {
    document.getElementById('player-cards').innerHTML = playerCards.map(c => `<div class="card">${c.value}${c.suit}</div>`).join('');
    document.getElementById('dealer-cards').innerHTML = dealerCards.map(c => `<div class="card">${c.value}${c.suit}</div>`).join('');
    document.getElementById('player-score').textContent = `Score: ${playerScore}`;
    document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = points;
}

// 事件监听
document.getElementById('deal').addEventListener('click', deal);
document.getElementById('hit').addEventListener('click', () => alert('Hit functionality coming soon!'));
document.getElementById('stand').addEventListener('click', () => alert('Stand functionality coming soon!'));
