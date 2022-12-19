const fileSelector = document.querySelector(".file-selector");
const fullTextDisplayArea = document.querySelector(".full-text-display-area");
const answer = document.querySelector(".answer");

fileSelector.addEventListener("change", () => {
  let files = fileSelector.files;

  if (files.length === 0) {
    return;
  }

  const file = files[0];

  const reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;
    const lines = file.split(/\r\n|\n/);

    fullTextDisplayArea.value = file;

    /* Your Functions Here */
    answer.textContent = finalResult(lines);
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
});

/****************
 *
 * Functions
 *
 */

function finalResult(input) {
  const games = input.map((line) => line.split(" "));
  const gamesResults = games.map(gameResult);

  return gamesResults.reduce((counter, result) => counter + result, 0);
}

function gameResult(game) {
  const opponent = game[0].charCodeAt(0) - "A".charCodeAt(0);
  const result = (game[1].charCodeAt(0) - "X".charCodeAt(0)) * 3;
  // actionRelativeToResult = -1 if needs to lose (result = X = 0)
  // actionRelativeToResult = 0 if needs to draw (result = Y = 3)
  // actionRelativeToResult = 1 if needs to win (result = Z = 6)
  const actionRelativeToResult = result / 3 - 1;
  const mine = ((opponent + actionRelativeToResult + 3) % 3) + 1;

  return result + mine;
}
