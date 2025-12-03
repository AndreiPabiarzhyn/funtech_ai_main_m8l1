export function showLamp(type) {
  const lamp = document.getElementById("centerLamp");

  lamp.classList.remove(
    "center-lamp--face",
    "center-lamp--hands"
  );

  lamp.classList.add(
    type === "face" ? "center-lamp--face" : "center-lamp--hands"
  );

  lamp.style.opacity = 1;

  setTimeout(() => {
    lamp.style.opacity = 0;
  }, 600);
}
