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

// store product in localstorage
submitBtn.addEventListener("click", (event) => {
  let id = "";
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

  showAlert("product added");
  setTimeout(() => {
    location.replace("./index.html");
  }, 2000);
});

//to go at home page
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
