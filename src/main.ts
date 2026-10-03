import './style.scss'
import './global.scss'

/**
 * Loads the game scripts only when the game board exists.
 * This prevents game code from running on pages without a game board.
 */
const gameBoard: HTMLDivElement | null =
  document.querySelector<HTMLDivElement>(".game__board");

if (gameBoard) {
  Promise.all([
    import("./game"),
    import("./game-cards"),
  ]).then(() => {
    document.documentElement.classList.remove("game-loading");
  });
}

