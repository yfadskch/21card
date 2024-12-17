document.addEventListener('DOMContentLoaded', function () {
    let deck, playerHand, dealerHand, playerName;
    let credit = 500, points = 0, bet = 0;

    document.getElementById('startGameBtn').addEventListener('click', function() {
        playerName = document.getElementById('playerName').value || 'Player';
        document.getElementById('gameBoard').style.display = 'block';
        startGame();
    });

    function startGame() {
        deck = createDeck();
        playerHand = [dealCard(), dealCard()];
        dealerHand = [dealCard(), dealCard()];
        displayCards(playerHand, 'playerCards');
        displayCards(dealerHand, 'dealerCards');
        updateStats();
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
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function dealCard() {
        return deck.pop();
    }

    function displayCards(hand, elementId) {
        const handDiv = document.getElementById(elementId);
        handDiv.innerHTML = hand.join(' ');
    }

    function updateStats() {
        document.getElementById('creditDisplay').textContent = `Credit: ${credit}`;
        document.getElementById('pointDisplay').textContent = `Point: ${points}`;
        document.getElementById('betDisplay').textContent = `Bet: ${bet}`;
    }

    document.querySelectorAll('.chip').forEach(button => {
        button.addEventListener('click', function() {
            if (bet === 0) {
                bet = parseInt(this.dataset.amount);
                points += bet / 2; // Gain points as half the bet
                updateStats();
            }
        });
    });

    document.getElementById('hitBtn').addEventListener('click', function() {
        playerHand.push(dealCard());
        displayCards(playerHand, 'playerCards');
        checkEndGame();
    });

    document.getElementById('standBtn').addEventListener('click', function() {
        while (calculateScore(dealerHand) < 17) {
            dealerHand.push(dealCard());
        }
        displayCards(dealerHand, 'dealerCards');
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
        if (playerScore > 21) {
            alert(`${playerName} busts.`);
            credit -= bet;
        } else if (dealerScore > 21 || playerScore > dealerScore) {
            alert(`${playerName} wins!`);
            credit += bet * 2;
        } else if (dealerScore >= playerScore) {
            alert('Dealer wins.');
            credit -= bet;
        }
        points += bet / 2; // Gain points as half the bet
        bet = 0; // Reset bet for next round
        startGame(); // Restart the game
    }

    document.getElementById('claimRewardBtn').addEventListener('click', function() {
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
        updateStats();
    });
});
