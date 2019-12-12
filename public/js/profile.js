/**
 * User data on profile page
 */
$(document).ready(function() {
  $.get("/user/get", function(data) {
    var html = $("#profileContainer");
    html.empty();
    if (data.status) {
      $.each(data.message, function(index, value) {
        html
          .append('<div class="row">')
          .append('<div class="col-sm">')
          .append('<div class="card" style="width: 40rem;"></div>')
          .append('<div class="card-header">Your information</div>')
          .append('<p class="card-text">')
          .append("<h6> Username. </h6>")
          .append(value.username)
          .append("<h6> Birthday. </h6>")
          .append(value.birthday)
          .append("</p>")
          .append("</div></div>")
          .append("</br>");
      });
    }
  })
    .done(function() {
      //alert("second success");
    })
    .fail(function() {
      //alert("error");
    });
});
