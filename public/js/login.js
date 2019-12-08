$(document).ready(function() {
  $("#login_btn").click(function() {
    //console.log("anything");
    var x = $("#login_form").serializeArray();
    var result = {};

    $.each(x, function(i, field) {
      result[field.name] = field.value;
    });

    //new function or call to check whether password equals or whatever
    //use name from pug file e.g. password and repeatpassword

    $.ajax({
      url: "/api/users/authenticate",
      type: "POST",
      data: result,

      success: function(response) {
        if (response.status) {
          $("#login_msg").removeClass("alert-danger");
          $("#login_msg").addClass("alert-success");
          var origin = document.location.origin;
          $("#login_form").trigger("reset");
          //store response.data into sessionstorage
          window.location.href = origin;
        } else {
          $("#login_msg").removeClass("alert-success");
          $("#login_msg").addClass("alert-danger");
        }
        $("#login_msg").html(response.message);
      },
      error: function(response) {
        console.log("error");
      }
    });
  });
});
