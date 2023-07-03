let mainData = [];

let token = JSON.parse(localStorage.getItem("token"));
if (token) {
  getData("");
} else {
  alert("you are not authorized Login again");
  window.location.href = "./login.html";
}

async function getData(id) {
  let response = await fetch(`https://lazy-plum-quail-veil.cyclic.app/users/${id}`);
  let data = await response.json();
  if (!Array.isArray(data)) {
    data = [data];
  }

  mainData = data;

  displayData(data);
}

function displayData(data) {
  let Aluminie = document.querySelector("#data_container");
  Aluminie.innerHTML = null;
  data.forEach(function (el) {
    var card = document.createElement("div");
    card.setAttribute("id", "card");

    var imgdiv = document.createElement("div");
    imgdiv.setAttribute("id", "imgdiv");

    var img = document.createElement("img");
    img.src = "";

    imgdiv.append(img);

    var name = document.createElement("h4");
    name.innerText = "Name  :" + el.name;

    var batch = document.createElement("h4");
    batch.innerText = "Batch  :" + el.batch_name;

    var age = document.createElement("h4");
    age.innerText = "Age  :" + el.age;

    var place = document.createElement("h4");
    place.innerText = "Place  :" + el.place;

    var profession = document.createElement("h4");
    profession.innerText = "Profession   :" + el.profession;

    var curdDiv = document.createElement("div");
    curdDiv.setAttribute("id", "curdDiv");

    var dltimgdiv = document.createElement("div");
    dltimgdiv.setAttribute("id", "dltimgdiv");

    var dltimg = document.createElement("img");
    dltimg.src = "";
    dltimg.onclick = function () {
      deleteUser(el.id);
    };

    dltimgdiv.append(dltimg);

    var editimgdiv = document.createElement("div");
    editimgdiv.setAttribute("id", "editimgdiv");

    var editimg = document.createElement("img");
    editimg.src = "";
    editimg.onclick = function () {
      ediFunction(el.id);
    };
    editimgdiv.append(editimg);

    curdDiv.append(dltimgdiv, editimgdiv);

    card.append(imgdiv, name, batch, age, place, profession, curdDiv);
    Aluminie.append(card);
  });
}

async function deleteUser(id) {
  let response = await fetch(`https://lazy-plum-quail-veil.cyclic.app/users/${id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
  getData("");
}

async function Searchuser() {
  let name = document.querySelector("#searchinput").value;

  if (!name) getData("");

  let response = await fetch(`https://lazy-plum-quail-veil.cyclic.app/users?name=${name}`);
  let data = await response.json();

  if (data.length == 0) return;

  displayData(data);
}

function ascendingSort() {
  let newData = mainData.sort((a, b) => a.age - b.age);

  displayData(newData);
}

function descendingSort() {
  let newData = mainData.sort((a, b) => b.age - a.age);
  displayData(newData);
}

async function filterBatch() {
  let batch = document.querySelector("#filterbatch").value;
  if (batch == "All") return getData("");

  let response = await fetch(
    `https://mock-02.onrender.com/users?batch_name=${batch}`
  );
  let data = await response.json();
  displayData(data);
}

function ediFunction(id) {
  let usermodel = document.querySelector("#userModel");
  if (!usermodel) {
    usermodel = document.createElement("div");
    usermodel.setAttribute("id", "userModel");
    document.body.append(usermodel);
  }
  usermodel.style.display = "block";

  let model = document.createElement("div");
  model.setAttribute("id", "model");

  let input = document.createElement("input");
  input.placeholder = "type profession ";
  input.setAttribute("id", "inputModel");

  let Editbut = document.createElement("button");
  Editbut.innerText = "Update";
  Editbut.onclick = function () {
    Changeprofession(id);
  };

  model.append(input, Editbut);
  usermodel.append(model);
}

async function Changeprofession(id) {
  let usermodel = document.querySelector("#userModel");
  usermodel.style.display = "none";

  let profession = document.querySelector("#inputModel").value;

  let response = await fetch(`https://lazy-plum-quail-veil.cyclic.app/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      profession: profession,
    }),
  }).then((response) => {
    response.status == 200
      ? alert("update Successful")
      : alert("something went wrong try again");
    return getData("");
  });
}
