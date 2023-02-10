const productName = document.getElementById("productName");
const productImage = document.getElementById("productImage");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const editBtn = document.getElementById("edit-product-btn");
const goBackBtn = document.getElementById("goBackBtn");
let product = JSON.parse(localStorage.getItem("products"));
let productID = parseInt(JSON.parse(localStorage.getItem("id")));

addEventListener("load", () => {
  product = JSON.parse(localStorage.getItem("products"));
  productID = parseInt(JSON.parse(localStorage.getItem("id")));

  productName.value = product[productID]["name"];
  productImage.value = product[productID]["image"];
  productPrice.value = product[productID]["price"];
  productDescription.value = product[productID]["description"];
});

function errorCheck() {
  //error tag
  const productNameErr = document.getElementById("productNameErr");
  const productImageErr = document.getElementById("productImageErr");
  const productPriceErr = document.getElementById("productPriceErr");
  const productDescriptionErr = document.getElementById(
    "productDescriptionErr"
  );

  let isErr = false;
  productNameErr.innerHTML = "";
  if (productName.value === "") {
    productNameErr.innerHTML = "Please Enter Product Name";
    isErr = true;
  }
  productImageErr.innerHTML = "";
  if (productImage.value === "") {
    productImageErr.innerHTML = "Please Enter Product image url";
    isErr = true;
  }
  productPriceErr.innerHTML = "";
  if (productPrice.value <= 0) {
    productPriceErr.innerHTML = "Please Enter valid Product price";
    isErr = true;
  }
  productDescriptionErr.innerHTML = "";
  if (productDescription.value === "") {
    productDescriptionErr.innerHTML = "Please Enter Product Description";
    isErr = true;
  }
  return isErr;
}

editBtn.addEventListener("click", () => {
  if (errorCheck()) return;
  product[productID] = {
    name: productName.value,
    image: productImage.value,
    price: productPrice.value,
    description: productDescription.value,
  };
  localStorage.setItem("products", JSON.stringify(product));

  alert("data edited successfully!!!");
  window.location.replace("./index.html");
});
goBackBtn.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.replace("./index.html");
});
