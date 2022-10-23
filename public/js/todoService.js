const todoList = document.getElementById('todoList');
const inputSearch = document.getElementById('searchTask');
const formCreate = document.getElementById('formCreate');
const nameTaskInput = document.getElementById('nameTask');
const confirmDelete = document.getElementById('confirmDelete');

let todos = [];
let task = {};

window.addEventListener('DOMContentLoaded', async () => {
  todoList.innerHTML = '<span>Loading Data</span>';
  const data = await getTodos();
  todos = data;
  if (todos.length == 0) {
    todoList.innerHTML = '<span>Sin tareas</span>';
    return;
  }
  renderTodos(todos);
});

formCreate.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  let dataForm = new FormData(formCreate);

  const res = await saveTodo(dataForm);
  if (res == 'success') {
    formCreate.querySelector('.form-control').value = '';
    showToastAlert('Tarea Agregada', '#00b09b, #96c93d');
    formCreate.querySelector('input').className = 'form-control';
  } else {
    showToastAlert('Rellena los campos', '#93291E, #ED213A');
    formCreate.querySelector('input').className +=
      ' border border-danger border-2';
  }
  const dataRes = await getTodos();
  todos = dataRes;
  renderTodos(todos);
});

async function getTodos() {
  const response = await fetch('http://todoapp.test/home/getAllByJSON');
  return await response.json();
}

async function saveTodo(data) {
  const response = await fetch('http://todoapp.test/home/create', {
    method: 'POST',
    body: data,
  });
  return await response.json();
}

async function deleteTodo(id) {
  const response = await fetch(`http://todoapp.test/home/delete/${id}`);
  const res = await response.json();
  if (res === 'deleted') {
    showToastAlert('Tarea Eliminada', '#93291E, #ED213A');
    const dataRes = await getTodos();
    todos = dataRes;
    if (todos.length == 0) {
      todoList.innerHTML = '<span>Sin tareas</span>';
      return;
    }
    renderTodos(todos);
  }
}

async function updateTodo(id, data) {
  const response = await fetch(`http://todoapp.test/home/update/${id}`, {
    method: 'POST',
    body: data,
  });
  const res = await response.json();
  if (res === 'success') {
    showToastAlert('Tarea Actualizada', '#00b09b, #96c93d');
    const dataRes = await getTodos();
    todos = dataRes;
    renderTodos(todos);
  }
}

const createTodosItem = (todos) =>
  todos
    .map(
      (todo) =>
        `<form class="p-2 bg-light border d-flex justify-content-between rounded px-3">
            <input value="${todo.nameTask}" name="editTask" class="border border-0 bg-transparent outline w-100" readonly placeholder="Nombre Tarea"/>
              <button type="submit" data-id="${todo.idTask}" class="none"></button>
              <button type="button" class="btn btn-primary btn-sm bi bi-pen"></button>
              <button type="button" data-id="${todo.idTask}" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal" class="btn btn-dark btn-sm bi bi-trash3 ms-2"></button>
        </form>`
    )
    .join('');

todoList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('btn-dark')) {
    let id = evt.target.dataset.id;
    confirmDelete.setAttribute('onclick', `deleteTodo(${id})`);
  } else if (evt.target.classList.contains('btn-primary')) {
    let formEdit = evt.target.parentElement;
    formEdit.querySelector('.none').className =
      'btn btn-success btn-sm bi bi-check-circle ms-4';
    evt.target.className = 'none';
    formEdit.querySelector('input').readOnly = false;
    formEdit.querySelector('input').className =
      'border border-0 bg-transparent outline border-bottom w-100';
  } else if (evt.target.classList.contains('btn-success')) {
    evt.target.parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      let formEdit = new FormData(evt.target.parentElement);
      updateTodo(evt.target.dataset.id, formEdit);
    });
  }
  evt.stopPropagation();
});

function renderTodos(todos) {
  const itemsString = createTodosItem(todos);
  todoList.innerHTML = itemsString;
}

inputSearch.addEventListener('keyup', () => {
  if (todos.length === 0) {
    todoList.innerHTML = '<span>Sin tareas</span>';
    return;
  }

  const newTodos = todos.filter((todo) =>
    todo.nameTask.toLowerCase().includes(inputSearch.value.toLowerCase())
  );
  renderTodos(newTodos);
});

function showToastAlert(content, gradient) {
  Toastify({
    text: content,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: `linear-gradient(to right, ${gradient})`,
    },
  }).showToast();
}
