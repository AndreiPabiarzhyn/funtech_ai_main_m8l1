// Набор обучающих картинок (20)
export const trainingImages = [
  { src: "img/fish1.png", trueLabel: "fish" },
  { src: "img/fish2.png", trueLabel: "fish" },
  { src: "img/fish3.png", trueLabel: "fish" },
  { src: "img/fish4.png", trueLabel: "fish" },
  { src: "img/fish5.png", trueLabel: "fish" },
  { src: "img/fish6.png", trueLabel: "fish" },
  { src: "img/fish7.png", trueLabel: "fish" },
  { src: "img/fish8.png", trueLabel: "fish" },
  { src: "img/fish9.png", trueLabel: "fish" },
  { src: "img/fish10.png", trueLabel: "fish" },

  { src: "img/trash1.png", trueLabel: "trash" },
  { src: "img/trash2.png", trueLabel: "trash" },
  { src: "img/trash3.png", trueLabel: "trash" },
  { src: "img/trash4.png", trueLabel: "trash" },
  { src: "img/trash5.png", trueLabel: "trash" },
  { src: "img/trash6.png", trueLabel: "trash" },
  { src: "img/trash7.png", trueLabel: "trash" },
  { src: "img/trash8.png", trueLabel: "trash" },
  { src: "img/trash9.png", trueLabel: "trash" },
  { src: "img/trash10.png", trueLabel: "trash" }
];

// 6 новых картинок
export const newImages = [
  { src: "img/fish_new1.png", trueLabel: "fish" },
  { src: "img/fish_new2.png", trueLabel: "fish" },
  { src: "img/trash_new1.png", trueLabel: "trash" },
  { src: "img/trash_new2.png", trueLabel: "trash" },
  { src: "img/trash_new3.png", trueLabel: "trash" },
  { src: "img/trash_new4.png", trueLabel: "trash" }
];

export const testImages = [...trainingImages, ...newImages];
