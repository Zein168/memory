import './game.scss'
import './global.scss'

const cardCount = Number(localStorage.getItem("cardCount"));
type Player = "Blue" | "Orange";
const savedPlayer = localStorage.getItem("player");
let currentPlayer: Player = savedPlayer === "Orange" ? "Orange" : "Blue";
let selectedCards: HTMLDivElement[] = [];
let isChecking = false;
let blueScore = 0;
let orangeScore = 0;
const cardImages: string[] = [
    "./public/typescript.svg",
    "./public/javascript.svg",
    "./public/html5.svg",
    "./public/css.svg",
    "./public/angular.svg",
    "./public/nodedotjs.svg",
    "./public/docker.svg",
    "./public/figma.svg",
    "./public/firebase.svg",
    "./public/github.svg",
    "./public/mongodb.svg",
    "./public/php.svg",
    "./public/postgresql.svg",
    "./public/python.svg",
    "./public/react.svg",
    "./public/tailwindcss.svg",
    "./public/vuedotjs.svg",
    "./public/nextdotjs.svg",
];

const cards = cardImages
    .slice(0, cardCount / 2)
    .flatMap((image) => [image, image]);

cards.sort(() => Math.random() - 0.5);    

const board = document.querySelector<HTMLDivElement>(".game__board");

if (!board) {
    throw new Error("Game board not found");
}

const currentPlayerText =
  document.querySelector<HTMLSpanElement>("#current-player");

const currentPlayerIcon =
  document.querySelector<HTMLImageElement>("#current-player-icon");

const blueScoreElement =
  document.querySelector<HTMLSpanElement>("#blue-score");

const orangeScoreElement =
  document.querySelector<HTMLSpanElement>("#orange-score");

function updateCurrentPlayer(): void {
  if (currentPlayerText) {
    currentPlayerText.textContent = currentPlayer;
  }

  if (currentPlayerIcon) {
    currentPlayerIcon.src =
      currentPlayer === "Blue"
        ? "./public/frame_blue.svg"
        : "./public/frame_orange.svg";
  }
}

function updateScores(): void {
  if (blueScoreElement) {
    blueScoreElement.textContent = String(blueScore);
  }

  if (orangeScoreElement) {
    orangeScoreElement.textContent = String(orangeScore);
  }
}


function switchPlayer(): void {
  currentPlayer = currentPlayer === "Blue" ? "Orange" : "Blue";
  updateCurrentPlayer();
}

updateCurrentPlayer();
updateScores();

for (const image of cards) {
  const card = document.createElement("div");
  card.classList.add("game__card");
  card.dataset.image = image;

  const cardInner = document.createElement("div");
  cardInner.classList.add("game__card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("game__card-front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("game__card-back");

  const img = document.createElement("img");
  img.src = image;
  img.alt = "Tech icon";

  cardFront.appendChild(img);

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  card.appendChild(cardInner);
  board.appendChild(card);

  card.addEventListener("click", () => {
    if (isChecking) return;
    if (card.classList.contains("flipped")) return;
    if (card.classList.contains("matched")) return;
    if (selectedCards.length === 2) return;

    card.classList.add("flipped");
    selectedCards.push(card);

    if (selectedCards.length !== 2) return;

    isChecking = true;

    const [firstCard, secondCard] = selectedCards;

    const firstImage = firstCard.dataset.image;
    const secondImage = secondCard.dataset.image;

    if (firstImage === secondImage) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");

      if (currentPlayer === "Blue") {
        blueScore++;
      } else {
        orangeScore++;
      }

      updateScores();

      selectedCards = [];
      isChecking = false;

      switchPlayer();
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        selectedCards = [];
        isChecking = false;

        switchPlayer();
      }, 800);
    }
  });
}

if (cardCount === 16) {
    board.style.gridTemplateColumns = "repeat(4, 1fr)";
}

if (cardCount === 24) {
    board.style.gridTemplateColumns = "repeat(6, 1fr)";
}

if (cardCount === 36) {
    board.style.gridTemplateColumns = "repeat(6, 1fr)";
}

