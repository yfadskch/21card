function createDeck() {
    let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({value, suit, image: `${value}_of_${suit}.png`});  // 直接使用值和花色组合文件名
        }
    }
    return deck;
}

function displayCards(cards, elementId, faceDown) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        let imagePath = faceDown ? 'card_back.png' : card.image; // 使用背面图像或者具体的卡牌图像
        cardElement.style.backgroundImage = `url('${imagePath}')`;
        container.appendChild(cardElement);
    });
}
