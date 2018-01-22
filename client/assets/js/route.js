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

}
// routeAuth();
// var data = $('#form').serializeArray().reduce(function(obj, item) {
//     obj[item.name] = item.value;
//     return obj;
// }, {});
