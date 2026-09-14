import './settings.scss'
import './global.scss'

const options = document.querySelectorAll<HTMLParagraphElement>(
  ".settings__option"
);

const themeImage = document.querySelector<HTMLImageElement>(
  ".settings__theme-image"
);

const themeOptionsContainer = document.querySelector<HTMLDivElement>(".settings__theme-options");

const themeOptions = document.querySelectorAll<HTMLParagraphElement>(
  ".settings__theme-option"
);

const selectedTheme = document.querySelector<HTMLParagraphElement>(
  ".settings__selected-theme"
);

const selectedPlayer = document.querySelector<HTMLParagraphElement>(
  ".settings__selected-player"
);

const selectedBoardSize = document.querySelector<HTMLParagraphElement>(
  ".settings__selected-board-size"
);

function setActiveOption(option: HTMLParagraphElement): void {
  const group = option.closest(".settings__group");
  if (!group) return;
  group
    .querySelectorAll(".settings__option")
    .forEach((item) => item.classList.remove("active"));
  option.classList.add("active");
  updateSelectedValues();
  updateThemeOptions();
}

function setupOptions(): void {
  options.forEach((option) => {
    if (option.classList.contains("settings__theme-option")) return;
    option.addEventListener("click", () => setActiveOption(option));
  });
}

function updateThemeImage(option: HTMLParagraphElement): void {
  if (!themeImage) return;
  const selectedTheme = option.textContent?.trim();
  if (selectedTheme === "Gaming theme") {
    themeImage.src = "./public/Theme_Visual_2.png";
  }
  if (selectedTheme === "Code vibes theme") {
    themeImage.src = "./public/Theme _Visual_1.png";
  }
}


function setupThemeOptions(): void {
  themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      handleThemeClick(option);
    });
  });
}

function handleThemeClick(option: HTMLParagraphElement): void {
  themeOptions.forEach((item) => item.classList.remove("active"));
  option.classList.add("active");
  updateSelectedValues();
  localStorage.setItem("theme", option.textContent?.trim() ?? "");
  updateThemeOptions();
  updateThemeImage(option);
}

function updateThemeOptions(): void {
  const groups = document.querySelectorAll(".settings__group");
  const allSelected = Array.from(groups).every(
    (group) => group.querySelector(".settings__option.active")
  );
  themeOptionsContainer?.classList.toggle("ready", allSelected);
}

function getSelectedCardCount(): number | null {
  const option = document.querySelector<HTMLParagraphElement>(
    ".settings__board-size .settings__option.active"
  );
  if (!option) return null;
  return Number(option.textContent?.replace("cards", "").trim());
}

function getSelectedPlayer(): string | null {
  const option = document.querySelector<HTMLParagraphElement>(
    ".settings__player-choice .settings__option.active"
  );
  return option?.textContent?.trim() ?? null;
}

function startGame(): void {
  const cardCount = getSelectedCardCount();
  const player = getSelectedPlayer();
  if (cardCount === null || player === null) return;
  localStorage.setItem("cardCount", String(cardCount));
  localStorage.setItem("player", player);
  window.location.href = "./game.html";
}

function setupStartButton(): void {
  const startButton = document.querySelector<HTMLButtonElement>(".start-button");
  startButton?.addEventListener("click", startGame);
}

function updateSelectedValues(): void {
  const player = document.querySelector<HTMLParagraphElement>(
    ".settings__player-choice .settings__option.active"
  );

  const boardSize = document.querySelector<HTMLParagraphElement>(
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


setupOptions();
setupThemeOptions();
setupStartButton();