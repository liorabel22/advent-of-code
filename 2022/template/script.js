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
    fullTextDisplayArea.value = file;

    /* Your Functions Here */
    answer.textContent = finalResult(file);
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
});

function finalResult(input = "") {}
