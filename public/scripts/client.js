//we want to show the main page by default on load
showMain();
toggleMenu();

$("#home-button").click((e) => {
  e.preventDefault();
  //only show the home page
  $("#home-page").show();
  $("#about-page").hide();
  $("#subscribe-page").hide();
  $("#contact-page").hide();
  $("#login-page").hide();
  //set home button as active
  $("#home-button").addClass("active");
  $("#about-button").removeClass("active");
  $("#subscribe-button").removeClass("active");
  $("#contact-button").removeClass("active");
  $("#login-button").removeClass("active");
});

$("#about-button").click((e) => {
  e.preventDefault();
  //only show the about page
  $("#home-page").hide();
  $("#about-page").show();
  $("#subscribe-page").hide();
  $("#contact-page").hide();
  $("#login-page").hide();
  //set about button as active
  $("#home-button").removeClass("active");
  $("#about-button").addClass("active");
  $("#subscribe-button").removeClass("active");
  $("#contact-button").removeClass("active");
  $("#login-button").removeClass("active");
});

$("#subscribe-button").click((e) => {
  e.preventDefault();
  //only show the subscribe page
  $("#home-page").hide();
  $("#about-page").hide();
  $("#subscribe-page").show();
  $("#contact-page").hide();
  $("#login-page").hide();
  //set subscribe button as active
  $("#home-button").removeClass("active");
  $("#about-button").removeClass("active");
  $("#subscribe-button").addClass("active");
  $("#contact-button").removeClass("active");
  $("#login-button").removeClass("active");
});

$("#contact-button").click((e) => {
  e.preventDefault();
  //only show the subscribe page
  $("#home-page").hide();
  $("#about-page").hide();
  $("#subscribe-page").hide();
  $("#contact-page").show();
  $("#login-page").hide();
  //set subscribe button as active
  $("#home-button").removeClass("active");
  $("#about-button").removeClass("active");
  $("#subscribe-button").removeClass("active");
  $("#contact-button").addClass("active");
  $("#login-button").removeClass("active");
});

$("#login-button").click((e) => {
  e.preventDefault();
  //only show the subscribe page
  $("#home-page").hide();
  $("#about-page").hide();
  $("#subscribe-page").hide();
  $("#contact-page").hide();
  $("#login-page").show();
  //set subscribe button as active
  $("#home-button").removeClass("active");
  $("#about-button").removeClass("active");
  $("#subscribe-button").removeClass("active");
  $("#contact-button").removeClass("active");
  $("#login-button").addClass("active");
});

$("#logout-button").click((e) => {
  $.ajax({
    method: "GET",
    url: "logout",
    success: (res) => {
      if(res.success) {
        alert("You have been logged out");
        showMain();
        toggleMenu();
      } else {
        alert(res.message);
      }
    }
  })
})

$("#subscribe-form").submit((e) => {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "subscribe",
    data: $("#subscribe-form").serialize(),
    success: (res) => {
      if(res.success) {
        alert(res.message);
        showMain();
        toggleMenu();
      } else {
        alert(res.message);
      }
    }
  })
});

$("#login-form").submit((e) => {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "login",
    data: $("#login-form").serialize(),
    success: (res) => {
      if(res.success) {
        alert("Successful login");
        showMain();
        toggleMenu();
      } else {
        alert(res.message);
      }
    }
  })
})

function toggleMenu() {
  $.ajax({
    method: "GET",
    url: "isLoggedIn",
    success: (res) => {
      $("#home-button").show();
      $("#about-button").show();
      $("#contact-button").show();
      if(res) {
        $("#subscribe-button").hide();
        $("#login-button").hide();
        $("#logout-button").show();
      } else {
        $("#subscribe-button").show();
        $("#login-button").show();
        $("#logout-button").hide();
      }
    }
  })
}

function showMain() {
  $("#home-page").show();
  $("#about-page").hide();
  $("#subscribe-page").hide();
  $("#contact-page").hide();
  $("#login-page").hide();
  $("#logout-button").hide();
  $("#home-button").addClass("active");
  $("#about-button").removeClass("active");
  $("#subscribe-button").removeClass("active");
  $("#contact-button").removeClass("active");
  $("#login-button").removeClass("active");
}
