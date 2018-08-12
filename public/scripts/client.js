//we want to show the main page by default on load
$("#about-page").hide();
$("#subscribe-page").hide();
$("#contact-page").hide();
$("#home-button").addClass("active");

$("#home-button").click((e) => {
  e.preventDefault();
  //only show the home page
  $("#home-page").show();
  $("#about-page").hide();
  $("#subscribe-page").hide();
  $("#contact-page").hide();
  //set home button as active
  $("#home-button").addClass("active");
  $("#about-button").removeClass("active");
  $("#subscribe-button").removeClass("active");
  $("#contact-button").removeClass("active");
});

$("#about-button").click((e) => {
  e.preventDefault();
  //only show the about page
  $("#home-page").hide();
  $("#about-page").show();
  $("#subscribe-page").hide();
  $("#contact-page").hide();
  //set about button as active
  $("#home-button").removeClass("active");
  $("#about-button").addClass("active");
  $("#subscribe-button").removeClass("active");
  $("#contact-button").removeClass("active");
});

$("#subscribe-button").click((e) => {
  e.preventDefault();
  //only show the subscribe page
  $("#home-page").hide();
  $("#about-page").hide();
  $("#subscribe-page").show();
  $("#contact-page").hide();
  //set subscribe button as active
  $("#home-button").removeClass("active");
  $("#about-button").removeClass("active");
  $("#subscribe-button").addClass("active");
  $("#contact-button").removeClass("active");
});

$("#contact-button").click((e) => {
  e.preventDefault();
  //only show the subscribe page
  $("#home-page").hide();
  $("#about-page").hide();
  $("#subscribe-page").hide();
  $("#contact-page").show();
  //set subscribe button as active
  $("#home-button").removeClass("active");
  $("#about-button").removeClass("active");
  $("#subscribe-button").removeClass("active");
  $("#contact-button").addClass("active");
});

$("#subscribe-form").submit(function(e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/subscribe",
    data: $("#subscribe-form").serialize(),
    success: (res) => {
      console.log("Hello from the server");
    }
  })
});
