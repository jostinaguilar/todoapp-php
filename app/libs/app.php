<?php

require_once "app/controllers/ErrorsController.php";

class App
{
  protected $url = [];
  protected $controller;
  protected $method;
  protected $params;

  public function __construct()
  {
    $this->url = explode("/", $_SERVER["REQUEST_URI"]);
    $this->setController();
    $this->setMethod();
    $this->setParams();
  }

  public function setController()
  {
    $this->controller = empty($this->url[1]) ? "home" : $this->url[1];
  }

  public function setMethod()
  {
    $this->method = empty($this->url[2]) ? null : $this->url[2];
  }

  public function setParams()
  {
    $this->params = empty($this->url[3]) ? null : $this->url[3];
  }

  public function getController()
  {
    return $this->controller;
  }

  public function getMethod()
  {
    return $this->method;
  }

  public function getParams()
  {
    return $this->params;
  }

  public function run()
  {
    $controller = ucfirst($this->getController());
    $method = $this->getMethod();
    $params = $this->getParams();
    $fileController = "app/controllers/{$controller}Controller.php";

    if (file_exists($fileController)) {
      require_once $fileController;
      $controller = new $controller();
      if (isset($method)) {
        if (method_exists($controller, $method)) {
          if (isset($params)) {
            $controller->{$method}($params);
          } else {
            $controller->{$method}();
          }
        } else {
          $notFound = new Errors();
          $notFound->index();
        }
      } else {
        $controller->index();
      }
    } else {
      $notFound = new Errors();
      $notFound->index();
    }
  }
}
