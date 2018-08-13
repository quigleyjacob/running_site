//we want to show the main page by default on load
showMain();
toggleMenu();
getPosts();

$("#home-button").click((e) => {
  e.preventDefault();
  //only show the home page
  $("#home-page").show();
  $("#about-page").hide();
  $("#subscribe-page").hide();
  $("#contact-page").hide();
  $("#login-page").hide();
  $("#post-page").hide();
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
  $("#post-page").hide();
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
  $("#post-page").hide();
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
  $("#post-page").hide();
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
  $("#post-page").hide();
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
  $("#post-page").hide();
  $("#logout-button").hide();
  $("#home-button").addClass("active");
  $("#about-button").removeClass("active");
  $("#subscribe-button").removeClass("active");
  $("#contact-button").removeClass("active");
  $("#login-button").removeClass("active");
}

function showPost(obj) {
  $("#home-page").hide();
  $("#about-page").hide();
  $("#subscribe-page").hide();
  $("#contact-page").hide();
  $("#login-page").hide();
  $("#post-page").show();
  $("#logout-button").hide();
  $("#home-button").removeClass("active");
  $("#about-button").removeClass("active");
  $("#subscribe-button").removeClass("active");
  $("#contact-button").removeClass("active");
  $("#login-button").removeClass("active");
  $("#post-title").html(obj.title);
  $("#post-body").html(obj.body);
  $("#post-author").html("By " + obj.author.username);
}

$("#blog-form").submit((e) => {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "new",
    data: $("#blog-form").serialize(),
    success: (res) => {
      console.log(res);
    }
  })
})

function getPosts() {
  $.ajax({
    method: "GET",
    url: "getPosts",
    success: (res) => {
      let posts = "";
      res.forEach((post) => {
        posts += addListItem(post);
      })
      $("#home-page").html(posts);
      $(".blog-post").click(viewPost);
    }
  })
}

function addListItem(obj) {
  let str = `
  <div class="blog-post">
    <div class="hidden">`+obj._id+`</div>
    <div class="blog-post-title">
      `+obj.title+`
      <div class="blog-post-author">
        By `+obj.author.username+`
      </div>
    </div>
    `+obj.body.slice(0,100)+`...
  </div>
  `;
  return str;
}

function viewPost(e) {
  e.preventDefault();
  $.ajax({
    method: "GET",
    url: "getPost",
    data: {id:this.children[0].textContent},
    success: (res) => {
      showPost(res);
      //console.log(res);
    }
  })
}
