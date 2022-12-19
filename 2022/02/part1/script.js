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
  const opponent = game[0].charCodeAt(0) - "A".charCodeAt(0) + 1;
  const mine = game[1].charCodeAt(0) - "X".charCodeAt(0) + 1;

  const winLose = (opponent - mine + 3) % 3;

  return (winLose ? (winLose === 1 ? 0 : winLose) : 1) * 3 + mine;
}
