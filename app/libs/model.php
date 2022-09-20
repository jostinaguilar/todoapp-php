<?php

class Model
{
  public function __construct()
  {
    $this->db = new Database();
  }

  public function query($sql)
  {
    return $this->db->connect()->query($sql);
  }
}
