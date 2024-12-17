document.addEventListener('DOMContentLoaded', function() {
    let credit = 500, points = 0, lastBet = 0;
    let playerName = '';
    let gameBoard = document.getElementById('gameBoard');
    let playerNameInput = document.getElementById('playerName');
    let startGameBtn = document.getElementById('startGameBtn');
    let claimRewardButton = document.getElementById('claimRewardBtn');
    let creditDisplay = document.getElementById('creditDisplay');
    let pointDisplay = document.getElementById('pointDisplay');
    let betDisplay = document.getElementById('betDisplay');

    startGameBtn.addEventListener('click', function() {
        playerName = playerNameInput.value || 'Player';
        gameBoard.style.display = 'block';
        playerNameInput.disabled = true;
        startGameBtn.disabled = true;
        startGame();
    });

    document.querySelectorAll('.chip').forEach(button => {
        button.addEventListener('click', function() {
            let bet = parseInt(this.dataset.amount);
            if (lastBet !== bet) {
                lastBet = bet;
                updateBetDisplay(bet);
            }
        });
    });

    function startGame() {
        // Game initialization logic
        updateDisplays();
    }

    function claimReward() {
        let message = '';
        if (points >= 3000) {
            points -= 3000;
            credit += 888; // Assuming Free 8.88 is 888 credits
            message = 'You redeemed 3000 points for Free 8.88!';
        } else if (points >= 1000) {
            points -= 1000;
            message = 'You redeemed 1000 points for Welcome Bonus!';
        } else if (points >= 200) {
            points -= 200;
            credit += 200;
            message = 'You redeemed 200 points for +200 Balance!';
        } else {
            message = 'Not enough points to redeem this reward!';
        }
        alert(message);
        updateDisplays();
    }

    function updateDisplays() {
        creditDisplay.textContent = `Credit: ${credit}`;
        pointDisplay.textContent = `Points: ${points}`;
        betDisplay.textContent = `Bet: ${lastBet}`;
    }

    function updateBetDisplay(bet) {
        credit -= bet;
        points += bet / 2; // Update points as half of the bet amount
        updateDisplays();
    }
});
