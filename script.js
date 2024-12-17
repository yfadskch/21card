let deck, playerHand, dealerHand, playerName = 'Player', currentBet = 0;
let credit = 500, points = 0, bet = 0;

// Set player name and start the game
function setPlayerName() {
    playerName = document.getElementById('playerName').value.trim() || 'Player';
    document.getElementById('playerLabel').textContent = `${playerName}'s Hand`;
    document.getElementById('playerNameContainer').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    startGame();
}

// Initialize the game
function startGame() {
    deck = createDeck();
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(), dealCard()];
    displayHand(playerHand, 'playerCards');
    displayHand(dealerHand, 'dealerCards', false);
    updateGameStatus();
}

// Create a deck of cards
function createDeck() {
    const suits = ['♠', '♥', '♣', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({value, suit});
        });
    });
    return deck.sort(() => Math.random() - 0.5);
}

// Deal a card from the deck
function dealCard() {
    return deck.pop();
}

// Display the hand of cards
function displayHand(hand, containerId, showAll = true) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    hand.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.textContent = showAll || index === 0 ? `${card.value}${card.suit}` : '??';
        container.appendChild(cardDiv);
    });
}

// Update the game status on the UI
function updateGameStatus() {
    document.getElementById('dealerScore').textContent = `Score: ${calculateScore(dealerHand.slice(0, 1))}`;
    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
    document.getElementById('creditDisplay').textContent = `Credit: ${credit}`;
    document.getElementById('pointDisplay').textContent = `Point: ${points}`;
    document.getElementById('betDisplay').textContent = `Bet: ${bet}`;
}

// Calculate the score of a hand
function calculateScore(hand) {
    return hand.reduce((total, card) => total + (card.value === 'A' ? 11 : isNaN(card.value) ? 10 : parseInt(card.value)), 0);
}

// Function to handle hit action
function hit() {
    playerHand.push(dealCard());
    displayHand(playerHand, 'playerCards');
    checkForEndOfGame();
}

// Function to handle stand action
function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(dealCard());
    }
    displayHand(dealerHand, 'dealerCards', true);
    checkForEndOfGame();
}

// Check for the end of the game
function checkForEndOfGame() {
    const playerScore = calculateScore(playerHand);
    if (playerScore > 21) {
        alert(`${playerName} has busted!`);
    } else {
        alert("The game continues, make your next move.");
    }
}

// Open reward modal (dummy function for demonstration)
function openRewardModal() {
    alert('Claim your rewards here!');
}

document.getElementById('rewardBtn').addEventListener('click', openRewardModal);
