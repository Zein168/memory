type Player = "Blue" | "Orange";

export const BOARD = document.querySelector<HTMLDivElement>(".game__board");

const CURRENT_PLAYER_ICON =
    document.querySelector<HTMLImageElement>("#current-player-icon");

const BLUE_SCORE_ELEMENT =
    document.querySelector<HTMLSpanElement>("#blue-score");

const ORANGE_SCORE_ELEMENT =
    document.querySelector<HTMLSpanElement>("#orange-score");

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
 * Returns the card images for the selected theme.
 *
 * @returns An array containing the card image paths.
 */
export function getCardImages(selectedTheme: string | null): string[] {
    if (selectedTheme === "Gaming theme") {
        return GAMING_THEME_IMAGES;
    }

    return CODE_VIBES_IMAGES;
}