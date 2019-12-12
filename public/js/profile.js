/**
 * User data on profile page
 */
$(document).ready(function() {
  $.get("/api/users/get", function(data) {
    var html = $("#profileContainer");
    html.empty();
    if (data.status) {
      var date = new Date(data.message.birthday);
      html
        .append('<div class="row">')
        .append('<div class="col-sm">')
        .append('<div class="card" style="width: 40rem;"></div>')
        .append('<div class="card-header">Your information</div>')
        .append('<p class="card-text">')
        .append("<h6> Username. </h6>")
        .append(data.message.username)
        .append("<h6> Birthday. </h6>")
        .append(formatDate(date))
        .append("</p>")
        .append("</div></div>")
        .append("</br>");
    }
  })
    .done(function() {
      //alert("second success");
    })
    .fail(function() {
      //alert("error");
    });
});
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
