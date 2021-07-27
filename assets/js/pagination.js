const productAPI = "https://food-server-db.herokuapp.com/db";
var currentPage = 1;
function app() {
  getProduct(renderProduct);
}

app();

function getProduct(callback) {
  fetch(productAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

let perPage = 9;
let start = 0;
let end = perPage;

function getCurrentPage(currentPage) {
  start = (currentPage - 1) * perPage;
  end = currentPage * perPage;
}

getCurrentPage(1);

function renderProduct(products) {
  var productList = [
    ...products.tea,
    ...products.cream,
    ...products.coffe,
    ...products.cake,
    ...products.drink,
  ];
  const totalPages = Math.ceil(productList.length / perPage);
  let htmls = productList.map(function (product, index) {
    if (index >= start && index < end) {
      return `
            <div class="product-box" id-product="${product.id}">
                <!-- img -->
                <div class="product-img">
                    <!-- add cart -->
                    <a href="javascript:void(0)" class="add-cart" onclick="addToCart(${product.id},'${product.name}','${product.url}', ${product.price})">
                        <i class="fas fa-shopping-cart"></i>
                    </a>
                    <a href="javascript:void(0)" class="add-view">
                        <i class="fas fa-eye"></i>
                    </a>
                    <img src="${product.url}" alt="">
                </div>
                <div class="product-details">
                    <a href="javascript:void(0)" class="p-name">${product.name}</a>
                    <p class="product-price">${product.price}.000₫</p>
                </div>
            </div>
            `;
    }
  });
  document.querySelector(".product-list").innerHTML = htmls.join("");
  renderList(totalPages, currentPage);
  changPage(getCurrentPage);
}

function renderList(totalPages, currentPage) {
  let html = "";
  for (i = 1; i <= totalPages; i++) {
    html += `<li class="${currentPage === i ? "active-number" : ""
      }"><a>${i}</a></li>`;
  }

  document.querySelector(".number-page").innerHTML = html;
}

function changPage() {
  const currentPages = document.querySelectorAll(".number-page li");

  for (let i = 0; i < currentPages.length; ++i) {
    currentPages[i].addEventListener("click", function () {
      currentPage = i + 1;
      getCurrentPage(currentPage);
      app();
    });
  }
}


//1: 0,...,8
//2: 9....17
//3: 18.... 26
//4: 26....32

// itemperpage: 9
// current page: 1
//start =0, end = 12;
//start = (current page - 1) * itemperpage
// end = current page * itemperpage
