const productName = document.getElementById("productName");
const productImage = document.getElementById("productImage");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const submitBtn = document.getElementById("submitBtn");

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
  if (productPrice.value == 0) {
    productPriceErr.innerHTML = "Please Enter Product price";
    isErr = true;
  }
  productDescriptionErr.innerHTML = "";
  if (productDescription.value === "") {
    productDescriptionErr.innerHTML = "Please Enter Product Description";
    isErr = true;
  }
  return isErr;
}

submitBtn.addEventListener("click", (event) => {
  let id = "";
  event.preventDefault();
  if (errorCheck()) return;
  if (id == "") {
    let products = JSON.parse(localStorage.getItem("products"));
    if (products == null) {
      localStorage.setItem(
        "products",
        JSON.stringify([
          {
            name: productName.value,
            image: productImage.value,
            price: productPrice.value,
            description: productDescription.value,
          },
        ])
      );
    } else {
      products.push({
        name: productName.value,
        image: productImage.value,
        price: productPrice.value,
        description: productDescription.value,
      });
      localStorage.setItem("products", JSON.stringify(products));
    }
  }

  productName.value = "";
  productImage.value = "";
  productPrice.value = "";
  productDescription.value = "";

  alert("data added!!!");
  window.location.replace("./index.html");
});
