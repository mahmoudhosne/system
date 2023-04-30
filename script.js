// steps
// 1 => function create total
// 2 => function create product
// 3 => funcion save data in local storge
// 4 => function clear data
// 5 => function read
// 6 => function count
// 7 => function delete
// 8 => function update
// 9 => function search
//10 => function clean data
// ////////////////////////////////////////////////////////

// start point

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode = 'create';
let tmp;
// first function that get total of(price , taxes , ads, dicunt);

function getTotalPrice() {
  if (price.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = 'darkgreen';
  } else {
    total.innerHTML = '';
    total.style.backgroundColor = 'red';
  }
}
// function CheckValue() {
//   if (
//     price.value != '' &&
//     taxes.value != '' &&
//     ads.value != '' &&
//     discount.value != ''
//   ) {
//     return;
//     true;
//   } else {
//     return;
//     false;
//   }
// }
// //////////////////////////////////////////////////////

// function that create new product and storage it in an array inside object////////////

// //////////////////////////////////////

let dataProduct = [];
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // '// this condition do all counts of products

  if (
    title.value != '' &&
    price.value != '' &&
    category.value != '' &&
    newProduct.count <= 100
  ) {
    if (mode === 'create') {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      mode = 'create';
      submit.innerHTML = 'create';
      count.style.display = 'block';
    }
  } else {
  }

  localStorage.setItem('product', JSON.stringify(dataProduct));
  clearData();
  showData();
};

// //////////////////////this fuction do clear all input fields

function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}
// /////////////////////////////////////////////////////////////

// this function can show you the products after storge

function showData() {
  getTotalPrice();
  let table = '';
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>
    `;
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteall');
  if (dataProduct.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAllData()">  delete all (${dataProduct.length})</button>`;
  } else {
    btnDelete.innerHTML = '';
  }
}

/////////////////////////////////////////////////////////////////////////

// this function do delete one item/////////////////
showData();
function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

function deleteAllData() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

// ///////////////////////////////this functiondo update values of product

function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotalPrice();
  count.style.display = 'none';
  category.value = dataProduct[i].category;
  submit.innerHTML = 'update';
  mode = 'update';
  tmp = i;
  scroll({
    top: 0,
    behavior: 'smooth',
  });
}

// /////////////////////////////////////functi0n search
let searchMode = 'title';

function getSearchMode(id) {
  let search = document.getElementById('search');
  if (id == 'searchtitle') {
    searchMode = 'title';
    search.placeholder = 'search by title';
  } else {
    searchMode = 'category';
    search.placeholder = 'search by category';
  }
  search.focus();
  search.value = '';
  showData();
}

function searchData(value) {
  let table = '';
  if (searchMode == 'title') {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
        `;
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
}
