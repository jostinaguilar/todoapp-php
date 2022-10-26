const todoList = document.getElementById('todoList');
const inputSearch = document.getElementById('searchTask');
const formCreate = document.getElementById('formCreate');
const nameTaskInput = document.getElementById('nameTask');
const confirmDelete = document.getElementById('confirmDelete');
const msgError = document.getElementById('msgError');

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
    formCreate.querySelector('.input').value = '';
    showToastAlert('Tarea Agregada', '#00b09b, #96c93d');
    msgError.textContent = '';
    formCreate.querySelector('input').className = 'input input-bordered w-full';
  } else {
    showToastAlert('Rellena los campos', '#93291E, #ED213A');
    msgError.textContent = '*Error campos vacios';
    formCreate.querySelector('input').className =
      'input input-bordered input-error w-full max-w-xs';
    formCreate.querySelector('input').focus();
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
        `<form class="flex bg-base-200 shadow-lg mb-4 py-4 px-6 rounded-md">
            <input value="${todo.nameTask}" name="editTask" class="bg-transparent outline-none border-b-2 border-transparent mr-4 w-full" readonly placeholder="Nombre Tarea"/>
              <button type="submit" data-id="${todo.idTask}" class="none"></button>
              <button type="button" class="btn btn-secondary btn-sm bi bi-pen"></button>
              <a href="#modalDelete" data-id="${todo.idTask}" class="btn btn-sm bi bi-trash3 ml-2"></a>
        </form>`
    )
    .join('');

todoList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('bi-trash3')) {
    let id = evt.target.dataset.id;
    confirmDelete.setAttribute('onclick', `deleteTodo(${id})`);
  } else if (evt.target.classList.contains('bi-pen')) {
    let formEdit = evt.target.parentElement;
    formEdit.querySelector('.none').className =
      'btn btn-success btn-sm bi bi-check-circle ms-4';
    evt.target.className = 'none';
    formEdit.querySelector('input').readOnly = false;
    formEdit.querySelector('input').className =
      'border-b-2 bg-transparent outline-none w-100 border-purple-700 mr-4 w-full';
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
    close: true,
    position: 'right',
    stopOnFocus: true,
    style: {
      background: `linear-gradient(to right, ${gradient})`,
      'box-shadow': 'none',
    },
  }).showToast();
}
