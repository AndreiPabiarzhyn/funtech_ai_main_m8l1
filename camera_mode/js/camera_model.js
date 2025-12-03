import { colorDistance, getAverageColor } from "./camera_features.js";

let samples = [];

export function addSample(label, video, canvas, ctx) {
  const feature = getAverageColor(video, canvas, ctx);
  samples.push({ feature, label });
}

export function predict(video, canvas, ctx) {
  const f = getAverageColor(video, canvas, ctx);
  if (!samples.length) return "face";

  let best = Infinity;
  let bestLabel = "face";

  for (const sample of samples) {
    const d = colorDistance(f, sample.feature);
    if (d < best) {
      best = d;
      bestLabel = sample.label;
    }
  }

  return bestLabel;
}

export function resetModel() {
  samples = [];
}
