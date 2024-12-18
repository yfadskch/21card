document.addEventListener('DOMContentLoaded', function() {
    let deck, playerHand, dealerHand, playerName;
    let credit = 500, points = 0, bet = 0;

    document.getElementById('startGameBtn').addEventListener('click', function() {
        playerName = 'Player'; // Default player name for simplicity
        document.getElementById('playerNameContainer').style.display = 'none';
        document.getElementById('gameBoard').style.display = 'block';
        startGame();
    });

    function startGame() {
        deck = createDeck();
        playerHand = [dealCard(), dealCard()];
        dealerHand = [dealCard(), dealCard()];
        displayCards(playerHand, 'playerCards', 'playerScore');
        displayCards(dealerHand, 'dealerCards', 'dealerScore');
        updateStats();
    }

    function displayCards(hand, elementId, scoreId) {
        const handDiv = document.getElementById(elementId);
        const scoreSpan = document.getElementById(scoreId);
        handDiv.innerHTML = hand.map(card => `<span>${card}</span>`).join(' ');
        scoreSpan.textContent = calculateScore(hand);
    }

    function calculateScore(hand) {
        let score = 0;
        for (let card of hand) {
            let value = card.slice(0, -1);
            if ('JQK'.includes(value)) {
                score += 10;
            } else if (value === 'A') {
                score += 11; // Simplified scoring for Aces
            } else {
                score += parseInt(value);
            }
        }
        return score;
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
});
