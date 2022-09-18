<?php

class App
{
  protected $url = [];
  protected $controller;
  protected $method;

  public function __construct()
  {
    $this->url = explode("/", $_SERVER["REQUEST_URI"]);
    $this->setController();
    $this->setMethod();
  }

  public function setController()
  {
    $this->controller = empty($this->url[1]) ? "home" : $this->url[1];
  }

  public function setMethod()
  {
    $this->method = empty($this->url[2]) ? "index" : $this->url[2];
  }

  public function getController()
  {
    return $this->controller;
  }

  public function getMethod()
  {
    return $this->method;
  }

  public function run()
  {
    $controller = ucfirst($this->getController());
    $method = $this->getMethod();
    $fileController = "app/controllers/{$controller}Controller.php";

    if (file_exists($fileController)) {
      require_once $fileController;
      $controller = new $controller();
      $controller->$method();
    } else {
      require_once "app/controllers/ErrorsController.php";
      $notFound = new Errors();
      $notFound->index();
    }
  }
}
