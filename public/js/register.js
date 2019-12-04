$(function() {
  //shorthand document.ready function
  $("#register_btn").on("click", function(e) {
    e.preventDefault();
    console.log(JSON.stringify($("#register_form").serializeArray()));
    $.ajax({
      url: "/api/users/create",
      type: "post",
      dataType: "application/json",
      data: $("#register_form").serialize(),
      success: function(data) {
        console.log("success");
      }
    });
  });
});
