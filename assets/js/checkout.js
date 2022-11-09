const cartItems = JSON.parse(localStorage.getItem('itemCartData'))
function renderCartItem() {
  const cartItems = JSON.parse(localStorage.getItem('itemCartData'))
  let htmls = cartItems.map((cartItem) => {
    return `
        <div class="summary-box">
        <div class="box-img">
            <img src="${cartItem.url}" alt="">
            <span class="box-quantity">${cartItem.quantity}</span>
            <h3>${cartItem.name}</h3>
        </div>

        <div class="box-price">
            <p>${cartItem.price}.000₫</p>
        </div>
    </div>
          `;
  });
  var itemCartElement = document.querySelector("#summary-item");
  itemCartElement.innerHTML = htmls.join('');
};

renderCartItem();
total();
function total() {
  var dataLocal = getLocalStorage();
  var total = 0;
  for (let i = 0; i < dataLocal.length; i++) {
    var price = dataLocal[i].price * dataLocal[i].quantity;
    total = total + price;
  }
  document.querySelector(".cal-price").innerText = total + ".000₫";
  document.querySelector(".cal-total").innerText = total + 40 + ".000₫";
  return total;
}

const form = document.querySelector(".form-checkout");
const btnCheckout = document.querySelector(".btn-checkout")
const checkoutEmail = document.getElementById('email')
const checkoutName = document.getElementById("fullname")
const checkoutPhone = document.getElementById("phone")
const checkoutPlace = document.getElementById("place")
const checkoutNote = document.getElementById("note")

btnCheckout.addEventListener("click", () => {
  validate()
})

function sendData(sRate, count, emailVal, fullnameVal, phoneVal, placeVal, noteVal) {
  var totalCost = total()
  if (sRate === count) {
    var userData = getUserFromLocalStorage();
    var user = createUserCheckout(emailVal, fullnameVal, phoneVal, placeVal, noteVal, totalCost, cartItems);
    userData.push(user);
    setUserToLocalStorage(userData)

    localStorage.removeItem('itemCartData')
    swal("Mua hàng thành công");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } else {
    swal("Vui lòng điền đầy đủ thông tin");
  }
}


function successMsg(emailVal, fullnameVal, phoneVal, placeVal, noteVal) {
  let formCon = document.getElementsByClassName("form-control");
  var count = formCon.length - 1;
  for (let i = 0; i < formCon.length; i++) {
    if (formCon[i].className === "form-control success") {
      var sRate = 0 + i;
      sendData(sRate, count, emailVal, fullnameVal, phoneVal, placeVal, noteVal);
    } else {
      return false;
    }
  }
}


function isEmail(emailVal) {
  var emailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailVal.match(emailPattern)) return true;
  return false;
}

function isName(nameVal) {
  var namePattern = /^[a-zA-Z0-9]+$/;
  if (nameVal.match(namePattern)) return true;
  return false;
}

function validate() {
  const emailVal = checkoutEmail.value.trim();
  const fullnameVal = checkoutName.value.trim();
  const phoneVal = checkoutPhone.value.trim();
  const placeVal = checkoutPlace.value.trim();
  const noteVal = checkoutNote.value.trim();
  //   valdate email
  if (emailVal === "") {
    setErrorMsg(email, "Phần này không được để trống");
  } else if (!isEmail(emailVal)) {
    setErrorMsg(email, "Email không hợp lệ");
  } else {
    setSuccessMsg(email);
  }

  //   validate username
  if (fullnameVal === "") {
    setErrorMsg(fullname, "Phần này không được để trống");
  } else if (!isName(fullnameVal)) {
    setErrorMsg(fullname, "Tên không hợp lệ");
  } else {
    setSuccessMsg(fullname);
  }


  if (phoneVal === "") {
    setErrorMsg(phone, "Phần này không được để trống")
  } else if (phoneVal.length <= 8) {
    setErrorMsg(phone, "Vui lòng nhập đúng số điện thoại")
  } else {
    setSuccessMsg(phone)
  }

  if (placeVal === "") {
    setErrorMsg(place, "Phần này không được để trống");
  } else {
    setSuccessMsg(place);
  }

  if (noteVal === "") {
    setErrorMsg(note, "Phần này không được để trống");
  } else {
    setSuccessMsg(note);
  }

  successMsg(emailVal, fullnameVal, phoneVal, placeVal, noteVal)

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


function createUserCheckout(emailVal, namelVal, phoneVal, placeVal, noteVal, totalCost, productInCart) {
  var user = new Object();
  (user.id = uuidv4()),
    (user.email = emailVal),
    (user.name = namelVal),
    (user.phone = phoneVal),
    (user.place = placeVal),
    (user.note = noteVal),
    (user.totalCost = totalCost),
    (user.productInCart = productInCart)
  return user
}

var keyUser = "userCheckoutData";

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

