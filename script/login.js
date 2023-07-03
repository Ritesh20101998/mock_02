document
  .querySelector("#myLogin_form")
  .addEventListener("submit", Formsubmit_Login);

async function Formsubmit_Login(e) {
  e.preventDefault();

  let email = document.querySelector("#EM").value;
  let password = document.querySelector("#PS").value;
  let obj = {
    email,
    password,
  };
  try {
    let token = await RegisterUser(obj);
    localStorage.setItem("token", JSON.stringify(token));
    alert("Login successful");
    window.location.href = "./data.html";
  } catch (error) {
    alert("something went wrong try again");
    console.error(error);
  }
}

async function RegisterUser(data) {
  let response = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let token = await response.json();
  if (token && token.token) {
    return token.token;
  } else {
    throw new Error("Token not found in response");
  }
}
