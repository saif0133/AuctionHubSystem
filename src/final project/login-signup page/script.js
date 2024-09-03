let userToken = null;
const errortext=document.getElementById("error-signin");
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


//--------------------------------------------------------------------------------------------------


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
     errortext.innerText=responseData.message;
       throw new Error(responseData.error || responseData.message);
   
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


document.getElementById("password").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      verifyLogin();
  }
});


const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
const toggleImage = togglePassword.querySelector("img");

togglePassword.addEventListener("click", function () {
    // Toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // Change the image source and alt text based on the type
    if (type === "password") {
        toggleImage.src = "https://github.com/saif0133/deploy-sec/blob/main/imgs/show%20pass.png?raw=true";
        toggleImage.alt = "Show Password";
    } else {
        toggleImage.src = "https://github.com/saif0133/deploy-sec/blob/main/imgs/hide%20pass.png?raw=true";
        toggleImage.alt = "Hide Password";
    }
});



const togglePassword2 = document.querySelector("#togglePassword2");
const password2 = document.querySelector("#password2");
const toggleImage2 = togglePassword2.querySelector("img");

togglePassword2.addEventListener("click", function () {
    // Toggle the type attribute
    const type2 = password2.getAttribute("type") === "password" ? "text" : "password";
    password2.setAttribute("type", type2);

    // Change the image source and alt text based on the type
    if (type2 === "password") {
        toggleImage2.src = "https://github.com/saif0133/deploy-sec/blob/main/imgs/show%20pass.png?raw=true";
        toggleImage2.alt = "Show Password";
    } else {
        toggleImage2.src = "https://github.com/saif0133/deploy-sec/blob/main/imgs/hide%20pass.png?raw=true";
        toggleImage2.alt = "Hide Password";
    }
});


const togglePassword3 = document.querySelector("#togglePassword3");
const password3 = document.querySelector("#password3");
const toggleImage3 = togglePassword3.querySelector("img");

togglePassword3.addEventListener("click", function () {
    // Toggle the type attribute
    const type3 = password3.getAttribute("type") === "password" ? "text" : "password";
    password3.setAttribute("type", type3);

    // Change the image source and alt text based on the type
    if (type3 === "password") {
        toggleImage3.src = "https://github.com/saif0133/deploy-sec/blob/main/imgs/show%20pass.png?raw=true";
        toggleImage3.alt = "Show Password";
    } else {
        toggleImage3.src = "https://github.com/saif0133/deploy-sec/blob/main/imgs/hide%20pass.png?raw=true";
        toggleImage3.alt = "Hide Password";
    }
});
