const formLogin = document.getElementById("form-login");
const username = document.getElementById("username");
const password = document.getElementById("password");


formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  loginForm();
});

function loginForm() {
  const usernameVal = username.value.trim();
  const passwordVal = password.value.trim();
  const userData = getUserFromLocalStorage();
  const userLoginedArr = []
  let checkUser = userData.find(x => x.name === usernameVal)
  let checkPassword = userData.find(x => x.password === passwordVal)
  if (checkUser && checkPassword) {
    var userLogined = createUserLogined(usernameVal)
    if (userLoginedArr != null) {
      userLoginedArr.push(userLogined)
    } else {
      userLoginedArr.fill(userLogined)
    }
    localStorage.setItem('userLoginedData', JSON.stringify(userLoginedArr))
    swal("Đăng nhập thành công");
    setTimeout(() => {
      window.location.href = "index.html"
    }, 2000);
  } else {
    swal("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin");
  }
}


function getUserFromLocalStorage() {
  var userData = new Array();
  var jsonUserData = localStorage.getItem('userData');
  if (jsonUserData != null) {
    userData = JSON.parse(jsonUserData);
  }
  return userData;
}

function createUserLogined(usernameVal, isLogined) {
  var userLogined = new Object();
  (userLogined.name = usernameVal),
    (userLogined.isLogined = true);
  return userLogined;
}