$(function() {
  var profession = [
    {
      name: "Аналитик",
      cost: 100
    },
    {
      name: "Дизайнер",
      cost: 120
    },
    {
      name: "Разработчик",
      cost: 250
    },
    {
      name: "Верстальщик",
      cost: 150
    }
  ]
  id = window.location.href.match(/\?(.*)/)[1]
  $.get("/templates/printProject.html", function( data ) {
    $.get( "/api/project/"+id )
    .done(function(res) {
      let tmpl = _.template(data)({
        res,profession
      });
      $('body').empty().append(tmpl)
    });
  });
})
