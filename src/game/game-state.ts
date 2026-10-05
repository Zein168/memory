export type Player = "Blue" | "Orange";

export const CARD_COUNT: number = Number(localStorage.getItem("cardCount"));
export const SELECTED_THEME: string | null = localStorage.getItem("theme");
export const MATCHED_CARDS_INCREMENT: number = 2;
export const SAVED_PLAYER: string | null = localStorage.getItem("player");

export let currentPlayer: Player = SAVED_PLAYER === "Orange" ? "Orange" : "Blue";
    
export let selectedCards: HTMLButtonElement[] = [];

export let isChecking: boolean = false;

export let blueScore: number = 0;

export let orangeScore: number = 0;

export let matchedCards: number = 0;

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
}

/**
 * Switches the current player and updates the player icon.
 *
 * @returns Nothing.
 */
export function switchPlayer(): void {
    currentPlayer = currentPlayer === "Blue" ? "Orange" : "Blue";
}

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