<?php

class Controller
{
  public function __construct()
  {
    $this->view = new View();
  }

  public function get($value)
  {
    return $_GET[$value];
  }

  public function post($value)
  {
    return $_POST[$value];
  }
}
