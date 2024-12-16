let credit = 500;
let totalPoints = 0;
let currentBet = 0;
let deck, playerHand, dealerHand;

function initializeGame() {
    document.getElementById('credit').textContent = credit;
    document.getElementById('totalPoints').textContent = totalPoints;
    resetHands();
}

function createDeck() {
    const suits = ['♠', '♥', '♣', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

function resetHands() {
    deck = createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    displayCards();
}

function displayCards() {
    const playerCards = document.getElementById('playerCards');
    const dealerCards = document.getElementById('dealerCards');
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    playerHand.forEach(card => createCardElement(card, playerCards));
    dealerHand.forEach(card => createCardElement(card, dealerCards));
    updateScores();
}

function createCardElement(card, container) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card animate';
    cardDiv.textContent = `${card.value}${card.suit}`;
    container.appendChild(cardDiv);
    setTimeout(() => cardDiv.classList.remove('animate'), 500);
}

function updateScores() {
    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
    document.getElementById('dealerScore').textContent = `Score: ${calculateScore(dealerHand)}`;
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    hand.forEach(card => {
        if (card.value === 'A') {
            score += 11;
            aces++;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    });
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}

function placeBet(amount) {
    if (amount > credit) {
        alert('Not enough credit!');
        return;
    }
    currentBet = amount;
    credit -= amount;
    document.getElementById('credit').textContent = credit;
    resetHands();
}

function hit() {
    playerHand.push(deck.pop());
    displayCards();
    if (calculateScore(playerHand) > 21) {
        endRound('Dealer wins!');
    }
}

function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    displayCards();
    determineWinner();
}

function determineWinner() {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (playerScore > 21 || (dealerScore <= 21 && dealerScore >= playerScore)) {
        endRound('Dealer wins!');
    } else {
        endRound('You win!');
    }
}

function endRound(message) {
    alert(message);
    totalPoints += currentBet / 2; // 积分 = 投注金额 / 2
    document.getElementById('totalPoints').textContent = totalPoints;
    document.getElementById('credit').textContent = credit;
}

function restartGame() {
    currentBet = 0;
    resetHands();
}

initializeGame();
