const sampleTexts = [
  "Программирование — это искусство говорить компьютеру, что делать.",
  "JavaScript — один из самых популярных языков программирования в мире.",
  "Скорость печати важна для разработчиков, писателей и журналистов.",
  "Искусственный интеллект уже меняет мир, и это только начало.",
];

let startTime,
  currentIndex = 0,
  correctChars = 0,
  totalTyped = 0;
const textDisplay = document.getElementById("text-display");
const timerDisplay = document.getElementById("timer");
const statsDisplay = document.getElementById("stats");
const result = document.getElementById("result");

function generateText() {
  const randomText =
    sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  textDisplay.innerHTML = randomText
    .split("")
    .map((letter) => `<span>${letter}</span>`)
    .join("");

  currentIndex = 0;
  correctChars = 0;
  totalTyped = 0;
  result.textContent = "";
  startTime = null;
  updateHighlight();
}

function updateHighlight() {
  const spans = textDisplay.querySelectorAll("span");
  spans.forEach((span, i) => {
    span.classList.remove("correct", "incorrect", "active");
    if (i === currentIndex) span.classList.add("active");
  });
}

document.addEventListener("keydown", (e) => {
  const spans = textDisplay.querySelectorAll("span");

  if (!startTime) startTime = new Date();

  if (e.key === "Backspace" && currentIndex > 0) {
    currentIndex--;
    totalTyped--;
    if (spans[currentIndex].classList.contains("correct")) correctChars--;
    spans[currentIndex].classList.remove("correct", "incorrect");
    updateStats();
    updateHighlight();
    return;
  }

  if (e.key.length === 1 && currentIndex < spans.length) {
    totalTyped++;
    if (e.key === spans[currentIndex].textContent) {
      spans[currentIndex].classList.add("correct");
      correctChars++;
    } else {
      spans[currentIndex].classList.add("incorrect");
    }
    currentIndex++;
    updateStats();
    updateHighlight();
  }

  if (currentIndex === spans.length) {
    finishTest();
  }
});

function updateStats() {
  if (totalTyped === 0) return;
  const accuracy = Math.round((correctChars / totalTyped) * 100);
  const elapsed = (new Date() - startTime) / 1000;
  const wpm = Math.round(correctChars / 5 / (elapsed / 60));
  statsDisplay.textContent = `⚡ WPM: ${wpm} | 🎯 Точность: ${accuracy}%`;
}

function finishTest() {
  const elapsed = (new Date() - startTime) / 1000;
  const wpm = Math.round(correctChars / 5 / (elapsed / 60));
  const accuracy = Math.round((correctChars / totalTyped) * 100);
  result.textContent = `🏆 Итог: ${wpm} WPM, точность: ${accuracy}%`;

  setTimeout(generateText, 3000);
}

function updateTimer() {
  if (!startTime) return;
  const elapsed = Math.floor((new Date() - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  timerDisplay.textContent = `⏳ ${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

setInterval(updateTimer, 1000);
generateText();
