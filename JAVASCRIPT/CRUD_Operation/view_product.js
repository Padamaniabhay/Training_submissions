addEventListener("load", () => {
  const productName = document.getElementById("productName");
  const productImage = document.getElementById("productImage");
  const productPrice = document.getElementById("productPrice");
  const productDescription = document.getElementById("productDescription");
  const product = JSON.parse(localStorage.getItem("products"));
  const productID = parseInt(JSON.parse(localStorage.getItem("id")));

  productName.value = product[productID]["name"];
  productImage.src = product[productID]["image"];
  productPrice.value = product[productID]["price"];
  productDescription.value = product[productID]["description"];
});

const goBackBtn = document.getElementById("go-back-btn");
goBackBtn.addEventListener("click", () => {
  window.location.replace("./index.html");
});
