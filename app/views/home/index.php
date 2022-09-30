<?php include_once "app/views/layout/header.php" ?>
<div class="container">
  <div class="col-md-5 m-auto mt-3 pt-4">
    <h1 class="fw-bold text-center mb-4">To Do App</h1>
    <div class="my-4">
      <input type="text" class="form-control text-center" placeholder="Buscar Tarea" id="searchTask">
    </div>
    <div class="my-4">
      <form method="POST" class="d-flex gap-3" id="formCreate">
        <input type="text" placeholder="Crear nueva Tarea" autocomplete="off" name="nameTask" class="form-control">
        <button type="submit" class="btn btn-success btn-sm">Crear</button>
      </form>
    </div>
    <div class="d-grid gap-3" id="todoList">
    </div>
  </div>
</div>


<!-- Modal -->
<div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="modalDeleteLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalDeleteLabel">Advertencia</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ¿Estás Seguro de Eliminar esta tarea?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <a class="btn btn-danger" id="confirmDelete">Eliminar</a>
      </div>
    </div>
  </div>
</div>
<script src="./public/js/todoService.js"></script>
<<<<<<< HEAD
<script src="./public/js/default.js"></script>
=======
>>>>>>> 6bfa5c4f3875100b96da898e38310299b9766ebf
<?php include_once "app/views/layout/footer.php" ?>