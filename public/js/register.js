$(function() {
  /**$("#register_btn").on("click", function(e) {
    e.preventDefault();
    //var form = JSON.stringify($("#register_form").serializeArray());
    console.log(JSON.stringify($("#register_form").serializeArray()));
    */

  $(document).ready(function() {
    $("#register_btn").click(function() {
      var x = $("#register_form").serializeArray();
      var result = {};

      $.each(x, function(i, field) {
        result[field.name] = field.value;
      });

      $.ajax({
        url: "/api/users/create",
        type: "POST",
        dataType: "application/json",
        data: result,

        success: function(data) {
          //console.log(data);
        }
      });
      //console.log(result);
    });
  });
});
