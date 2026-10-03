type Player = "Blue" | "Orange";

export const BOARD = document.querySelector<HTMLDivElement>(".game__board");

const FINAL_BLUE_SCORE_ELEMENT =
    document.querySelector<HTMLSpanElement>("#final-blue-score");

const FINAL_ORANGE_SCORE_ELEMENT =
    document.querySelector<HTMLSpanElement>("#final-orange-score");

const WINNER_PLAYER_ELEMENT =
    document.querySelector<HTMLParagraphElement>("#winner-player");

const WINNER_PLAYER_ICON =
    document.querySelector<HTMLImageElement>("#winner-player-icon");

const WINNER_TITLE =
    document.querySelector<HTMLHeadingElement>("#winner-title");

const CURRENT_PLAYER_ICON =
    document.querySelector<HTMLImageElement>("#current-player-icon");

const BLUE_SCORE_ELEMENT =
    document.querySelector<HTMLSpanElement>("#blue-score");

const ORANGE_SCORE_ELEMENT =
    document.querySelector<HTMLSpanElement>("#orange-score");

const CONFETTI_IMAGE =
    document.querySelector<HTMLImageElement>(".game__confetti");

const EXIT_BUTTON =
    document.querySelector<HTMLButtonElement>(".game__exit");

const QUIT_MODAL =
    document.querySelector<HTMLDivElement>(".game__quit-modal");

const BACK_BUTTON =
    document.querySelector<HTMLButtonElement>(".game__quit-back");

const CONFIRM_EXIT_BUTTON =
    document.querySelector<HTMLButtonElement>(".game__quit-confirm");

const GAMING_THEME_BLUE_PLAYER_ICON =
    document.querySelector<HTMLImageElement>("#gaming-theme-blue-player-icon");

const GAMING_THEME_ORANGE_PLAYER_ICON =
    document.querySelector<HTMLImageElement>("#gaming-theme-orange-player-icon");

const EXIT_ICON =
    document.querySelector<HTMLImageElement>(".game__exit-icon");

const FINAL_PLAYER_ICONS =
    document.querySelectorAll<HTMLImageElement>(
        ".game__game-over .game__player img"
    );

const LARGE_CARD_COUNT = 24;
const LARGE_BOARD_GAP = "6px";
const DEFAULT_BOARD_GAP = "10px";
const SMALL_CARD_COUNT = 16;
const SMALL_BOARD_COLUMNS = 4;
const DEFAULT_BOARD_COLUMNS = 6;
const NEXT_SCREEN_DELAY = 4000;

/**
 * Updates the icon showing the current player.
 *
 * @returns Nothing.
 */
export function updateCurrentPlayer(
    currentPlayer: Player,
    selectedTheme: string | null
): void {
    if (!CURRENT_PLAYER_ICON) return;

    if (selectedTheme === "Gaming theme") {
        CURRENT_PLAYER_ICON.src =
            currentPlayer === "Blue"
                ? "./chess_pawn_blue_with_background.svg"
                : "./chess_pawn_orange_with_background.svg";
        return;
    }

    CURRENT_PLAYER_ICON.src =
        currentPlayer === "Blue"
            ? "./frame_blue.svg"
            : "./frame_orange.svg";
}

/**
 * Updates the displayed scores of both players.
 *
 * @returns Nothing.
 */
export function updateScores(blueScore: number,
    orangeScore: number): void {
    if (BLUE_SCORE_ELEMENT) {
        BLUE_SCORE_ELEMENT.textContent = String(blueScore);
    }

    if (ORANGE_SCORE_ELEMENT) {
        ORANGE_SCORE_ELEMENT.textContent = String(orangeScore);
    }
}

/**
 * Sets up the game board based on the selected card count.
 *
 * @returns Nothing.
 */
export function setupBoard(cardCount: number): void {
    if (!BOARD) return;
    const columns: number = getBoardColumns(cardCount);
    BOARD.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    if (cardCount >= LARGE_CARD_COUNT) {
        BOARD.style.gap = LARGE_BOARD_GAP;
    } else {
        BOARD.style.gap = DEFAULT_BOARD_GAP;
    }
}

/**
 * Determines the number of columns for the game board.
 *
 * @returns The number of board columns.
 */
function getBoardColumns(cardCount: number): number {
    if (cardCount === SMALL_CARD_COUNT) {
        return SMALL_BOARD_COLUMNS;
    }
    return DEFAULT_BOARD_COLUMNS;

}

/**
 * Displays the game-over screen and prepares the final results.
 *
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
 * Displays the winner and applies the correct theme-specific icon.
 *
 * @param player - The player who won the game.
 * @returns Nothing.
 */
function setWinner(player: Player, selectedTheme: string | null): void {
    if (!WINNER_TITLE || !WINNER_PLAYER_ELEMENT || !WINNER_PLAYER_ICON) return;

    WINNER_TITLE.textContent = "The winner is";
    if (selectedTheme === "Gaming theme") {
        WINNER_PLAYER_ELEMENT.textContent =
            `${player.charAt(0).toUpperCase()}${player.slice(1).toLowerCase()} Player`;
    } else {
        WINNER_PLAYER_ELEMENT.textContent =
            `${player.toUpperCase()} PLAYER`;
    }

    WINNER_PLAYER_ELEMENT.classList.remove("blue", "orange");
    WINNER_PLAYER_ELEMENT.classList.add(player.toLowerCase());

    if (selectedTheme === "Gaming theme") {
        WINNER_PLAYER_ICON.src = "./pockal.svg";
        WINNER_PLAYER_ICON.alt = "Trophy";
    } else {
        WINNER_PLAYER_ICON.src = `./chess_pawn_${player.toLowerCase()}.svg`;
        WINNER_PLAYER_ICON.alt = `${player} player`;
    }

    showConfetti(selectedTheme);
}

/**
 * Displays the draw result and the corresponding theme icon.
 *
 * @returns Nothing.
 */
function setDraw(selectedTheme: string | null): void {
    const nextScreen: HTMLElement | null = document.querySelector<HTMLElement>(".game__next-screen");

    nextScreen?.classList.add("draw");
    WINNER_TITLE!.textContent = "It's a";
    WINNER_PLAYER_ELEMENT!.textContent = "DRAW";
    WINNER_PLAYER_ELEMENT!.classList.remove("blue", "orange");

    const isGamingTheme: boolean  = selectedTheme === "Gaming theme";

    WINNER_PLAYER_ICON!.src = isGamingTheme
        ? "./draw_gaming_theme.svg"
        : "./draw_code_vibes_theme.svg";

    WINNER_PLAYER_ICON!.alt = "Draw";

    if (CONFETTI_IMAGE) CONFETTI_IMAGE.style.display = "none";
}

/**
 * Displays or hides the confetti based on the selected theme.
 *
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

/**
 * Adds event listeners to the game exit buttons.
 *
 * @returns Nothing.
 */
export function setupExitModal(): void {
    EXIT_BUTTON?.addEventListener("click", openQuitModal);
    BACK_BUTTON?.addEventListener("click", closeQuitModal);
    CONFIRM_EXIT_BUTTON?.addEventListener("click", exitGame);
}

/**
 * Opens the quit-game modal.
 *
 * @returns Nothing.
 */
function openQuitModal(): void {
    if (QUIT_MODAL) {
        QUIT_MODAL.style.display = "flex";
    }
}

/**
 * Closes the quit-game modal.
 *
 * @returns Nothing.
 */
function closeQuitModal(): void {
    if (QUIT_MODAL) {
        QUIT_MODAL.style.display = "none";
    }
}

/**
 * Redirects the player to the settings page.
 *
 * @returns Nothing.
 */
function exitGame(): void {
    window.location.href = "./settings.html";
}

/**
 * Updates the player icons for the gaming theme.
 *
 * @returns Nothing.
 */
export function updateGamingThemeIcons(selectedTheme: string | null): void {
    if (selectedTheme  !== "Gaming theme") return;

    GAMING_THEME_BLUE_PLAYER_ICON?.setAttribute(
        "src",
        "./chess_pawn_blue.svg"
    );

    GAMING_THEME_ORANGE_PLAYER_ICON?.setAttribute(
        "src",
        "./chess_pawn_orange.svg"
    );
}

/**
 * Updates the quit button texts for the gaming theme.
 *
 * @returns Nothing.
 */
export function updateGamingThemeQuitButtons(selectedTheme: string | null): void {
    if (selectedTheme !== "Gaming theme") return;

    if (BACK_BUTTON) {
        BACK_BUTTON.textContent = "no, back to game";
    }

    if (CONFIRM_EXIT_BUTTON) {
        CONFIRM_EXIT_BUTTON.textContent = "yes, quit game";
    }
}

/**
 * Updates the final player icons for the gaming theme.
 *
 * @returns Nothing.
 */
export function updateGamingThemeFinalIcons(selectedTheme: string | null): void {
    if (selectedTheme !== "Gaming theme") return;

    if (FINAL_PLAYER_ICONS[0]) {
        FINAL_PLAYER_ICONS[0].src = "./chess_pawn_blue.svg";
    }

    if (FINAL_PLAYER_ICONS[1]) {
        FINAL_PLAYER_ICONS[1].src = "./chess_pawn_orange.svg";
    }
}

/**
 * Updates the text of the home button based on the selected theme.
 *
 * @returns Nothing.
 */
export function updateHomeButton(): void {
    const homeButton: HTMLAnchorElement | null = document.querySelector<HTMLAnchorElement>(".game__back-to-start");
    if (!homeButton) return;
    const isGamingTheme: boolean = document.body.classList.contains("gaming-theme");
    homeButton.textContent = isGamingTheme
        ? "Home"
        : "Back to start";
}

/**
 * Adds a special class to the header when 36 cards are selected.
 *
 * @returns Nothing.
 */
export function setupHeaderForCardCount(): void {
    const cardCount: string | null = localStorage.getItem("cardCount");
    const header: HTMLElement | null = document.querySelector<HTMLElement>(".game__header");

    if (!header || cardCount !== "36") return;

    header.classList.add("cards-36");
}

/**
 * Adds hover effects to the exit button for the gaming theme.
 *
 * @returns Nothing.
 */
export function setupExitIconHover(selectedTheme: string | null): void {
    if (!EXIT_BUTTON || !EXIT_ICON) return;

    const defaultIcon: string = "./move_item.svg";
    const pinkIcon: string = "./move_item_pink.svg";

    new Image().src = pinkIcon;

    if (selectedTheme !== "Gaming theme") return;

    EXIT_BUTTON.addEventListener("mouseenter", () => {
        EXIT_ICON.src = pinkIcon;
    });

    EXIT_BUTTON.addEventListener("mouseleave", () => {
        EXIT_ICON.src = defaultIcon;
    });
}
