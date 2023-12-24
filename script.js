function getFormValue(e) {
  e.preventDefault();
  let toDoName = e.target.toDoName.value;
  let description = e.target.description.value;
  let myObj = {
    toDoName: toDoName,
    description: description,
  };
  axios
    .post(
      "https://crudcrud.com/api/74a9102d8d1541b58b70b5b9880ddec5/items",
      myObj
    )
    .then((response) => {
      console.log(response.data);
      showUserOnScreen(myObj);
      clearFormInput();
    })
    .catch((err) => console.log(err));
}

function showUserOnScreen(myObj) {
  let elem = JSON.stringify(myObj);
  let ulist = document.querySelector(".list-group-1");
  let ulist2 = document.querySelector(".list-group-2");
  let li = document.createElement("li");
  let checkbox = document.createElement("input");
  let deleteBtn = document.createElement("button");
  li.className = "list-group-item mt-3 d-flex";
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input me-3 ms-3";
  deleteBtn.innerText = "X";
  deleteBtn.className = "btn btn-danger btn-sm w-auto float-right delete";
  li.appendChild(
    document.createTextNode(`${myObj.toDoName}: ${myObj.description}`)
  );
  li.appendChild(checkbox);
  li.appendChild(deleteBtn);
  ulist.appendChild(li);
  checkbox.onclick = () => {
    ulist.removeChild(li);
    showEditUserOnScreen(li);
  };
  deleteBtn.onclick = () => {
    axios
      .delete(
        `https://crudcrud.com/api/74a9102d8d1541b58b70b5b9880ddec5/items/${myObj._id}`
      )
      .then((res) => ulist.removeChild(li))
      .catch((err) => console.error(err));
  };
}

function clearFormInput() {
  document.getElementById("toDoName").value = "";
  document.getElementById("description").value = "";
}

function showEditUserOnScreen(newLi) {
  let ulist2 = document.querySelector(".list-group-2");
  ulist2.appendChild(newLi);
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/74a9102d8d1541b58b70b5b9880ddec5/items")
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        showUserOnScreen(response.data[i]);
      }
      console.log(response.data);
    })
    .catch((err) => console.error(err));
});
