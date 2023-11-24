const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
    // After the player's turn, trigger the computer's turn
    setTimeout(computerTurn, 1500);
  }
}

function computerTurn() {
    // Simulate the computer choosing two random cards
    let unflippedCards = Array.from(cards).filter(
      (card) => !card.classList.contains("flip")
    );
  
    if (unflippedCards.length >= 2) {
      const randomIndices = getRandomIndices(unflippedCards.length);
      const computerCardOne = unflippedCards[randomIndices[0]];
      const computerCardTwo = unflippedCards[randomIndices[1]];
  
      computerCardOne.classList.add("flip");
      computerCardTwo.classList.add("flip");
  
      let computerCardOneImg =
        computerCardOne.querySelector(".back-view img").src;
      let computerCardTwoImg =
        computerCardTwo.querySelector(".back-view img").src;
  
      setTimeout(() => {
        matchCards(computerCardOneImg, computerCardTwoImg);
  
        if (computerCardOneImg !== computerCardTwoImg) {
          // Add shake class for two different cards
          computerCardOne.classList.add("shake");
          computerCardTwo.classList.add("shake");
  
          // Flip down the cards after a brief delay
          setTimeout(() => {
            computerCardOne.classList.remove("flip", "shake");
            computerCardTwo.classList.remove("flip", "shake");
          }, 1200);
        }
      }, 1000);
    }
  }

function getRandomIndices(max) {
  const indices = [];
  while (indices.length < 2) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});