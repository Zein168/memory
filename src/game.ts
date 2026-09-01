import './game.scss'
import './global.scss'

const cardCount = Number(localStorage.getItem("cardCount"));
const board = document.querySelector<HTMLDivElement>(".game__board");

if (!board) {
  throw new Error("Game board not found");
}

for (let i = 0; i < cardCount; i++) {
  const card = document.createElement("div");
  card.classList.add("game__card");

  board.appendChild(card);
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