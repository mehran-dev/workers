self.onmessage = function (event) {
  const originalImage = event.data;
  const { width, height, data } = originalImage;

  const arr = new Uint8ClampedArray(data.length);
  for (let i = 0; i < arr.length; i += 4) {
    arr[i + 0] = data[i]; // R value
    arr[i + 1] = data[i + 1]; // G value
    arr[i + 2] = data[i + 2]; // B value
    arr[i + 3] = 255; // A value
  }

  const modifiedImage = new ImageData(arr, width, height);
  self.postMessage(modifiedImage);
};
