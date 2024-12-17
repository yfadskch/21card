let deck, playerHand, dealerHand, playerName = 'Player', currentBet = 0;
let credit = 500, points = 0, bet = 0;

function setPlayerName() {
    playerName = document.getElementById('playerName').value.trim() || 'Player';
    document.getElementById('playerLabel').textContent = `${playerName}'s Hand`;
    document.getElementById('playerNameContainer').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    startGame();  // Ensure the game starts immediately after setting the player name
}

function startGame() {
    deck = createDeck();
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(), dealCard()];
    displayHand(playerHand, 'playerCards');
    displayHand(dealerHand, 'dealerCards', false); // Show only one card for the dealer initially
    updateGameStatus();
}

function createDeck() {
    // Simulating a simple deck creation and shuffling mechanism
    const suits = ['♠', '♥', '♣', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({value, suit});
        });
    });
    return deck.sort(() => Math.random() - 0.5); // Shuffle the deck
}

function dealCard() {
    return deck.pop(); // Remove and return the last card from the deck
}

function displayHand(hand, containerId, showAll = true) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous cards
    hand.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.textContent = showAll || index === 0 ? `${card.value}${card.suit}` : '??';
        container.appendChild(cardDiv);
    });
}

function hit() {
    playerHand.push(dealCard());
    displayHand(playerHand, 'playerCards');
    checkForBust();
}

function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(dealCard());
    }
    displayHand(dealerHand, 'dealerCards', true);
    endGame();
}

function selectChip(amount) {
    currentBet = amount;
    document.getElementById('betDisplay').textContent = `Bet: ${amount}`;
}

function checkForBust() {
    if (calculateScore(playerHand) > 21) {
        alert(`${playerName} has busted!`);
        endGame();
    }
}

function calculateScore(hand) {
    return hand.reduce((total, card) => total + (card.value === 'A' ? 11 : isNaN(card.value) ? 10 : parseInt(card.value)), 0);
}

function endGame() {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (playerScore > 21 || (dealerScore <= 21 && dealerScore > playerScore)) {
        alert("Dealer wins!");
    } else if (playerScore > dealerScore || dealerScore > 21) {
        alert(`${playerName} wins!`);
    } else {
        alert("It's a tie!");
    }
}

function updateGameStatus() {
    document.getElementById('dealerScore').textContent = `Score: ${calculateScore(dealerHand.slice(0, 1))}`;
    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
    document.getElementById('creditDisplay').textContent = `Credit: ${credit}`;
    document.getElementById('pointDisplay').textContent = `Point: ${points}`;
    document.getElementById('betDisplay').textContent = `Bet: ${bet}`;
}
