<?php

class HomeModel extends Model
{
  public function __construct()
  {
    parent::__construct();
  }

  public function getAll()
  {
    $items = [];
    $query = $this->query("SELECT * FROM tareas ORDER BY id_tarea ASC");
    if ($query) {
      while ($row = mysqli_fetch_array($query)) {
        $item = ["idTask" => $row["id_tarea"], "nameTask" => $row["nombre_tarea"]];
        array_push($items, $item);
      }
      return $items;
    } else {
      return ["msg" => "error"];
    }
  }

  public function save($tarea)
  {
    $query = $this->query("INSERT INTO tareas (nombre_tarea) VALUES ('{$tarea}')");
    if ($query) {
      return true;
    } else {
      return false;
    }
  }

  public function get($id)
  {
    # code ...
  }

  public function update($id, $name)
  {
    $query = $this->query("UPDATE tareas SET nombre_tarea = '{$name}' WHERE id_tarea = '{$id}'");
    if ($query) {
      return true;
    } else {
      return false;
    }
  }

  public function delete($id)
  {
    $query = $this->query("DELETE FROM tareas WHERE id_tarea = '{$id}'");
    if ($query) {
      return true;
    } else {
      return false;
    }
  }
}
