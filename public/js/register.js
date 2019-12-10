$(document).ready(function() {
  $("#register_btn").click(function() {
    //console.log("anything");
    var x = $("#register_form").serializeArray();
    var result = {};

    $.each(x, function(i, field) {
      result[field.name] = field.value;
    });

    $.ajax({
      url: "/api/users/create",
      type: "POST",
      data: result,

      success: function(data) {
        if (data.status) {
          $("#register_msg").removeClass("alert-danger");
          $("#register_msg").addClass("alert-success");
          $("#register_form").trigger("reset");
        } else {
          $("#register_msg").removeClass("alert-success");
          $("#register_msg").addClass("alert-danger");
        }
        $("#register_msg").html(data.message);
      },
      error: function(data) {
        console.log("error");
      }
    });
  });
});
