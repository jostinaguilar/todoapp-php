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
    echo $this->getController();
    echo $this->getMethod();
  }
}
