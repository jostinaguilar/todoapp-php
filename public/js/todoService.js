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
  console.log(formCreate);

  const res = await saveTodo(dataForm);
  if (res == 'success') {
    formCreate.querySelector('.form-control').value = '';
    showToastAlert('Tarea Agregada', '#00b09b, #96c93d');
  } else {
    showToastAlert('Rellena los campos', '#ED213A, #93291E');
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
    showToastAlert('Tarea Eliminada', '#ED213A, #93291E');
    const dataRes = await getTodos();
    todos = dataRes;
    if (todos.length == 0) {
      todoList.innerHTML = '<span>Sin tareas</span>';
      return;
    }
    renderTodos(todos);
  }
}

function updateTodo() {}

const createTodosItem = (todos) =>
  todos
    .map(
      (todo) =>
        `<form class="p-2 bg-light border d-flex justify-content-between rounded px-3">
            <input value="${todo.nameTask}" name="editTask" class="border border-0 bg-transparent outline w-100" readonly placeholder="Nombre Tarea"/>
              <button type="submit" class="none"><i class="bi bi-check-circle"></i></button>
              <button type="button" class="btn btn-primary btn-sm bi bi-pen"></button>
              <button type="button" data-id="${todo.idTask}" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal" class="btn btn-dark btn-sm bi bi-trash3 ms-2"></button>
        </form>`
    )
    .join('');

todoList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('btn-dark')) {
    // setTask(evt.target.parentElement);
    let id = evt.target.dataset.id;
    confirmDelete.setAttribute('onclick', `deleteTodo(${id})`);
  } else if (evt.target.classList.contains('btn-primary')) {
    evt.target.parentElement.querySelector('button[type="submit"]').className =
      'btn btn-success btn-sm';
    evt.target.className = 'none';
    console.log(evt.target.parentElement.querySelector('input'));
    evt.target.parentElement.querySelector('input').readOnly = false;
    evt.target.parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('send editar');
      let formEditar = new FormData(evt.target.parentElement);
      console.log(formEditar.get('editTask'));
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

// function setTask(obj) {
//   task = {
//     id: obj.querySelector('.btn-dark').dataset.id,
//     task: obj.querySelector('input[name="nameTask"]').value,
//   };
//   console.log(task);
// }
