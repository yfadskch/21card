let deck = [];
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;

let credit = 500;
let bet = 0;
let points = 0;

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

// 抽牌
function drawCard() {
    const randomIndex = Math.floor(Math.random() * deck.length);
    return deck.splice(randomIndex, 1)[0];
}

// 计算得分
function calculateScore(cards) {
    let score = 0;
    let aceCount = 0;
    cards.forEach(card => {
        if (!card) return;
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

// 选择筹码
function placeBet(amount) {
    bet = amount;
    document.getElementById('bet').textContent = bet;
}

// 开局
function deal() {
    initializeDeck();
    playerCards = [drawCard(), drawCard()];
    dealerCards = [drawCard(), { value: '?', suit: '?' }];
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

// 选择奖励
function chooseReward() {
    const choice = prompt("Choose a reward:\n1. 200 Points: +200 Balance\n2. 1000 Points: Welcome Bonus %\n3. 3000 Points: Free 8.88");
    let message = "";
    if (choice === "1") {
        points += 200;
        message = "1. 200 Points: +200 Balance";
    } else if (choice === "2") {
        message = "2. 1000 Points: Welcome Bonus %";
    } else if (choice === "3") {
        message = "3. 3000 Points: Free 8.88";
    } else {
        message = "Invalid choice!";
    }
    alert(`You chose: ${message}`);
}

// Hit 功能
document.getElementById('hit').addEventListener('click', () => {
    playerCards.push(drawCard());
    playerScore = calculateScore(playerCards);
    updateUI();
});

// Stand 功能
document.getElementById('stand').addEventListener('click', () => {
    dealerCards[1] = drawCard();
    dealerScore = calculateScore(dealerCards);
    updateUI();
    document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
    if (playerScore > dealerScore || dealerScore > 21) {
        alert("Player Wins!");
        credit += bet;
    } else {
        alert("Dealer Wins!");
        credit -= bet;
    }
});
