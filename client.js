(function () {
  function initializeSignin() {
    var signinElements = document.querySelectorAll(".neynar_signin");
    // signinElements.forEach(function (signinElements) {

    // });
    var clientId = signinElements.getAttribute("data-client_id");
    var loginUri = signinElements.getAttribute("data-login_uri");
    var neynarLoginUrl = signinElements.getAttribute("data-neynar_login_url");

    if (!clientId || !neynarLoginUrl) {
      console.error("Neynar Signin: Missing required data attributes");
      return;
    }

    signinElements.addEventListener("click", function () {
      // Construct the URL for the authentication request
      var authUrl = new URL(neynarLoginUrl);
      authUrl.searchParams.append("client_id", clientId);
      authUrl.searchParams.append("redirect_uri", loginUri);

      // Open the authentication URL
      window.open(authUrl.toString(), "_blank");
    });

    // Apply basic styles to the element
    signinElements.style.cursor = "pointer";
    signinElements.style.padding = "10px 15px";
    signinElements.style.border = "1px solid #ccc";
    signinElements.style.borderRadius = "4px";
    signinElements.style.backgroundColor = "#fff";
    signinElements.style.color = "#000";
    signinElements.style.textAlign = "center";
    signinElements.style.display = "inline-block";
    signinElements.style.fontSize = "16px";
  }

  // Wait for the DOM to be fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSignin);
  } else {
    initializeSignin();
  }
})();
