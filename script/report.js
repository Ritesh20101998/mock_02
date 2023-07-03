let token = JSON.parse(localStorage.getItem("token"));
if (token) {
  getData();
} else {
  alert("you are not authorized Login again");
  window.location.href = "./login.html";
}

async function getData() {
  let response = await fetch("https://lazy-plum-quail-veil.cyclic.app/users");
  let data = await response.json();

  getTotal(data);
}

function getTotal(data) {
  let Total = data.length;
  let student = 0;
  let professional = 0;

  data.forEach((el) => {
    el.profession === "Student" ? student++ : professional++;
  });

  var row = document.createElement("tr");
  var col1 = document.createElement("td");
  col1.innerText = Total;
  var col2 = document.createElement("td");
  col2.innerText = student;
  var col3 = document.createElement("td");
  col3.innerText = professional;
  row.append(col1, col2, col3);
  document.querySelector("tbody").append(row);
}
