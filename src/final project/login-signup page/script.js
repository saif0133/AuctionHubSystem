function toggleForms() {
  var loginForm = document.getElementById("loginForm");
  var signupForm = document.getElementById("signupForm");

  loginForm.style.display =
    loginForm.style.display === "none" ? "block" : "none";
  signupForm.style.display =
    signupForm.style.display === "none" ? "block" : "none";

  toggleFlexDirection();
}

function toggleFlexDirection() {
  var container = document.querySelector(".container");
  container.classList.toggle("reverse");
}

function goHome() {
  window.location.href = "/test";
}
