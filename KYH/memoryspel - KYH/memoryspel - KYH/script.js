
//------------Start Motasem code -------
const meny = document.querySelector(".meny-btn");
const tvåSpelare = document.getElementById("med-spelare");
const medDator = document.getElementById("med-dator");
const tvåSpelareMeny = document.querySelector(".container-sprelare");
const medDatorMeny = document.querySelector(".container-dator");
const startBtn1 = document.getElementById("start1");
const startBtn2 = document.getElementById("start2");
const cardsContainer = document.querySelector(".cards-container");

tvåSpelare.addEventListener("click", () => {
  meny.style.display = "none";
  tvåSpelareMeny.style.display = "flex";
});

medDator.addEventListener("click", () => {
  meny.style.display = "none";
  medDatorMeny.style.display = "flex";
});

startBtn1.addEventListener("click", () => {
  tvåSpelareMeny.style.display = "none";
  cardsContainer.style.display = "flex";
});

startBtn1.addEventListener("click", () => {
  medDatorMeny.style.display = "none";
  cardsContainer.style.display = "flex";
});

startBtn2.addEventListener("click", () => {
  tvåSpelareMeny.style.display = "none";
  cardsContainer.style.display = "flex";
});
startBtn2.addEventListener("click", () => {
  medDatorMeny.style.display = "none";
  cardsContainer.style.display = "flex";
});


//------------End Motasem code -------



const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
    
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 12) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
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
    let arr = [];
  for (let i = 1; i <= cards.length / 2; i++) {
    arr.push(i, i);
  }
    // let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        console.log(arr[i])
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});