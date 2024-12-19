let deck = [];
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;

let credit = 500;
let bet = 0;
let points = 0;
let gameRecords = [];

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

function resetGame() {
    playerCards = [];
    dealerCards = [];
    playerScore = 0;
    dealerScore = 0;
    updateUI();
    startGame();
}

function drawCard() {
    if (deck.length === 0) initializeDeck();
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

function startGame() {
    initializeDeck();
    playerCards = [drawCard(), drawCard()];
    dealerCards = [drawCard(), { value: '?', suit: '?' }];
    playerScore = calculateScore(playerCards);
    updateUI();
}

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

document.getElementById('hit').addEventListener('click', () => {
    playerCards.push(drawCard());
    playerScore = calculateScore(playerCards);
    updateUI();
    if (playerScore > 21) endGame("Dealer Wins", "red");
});

document.getElementById('stand').addEventListener('click', () => {
    dealerCards[1] = drawCard();
    dealerScore = calculateScore(dealerCards);

    while (dealerScore < 17) {
        dealerCards.push(drawCard());
        dealerScore = calculateScore(dealerCards);
    }

    if (dealerScore > 21 || playerScore > dealerScore) {
        endGame(`Player Wins! Dealer's cards are ${displayCards(dealerCards)} (Score: ${dealerScore})`, "blue");
    } else if (playerScore === dealerScore) {
        endGame(`It's a Tie! Dealer's cards are ${displayCards(dealerCards)} (Score: ${dealerScore})`, "green");
    } else {
        endGame(`Dealer Wins! Dealer's cards are ${displayCards(dealerCards)} (Score: ${dealerScore})`, "red");
    }
});

function endGame(message, color) {
    alert(message);
    points += Math.floor(bet / 2);

    if (color === "blue") credit += bet;
    else if (color === "red") credit -= bet;

    addGameRecord(color);
    updateUI();
    resetGame();
}

function addGameRecord(color) {
    if (gameRecords.length === 10) gameRecords.shift();
    gameRecords.push(color);
    const recordContainer = document.getElementById("record-container");
    recordContainer.innerHTML = gameRecords.map(c => `<div class="record ${c}"></div>`).join('');
}

function displayCards(cards) {
    return cards.map(c => `${c.value}${c.suit}`).join(" + ");
}

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

window.onload = startGame;
