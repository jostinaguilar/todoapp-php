<?php include_once "app/views/layout/header.php" ?>
<div class="container mx-auto mt-10">
  <div class="w-96 mx-auto">
    <h1 class="text-4xl font-bold text-center">To Do App</h1>
    <div class="mt-4">
      <input type="text" class="input input-bordered w-full" placeholder="Buscar Tarea" id="searchTask">
    </div>
    <div class="mt-4">
      <form method="POST" class="flex justify-between gap-4 " id="formCreate">
        <div>
          <input type="text" placeholder="Crear nueva Tarea" autocomplete="off" id="nameTask" name="nameTask" class="input input-bordered w-full">
          <label class="label">
            <span class="label-text-alt text-red-500" id="msgError"></span>
          </label>
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>
      </form>
    </div>
    <div class="mt-8" id="todoList">
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal" id="modalDelete">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Advertencia</h3>
    <p class="py-4">¿Está seguro de eliminar este tarea?</p>
    <div class="modal-action">
      <a href="#" class="btn btn-sm">Cancelar</a>
      <a href="#"><button type="button" class="btn btn-sm btn-primary" id="confirmDelete">Confirmar</button></a>
    </div>
  </div>
</div>

<script src="./public/js/todoService.js"></script>
<?php include_once "app/views/layout/footer.php" ?>