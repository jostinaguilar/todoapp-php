<?php

class Home extends Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function index()
  {
    require_once "app/models/HomeModel.php";
    $data = $this->getAll();
    $this->view->render("home/index", $data);
  }

  public function getAll()
  {
    $model = new HomeModel();
    return $model->getAll();
  }
}
