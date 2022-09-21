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
    $query = $this->query("SELECT * FROM tareas");
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

  public function save()
  {
    # code...
  }

  public function get($id)
  {
    # code ...
  }

  public function update($id)
  {
    # code...
  }

  public function delete($id)
  {
    # code ...
  }
}
