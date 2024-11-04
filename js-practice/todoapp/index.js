document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector(".todo-input");
  const todoSubmit = document.querySelector(".todo-submit");
  const todoList = document.querySelector(".todo-list");
  let isEditMode = false;
  let editData = null;

  if (todoInput) {
    todoInput.focus();
  }

  document.addEventListener("submit", function (e) {
    e.preventDefault();

    const todoVal = todoInput.value.trim();
    console.log(todoVal);

    if (todoVal != "") {
      if (isEditMode) {
        console.log(editData);
        console.log(editData.firstChild.textContent);
        // console.log(editData.secondChild.textContent);

        editData.firstChild.textContent = todoVal;
        todoSubmit.innerText = "Add todo";
        isEditMode = false;
        editData = null;
      } else {
        addToTodoItem(todoVal);
      }

      todoInput.value = "";
    } else {
      alert("PLease enter valid todo");
    }
  });

  todoList.addEventListener("click", function (e) {
    let target = e.target;
    console.log(target, target.tagName, target.innerText);
    if (target.tagName == "BUTTON") {
      const todoItem = target.parentNode;
      if (target.innerText === "DELETE") {
        todoItem.remove();
      } else if (target.innerText === "EDIT") {
        isEditMode = true;
        editData = todoItem;
        todoSubmit.innerText = "Edit todo";
        console.log(todoItem.firstChild.textContent);
        todoInput.value = todoItem.firstChild.textContent;
        todoInput.focus();
      }
    }
  });

  function addToTodoItem(todoVal) {
    const list = document.createElement("li");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    list.innerHTML = `<span>${todoVal}</span>`;
    edit.innerText = `EDIT`;
    deleteBtn.innerText = `DELETE`;

    list.append(edit);
    list.append(deleteBtn);

    todoList.append(list);
  }
});
