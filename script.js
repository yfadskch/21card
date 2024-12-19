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
    if (deck.length === 0) {
        console.error("No more cards in the deck!");
        return { value: '?', suit: '?' }; // 返回占位卡
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
    initializeDeck();
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
    if (newCard) {
        playerCards.push(newCard);
        playerScore = calculateScore(playerCards);
        updateUI();
    } else {
        alert("No more cards left!");
    }
});

// Stand 功能
document.getElementById('stand').addEventListener('click', () => {
    dealerCards[1] = drawCard(); // 揭开第二张牌
    dealerScore = calculateScore(dealerCards);
    updateUI();

    // 显示最终分数并判断胜负
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
