// Большая лампа в центре
export function showLamp(type) {
  const lamp = document.getElementById("centerLamp");

  lamp.classList.remove("center-lamp--fish", "center-lamp--trash");

  if (type === "fish") lamp.classList.add("center-lamp--fish");
  else lamp.classList.add("center-lamp--trash");

  lamp.style.opacity = 1;

  setTimeout(() => {
    lamp.style.opacity = 0;
  }, 650);
}

// Плавная анимация
export function animateResult(type, imgEl) {
  imgEl.classList.remove("swim", "fall");

  void imgEl.offsetWidth; // reset animation

  if (type === "fish") {
    imgEl.classList.add("swim");
  } else {
    imgEl.classList.add("fall");
  }
}
