(function () {

  var authWindow;

  function handleMessage(event, authOrigin, successCallback) {
    if (event.origin === authOrigin && event.data.is_authenticated) {

      if (typeof window[successCallback] === "function") {
        window[successCallback](event.data); // Call the global callback function
      }

      if (authWindow) {
        authWindow.close();
      }

      window.removeEventListener("message", handleMessage);
    }
  }

  function handleSignIn(neynarLoginUrl, clientId, redirectUri, successCallback) {
    var authUrl = new URL(neynarLoginUrl);
    authUrl.searchParams.append("client_id", clientId);
    if (redirectUri) {
      authUrl.searchParams.append("redirect_uri", redirectUri);
    }

    var authOrigin = new URL(neynarLoginUrl).origin;
    authWindow = window.open(authUrl.toString(), "_blank");
    window.addEventListener(
      "message",
      function (event) {
        handleMessage(event, authOrigin, successCallback);
      },
      false
    );
  }

   function createSignInButton(element) {
     var clientId = element.getAttribute("data-client_id");
     var neynarLoginUrl = element.getAttribute("data-neynar_login_url");
     var redirectUri = element.getAttribute("data-redirect_uri");
     var successCallback = element.getAttribute("data-success-callback");

     if (!clientId || !neynarLoginUrl) {
       console.error("Neynar Signin: Missing required data attributes");
       return;
     }

     // Check if the button already exists
     var existingButton = element.querySelector("button");
     if (existingButton) {
       return; // If button exists, do not create a new one
     }

     var button = document.createElement("button");
     button.textContent = "Sign In with Neynar";
     button.onclick = function () {
       handleSignIn(neynarLoginUrl, clientId, redirectUri, successCallback);
     };

     // Apply basic styles to the button
     button.style.padding = "10px 15px";
     button.style.border = "1px solid #ccc";
     button.style.borderRadius = "4px";
     button.style.backgroundColor = "#fff";
     button.style.color = "#000";
     button.style.cursor = "pointer";
     button.style.fontSize = "16px";

     element.appendChild(button);
   }

  function init() {
    var signinElements = document.querySelectorAll(".neynar_signin");
    signinElements.forEach(createSignInButton);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
