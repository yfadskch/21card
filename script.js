function startGame() {
    let dealerHand = document.getElementById('dealerHand').querySelector('.cards');
    let playerHand = document.getElementById('playerHand').querySelector('.cards');

    dealerHand.innerHTML = '';  // Clear previous cards
    playerHand.innerHTML = '';  // Clear previous cards

    // Simulate dealing cards
    let cards = ['A_of_hearts', '2_of_diamonds', '3_of_clubs', '4_of_spades']; // Example card values
    let cardImages = cards.map(card => `${card}.png`); // Assuming card images are named 'A_of_hearts.png', etc.

    cardImages.forEach((img, index) => {
        let card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundImage = `url('${img}')`;
        if (index < 2) {
            dealerHand.appendChild(card);
        } else {
            playerHand.appendChild(card);
        }
    });
}
