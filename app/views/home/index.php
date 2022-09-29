<?php include_once "app/views/layout/header.php" ?>
<div class="container">
  <div class="col-md-4 m-auto mt-5 pt-4">
    <h1 class="fw-bold text-center mb-4">To Do App</h1>
    <div class="my-4">
      <form action="/home/create" method="POST" class="d-flex gap-3">
        <input type="text" placeholder="Nombre de la Tarea" autocomplete="off" name="nombreTarea" class="form-control">
        <button type="submit" class="btn btn-success btn-sm">Crear</button>
      </form>
    </div>
    <div class="d-grid gap-3" id="listaTareas">
      <?php foreach ($this->data as $dato) : ?>
        <form action="/home/update/<?= $dato['id'] ?>" method="POST" class="p-2 bg-light border d-flex justify-content-between rounded px-3">
          <input class="border border-0 bg-transparent outline" value="<?= $dato['tarea'] ?>" readonly placeholder="Nombre de Tarea" name="tareaActualizar" />
          <div>
            <button type="submit" class="none"><i class="bi bi-check-circle"></i></button>
            <button type="button" class="btn btn-primary btn-sm bi bi-pen"></button>
            <button type="button" onclick="deleteTask(<?= $dato['id'] ?>)" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#modalDelete"><i class="bi bi-trash3"></i></button>
          </div>
        </form>
      <?php endforeach ?>
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

<?php include_once "app/views/layout/footer.php" ?>