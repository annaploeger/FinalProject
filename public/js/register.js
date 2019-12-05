$(function() {
  $("#register_btn").on("click", function(e) {
    e.preventDefault();
    //var form = JSON.stringify($("#register_form").serializeArray());
    console.log(JSON.stringify($("#register_form").serializeArray()));

    $.ajax({
      url: "/api/users/create",
      type: "POST",
      dataType: "application/json",
      data: $("#register_form").serializeArray(),

      success: function(data) {
        console.log(data["username"]["email"]["birthday"]["password"]);
      }
    });
  });
});
