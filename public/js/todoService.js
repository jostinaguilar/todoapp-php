const todoList = document.getElementById('todoList');
const inputSearch = document.getElementById('searchTask');
const formCreate = document.getElementById('formCreate');
const nameTaskInput = document.getElementById('nameTask');
const confirmDelete = document.getElementById('confirmDelete');

let todos = [];

window.addEventListener('DOMContentLoaded', async () => {
  todoList.innerHTML = '<span>Loading Data</span>';
  const data = await getTodos();
  todos = data;
  console.log(todos.length);
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
    showToastAlert('Tarea agregada correctamente', '#00b09b, #96c93d');
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
    showToastAlert('Tarea Eliminada', 'rgb(255, 95, 109), rgb(255, 195, 113)');
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
            <input value="${todo.nameTask}" class="border border-0 bg-transparent outline w-100" readonly placeholder="Nombre Tarea"/>
            <div class="d-flex justify-content-end gap-2">
                <button type="submit" class="none"><i class="bi bi-check-circle"></i></button>
                <button type="button" class="btn btn-primary btn-sm bi bi-pen"></button>
                <button type="button" data-id="${todo.idTask}" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal" class="btn btn-dark btn-sm bi bi-trash3"></button>
            </div>
        </form>`
    )
    .join('');

todoList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('btn-dark')) {
    console.log(evt.target.dataset.id);
    let id = evt.target.dataset.id;
    confirmDelete.setAttribute('onclick', `deleteTodo(${id})`);
  }
  evt.stopPropagation();
});

function renderTodos(todos) {
  const itemsString = createTodosItem(todos);
  todoList.innerHTML = itemsString;
}

inputSearch.addEventListener('keyup', () => {
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
