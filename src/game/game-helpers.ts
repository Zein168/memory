type Player = "Blue" | "Orange";

const CODE_VIBES_IMAGES: string[] = [
    "./code_vibes_theme_cards/angular.svg",
    "./code_vibes_theme_cards/bootstrap.svg",
    "./code_vibes_theme_cards/cmd.svg",
    "./code_vibes_theme_cards/css.svg",
    "./code_vibes_theme_cards/database.svg",
    "./code_vibes_theme_cards/firebase.svg",
    "./code_vibes_theme_cards/git.svg",
    "./code_vibes_theme_cards/github.svg",
    "./code_vibes_theme_cards/dj.svg",
    "./code_vibes_theme_cards/html5.svg",
    "./code_vibes_theme_cards/javascript.svg",
    "./code_vibes_theme_cards/node_js.svg",
    "./code_vibes_theme_cards/python.svg",
    "./code_vibes_theme_cards/react.svg",
    "./code_vibes_theme_cards/sass.svg",
    "./code_vibes_theme_cards/typescript.svg",
    "./code_vibes_theme_cards/vsc.svg",
    "./code_vibes_theme_cards/vue_js.svg"
];

const GAMING_THEME_IMAGES: string[] = [
    "./gaming_theme_cards/ace.svg",
    "./gaming_theme_cards/circle.svg",
    "./gaming_theme_cards/coin.svg",
    "./gaming_theme_cards/cool_banana.svg",
    "./gaming_theme_cards/gameboy.svg",
    "./gaming_theme_cards/gamepad.svg",
    "./gaming_theme_cards/greeper_face.svg",
    "./gaming_theme_cards/level_up.svg",
    "./gaming_theme_cards/maze.svg",
    "./gaming_theme_cards/pac.svg",
    "./gaming_theme_cards/pac_man.svg",
    "./gaming_theme_cards/play button@2x 1.svg",
    "./gaming_theme_cards/playing_dice.svg",
    "./gaming_theme_cards/puzzle.svg",
    "./gaming_theme_cards/snake.svg",
    "./gaming_theme_cards/square.svg",
    "./gaming_theme_cards/super_mushroom.svg",
    "./gaming_theme_cards/triangle.svg",
];

/**
 * Returns the card images for the selected theme.
 *
 * @param selectedTheme - The currently selected game theme.
 * @returns An array containing the card image paths.
 */
export function getCardImages(selectedTheme: string | null): string[] {
    if (selectedTheme === "Gaming theme") {
        return GAMING_THEME_IMAGES;
    }

    return CODE_VIBES_IMAGES;
}