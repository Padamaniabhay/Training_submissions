// form input fields eventlistners
const inputField = {
  productName: document.getElementById("productName"),
  productImage: document.getElementById("productImage"),
  productPrice: document.getElementById("productPrice"),
  productDescription: document.getElementById("productDescription"),
};

const editBtn = document.getElementById("edit-product-btn");
const goBackBtn = document.getElementById("goBackBtn");

// localstorage variables
let products = JSON.parse(localStorage.getItem("products"));
let productID = parseInt(JSON.parse(localStorage.getItem("id")));
let selectedProduct;

//render data on input field based on id stored in localstorage
addEventListener("load", () => {
  products = JSON.parse(localStorage.getItem("products"));
  productID = parseInt(JSON.parse(localStorage.getItem("id")));

  selectedProduct = products.find((product) => {
    return product.id == productID;
  });

  inputField.productName.value = selectedProduct["name"];
  inputField.productImage.value = selectedProduct["image"];
  inputField.productPrice.value = selectedProduct["price"];
  inputField.productDescription.value = selectedProduct["description"];
});

//error checking
function errorCheck() {
  //error tag
  const errorField = {
    productNameErr: document.getElementById("productNameErr"),
    productImageErr: document.getElementById("productImageErr"),
    productPriceErr: document.getElementById("productPriceErr"),
    productDescriptionErr: document.getElementById("productDescriptionErr"),
  };

  let isErr = false;
  errorField.productNameErr.innerHTML = "";
  if (inputField.productName.value === "") {
    errorField.productNameErr.innerHTML = "Please Enter Product Name";
    isErr = true;
  }
  errorField.productImageErr.innerHTML = "";
  if (inputField.productImage.value === "") {
    errorField.productImageErr.innerHTML = "Please Enter Product image url";
    isErr = true;
  }
  errorField.productPriceErr.innerHTML = "";
  if (inputField.productPrice.value === "") {
    errorField.productPriceErr.innerHTML = "Please Enter Product price";
    isErr = true;
  } else if (inputField.productPrice.value <= 0) {
    errorField.productPriceErr.innerHTML =
      "Product price must be greater than 0";
    isErr = true;
  }

  errorField.productDescriptionErr.innerHTML = "";
  if (inputField.productDescription.value === "") {
    errorField.productDescriptionErr.innerHTML =
      "Please Enter Product Description";
    isErr = true;
  }
  return isErr;
}

// store edited data in localstorage
editBtn.addEventListener("click", () => {
  if (errorCheck()) return;

  products.forEach((product) => {
    if (product.id == selectedProduct.id) {
      product.name = productName.value;
      product.image = productImage.value;
      product.price = productPrice.value;
      product.description = productDescription.value;
    }
  });

  localStorage.setItem("products", JSON.stringify(products));

  showAlert("data edited successfully!!!");
  setTimeout(() => {
    location.replace("./index.html");
  }, 2000);
});
goBackBtn.addEventListener("click", (event) => {
  event.preventDefault();
  location.replace("./index.html");
});

//alert box
const alert = document.querySelector(".alert");
const progress = document.querySelector(".progress");

// Progress Bar in Alert Box
let i = 0;
const startProgress = () => {
  if (i === 100) {
    progress.style.width = "0%";
    i = 0;
    return;
  }
  setTimeout(() => {
    progress.style.width = `${i}%`;
    startProgress(i++);
  }, 20);
};

const showAlert = (msg) => {
  alert.style.display = "block";
  alert.childNodes[1].innerText = msg;
  startProgress();
  setTimeout(() => {
    alert.style.transform = "translateX(200%)";
    setTimeout(() => {
      alert.style.display = "none";
      alert.style.transform = "translateX(0%)";
    }, 1000);
  }, 2000);
};
