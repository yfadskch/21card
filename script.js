// Existing game logic
function setPlayerName() {
    // Existing functionality
    startGame();
}

function startGame() {
    // Existing game initialization
}

function hit() {
    // Existing functionality
}

function stand() {
    // Existing functionality
}

function selectChip(amount) {
    // Existing functionality
}

function updateDisplay() {
    // Existing update display functionality
}

// New modal popup logic
function openRewardPopup() {
    document.getElementById('modal').style.display = 'block';
}

function claimReward(option) {
    let points = parseInt(document.getElementById('pointDisplay').textContent); // Assume points are displayed in this element
    let message = '';
    switch(option) {
        case '1':
            if (points >= 200) {
                points -= 200;
                message = 'You redeemed 200 points for +200 Balance';
                document.getElementById('creditDisplay').textContent = parseInt(document.getElementById('creditDisplay').textContent) + 200;
            } else {
                message = 'Not enough points to redeem this reward!';
            }
            break;
        case '2':
            if (points >= 1000) {
                points -= 1000;
                message = 'You redeemed 1000 points for Welcome Bonus!';
            } else {
                message = 'Not enough points to redeem this reward!';
            }
            break;
        case '3':
            if (points >= 3000) {
                points -= 3000;
                message = 'You redeemed 3000 points for Free 8.88!';
            } else {
                message = 'Not enough points to redeem this reward!';
            }
            break;
    }
    alert(message);
    document.getElementById('pointDisplay').textContent = points; // Update points display
}

function closeRewardPopup() {
    document.getElementById('modal').style.display = 'none';
}
