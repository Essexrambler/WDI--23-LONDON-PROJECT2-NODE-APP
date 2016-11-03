$(() => {

  let $main = $('main');
  let currentUsername;
  let currentUsergroup;
  let currentUserId;
  let currentUserData;
  let fireworksData;
  //The current logged in user's lattitude.
  let currentuserlat;
  //The current logged in user's lattitude.
  let currentuserlng;
  let currentusertraveltimes =[];
  //Users who match on groupname (An object/array).
  let usersInMyGroup =[];
  let totalTravelimesOfAllDisplays = [];
  let totalTravelTimesForGroup = [];
  let currentDisplayFullData =[];
  let totalTravelTimePerDisplay=[];
  let currentDisplayID;
  let finalDisplayIndex;

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }


  if(isLoggedIn()) {
    showProfile();
  } else {
    fireworksSplash();
  }

  $main.on('submit', 'form.join-group', getUsers);

  function getUsers(event) {
    if(event) event.preventDefault();
    let form = $(this);
    currentUsergroup = form.find('input[name="groupname"]').val();
    let token = localStorage.getItem('token');
    $.ajax({
      url: "/users",
      method: "get",
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    }).done((users) => {
      checkForExistingGroup(users, currentUsergroup);
      // console.log(users);
    });
  }

  function checkForExistingGroup(users, currentUsergroup){
  let userId = localStorage.getItem('userId');
   let token = localStorage.getItem('token');
   let $form = $(".join-group");
   let data = $form.serialize();
   let match = false;

    users.forEach((user) => {
      if(user.groupname == currentUsergroup) {
        match = true;
      }
    });

    if (match === true) {
      alert("SUCCESS!!!");
      //console.log("check", data);
      $.ajax({
        url:`/users/${userId}`,
        method:"put",
        data,
        beforeSend: function(jqXHR) {
          if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
          }
      }).done((data) => {
       //console.log(data);
       currentUserData = data;
       showProfile();
    });
  } else {
      alert("Group name not found, please try again");
    }
  }



  function createGroup() {
     if(event) event.preventDefault();
     $main.html(`
       <div class="one-third column">&nbsp;</div>
       <div class="one-third column">
         <h2>Welcome to the Fireworks Finder App</h2>
         In order to this app you must create or join a group!<br>
         Friends are good for you, they make you happy (sometimes!).
         If you already have a group go straight to your profile.
         <button class="btn btn-primary u-full-width create">Create Group</button>
         <button class="btn btn-primary u-full-width join">Join Group</button>
         <button class="btn btn-primary u-full-width profile">Go to Profile</button>
       </div>
       <div class="one-third column">&nbsp;</div>
     `);
     $('.create').on( "click", createNewGroup);
     $('.join').on( "click", joinGroup);
     $('.profile').on( "click", showProfile);
  }

  function joinGroup() {
    if(event) event.preventDefault();
    let userId = localStorage.getItem('userId');
    $main.html(`
      <div class="one-third column">&nbsp;</div>
      <div class="one-third column">
        <h2>Join Group</h2>

        <form method="put" action="/users/${userId}" class="join-group">
          <input class="form-control u-full-width" type="text" name="groupname" placeholder="Enter group name">
          <button class="btn btn-primary u-full-width profile">submit</button>
          <button class="btn btn-primary u-full-width back">Back</button>
          <button class="btn btn-primary u-full-width profile">Go To Profile</button>
        </form>
      </div>
      <div class="one-third column">&nbsp;</div>
    `);
    $('.profile').on('click', showProfile);
    $('.back').on('click', createGroup);
  }

  function createNewGroup() {
    if(event) event.preventDefault();

    let userId = localStorage.getItem('userId');
    $main.html(`
      <div class="one-third column">&nbsp;</div>
      <div class="one-third column">
        <h2>Create New Group</h2>

        <form method="put" action="/users/${userId}" class="new-group">
          <input class="form-control u-full-width" type="text" name="groupname" placeholder="Group name">
          <button class="btn btn-primary u-full-width profile">Submit</button>
          <button class="btn btn-primary u-full-width back">Back</button>
        </form>
      </div>
      <div class="one-third column">&nbsp;</div>
    `);
    $('.profile').on('click', handleGroupForm);
    $('.back').on('click', createGroup);

  }

  function fireworksSplash() {
    if(event) event.preventDefault();
    $main.html(`
      <div class="one-third column">&nbsp;</div>
      <div class="one-third column">
        <h2>Welcome to Londons Burning - fireworks display App!</h2>
        <button class ="login loggedOut u-full-width" href= "#">Login</button>
        <button class ="register loggedOut u-full-width" href= "#">Register</button>
      </div>
      <div class="one-third column">&nbsp;</div>`
    );
    $('.login').on( "click", showLoginForm);
    $('.register').on('click', showRegisterForm);
  }

  function showProfile() {
  //  getFireworksDisplayData();
    if(event) event.preventDefault();
    $main.html(`
      <div class="one-third column">&nbsp</div>
      <div class="one-third column">
        <h2>Your Profile</h2>
        <p> Findyour group's most convenient fireworks display by clicking the button below!!!</p>
        <br>
        <button class="btn btn-primary u-full-width displayfirework">Find Firework displays</button>
        <img src="/images/Fireworks-Photo.jpg" height="350" width="319">
      </div>
      <div class="one-third column">&nbsp</div>
    `);
    $('.displayfirework').on('click', getFireworksDisplayData);
  }

  function initMap() {
    var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#FFFFFF"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"blue"},{"lightness":17}]}, {"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e74b12"},{"lightness":17}]}];

    var image = './images/fireworks100.png';

    let map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: currentDisplayFullData.location.lat, lng: currentDisplayFullData.location.lng },
      styles: styles,
      mapTypeControl: false,
      zoom: 12
      });

    let marker = new google.maps.Marker({
      map: map,
      position: { lat: currentDisplayFullData.location.lat, lng: currentDisplayFullData.location.lng },
      title: `${currentDisplayFullData.locationName}`,
      icon: image,
      animation: google.maps.Animation.DROP,
    });
  }

  function fireworkListingsPage () {
    let finalDisplayIndex = 0;

    function showPreviousDisplay () {
      if (finalDisplayIndex === 0) {
        finalDisplayIndex = 46;
      }
      else {
      finalDisplayIndex--;
      }
      renderListingsPage();
    }

    function showNextDisplay () {
      if (finalDisplayIndex === 46) {
        finalDisplayIndex = 0;
      }
      else {
      finalDisplayIndex++;
      }
      renderListingsPage();
    }

    renderListingsPage();

    function renderListingsPage () {
      //Get all fireworks information for the fireworks ID at our index 0... note that this is NOT the index within fireworks itself.
      currentDisplayID = totalTravelTimesForGroup[finalDisplayIndex].displayid;

      $.ajax({
        method: 'get',
        url: `/fireworks/${currentDisplayID}`
      }).done((data) => {
        currentDisplayFullData = data;
        console.log(currentDisplayFullData);

      //console.log('Initial LatLng', initialLat, initialLng);

      if(event) event.preventDefault();
      $main.html(`
        <div class="row">
          <div class="four column">
            <button class="btn btn-primary u-half-width previousDisplay">Previous Display</button>
          </div>
          <div class="four column">
          </div>
          <div class="four column">
            <button class="btn btn-primary u-half-width nextDisplay">Next Display</button>
          </div>
        </div>

        <div class="one-third column">&nbsp
        </div>
        <div class="one-third column">
          <h4>${currentDisplayFullData.title}</h4>
          <div id="map"></div>
          <p>Location: ${currentDisplayFullData.locationName}</p>
          <p>Opens at: ${currentDisplayFullData.openTime}</p>
          <p>Display starts at: ${currentDisplayFullData.startTime}</p>
          <p>Adult cost from: £${currentDisplayFullData.adultCostFrom}</p>
            <button class="btn btn-primary u-full-width back">Back</button>
      <div class="one-third column">&nbsp</div>`);
      $('.back').on('click', showProfile);
      $('.previousDisplay').on('click', showPreviousDisplay);
      $('.nextDisplay').on('click', showNextDisplay);

      initMap();
    });
  }
}

  // function findDisplay () {
  //   if(event) event.preventDefault();
  //   let userId = localStorage.getItem('userId');
  //     $main.html(`
  //       <div class="one-third column">&nbsp;</div>
  //       <div class="one-third column">
  //         <h2>Find A Display</h2>
  //         <img style = "border:2px solid white" src ="/images/FE-Heart-Fireworks.png" height="200" width="200">
  //         <button class="btn btn-primary u-full-width display">Find A Display</button>
  //         <button class="btn btn-primary u-full-width profile">Back to profile</button>
  //       </div>
  //       <div class="one-third column">&nbsp;</div>
  //       `);
  //   $('.display').on('submit', 'form', findDisplay);
  //   $('.profile').on( "click", showProfile);
  // }

  function showLoginForm() {
    if(event) event.preventDefault();
    $main.html(`
      <div class="one-third column">&nbsp;</div>
      <div class="one-third column">
        <h2>Login</h2>
        <form method="post" action="/login" class="login">
          <div class="form-group">
            <input class="form-control u-full-width" type="text" name="username" placeholder="Username">
          </div>
          <div class="form-group">
            <input class="form-control u-full-width" type="password" name="password" placeholder="Password">
          </div>
          <button class="btn btn-primary u-full-width">Login</button>
          <button class="btn btn-primary u-full-width back">Back</button>
        </form>
      </div>
      <div class="one-third column">&nbsp;</div>
    `);
    $('.back').on('click', fireworksSplash);
  }

  function showRegisterForm() {
    if(event) event.preventDefault();
    $main.html(`
      <div class="one-third column">&nbsp;</div>
      <div class="one-third column">
        <h2>Register</h2>
        <form method="post" action="/register" class="auth">
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
          <div class="form-group">
            <input type="hidden" name="location[lat]">
            <input type="hidden" name="location[lng]">
          </div>
          <button class="btn btn-primary u-full-width">Register</button>
          <button class="btn btn-primary u-full-width back">Back</button>
        </form>
      </div>
      <div class="one-third column">&nbsp;</div>
    `);
    $('.back').on('click', fireworksSplash);
    initAutocomplete();
  }

  $('.logout').on('click', logout);

  function logout() {
    if(event) event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    fireworksSplash();
  }

  //Event listener for whenever you click on a form
  $main.on('submit', 'form.auth', handleForm);
  $main.on('submit', 'form.login', handleLoginForm);
  $main.on('submit', 'form.new-group', handleGroupForm);
  //A function that handles form submissions and goes to the create/join group page if successful
  function handleForm() {
    if(event) event.preventDefault();
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    let $form = $(this);
    let url = $form.attr('action');
    let method = $form.attr('method');
    let data = $form.serialize();
    //console.log(url, method, data);
    $.ajax({
      url,
      method,
      data,
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    }).done((data) => {
      if(data.token) localStorage.setItem('token', data.token);
      if(data.user._id) localStorage.setItem('userId', data.user._id);
      let currentUsername = data.user.username;
      let currentUsergroup = data.user.groupname;
      createGroup();
    }).fail(fireworksSplash);
  }

  function handleLoginForm() {
    if(event) event.preventDefault();
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    let $form = $(this);
    let url = $form.attr('action');
    let method = $form.attr('method');
    let data = $form.serialize();
    //console.log(url, method, data);
    $.ajax({
      url,
      method,
      data,
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    }).done((data) => {
      if(data.token) localStorage.setItem('token', data.token);
      if(data.user._id) localStorage.setItem('userId', data.user._id);
      let currentUsername = data.user.username;
      let currentUsergroup = data.user.groupname;
      showProfile();
    }).fail(fireworksSplash);
  }


  function handleGroupForm() {
    if(event) event.preventDefault();
    let token = localStorage.getItem('token');
    let $form = $(this);
    let url = $form.attr('action');
    let method = $form.attr('method');
    let data = $form.serialize();
    //console.log(url, method, data);
    $.ajax({
      url,
      method,
      data,
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    }).done((data) => {
      //console.log("data:", data);
      showProfile();
    }).fail((err) => {
      //console.log(err);
      fireworksSplash();
    });
  }

  let latLng;
  function initAutocomplete() {
    let bounds = new google.maps.LatLngBounds({
      lat: 51.6,
      lng: 0.12
    },{
      lat: 51.3,
      lng: -0.44
    });

    let addressEntry = document.getElementById('addressEntry');
    let addressAutocomplete = new google.maps.places.Autocomplete(addressEntry, {
      componentRestrictions: {
        country: "GB"
      },
      bounds: bounds
    });
    // addressAutocomplete.bindTo('bounds', bounds);
    addressAutocomplete.addListener('place_changed', function() {
      latLng = addressAutocomplete.getPlace().geometry.location.toJSON();
      $('form input[name="location[lat]"]').val(latLng.lat);
      $('form input[name="location[lng]"]').val(latLng.lng);
    });
  }

  function getFireworksDisplayData() {
    $.ajax({
      method: "GET",
      url: "/fireworks",
    }).done((data) => {
      fireworksData = data;
      getCurrentUser();
    });
  }

  function getCurrentUser () {
    let token = localStorage.getItem('token');
    $.ajax({
      method: "GET",
      url: `/users/${localStorage.getItem('userId')}`,
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    }).done((data) => {
      currentuserlat = data.location.lat;
      currentuserlng = data.location.lng;
      currentUserData = data;
      currentUsergroup = data.groupname;// Do we need to enter the current username as their group if they haven't joined a group?
      getUserDisplayTravelTimes();
    });
  }

  function getUserDisplayTravelTimes() {
    let numberOfDisplays = fireworksData.length;
    let counter = 0;
    fireworksData.forEach(function(display) {
      $.ajax({
        method: "GET",
        url: "/googlemaps",
        data: {
          origins: `${currentuserlat},${currentuserlng}`,
          destinations: `${display.location.lat},${display.location.lng}`
        }
      }).done((data) => {
        counter++;
        //console.log(display);
        let tripDistance = data.rows[0].elements[0].distance.value;
        let tripDuration = data.rows[0].elements[0].duration.value;
        let individualDisplayId = display._id;
        let values = {
          displayid: individualDisplayId,
          usertraveltime: tripDuration,
          userdistance: tripDistance
        };
        currentusertraveltimes.push(values);
        if(counter === numberOfDisplays) {
            //console.log(currentusertraveltimes);
            putCurrentUserTravelTimesIntoArray();
        }
//        console.log(`${tripDistance}m & ${tripDuration}s for display ID ${display._id}`);
      });
    });
  }

  function putCurrentUserTravelTimesIntoArray () {
    let token = localStorage.getItem('token');
    $.ajax({
      method: "PUT",
      url: `/users/${localStorage.getItem('userId')}`,
      data: { currentusertraveltimes: currentusertraveltimes },
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    }).done((data) => {
      //console.log('user array successfully PUT into database');
      putUsersOfGroupInAnArray();
    });
  }

  function putUsersOfGroupInAnArray () {
    let token = localStorage.getItem('token');
    //console.log(currentUsergroup);
    $.ajax({
      method: "GET",
      url: `/group/${currentUsergroup}`,
      beforeSend: function(jqXHR) {
        if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
      }
    }).done((data) => {
      usersInMyGroup = data;
      console.log(usersInMyGroup);
      calculateTotalTravelTimesPerDisplay();
    });
  }

  function calculateTotalTravelTimesPerDisplay () {
    let displayData = usersInMyGroup[0].currentusertraveltimes;
    let numberOfDisplays = displayData.length;

    for(let i=0;i<numberOfDisplays;i++) {
      totalTravelTimePerDisplay = 0;
      for(let j=0;j<usersInMyGroup.length;j++) {
        console.log(usersInMyGroup[j].currentusertraveltimes[i], 'i=',i, 'j=',j);
        totalTravelTimePerDisplay += usersInMyGroup[j].currentusertraveltimes[i].usertraveltime;
      }
      totalTravelTimesForGroup[i] = {
        totalTime: totalTravelTimePerDisplay,
        avgTime: Math.round(totalTravelTimePerDisplay / usersInMyGroup.length),
        displayid: displayData[i].displayid
      };
    }
    totalTravelTimesForGroup.sort((a, b) => {
      return a.totalTime - b.totalTime;
    });
    fireworkListingsPage();
  }
});



// NOT CURRENTLY IN USE ANYWHERE
//

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
