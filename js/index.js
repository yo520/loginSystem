var LoginEinput = document.getElementById("LoginEinput");
var LoginPinput = document.getElementById("LoginPinput");
var loginBtn = document.getElementById("loginBtn");
var SignNinput = document.getElementById("SignNinput");
var SignEinput = document.getElementById("SignEinput");
var SignPinput = document.getElementById("SignPinput");
var signInBtn = document.getElementById("signInBtn");
var welcomID = document.getElementById("welcomID");
var successMasg = document.getElementById("successMasg");
var warringMasg = document.getElementById("warringMasg");
var AccError = document.getElementById("AccError");
var helloSec = document.getElementById("helloSec");
var LoginSec = document.getElementById("LoginSec");
var signupSec = document.getElementById("signupSec");
var logoutBtn = document.getElementById("logoutBtn");
var signUpLink = document.getElementById("signupLink");
var signInLink = document.getElementById("signinLink");
var accunts = [];
var userData;

if (localStorage.getItem("acc") != null) {
  accunts = JSON.parse(localStorage.getItem("acc"));
}

signInBtn.addEventListener("click", addAcc);
loginBtn.addEventListener("click", chickAcc);
logoutBtn.addEventListener("click", logout);
signUpLink.addEventListener("click", signUp);
signInLink.addEventListener("click", signIn);


function addAcc() {
  if (!SignNinput.value || !SignEinput.value || !SignPinput.value) {
    warringMasg.textContent = "all filds are impty";
    warringMasg.classList.remove("d-none");
    return;
  }
  if (SignNinput.value.trim().length < 3) {
    warringMasg.textContent = "Username must be at least 3 characters long.";
    warringMasg.classList.remove("d-none");
    successMasg.classList.add("d-none");
    return;
  }
  if (!validateEmail(SignEinput.value)) {
    warringMasg.textContent = "Please enter a valid email address.";
    warringMasg.classList.remove("d-none");
    successMasg.classList.add("d-none");
    return;
  }
  if (SignPinput.value.trim().length < 6) {
    warringMasg.textContent = "Password must be at least 6 characters long.";
    warringMasg.classList.remove("d-none");
    successMasg.classList.add("d-none");
    return;
  }

  userData = {
    userName: SignNinput.value.trim(),
    userEmail: SignEinput.value.trim(),
    userpass: SignPinput.value,
  };

  accunts.push(userData);
  localStorage.setItem("acc", JSON.stringify(accunts));

  clearSignup();
  warringMasg.classList.add("d-none");
  successMasg.textContent = "Account created successfully! Please login.";
  successMasg.classList.remove("d-none");
  signIn();
}
// function addAcc() {
//   if (!SignNinput.value || !SignEinput.value || !SignPinput.value) {
//     warringMasg.classList.remove("d-none");

//     return;
//   }
//   else {
//     userData = {
//       userName: SignNinput.value,
//       userEmail: SignEinput.value,
//       userpass: SignPinput.value
//     }
//     accunts.push(userData);
//     localStorage.setItem("acc", JSON.stringify(accunts));


//     clearSignup();
//     successMasg.classList.remove("d-none");
//     warringMasg.classList.add("d-none");
//   }

// }
function chickAcc() {
  var foundedacc;
  for (var i = 0; i < accunts.length; i++) {
    if (LoginEinput.value == accunts[i].userEmail && LoginPinput.value == accunts[i].userpass) {
      foundedacc = accunts[i];
      hello(i);
    }
  }
  if (foundedacc == null) {
    AccError.classList.remove("d-none");
    return;
  }

  AccError.classList.add("d-none");
  helloSec.classList.remove("d-none");
  LoginSec.classList.add("d-none");
  clearLogin();
}
function hello(index) {
  welcomID.innerHTML = "Hello " + accunts[index].userName;

}
function signUp() {
  LoginSec.classList.add("d-none");
  signupSec.classList.remove("d-none");
}
function signIn() {
  LoginSec.classList.remove("d-none");
  signupSec.classList.add("d-none");
}
function logout() {
  helloSec.classList.add("d-none");
  LoginSec.classList.remove("d-none");
}
function clearSignup() {
  SignNinput.value = "";
  SignEinput.value = "";
  SignPinput.value = "";
}
function clearLogin() {
  LoginEinput.value = "";
  LoginPinput.value = "";
}
function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}