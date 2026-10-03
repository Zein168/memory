
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

export let selectedCards: HTMLDivElement[] = [];
export let isChecking: boolean = false;

let blueScore: number = 0;
let orangeScore: number = 0;

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

/**
 * Increases the number of matched cards.
 *
 * @returns Nothing.
 */
export function increaseMatchedCards(): void {
    matchedCards += MATCHED_CARDS_INCREMENT;
}

const CODE_VIBES_IMAGES: string[] = [

    "./code_vibes_theme_cards/angular.svg",
    "./code_vibes_theme_cards/bootstrap.svg",
    "./code_vibes_theme_cards/cmd.svg",
    "./code_vibes_theme_cards/css.svg",
    "./code_vibes_theme_cards/database.svg",
    "./code_vibes_theme_cards/firebase.svg",
    "./code_vibes_theme_cards/git.svg",
    "./code_vibes_theme_cards/github.svg",
    "./code_vibes_theme_cards/dj.svg",
    "./code_vibes_theme_cards/html5.svg",
    "./code_vibes_theme_cards/javascript.svg",
    "./code_vibes_theme_cards/node_js.svg",
    "./code_vibes_theme_cards/python.svg",
    "./code_vibes_theme_cards/react.svg",
    "./code_vibes_theme_cards/sass.svg",
    "./code_vibes_theme_cards/typescript.svg",
    "./code_vibes_theme_cards/vsc.svg",
    "./code_vibes_theme_cards/vue_js.svg"
];

const GAMING_THEME_IMAGES: string[] = [
    "./gaming_theme_cards/ace.svg",
    "./gaming_theme_cards/circle.svg",
    "./gaming_theme_cards/coin.svg",
    "./gaming_theme_cards/cool_banana.svg",
    "./gaming_theme_cards/gameboy.svg",
    "./gaming_theme_cards/gamepad.svg",
    "./gaming_theme_cards/greeper_face.svg",
    "./gaming_theme_cards/level_up.svg",
    "./gaming_theme_cards/maze.svg",
    "./gaming_theme_cards/pac.svg",
    "./gaming_theme_cards/pac_man.svg",
    "./gaming_theme_cards/play button@2x 1.svg",
    "./gaming_theme_cards/playing_dice.svg",
    "./gaming_theme_cards/puzzle.svg",
    "./gaming_theme_cards/snake.svg",
    "./gaming_theme_cards/square.svg",
    "./gaming_theme_cards/super_mushroom.svg",
    "./gaming_theme_cards/triangle.svg",
];

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
 * Returns the card images for the selected theme.
 *
 * @returns An array containing the card image paths.
 */
function getCardImages(): string[] {
    if (SELECTED_THEME === "Gaming theme") {
        return GAMING_THEME_IMAGES;
    }

    return CODE_VIBES_IMAGES;
}


export const cardImages: string[] = getCardImages();

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

