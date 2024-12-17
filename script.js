document.addEventListener('DOMContentLoaded', function () {
    let deck, playerHand, dealerHand, playerName = 'Player', currentBet = 0;
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
        displayCards(playerHand, 'playerCards');
        displayCards(dealerHand, 'dealerCards', true);
        updateGameStats();
    }

    function createDeck() {
        const suits = ['♠', '♥', '♣', '♦'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let deck = [];
        suits.forEach(suit => {
            values.forEach(value => {
                deck.push({ suit: suit, value: value });
            });
        });
        return shuffleDeck(deck);
    }

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    function dealCard() {
        return deck.pop();
    }

    function displayCards(hand, elementId, hideSecondCard = false) {
        const container = document.getElementById(elementId);
        container.innerHTML = '';
        hand.forEach((card, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.textContent = hideSecondCard && index === 1 ? '??' : `${card.value}${card.suit}`;
            container.appendChild(cardDiv);
        });
    }

    function updateGameStats() {
        document.getElementById('creditDisplay').textContent = 'Credit: ' + credit;
        document.getElementById('pointDisplay').textContent = 'Point: ' + points;
        document.getElementById('betDisplay').textContent = 'Bet: ' + bet;
    }

    document.getElementById('rewardBtn').addEventListener('click', openRewardModal);

    function openRewardModal() {
        let rewardMessage = 'Choose a reward:\n';
        rewardMessage += '1. 200 Points: +200 Balance\n';
        rewardMessage += '2. 1000 Points: Welcome Bonus\n';
        rewardMessage += '3. 3000 Points: Free 8.88\n';

        const selectedOption = prompt(rewardMessage, "Enter 1, 2, or 3");
        processReward(selectedOption);
    }

    function processReward(option) {
        switch(option) {
            case '1':
                if (points >= 200) {
                    points -= 200;
                    credit += 200;
                    alert('200 Balance added');
                } else {
                    alert('Not enough points.');
                }
                break;
            case '2':
                if (points >= 1000) {
                    points -= 1000;
                    alert('Welcome Bonus awarded');
                } else {
                    alert('Not enough points.');
                }
                break;
            case '3':
                if (points >= 3000) {
                    points -= 3000;
                    alert('Free 8.88 awarded');
                } else {
                    alert('Not enough points.');
                }
                break;
            default:
                alert('Invalid option');
                break;
        }
        updateGameStats();
    }

    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function() {
            bet = parseInt(this.getAttribute('data-amount'));
            points += bet / 2;  // Assuming points are awarded based on half the bet amount.
            updateGameStats();
        });
    });

    document.getElementById('hitBtn').addEventListener('click', () => {
        playerHand.push(dealCard());
        displayCards(playerHand, 'playerCards');
        checkGameEnd();
    });

    document.getElementById('standBtn').addEventListener('click', () => {
        while (calculateScore(dealerHand) < 17) {
            dealerHand.push(dealCard());
        }
        displayCards(dealerHand, 'dealerCards', true);
        checkGameEnd();
    });

    function calculateScore(hand) {
        let score = hand.reduce((total, card) => {
            let value = card.value;
            if (value === 'A') {
                return total + (total + 11 <= 21 ? 11 : 1);
            } else if (['J', 'Q', 'K'].includes(value)) {
                return total + 10;
            }
            return total + parseInt(value);
        }, 0);
        return score;
    }

    function checkGameEnd() {
        const playerScore = calculateScore(playerHand);
        const dealerScore = calculateScore(dealerHand);
        if (playerScore > 21) {
            alert(playerName + ' has busted!');
            resetGame();
        } else if (dealerScore > 21) {
            alert('Dealer has busted!');
            credit += bet * 2; // Example reward
            resetGame();
        } else if (dealerScore >= 17 && playerScore > dealerScore) {
            alert(playerName + ' wins!');
            credit += bet * 2; // Example reward
            resetGame();
        }
    }

    function resetGame() {
        document.getElementById('gameBoard').style.display = 'none';
        document.getElementById('playerNameContainer').style.display = 'block';
        bet = 0;
        updateGameStats();
    }
});
