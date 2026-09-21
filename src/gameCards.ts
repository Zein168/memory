import * as game from "./game";


function createCardInner(image: string): HTMLDivElement {
    const inner = document.createElement("div");
    inner.classList.add("game__card-inner");

    const front = createCardFront(image);
    const back = document.createElement("div");

    back.classList.add("game__card-back");
    inner.append(front, back);

    return inner;
}


function createCardFront(image: string): HTMLDivElement {
    const front = document.createElement("div");
    const img = document.createElement("img");

    front.classList.add("game__card-front");
    img.src = image;
    img.alt = "Tech icon";

    front.appendChild(img);
    return front;
}

export function setupCards(): void {
    const cards = createCardList();
    cards.forEach((image) => {
        const card = createCard(image);
        game.board?.appendChild(card);
        card.addEventListener("click", () => handleCardClick(card));
    });
}


function handleCardClick(card: HTMLDivElement): void {
    if (isCardBlocked(card)) return;

    card.classList.add("flipped");
    game.selectedCards.push(card);

    if (game.selectedCards.length === 2) {
        checkSelectedCards();
    }
}


function isCardBlocked(card: HTMLDivElement): boolean {
    return (
        game.isChecking ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched") ||
        game.selectedCards.length === 2
    );
}

function checkSelectedCards(): void {
    game.setIsChecking(true);

    const [first, second] = game.selectedCards;

    if (first.dataset.image === second.dataset.image) {
        handleMatch(first, second);
    } else {
        handleMismatch(first, second);
    }
}


function handleMatch(
    first: HTMLDivElement,
    second: HTMLDivElement
): void {
    markCardsAsMatched(first, second);
    game.updatePlayerScore();
    game.increaseMatchedCards();
    resetSelection();
    game.switchPlayer();

    if (game.matchedCards === game.cardCount) {
        game.showGameOver();
    }
}


function markCardsAsMatched(
    first: HTMLDivElement,
    second: HTMLDivElement
): void {
    first.classList.add("matched");
    second.classList.add("matched");
}


function createCardList(): string[] {
    const selected = game.cardImages.slice(0, game.cardCount / 2);
    const pairs = selected.flatMap((image) => [image, image]);
    return pairs.sort(() => Math.random() - 0.5);

}

function createCard(image: string): HTMLDivElement {
    const card = document.createElement("div");
    card.classList.add("game__card");
    card.dataset.image = image;
    const inner = createCardInner(image);
    card.appendChild(inner);
    return card;
}

function handleMismatch(
    first: HTMLDivElement,
    second: HTMLDivElement
): void {
    setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        resetSelection();
        game.switchPlayer();
    }, 800);
}

function resetSelection(): void {
    game.selectedCards.length = 0;
    game.setIsChecking(false);
}

setupCards();

