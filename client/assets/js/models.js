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

var models = {
  auth: () => {
    container.load('/templates/auth.html');
  },
  home: () => {
    $.get("/templates/home.html", function( data ) {
      $.get( "/api/project" )
      .done(function(project) {
        writeLog(project, 'get')

        $.get( "/api/task" )
        .done(function(task) {
          writeLog(task, 'get')

          let tmpl = _.template(data)({
            user: userInfo.email,
            projects: project,
            tasks: task,
            profession: profession
          });
          container.empty().append(tmpl)
        });

      });
    });
  },
  project: {
    addTaskInProject: () => {
      var place = $('#taskInProject');
      console.log($('#taskInProject'));
      $.get( "/api/task/")
      .done(function(res,select) {
        var select = '';

        writeLog(res, 'get')
        console.log(res);
        select+='<select name="task" required>'
        select+='<option disabled selected>Выберите задачу</option>'

        _.each(_.uniqBy(res, 'type'), function(i) {
          select+='<optgroup label="'+profession[i.type].name+'">'
          // console.log(profession[i.type].name);
          _.each( res, function(d) {
            if (i.type == d.type) {
                // console.log(i.name);
                  select+='<option value="'+i._id+'">'+i.name+'   ('+i.hours*profession[i.type].cost+')</option>'
            }
          });
          select+='</optgroup>'
        });
        let uniqId = _.uniqueId('row_')
        let html = ''
        html += '<tr uniqId="' + uniqId + '">'
        html += '<td>'+select+'</td>'
        html += '<td><input value="1" type="text" placeholder="Кол-во" name="value" required></td>'
        html += '<td>'
        html += '<button onclick="javascript:models.project.removeTaskInProject(`'+uniqId+'`);" type="button">Удалить</button>'
        html += '</td>'
        html += '</tr>'
        place.append(html)
      });
    },
    removeTaskInProject: (id) => {
      var place = $('#taskInProject');
      console.log($('#taskInProject'));
      place.find('tr[uniqId='+id+']').remove()
    },

  },
  addProject: () => {
    container.load('/templates/addProject.html');
  },
  updateProject: (id) => {
    $.get("/templates/updateProject.html", function( data ) {
      $.get( "/api/project/"+id )
      .done(function(res) {
        writeLog(res, 'get')
        let tmpl = _.template(data)({
          res
        });
        container.empty().append(tmpl)
      });
    });
  },
  removeProject: (id) => {
    $.get("/templates/removeProject.html", function( data ) {
      $.get( "/api/project/"+id )
      .done(function(res) {
        writeLog(res, 'get')
        let tmpl = _.template(data)({
          res
        });
        container.empty().append(tmpl)
      });
    });
  },

  addTask: () => {
    $.get("/templates/addTask.html", function( data ) {
      let tmpl = _.template(data)({
        profession
      });
      container.empty().append(tmpl)
    });
  },
  updateTask: (id) => {
    $.get("/templates/updateTask.html", function( data ) {
      $.get( "/api/task/"+id )
      .done(function(res) {
        writeLog(res, 'get')
        let tmpl = _.template(data)({
          res,
          profession
        });
        container.empty().append(tmpl)
      });
    });
  },
  removeTask: (id) => {
    $.get("/templates/removeTask.html", function( data ) {
      $.get( "/api/task/"+id )
      .done(function(res) {
        writeLog(res, 'get')
        let tmpl = _.template(data)({
          res
        });
        container.empty().append(tmpl)
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
