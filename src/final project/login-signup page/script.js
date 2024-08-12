// script.js
export let userToken = null;

export function toggleForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  loginForm.style.display =
    loginForm.style.display === "none" ? "block" : "none";
  signupForm.style.display =
    signupForm.style.display === "none" ? "block" : "none";

  toggleFlexDirection();
}

export function toggleFlexDirection() {
  const container = document.querySelector(".container");
  container.classList.toggle("reverse");
}

export function goHome() {
  window.location.href = "/test";
}

export function removeToken() {
  userToken = null;
}

export function verifyLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  const data = {
    email: email,
    password: password,
  };

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || "Login failed");
        });
      }

      return response.json();
    })
    .then((data) => {
      const saveToken = confirm(
        "Do you want to save your session? This will keep you logged in even after closing the browser."
      );

      if (saveToken) {
        userToken = data.token;
        localStorage.setItem("authToken", data.token);
        console.log("Token saved in local storage.");
      } else {
        localStorage.setItem("authToken", data.token);
        userToken = data.token;
        console.log(
          "Token not saved. Session will end when the browser is closed."
        );
      }

      console.log("Token value:", userToken);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Wrong Email or Password");
    });
}

export default {
  userToken,
  toggleForms,
  toggleFlexDirection,
  goHome,
  removeToken,
  verifyLogin,
};
