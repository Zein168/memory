
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

const cardCount = Number(localStorage.getItem("cardCount"));
const savedPlayer = localStorage.getItem("player");
const selectedTheme = localStorage.getItem("theme");
if (selectedTheme === "Gaming theme") {
    document.body.classList.add("gaming-theme");
}

let currentPlayer: Player =
    savedPlayer === "Orange" ? "Orange" : "Blue";

let selectedCards: HTMLDivElement[] = [];
let isChecking = false;
let blueScore = 0;
let orangeScore = 0;
let matchedCards = 0;

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



const board = document.querySelector<HTMLDivElement>(".game__board");

if (!board) {
    throw new Error("Game board not found");
}

const gamingThemeBluePlayerIcon =
    document.querySelector<HTMLImageElement>("#gaming-theme-blue-player-icon");

const gamingThemeOrangePlayerIcon =
    document.querySelector<HTMLImageElement>("#gaming-theme-orange-player-icon");

function createCardList(): string[] {
    const selected = cardImages.slice(0, cardCount / 2);
    const pairs = selected.flatMap((image) => [image, image]);

    return pairs.sort(() => Math.random() - 0.5);
}


function createCard(image: string): HTMLDivElement {
    const card = document.createElement("div");
    card.classList.add("game__card");
    card.dataset.image = image;

    const inner = createCardInner(image);
    card.appendChild(inner);

    return card;
}


function createCardInner(image: string): HTMLDivElement {
    const inner = document.createElement("div");
    inner.classList.add("game__card-inner");

    const front = createCardFront(image);
    const back = document.createElement("div");

    back.classList.add("game__card-back");
    inner.append(front, back);

    return inner;
}


function createCardFront(image: string): HTMLDivElement {
    const front = document.createElement("div");
    const img = document.createElement("img");

    front.classList.add("game__card-front");
    img.src = image;
    img.alt = "Tech icon";

    front.appendChild(img);
    return front;
}

function setupCards(): void {
    cards.forEach((image) => {
        const card = createCard(image);
        board?.appendChild(card);
        card.addEventListener("click", () => handleCardClick(card));
    });
}


function handleCardClick(card: HTMLDivElement): void {
    if (isCardBlocked(card)) return;

    card.classList.add("flipped");
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        checkSelectedCards();
    }
}


function isCardBlocked(card: HTMLDivElement): boolean {
    return (
        isChecking ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched") ||
        selectedCards.length === 2
    );
}

function checkSelectedCards(): void {
    isChecking = true;

    const [first, second] = selectedCards;

    if (first.dataset.image === second.dataset.image) {
        handleMatch(first, second);
    } else {
        handleMismatch(first, second);
    }
}


function handleMatch(
    first: HTMLDivElement,
    second: HTMLDivElement
): void {
    markCardsAsMatched(first, second);
    updatePlayerScore();
    matchedCards += 2;
    resetSelection();
    switchPlayer();

    if (matchedCards === cardCount) {
        showGameOver();
    }
}


function markCardsAsMatched(
    first: HTMLDivElement,
    second: HTMLDivElement
): void {
    first.classList.add("matched");
    second.classList.add("matched");
}


function updatePlayerScore(): void {
    if (currentPlayer === "Blue") {
        blueScore++;
    } else {
        orangeScore++;
    }

    updateScores();
}


function handleMismatch(
    first: HTMLDivElement,
    second: HTMLDivElement
): void {
    setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        resetSelection();
        switchPlayer();
    }, 800);
}


function resetSelection(): void {
    selectedCards = [];
    isChecking = false;
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


function switchPlayer(): void {
    currentPlayer = currentPlayer === "Blue" ? "Orange" : "Blue";
    updateCurrentPlayer();
}


function setupBoard(): void {
    if (!board) return;

    const columns = getBoardColumns();
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}


function getBoardColumns(): number {
    if (cardCount === 16) return 4;
    return 6;
}

function showGameOver(): void {
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
    winnerPlayerIcon!.src = "./public/draw.svg";
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
const cardImages = getCardImages();
const cards = createCardList();


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


updateCurrentPlayer();
updateScores();
blueScore = 3;
orangeScore = 1;
showGameOver();
setupCards();
setupBoard();
setupExitModal();
updateGamingThemeIcons();
updateGamingThemeQuitButtons();
updateGamingThemeFinalIcons();