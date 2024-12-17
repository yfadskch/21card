document.addEventListener('DOMContentLoaded', function () {
    let deck, playerHand, dealerHand, playerName = 'Player', currentBet = 0;
    let credit = 500, points = 0, bet = 0;

    document.getElementById('startGameBtn').addEventListener('click', setPlayerName);

    function setPlayerName() {
        playerName = document.getElementById('playerName').value.trim() || 'Player';
        document.getElementById('playerLabel').textContent = `${playerName}'s Hand`;
        document.getElementById('playerNameContainer').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        startGame();
    }

    function startGame() {
        deck = createDeck();
        playerHand = [dealCard(), dealCard()];
        dealerHand = [dealCard(), dealCard()];
        displayHand(playerHand, 'playerCards');
        displayHand(dealerHand, 'dealerCards', false);
        updateGameStatus();
    }

    function createDeck() {
        const suits = ['♠', '♥', '♣', '♦'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];
        suits.forEach(suit => {
            values.forEach(value => {
                deck.push({value, suit});
            });
        });
        return deck.sort(() => Math.random() - 0.5);
    }

    function dealCard() {
        return deck.pop();
    }

    function displayHand(hand, containerId, showAll = true) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        hand.forEach((card, index) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.textContent = showAll || index === 0 ? `${card.value}${card.suit}` : '??';
            container.appendChild(cardDiv);
        });
    }

    function updateGameStatus() {
        document.getElementById('dealerScore').textContent = `Score: ${calculateScore(dealerHand.slice(0, 1))}`;
        document.getElementById('playerScore').textContent = `Score: ${calculateScore(playerHand)}`;
        document.getElementById('creditDisplay').textContent = `Credit: ${credit}`;
        document.getElementById('pointDisplay').textContent = `Point: ${points}`;
        document.getElementById('betDisplay').textContent = `Bet: ${bet}`;
    }

    function calculateScore(hand) {
        return hand.reduce((total, card) => {
            let value = card.value;
            if (value === 'A') {
                return total + 11;
            } else if (['J', 'Q', 'K'].includes(value)) {
                return total + 10;
            }
            return total + parseInt(value);
        }, 0);
    }

    document.querySelectorAll('.chip').forEach(button => button.addEventListener('click', function() { selectChip(parseInt(this.getAttribute('data-amount'))); }));
    document.getElementById('hitBtn').addEventListener('click', hit);
    document.getElementById('standBtn').addEventListener('click', stand);
    document.getElementById('rewardBtn').addEventListener('click', openRewardModal);

    function selectChip(amount) {
        bet = amount;
        updateGameStatus();
    }

    function hit() {
        playerHand.push(dealCard());
        displayHand(playerHand, 'playerCards');
        checkForEndOfGame();
    }

    function stand() {
        while (calculateScore(dealerHand) < 17) {
            dealerHand.push(dealCard());
        }
        displayHand(dealerHand, 'dealerCards', true);
        checkForEndOfGame();
    }

    function checkForEndOfGame() {
        const playerScore = calculateScore(playerHand);
        const dealerScore = calculateScore(dealerHand);
        if (playerScore > 21) {
            alert(`${playerName} has busted!`);
        } else if (dealerScore > 21) {
            alert('Dealer has busted!');
        } else if (playerScore >= 17 && dealerScore >= 17) {
            if (playerScore > dealerScore) {
                alert(`${playerName} wins!`);
            } else if (playerScore < dealerScore) {
                alert('Dealer wins!');
            } else {
                alert('It is a tie!');
            }
        }
    }

    function openRewardModal() {
        alert('Claim your rewards here!');
    }
});
