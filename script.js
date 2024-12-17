document.addEventListener('DOMContentLoaded', function () {
    let deck, playerHand, dealerHand, playerName = 'Player';
    let credit = 500, points = 0, bet = 0;

    document.getElementById('startGameBtn').addEventListener('click', function() {
        playerName = document.getElementById('playerName').value.trim() || 'Player';
        document.getElementById('playerLabel').textContent = playerName + "'s Hand";
        document.getElementById('playerNameContainer').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        startGame();
    });

    function startGame() {
        deck = createDeck();
        playerHand = [dealCard(), dealCard()];
        dealerHand = [dealCard(), dealCard()];
        updateDisplay();
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

    function updateDisplay() {
        document.getElementById('dealerCards').textContent = dealerHand.map((card, index) => index === 1 ? '??' : card).join(' ');
        document.getElementById('playerCards').textContent = playerHand.join(' ');
        document.getElementById('creditDisplay').textContent = 'Credit: ' + credit;
        document.getElementById('pointDisplay').textContent = 'Point: ' + points;
        document.getElementById('betDisplay').textContent = 'Bet: ' + bet;
    }

    document.querySelectorAll('.chip').forEach(button => {
        button.addEventListener('click', function() {
            if (bet === 0) { // Ensure only one bet per round
                bet = parseInt(this.dataset.amount);
                if (credit >= bet) {
                    credit -= bet;
                    updateDisplay();
                } else {
                    alert("Not enough credit to place bet");
                }
            }
        });
    });

    document.getElementById('hitBtn').addEventListener('click', function() {
        playerHand.push(dealCard());
        updateDisplay();
        checkEndGame();
    });

    document.getElementById('standBtn').addEventListener('click', function() {
        while (calculateScore(dealerHand) < 17) {
            dealerHand.push(dealCard());
        }
        updateDisplay();
        checkEndGame();
    });

    function calculateScore(hand) {
        let score = hand.reduce((score, card) => {
            let value = card[0];
            if ('JQK'.includes(value)) {
                return score + 10;
            } else if (value === 'A') {
                return score + 11 > 21 ? score + 1 : score + 11;
            }
            return score + parseInt(value);
        }, 0);
        return score;
    }

    function checkEndGame() {
        let playerScore = calculateScore(playerHand);
        let dealerScore = calculateScore(dealerHand);
        if (playerScore > 21 || dealerScore > 21) {
            let result = playerScore > 21 ? 'Player busts' : 'Dealer busts';
            alert(result);
            resetGame();
        } else if (dealerScore >= 17 && playerScore > dealerScore) {
            let result = playerScore > dealerScore ? 'Player wins' : 'Dealer wins';
            alert(result);
            resetGame();
        }
    }

    function resetGame() {
        if (deck.length < 20) { // Reshuffle the deck if low
            deck = createDeck();
        }
        playerHand = [dealCard(), dealCard()];
        dealerHand = [dealCard(), dealCard()];
        bet = 0; // Reset bet to allow new selection
        updateDisplay();
    }

    document.getElementById('claimRewardBtn').addEventListener('click', function() {
        let rewardMessage = '';
        if (points >= 3000) {
            credit += 888;
            points -= 3000;
            rewardMessage = 'You redeemed 3000 Points for Free $8.88!';
        } else if (points >= 1000) {
            credit += 100;
            points -= 1000;
            rewardMessage = 'You redeemed 1000 Points for Welcome Bonus!';
        } else if (points >= 200) {
            credit += 200;
            points -= 200;
            rewardMessage = 'You redeemed 200 Points for +200 Balance!';
        } else {
            rewardMessage = 'Not enough points to redeem any reward.';
        }
        alert(rewardMessage);
        updateDisplay();
    });
});
