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

$(function() {

  $.get( "/api/isAuth" )
  .done(function(data) {
    isAuth = true;
    // $("body").load('/templates/auth.html');
    console.warn('Authentication:   Success ');
    writeLog(data, 'auth')
  })
  .fail(function(data) {
    isAuth = false;
    container.load('/templates/auth.html');
    console.warn('Authentication:   Failure ');
    writeLog(data, 'auth')
  });
});


// console.log(root.html(12));
// // $.ajax({
// //   url: "/users",
// //   context: document.body,
// //   dataType: "json",
// // }).done(function() {
// //   $( this ).addClass( "done" );
// // });
//
// $.get( "/api/users", function( data ) {
//   console.log("Get data: ",data);
//   _.forEach(data, function callback(value, index) {
//     div = $( "<div/>", {class: 'get'} )
//       .appendTo(root)
//     _.forEach(value, function callback(v, i,a) {
//       $( "<div/>" )
//         .html(i+": "+v + "")
//         .appendTo(div)
//     })
//   })
// }, "json" );
//
//
// //, $( "#testform" ).serialize()
// $.post( "/api/users", { email: "invalid", password: "1996" }, function( data ) {
//   console.log("Post data: ",data);
//   div = $( "<div/>", {class: 'post'} )
//     .appendTo(root)
//   _.forEach(data, function callback(value, index) {
//     $( "<div/>" )
//       .html(index +": "+ value + "")
//       .appendTo(div)
//   })
// }, "json" );
