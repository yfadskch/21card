document.addEventListener('DOMContentLoaded', function() {
    let credit = 500, points = 0, lastBet = 0;
    let playerName = '';
    let playerNameInput = document.getElementById('playerName');
    let startGameBtn = document.getElementById('startGameBtn');
    let gameBoard = document.getElementById('gameBoard');

    startGameBtn.addEventListener('click', function() {
        playerName = playerNameInput.value || 'Player';
        playerNameInput.disabled = true; // 禁用名字输入
        startGameBtn.style.display = 'none'; // 隐藏开始按钮
        gameBoard.style.display = 'block'; // 显示游戏界面
        startGame();
    });

    document.querySelectorAll('.chip').forEach(button => {
        button.addEventListener('click', function() {
            let bet = parseInt(this.getAttribute('data-amount'));
            if (lastBet !== bet) {
                lastBet = bet; // 记录最后一次的投注额
                updateBet(bet); // 更新投注额
            }
        });
    });

    function startGame() {
        // 游戏初始化逻辑，可以在此处添加
        updateDisplays();
    }

    function updateBet(bet) {
        credit -= bet;
        points += bet / 2; // 增加积分，根据您的游戏规则调整
        updateDisplays();
    }

    function updateDisplays() {
        document.getElementById('creditDisplay').textContent = `Credit: ${credit}`;
        document.getElementById('pointDisplay').textContent = `Points: ${points}`;
        document.getElementById('betDisplay').textContent = `Bet: ${lastBet}`;
    }
});
