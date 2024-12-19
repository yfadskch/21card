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

    // 清空玩家和庄家的牌
    playerCards = [];
    dealerCards = [];
    playerScore = 0;
    dealerScore = 0;
}

// 抽牌
function drawCard() {
    if (deck.length === 0) {
        alert("The deck is empty! Shuffling a new deck...");
        initializeDeck(); // 重新生成牌堆
    }
    const randomIndex = Math.floor(Math.random() * deck.length);
    return deck.splice(randomIndex, 1)[0];
}

// 计算得分
function calculateScore(cards) {
    let score = 0;
    let aceCount = 0;
    cards.forEach(card => {
        if (!card) return; // 跳过无效卡牌
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
    if (deck.length < 4) {
        alert("The deck is too low! Shuffling a new deck...");
        initializeDeck(); // 重新生成牌堆
    }

    playerCards = [drawCard(), drawCard()];
    dealerCards = [drawCard(), { value: '?', suit: '?' }];
    playerScore = calculateScore(playerCards);
    updateUI();
}

// 更新界面
function updateUI() {
    document.getElementById('player-cards').innerHTML = playerCards
        .filter(card => card && card.value && card.suit) // 过滤掉无效卡牌
        .map(c => `<div class="card">${c.value}${c.suit}</div>`)
        .join('');

    document.getElementById('dealer-cards').innerHTML = dealerCards
        .filter(card => card && card.value && card.suit) // 过滤掉无效卡牌
        .map(c => `<div class="card">${c.value}${c.suit}</div>`)
        .join('');

    document.getElementById('player-score').textContent = `Score: ${playerScore}`;
    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = points;
}

// Hit 功能
document.getElementById('hit').addEventListener('click', () => {
    const newCard = drawCard();
    playerCards.push(newCard);
    playerScore = calculateScore(playerCards);
    updateUI();
});

// Stand 功能
document.getElementById('stand').addEventListener('click', () => {
    dealerCards[1] = drawCard(); // 揭开第二张牌
    dealerScore = calculateScore(dealerCards);
    updateUI();

    document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
    if (playerScore > dealerScore || dealerScore > 21) {
        alert("Player Wins!");
        credit += bet;
    } else if (playerScore === dealerScore) {
        alert("It's a Tie!");
    } else {
        alert("Dealer Wins!");
        credit -= bet;
    }

    document.getElementById('credit').textContent = credit;
});

// Reward 功能
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
