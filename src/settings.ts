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

options.forEach((option) => {
  if (option.classList.contains("settings__theme-option")) return;

  option.addEventListener("click", () => {
    const group = option.closest(".settings__group");

    if (!group) return;

    group
      .querySelectorAll(".settings__option")
      .forEach((item) => item.classList.remove("active"));

    option.classList.add("active");
    updateThemeOptions();
  });
});

themeOptions.forEach((option) => {
  option.addEventListener("mouseenter", () => {
    themeOptions.forEach((item) => {
      item.classList.remove("active");
    });

    option.classList.add("active");
    updateThemeOptions();
    if (!themeImage) return;

    const selectedTheme = option.textContent?.trim();

    if (selectedTheme === "Gaming theme") {
      themeImage.src = "./public/Theme_Visual_2.png";
    }

    if (selectedTheme === "Code vibes theme") {
      themeImage.src = "./public/Theme _Visual_1.png";
    }
  });
});


const startButton = document.querySelector<HTMLButtonElement>(".start-button");
startButton?.addEventListener("click", () => {

  const selectedCardOption = document.querySelector<HTMLParagraphElement>(
    ".settings__board-size .settings__option.active"
  );

  const selectedPlayerOption = document.querySelector<HTMLParagraphElement>(
    ".settings__player-choice  .settings__option.active"
  );

  if (!selectedCardOption || !selectedPlayerOption) return;

  const cardCount = Number(
    selectedCardOption.textContent?.replace("cards", "").trim()
  );

  const player = selectedPlayerOption.textContent?.trim();
  localStorage.setItem("cardCount", String(cardCount));
  localStorage.setItem("player", player ?? "");
  window.location.href = "./game.html";
});

function updateThemeOptions(): void {
    const groups = document.querySelectorAll(".settings__group");

    const allSelected = Array.from(groups).every(
        (group) => group.querySelector(".settings__option.active")
    );

    if (themeOptionsContainer) {
        themeOptionsContainer.classList.toggle("ready", allSelected);
    }
}