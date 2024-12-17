let playerName = 'Player', credit = 500, points = 0, bet = 0;

function setPlayerName() {
    playerName = document.getElementById('playerName').value.trim() || 'Player';
    document.getElementById('playerLabel').textContent = `${playerName}'s Hand`;
    document.getElementById('playerNameContainer').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
}

function selectChip(amount) {
    bet = amount;
    document.getElementById('betDisplay').textContent = `Bet: ${bet}`;
}

function hit() {
    alert('Hit button clicked'); // Placeholder for hit functionality
}

function stand() {
    alert('Stand button clicked'); // Placeholder for stand functionality
}

function openRewardModal() {
    alert('Claim your reward!'); // Placeholder for reward modal
}
