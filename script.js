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

// 重置游戏状态
function resetGame() {
    playerCards = [];
    dealerCards = [];
    playerScore = 0;
    dealerScore = 0;
    updateUI();
    startGame();
}

// 抽牌
function drawCard() {
    if (deck.length === 0) {
        console.log("The deck is empty! Shuffling a new deck...");
        initializeDeck(); // 自动重新生成牌堆
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

// 自动开始游戏
function startGame() {
    initializeDeck();
    playerCards = [drawCard(), drawCard()];
    dealerCards = [drawCard(), { value: '?', suit: '?' }];
    playerScore = calculateScore(playerCards);
    updateUI();
}

// 更新界面
function updateUI() {
    document.getElementById('player-cards').innerHTML = playerCards
        .map(c => `<div class="card">${c.value}${c.suit}</div>`)
        .join('');

    document.getElementById('dealer-cards').innerHTML = dealerCards
        .map(c => `<div class="card">${c.value}${c.suit}</div>`)
        .join('');

    document.getElementById('player-score').textContent = `Score: ${playerScore}`;
    document.getElementById('credit').textContent = credit;
    document.getElementById('point').textContent = points;
}

// Hit 功能
document.getElementById('hit').addEventListener('click', () => {
    playerCards.push(drawCard());
    playerScore = calculateScore(playerCards);
    updateUI();
    if (playerScore > 21) {
        endGame("Dealer Wins", "red");
    }
});

// Stand 功能
document.getElementById('stand').addEventListener('click', () => {
    dealerCards[1] = drawCard(); // 揭开第二张牌
    dealerScore = calculateScore(dealerCards);

    while (dealerScore < 17) {
        dealerCards.push(drawCard());
        dealerScore = calculateScore(dealerCards);
    }

    if (dealerScore > 21 || playerScore > dealerScore) {
        endGame("Player Wins", "blue");
    } else if (playerScore === dealerScore) {
        endGame("It's a Tie!", "green");
    } else {
        endGame("Dealer Wins", "red");
    }
});

// 游戏结束
function endGame(message, color) {
    alert(message);
    points += Math.floor(bet / 2);
    addGameRecord(color);
    resetGame();
}

// 增加游戏记录
function addGameRecord(color) {
    const recordContainer = document.getElementById("record-container");
    const record = document.createElement("div");
    record.className = `record ${color}`;
    recordContainer.appendChild(record);
}

// Reward 功能
function chooseReward() {
    const choice = prompt("Choose a reward:\n1. 200 Points: +200 Balance\n2. 1000 Points: Welcome Bonus %\n3. 3000 Points: Free 8.88");
    if (choice === "1" && points >= 200) {
        points -= 200;
        credit += 200;
        alert("Reward: +200 Balance");
    } else if (choice === "2" && points >= 1000) {
        points -= 1000;
        alert("Reward: Welcome Bonus %");
    } else if (choice === "3" && points >= 3000) {
        points -= 3000;
        alert("Reward: Free 8.88");
    } else {
        alert("Not enough points!");
    }
    document.getElementById('point').textContent = points;
}

// 页面加载时启动游戏
window.onload = startGame;
