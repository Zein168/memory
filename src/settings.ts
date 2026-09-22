import './settings.scss'
import './global.scss'

const options: NodeListOf<HTMLParagraphElement> = document.querySelectorAll<HTMLParagraphElement>(
  ".settings__option"
);

const themeImage: HTMLImageElement | null = document.querySelector<HTMLImageElement>(
  ".settings__theme-image"
);

const themeOptionsContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".settings__theme-options");

const themeOptions: NodeListOf<HTMLParagraphElement> = document.querySelectorAll<HTMLParagraphElement>(
  ".settings__theme-option"
);

const selectedTheme: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>(
  ".settings__selected-theme"
);

const selectedPlayer: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>(
  ".settings__selected-player"
);

const selectedBoardSize: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>(
  ".settings__selected-board-size"
);

/**
 * Activates a selected settings option.
 *
 * @param option - The settings option that was selected.
 * @returns Nothing.
 */
function setActiveOption(option: HTMLParagraphElement): void {
  const group: Element | null = option.closest(".settings__group");
  if (!group) return;
  group
    .querySelectorAll(".settings__option")
    .forEach((item: Element) => item.classList.remove("active"));
  option.classList.add("active");
  updateSelectedValues();
  updateThemeOptions();
}


/**
 * Sets up click events for the available settings options.
 *
 * @returns Nothing.
 */
function setupOptions(): void {
  options.forEach((option: HTMLParagraphElement) => {
    if (option.classList.contains("settings__theme-option")) return;
    option.addEventListener("click", () => setActiveOption(option));
  });
}

/**
 * Updates the theme preview image based on the selected theme.
 *
 * @param option - The selected theme option.
 * @returns Nothing.
 */
function updateThemeImage(option: HTMLParagraphElement): void {
  if (!themeImage) return;
  const selectedTheme: string = option.textContent?.trim() ?? "";
  if (selectedTheme === "Gaming theme") {
    themeImage.src = "./public/Theme_Visual_2.png";
  }
  if (selectedTheme === "Code vibes theme") {
    themeImage.src = "./public/Theme _Visual_1.png";
  }
}

/**
 * Sets up click events for the theme options.
 *
 * @returns Nothing.
 */
function setupThemeOptions(): void {
  themeOptions.forEach((option: HTMLParagraphElement) => {
    option.addEventListener("click", () => {
      handleThemeClick(option);
    });
  });
}

/**
 * Handles a selected theme option.
 *
 * @param option - The selected theme option.
 * @returns Nothing.
 */
function handleThemeClick(option: HTMLParagraphElement): void {
  themeOptions.forEach((item: HTMLParagraphElement) => item.classList.remove("active"));
  option.classList.add("active");
  updateSelectedValues();
  localStorage.setItem("theme", option.textContent?.trim() ?? "");
  updateThemeOptions();
  updateThemeImage(option);
}
/**
 * Updates the theme options when all required settings are selected.
 *
 * @returns Nothing.
 */
function updateThemeOptions(): void {
  const groups: NodeListOf<HTMLElement> = document.querySelectorAll(".settings__group");
  const allSelected: boolean = Array.from(groups).every(
    (group) => group.querySelector(".settings__option.active")
  );
  themeOptionsContainer?.classList.toggle("ready", allSelected);
}

/**
 * Gets the number of cards selected for the game.
 *
 * @returns The selected card count or null if no option is selected.
 */
function getSelectedCardCount(): number | null {
  const option: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>(
    ".settings__board-size .settings__option.active"
  );
  if (!option) return null;
  return Number(option.textContent?.replace("cards", "").trim());
}

/**
 * Gets the selected player.
 *
 * @returns The selected player or null if no player is selected.
 */
function getSelectedPlayer(): string | null {
  const option: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>(
    ".settings__player-choice .settings__option.active"
  );
  return option?.textContent?.trim() ?? null;
}

/**
 * Starts the game with the selected settings.
 *
 * @returns Nothing.
 */
function startGame(): void {
  const cardCount: number | null = getSelectedCardCount();
  const player: string | null = getSelectedPlayer();
  const theme: string | null = getSelectedTheme();
  if (cardCount === null || player === null || theme === null) return;
  localStorage.setItem("cardCount", String(cardCount));
  localStorage.setItem("player", player);
  localStorage.setItem("theme", theme);
  window.location.href = "./game.html";
}


/**
 * Sets up the start button click event.
 *
 * @returns Nothing.
 */
function setupStartButton(): void {
  const startButton: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>(".start-button");
  startButton?.addEventListener("click", startGame);
}

/**
 * Updates the displayed selected player and board size.
 *
 * @returns Nothing.
 */
function updateSelectedValues(): void {
  const player: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>(
    ".settings__player-choice .settings__option.active"
  );

  const boardSize: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>(
    ".settings__board-size .settings__option.active"
  );

  if (player && selectedPlayer) {
    selectedPlayer.textContent = player.textContent?.trim() ?? "Player";
  }

  if (boardSize && selectedBoardSize) {
    selectedBoardSize.textContent = boardSize.textContent?.trim() ?? "Board size";
  }

  if (boardSize && selectedBoardSize) {
    selectedBoardSize.textContent =
      boardSize.textContent?.trim() ?? "Board size";
  }

}

/**
 * Gets the selected game theme.
 *
 * @returns The selected theme or null if no theme is selected.
 */
function getSelectedTheme(): string | null {
    const option: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>(
        ".settings__theme-option.active"
    );

    return option?.textContent?.trim() ?? null;
}
setupOptions();
setupThemeOptions();
setupStartButton();