// main.js

// Create a new worker instance
const worker = new Worker("worker.js");
let RegData = {};
// Listen for messages from the worker
worker.onmessage = function (event) {
  console.log("Received from helloworld worker:", event.data);
};

// Send a message to the worker to start the process
worker.postMessage("start");

// main.js

// Create a new worker instance
const imageWorker = new Worker("imageWorker.js");

// Function to send image data to the worker
function processImage(image) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set canvas size to the image size
  canvas.width = image.width;
  canvas.height = image.height;

  RegData.width = image.width;
  RegData.height = image.height;
  // Draw the image onto the canvas
  context.drawImage(image, 0, 0);

  // Get the ImageData object containing pixel data
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  // Send the image data to the worker
  imageWorker.postMessage(imageData);
}

// Listen for the result from the worker
imageWorker.onmessage = function (event) {
  console.log(event);

  const pixels = event.data;
  console.log("RGB Values for all pixels:", pixels);
  RegData.pixels = pixels;
  // Here you can do whatever you need with the pixel data
};

// Example of loading an image and processing it
const img = new Image();
img.crossOrigin = "anonymous"; // Request cross-origin access

img.src =
  "https://dkstatics-public.digikala.com/digikala-products/999fb913800f98b7f3c1120ea76ab99cc6312a28_1718203737.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90";

img.onload = function () {
  console.log("process on load ", img);

  processImage(img);
};

function regenerateImage(pixels, width, height) {
  // Create a new ImageData object
  const imageData = new ImageData(width, height);

  // Iterate through the pixels array and populate the ImageData
  for (let i = 0, j = 0; i < pixels.length; i += 1, j += 4) {
    const [r, g, b] = pixels[i];
    let x = randomColor();
    // Set the red, green, and blue components
    imageData.data[j] = r; // Red
    imageData.data[j + 1] = g; // Green
    imageData.data[j + 2] = b; // Blue

    // Set the alpha component (fully opaque)
    imageData.data[j + 3] = 255; // Alpha
  }
  console.log("imageData ", imageData);

  return imageData;
}

function drawImageFromPixels(pixels, width, height) {
  // Get the ImageData object from the pixels array
  const imageData = regenerateImage(pixels, width, height);

  // Create a canvas element to draw the image
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = width;
  canvas.height = height;

  // Draw the ImageData onto the canvas
  context.putImageData(imageData, 0, 0);

  // Append the canvas to the body (or use it as needed)
  document.body.appendChild(canvas);
}

function reg() {
  drawImageFromPixels(RegData.pixels, RegData.width, RegData.height);
}

function randomColor() {
  return Math.floor(255 * Math.random());
}
