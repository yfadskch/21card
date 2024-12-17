let credit = 500, points = 0, currentBet = 0;

function setPlayerName() {
    document.getElementById('playerNameContainer').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    document.getElementById('statusContainer').style.display = 'block';
    document.getElementById('chipContainer').style.display = 'block';
    document.getElementById('actionButtons').style.display = 'block';
    document.getElementById('extraFeatures').style.display = 'block';
    document.getElementById('gameRecord').style.display = 'block';
}

function selectChip(amount) {
    currentBet = amount;
    document.getElementById('betDisplay').textContent = `Bet: ${amount}`;
}

function hit() {
    alert("Hit function - Implement your game logic here!");
}

function stand() {
    alert("Stand function - Implement your game logic here!");
}

function openRewardPopup() {
    document.getElementById('modal').style.display = 'block';
}

function closeRewardPopup() {
    document.getElementById('modal').style.display = 'none';
}

function claimReward(option) {
    let message = '';
    if (option === 1 && points >= 200) {
        points -= 200;
        credit += 200;
        message = "You redeemed 200 points for +200 Balance!";
    } else if (option === 2 && points >= 1000) {
        points -= 1000;
        credit += 1000;
        message = "You redeemed 1000 points for +1000 Balance!";
    } else if (option === 3 && points >= 3000) {
        points -= 3000;
        credit += 3000;
        message = "You redeemed 3000 points for Free 8.88!";
    } else {
        message = "Not enough points to redeem this reward!";
    }

    document.getElementById('modal-message').textContent = message;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('creditDisplay').textContent = `Credit: ${credit}`;
    document.getElementById('pointDisplay').textContent = `Point: ${points}`;
}

function addGameRecord(result) {
    const recordGrid = document.getElementById('recordGrid');
    if (recordGrid.children.length >= 12) recordGrid.removeChild(recordGrid.children[0]);

    const cell = document.createElement('div');
    cell.classList.add('record-cell');
    cell.textContent = result;
    if (result === 'P') cell.classList.add('player-win');
    else if (result === 'B') cell.classList.add('banker-win');
    else if (result === 'T') cell.classList.add('tie');
    recordGrid.appendChild(cell);
}
