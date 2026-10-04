import "./game.scss"
import "./global.scss"
import {
    updateCurrentPlayer,
    updateScores,
    setupBoard,
    setupExitModal,
    setupExitIconHover,
    updateGamingThemeIcons,
    updateGamingThemeQuitButtons,
    updateGamingThemeFinalIcons,
    updateHomeButton,
    setupHeaderForCardCount,
    getCardImages,
} from "./game-helpers";

type Player = "Blue" | "Orange";

const MATCHED_CARDS_INCREMENT: number = 2;

export const CARD_COUNT: number = Number(localStorage.getItem("cardCount"));

const SAVED_PLAYER: string | null = localStorage.getItem("player");
export const SELECTED_THEME: string | null = localStorage.getItem("theme");

if (SELECTED_THEME === "Gaming theme") {
    document.body.classList.add("gaming-theme");
}

let currentPlayer: Player =
    SAVED_PLAYER === "Orange" ? "Orange" : "Blue";

export let selectedCards: HTMLButtonElement[] = [];
export let isChecking: boolean = false;

let blueScore: number = 0;
let orangeScore: number = 0;


/**
 * Returns the current scores of both players.
 *
 * @returns An object containing the current Blue and Orange scores.
 */
export function getScores(): {
    blueScore: number;
    orangeScore: number;
} {
    return {
        blueScore,
        orangeScore,
    };
}

export let matchedCards: number = 0;


const FINAL_BLUE_SCORE_ELEMENT =
    document.querySelector<HTMLSpanElement>("#final-blue-score");

const FINAL_ORANGE_SCORE_ELEMENT =
    document.querySelector<HTMLSpanElement>("#final-orange-score");

const WINNER_PLAYER_ELEMENT =
    document.querySelector<HTMLParagraphElement>("#winner-player");

const WINNER_PLAYER_ICON =
    document.querySelector<HTMLImageElement>("#winner-player-icon");

const WINNER_TITLE =
    document.querySelector<HTMLParagraphElement>("#winner-title");

const CONFETTI_IMAGE =
    document.querySelector<HTMLDivElement>(".game__confetti");

const NEXT_SCREEN_DELAY = 4000;
/**
 * Increases the number of matched cards.
 *
 * @returns Nothing.
 */
export function increaseMatchedCards(): void {
    matchedCards += MATCHED_CARDS_INCREMENT;
}

/**
 * Updates the checking state of the game.
 *
 * @param value - The new checking state.
 * @returns Nothing.
 */
export function setIsChecking(value: boolean): void {
    isChecking = value;
}

/**
 * Adds one point to the current player's score.
 *
 * @returns Nothing.
 */
export function updatePlayerScore(): void {
    if (currentPlayer === "Blue") {
        blueScore++;
    } else {
        orangeScore++;
    }

    updateScores(blueScore, orangeScore);
}

/**
 * Switches the current player and updates the player icon.
 *
 * @returns Nothing.
 */
export function switchPlayer(): void {
    currentPlayer = currentPlayer === "Blue" ? "Orange" : "Blue";
    updateCurrentPlayer(currentPlayer, SELECTED_THEME);
}

/**
 * Displays the game-over screen and prepares the final results.
 *
 * @param blueScore - The final score of the Blue player.
 * @param orangeScore - The final score of the Orange player.
 * @param selectedTheme - The currently selected game theme.
 * @returns Nothing.
 */
export function showGameOver(blueScore: number,
    orangeScore: number,
    selectedTheme: string | null): void {
    hideGameElements();
    updateFinalScores(blueScore, orangeScore);
    showWinner(blueScore, orangeScore, selectedTheme);
    showNextScreen();
}

/**
 * Hides the game header and game board.
 *
 * @returns Nothing.
 */
function hideGameElements(): void {
    const header: HTMLElement | null = document.querySelector<HTMLElement>(".game__header");
    const gameBoard: HTMLElement | null = document.querySelector<HTMLElement>(".game__board");

    if (header) header.style.display = "none";
    if (gameBoard) gameBoard.style.display = "none";
}

/**
 * Updates the final scores shown on the game-over screen.
 *
 * @returns Nothing.
 */
function updateFinalScores(blueScore: number,
    orangeScore: number): void {
    if (FINAL_BLUE_SCORE_ELEMENT) {
        FINAL_BLUE_SCORE_ELEMENT.textContent = String(blueScore);
    }

    if (FINAL_ORANGE_SCORE_ELEMENT) {
        FINAL_ORANGE_SCORE_ELEMENT.textContent = String(orangeScore);
    }
}

/**
 * Displays the game-over container and sets the winner content.
 *
 * @param blueScore - The final score of the Blue player.
 * @param orangeScore - The final score of the Orange player.
 * @param selectedTheme - The currently selected game theme.
 * @returns Nothing.
 */
function showWinner(blueScore: number,
    orangeScore: number,
    selectedTheme: string | null): void {
    const gameOver: HTMLElement | null = document.querySelector<HTMLElement>(".game__game-over");

    if (!gameOver) return;

    gameOver.style.display = "flex";
    setWinnerContent(blueScore, orangeScore, selectedTheme);
}

/**
 * Determines whether the game ends in a win or a draw.
 *
 * @param blueScore - The final score of the Blue player.
 * @param orangeScore - The final score of the Orange player.
 * @param selectedTheme - The currently selected game theme.
 * @returns Nothing.
 */
function setWinnerContent(blueScore: number,
    orangeScore: number,
    selectedTheme: string | null): void {
    if (blueScore === orangeScore) {
        setDraw(selectedTheme);
    } else if (blueScore > orangeScore) {
        setWinner("Blue", selectedTheme);
    } else {
        setWinner("Orange", selectedTheme);
    }
}

/**
 * Displays the winner and applies the corresponding content and icon.
 *
 * @param player - The player who won the game.
 * @param selectedTheme - The currently selected game theme.
 * @returns Nothing.
 */
function setWinner(
    player: Player,
    selectedTheme: string | null
): void {
    if (!WINNER_TITLE || !WINNER_PLAYER_ELEMENT || !WINNER_PLAYER_ICON) {
        return;
    }

    setWinnerText(player, selectedTheme);
    setWinnerPlayerClass(player);
    setWinnerIcon(player, selectedTheme);
    showConfetti(selectedTheme);
}

/**
 * Sets the winner title and player text based on the selected theme.
 *
 * @param player - The player who won the game.
 * @param selectedTheme - The currently selected game theme.
 * @returns Nothing.
 */
function setWinnerText(
    player: Player,
    selectedTheme: string | null
): void {
    WINNER_TITLE!.textContent = "The winner is";

    if (selectedTheme === "Gaming theme") {
        WINNER_PLAYER_ELEMENT!.textContent =
            `${player.charAt(0).toUpperCase()}${player.slice(1).toLowerCase()} Player`;
    } else {
        WINNER_PLAYER_ELEMENT!.textContent =
            `${player.toUpperCase()} PLAYER`;
    }
}

/**
 * Applies the CSS class for the winning player.
 *
 * @param player - The player who won the game.
 * @returns Nothing.
 */
function setWinnerPlayerClass(player: Player): void {
    WINNER_PLAYER_ELEMENT!.classList.remove("blue", "orange");
    WINNER_PLAYER_ELEMENT!.classList.add(player.toLowerCase());
}

/**
 * Sets the winner icon and alt text based on the selected theme.
 *
 * @param player - The player who won the game.
 * @param selectedTheme - The currently selected game theme.
 * @returns Nothing.
 */
function setWinnerIcon(
    player: Player,
    selectedTheme: string | null
): void {
    if (selectedTheme === "Gaming theme") {
        WINNER_PLAYER_ICON!.src = "./pockal.svg";
        WINNER_PLAYER_ICON!.alt = "Trophy";
    } else {
        WINNER_PLAYER_ICON!.src =
            `./chess_pawn_${player.toLowerCase()}.svg`;
        WINNER_PLAYER_ICON!.alt = `${player} player`;
    }
}

/**
 * Displays the draw result and applies the corresponding theme-specific content.
 *
 * @param selectedTheme - The currently selected game theme.
 * @returns Nothing.
 */
function setDraw(selectedTheme: string | null): void {
    setDrawState();
    setDrawText();
    setDrawIcon(selectedTheme);
    hideConfetti();
}

/**
 * Sets the draw state on the next screen.
 *
 * @returns Nothing.
 */
function setDrawState(): void {
    const nextScreen: HTMLElement | null =
        document.querySelector<HTMLElement>(".game__next-screen");

    nextScreen?.classList.add("draw");
}

/**
 * Sets the draw title and removes the player color class.
 *
 * @returns Nothing.
 */
function setDrawText(): void {
    WINNER_TITLE!.textContent = "It's a";
    WINNER_PLAYER_ELEMENT!.textContent = "DRAW";
    WINNER_PLAYER_ELEMENT!.classList.remove("blue", "orange");
}

/**
 * Sets the draw icon based on the selected theme.
 *
 * @param selectedTheme - The currently selected game theme.
 * @returns Nothing.
 */
function setDrawIcon(selectedTheme: string | null): void {
    const isGamingTheme: boolean = selectedTheme === "Gaming theme";

    WINNER_PLAYER_ICON!.src = isGamingTheme
        ? "./draw_gaming_theme.svg"
        : "./draw_code_vibes_theme.svg";

    WINNER_PLAYER_ICON!.alt = "Draw";
}

/**
 * Hides the confetti on the draw screen.
 *
 * @returns Nothing.
 */
function hideConfetti(): void {
    if (CONFETTI_IMAGE) {
        CONFETTI_IMAGE.style.display = "none";
    }
}

/**
 * Displays or hides the confetti based on the selected theme.
 *
 * @param selectedTheme - The currently selected game theme.
 * @returns Nothing.
 */
function showConfetti(selectedTheme: string | null): void {
    if (!CONFETTI_IMAGE) return;
    if (selectedTheme === "Gaming theme") {
        CONFETTI_IMAGE.style.display = "none";
        return;
    }
    CONFETTI_IMAGE.style.display = "flex";
}

/**
 * Shows the next screen after the configured delay.
 *
 * @returns Nothing.
 */
function showNextScreen(): void {
    const gameOver: HTMLElement | null = document.querySelector<HTMLElement>(".game__game-over");
    const nextScreen: HTMLElement | null = document.querySelector<HTMLElement>(".game__next-screen");

    setTimeout(() => {
        if (gameOver) gameOver.style.display = "none";
        nextScreen?.classList.add("show");
    }, NEXT_SCREEN_DELAY);
}

export const cardImages: string[] = getCardImages(SELECTED_THEME);

updateCurrentPlayer(currentPlayer, SELECTED_THEME);
updateScores(blueScore, orangeScore);
setupBoard(CARD_COUNT);
setupExitModal();
setupExitIconHover(SELECTED_THEME);
updateGamingThemeIcons(SELECTED_THEME);
updateGamingThemeQuitButtons(SELECTED_THEME);
updateGamingThemeFinalIcons(SELECTED_THEME);
updateHomeButton();
setupHeaderForCardCount();

