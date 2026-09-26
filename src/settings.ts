import './settings.scss'
import './global.scss'

const options: NodeListOf<HTMLButtonElement> = document.querySelectorAll<HTMLButtonElement>(
  ".settings__option"
);

const themeImage: HTMLImageElement | null = document.querySelector<HTMLImageElement>(
  ".settings__theme-image"
);

const themeOptionsContainer: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".settings__theme-options");

const themeOptions: NodeListOf<HTMLButtonElement> = document.querySelectorAll<HTMLButtonElement>(
  ".settings__theme-option"
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
function setActiveOption(option: HTMLButtonElement): void {
  const group: Element | null = option.closest(".settings__group");
  if (!group) return;
  group
    .querySelectorAll(".settings__option")
    .forEach((item: Element) => {
      item.classList.remove("active");
      item.classList.remove("selected");
    });

  option.classList.add("active");
  option.classList.add("selected");
  updateSelectedValues();
  updateThemeOptions();
}


/**
 * Sets up click events for the available settings options.
 *
 * @returns Nothing.
 */
function setupOptions(): void {
  options.forEach((option: HTMLButtonElement) => {
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
function updateThemeImage(option: HTMLButtonElement): void {
  if (!themeImage) return;
  const selectedTheme: string = option.textContent?.trim() ?? "";
  if (selectedTheme === "Gaming theme") {
    themeImage.src = "./Theme_Visual_2.png";
  }
  if (selectedTheme === "Code vibes theme") {
    themeImage.src = "./Theme_Visual_1.png";
  }
}

/**
 * Sets up click events for the theme options.
 *
 * @returns Nothing.
 */
function setupThemeOptions(): void {
  themeOptions.forEach((option: HTMLButtonElement) => {
     option.addEventListener("mouseenter", () => {
      previewTheme(option);
    });

    option.addEventListener("mouseleave", () => {
      restoreSelectedTheme();
    });
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
function handleThemeClick(option: HTMLButtonElement): void {
  themeOptions.forEach((item: HTMLButtonElement) => {
    item.classList.remove("selected");
    item.classList.remove("active");
  });

  option.classList.add("selected");
  option.classList.add("active");
   const theme: string = option.textContent?.trim() ?? "";
  localStorage.setItem("theme", theme);

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
    (group) => group.querySelector(".settings__option.selected")!== null
  );
  themeOptionsContainer?.classList.toggle("ready", allSelected);
}

/**
 * Gets the number of cards selected for the game.
 *
 * @returns The selected card count or null if no option is selected.
 */
function getSelectedCardCount(): number | null {
  const option: HTMLButtonElement  | null = document.querySelector<HTMLButtonElement >(
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
  const option: HTMLButtonElement  | null = document.querySelector<HTMLButtonElement >(
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
  const player: HTMLButtonElement  | null = document.querySelector<HTMLButtonElement >(
    ".settings__player-choice .settings__option.active"
  );

  const boardSize: HTMLButtonElement  | null = document.querySelector<HTMLButtonElement >(
    ".settings__board-size .settings__option.active"
  );

  if (player && selectedPlayer) {
    selectedPlayer.textContent = player.textContent?.trim() ?? "Player";
  }

  if (boardSize && selectedBoardSize) {
    selectedBoardSize.textContent = boardSize.textContent?.trim() ?? "Board size";
  }
}

/**
 * Gets the selected game theme.
 *
 * @returns The selected theme or null if no theme is selected.
 */
function getSelectedTheme(): string | null {
    const option: HTMLButtonElement  | null = document.querySelector<HTMLButtonElement >(
        ".settings__theme-option.selected"
    );

    return option?.textContent?.trim() ?? null;
}

function previewTheme(option: HTMLButtonElement): void {
  themeOptions.forEach((item: HTMLButtonElement) => {
    item.classList.remove("active");
  });

  option.classList.add("active");

  updateThemeImage(option);
}

function restoreSelectedTheme(): void {
  const selectedTheme: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>(
      ".settings__theme-option.selected"
    );

  if (!selectedTheme) return;

  themeOptions.forEach((item: HTMLButtonElement) => {
    item.classList.remove("active");
  });

  selectedTheme.classList.add("active");

  updateThemeImage(selectedTheme);
}

setupOptions();
setupThemeOptions();
setupStartButton();