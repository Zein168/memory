import './game.scss'
import './global.scss'

const cardCount = Number(localStorage.getItem("cardCount"));

const cardImages: string[] = [
    "./public/typescript.svg",
    "./public/javascript.svg",
    "./public/html5.svg",
    "./public/css.svg",
    "./public/angular.svg",
    "./public/nodedotjs.svg",
];

const cards = cardImages
    .slice(0, cardCount / 2)
    .flatMap((image) => [image, image]);

const board = document.querySelector<HTMLDivElement>(".game__board");

if (!board) {
    throw new Error("Game board not found");
}

for (const image of cards) {
    const card = document.createElement("div");
    card.classList.add("game__card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("game__card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("game__card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("game__card-back");

    const img = document.createElement("img");
    img.src = image;
    img.alt = "Tech icon";

    cardFront.appendChild(img);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });

    board.appendChild(card);
}

if (cardCount === 16) {
    board.style.gridTemplateColumns = "repeat(4, 1fr)";
}

if (cardCount === 24) {
    board.style.gridTemplateColumns = "repeat(6, 1fr)";
}

if (cardCount === 36) {
    board.style.gridTemplateColumns = "repeat(6, 1fr)";
}

