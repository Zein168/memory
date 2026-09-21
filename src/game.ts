
import './game.scss'
import './global.scss'

type Player = "Blue" | "Orange";

const exitButton = document.querySelector<HTMLButtonElement>(".game__exit");
const quitModal = document.querySelector<HTMLDivElement>(".game__quit-modal");
const backButton = document.querySelector<HTMLButtonElement>(".game__quit-back");
const confirmExitButton = document.querySelector<HTMLButtonElement>(".game__quit-confirm");

const finalBlueScoreElement =
    document.querySelector<HTMLSpanElement>("#final-blue-score");
const finalOrangeScoreElement =
    document.querySelector<HTMLSpanElement>("#final-orange-score");
const winnerPlayerElement =
    document.querySelector<HTMLParagraphElement>("#winner-player");
const winnerPlayerIcon =
    document.querySelector<HTMLImageElement>("#winner-player-icon");
const winnerTitle =
    document.querySelector<HTMLHeadingElement>("#winner-title");
const currentPlayerIcon =
    document.querySelector<HTMLImageElement>("#current-player-icon");
const blueScoreElement =
    document.querySelector<HTMLSpanElement>("#blue-score");
const orangeScoreElement =
    document.querySelector<HTMLSpanElement>("#orange-score");
const confettiImage =
    document.querySelector<HTMLImageElement>(".game__confetti");

export const cardCount = Number(localStorage.getItem("cardCount"));
const savedPlayer = localStorage.getItem("player");
const selectedTheme = localStorage.getItem("theme");
if (selectedTheme === "Gaming theme") {
    document.body.classList.add("gaming-theme");
}

let currentPlayer: Player =
    savedPlayer === "Orange" ? "Orange" : "Blue";

export let selectedCards: HTMLDivElement[] = [];
export let isChecking = false;
let blueScore = 0;
let orangeScore = 0;
export let matchedCards = 0;
export function increaseMatchedCards(): void {
    matchedCards += 2;
}

const codeVibesImages: string[] = [
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

const gamingThemeImages: string[] = [
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



export const board = document.querySelector<HTMLDivElement>(".game__board");

if (!board) {
    throw new Error("Game board not found");
}

const gamingThemeBluePlayerIcon =
    document.querySelector<HTMLImageElement>("#gaming-theme-blue-player-icon");

const gamingThemeOrangePlayerIcon =
    document.querySelector<HTMLImageElement>("#gaming-theme-orange-player-icon");

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
    if (!currentPlayerIcon) return;
    if (selectedTheme === "Gaming theme") {
        currentPlayerIcon.src =
            currentPlayer === "Blue"
                ? "./public/chess_pawn_blue_with_background.svg"
                : "./public/chess_pawn_orange_with_background .svg";

        return;
    }

    currentPlayerIcon.src =
        currentPlayer === "Blue"
            ? "./public/frame_blue.svg"
            : "./public/frame_orange.svg";
}


function updateScores(): void {
    if (blueScoreElement) {
        blueScoreElement.textContent = String(blueScore);
    }

    if (orangeScoreElement) {
        orangeScoreElement.textContent = String(orangeScore);
    }
}


export function switchPlayer(): void {
    currentPlayer = currentPlayer === "Blue" ? "Orange" : "Blue";
    updateCurrentPlayer();
}


function setupBoard(): void {
    if (!board) return;
    const columns = getBoardColumns();
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    if (cardCount >= 24) {
        board.style.gap = "6px";
    } else {
        board.style.gap = "10px";
    }
}


function getBoardColumns(): number {
    if (cardCount === 16) return 4;
    return 6;
}

export function showGameOver(): void {
    hideGameElements();
    updateFinalScores();
    showWinner();
    showNextScreen();
}


function hideGameElements(): void {
    const header = document.querySelector<HTMLElement>(".game__header");
    const gameBoard = document.querySelector<HTMLElement>(".game__board");

    if (header) header.style.display = "none";
    if (gameBoard) gameBoard.style.display = "none";
}


function updateFinalScores(): void {
    if (finalBlueScoreElement) {
        finalBlueScoreElement.textContent = String(blueScore);
    }

    if (finalOrangeScoreElement) {
        finalOrangeScoreElement.textContent = String(orangeScore);
    }
}


function showWinner(): void {
    const gameOver = document.querySelector<HTMLElement>(".game__game-over");

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
    if (!winnerTitle || !winnerPlayerElement || !winnerPlayerIcon) return;

    winnerTitle.textContent = "The winner is";
    winnerPlayerElement.textContent = `${player} player`;
    winnerPlayerElement.classList.remove("blue", "orange");
    winnerPlayerElement.classList.add(player.toLowerCase());

    if (selectedTheme === "Gaming theme") {
        winnerPlayerIcon.src = "./public/pockal.svg";
        winnerPlayerIcon.alt = "Trophy";
    } else {
        winnerPlayerIcon.src = `./public/chess_pawn_${player.toLowerCase()}.svg`;
        winnerPlayerIcon.alt = `${player} player`;
    }

    showConfetti();
}

function setDraw(): void {
    const nextScreen = document.querySelector<HTMLElement>(".game__next-screen");

    nextScreen?.classList.add("draw");
    winnerTitle!.textContent = "It's a";
    winnerPlayerElement!.textContent = "Draw";
    winnerPlayerElement!.classList.remove("blue", "orange");
    const isGamingTheme = document.body.classList.contains("gaming-theme");
    winnerPlayerIcon!.src = isGamingTheme
        ? "./public/draw_gaming_theme.svg"
        : "./public/draw_code_vibes_theme.svg";

    winnerPlayerIcon!.alt = "Draw";
    if (confettiImage) confettiImage.style.display = "none";
}


function showConfetti(): void {
    if (!confettiImage) return;
    if (selectedTheme === "Gaming theme") {
        confettiImage.style.display = "none";
        return;
    }
    confettiImage.style.display = "block";
}


function showNextScreen(): void {
    const gameOver = document.querySelector<HTMLElement>(".game__game-over");
    const nextScreen = document.querySelector<HTMLElement>(".game__next-screen");

    setTimeout(() => {
        if (gameOver) gameOver.style.display = "none";
        nextScreen?.classList.add("show");
    }, 4000);
}

function setupExitModal(): void {
    exitButton?.addEventListener("click", openQuitModal);
    backButton?.addEventListener("click", closeQuitModal);
    confirmExitButton?.addEventListener("click", exitGame);
}


function openQuitModal(): void {
    if (quitModal) {
        quitModal.style.display = "flex";
    }
}

function closeQuitModal(): void {
    if (quitModal) {
        quitModal.style.display = "none";
    }
}

function exitGame(): void {
    window.location.href = "./settings.html";
}

function updateGamingThemeIcons(): void {
    if (selectedTheme !== "Gaming theme") return;

    gamingThemeBluePlayerIcon?.setAttribute(
        "src",
        "./public/chess_pawn_blue.svg"
    );

    gamingThemeOrangePlayerIcon?.setAttribute(
        "src",
        "./public/chess_pawn_orange.svg"
    );
}

function getCardImages(): string[] {
    if (selectedTheme === "Gaming theme") {
        return gamingThemeImages;
    }

    return codeVibesImages;
}
export const cardImages = getCardImages();



function updateGamingThemeQuitButtons(): void {
    if (selectedTheme !== "Gaming theme") return;

    if (backButton) {
        backButton.textContent = "no, back to game";
    }

    if (confirmExitButton) {
        confirmExitButton.textContent = "yes, quit game";
    }
}

const finalPlayerIcons = document.querySelectorAll<HTMLImageElement>(".game__game-over .game__player img");

function updateGamingThemeFinalIcons(): void {
    if (selectedTheme !== "Gaming theme") return;

    if (finalPlayerIcons[0]) {
        finalPlayerIcons[0].src = "./public/chess_pawn_blue.svg";
    }

    if (finalPlayerIcons[1]) {
        finalPlayerIcons[1].src = "./public/chess_pawn_orange.svg";
    }
}

function updateHomeButton(): void {
    const homeButton = document.querySelector<HTMLAnchorElement>(".game__back-to-start");
    if (!homeButton) return;
    const isGamingTheme = document.body.classList.contains("gaming-theme");
    homeButton.textContent = isGamingTheme
        ? "Home"
        : "Back to start";
}

function setupHeaderForCardCount(): void {
    const cardCount = localStorage.getItem("cardCount");
    const header = document.querySelector<HTMLElement>(".game__header");

    if (!header || cardCount !== "36") return;

    header.classList.add("cards-36");
}

updateCurrentPlayer();
updateScores();
setupBoard();
blueScore = 7;
orangeScore = 5;
showGameOver();
setupExitModal();
updateGamingThemeIcons();
updateGamingThemeQuitButtons();
updateGamingThemeFinalIcons();
updateHomeButton();
setupHeaderForCardCount();
