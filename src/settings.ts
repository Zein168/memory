import './settings.scss'
import './global.scss'

const options = document.querySelectorAll<HTMLParagraphElement>(
  ".settings__option"
);

const themeImage = document.querySelector<HTMLImageElement>(
  ".settings__theme-image"
);

options.forEach((option) => {
  option.addEventListener("click", () => {
    const group = option.closest(".settings__group");

    if (!group) return;
    group
      .querySelectorAll(".settings__option")
      .forEach((item) => item.classList.remove("active"));
    option.classList.add("active");

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
  const selectedOption = document.querySelector<HTMLParagraphElement>(
    ".settings__board-size .settings__option.active"
  );

  if (!selectedOption) return;

  const cardCount = Number(
    selectedOption.textContent?.replace("cards", "").trim()
  );

  localStorage.setItem("cardCount", String(cardCount));

  window.location.href = "./game.html";
});