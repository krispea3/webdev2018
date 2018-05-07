var input = document.getElementById("todoItem"),
    addButton = document.getElementById("addItem"),
    ul = document.querySelector("ul"),
    error = document.getElementById("error");

function inputLength() {
  return input.value.length;
}

function assignListEntryId(element) {
  element.id = 'listItem' + generateListId();
}

function generateListId() {
  var listCheckboxes = document.getElementsByClassName("listCheckbox");
  var newListItemId = listCheckboxes.length;
  return newListItemId;
}

function createListEntry(element) {
  var listText = input.value;
  var checkBoxId = generateListId() + 1;
  element.innerHTML = '<input type="checkbox" id="checkBox' + checkBoxId + '" class="listCheckbox marginRight10"/>' + listText;
}

function createListElement() {
  var li = document.createElement("li");
  var text = document.createTextNode("");
  li.appendChild(text);
  ul.appendChild(li);
  createListEntry(li);
  assignListEntryId(li);
  uncheckSelectAll();
  input.value = "";
  error.innerHTML = "";
}

function addListItemOnClick() {
  if (inputLength() > 0) {
    createListElement();
  } else {
    errorMessage("addList");
    }
}

function addListItemOnEnter(){
  if (event.key === "Enter") {
    if (inputLength() > 0) {
      createListElement();
    } else {
        errorMessage("addList");
      }
  }
}

function uncheckSelectAll() {
  document.getElementById("checkBoxSelectAll").checked = false;
}

function evaluateCheckBoxes(type){
  var oneChecked = false;
  var checkBoxes = document.getElementsByClassName("listCheckbox");
  for (var i = checkBoxes.length - 1; i >= 0; i--) {
    var checked = checkBoxes[i].checked;
    var checkBoxId = checkBoxes[i].id;
    if (checked) {
      oneChecked = true;
      var li = document.getElementById(checkBoxId).parentElement;
      if (type === "deleteListItem") {
        deleteListItem(li);
      } else if (type == "markAsDone") {
        markListItemDone(li);
        checkBoxes[i].checked = false;
        }
      uncheckSelectAll();
      error.innerHTML = "";
    }
  }
  if (oneChecked === false) {
    errorMessage("select");
  }
}

function deleteListItem(li){
  li.parentElement.removeChild(li);
}

function markListItemDone(li) {
  li.classList.toggle("done");
}

function errorMessage(type) {
  if (type === "addList") {
    error.innerHTML = "Please enter an item to add!";
  } else if (type === "select") {
    error.innerHTML = "Please select an item!";
  }
  error.style.color="red";
}


addButton.addEventListener("click", addListItemOnClick);

input.addEventListener("keypress", addListItemOnEnter);

checkBoxSelectAll.addEventListener("change", function(){
  if (this.checked) {
    var checkBoxes = document.getElementsByClassName("listCheckbox");
    for (var i = 0; i < checkBoxes.length; i++) {
      checkBoxes[i].checked = true;
    }
  } else {
      var checkBoxes = document.getElementsByClassName("listCheckbox");
      for (var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = false;
      }
    }
});

markAsDone.addEventListener("click", function(){
  evaluateCheckBoxes("markAsDone");
});

deleteList.addEventListener("click", function() {
  evaluateCheckBoxes("deleteListItem");
});
