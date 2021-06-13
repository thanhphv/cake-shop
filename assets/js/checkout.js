function renderCartItem() {
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
      dataLocal.forEach((x) => {
        var item = productData.find((c) => String(c.id) === String(x.id));
        var html = `
        <div class="summary-box">
        <div class="box-img">
            <img src="${item.url}" alt="">
            <span class="box-quantity">${x.quantity}</span>
            <h3>${item.name}</h3>
        </div>

        <div class="box-price">
            <p>${item.price}.000₫</p>
        </div>
    </div>
          `;
        htmls += html;
      });
      var itemCartElement = document.querySelector("#summary-item");
      itemCartElement.innerHTML = htmls;
    });
}
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
}

var form = document.querySelector(".form-checkout");
console.log(form);
