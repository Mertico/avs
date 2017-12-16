var root = $( "body" );//$($(document).find('body'));

var isAuth = false;

$(function() {
  console.log(123);

  $.get( "/api/isAuth" )
  .done(function() {
    isAuth = true;
    // $("body").load('/templates/auth.html');
    console.warn('Authentication:   Success ');
  })
  .fail(function() {
    isAuth = false;
    $("body").load('/templates/auth.html');
    console.warn('Authentication:   Failure ');
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
