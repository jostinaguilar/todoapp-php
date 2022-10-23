<?php

class Database
{
  public function connect()
  {
    $con = new mysqli("127.0.0.1", "root", "mysql@LINUX22", "todoapp");
    if ($con->connect_errno) {
      $messageError =  "Fallo al conectar a MySQL: ({$con->connect_errno}) {$con->connect_error}";
      return $messageError;
    }
    return $con;
  }
}
