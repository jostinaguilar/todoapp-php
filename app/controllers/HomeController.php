<?php

require_once "app/models/HomeModel.php";

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

  public function getAll()
  {
    $model = new HomeModel();
    return $model->getAll();
  }

  public function getAllByJSON()
  {
    $model = new HomeModel();
    $data = $model->getAll();
    echo json_encode($data);
  }

  public function create()
  {
    $task =  $this->post("nameTask");
    if (!empty($task)) {
      $model = new HomeModel();
      $res = $model->save($task);
      if ($res) {
        echo json_encode('success');
      } else {
        echo json_encode('error');
      }
    } else {
      echo json_encode('error');
    }
  }

  public function update($params = null)
  {
    $model = new HomeModel();
    $res = $model->update($params, $_POST['editTask']);
    if ($res) {
      echo json_encode('success');
    } else {
      echo json_encode('error');
    }
  }

  public function delete($params = null)
  {
    $model = new HomeModel();
    $res = $model->delete($params);
    echo json_encode('deleted');
  }
}
