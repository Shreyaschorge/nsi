(function () {
  function initializeSignin() {
    var signinElements = document.querySelectorAll(".neynar_signin");
    signinElements.forEach(function (elem) {
      var clientId = elem.getAttribute("data-client_id");
      var loginUri = elem.getAttribute("data-login_uri");
      var neynarLoginUrl = elem.getAttribute("data-neynar_login_url");

      if (!clientId || !loginUri || !neynarLoginUrl) {
        console.error("Neynar Signin: Missing required data attributes");
        return;
      }

      elem.addEventListener("click", function () {
        // Construct the URL for the authentication request
        var authUrl = new URL(neynarLoginUrl);
        authUrl.searchParams.append("client_id", clientId);
        authUrl.searchParams.append("redirect_uri", loginUri);

        // Open the authentication URL
        window.open(authUrl.toString(), "_blank");
      });

      // Apply basic styles to the element
      elem.style.cursor = "pointer";
      elem.style.padding = "10px 15px";
      elem.style.border = "1px solid #ccc";
      elem.style.borderRadius = "4px";
      elem.style.backgroundColor = "#fff";
      elem.style.color = "#000";
      elem.style.textAlign = "center";
      elem.style.display = "inline-block";
      elem.style.fontSize = "16px";
    });
  }

  // Wait for the DOM to be fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSignin);
  } else {
    initializeSignin();
  }
})();
