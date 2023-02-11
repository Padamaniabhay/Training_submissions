//localstorage data
let products = JSON.parse(localStorage.getItem("products"));

const filterInput = document.getElementById("filterInput");

// load data on tabel based on product array
function loadData() {
  if (products != null && products.length != 0) {
    let loadProductsCode = `<tr>
      <th>ID</th>
      <th onclick="sort('name')" id="name">NAME</th>
      <th>IMAGE</th>
      <th onclick="sort('price')" id="price">PRICE</th>
      <th onclick="sort('description')" id="description">DESCRIPTION</th>
      <th>ACTION</th>
    </tr>`;
    // console.log(products);
    products.forEach((product) => {
      loadProductsCode += `<tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td><img src="${product.image}" width="100px" height="100px"/></td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td class="action-td">
        <button class="view-btn" id="btn-view-${product.id}"><img src="./assets/view.svg" alt="edit" width="100%" height="100%" id="img-view-${product.id}"/></button>
          <button class="edit-btn" id="btn-edit-${product.id}"><img src="./assets/edit.svg" alt="edit" style="font-weight: 900;" width="100%" height="100%" id="img-edit-${product.id}"/></button>
          <button class="delete-btn" id="btn-delete-${product.id}"><img src="./assets/trash.svg" alt="delete" width="100%" height="100%" id="img-delete-${product.id}"/></button>
        </td>
      </tr>`;
    });
    document.getElementById("product-tbl").innerHTML = loadProductsCode;
  } else {
    document.getElementById("product-tbl").innerHTML = `<h1 style="padding:10px">Product not found. Please Add</h1>`
  }
}

//load data when page
addEventListener("load", () => {
  products = JSON.parse(localStorage.getItem("products"));
  loadData();
});

addEventListener("click", (e) => {
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
      findedIdx = products.findIndex((product) => {
        return product.id == e.target.id.split("-")[2];
      });

      products.splice(findedIdx, 1);
      localStorage.setItem("products", JSON.stringify(products));
      window.location.reload();
    }
  }
});

//ascending and decending sorting
function sort(sortBy) {
  // condition for ascending sorting
  if (
    document.getElementById(sortBy).innerHTML == sortBy.toUpperCase() + " ↑" ||
    document.getElementById(sortBy).innerHTML == sortBy.toUpperCase()
  ) {
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
    document.getElementById(sortBy).innerHTML = sortBy.toUpperCase() + " ↓";
  } else {
    // condition for descending sorting
    products.reverse();

    loadData();
    document.getElementById(sortBy).innerHTML = sortBy.toUpperCase() + " ↑";
  }
}

// filter input field event listner
filterInput.addEventListener("keyup", () => {
  products = JSON.parse(localStorage.getItem("products"));
  if (document.getElementById("filterInput").value != "") {
    findedProject = products.find((product) => {
      return product.id === document.getElementById("filterInput").value;
    });
    // console.log(findedProject);
    if (findedProject == undefined) {
      loadData();
    } else {
      products = [];
      products.push(findedProject);
      loadData();
    }
  } else {
    loadData();
  }
});
