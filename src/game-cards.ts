import * as game from "./game";

const CARDS_PER_TURN: number = 2;
const MISMATCH_DELAY: number = 800;
const CARD_PAIR_DIVISOR: number = 2;


function createCardInner(image: string): HTMLDivElement {
    const inner: HTMLDivElement = document.createElement("div");
    inner.classList.add("game__card-inner");

    const front: HTMLDivElement = createCardFront(image);
    const back: HTMLDivElement = document.createElement("div");

    back.classList.add("game__card-back");
    inner.append(front, back);

    return inner;
}


function createCardFront(image: string): HTMLDivElement {
    const front: HTMLDivElement = document.createElement("div");
    const img: HTMLImageElement = document.createElement("img");

    front.classList.add("game__card-front");
    img.src = image;
    img.alt = "Tech icon";

    front.appendChild(img);
    return front;
}

export function setupCards(): void {
    const cards: string[] = createCardList();
    cards.forEach((image: string) => {
        const card: HTMLDivElement = createCard(image);
        game.BOARD?.appendChild(card);
        card.addEventListener("click", () => handleCardClick(card));
    });
}


function handleCardClick(card: HTMLDivElement): void {
    if (isCardBlocked(card)) return;

    card.classList.add("flipped");
    game.selectedCards.push(card);

    if (game.selectedCards.length === CARDS_PER_TURN) {
        checkSelectedCards();
    }
}


function isCardBlocked(card: HTMLDivElement): boolean {
    return (
        game.isChecking ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched") ||
        game.selectedCards.length === CARDS_PER_TURN
    );
}

function checkSelectedCards(): void {
    game.setIsChecking(true);

    const [first, second]: HTMLDivElement[] = game.selectedCards;

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

    if (game.matchedCards === game.CARD_COUNT) {
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
    const selected: string[] = game.cardImages.slice(
        0,
        game.CARD_COUNT / CARD_PAIR_DIVISOR
    );
    const pairs: string[] = selected.flatMap((image: string) => [image, image]);
    return pairs.sort(() => Math.random() - 0.5);

}

function createCard(image: string): HTMLDivElement {
    const card: HTMLDivElement = document.createElement("div");
    card.classList.add("game__card");
    card.dataset.image = image;
    const inner: HTMLDivElement = createCardInner(image);
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
    }, MISMATCH_DELAY);
}

function resetSelection(): void {
    game.selectedCards.length = 0;
    game.setIsChecking(false);
}

setupCards();

