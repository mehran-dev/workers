//* global variables */
let preset = "blue";
let originalImageData;

const imageWorker = new Worker("imageWorker.js");
// Function to send image data to the worker
function createOriginalImage(image) {
  const canvas = document.getElementById("original");
  const context = canvas.getContext("2d");

  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);

  originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

const processImage = () => {
  if (!originalImageData) {
    alert("No Image Global Found!");
    return;
  }
  imageWorker.postMessage({ originalImage: originalImageData, preset });
};

// Listen for the result from the worker
imageWorker.onmessage = function (event) {
  drawImage(event.data);
};

function drawImage(imageData, target = "modified") {
  const canvas = document.getElementById(target);
  const context = canvas.getContext("2d");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  context.putImageData(imageData, 0, 0);
  canvas.drawImage(imageData);
}

function reg() {
  processImage();
}

const initLoader = () => {
  // Example of loading an image and processing it
  const img = new Image();
  img.crossOrigin = "anonymous"; // Request cross-origin access

  img.src =
    "https://dkstatics-public.digikala.com/digikala-products/999fb913800f98b7f3c1120ea76ab99cc6312a28_1718203737.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90";

  img.src =
    "https://dkstatics-public.digikala.com/digikala-products/c23b49b0be1c4ae5b2a3d7a3281d2f1731065243_1726037574.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90";

  img.onload = function () {
    console.log("process on load ", img);

    createOriginalImage(img);
  };
};

initLoader();

function setPreset(txt) {
  preset = txt;
}
