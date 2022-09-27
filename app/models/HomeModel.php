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
        $item = ["id" => $row["id_tarea"], "tarea" => $row["nombre_tarea"]];
        array_push($items, $item);
      }
      return $items;
    } else {
      return ["msg" => "error"];
    }
  }

  public function save($tarea)
  {
    $this->query("INSERT INTO tareas (nombre_tarea) VALUES ('{$tarea}')");
  }

  public function get($id)
  {
    # code ...
  }

  public function update($id, $name)
  {
    $this->query("UPDATE tareas SET nombre_tarea = '{$name}' WHERE id_tarea = '{$id}'");
  }

  public function delete($id)
  {
    $this->query("DELETE FROM tareas WHERE id_tarea = '{$id}'");
  }
}
