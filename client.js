(function () {
  var clientId = "YOUR_CLIENT_ID"; // Replace with your actual client ID
  var redirectUri = "YOUR_REDIRECT_URI"; // Replace with your actual redirect URI
  var neynarLoginUrl = "YOUR_NEYNAR_LOGIN_URL"; // Replace with your actual Neynar login URL
  var authWindow;

  // Check for required configuration
  if (!clientId || !redirectUri || !neynarLoginUrl) {
    console.error("Signin Button: Missing configuration");
    return;
  }

  // Function to handle the message from the authentication window
  function handleMessage(event) {
    var authOrigin = new URL(neynarLoginUrl).origin;
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
  function handleSignIn() {
    var authUrl = new URL(neynarLoginUrl);
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authWindow = window.open(authUrl.toString(), "_blank");
    window.addEventListener("message", handleMessage, false);
  }

  // Function to create the sign-in button
  function createSignInButton() {
    var button = document.createElement("button");
    button.textContent = "Sign In with Neynar";
    button.onclick = handleSignIn;

    // Apply basic styles to the button
    button.style.padding = "10px 15px";
    button.style.border = "1px solid #ccc";
    button.style.borderRadius = "4px";
    button.style.backgroundColor = "#fff";
    button.style.color = "#000";
    button.style.cursor = "pointer";
    button.style.fontSize = "16px";

    document.body.appendChild(button);
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
