// worker.js

// This code runs in a Web Worker context
self.onmessage = function (event) {
  setInterval(() => {
    // Check the received message
    if (event.data === "end") {
      // Stop the worker if the message is 'end'
      self.close(); // Terminates the worker
      console.log("closed !!!");
    } else {
      // Generate a random number and concatenate with "helloworld"
      const message = " helloworld";

      // Print the message
      console.log(message);

      // Optionally, post the message back to the main thread
      self.postMessage(message);
    }
  }, 250);
};
