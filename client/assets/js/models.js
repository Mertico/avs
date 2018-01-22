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
      $.get( "/api/project" )
      .done(function(res) {
        console.log(res);
        let tmpl = _.template(data)({
          user: userInfo.email,
          projects: res
        });
        container.append(tmpl)
      });
    });
  },
  addProject: () => {
    container.load('/templates/addProject.html');
  },
  updateProject: (id) => {
    $.get("/templates/updateProject.html", function( data ) {
      $.get( "/api/project/"+id )
      .done(function(res) {
        console.log(res);
        let tmpl = _.template(data)({
          res
        });
        container.append(tmpl)
      });
    });
  },

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