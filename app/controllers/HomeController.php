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
    $this->view->render("home/index");
  }
}
