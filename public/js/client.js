$(() => {

  let $main = $('main');

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if(isLoggedIn()) {
    createGroup();
  } else {
    fireworksSplash();
  }

  function createGroup() {
    if(event) event.preventDefault();
    $main.html(`
      <div class="one-third column">&nbsp;</div>
      <div class="one-third column">
      <h2>Create Group</h2>

      <button class="btn btn-primary u-full-width">Create Group</button>
      <button class="btn btn-primary u-full-width">Join Group</button>
      <button class="btn btn-primary u-full-width">Got No Friends</button>
      </div>
      <div class="one-third column">&nbsp;</div>
      `);
    }

    function fireworksSplash() {
      $main.html(`
        <div class="one-third column">&nbsp;</div>
        <div class="one-third column">
        <h2>Welcome to Londons Burning - fireworks display App!</h2>
        <button class ="login loggedOut u-full-width" href= "#">Login</button>
        <button class ="register loggedOut u-full-width" href= "#">Register</button>
        </div>
        <div class="one-third column">&nbsp;</div>`
      ); $('.login').on( "click", showLoginForm);
      $('.register').on('click', showRegisterForm);
    }

    function showLoginForm() {
      if(event) event.preventDefault();
      $main.html(`

        <div class="one-third column">&nbsp;</div>
        <div class="one-third column">

        <h2>Login</h2>
        <form method="post" action="/login">
        <div class="form-group">
        <input class="form-control u-full-width" type="text" name="username" placeholder="Username">
        </div>
        <div class="form-group">
        <input class="form-control u-full-width" type="password" name="password" placeholder="Password">
        </div>
        <button class="btn btn-primary u-full-width">Login</button>
        </form></div>
        <div class="one-third column">&nbsp;</div>
        `);
      }

      function showRegisterForm() {
        if(event) event.preventDefault();
        $main.html(`
          <div class="one-third column">&nbsp;</div>
          <div class="one-third column">
          <h2>Register</h2>
          <form method="post" action="/register">
          <div class="form-group">
          <input class="u-full-width" type="text" name="username" placeholder="Username">
          </div>
          <div class="form-group">
          <input id="addressEntry" class="u-full-width" type="text" name="address" placeholder="Address">
          </div>
          <div class="form-group">
          <input class="u-full-width" type="password" name="password" placeholder="Password">
          </div>
          <div class="form-group">
          <input class="u-full-width" type="password" name="passwordConfirmation" placeholder="Password Confirmation">
          </div>
          <button class="btn btn-primary u-full-width">Register</button>
          </form></div>
          <div class="one-third column">&nbsp;</div>
          <div id="map"></div>
          `);
          initMap();
        }

        $('.logout').on('click', logout);
        function logout() {
          if(event) event.preventDefault();
          localStorage.removeItem('token');
          showLoginForm();
        }

        //Event listener for whenever you click on a form
        $main.on('submit', 'form', handleForm);
        //A function that handles form submissions and goes to the create/join group page if successful
        function handleForm() {
          if(event) event.preventDefault();
          let token = localStorage.getItem('token');
          let $form = $(this);
          let url = $form.attr('action');
          let method = $form.attr('method');
          let data = $form.serialize();
          console.log(url, method, data);
          $.ajax({
            url,
            method,
            data,
            beforeSend: function(jqXHR) {
              if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
            }
          }).done((data) => {
            if(data.token) localStorage.setItem('token', data.token);
            createGroup();
          }).fail(fireworksSplash);
        }

        var map;
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 51.5287718, lng: -0.2416791},
            zoom: 13,
            mapTypeControl: false
          });
          var addressAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById('addressEntry'),{
              componentRestrictions: {
                country: "GB"
              }
            });
            addressAutocomplete.bindTo('bounds', map);
            addressAutocomplete.addListener('place_changed', function() {
              let latLng = addressAutocomplete.getPlace().geometry.location.toJSON();
            });
          }

            // NOT CURRENTLY IN USE ANYWHERE
            // function showProfile() {
            //   if(event) event.preventDefault();
            //   $main.html(`
            //     <div class="one-third column">&nbsp;</div>
            //     <div class="one-third column">
            //     <h2>Welcome</h2>
            //     <p> Two ways to use this App.
            //     1. Give your group name to your friends. So they can register
            //     and join the same group.<br>
            //     2.Enter the other memebers details yourself, provided you know the address of where they will be travelling from.<br>
            //     3. Alternatively, plan your own individual route.
            //     <button class="btn btn-primary u-full-width">Find Firework displays</button>
            //     <button class="btn btn-primary u-full-width">See selected</button>
            //     </div>
            //     <div class="one-third column">&nbsp;</div>
            //     `);
            //   }

                //Not in use yet
                // function getFireworksDisplay() {
                //   console.log("H!");
                //   if(event) event.preventDefault();
                //   let token = localStorage.getItem('token');
                //   $.ajax({
                //     url: '/fireworks',
                //     method: 'get',
                //     beforeSend: function(jqXHR) {
                //       if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
                //     }
                //   })
                //   .done(showDisplays)
                //   .fail(fireworksSplash);
                // }

                  });

                  // api call to weather function- need to include logo but can't scale yet- '<img src="images/wundergroundLogo_4c_horz2.jpg"/>'

                  // function weatherApiCall() {
                  //
                  //   $.ajax({
                  //     url: "http://api.wunderground.com/api/b9fbef563cd64e2c/conditions/q/GB/London.json",
                  //     dataType: "json",
                  //     success: function(url) {
                  //       console.log(url);
                  //       var temp_c = url.current_observation.temp_c;
                  //       var outlook = url.current_observation.icon;
                  //       var precip = url.current_observation.precip_today_metric;
                  //       var precipPic = url.current_observation.icon_url;
                  //       $("ul.nav > li.weatherApi").html("London | " + temp_c + "ºC" + " | " + precip + "mm " + " | " + outlook + " | " + '<img src="'+ precipPic +' "/>' + " | ");
                  //     }
                  //   });
                  // }
