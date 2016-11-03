'use strict';

$(function () {

  var $main = $('main');
  var currentUsername = void 0;
  var currentUsergroup = void 0;
  var currentUserId = void 0;
  var currentUserData = void 0;
  var fireworksData = void 0;
  //The current logged in user's lattitude.
  var currentuserlat = void 0;
  //The current logged in user's lattitude.
  var currentuserlng = void 0;
  var currentusertraveltimes = [];
  //Users who match on groupname (An object/array).
  var usersInMyGroup = [];
  var totalTravelimesOfAllDisplays = [];
  var totalTravelTimesForGroup = [];
  var currentDisplayFullData = [];
  var totalTravelTimePerDisplay = [];
  var currentDisplayID = void 0;
  var finalDisplayIndex = void 0;

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if (isLoggedIn()) {
    showProfile();
  } else {
    fireworksSplash();
  }

  $main.on('submit', 'form.join-group', getUsers);

  function getUsers(event) {
    if (event) event.preventDefault();
    var form = $(this);
    currentUsergroup = form.find('input[name="groupname"]').val();
    var token = localStorage.getItem('token');
    $.ajax({
      url: "/users",
      method: "get",
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function (users) {
      checkForExistingGroup(users, currentUsergroup);
      // console.log(users);
    });
  }

  function checkForExistingGroup(users, currentUsergroup) {
    var userId = localStorage.getItem('userId');
    var token = localStorage.getItem('token');
    var $form = $(".join-group");
    var data = $form.serialize();
    var match = false;

    users.forEach(function (user) {
      if (user.groupname == currentUsergroup) {
        match = true;
      }
    });

    if (match === true) {
      alert("SUCCESS!!!");
      //console.log("check", data);
      $.ajax({
        url: '/users/' + userId,
        method: "put",
        data: data,
        beforeSend: function beforeSend(jqXHR) {
          if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
        }
      }).done(function (data) {
        //console.log(data);
        currentUserData = data;
        showProfile();
      });
    } else {
      alert("Group name not found, please try again");
    }
  }

  function createGroup() {
    if (event) event.preventDefault();
    $main.html('\n      <div class="one-third column">&nbsp;</div>\n      <div class="one-third column">\n        <h2>Create or Join Group</h2>\n\n        <button class="btn btn-primary u-full-width create">Create Group</button>\n        <button class="btn btn-primary u-full-width join">Join Group</button>\n        <button class="btn btn-primary u-full-width profile">Go to Profile</button>\n      </div>\n      <div class="one-third column">&nbsp;</div>\n    ');
    $('.create').on("click", createNewGroup);
    $('.join').on("click", joinGroup);
    $('.profile').on("click", showProfile);
  }

  function joinGroup() {
    if (event) event.preventDefault();
    var userId = localStorage.getItem('userId');
    $main.html('\n      <div class="one-third column">&nbsp;</div>\n      <div class="one-third column">\n        <h2>Join Group</h2>\n\n        <form method="put" action="/users/' + userId + '" class="join-group">\n          <input class="form-control u-full-width" type="text" name="groupname" placeholder="Enter group name">\n          <button class="btn btn-primary u-full-width profile">submit</button>\n          <button class="btn btn-primary u-full-width back">Back</button>\n          <button class="btn btn-primary u-full-width profile">Go To Profile</button>\n        </form>\n      </div>\n      <div class="one-third column">&nbsp;</div>\n    ');
    $('.profile').on('submit', 'form', handleGroupForm);
    $('.back').on('click', createGroup);
  }

  function createNewGroup() {
    if (event) event.preventDefault();

    var userId = localStorage.getItem('userId');
    $main.html('\n      <div class="one-third column">&nbsp;</div>\n      <div class="one-third column">\n        <h2>Create New Group</h2>\n\n        <form method="put" action="/users/' + userId + '" class="new-group">\n          <input class="form-control u-full-width" type="text" name="groupname" placeholder="Group name">\n          <button class="btn btn-primary u-full-width profile">submit</button>\n          <button class="btn btn-primary u-full-width back">Back</button>\n          <button class="btn btn-primary u-full-width profile">Go to Profile</button>\n\n        </form>\n      </div>\n      <div class="one-third column">&nbsp;</div>\n    ');
    $('.profile').on('submit', 'form', handleGroupForm);
    $('.back').on('click', createGroup);
  }

  function fireworksSplash() {
    if (event) event.preventDefault();
    $main.html('\n      <div class="one-third column">&nbsp;</div>\n      <div class="one-third column">\n        <h2>Welcome to Londons Burning - fireworks display App!</h2>\n        <button class ="login loggedOut u-full-width" href= "#">Login</button>\n        <button class ="register loggedOut u-full-width" href= "#">Register</button>\n      </div>\n      <div class="one-third column">&nbsp;</div>');
    $('.login').on("click", showLoginForm);
    $('.register').on('click', showRegisterForm);
  }

  function showProfile() {
    //  getFireworksDisplayData();
    if (event) event.preventDefault();
    $main.html('\n      <div class="one-third column">&nbsp</div>\n      <div class="one-third column">\n        <h2>Welcome</h2>\n        <p> Two ways to use this App.\n        1. Give your group name to your friends. So they can register\n        and join the same group.<br>\n        2. Alternatively, plan your own individual route.\n        <button class="btn btn-primary u-full-width displayfirework">Find Firework displays</button>\n        <button class="btn btn-primary u-full-width">See selected</button>\n        <button class="btn btn-primary u-full-width create">Create or Join Group</button>\n      </div>\n      <div class="one-third column">&nbsp</div>\n    ');
    $('.create').on('click', createGroup);
    $('.displayfirework').on('click', getFireworksDisplayData);
  }

  function initMap() {
    var styles = [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#FFFFFF" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "blue" }, { "lightness": 17 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#e74b12" }, { "lightness": 17 }] }];

    var image = './images/fireworks100.png';

    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: currentDisplayFullData.location.lat, lng: currentDisplayFullData.location.lng },
      styles: styles,
      mapTypeControl: false,
      zoom: 12
    });

    var marker = new google.maps.Marker({
      map: map,
      position: { lat: currentDisplayFullData.location.lat, lng: currentDisplayFullData.location.lng },
      title: '' + currentDisplayFullData.locationName,
      icon: image,
      animation: google.maps.Animation.DROP
    });
  }

  function fireworkListingsPage() {
    var finalDisplayIndex = 0;

    function showPreviousDisplay() {
      if (finalDisplayIndex === 0) {
        finalDisplayIndex = 46;
      } else {
        finalDisplayIndex--;
      }
      renderListingsPage();
    }

    function showNextDisplay() {
      if (finalDisplayIndex === 46) {
        finalDisplayIndex = 0;
      } else {
        finalDisplayIndex++;
      }
      renderListingsPage();
    }

    renderListingsPage();

    function renderListingsPage() {
      //Get all fireworks information for the fireworks ID at our index 0... note that this is NOT the index within fireworks itself.
      currentDisplayID = totalTravelTimesForGroup[finalDisplayIndex].displayid;

      $.ajax({
        method: 'get',
        url: '/fireworks/' + currentDisplayID
      }).done(function (data) {
        currentDisplayFullData = data;
        console.log(currentDisplayFullData);

        //console.log('Initial LatLng', initialLat, initialLng);

        if (event) event.preventDefault();
        $main.html('\n        <div class="row">\n          <div class="four column">\n            <button class="btn btn-primary u-half-width previousDisplay">Previous Display</button>\n          </div>\n          <div class="four column">\n          </div>\n          <div class="four column">\n            <button class="btn btn-primary u-half-width nextDisplay">Next Display</button>\n          </div>\n        </div>\n\n        <div class="one-third column">&nbsp\n        </div>\n        <div class="one-third column">\n          <h4>' + currentDisplayFullData.title + '</h4>\n          <div id="map"></div>\n          <p>Location: ' + currentDisplayFullData.locationName + '</p>\n          <p>Opens at: ' + currentDisplayFullData.openTime + '</p>\n          <p>Display starts at: ' + currentDisplayFullData.startTime + '</p>\n          <p>Adult cost from: \xA3' + currentDisplayFullData.adultCostFrom + '</p>\n            <button class="btn btn-primary u-full-width back">Back</button>\n      <div class="one-third column">&nbsp</div>');
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
    if (event) event.preventDefault();
    $main.html('\n      <div class="one-third column">&nbsp;</div>\n      <div class="one-third column">\n        <h2>Login</h2>\n        <form method="post" action="/login" class="login">\n          <div class="form-group">\n            <input class="form-control u-full-width" type="text" name="username" placeholder="Username">\n          </div>\n          <div class="form-group">\n            <input class="form-control u-full-width" type="password" name="password" placeholder="Password">\n          </div>\n          <button class="btn btn-primary u-full-width">Login</button>\n          <button class="btn btn-primary u-full-width back">Back</button>\n        </form>\n      </div>\n      <div class="one-third column">&nbsp;</div>\n    ');
    $('.back').on('click', fireworksSplash);
  }

  function showRegisterForm() {
    if (event) event.preventDefault();
    $main.html('\n      <div class="one-third column">&nbsp;</div>\n      <div class="one-third column">\n        <h2>Register</h2>\n        <form method="post" action="/register" class="auth">\n          <div class="form-group">\n            <input class="u-full-width" type="text" name="username" placeholder="Username">\n          </div>\n          <div class="form-group">\n            <input id="addressEntry" class="u-full-width" type="text" name="address" placeholder="Address">\n          </div>\n          <div class="form-group">\n            <input class="u-full-width" type="password" name="password" placeholder="Password">\n          </div>\n          <div class="form-group">\n            <input class="u-full-width" type="password" name="passwordConfirmation" placeholder="Password Confirmation">\n          </div>\n          <div class="form-group">\n            <input type="hidden" name="location[lat]">\n            <input type="hidden" name="location[lng]">\n          </div>\n          <button class="btn btn-primary u-full-width">Register</button>\n          <button class="btn btn-primary u-full-width back">Back</button>\n        </form>\n      </div>\n      <div class="one-third column">&nbsp;</div>\n    ');
    $('.back').on('click', fireworksSplash);
    initAutocomplete();
  }

  $('.logout').on('click', logout);

  function logout() {
    if (event) event.preventDefault();
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
    if (event) event.preventDefault();
    var token = localStorage.getItem('token');
    var userId = localStorage.getItem('userId');
    var $form = $(this);
    var url = $form.attr('action');
    var method = $form.attr('method');
    var data = $form.serialize();
    //console.log(url, method, data);
    $.ajax({
      url: url,
      method: method,
      data: data,
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function (data) {
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user._id) localStorage.setItem('userId', data.user._id);
      var currentUsername = data.user.username;
      var currentUsergroup = data.user.groupname;
      createGroup();
    }).fail(fireworksSplash);
  }

  function handleLoginForm() {
    if (event) event.preventDefault();
    var token = localStorage.getItem('token');
    var userId = localStorage.getItem('userId');
    var $form = $(this);
    var url = $form.attr('action');
    var method = $form.attr('method');
    var data = $form.serialize();
    //console.log(url, method, data);
    $.ajax({
      url: url,
      method: method,
      data: data,
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function (data) {
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user._id) localStorage.setItem('userId', data.user._id);
      var currentUsername = data.user.username;
      var currentUsergroup = data.user.groupname;
      showProfile();
    }).fail(fireworksSplash);
  }

  function handleGroupForm() {
    if (event) event.preventDefault();
    var token = localStorage.getItem('token');
    var $form = $(this);
    var url = $form.attr('action');
    var method = $form.attr('method');
    var data = $form.serialize();
    //console.log(url, method, data);
    $.ajax({
      url: url,
      method: method,
      data: data,
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function (data) {
      //console.log("data:", data);
      showProfile();
    }).fail(function (err) {
      //console.log(err);
      fireworksSplash();
    });
  }

  var latLng = void 0;
  function initAutocomplete() {
    var bounds = new google.maps.LatLngBounds({
      lat: 51.6,
      lng: 0.12
    }, {
      lat: 51.3,
      lng: -0.44
    });

    var addressEntry = document.getElementById('addressEntry');
    var addressAutocomplete = new google.maps.places.Autocomplete(addressEntry, {
      componentRestrictions: {
        country: "GB"
      },
      bounds: bounds
    });
    // addressAutocomplete.bindTo('bounds', bounds);
    addressAutocomplete.addListener('place_changed', function () {
      latLng = addressAutocomplete.getPlace().geometry.location.toJSON();
      $('form input[name="location[lat]"]').val(latLng.lat);
      $('form input[name="location[lng]"]').val(latLng.lng);
    });
  }

  function getFireworksDisplayData() {
    $.ajax({
      method: "GET",
      url: "/fireworks"
    }).done(function (data) {
      fireworksData = data;
      getCurrentUser();
    });
  }

  function getCurrentUser() {
    var token = localStorage.getItem('token');
    $.ajax({
      method: "GET",
      url: '/users/' + localStorage.getItem('userId'),
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function (data) {
      currentuserlat = data.location.lat;
      currentuserlng = data.location.lng;
      currentUserData = data;
      currentUsergroup = data.groupname; // Do we need to enter the current username as their group if they haven't joined a group?
      getUserDisplayTravelTimes();
    });
  }

  function getUserDisplayTravelTimes() {
    var numberOfDisplays = fireworksData.length;
    var counter = 0;
    fireworksData.forEach(function (display) {
      $.ajax({
        method: "GET",
        url: "/googlemaps",
        data: {
          origins: currentuserlat + ',' + currentuserlng,
          destinations: display.location.lat + ',' + display.location.lng
        }
      }).done(function (data) {
        counter++;
        //console.log(display);
        var tripDistance = data.rows[0].elements[0].distance.value;
        var tripDuration = data.rows[0].elements[0].duration.value;
        var individualDisplayId = display._id;
        var values = {
          displayid: individualDisplayId,
          usertraveltime: tripDuration,
          userdistance: tripDistance
        };
        currentusertraveltimes.push(values);
        if (counter === numberOfDisplays) {
          //console.log(currentusertraveltimes);
          putCurrentUserTravelTimesIntoArray();
        }
        //        console.log(`${tripDistance}m & ${tripDuration}s for display ID ${display._id}`);
      });
    });
  }

  function putCurrentUserTravelTimesIntoArray() {
    var token = localStorage.getItem('token');
    $.ajax({
      method: "PUT",
      url: '/users/' + localStorage.getItem('userId'),
      data: { currentusertraveltimes: currentusertraveltimes },
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function (data) {
      //console.log('user array successfully PUT into database');
      putUsersOfGroupInAnArray();
    });
  }

  function putUsersOfGroupInAnArray() {
    var token = localStorage.getItem('token');
    //console.log(currentUsergroup);
    $.ajax({
      method: "GET",
      url: '/group/' + currentUsergroup,
      beforeSend: function beforeSend(jqXHR) {
        if (token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    }).done(function (data) {
      usersInMyGroup = data;
      console.log(usersInMyGroup);
      calculateTotalTravelTimesPerDisplay();
    });
  }

  function calculateTotalTravelTimesPerDisplay() {
    var displayData = usersInMyGroup[0].currentusertraveltimes;
    var numberOfDisplays = displayData.length;

    for (var i = 0; i < numberOfDisplays; i++) {
      totalTravelTimePerDisplay = 0;
      for (var j = 0; j < usersInMyGroup.length; j++) {
        console.log(usersInMyGroup[j].currentusertraveltimes[i], 'i=', i, 'j=', j);
        totalTravelTimePerDisplay += usersInMyGroup[j].currentusertraveltimes[i].usertraveltime;
      }
      totalTravelTimesForGroup[i] = {
        totalTime: totalTravelTimePerDisplay,
        avgTime: Math.round(totalTravelTimePerDisplay / usersInMyGroup.length),
        displayid: displayData[i].displayid
      };
    }
    totalTravelTimesForGroup.sort(function (a, b) {
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