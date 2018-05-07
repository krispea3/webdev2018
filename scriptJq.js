function addListItem(){
  if ($("#todoItem").val().length > 0) {
    var inputText = $("#todoItem").val();
    var idNbr = $(".listCheckbox").length + 1;
    var htmlSting = '<li id="listItem'+idNbr+'"><input type="checkbox" id="checkBox'+idNbr+'" class="listCheckbox marginRight10"/>'+inputText;
    $("ul").append(htmlSting);
    $("#error").html("");
    $("#todoItem").val("");
  } else {
    $("#error").html("Please enter a Todo item");
  }
}


$("#addItem").click(function(){
  addListItem();
});

$("#todoItem").keypress(function(key){
  if (key.keyCode === 13) {
    addListItem();
  }
});

$("#checkBoxSelectAll").click(function(){
  var checkArr = [];
  if ($(this).is(":checked")){
    $(".listCheckbox").prop("checked", true)
  } else {
    $(".listCheckbox").prop("checked", false)
    }
});

$("#markAsDone").click(function(){
  var oneChecked = false;
  $('.listCheckbox').each(function(i, obj) {
    if ($(this).is(":checked")) {
      oneChecked = true;
      var li = $(this).parent();
      var listId = li.attr("id");
      $("#"+listId).toggleClass("done");
      $(this).prop("checked", false);
      $("#checkBoxSelectAll").prop("checked", false);
    }
  });
  if (!oneChecked) {
    $("#error").html("Please select an item");
  } else {
    $("#error").html("");
  }
});

$("#deleteList").click(function(){
  var oneChecked = false;
  $('.listCheckbox').each(function(i, obj) {
    if ($(this).is(":checked")) {
      oneChecked = true;
      var li = $(this).parent();
      var listId = li.attr("id");
      $("#"+listId).remove();
      $("#checkBoxSelectAll").prop("checked", false);
    }
  });
  if (!oneChecked) {
    $("#error").html("Please select an item");
  } else {
    $("#error").html("");
  }

});
