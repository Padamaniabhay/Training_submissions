// display product when page loads
addEventListener("load", () => {
  // form input fields eventlistners
  const inputField = {
    productName: document.getElementById("productName"),
    productImage: document.getElementById("productImage"),
    productPrice: document.getElementById("productPrice"),
    productDescription: document.getElementById("productDescription"),
  };

  const products = JSON.parse(localStorage.getItem("products"));
  const productID = parseInt(JSON.parse(localStorage.getItem("id")));

  let selectedProduct = products.find((product) => {
    return product.id == productID;
  });

  inputField.productName.innerHTML = selectedProduct["name"];
  inputField.productImage.src = selectedProduct["image"];
  inputField.productPrice.innerHTML = selectedProduct["price"];
  inputField.productDescription.innerHTML = selectedProduct["description"];
});

const goBackBtn = document.getElementById("go-back-btn");
goBackBtn.addEventListener("click", () => {
  window.location.replace("./index.html");
});
