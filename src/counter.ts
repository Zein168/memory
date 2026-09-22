/**
 * Initializes the counter button and updates the displayed count.
 *
 * @param element - The button element used to display and update the counter.
 * @returns Nothing.
 */
export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
