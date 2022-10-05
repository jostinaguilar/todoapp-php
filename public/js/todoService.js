const todoList = document.getElementById("todoList");
const inputSearch = document.getElementById("searchTask");
const formCreate = document.getElementById("formCreate");

let todos = [];

window.addEventListener("DOMContentLoaded", async () => {
  todoList.innerHTML = "<span>Loading</span>";
  const data = await getTodos();
  todos = data;
  renderTodos(todos);
});

formCreate.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  let dataForm = new FormData(formCreate);
  console.log(dataForm);
  console.log(dataForm.get("nameTask"));

  const res = await saveTodo(dataForm);
  console.log(res);
  const dataRes = await getTodos();
  todos = dataRes;
  renderTodos(todos);
});

async function getTodos() {
  const response = await fetch("http://todoapp.test/home/getAllByJSON");
  return await response.json();
}

async function saveTodo(data) {
  const response = await fetch("http://todoapp.test/home/create", {
    method: "POST",
    body: data,
  });
  return await response.json();
}

const createTodosItem = (todos) =>
  todos
    .map(
      (todo) =>
        `<form class="p-2 bg-light border d-flex justify-content-between rounded px-3">
            <input value="${todo.nameTask}" class="border border-0 bg-transparent outline w-100" readonly placeholder="Nombre Tarea"/>
            <div class="d-flex justify-content-end gap-2">
                <button type="submit" class="none"><i class="bi bi-check-circle"></i></button>
                <button type="button" class="btn btn-primary btn-sm bi bi-pen"></button>
                <button type="button"  class="btn btn-dark btn-sm bi bi-trash3"></button>
            </div>
        </form>`
    )
    .join("");

function renderTodos(todos) {
  const itemsString = createTodosItem(todos);
  todoList.innerHTML = itemsString;
}

todoList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("btn-dark")) {
    console.log("eliminar");
  } else if (evt.target.classList.contains("btn-primary")) {
    console.log("editar");
  }
});

inputSearch.addEventListener("keyup", (evt) => {
  const newTodos = todos.filter((todo) =>
    todo.nameTask.toLowerCase().includes(inputSearch.value.toLowerCase())
  );
  renderTodos(newTodos);
});
