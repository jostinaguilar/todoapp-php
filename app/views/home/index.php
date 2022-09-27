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
      <?php foreach ($data as $dato) : ?>
        <form action="/home/update/<?= $dato["id"] ?>" method="POST" class="p-2 bg-light border d-flex justify-content-between rounded px-3">
          <input class="border border-0 bg-transparent outline" value="<?= $dato['tarea'] ?>" readonly placeholder="Nombre de Tarea" name="tareaActualizar" />
          <div>
            <button type="submit" class="none"><i class="bi bi-check-circle"></i></button>
            <button type="button" class="btn btn-primary btn-sm bi bi-pen"></button>
            <a href="/home/delete/<?= $dato['id'] ?>" class="btn btn-dark btn-sm"><i class="bi bi-trash3"></i></a>
          </div>
        </form>
      <?php endforeach ?>
    </div>
  </div>
</div>

<?php include_once "app/views/layout/footer.php" ?>