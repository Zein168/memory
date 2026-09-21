
import "./game.scss"
import "./global.scss"

type Player = "Blue" | "Orange";

const EXIT_BUTTON: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>(".game__exit");
const QUIT_MODAL: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".game__quit-modal");
const BACK_BUTTON: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>(".game__quit-back");
const CONFIRM_EXIT_BUTTON: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>(".game__quit-confirm");
const FINAL_BLUE_SCORE_ELEMENT: HTMLSpanElement | null = document.querySelector<HTMLSpanElement>("#final-blue-score");
const FINAL_ORANGE_SCORE_ELEMENT: HTMLSpanElement | null = document.querySelector<HTMLSpanElement>("#final-orange-score");
const WINNER_PLAYER_ELEMENT: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>("#winner-player");
const WINNER_PLAYER_ICON: HTMLImageElement | null = document.querySelector<HTMLImageElement>("#winner-player-icon");
const WINNER_TITLE: HTMLHeadingElement | null = document.querySelector<HTMLHeadingElement>("#winner-title");
const CURRENT_PLAYER_ICON: HTMLImageElement | null = document.querySelector<HTMLImageElement>("#current-player-icon");
const BLUE_SCORE_ELEMENT: HTMLSpanElement | null = document.querySelector<HTMLSpanElement>("#blue-score");
const ORANGE_SCORE_ELEMENT: HTMLSpanElement | null = document.querySelector<HTMLSpanElement>("#orange-score");
const CONFETTI_IMAGE: HTMLImageElement | null = document.querySelector<HTMLImageElement>(".game__confetti");
const MATCHED_CARDS_INCREMENT: number = 2;
const LARGE_CARD_COUNT: number = 24;
const LARGE_BOARD_GAP: string = "6px";
const DEFAULT_BOARD_GAP: string = "10px";
const SMALL_CARD_COUNT: number = 16;
const SMALL_BOARD_COLUMNS: number = 4;
const DEFAULT_BOARD_COLUMNS: number = 6;
const NEXT_SCREEN_DELAY: number = 4000;

export const CARD_COUNT: number = Number(localStorage.getItem("cardCount"));
const SAVED_PLAYER: string | null = localStorage.getItem("player");
const SELECTED_THEME: string | null = localStorage.getItem("theme");
if (SELECTED_THEME === "Gaming theme") {
    document.body.classList.add("gaming-theme");
}

let currentPlayer: Player =
    SAVED_PLAYER === "Orange" ? "Orange" : "Blue";

export let selectedCards: HTMLDivElement[] = [];
export let isChecking: boolean = false;
let blueScore: number = 0;
let orangeScore: number = 0;
export let matchedCards: number = 0;

export function increaseMatchedCards(): void {
    matchedCards += MATCHED_CARDS_INCREMENT;
}

const CODE_VIBES_IMAGES: string[] = [
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

const GAMING_THEME_IMAGES: string[] = [
    "./public/gaming_theme_cards/ace.svg",
    "./public/gaming_theme_cards/circle.svg",
    "./public/gaming_theme_cards/coin.svg",
    "./public/gaming_theme_cards/cool_banana.svg",
    "./public/gaming_theme_cards/gameboy.svg",
    "./public/gaming_theme_cards/gamepad.svg",
    "./public/gaming_theme_cards/greeper_face.svg",
    "./public/gaming_theme_cards/level_up.svg",
    "./public/gaming_theme_cards/maze.svg",
    "./public/gaming_theme_cards/pac.svg",
    "./public/gaming_theme_cards/pac_man.svg",
    "./public/gaming_theme_cards/play button@2x 1.svg",
    "./public/gaming_theme_cards/playing_dice.svg",
    "./public/gaming_theme_cards/puzzle.svg",
    "./public/gaming_theme_cards/snake.svg",
    "./public/gaming_theme_cards/square.svg",
    "./public/gaming_theme_cards/super_mushroom.svg",
    "./public/gaming_theme_cards/triangle.svg",
];



export const BOARD = document.querySelector<HTMLDivElement>(".game__board");

if (!BOARD) {
    throw new Error("Game board not found");
}

const GAMING_THEME_BLUE_PLAYER_ICON: HTMLImageElement | null = document.querySelector<HTMLImageElement>("#gaming-theme-blue-player-icon");

const GAMING_THEME_ORANGE_PLAYER_ICON: HTMLImageElement | null = document.querySelector<HTMLImageElement>("#gaming-theme-orange-player-icon");

export function setIsChecking(value: boolean): void {
    isChecking = value;
}

export function updatePlayerScore(): void {
    if (currentPlayer === "Blue") {
        blueScore++;
    } else {
        orangeScore++;
    }

    updateScores();
}

function updateCurrentPlayer(): void {
    if (!CURRENT_PLAYER_ICON) return;
    if (SELECTED_THEME === "Gaming theme") {
        CURRENT_PLAYER_ICON.src =
            currentPlayer === "Blue"
                ? "./public/chess_pawn_blue_with_background.svg"
                : "./public/chess_pawn_orange_with_background .svg";

        return;
    }

    CURRENT_PLAYER_ICON.src =
        currentPlayer === "Blue"
            ? "./public/frame_blue.svg"
            : "./public/frame_orange.svg";
}


function updateScores(): void {
    if (BLUE_SCORE_ELEMENT) {
        BLUE_SCORE_ELEMENT.textContent = String(blueScore);
    }

    if (ORANGE_SCORE_ELEMENT) {
        ORANGE_SCORE_ELEMENT.textContent = String(orangeScore);
    }
}


export function switchPlayer(): void {
    currentPlayer = currentPlayer === "Blue" ? "Orange" : "Blue";
    updateCurrentPlayer();
}


function setupBoard(): void {
    if (!BOARD) return;
    const columns: number = getBoardColumns();
    BOARD.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    if (CARD_COUNT >= LARGE_CARD_COUNT) {
        BOARD.style.gap = LARGE_BOARD_GAP;
    } else {
        BOARD.style.gap = DEFAULT_BOARD_GAP;
    }
}


function getBoardColumns(): number {
    if (CARD_COUNT === SMALL_CARD_COUNT) return SMALL_BOARD_COLUMNS;
    return DEFAULT_BOARD_COLUMNS;
}

export function showGameOver(): void {
    hideGameElements();
    updateFinalScores();
    showWinner();
    showNextScreen();
}


function hideGameElements(): void {
    const header: HTMLElement | null = document.querySelector<HTMLElement>(".game__header");
    const gameBoard: HTMLElement | null = document.querySelector<HTMLElement>(".game__board");

    if (header) header.style.display = "none";
    if (gameBoard) gameBoard.style.display = "none";
}


function updateFinalScores(): void {
    if (FINAL_BLUE_SCORE_ELEMENT) {
        FINAL_BLUE_SCORE_ELEMENT.textContent = String(blueScore);
    }

    if (FINAL_ORANGE_SCORE_ELEMENT) {
        FINAL_ORANGE_SCORE_ELEMENT.textContent = String(orangeScore);
    }
}


function showWinner(): void {
    const gameOver: HTMLElement | null = document.querySelector<HTMLElement>(".game__game-over");

    if (!gameOver) return;

    gameOver.style.display = "flex";
    setWinnerContent();
}


function setWinnerContent(): void {
    if (blueScore === orangeScore) {
        setDraw();
    } else if (blueScore > orangeScore) {
        setWinner("Blue");
    } else {
        setWinner("Orange");
    }
}


function setWinner(player: Player): void {
    if (!WINNER_TITLE || !WINNER_PLAYER_ELEMENT || !WINNER_PLAYER_ICON) return;

    WINNER_TITLE.textContent = "The winner is";
    WINNER_PLAYER_ELEMENT.textContent = `${player} player`;
    WINNER_PLAYER_ELEMENT.classList.remove("blue", "orange");
    WINNER_PLAYER_ELEMENT.classList.add(player.toLowerCase());

    if (SELECTED_THEME === "Gaming theme") {
        WINNER_PLAYER_ICON.src = "./public/pockal.svg";
        WINNER_PLAYER_ICON.alt = "Trophy";
    } else {
        WINNER_PLAYER_ICON.src = `./public/chess_pawn_${player.toLowerCase()}.svg`;
        WINNER_PLAYER_ICON.alt = `${player} player`;
    }

    showConfetti();
}

function setDraw(): void {
    const nextScreen: HTMLElement | null = document.querySelector<HTMLElement>(".game__next-screen");

    nextScreen?.classList.add("draw");
    WINNER_TITLE!.textContent = "It's a";
    WINNER_PLAYER_ELEMENT!.textContent = "Draw";
    WINNER_PLAYER_ELEMENT!.classList.remove("blue", "orange");
    const isGamingTheme: boolean = document.body.classList.contains("gaming-theme");
    WINNER_PLAYER_ICON!.src = isGamingTheme
        ? "./public/draw_gaming_theme.svg"
        : "./public/draw_code_vibes_theme.svg";

    WINNER_PLAYER_ICON!.alt = "Draw";
    if (CONFETTI_IMAGE) CONFETTI_IMAGE.style.display = "none";
}


function showConfetti(): void {
    if (!CONFETTI_IMAGE) return;
    if (SELECTED_THEME === "Gaming theme") {
        CONFETTI_IMAGE.style.display = "none";
        return;
    }
    CONFETTI_IMAGE.style.display = "block";
}


function showNextScreen(): void {
    const gameOver: HTMLElement | null = document.querySelector<HTMLElement>(".game__game-over");
    const nextScreen: HTMLElement | null = document.querySelector<HTMLElement>(".game__next-screen");

    setTimeout(() => {
        if (gameOver) gameOver.style.display = "none";
        nextScreen?.classList.add("show");
    }, NEXT_SCREEN_DELAY);
}

function setupExitModal(): void {
    EXIT_BUTTON?.addEventListener("click", openQuitModal);
    BACK_BUTTON?.addEventListener("click", closeQuitModal);
    CONFIRM_EXIT_BUTTON?.addEventListener("click", exitGame);
}


function openQuitModal(): void {
    if (QUIT_MODAL) {
        QUIT_MODAL.style.display = "flex";
    }
}

function closeQuitModal(): void {
    if (QUIT_MODAL) {
        QUIT_MODAL.style.display = "none";
    }
}

function exitGame(): void {
    window.location.href = "./settings.html";
}

function updateGamingThemeIcons(): void {
    if (SELECTED_THEME !== "Gaming theme") return;

    GAMING_THEME_BLUE_PLAYER_ICON?.setAttribute(
        "src",
        "./public/chess_pawn_blue.svg"
    );

    GAMING_THEME_ORANGE_PLAYER_ICON?.setAttribute(
        "src",
        "./public/chess_pawn_orange.svg"
    );
}

function getCardImages(): string[] {
    if (SELECTED_THEME === "Gaming theme") {
        return GAMING_THEME_IMAGES;
    }

    return CODE_VIBES_IMAGES;
}
export const cardImages: string[] = getCardImages();



function updateGamingThemeQuitButtons(): void {
    if (SELECTED_THEME !== "Gaming theme") return;

    if (BACK_BUTTON) {
        BACK_BUTTON.textContent = "no, back to game";
    }

    if (CONFIRM_EXIT_BUTTON) {
        CONFIRM_EXIT_BUTTON.textContent = "yes, quit game";
    }
}

const finalPlayerIcons: NodeListOf<HTMLImageElement> = document.querySelectorAll<HTMLImageElement>(".game__game-over .game__player img");

function updateGamingThemeFinalIcons(): void {
    if (SELECTED_THEME !== "Gaming theme") return;

    if (finalPlayerIcons[0]) {
        finalPlayerIcons[0].src = "./public/chess_pawn_blue.svg";
    }

    if (finalPlayerIcons[1]) {
        finalPlayerIcons[1].src = "./public/chess_pawn_orange.svg";
    }
}

function updateHomeButton(): void {
    const homeButton: HTMLAnchorElement | null = document.querySelector<HTMLAnchorElement>(".game__back-to-start");
    if (!homeButton) return;
    const isGamingTheme: boolean = document.body.classList.contains("gaming-theme");
    homeButton.textContent = isGamingTheme
        ? "Home"
        : "Back to start";
}

function setupHeaderForCardCount(): void {
    const cardCount: string | null = localStorage.getItem("cardCount");
    const header: HTMLElement | null = document.querySelector<HTMLElement>(".game__header");

    if (!header || cardCount !== "36") return;

    header.classList.add("cards-36");
}

updateCurrentPlayer();
updateScores();
setupBoard();
setupExitModal();
updateGamingThemeIcons();
updateGamingThemeQuitButtons();
updateGamingThemeFinalIcons();
updateHomeButton();
setupHeaderForCardCount();
