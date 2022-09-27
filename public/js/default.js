const listaTareas = document.getElementById("listaTareas");

listaTareas.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "BUTTON") {
    let inputUpdate = e.target.parentElement.previousElementSibling;
    inputUpdate.readOnly = false;
    inputUpdate.className =
      "border border-0 bg-transparent outline border-bottom";
    inputUpdate.focus();
    e.target.className = "none";
    let btnUpdate = e.target.previousElementSibling;
    btnUpdate.className = "btn btn-success btn-sm";
  }
});
