function getTodoData() {
  fetch("http://todoapp.test/home/getAllByJSON")
    .then((res) => res.json())
    .then((data) => console.log(data));
}

getTodoData();
