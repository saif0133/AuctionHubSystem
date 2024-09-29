let userToken = null;
const errortext=document.getElementById("error-signin");
const errorcontainer=document.getElementById("err");
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
 * Toggles the flex direction of the container 
 */
function toggleFlexDirection() {
  const container = document.querySelector(".container");
  if (!container) {
    console.error("Container not found");
    return;
  }
  container.classList.toggle("reverse");
}





//--------------------------------------------------------------------------------------------------





const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
const toggleImage = togglePassword.querySelector("img");

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

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
    const type2 = password2.getAttribute("type") === "password" ? "text" : "password";
    password2.setAttribute("type", type2);

    if (type2 === "password") {
        toggleImage2.src = "https://github.com/saif0133/deploy-sec/blob/main/imgs/show%20pass.png?raw=true";
        toggleImage2.alt = "Show Password";
    } else {
        toggleImage2.src = "https://github.com/saif0133/deploy-sec/blob/main/imgs/hide%20pass.png?raw=true";
        toggleImage2.alt = "Hide Password";
    }
});

/*
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


*/








function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}


function submitEmail() {
  const email = document.getElementById('emailk').value;
  if (email) {
   // resetPassword();
   postData(email);
   localStorage.setItem("PasswordCounter","A");
    
  } else {
    alert('Please enter a valid email address.');
  }
}




const postData = async (email2) => {
  event.preventDefault();

  const url = `http://localhost:8080/forgot-password-request?email=${email2}`; // Replace with your API endpoint
console.log(url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
      //  'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.text();
    console.log('Response:', result);
    alert("Reset Password email was sent successfully!");
    
  } catch (error) {
    alert("User not found, Please make sure of your email");
    console.error('Error:', error);
  }
};




function validateField(inputElement, errorBoxElement, validationFn) {
  inputElement.addEventListener('blur', () => {
    if (!validationFn(inputElement.value)) {
      errorBoxElement.classList.add('show');
    } else {
      errorBoxElement.classList.remove('show');
    }
  });

  inputElement.addEventListener('focus', () => {
    errorBoxElement.classList.remove('show');
  });

  inputElement.addEventListener('input', () => {
    if (!validationFn(inputElement.value)) {
      errorBoxElement.classList.add('show');
    } else {
      errorBoxElement.classList.remove('show');
    }
  });
}

const validateName = value => value.trim() !== '';
const validateEmail = value => /.+@.+\..+/.test(value);
const validatePassword = value => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.,#@]).{10,}$/.test(value);

document.addEventListener('DOMContentLoaded', () => {
  const firstNameInput = document.getElementById('firstNameL');
  const firstNameError = document.getElementById('firstNameLError');
  validateField(firstNameInput, firstNameError, validateName);

  const lastNameInput = document.getElementById('lastNameL');
  const lastNameError = document.getElementById('lastNameLError');
  validateField(lastNameInput, lastNameError, validateName);

  const emailInput = document.getElementById('emailL');
  const emailError = document.getElementById('emailLError');
  validateField(emailInput, emailError, validateEmail);

  const emailInput1 = document.getElementById('email');
  const emailError1 = document.getElementById('emailLError-log');
  validateField(emailInput1, emailError1, validateEmail);

  const passwordInput = document.getElementById('password2');
  const passwordError = document.getElementById('password2LError');
  validateField(passwordInput, passwordError, validatePassword);
});

async function CreateAccount(event) {
  event.preventDefault();

  const loadingPopup = document.getElementById('loadingPopup');
  if (loadingPopup) {
    loadingPopup.style.display = 'flex';
  }

  const CreateFirstName = document.getElementById('firstNameL').value;
  const CreateLastName = document.getElementById('lastNameL').value;
  const CreateEmail = document.getElementById('emailL').value;
  const CreatePass = document.getElementById('password2').value;
  const firstLetter = CreateFirstName ? CreateFirstName.charAt(0).toUpperCase() : 'U';

  if (!CreateFirstName || !CreateLastName || !CreateEmail || !CreatePass) {
    alert('Please fill in all fields.');
    return;
  }

  const data = {
    firstName: CreateFirstName,
    lastName: CreateLastName,
    email: CreateEmail,
    password: CreatePass,
    image: {
      name: 'img',
      type: 'png',
      imageUrl: `https://via.placeholder.com/40?text=${firstLetter}`
    }
  };

  try {
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get('Content-Type');
    let responseData = {};

    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      console.log('Unexpected response format:', text);
    }

    if (!response.ok) {
      throw new Error(responseData.error || responseData.message);
    }
  
    alert('Please check your email');
    window.location.reload();
  } catch (error) {
    console.error('Error:', error);
    alert(`Error: ${error.message}`);
  } finally {
    if (loadingPopup) {
      loadingPopup.style.display = 'none';
    }
  }
}






async function verifyLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const validateEmail = value => /.+@.+\..+/.test(value);

  if (!validateEmail(email)) {
    setTimeout(() => {
      errorcontainer.style.display = "flex";
    }, 500); 
 errortext.innerText="Please enter valid Email";
 return;
   }



  errorcontainer.style.display = "none";
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

      responseData = { token: text };
    }

    if (!response.ok) {
      if(responseData.message== "Invalid credentials" )
      {
        setTimeout(() => {
          errorcontainer.style.display = "flex";
        }, 500); 
     errortext.innerText="Invalid Email or Password";
       }
   else
   {
    errorcontainer.style.display = "flex";
   errortext.innerText=responseData.message;
}
   throw new Error(responseData.error || responseData.message);
    }
    localStorage.setItem("authToken", responseData.token);

    window.location.href = "/";
  } catch (error) {
    console.error("Error:", error);
   // alert(`Error: ${error.message}`);
  }
}


document.getElementById("password").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      verifyLogin();
  }
});