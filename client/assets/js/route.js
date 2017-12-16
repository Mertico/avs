routeAuth = () => {
  let data = {
    email: $('#email').val(),
    password: $('#password').val(),
  }
  $.post( "/api/auth", data, function( data ) {
    console.log("Post data: ",data);
    div = $( "<div/>", {class: 'post'} )
      .appendTo(root)
    _.forEach(data, function callback(value, index) {
      $( "<div/>" )
        .html(index +": "+ value + "")
        .appendTo(div)
    })
  }, "json" );
}
// routeAuth();
