(function () {
  var clientId = "YOUR_CLIENT_ID";
  var redirectUri = "YOUR_REDIRECT_URI";
  var neynarLoginUrl = "YOUR_NEYNAR_LOGIN_URL";
  var authWindow;

  if (!clientId || !redirectUri || !neynarLoginUrl) {
    console.error("Signin Button: Missing configuration");
    return;
  }

  function handleMessage(event) {
    var authOrigin = new URL(neynarLoginUrl).origin;
    if (event.origin === authOrigin && event.data.is_authenticated) {
      // Process the authentication data
      console.log("Authenticated:", event.data);

      window.localStorage.setItem("user", JSON.stringify(event.data));

      // Remove the event listener
      window.removeEventListener("message");

      // Close the authentication window
      if (authWindow) {
        authWindow.close();
      }
    }
  }

  function handleSignIn() {
    var authUrl = new URL(neynarLoginUrl);
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authWindow = window.open(authUrl.toString(), "_blank");
    window.addEventListener("message", handleMessage, false);
  }

  function createSignInButton() {
    var button = document.createElement("button");
    button.textContent = "Sign In with Neynar";
    button.onclick = handleSignIn;
    // ... [style and append the button as in previous example] ...
  }

  function init() {
    createSignInButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
