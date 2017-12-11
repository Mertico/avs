var root = $( "body" );//$($(document).find('body'));

console.log(root.html(12));
// $.ajax({
//   url: "/users",
//   context: document.body,
//   dataType; "json",
// }).done(function() {
//   $( this ).addClass( "done" );
// });

$.get( "http://localhost:3000/users", function( data ) {
  console.log("Get data: ",data);
  _.forEach(data, function callback(value, index) {
    div = $( "<div/>", {class: 'get'} )
      .appendTo(root)
    _.forEach(value, function callback(v, i,a) {
      $( "<div/>" )
        .html(i+": "+v + "")
        .appendTo(div)
    })
  })
}, "json" );


//, $( "#testform" ).serialize()
$.post( "http://localhost:3000/users", { email: "invalid", password: "1996" }, function( data ) {
  console.log("Post data: ",data);
  div = $( "<div/>", {class: 'post'} )
    .appendTo(root)
  _.forEach(data, function callback(value, index) {
    $( "<div/>" )
      .html(index +": "+ value + "")
      .appendTo(div)
  })
}, "json" );
