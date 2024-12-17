let deck, playerHand, dealerHand, playerName = 'Player', currentBet = 0;
let credit = 500, points = 0;
let gameRecords = [];

function setPlayerName() {
    const nameInput = document.getElementById('playerName').value.trim();
    playerName = nameInput || 'Player';
    document.getElementById('playerLabel').textContent = `${playerName}'s Hand`;
    document.getElementById('playerNameContainer').style.display = 'none';
    document.getElementById('gameRules').style.display = 'block';
    document.getElementById('gameBoard').style.display = 'block';
    document.getElementById('statusContainer').style.display = 'block';
    document.getElementById('chipContainer').style.display = 'block';
    document.getElementById('actionButtons').style.display = 'block';
    document.getElementById('extraFeatures').style.display = 'block';
    startGame();
}

function startGame() {
    // Implement game start logic
}

function hit() {
    // Implement game hit logic
}

function stand() {
    // Implement game stand logic
}

function selectChip(amount) {
    currentBet = amount;
    document.getElementById('betDisplay').textContent = `Bet: ${amount}`;
}

function redeemReward(points, reward) {
    if (points <= credit) {
        credit -= points;
        alert(`You redeemed ${points} points for ${reward}`);
    } else {
        alert("Not enough points.");
    }
}

function openRewardModal() {
    document.getElementById('rewardModal').style.display = 'block';
}

function closeRewardModal() {
    document.getElementById('rewardModal').style.display = 'none';
}
