(function () {
  if (window.ReactNativeWebView) {
    // Send a message to React Native to render the button
    window.ReactNativeWebView.postMessage("renderButton");
  }
})();
