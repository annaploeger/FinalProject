$(document).ready(function() {
  $("#posts_btn").click(function() {
    //console.log("anything");
    var x = $("#posts_form").serializeArray();
    var result = {};

    $.each(x, function(i, field) {
      result[field.name] = field.value;
    });

    $.ajax({
      url: "/posts/create",
      type: "POST",
      data: result,

      success: function(data) {
        if (data.status) {
          $("#posts_msg").removeClass("alert-danger");
          $("#posts_msg").addClass("alert-success");
          //var origin = document.location.origin;
          $("#posts_form").trigger("reset");
          //window.location.href = origin;
        } else {
          $("#posts_msg").removeClass("alert-success");
          $("#posts_msg").addClass("alert-danger");
        }
        $("#posts_msg").html(data.message);
      },
      error: function(data) {
        console.log("error");
      }
    });
  });
});
