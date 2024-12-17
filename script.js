let deck, playerHand, dealerHand, playerName = 'Player', currentBet = 0;
let credit = 500, points = 0, bet = 0;

function setPlayerName() {
    playerName = document.getElementById('playerName').value.trim() || 'Player';
    document.getElementById('playerLabel').textContent = `${playerName}'s Hand`;
    document.getElementById('playerNameContainer').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    startGame();
}

function startGame() {
    deck = createDeck();
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(), dealCard()];
    displayHand(playerHand, 'playerCards');
    displayHand(dealerHand, 'dealerCards', false);
    updateGameStatus();
}

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

function dealCard() {
    return deck.pop();
}

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

function updateGameStatus() {
    document.getElementById('dealerScore').textContent = `Score: ${calculateScore(dealerHand.slice(0, 1))}`;
    document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
    document.getElementById('creditDisplay').textContent = `Credit: ${credit}`;
    document.getElementById('pointDisplay').textContent = `Point: ${points}`;
    document.getElementById('betDisplay').textContent = `Bet: ${bet}`;
}

function calculateScore(hand) {
    return hand.reduce((total, card) => total + (card.value === 'A' ? 11 : isNaN(card.value) ? 10 : parseInt(card.value)), 0);
}

function openRewardModal() {
    // Simple reward logic: Offering fixed rewards for simplification
    if (points >= 500) {
        credit += 100;
        points -= 500;
        alert('You claimed 500 points for $100 credit bonus!');
    } else {
        alert('Not enough points to claim rewards!');
    }
    updateGameStatus();
}

document.getElementById('rewardBtn').addEventListener('click', openRewardModal);
