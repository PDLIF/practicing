import "./style.css";

const form = document.querySelector(".form");
const emailInput = document.getElementById("email");

const countryInput = document.getElementById("country");
const zipCodeInput = document.getElementById("zip-code");

const passwordInput = document.getElementById("password");
const passwordConfirmationInput = document.getElementById("password-conf");

// Utility functions

const setValid = (inputField) => {
  inputField.removeAttribute("invalid");
  inputField.setAttribute("valid", "");
};

const setInvalid = (inputField) => {
  inputField.removeAttribute("valid");
  inputField.setAttribute("invalid", "");
};

// validating email

const isValidEmail = () => {
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  const validity = emailInput.value !== 0 && emailRegExp.test(emailInput.value);
  return validity;
};

const updateError = (isValid) => {
  if (isValid) {
    emailInput.setCustomValidity("");
    setValid(emailInput);
  } else {
    emailInput.setCustomValidity("The email is invalid");
    setInvalid(emailInput);
  }
};

const checkEmail = () => {
  const validity = isValidEmail();
  updateError(validity);
  // emailInput.reportValidity();
};

// validating a zip code

const zipCodeConstraints = {
  us: [
    /^\d{5}(-\d{4})?$/,
    "US ZIP code must be 5 digits (e.g., 12345) or 9 digits with a hyphen (e.g., 12345-6789).",
  ],
  sw: [/^\d{4}$/, "Swiss ZIP code must be exactly 4 digits (e.g., 8000)."],
  de: [/^\d{5}$/, "German ZIP code must be exactly 5 digits (e.g., 10115)"],
  nl: [
    /^\d{4} ?[A-Z]{2}$/,
    "Dutch ZIP code must be 4 digits followed by 2 uppercase letters (e.g., 1234 AB).",
  ],
};

const checkZipCode = () => {
  const country = countryInput.value;
  const zipCode = zipCodeInput.value;
  const regExp = zipCodeConstraints[country][0];

  if (regExp.test(zipCode)) {
    zipCodeInput.setCustomValidity("");
    setValid(zipCodeInput);
  } else {
    zipCodeInput.setCustomValidity(zipCodeConstraints[country][1]);
    setInvalid(zipCodeInput);
  }
};

// validating password

const checkPassword = () => {
  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (passwordRegExp.test(passwordInput.value) && passwordInput.value !== "") {
    setValid(passwordInput);
    passwordInput.setCustomValidity("");
    passwordConfirmationInput.removeAttribute("disabled");
  } else {
    setInvalid(passwordInput);
    passwordInput.setCustomValidity(
      "Password should be at least 8 characters, 1 letter, 1 number, 1 special character",
    );
    passwordConfirmationInput.setAttribute("disabled", "");
  }
};

// validating passwords matching

const checkPasswordConfirmation = () => {
  if (passwordInput.value === passwordConfirmationInput.value) {
    passwordConfirmationInput.setCustomValidity("");
    setValid(passwordConfirmationInput);
  } else {
    passwordConfirmationInput.setCustomValidity("Password doesn't match");
    setInvalid(passwordConfirmationInput);
  }
};

const isPasswordConfirmationAvailiable = () => {
  if (passwordInput.validity.valid) {
    passwordConfirmationInput.removeAttribute("disabled");
  } else {
    passwordConfirmationInput.setAttribute("disabled", "");
  }
};

const checkPasswordsMatch = () => {
  checkPasswordConfirmation();
  isPasswordConfirmationAvailiable();
};

// Handling the form submission

const checkFormValidity = () => {
  const inputFields = form.getElementsByTagName("input");
  const isValidForm = [...inputFields].every((input) => input.validity.valid);

  if (isValidForm) {
    alert("High five! 👍 Your form is all good!");
  } else {
    alert("Please fix the errors before submitting.");
  }
};

const checkAllInputs = () => {
  checkEmail();
  checkZipCode();
  checkPassword();
  checkPasswordsMatch();
};

// Event listeners

window.onload = () => {
  isPasswordConfirmationAvailiable();
  emailInput.oninput = checkEmail;
  // countryInput.onchange = checkZipCode;
  zipCodeInput.oninput = checkZipCode;
  passwordInput.oninput = checkPassword;
  // passwordInput.oninput = isPasswordConfirmationAvailiable;
  passwordConfirmationInput.oninput = checkPasswordsMatch;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkAllInputs();
  checkFormValidity(); // Check form validity before submitting
});
