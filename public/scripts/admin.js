$("#blog-body").keyup(() => {
  $("#body").html($("#blog-body").val());
});

$("#blog-title").keyup(() => {
  $("#title").html($("#blog-title").val());
});

$("#blog-form").submit((e) => {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "newPost",
    data: $("#blog-form").serialize(),
    success: (res) => {
      alert(res.message);
      if (res.success) {
        $("#blog-form").trigger("reset");
      }
    }
  })
})
