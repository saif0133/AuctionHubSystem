// script.js

let userToken = null;

function toggleForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  loginForm.style.display =
    loginForm.style.display === "none" ? "block" : "none";
  signupForm.style.display =
    signupForm.style.display === "none" ? "block" : "none";

  toggleFlexDirection();
}

function toggleFlexDirection() {
  const container = document.querySelector(".container");
  container.classList.toggle("reverse");
}

function goHome() {
  window.location.href = "/test";
}

function verifyLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validate email and password
  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  // Create the data object to send
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
      console.log(response.status);
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || "Login failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);

      // Ask the user if they want to save the token in local storage
      const saveToken = confirm(
        "Do you want to save your session? This will keep you logged in even after closing the browser."
      );

      if (saveToken) {
        userToken = data.token;
        localStorage.setItem("authToken", data.token);
        console.log("Token saved in local storage.");
      } else {
        userToken = data.token;
        console.log(
          "Token not saved. Session will end when the browser is closed."
        );
      }

      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Wrong Email or Password");
    });
}

export default userToken;
