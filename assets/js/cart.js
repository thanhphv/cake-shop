var productData = [];
function addToCart(id, name, url, price) {
  alert("Đã thêm sản phẩm vào giỏ hàng");
  var itemCartData = getLocalStorage();
  var isExist = false;
  for (let i = 0; i < itemCartData.length; i++) {
    itemReal = itemCartData[i];
    if (itemReal.id == id) {
      itemCartData[i].quantity++;
      isExist = true;
    }
  }
  if (isExist == false) {
    var itemCart = createItemCart(id, name, url, price, 1);
    itemCartData.push(itemCart);
  }
  setLocalStorage(itemCartData);
  numberOfCart();
}

var keyData = "itemCartData";

function createItemCart(id, name, url, price, quantity) {
  var itemCart = new Object();
  (itemCart.id = id), (itemCart.name = name), (itemCart.url = url), (itemCart.price = price), (itemCart.quantity = quantity);
  return itemCart;
}

function getLocalStorage() {
  var itemCartData = new Array();
  var jsonItemCartData = localStorage.getItem(keyData);
  if (jsonItemCartData != null) {
    itemCartData = JSON.parse(jsonItemCartData);
  }
  return itemCartData;
}

function setLocalStorage(itemCartData) {
  var jsonData = JSON.stringify(itemCartData);
  localStorage.setItem(keyData, jsonData);
}

// render cart
renderCart();

function renderCart() {
  const productAPI2 = "https://food-server-db.herokuapp.com/db";
  fetch(productAPI2)
    .then(function (response) {
      return response.json();
    })
    .then(function (products) {
      var productData = [
        ...products.tea,
        ...products.cream,
        ...products.coffe,
        ...products.cake,
        ...products.drink,
      ];
      var dataLocal = getLocalStorage();
      var htmls = "";
      dataLocal.forEach((x, index) => {
        var item = productData.find((c) => String(c.id) === String(x.id));
        var html = `
          <div class="item-cart" id-product = ${item.id} price-product="${item.price
          }" quantity-product="${x.quantity}">
              <div style="width: 18%">
                  <div class="image">
                      <img src="${item.url}" alt="">
                  </div>
              </div>
              <div style="width: 32%" class="product-name">
                  <h3>${item.name}</h3>
              </div>
              <div style="width: 17%" class="product-price">${item.price
          }.000₫</div>
              <div style="width: 14%" class="product-quantity">
                  <input class="input-quantity" type="number" value="${x.quantity
          }">
              </div>
              <div style="width: 14%" class="product-price-total">${item.price * x.quantity
          }.000₫</div>
              <div style="width: 5%" class="delete" onclick="removeCart(${index})">
                  <i class="far fa-trash-alt"></i>
              </div>
        </div>
        `;
        htmls += html;
      });
      var itemCartElement = document.querySelector("#cart-body");
      itemCartElement.innerHTML = htmls;
      updateCart();
    });
  numberOfCart();
}

// update number of cart items
function numberOfCart() {
  var itemInCart = getLocalStorage();
  document.querySelectorAll(".num-cart")[0].innerText = itemInCart.length;
}

// remove cart
function removeCart(index) {
  var itemInCart = getLocalStorage();
  for (let i = 0; i < itemInCart.length; i++) {
    if (i == index) {
      itemInCart.splice(i, 1);
    }
  }
  setLocalStorage(itemInCart);
  window.location.reload();
}

// update cart
function updateCart() {
  var productPrice = 0;
  var total = 0;
  var cart = document.getElementsByClassName("card-body")[0];
  var cartItems = cart.querySelectorAll(".item-cart");
  cartItems.forEach(function (cartItem) {
    var priceElement = cartItem.children[2];
    var price = parseFloat(priceElement.innerText.replace(".000₫", ""));
    var quantityElements = cartItem.querySelectorAll(".input-quantity");
    quantityElements.forEach(function (quantityElement) {
      quantityElement.addEventListener("change", function (e) {
        var quantity = e.target.value;
        if (isNaN(quantity) || quantity <= 0) {
          quantityElement.value = 1;
          quantity = 1;
        }
        productPrice = quantity * price;
        cartItem.getElementsByClassName("product-price-total")[0].innerText =
          productPrice + ".000₫";
        var node = $(this).parent().parent();
        UpdateCartLocalstorage(
          createItemCart(
            Number(node.attr("id-product")),
            node.attr("p-name"),
            node.attr("url-product"),
            node.attr("price-product"),
            quantity
          )
        );
        UpdateTotal();
      });
    });
    UpdateTotal();
  });
}

function UpdateTotal() {
  var total = 0;
  var checkCache = localStorage.getItem("itemCartData");
  if (checkCache) {
    var listCart = JSON.parse(localStorage.getItem("itemCartData"));
    listCart.forEach((e) => {
      total += e.price * e.quantity;
    });
    document.querySelector(".product-total").innerHTML = total + ".000₫";
  }
}

function UpdateCartLocalstorage(item) {
  var itemCartData = getLocalStorage();
  var checkExist = itemCartData.find((x) => String(x.id) === String(item.id));
  if (checkExist) {
    checkExist.quantity = item.quantity;
    const index = itemCartData.findIndex(
      (x) => String(x.id) === String(item.id)
    );
    itemCartData.splice(index, 1, checkExist);
  } else {
    item.quantity = 1;
    itemCartData.push(item);
  }
  setLocalStorage(itemCartData);
}

var btnElement = document.querySelector(".btn-checkout-cart");
btnElement.addEventListener("click", function () {
  window.location.href = "checkout.html";
});

var btnBackToShopping = document.querySelector(".back-to-shopping");
btnBackToShopping.addEventListener("click", function () {
  window.location.href = "product.html";
});
