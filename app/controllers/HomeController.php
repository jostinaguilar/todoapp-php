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
    $data = $this->getAll();
    $this->view->render("home/index", $data);
  }

  public function getAll()
  {
    $model = new HomeModel();
    return $model->getAll();
  }

  public function create()
  {
    $tarea =  $this->post("nombreTarea");
    $model = new HomeModel();
    $model->save($tarea);

    header('Location: /');
  }
}
