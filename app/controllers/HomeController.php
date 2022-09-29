<?php

require_once "app/models/HomeModel.php";

class Home extends Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function index()
  {
    $this->view->render("home/index");
  }

  public function getAll()
  {
    $model = new HomeModel();
    return $model->getAll();
  }

  public function getAllByJSON()
  {
    $model = new HomeModel();
    $data = $model->getAll();
    echo json_encode($data);
  }

  public function create()
  {
    $tarea =  $this->post("nombreTarea");
    if (!empty($tarea)) {
      $model = new HomeModel();
      $res = $model->save($tarea);
      if ($res == 1) {
        header('Location: /');
      }
      header('Location: /');
    }
    header('Location: /');
  }

  public function update($params = null)
  {
    $model = new HomeModel();
    $model->update($params, $_POST['tareaActualizar']);
    header('Location: /');
  }

  public function delete($params = null)
  {
    $model = new HomeModel();
    $model->delete($params);
    header('Location: /');
  }
}
