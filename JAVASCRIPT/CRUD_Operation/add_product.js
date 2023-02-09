const productName = document.getElementById("productName");
const productImage = document.getElementById("productImage");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  if (productName.value === "") {
    console.log(productName.parentElement);
    productName.parentElement.appendChild(
      (document.createElement("div").innerHTML = "please Enter Name")
    );
  }
});
