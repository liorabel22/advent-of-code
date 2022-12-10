const fileSelector = document.querySelector(".file-selector");
const fullTextDisplayArea = document.querySelector(".full-text-display-area");
const answer = document.querySelector(".answer");

fileSelector.addEventListener("change", () => {
  let files = fileSelector.files;

  if (files.length === 0) {
    return;
  }

  const file = files[0];
  console.log(file);

  const reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;
    fullTextDisplayArea.value = file;

    const totalCalories = calculateNumberOfCalories({ rawText: file });
    const finalAnswer = Math.max(...totalCalories);
    console.log(totalCalories);
    console.log(finalAnswer);

    answer.textContent = finalAnswer;
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
});

function calculateNumberOfCalories({ rawText }) {
  const lines = rawText.split(/\r\n|\n/);
  const totalCalories = [];
  let sum = 0;

  console.log(lines);
  lines.forEach((line) => {
    const number = parseInt(line, 10);
    if (number) {
      sum += number;
    } else {
      totalCalories.push(sum);
      sum = 0;
    }
  });
  totalCalories.push(sum);
  return totalCalories;
}
