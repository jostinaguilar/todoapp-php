const todoList = document.getElementById("todoList");
const inputSearch = document.getElementById("searchTask");

let todos = [];

window.addEventListener("DOMContentLoaded", async () => {
  todoList.innerHTML = "<span>Loading</span>";
  const data = await getTodos();
  todos = data;
  renderTodos(todos);
});

async function getTodos() {
  const response = await fetch("http://todoapp.test/home/getAllByJSON");
  return await response.json();
}

const createTodosItem = (todos) =>
  todos
    .map((todo) => `<input value="${todo.nameTask}" class="form-control"/>`)
    .join("");

function renderTodos(todos) {
  const itemsString = createTodosItem(todos);
  todoList.innerHTML = itemsString;
}

inputSearch.addEventListener("keyup", (evt) => {
  const newTodos = todos.filter((todo) =>
    todo.nameTask.toLowerCase().includes(inputSearch.value.toLowerCase())
  );
  renderTodos(newTodos);
});
