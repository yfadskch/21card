let credit = 500;
let totalPoints = 0;
let currentBet = 0;
let deck, playerHand, dealerHand;

function initializeGame() {
    document.getElementById('credit').textContent = credit;
    document.getElementById('totalPoints').textContent = totalPoints;
    resetHands();
}

function createDeck() {
    const suits = ['♠', '♥', '♣', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

function resetHands() {
    deck = createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    displayCards();
}

function displayCards() {
    const playerCards = document.getElementById('playerCards');
    const dealerCards = document.getElementById('dealerCards');
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    playerHand.forEach(card => createCardElement(card, playerCards));
    dealerHand.forEach(card => createCardElement(card, dealerCards));
    updateScores();
}

function createCardElement(card, container) {
    const cardDiv = document.create
