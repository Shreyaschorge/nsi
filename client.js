(function () {
  var authWindow;

  // Function to handle the message from the authentication window
  function handleMessage(event, authOrigin, callback) {
    if (event.origin === authOrigin && event.data.is_authenticated) {
      // Process the authentication data
      console.log("Authenticated:", event.data);

      // Store authentication data in localStorage or handle it as needed
      window.localStorage.setItem("user", JSON.stringify(event.data));

      // Execute callback if provided
      if (typeof callback === "function") {
        callback();
      }

      // Close the authentication window
      if (authWindow) {
        authWindow.close();
      }
    }
  }

  // Function to handle the sign-in process
  function handleSignIn(neynarLoginUrl, clientId, redirectUri, callback) {
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
        handleMessage(event, authOrigin, callback);
      },
      false
    );
  }

  // Function to create the sign-in button
  function createSignInButton(element) {
    var clientId = element.getAttribute("data-client_id");
    var neynarLoginUrl = element.getAttribute("data-neynar_login_url");
    var redirectUri = element.getAttribute("data-redirect_uri"); // Optional

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
      handleSignIn(neynarLoginUrl, clientId, redirectUri, function () {
        // Callback after successful authentication
        // You can add additional logic here if needed
      });
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

  // Initialize the sign-in button when the DOM is fully loaded
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
