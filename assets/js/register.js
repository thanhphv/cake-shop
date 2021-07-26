// registration
const formRegister = document.getElementById("form-register");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

formRegister.addEventListener("submit", function (event) {
  event.preventDefault();
  validate();
});

function sendData(usernameVal, sRate, count, emailVal, passwordVal) {
  if (sRate === count) {
    var userData = getUserFromLocalStorage();
    var isExist = false;
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].name === usernameVal || userData[i].email === emailVal) {
        swal("Tài khoản đã tồn tại");
        isExist = true;
      }
    }
    if (isExist == false) {
      var user = createUser(usernameVal, emailVal, passwordVal);
      userData.push(user);

      setUserToLocalStorage(userData);
      swal("Welcome " + usernameVal, "Đăng ký thành công");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    }
  }
}

function successMsg(usernameVal, emailVal, passwordVal) {
  let formCon = document.getElementsByClassName("form-control");
  var count = formCon.length - 1;
  for (let i = 0; i < formCon.length; i++) {
    if (formCon[i].className === "form-control success") {
      var sRate = 0 + i;
      sendData(usernameVal, sRate, count, emailVal, passwordVal);
    } else {
      return false;
    }
  }
}

// email validate

function isEmail(emailVal) {
  var emailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailVal.match(emailPattern)) return true;
  return false;
}

function isUserName(usernameVal) {
  var usernamePattern = /^[a-zA-Z0-9]+$/;
  if (usernameVal.match(usernamePattern)) return true;
  return false;
}

function validate() {
  const usernameVal = username.value.trim();
  const emailVal = email.value.trim();
  const passwordVal = password.value.trim();
  const cpasswordVal = cpassword.value.trim();

  //   validate username
  if (usernameVal === "") {
    setErrorMsg(username, "Phần này không được để trống");
  } else if (!isUserName(usernameVal)) {
    setErrorMsg(username, "Tên đăng ký không hợp lệ");
  } else {
    setSuccessMsg(username);
  }
  //   valdate email
  if (emailVal === "") {
    setErrorMsg(email, "Phần này không được để trống");
  } else if (!isEmail(emailVal)) {
    setErrorMsg(email, "Email không hợp lệ");
  } else {
    setSuccessMsg(email);
  }
  // validat password
  if (passwordVal === "") {
    setErrorMsg(password, "Phần này không được để trống");
  } else if (passwordVal.length <= 5) {
    setErrorMsg(password, "Mật khẩu dài tối thiểu 6 ký tự");
  } else {
    setSuccessMsg(password);
  }
  // validat cpassword
  if (cpasswordVal === "") {
    setErrorMsg(cpassword, "Phần này không được để trống");
  } else if (passwordVal !== cpasswordVal) {
    setErrorMsg(cpassword, "Mật khẩu không đúng");
  } else {
    setSuccessMsg(cpassword);
  }
  successMsg(usernameVal, emailVal, passwordVal);
}

function setErrorMsg(input, errormsg) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.textContent = errormsg;
}

function setSuccessMsg(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function createUser(usernameVal, emailVal, passwordVal) {
  var user = new Object();
  (user.id = uuidv4()),
    (user.name = usernameVal),
    (user.email = emailVal),
    (user.password = passwordVal),
    (user.logined = false);
  return user;
}
var keyUser = "userData";

function getUserFromLocalStorage() {
  var userData = new Array();
  var jsonUserData = localStorage.getItem(keyUser);
  if (jsonUserData != null) {
    userData = JSON.parse(jsonUserData);
  }
  return userData;
}

function setUserToLocalStorage(userData) {
  var jsonUser = JSON.stringify(userData);
  localStorage.setItem(keyUser, jsonUser);
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
