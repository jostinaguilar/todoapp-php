<?php

class View
{
  public function render($view, $data = [])
  {
    $this->data = $data;
    require_once "app/views/{$view}.php";
  }
}
