let products = JSON.parse(localStorage.getItem("products"));

function loadData() {
  if (products != null) {
    let loadProductsCode = `<tr>
      <th>ID</th>
      <th>
        Product Name
        <span onclick="sort('name')" id="name">↑</span>
      </th>
      <th>Product Image</th>
      <th>Product Price<span onclick="sort('price')" id="price">↑</span></th>
      <th>Product Description<span onclick="sort('description')" id="description">↑</span></th>
      <th>Action</th>
    </tr>`;
    products.forEach((element, idx) => {
      loadProductsCode += `<tr>
        <td>${parseInt(element.id) + 1}</td>
        <td>${element.name}</td>
        <td><img src="${element.image}" width="100px" height="100px"/></td>
        <td>${element.price}</td>
        <td>${element.description}</td>
        <td class="action-td">
        <button class="view-btn" id="btn-view-${idx}"><img src="./assets/view.png" alt="edit" width="100%" height="100%" id="img-view-${idx}"/></button>
          <button class="edit-btn" id="btn-edit-${idx}"><img src="./assets/edit.png" alt="edit" width="100%" height="100%" id="img-edit-${idx}"/></button>
          <button class="delete-btn" id="btn-delete-${idx}"><img src="./assets/delete.png" alt="delete" width="100%" height="100%" id="img-delete-${idx}"/></button>
        </td>
      </tr>`;
    });
    document.getElementById("product-tbl").innerHTML = loadProductsCode;
  }
}

window.addEventListener("load", () => {
  products = JSON.parse(localStorage.getItem("products"));
  loadData();
});

window.addEventListener("click", (e) => {
  if (
    e.target.id.indexOf("btn-view") != -1 ||
    e.target.id.indexOf("img-view") != -1
  ) {
    localStorage.setItem("id", JSON.stringify(e.target.id.split("-")[2]));
    window.location.replace("./view_product.html");
  }
  if (
    e.target.id.indexOf("btn-edit") != -1 ||
    e.target.id.indexOf("img-edit") != -1
  ) {
    localStorage.setItem("id", JSON.stringify(e.target.id.split("-")[2]));
    window.location.replace("./edit_product.html");
  }
  if (
    e.target.id.indexOf("btn-delete") != -1 ||
    e.target.id.indexOf("img-delete") != -1
  ) {
    localStorage.setItem("id", JSON.stringify(e.target.id.split("-")[2]));
    if (confirm("are you sure to delete?")) {
      products.splice(e.target.id.split("-")[2], 1);
      localStorage.setItem("products", JSON.stringify(products));
      window.location.reload();
    }
  }
});

function sort(sortBy) {
  if (sortBy != "price") {
    products.sort((product1, product2) => {
      if (product1[sortBy].toUpperCase() < product2[sortBy].toUpperCase()) {
        return -1;
      }
      if (product1[sortBy].toUpperCase() > product2[sortBy].toUpperCase()) {
        return 1;
      }
      return 0;
    });
  } else {
    products.sort((product1, product2) => {
      return parseFloat(product1[sortBy]) - parseFloat(product2[sortBy]);
    });
  }

  loadData();
  document.getElementById("name").innerHTML = "↑";
  document.getElementById("price").innerHTML = "↑";
  document.getElementById("description").innerHTML = "↑";
  document.getElementById(sortBy).innerHTML = "↓";
}

const filterInput = document.getElementById("filterInput");
filterInput.addEventListener("keyup", () => {
  products = JSON.parse(localStorage.getItem("products"));
  if (document.getElementById("filterInput").value != "") {
    findedProject = products.find((product, idx) => {
      return idx + 1 === parseInt(document.getElementById("filterInput").value);
    });
    products = [];
    products.push(findedProject);
    loadData();
  } else {
    loadData();
  }
});
