(function () {
  // Function to handle the message from the authentication window
  function handleMessage(event, authOrigin) {
    if (event.origin === authOrigin && event.data.is_authenticated) {
      // Process the authentication data
      console.log("Authenticated:", event.data);

      window.localStorage.setItem("user", JSON.stringify(event.data));

      // Remove the event listener
      window.removeEventListener("message", handleMessage);

      // Close the authentication window
      if (authWindow) {
        authWindow.close();
      }
    }
  }

  // Function to handle the sign-in process
  function handleSignIn(neynarLoginUrl, clientId, redirectUri) {
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
        handleMessage(event, authOrigin);
      },
      false
    );
  }

  // Function to create the sign-in button
  function createSignInButton() {
    var signinElements = document.querySelectorAll(".neynar_signin");
    signinElements.forEach(function (elem) {
      // Check if the button already exists
      if (elem.querySelector("button")) {
        return; // If button exists, skip to the next element
      }

      var clientId = elem.getAttribute("data-client_id");
      var neynarLoginUrl = elem.getAttribute("data-neynar_login_url");
      var redirectUri = elem.getAttribute("data-redirect_uri"); // Optional

      if (!clientId || !neynarLoginUrl) {
        console.error("Neynar Signin: Missing required data attributes");
        return;
      }

      var button = document.createElement("button");
      button.textContent = "Sign In with Neynar";
      button.onclick = function () {
        handleSignIn(neynarLoginUrl, clientId, redirectUri);
      };

      // Apply basic styles to the button
      button.style.padding = "10px 15px";
      button.style.border = "1px solid #ccc";
      button.style.borderRadius = "4px";
      button.style.backgroundColor = "#fff";
      button.style.color = "#000";
      button.style.cursor = "pointer";
      button.style.fontSize = "16px";

      elem.appendChild(button);
    });
  }

  // Initialize the sign-in button when the DOM is fully loaded
  function init() {
    createSignInButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
