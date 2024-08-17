self.onmessage = function (event) {
  const imageData = event.data;
  console.log("_______________________________________", imageData);

  const { width, height, data } = imageData;
  const pixels = [];

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]; // Red
    const g = data[i + 1]; // Green
    const b = data[i + 2]; // Blue
    // We can also access the alpha channel with data[i + 3] if needed

    // Store the RGB values as an array
    pixels.push([r, g, b]);
  }

  // Post the result back to the main thread
  self.postMessage(pixels);
};
