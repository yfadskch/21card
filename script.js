const suits = ['♠', '♥', '♣', '♦'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck, playerHand, dealerHand, playerName = 'Player', currentBet = 0;
let credit = 500, points = 0;

function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

function calculateScore(hand) {
    let score = 0, aceCount = 0;
    hand.forEach(card => {
        if (card.value === 'A') {
            score += 11;
            aceCount++;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    });
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

function displayHand(hand, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    hand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.textContent = `${card.value}${card.suit}`;
        container.appendChild(cardDiv);
    });
}

function selectChip(amount) {
    currentBet = amount;
    document.getElementById('highlight').textContent = `Current Bet: ${amount}`;
}

function hit() {
    if (currentBet === 0) {
        alert("Please select a chip to place your bet!");
        return;
    }

    playerHand.push(deck.pop());
    displayHand(playerHand, 'playerCards');
    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;

    if (calculateScore(playerHand) > 21) {
        alert('You busted! Dealer wins.');
        endRound(false);
    }
}

function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    displayHand(dealerHand, 'dealerCards');

    let playerScore = calculateScore(playerHand);
    let dealerScore = calculateScore(dealerHand);

    if (dealerScore > 21 || playerScore > dealerScore) {
        alert(`${playerName} wins!`);
        endRound(true);
    } else if (playerScore < dealerScore) {
        alert('Dealer wins.');
        endRound(false);
    } else {
        alert('It\'s a tie!');
        endRound(true);
    }
}

function endRound(isWin) {
    if (isWin) {
        credit += currentBet;
    } else {
        credit -= currentBet;
    }
    points += currentBet / 2;

    document.getElementById('creditDisplay').textContent = `Credit: ${credit}`;
    document.getElementById('pointDisplay').textContent = `Point: ${points}`;
    document.getElementById('highlight').textContent = `Current Bet: 0`;
    currentBet = 0;

    resetGame();
}

function resetGame() {
    setTimeout(startGame, 1000);
}

function startGame() {
    deck = createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    displayHand(playerHand, 'playerCards');
    displayHand(dealerHand.slice(0, 1), 'dealerCards');

    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
    document.getElementById('dealerScore').textContent = 'Score: ?';
}
