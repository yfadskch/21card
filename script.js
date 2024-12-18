document.addEventListener('DOMContentLoaded', function() {
    let deck, playerHand, dealerHand, playerName;
    let credit = 500, points = 0, bet = 0;

    document.getElementById('startGameBtn').addEventListener('click', function() {
        playerName = document.getElementById('playerName').value || 'Player';
        document.getElementById('playerNameContainer').style.display = 'none'; // 隐藏输入名字区域
        document.getElementById('gameBoard').style.display = 'block';
        document.getElementById('displayPlayerName').textContent = playerName; // 显示玩家名字
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

    // 以下省略了其他现有的函数实现，如 dealCard, displayCards 等，因为这些代码并未更改。
});
