//$(function() {
/**$("#register_btn").on("click", function(e) {
    e.preventDefault();
    //var form = JSON.stringify($("#register_form").serializeArray());
    console.log(JSON.stringify($("#register_form").serializeArray()));
    */

$(document).ready(function() {
  $("#register_btn").click(function() {
    //console.log("anything");
    var x = $("#register_form").serializeArray();
    var result = {};

    $.each(x, function(i, field) {
      result[field.name] = field.value;
    });

    //new function or call to check whether password equals or whatever
    //use name from pug file e.g. password and repeatpassword

    $.ajax({
      url: "/api/users/create",
      type: "POST",
      data: result,

      success: function(data) {
        console.log("success");
        //console.log(data);
        //alert(data);
      },
      error: function(data) {
        console.log("error");
      }
    });
    //console.log(result);
  });
});
//});
