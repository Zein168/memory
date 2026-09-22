import './style.scss'
import './global.scss'


const gameBoard: HTMLDivElement | null =
  document.querySelector<HTMLDivElement>(".game__board");

if (gameBoard) {
  import("./game");
  import("./game-cards");
}

