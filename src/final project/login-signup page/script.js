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
      localStorage.setItem("authToken", data.token);

      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Wrong Email or Password");
    });
}
