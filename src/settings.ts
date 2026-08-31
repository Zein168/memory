import './settings.scss'

const options = document.querySelectorAll<HTMLParagraphElement>(
  ".settings__option"
);

options.forEach((option) => {
  option.addEventListener("click", () => {
    const group = option.closest(".settings__group");

    if (!group) return;

    group
      .querySelectorAll(".settings__option")
      .forEach((item) => item.classList.remove("active"));

    option.classList.add("active");
  });
});