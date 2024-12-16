let deck, playerHand, dealerHand, playerName = 'Player', currentBet = 0;
let credit = 500, points = 0;
let gameRecords = [];

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
    document.getElementById('extraFeatures').style.display = 'block';
    startGame();
}

function startGame() {
    deck = createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    displayHand(playerHand, 'playerCards');
    displayHand(dealerHand.slice(0, 1), 'dealerCards');
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
    document.getElementById('betDisplay').textContent = `Bet: ${amount}`;
}

function reward() {
    alert("You have claimed your reward!");
}

function hit() {
    playerHand.push(deck.pop());
    displayHand(playerHand, 'playerCards');
    if (calculateScore(playerHand) > 21) {
        alert('You busted! Dealer wins.');
        updateRecord('B');
    }
}

function stand() {
    let playerScore = calculateScore(playerHand);
    let dealerScore = calculateScore(dealerHand);
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        dealerScore = calculateScore(dealerHand);
    }
    if (dealerScore > 21 || playerScore > dealerScore) updateRecord('P');
    else if (playerScore < dealerScore) updateRecord('B');
    else updateRecord('T');
}

function updateRecord(result) {
    if (gameRecords.length >= 12) gameRecords.shift();
    gameRecords.push(result);
    renderGameRecord();
}

function renderGameRecord() {
    const grid = document.getElementById('recordGrid');
    grid.innerHTML = '';
    gameRecords.forEach(res => {
        const cell = document.createElement('div');
        cell.className = 'record-cell';
        cell.textContent = res;
        if (res === 'P') cell.classList.add('player-win');
        else if (res === 'B') cell.classList.add('banker-win');
        else cell.classList.add('tie');
        grid.appendChild(cell);
    });
}

function calculateScore(hand) {
    return hand.reduce((sum, card) => sum + (['J', 'Q', 'K'].includes(card.value) ? 10 : parseInt(card.value)), 0);
}
