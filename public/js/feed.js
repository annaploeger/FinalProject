$(document).ready(function() {
  $.get("/posts/getAll", function(data) {
    var html = $("#postContainer");
    html.empty();
    if (data.status) {
      if (data.message.length === 0) {
        html.append("There are no posts yet.");
      }
      $.each(data.message, function(index, value) {
        html
          .append('<div class="row">')
          .append('<div class="col-sm">')
          .append(
            '<div class="card text-white bg-secondary mb-3" style="max-width: 100%;">'
          )
          .append('<div class="card-header">Mibo. What´s next.</div>')
          .append('<div class="card-body">')
          .append('<h5 class="card-title">')
          .append(value.headline)
          .append("</h5>")
          .append('<p class="card-text">')
          .append(value.keywords)
          .append("</p>")
          .append('<p class="card-text">')
          .append(value.textposts)
          .append("</p>")
          .append('<p class="card-text">')
          .append(value.username)
          .append("</p>")
          .append("</div></div></div></div>")
          .append("</br>");
      });
    }
  })
    .done(function() {
      //alert("second success");
    })
    .fail(function() {
      alert("error");
    });
});
