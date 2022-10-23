<?php include_once "app/views/layout/header.php" ?>
<div class="container">
  <div class="col-md-5 m-auto mt-3 pt-4">
    <h1 class="fw-bold text-center mb-4">To Do App</h1>
    <div class="my-4">
      <input type="text" class="form-control text-center" placeholder="Buscar Tarea" id="searchTask">
    </div>
    <div class="my-4">
      <form method="POST" class="d-flex gap-3" id="formCreate">
        <input type="text" placeholder="Crear nueva Tarea" autocomplete="off" id="nameTask" name="nameTask" class="form-control">
        <button type="submit" class="btn btn-success btn-sm">Crear</button>
      </form>
    </div>
    <div class="d-grid gap-3" id="todoList">
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Advertencia</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ¿Está seguro de eliminar esta tarea?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" id="confirmDelete" class="btn btn-primary" data-bs-dismiss="modal">Eliminar</button>
      </div>
    </div>
  </div>
</div>

<script src="./public/js/todoService.js"></script>
<?php include_once "app/views/layout/footer.php" ?>