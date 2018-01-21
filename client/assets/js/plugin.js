var root = $( "body" );//$($(document).find('body'));

var global_log = $( "<div/>", {class: 'global_log'}).appendTo(root);
var container = $( "<div/>", {class: 'container'}).appendTo(root);

var writeLog = (data, type='default') => {
  console.log(data);
  div = $( "<div/>", {class: "default "+type} )
    .html(JSON.stringify(data))
    .appendTo(global_log)
  console.log(div);
}


var isAuth = false;
var userInfo = {};

var models = {
  auth: () => {
    container.load('/templates/auth.html');
  },
  home: () => {
    $.get("/templates/home.html", function( data ) {
      let tmpl = _.template(data)({
        user: userInfo.email,
        projects: [
          {firstName:"Homer", lastName:"Simpson", phone:"555-123-1234"},
        ]
      });
      container.append(tmpl)
    });
  }
}

// Действия при загрузке
$(function() {
  $.get( "/api/isAuth" )
  .done(function(data) {
    isAuth = true;
    userInfo = data.userInfo
    console.warn('Authentication:   Success ');
    writeLog(data, 'auth')
    models.home(data);
  })
  .fail(function(data) {
    isAuth = false;
    console.warn('Authentication:   Failure ');
    writeLog(data, 'auth')
    models.auth();
  });
});
