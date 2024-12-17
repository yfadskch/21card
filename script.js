document.addEventListener('DOMContentLoaded', function() {
    let playerName = '';
    const startGameBtn = document.getElementById('startGameBtn');
    const playerNameInput = document.getElementById('playerName');
    const gameBoard = document.getElementById('gameBoard');
    const playerCardsDiv = document.getElementById('playerCards');
    const dealerCardsDiv = document.getElementById('dealerCards');
    const creditDisplay = document.getElementById('creditDisplay');
    const pointDisplay = document.getElementById('pointDisplay');
    const betDisplay = document.getElementById('betDisplay');
    const claimRewardBtn = document.getElementById('claimRewardBtn');
    let credit = 500, points = 0, bet = 0, deck = [];

    startGameBtn.addEventListener('click', () => {
        playerName = playerNameInput.value || 'Player';
        gameBoard.style.display = 'block';
        startNewGame();
    });

    function startNewGame() {
        deck = createDeck();
        playerCardsDiv.textContent = '';
        dealerCardsDiv.textContent = '';
        dealInitialCards();
        bet = 0; // Reset the bet for new game
        updateDisplays();
    }

    function dealInitialCards() {
        playerCardsDiv.textContent = dealCard() + ' ' + dealCard();
        dealerCardsDiv.textContent = dealCard() + ' ??';
    }

    function createDeck() {
        const suits = ['♠', '♥', '♣', '♦'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let deck = [];
        suits.forEach(suit => {
            values.forEach(value => {
                deck.push(value + suit);
            });
        });
        return shuffle(deck);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function dealCard() {
        return deck.pop();
    }

    function updateDisplays() {
        creditDisplay.textContent = `Credit: ${credit}`;
        pointDisplay.textContent = `Point: ${points}`;
        betDisplay.textContent = `Bet: ${bet}`;
    }

    document.querySelectorAll('.chip').forEach(button => {
        button.addEventListener('click', function() {
            if (bet === 0) { // Ensure only one bet per round
                bet = parseInt(this.dataset.amount);
                if (credit >= bet) {
                    credit -= bet;
                    points += bet / 2; // Add points as half the bet
                    updateDisplays();
                } else {
                    alert("Not enough credit to place bet");
                }
            }
        });
    });

    claimRewardBtn.addEventListener('click', function() {
        if (points >= 3000) {
            credit += 888;
            points -= 3000;
            alert('You redeemed 3000 Points for Free $8.88!');
        } else if (points >= 1000) {
            credit += 100;
            points -= 1000;
            alert('You redeemed 1000 Points for Welcome Bonus!');
        } else if (points >= 200) {
            credit += 200;
            points -= 200;
            alert('You redeemed 200 Points for +200 Balance!');
        } else {
            alert('Not enough points to redeem any reward.');
        }
        updateDisplays();
    });

    function resetGame() {
        // Additional logic to reset the game state
    }
});
