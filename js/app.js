import { trainingImages, testImages } from "./data.js";
import { addSample, predict, resetModel } from "./model.js";
import { showLamp, animateResult } from "./ui.js";

// перемешиваем картинки
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(trainingImages);
shuffle(testImages);

// элементы
const imgEl = document.getElementById("mainImage");
const canvas = document.getElementById("calcCanvas");
const ctx = canvas.getContext("2d");

const phaseText = document.getElementById("phaseText");
const progressText = document.getElementById("progressText");

const trainButtons = document.getElementById("trainButtons");
const summarySection = document.getElementById("summary");
const summaryContent = document.getElementById("summaryText");
const goToCameraBtn = document.getElementById("goToCameraBtn");
const btnRestart = document.getElementById("btnRestart");
const btnFish = document.getElementById("btnFish");
const btnTrash = document.getElementById("btnTrash");

// состояние
let phase = "train";        // "train" | "test" | "summary"
let trainIndex = 0;
let testIndex = 0;
let testResults = [];

// ---------------------------
// обновление надписи и прогресса
// ---------------------------
function updateUI() {
  if (phase === "train") {
    phaseText.textContent = "Этап 1: обучение";
    progressText.textContent = `Картинка ${trainIndex + 1} из ${trainingImages.length}`;
  } else if (phase === "test") {
    phaseText.textContent = "Этап 2: проверка модели";
    progressText.textContent = `Проверка: картинка ${testIndex + 1} из ${testImages.length}`;
  } else {
    phaseText.textContent = "Этап 2: проверка модели";
    progressText.textContent = "";
  }
}

// ---------------------------
// обучение
// ---------------------------
function loadTrain() {
  imgEl.classList.remove("swim", "fall");
  imgEl.src = trainingImages[trainIndex].src;
  updateUI();
}

function nextTrain() {
  trainIndex++;
  if (trainIndex < trainingImages.length) {
    loadTrain();
  } else {
    startTest();
  }
}

// ---------------------------
// проверка
// ---------------------------
function loadTest() {
  phase = "test";
  updateUI();

  imgEl.classList.remove("swim", "fall");
  imgEl.src = testImages[testIndex].src;

  imgEl.onload = () => {
    const predicted = predict(imgEl, canvas, ctx);

    // лампа + анимация
    setTimeout(() => showLamp(predicted), 250);
    setTimeout(() => animateResult(predicted, imgEl), 450);

    testResults.push({
      trueLabel: testImages[testIndex].trueLabel,
      predictedLabel: predicted
    });

    // переходим к следующей картинке после анимации
    setTimeout(() => {
      testIndex++;
      if (testIndex < testImages.length) {
        loadTest();
      } else {
        showSummary();
      }
    }, 2400);
  };
}

function startTest() {
  phase = "test";
  trainButtons.hidden = true;
  loadTest();
}

// ---------------------------
// итоги
// ---------------------------
function showSummary() {
  phase = "summary";
  summarySection.hidden = false;
  updateUI();

  let fishCorrect = 0;
  let trashCorrect = 0;

  for (const r of testResults) {
    if (r.trueLabel === "fish" && r.predictedLabel === "fish") fishCorrect++;
    if (r.trueLabel === "trash" && r.predictedLabel === "trash") trashCorrect++;
  }

  const total = testResults.length;
  const correctTotal = fishCorrect + trashCorrect;
  const accuracy = total ? Math.round((correctTotal / total) * 100) : 0;

  summaryContent.innerHTML = `
    <p>Всего картинок на проверке: <b>${total}</b>.</p>
    <p>Рыб правильно: <b>${fishCorrect}</b>.</p>
    <p>Мусора правильно: <b>${trashCorrect}</b>.</p>
    <p>Общая точность: <b>${accuracy}%</b>.</p>
  `;

  // показываем кнопку перехода к камере
  goToCameraBtn.hidden = false;
  goToCameraBtn.onclick = () => {
    localStorage.setItem("stage1_completed", "yes");
    window.location.href = "camera_mode/camera.html";
  };
}

// ---------------------------
// обработчики кнопок
// ---------------------------
btnFish.onclick = () => {
  if (phase !== "train") return;
  addSample("fish", imgEl, canvas, ctx);
  nextTrain();
};

btnTrash.onclick = () => {
  if (phase !== "train") return;
  addSample("trash", imgEl, canvas, ctx);
  nextTrain();
};

btnRestart.onclick = () => {
  // перезапуск только режима 1
  resetModel();
  phase = "train";
  trainIndex = 0;
  testIndex = 0;
  testResults = [];

  summarySection.hidden = true;
  trainButtons.hidden = false;
  goToCameraBtn.hidden = true;

  shuffle(trainingImages);
  shuffle(testImages);

  loadTrain();
};

// ---------------------------
// старт
// ---------------------------
window.onload = () => {
  resetModel();
  phase = "train";
  trainIndex = 0;
  testIndex = 0;
  testResults = [];
  loadTrain();
};
