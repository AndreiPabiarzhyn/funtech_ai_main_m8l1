// Получение среднего цвета картинки
export function getAverageColor(img, canvas, ctx) {
  canvas.width = 64;
  canvas.height = 64;

  ctx.drawImage(img, 0, 0, 64, 64);
  const d = ctx.getImageData(0, 0, 64, 64).data;

  let r = 0, g = 0, b = 0;
  let count = 0;

  for (let i = 0; i < d.length; i += 12) {
    r += d[i];
    g += d[i + 1];
    b += d[i + 2];
    count++;
  }

  return {
    r: r / count,
    g: g / count,
    b: b / count
  };
}

export function colorDistance(a, b) {
  return Math.sqrt(
    (a.r - b.r) ** 2 +
    (a.g - b.g) ** 2 +
    (a.b - b.b) ** 2
  );
}
