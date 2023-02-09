const sortName = document.getElementById("sort-name");
const sortPrice = document.getElementById("sort-price");
const sortDesc = document.getElementById("sort-description");

let products = JSON.parse(localStorage.getItem("products"));
window.addEventListener("load", () => {
  //   localStorage.clear();
  products = JSON.parse(localStorage.getItem("products"));
  if (products != null) {
    let loadProductsCode = "";
    products.forEach((element, idx) => {
      loadProductsCode += `<tr>
        <td>${idx + 1}</td>
        <td>${element.name}</td>
        <td><img src="${element.image}" width="100px" height="100px"/></td>
        <td>${element.price}</td>
        <td>${element.description}</td>
        <td class="action-td">
          <button class="view-btn" id="btn-view-${idx}">View</button>
          <button class="edit-btn" id="btn-edit-${idx}">Edit</button>
          <button class="delete-btn" id="btn-delete-${idx}">Delete</button>
        </td>
      </tr>`;
    });
    document.getElementById("product-tbl").innerHTML += loadProductsCode;
  }
});

window.addEventListener("click", (e) => {
  if (e.target.id.indexOf("btn-view") != -1) {
    localStorage.setItem("id", JSON.stringify(e.target.id.split("-")[2]));
    window.location.replace("./view_product.html");
  }
  if (e.target.id.indexOf("btn-edit") != -1) {
    localStorage.setItem("id", JSON.stringify(e.target.id.split("-")[2]));
    window.location.replace("./edit_product.html");
  }
  if (e.target.id.indexOf("btn-delete") != -1) {
    localStorage.setItem("id", JSON.stringify(e.target.id.split("-")[2]));
    if (confirm("are you sure to delete?")) {
      products.splice(e.target.id.split("-")[2], 1);
      localStorage.setItem("products", JSON.stringify(products));
      window.location.reload();
    }
  }
});

sortName.addEventListener("click", () => {
  alert("Fs");
});
