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
        // 创建一副卡牌
    }

    function dealCard() {
        // 发牌逻辑
    }

    function displayCards(cards, elementId) {
        const container = document.getElementById(elementId);
        container.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.style.backgroundImage = `url('path/to/card/images/${card}.png')`;
            container.appendChild(cardElement);
        });
    }

    function updateStats() {
        // 更新统计信息
    }
});
