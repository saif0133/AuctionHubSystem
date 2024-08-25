let userToken = null;

/**
 * Toggles between the login and signup forms.
 */
function toggleForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (!loginForm || !signupForm) {
    console.error("Form elements not found");
    return;
  }

  loginForm.style.display =
    loginForm.style.display === "none" ? "block" : "none";
  signupForm.style.display =
    signupForm.style.display === "none" ? "block" : "none";

  toggleFlexDirection();
}

/**
 * Toggles the flex direction of the container element.
 */
function toggleFlexDirection() {
  const container = document.querySelector(".container");
  if (!container) {
    console.error("Container not found");
    return;
  }
  container.classList.toggle("reverse");
}

/**
 * Redirects the user to the home page.
 */
function goHome() {
  window.location.href = "/test";
}

/**
 * Removes the user token and clears it from local storage.
 */
function removeToken() {
  userToken = null;
  localStorage.removeItem("authToken");
}

/**
 * Handles user login by sending credentials to the server and saving the token.
 */
async function verifyLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  const data = { login: email, password: password };

  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("Content-Type");
    let responseData = {};

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      console.log("Unexpected response format:", text);

      // Assuming the response is a plain JWT token if not JSON
      responseData = { token: text };
    }

    if (!response.ok) {
      throw new Error(responseData.error || "Login failed");
    }

    const saveToken = confirm(
      "Do you want to save your session? This will keep you logged in even after closing the browser."
    );

    if (saveToken) {
      userToken = responseData.token;
      localStorage.setItem("authToken", responseData.token);
      console.log("Token saved in local storage.");
    } else {
      localStorage.setItem("authToken", responseData.token);
      userToken = responseData.token;
      console.log("Token not saved. Session will end when the browser closes.");
    }

    console.log("Token value:", userToken);
    window.location.href = "/";
  } catch (error) {
    console.error("Error:", error);
    alert(`Error: ${error.message}`);
  }
}
/*
// Load token from local storage if available
const currentToken = localStorage.getItem("authToken");
if (currentToken) {
  userToken = currentToken;
  console.log("Token loaded from local storage.");
}
*/