import * as game from "./game";

const CARDS_PER_TURN: number = 2;
const MISMATCH_DELAY: number = 800;
const CARD_PAIR_DIVISOR: number = 2;


/**
 * Creates the inner container of a game card.
 *
 * @param image - The image displayed on the front of the card.
 * @returns The inner card element containing the front and back.
 */
function createCardInner(image: string): HTMLDivElement {
    const inner: HTMLDivElement = document.createElement("div");
    inner.classList.add("game__card-inner");

    const front: HTMLDivElement = createCardFront(image);
    const back: HTMLDivElement = document.createElement("div");

    back.classList.add("game__card-back");
    inner.append(front, back);

    return inner;
}

/**
 * Creates the front side of a game card.
 *
 * @param image - The image displayed on the card.
 * @returns The card front containing the image.
 */
function createCardFront(image: string): HTMLDivElement {
    const front: HTMLDivElement = document.createElement("div");
    const img: HTMLImageElement = document.createElement("img");

    front.classList.add("game__card-front");
    img.src = image;
    img.alt = "Tech icon";

    front.appendChild(img);
    return front;
}

/**
 * Creates all game cards and adds click events to them.
 *
 * @returns Nothing.
 */
export function setupCards(): void {
    const cards: string[] = createCardList();
    cards.forEach((image: string) => {
        const card: HTMLDivElement = createCard(image);
        game.BOARD?.appendChild(card);
        card.addEventListener("click", () => handleCardClick(card));
    });
}

/**
 * Handles a card click and checks whether two cards are selected.
 *
 * @param card - The card that was clicked.
 * @returns Nothing.
 */
function handleCardClick(card: HTMLDivElement): void {
    if (isCardBlocked(card)) return;

    card.classList.add("flipped");
    game.selectedCards.push(card);

    if (game.selectedCards.length === CARDS_PER_TURN) {
        checkSelectedCards();
    }
}

/**
 * Checks whether a card can be selected.
 *
 * @param card - The card that should be checked.
 * @returns True when the card cannot be selected.
 */
function isCardBlocked(card: HTMLDivElement): boolean {
    return (
        game.isChecking ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched") ||
        game.selectedCards.length === CARDS_PER_TURN
    );
}

/**
 * Checks whether the two selected cards match.
 *
 * @returns Nothing.
 */
function checkSelectedCards(): void {
    game.setIsChecking(true);

    const [first, second]: HTMLDivElement[] = game.selectedCards;

    if (first.dataset.image === second.dataset.image) {
        handleMatch(first, second);
    } else {
        handleMismatch(first, second);
    }
}

/**
 * Handles a matching pair and updates the game state.
 *
 * @param first - The first matching card.
 * @param second - The second matching card.
 * @returns Nothing.
 */
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

/**
 * Marks both matching cards as matched.
 *
 * @param first - The first matching card.
 * @param second - The second matching card.
 * @returns Nothing.
 */
function markCardsAsMatched(
    first: HTMLDivElement,
    second: HTMLDivElement
): void {
    first.classList.add("matched");
    second.classList.add("matched");
}

/**
 * Creates a shuffled list containing pairs of card images.
 *
 * @returns A shuffled list of card image paths.
 */
function createCardList(): string[] {
    const selected: string[] = game.cardImages.slice(
        0,
        game.CARD_COUNT / CARD_PAIR_DIVISOR
    );
    const pairs: string[] = selected.flatMap((image: string) => [image, image]);
    return pairs.sort(() => Math.random() - 0.5);

}

/**
 * Creates a game card with its image and inner elements.
 *
 * @param image - The image displayed on the card.
 * @returns The created game card element.
 */
function createCard(image: string): HTMLDivElement {
    const card: HTMLDivElement = document.createElement("div");
    card.classList.add("game__card");
    card.dataset.image = image;
    const inner: HTMLDivElement = createCardInner(image);
    card.appendChild(inner);
    return card;
}

/**
 * Handles two cards that do not match.
 *
 * @param first - The first selected card.
 * @param second - The second selected card.
 * @returns Nothing.
 */
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

/**
 * Resets the currently selected cards and checking state.
 *
 * @returns Nothing.
 */
function resetSelection(): void {
    game.selectedCards.length = 0;
    game.setIsChecking(false);
}

setupCards();

