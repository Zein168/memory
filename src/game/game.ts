import "../styles/game.scss"
import "../styles/global.scss"

import {
    CARD_COUNT,
    SELECTED_THEME,
    currentPlayer,
    blueScore,
    orangeScore,
} from "./game-state";

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
} from "./game-ui";

import { getCardImages } from "./game-helpers";
import { setupCards } from "./game-cards";

export const cardImages: string[] = getCardImages(SELECTED_THEME);


if (SELECTED_THEME === "Gaming theme") {
    document.body.classList.add("gaming-theme");
}

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
setupCards();

