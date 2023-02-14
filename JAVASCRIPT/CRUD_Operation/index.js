//localstorage data
let products = JSON.parse(localStorage.getItem("products"));

const modal = document.querySelector(".delete-modal");
const overlay = document.querySelector(".overlay");

const filterInput = document.getElementById("filterInput");

// load data on tabel based on product array
function loadData() {
  if (products != null && products.length != 0) {
    let loadProductsCode = `<tr>
      <th onclick="sort('id')" id="id">ID</th>
      <th onclick="sort('name')" id="name">NAME</th>
      <th>IMAGE</th>
      <th onclick="sort('price')" id="price">PRICE</th>
      <th onclick="sort('description')" id="description">DESCRIPTION</th>
      <th>ACTION</th>
    </tr>`;
    products.forEach((product) => {
      loadProductsCode += `<tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td><img src="${product.image}" width="100px" height="100px"/></td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td class="action-td">
            <button class="view-btn" id="btn-view-${product.id}"><i class="material-icons" id="img-view-${product.id}">visibility</i></button>
            <button class="edit-btn" id="btn-edit-${product.id}"><i class="material-icons" id="img-edit-${product.id}">edit</i></button>
            <button class="delete-btn" id="btn-delete-${product.id}"><i class="material-icons" id="img-delete-${product.id}">delete</i></button>
        </td>
      </tr>`;
    });
    document.getElementById("product-tbl").innerHTML = loadProductsCode;
  } else {
    document.getElementById(
      "product-tbl"
    ).innerHTML = `<h1 style="padding:10px">No records available..</h1>`;
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
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    window.scrollTo({ behavior: "smooth", top: 0 });
  }
});

const handleCancle = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const deleteProduct = () => {
  const id = localStorage.getItem("id");
  products = JSON.parse(localStorage.getItem("products"));

  const index = products.findIndex((product) => product.id === id);
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  handleCancle();
  loadData();
  showAlert("Product deleted successfully!!");
};

//ascending and decending sorting
function sort(sortBy) {
  // condition for ascending sorting
  if (
    document.getElementById(sortBy).innerHTML == sortBy.toUpperCase() + " ↑" ||
    document.getElementById(sortBy).innerHTML == sortBy.toUpperCase()
  ) {
    if (sortBy != "price" && sortBy != "id") {
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
    findedProjects = products.filter((product) =>
      product.id
        .toString()
        .startsWith(document.getElementById("filterInput").value.toString())
    );
    products = findedProjects;
    loadData();
    // }
  } else {
    loadData();
  }
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
