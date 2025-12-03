import { getAverageColor, colorDistance } from "./features.js";

let samples = [];

export function addSample(label, img, canvas, ctx) {
  const feature = getAverageColor(img, canvas, ctx);
  samples.push({ feature, label });
}

export function predict(img, canvas, ctx) {
  const f = getAverageColor(img, canvas, ctx);

  let best = Infinity;
  let label = "fish";

  for (const s of samples) {
    const dist = colorDistance(f, s.feature);
    if (dist < best) {
      best = dist;
      label = s.label;
    }
  }

  return label;
}

export function resetModel() {
  samples = [];
}
