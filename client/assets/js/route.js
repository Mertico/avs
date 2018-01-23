var route = {
  signIn: () => {
    let data = {
      email: $('#email').val(),
      password: $('#password').val(),
    }
    $.post( "/api/auth", data, function( data ) {
      writeLog(data, 'post')
      location.reload(true);
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
  },


  // Project
  addProjectConfirm: () => {
    var dataForm = $('#form').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    var data = {
      name: dataForm.name,
      discount: dataForm.discount,
      contacts: {
        firstName: dataForm.firstName,
        secondName: dataForm.secondName,
        lastName: dataForm.lastName,
        mail: dataForm.mail,
        phone: dataForm.phone
      }
    }
    $.post( "/api/project", data, function(res) {
      writeLog(res, 'post')
      if (res.errors) {
        //Отрабоать ошибочные поля
      } else {
        location.reload(true);
      }
    }, "json" )
    .fail(function(res) {
      writeLog(res, 'post')
    })
  },
  updateProjectConfirm: (id) => {
    var dataForm = $('#form').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    var tableTasks = $('#taskInProject tr[uniqId]');
    var tasks = []
    var isError = false
    _.each(tableTasks, function(task, key) {
      let id = ($(task).attr('taskId')) ? $(task).attr('taskId') :$(task).find('select').val()
      let value = $(task).find('input').val()-0 | $(task).attr('taskValue')-0
      if(id == null || value == '' || value < 1) {
        isError = true
      } else {
        tasks.push({id, value})
      }
    })
    var data = {
      name: dataForm.name,
      discount: dataForm.discount,
      contacts: {
        firstName: dataForm.firstName,
        secondName: dataForm.secondName,
        lastName: dataForm.lastName,
        mail: dataForm.mail,
        phone: dataForm.phone
      },
      tasks: tasks
    }

    // console.log(data,isError);
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url: "/api/project/"+id,
      data: data
    }).done(function(res) {
      console.log(res);
      writeLog(res, 'put')
      if (res.errors) {
        //Отработать ошибочные поля
      } else {
        location.reload(true);
      }
    }, "json" )
    .fail(function(res) {
      writeLog(res, 'post')
    })
  },
  removeProjectConfirm: (id) => {
    $.ajax({
      type: 'DELETE',
      dataType: 'json',
      url: "/api/project/"+id,
      data: dataForm
    }).done(function(res) {
      writeLog(res, 'put')
      if (res.errors) {
        //Отработать ошибки
      } else {
        location.reload(true);
      }
    }, "json" )
    .fail(function(res) {
      writeLog(res, 'post')
    })
  },


  // TASK
  addTaskConfirm: () => {
    var dataForm = $('#form').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    $.post( "/api/task", dataForm, function(res) {
      writeLog(res, 'post')
      if (res.errors) {
        //Отрабоать ошибочные поля
      } else {
        location.reload(true);
      }
    }, "json" )
    .fail(function(res) {
      writeLog(res, 'post')
    })
  },
  updateTaskConfirm: (id) => {
    var dataForm = $('#form').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url: "/api/task/"+id,
      data: dataForm
    }).done(function(res) {
      writeLog(res, 'put')
      if (res.errors) {
        //Отрабоать ошибочные поля
      } else {
        location.reload(true);
      }
    }, "json" )
    .fail(function(res) {
      writeLog(res, 'post')
    })
  },
  removeTaskConfirm: (id) => {
    $.ajax({
      type: 'DELETE',
      dataType: 'json',
      url: "/api/task/"+id,
      data: dataForm
    }).done(function(res) {
      writeLog(res, 'put')
      if (res.errors) {
        //Отработать ошибки
      } else {
        location.reload(true);
      }
    }, "json" )
    .fail(function(res) {
      writeLog(res, 'post')
    })
  },



}
// routeAuth();
// var data = $('#form').serializeArray().reduce(function(obj, item) {
//     obj[item.name] = item.value;
//     return obj;
// }, {});
