import './settings.scss'

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