<?php include_once "app/views/layout/header.php" ?>
<div class="container">
  <div class="col-md-4 m-auto mt-5 pt-4">
    <h1 class="fw-bold text-center mb-4">To Do App</h1>

    <div class="my-4">
      <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#modalCrear">
        <i class="bi bi-plus-circle"></i>
        <span>Crear To Do</span>
      </button>
    </div>
    <div class="d-grid gap-3">
      <?php foreach ($data as $dato) : ?>
        <div class="p-2 bg-light border d-flex justify-content-between rounded px-3">
          <span class="lh-lg"><?= $dato['tarea'] ?></span>
          <div>
            <button class="btn btn-primary btn-sm"><i class="bi bi-pen"></i></button>
            <button class="btn btn-dark btn-sm"><i class="bi bi-trash3"></i></button>
          </div>
        </div>

      <?php endforeach ?>
    </div>
  </div>

  <div class="modal fade" id="modalCrear" tabindex="-1" aria-labelledby="modalCrearTarea" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalCrearTarea">Crear Tarea</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="row g-3 mb-2" action="/home/create" method="POST">
            <div class="d-flex justify-content-between gap-3">
              <input type="text" class="form-control" id="nombreTarea" placeholder="Tarea" name="nombreTarea" autocomplete="off">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <?php include_once "app/views/layout/footer.php" ?>