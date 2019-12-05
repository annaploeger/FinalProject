import { createUser } from "../../service/user";

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
      $("#results").append(JSON.stringify(result));
      console.log(result);
    });
  });
  /** 
  $.ajax({
    url: "/api/users/create",
    type: "POST",
    dataType: "application/json",
    data: $("#register_form").serializeArray(),

    success: function(data) {
      console.log(data["username"]["email"]["birthday"]["password"]);
    }
  });
  */
});
