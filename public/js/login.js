/**
 * Login function
 */
$(document).ready(function() {
  if (getItemFromSession("username")) {
    $("#loginMenu").addClass("d-none");
    $("#navbarUsername").html("Hello " + getItemFromSession("username"));
    $("#logoutMenu").removeClass("d-none");
    $("#postMenu").removeClass("d-none");
    $("#profileMenu").removeClass("d-none");
    $("#registerMenu").addClass("d-none");
  } else {
    $("#loginMenu").removeClass("d-none");
    $("#navbarUsername").html("Hello You!");
    $("#logoutMenu").addClass("d-none");
    $("#postMenu").addClass("d-none");
    $("#profileMenu").addClass("d-none");
    $("#registerMenu").removeClass("d-none");
  }
  $("#login_btn").click(function() {
    var x = $("#login_form").serializeArray();
    var result = {};

    $.each(x, function(i, field) {
      result[field.name] = field.value;
    });

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
          createSession(response.data);
          window.location.href = origin;
        } else {
          $("#login_msg").removeClass("alert-success");
          $("#login_msg").addClass("alert-danger");
        }
        $("#login_msg").html(response.message);
        console.log(response.data);
      },
      error: function(response) {
        console.log("error");
      }
    });
  });

  //Logout clear session and redirect
  $("#logoutbtn").click(function(e) {
    e.preventDefault();
    $.get("/api/users/logout", function(data) {
      if (data.status) {
        clearSession();
        console.log("successs");
        window.location.href = origin + "/logout";
      }
    });
  });
});

// create session for user
function createSession(user) {
  window.sessionStorage.setItem("username", user.username);
  window.sessionStorage.setItem("email", user.email);
}

// clear session for logout
function clearSession() {
  window.sessionStorage.clear();
}

// save user information in session storage and get them
function getItemFromSession(key) {
  return window.sessionStorage.getItem(key);
}
