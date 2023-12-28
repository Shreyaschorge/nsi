(function () {
  // Function to send a message to the React Native WebView
  function sendMessageToReactNative(message) {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(message);
    } else {
      console.error("ReactNativeWebView is not defined.");
    }
  }

  // Function to create a button and append it to the container
  function createButton() {
    var container = document.getElementById("neynar-container");
    if (!container) {
      console.error("The container element is not found.");
      return;
    }

    var button = document.createElement("button");
    button.innerHTML = "Sign In with Neynar";
    button.onclick = function () {
      // Send a message to the React Native app to open the WebView for login
      sendMessageToReactNative("openLogin");
    };

    container.appendChild(button);
  }

  // Call the createButton function when the script loads
  createButton();
})();
