$(() =>{

  let $main = $('main');

  //USERS STUFF
  $('.register').on('click', showRegisterForm);
  $('.login').on('click', showLoginForm);
  $('.usersIndex').on('click', getUsers);
  $('.logout').on('click', logout);
  $main.on('click', 'button.delete', deleteUser);
  $main.on('click', 'button.edit', getUser);

  $main.on('submit', 'form', handleForm);

  //PLACES STUFF
  // $main.on('click', 'button.deletePlace', deletePlace);
  // $main.on('click', 'button.editPlace', getPlace);
  $('.places').on('click', getPlaces);
  $('.place').on('click', showPlaceForm);

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if(isLoggedIn()) {
    console.log('Logged In Is: ',isLoggedIn());
    getPlaces();
  } else {
    console.log('Logged In Is: ',isLoggedIn());
    showLoginForm();
  }

  function showRegisterForm() {
    if(event) event.preventDefault();
    $main.html(`
      <h2>Register</h2>
      <form method="post" action="/register">
      <div class="form-group">
      <input class="form-control" name="username" placeholder="Username">
      </div>
      <div class="form-group">
      <input class="form-control" name="email" placeholder="Email">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="passwordConfirmation" placeholder="Password Confirmation">
      </div>
      <button class="btn btn-primary">Register</button>
      </form>
      `);
    }

    function showLoginForm() {
      if(event) event.preventDefault();
      $main.html(`
        <h2>Login</h2>
        <form method="post" action="/login">
        <div class="form-group">
        <input class="form-control" name="email" placeholder="Email">
        </div>
        <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="Password">
        </div>
        <button class="btn btn-primary">Register</button>
        </form>
        `);
      }

      function showUsers(users) {
        let $row = $('<div class="row"></div>');
        users.forEach((user) => {
          $row.append(`
            <div class="col-md-4">
            <div class="card">
            <div class="card-block">
            <h4 class="card-title">${user.username}</h4>
            </div>
            </div>
            <button class="btn btn-danger delete" data-id="${user._id}">Delete</button>
            </div>
            `);
          });

          $main.html($row);
        }

          function getUsers() {
            if(event) event.preventDefault();

            let token = localStorage.getItem('token');
            $.ajax({
              url: '/users',
              method: "GET",
              beforeSend: function(jqXHR) {
                if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
              }
            })
            .done(showUsers)
            .fail(showLoginForm);
          }

          function handleForm() {
            if(event) event.preventDefault();
            let token = localStorage.getItem('token');
            let $form = $(this);

            let url = $form.attr('action');
            let method = $form.attr('method');
            let data = $form.serialize();
            console.log("FORM", data, url, method, token);

            $.ajax({
              url,
              method,
              data,
              beforeSend: function(jqXHR) {
                if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
              }
            }).done((data) => {
              console.log(data);
              if(data.token) localStorage.setItem('token', data.token);
              getPlaces();
            }).fail(showLoginForm);
          }

          function deleteUser() {
            let id = $(this).data('id');
            let token = localStorage.getItem('token');

            $.ajax({
              url: `/users/${id}`,
              method: "DELETE",
              beforeSend: function(jqXHR) {
                if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
              }
            })
            .done(getUsers)
            .fail(showLoginForm);
          }

          function getUser() {
            let id = $(this).data('id');
            let token = localStorage.getItem('token');

            $.ajax({
              url: `/users/${id}`,
              method: "GET",
              beforeSend: function(jqXHR) {
                if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
              }
            })
            .done(showEditForm)
            .fail(showLoginForm);
          }

          function logout() {
            if(event) event.preventDefault();
            localStorage.removeItem('token');
            showLoginForm();
          }

          ///////////////////////////////PLACES STUFF STARTS HERE////////////////////////////////

          function getPlaces() {
            console.log("H!");
            if(event) event.preventDefault();
            let token = localStorage.getItem('token');
            $.ajax({
              url: '/places',
              method: 'get',
              beforeSend: function(jqXHR) {
                if(token) return jqXHR.setRequestHeader('Authorization', `Bearer ${token}`);
              }
            })
            .done(showPlaces)
            .fail(showLoginForm);
          }

          function showPlaces(places) {
            console.log("show", places);
            let $row = $('<div class="row"></div>');
            places.forEach((place) => {
              $row.append(`
                <div class="col-md-4">
                <div class="card">
                <div class="card-block">
                <h4 class="card-title">${place.name}</h4>
                <h4 class="card-title">${place.category}</h4>
                </div>
                </div>
                <button class="btn btn-danger delete" data-id="${place._id}">Delete</button>
                <button class="btn btn-primary edit" data-id="${place._id}">Edit</button>
                </div>
                `);
              });

              $main.html($row);
            }
            function showPlaceForm() {
              if(event) event.preventDefault();
              $main.html(`
                <h2>Create Place</h2>
                <form method="post" action="/places">
                <div class="form-group">
                <input class="form-control" name="name" placeholder="Name of place">
                </div>
                <div class="form-group">
                <input class="form-control" name="category" placeholder="Category">
                </div>
                <div class="form-group">
                <input class="form-control" type="number" name="lat" placeholder="Lattitude">
                </div>
                <div class="form-group">
                <input class="form-control" type="number" name="lng" placeholder="Longitude">
                </div>
                <button class="btn btn-primary">Create</button>
                </form>
                `);
              }
        });