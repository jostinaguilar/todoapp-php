<?php

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

  public function show()
  {
    echo "Mostrando todo";
  }
}
