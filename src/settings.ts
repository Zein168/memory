import './settings.scss'
import './global.scss'

const options: NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>(
  ".settings__radio"
);

const themeImage: HTMLImageElement | null = document.querySelector<HTMLImageElement>(
  ".settings__theme-image"
);

const themeOptionsContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".settings__theme-options");

const themeOptions: NodeListOf<HTMLLabelElement> = document.querySelectorAll<HTMLLabelElement>(
  ".settings__theme-option"
);

const selectedPlayer: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>(
  ".settings__selected-player"
);

const selectedBoardSize: HTMLParagraphElement | null = document.querySelector<HTMLParagraphElement>(
  ".settings__selected-board-size"
);

/**
 * Sets up click events for the available settings options.
 *
 * @returns Nothing.
 */
function setupOptions(): void {
  options.forEach((option: HTMLInputElement) => {
    option.addEventListener("change", () => {
      updateSelectedValues();
      updateThemeOptions();

      if (option.name === "theme") {
        updateThemeImageFromInput(option);
        localStorage.setItem("theme", option.value);
      }
    });
  });
}

/**
 * Updates the theme preview image based on the selected theme.
 *
 * @param option - The selected theme option.
 * @returns Nothing.
 */
function updateThemeImageFromInput(option: HTMLInputElement): void {
  if (!themeImage) return;

  if (option.value === "Gaming theme") {
    themeImage.src = "./Theme_Visual_2.png";
  }

  if (option.value === "Code vibes theme") {
    themeImage.src = "./Theme_Visual_1.png";
  }
}

/**
 * Sets up hover events for the theme options.
 *
 * @returns Nothing.
 */
function setupThemeOptions(): void {
  themeOptions.forEach((option: HTMLLabelElement) => {
    option.addEventListener("mouseenter", () => {
      const radio: HTMLInputElement | null =
        option.querySelector<HTMLInputElement>(".settings__radio");

      if (radio) {
        updateThemeImageFromInput(radio);
      }
    });

    option.addEventListener("mouseleave", () => {
      restoreSelectedTheme();
    });
  });
}

/**
 * Updates the theme options and start button when all required settings are selected.
 *
 * @returns Nothing.
 */
function updateThemeOptions(): void {
  const groups: NodeListOf<HTMLElement> = document.querySelectorAll(".settings__group");
  const allSelected: boolean = Array.from(groups).every(
    (group) =>
      group.querySelector<HTMLInputElement>(
        ".settings__radio:checked"
      ) !== null
  );
  themeOptionsContainer?.classList.toggle("ready", allSelected);
  const startButton: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>(".start-button");

  startButton?.classList.toggle("ready", allSelected);
}

/**
 * Gets the number of cards selected for the game.
 *
 * @returns The selected card count or null if no board size is selected.
 */
function getSelectedCardCount(): number | null {
  const option: HTMLInputElement | null = document.querySelector<HTMLInputElement>(
    ".settings__board-size .settings__radio:checked"
  );
  if (!option) return null;

  return Number(option.value);
}

/**
 * Gets the selected player.
 *
 * @returns The selected player or null if no player is selected.
 */
function getSelectedPlayer(): string | null {
  const option: HTMLInputElement | null = document.querySelector<HTMLInputElement>(
    ".settings__player-choice .settings__radio:checked"
  );
  return option?.value ?? null;
}

/**
* Starts the game using the selected settings.
 * Stores the settings in localStorage and navigates to the game page.
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
  const player: HTMLInputElement | null = document.querySelector<HTMLInputElement>(
    ".settings__player-choice .settings__radio:checked"
  );

  const boardSize: HTMLInputElement | null = document.querySelector<HTMLInputElement>(
    ".settings__board-size .settings__radio:checked"
  );

  if (player && selectedPlayer) {
    selectedPlayer.textContent = player.value;
  }

  if (boardSize && selectedBoardSize) {
    selectedBoardSize.textContent = `${boardSize.value} cards`;
  }
}

/**
 * Gets the selected game theme.
 *
 * @returns The selected theme or null if no theme is selected.
 */
function getSelectedTheme(): string | null {
  const option: HTMLInputElement | null = document.querySelector<HTMLInputElement>(
    ".settings__theme-option .settings__radio:checked"
  );

  return option?.value ?? null;
}

/**
 * Restores the theme preview image of the currently selected theme.
 *
 * @returns Nothing.
 */
function restoreSelectedTheme(): void {
  const selectedTheme: HTMLInputElement | null =
    document.querySelector<HTMLInputElement>(
      ".settings__theme-option .settings__radio:checked"
    );

  if (!selectedTheme) return;

  updateThemeImageFromInput(selectedTheme);
}

setupOptions();
setupThemeOptions();
setupStartButton();
updateSelectedValues();
updateThemeOptions();

const initialTheme: HTMLInputElement | null =
  document.querySelector<HTMLInputElement>(
    ".settings__theme-option .settings__radio:checked"
  );

if (initialTheme) {
  updateThemeImageFromInput(initialTheme);
}