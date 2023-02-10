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
  if (inputField.productPrice.value <= 0) {
    errorField.productPriceErr.innerHTML = "Please Enter valid Product price";
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

  alert("data edited successfully!!!");
  location.replace("./index.html");
});
goBackBtn.addEventListener("click", (event) => {
  event.preventDefault();
  location.replace("./index.html");
});
