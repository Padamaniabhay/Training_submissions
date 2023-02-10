// form input fields eventlistners
const inputField = {
  productName: document.getElementById("productName"),
  productImage: document.getElementById("productImage"),
  productPrice: document.getElementById("productPrice"),
  productDescription: document.getElementById("productDescription"),
};

const submitBtn = document.getElementById("submitBtn");
const goBackBtn = document.getElementById("goBackBtn");

//error checking of input field
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

// store product in localstorage
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
            id:
              Date.now().toString().slice(3) +
              Math.ceil(Math.random() * (99999 - 10000) + 10000).toString(),
            name: inputField.productName.value,
            image: inputField.productImage.value,
            price: inputField.productPrice.value,
            description: inputField.productDescription.value,
          },
        ])
      );
    } else {
      products.push({
        id:
          Date.now().toString().slice(3) +
          Math.ceil(Math.random() * (99999 - 10000) + 10000).toString(),
        name: inputField.productName.value,
        image: inputField.productImage.value,
        price: inputField.productPrice.value,
        description: inputField.productDescription.value,
      });
      localStorage.setItem("products", JSON.stringify(products));
    }
  }

  inputField.productName.value = "";
  inputField.productImage.value = "";
  inputField.productPrice.value = "";
  inputField.productDescription.value = "";

  alert("data added!!!");
  location.replace("./index.html");
});

//to go at home page
goBackBtn.addEventListener("click", (event) => {
  event.preventDefault();
  location.replace("./index.html");
});
