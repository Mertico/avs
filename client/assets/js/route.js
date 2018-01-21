var route = {
  signIn: () => {
    let data = {
      email: $('#email').val(),
      password: $('#password').val(),
    }
    $.post( "/api/auth", data, function( data ) {
      writeLog(data, 'post')
      header('Location: http://localhost:9080/');
    }, "json" )
    .fail(function(data) {
      writeLog(data, 'post')
    })
  },

  signUp: () => {
    let data = {
      email: $('#email').val(),
      password: $('#password').val(),
    }
    $.post( "/api/reg", data, function( data ) {
      writeLog(data, 'post')
    }, "json" )
    .fail(function(data) {
      writeLog(data, 'post')
    })
  }
}
// routeAuth();
