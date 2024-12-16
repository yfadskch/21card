let deck, playerHand, dealerHand, playerName = 'Player', currentBet = 0;
let credit = 500, points = 0;

function createDeck() {
    const suits = ['♠', '♥', '♣', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

function setPlayerName() {
    const nameInput = document.getElementById('playerName').value.trim();
    playerName = nameInput || 'Player';
    document.getElementById('playerLabel').textContent = `${playerName}'s Hand`;
    document.getElementById('playerNameContainer').style.display = 'none';
    document.getElementById('gameRules').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    document.getElementById('statusContainer').style.display = 'block';
    document.getElementById('chipContainer').style.display = 'block';
    document.getElementById('actionButtons').style.display = 'block';
    startGame();
}

function startGame() {
    deck = createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    displayHand(playerHand, 'playerCards');
    displayHand(dealerHand.slice(0, 1), 'dealerCards');
    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
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
    document.getElementById('highlight').textContent = `Selected Bet: ${amount}`;
    document.getElementById('betDisplay').textContent = `Bet: ${amount}`; // 更新 Bet 显示
}

function hit() {
    if (currentBet === 0) {
        alert("Please select a chip to place your bet!");
        return;
    }

    playerHand.push(deck.pop());
    displayHand(playerHand, 'playerCards');
    const score = calculateScore(playerHand);
    document.getElementById('playerScore').textContent = `Score: ${score}`;
    if (score > 21) {
        alert('You busted! Dealer wins.');
        endRound(false);
    }
}

function stand() {
    const playerScore = calculateScore(playerHand);
    let dealerScore = calculateScore(dealerHand);
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        dealerScore = calculateScore(dealerHand);
    }
    displayHand(dealerHand, 'dealerCards');
    if (dealerScore > 21 || playerScore > dealerScore) {
        alert(`${playerName} wins!`);
        endRound(true);
    } else {
        alert('Dealer wins.');
        endRound(false);
    }
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

function endRound(isWin) {
    if (isWin) {
        credit += currentBet;
    } else {
        credit -= currentBet;
    }
    points += currentBet / 2;

    document.getElementById('creditDisplay').textContent = `Credit: ${credit}`;
    document.getElementById('pointDisplay').textContent = `Point: ${points}`;
    startGame();
}
