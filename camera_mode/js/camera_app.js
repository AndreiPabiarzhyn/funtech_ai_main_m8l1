import { addSample, predict, resetModel } from "./camera_model.js";
import { showLamp } from "./camera_ui.js";

// ------------------------
// ЭЛЕМЕНТЫ
// ------------------------
const video = document.getElementById("video");
const calcCanvas = document.getElementById("calcCanvas2");
const ctx = calcCanvas.getContext("2d");

const btnFace = document.getElementById("btnFace");
const btnHands = document.getElementById("btnHands");

const faceCountLabel = document.getElementById("faceCount");
const handsCountLabel = document.getElementById("handsCount");

const btnStartTest = document.getElementById("btnStartTest2");

// Ручной тест
const testArea = document.getElementById("testArea");
const testCounter = document.getElementById("testCounter");
const testMessage = document.getElementById("testMessage");
const btnRecognize = document.getElementById("btnRecognize");
const btnNext = document.getElementById("btnNext");

// Итоги
const summary = document.getElementById("summary2");
const summaryText = document.getElementById("summaryText2");
const btnRestart = document.getElementById("btnRestart2");

// ------------------------
// СОСТОЯНИЕ
// ------------------------
let faceCount = 0;
let handsCount = 0;

let testStep = 1;
const maxTests = 10;
let resultFace = 0;
let resultHands = 0;

// ------------------------
// СБРОС МОДЕЛИ
// ------------------------
resetModel();

// ------------------------
// ЗАПУСК КАМЕРЫ
// ------------------------
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Камера недоступна:", err);
  });

// ------------------------
// АНИМАЦИЯ ДЛЯ ОБУЧЕНИЯ
// ------------------------
function animateTraining(type) {
  video.classList.add("flash");
  showLamp(type);

  setTimeout(() => {
    video.classList.remove("flash");
  }, 350);
}

// ------------------------
// ОБУЧЕНИЕ ПРИМЕРАМИ
// ------------------------
btnFace.onclick = () => {
  if (faceCount >= 10) return;

  addSample("face", video, calcCanvas, ctx);
  faceCount++;
  faceCountLabel.textContent = `(${faceCount}/10)`;

  animateTraining("face");

  if (faceCount >= 10) btnFace.classList.add("disabled");
  maybeEnableTest();
};

btnHands.onclick = () => {
  if (handsCount >= 10) return;

  addSample("hands", video, calcCanvas, ctx);
  handsCount++;
  handsCountLabel.textContent = `(${handsCount}/10)`;

  animateTraining("hands");

  if (handsCount >= 10) btnHands.classList.add("disabled");
  maybeEnableTest();
};

// ------------------------
// ОТКРЫТЬ КНОПКУ "ПРОВЕРИТЬ"
// ------------------------
function maybeEnableTest() {
  if (faceCount >= 10 && handsCount >= 10) {
    btnStartTest.hidden = false;
  }
}

// ------------------------
// НАЖАТИЕ "ПРОВЕРИТЬ СЕБЯ"
// ------------------------
btnStartTest.onclick = () => {
  btnStartTest.hidden = true;
  document.getElementById("trainButtons").hidden = true;

  startManualTest();
};

// ------------------------
// РУЧНОЙ РЕЖИМ ПРОВЕРКИ
// ------------------------
function startManualTest() {
  testStep = 1;
  resultFace = 0;
  resultHands = 0;

  updateTestUI();
  testArea.hidden = false;
}

// обновление UI шага
function updateTestUI() {
  testCounter.textContent = `Проверка ${testStep} из ${maxTests}`;
  testMessage.textContent = "Я готов распознать!";
  btnRecognize.hidden = false;
  btnNext.hidden = true;
}

// ------------------------
// КНОПКА "РАСПОЗНАТЬ"
// ------------------------
btnRecognize.onclick = () => {
  btnRecognize.hidden = true;

  const label = predict(video, calcCanvas, ctx);
  showLamp(label);

  if (label === "face") {
    resultFace++;
    testMessage.textContent = "😜 Смешное лицо!";
  } else {
    resultHands++;
    testMessage.textContent = "✋ Жест руками!";
  }

  btnNext.hidden = false;
};

// ------------------------
// КНОПКА "ДАЛЕЕ"
// ------------------------
btnNext.onclick = () => {
  testStep++;

  if (testStep > maxTests) {
    // перейти к итогам
    testArea.hidden = true;
    showFinal();
  } else {
    updateTestUI();
  }
};

// ------------------------
// ИТОГИ
// ------------------------
function showFinal() {
  summary.hidden = false;

  const total = resultFace + resultHands;
  const best = Math.max(resultFace, resultHands);
  const percent = total > 0 ? Math.floor((best / total) * 100) : 0;

  summaryText.innerHTML = `
    😜 Лиц распознано: <b>${resultFace}</b><br>
    ✋ Жестов распознано: <b>${resultHands}</b><br><br>
    <b>Точность: ${percent}%</b>
  `;
}

// ------------------------
// РЕСТАРТ 2 РЕЖИМА
// ------------------------
btnRestart.onclick = () => {
  resetModel();

  faceCount = 0;
  handsCount = 0;

  faceCountLabel.textContent = "(0/10)";
  handsCountLabel.textContent = "(0/10)";

  btnFace.classList.remove("disabled");
  btnHands.classList.remove("disabled");

  summary.hidden = true;
  btnStartTest.hidden = true;
  testArea.hidden = true;

  document.getElementById("trainButtons").hidden = false;
};

const btnBackToMode1 = document.getElementById("btnBackToMode1");

btnBackToMode1.onclick = () => {
  // Полный сброс прогресса
  localStorage.removeItem("stage1_completed");

  // Переход в первый режим
  window.location.href = "../index.html";
};
