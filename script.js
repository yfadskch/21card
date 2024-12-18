document.addEventListener('DOMContentLoaded', function() {
    let deck, playerHand, dealerHand, playerName;
    let credit = 500, points = 0, bet = 0;

    document.getElementById('startGameBtn').addEventListener('click', function() {
        playerName = document.getElementById('playerName').value || 'Player';
        document.getElementById('playerNameContainer').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        document.getElementById('displayPlayerName').textContent = playerName;
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
        let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        let deck = [];
        for (let suit of suits) {
            for (let value of values) {
                deck.push(`${value}_of_${suit}`);
            }
        }
        return deck;
    }

    function dealCard() {
        if (deck.length > 0) {
            let cardIndex = Math.floor(Math.random() * deck.length);
            return deck.splice(cardIndex, 1)[0];
        }
        return null;
    }

    function displayCards(cards, elementId) {
        const container = document.getElementById(elementId);
        container.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.style.backgroundImage = `url('${card}.png')`;
            container.appendChild(cardElement);
        });
    }

    function updateStats() {
        document.getElementById('creditDisplay').textContent = `Credit: ${credit}`;
        document.getElementById('pointDisplay').textContent = `Point: ${points}`;
        document.getElementById('betDisplay').textContent = `Bet: ${bet}`;
    }
});
