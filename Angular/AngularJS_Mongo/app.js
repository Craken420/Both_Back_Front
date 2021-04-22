var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./database');
var usersModel = require('./models/users')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.get('/', routes.index);
// app.get('/users', user.list);
app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});

app.get('/listar', function(req, res){
  Cliente.find({}, function(error, clientes){
     if(error){
        res.send('Error.');
     }else{
        res.send(clientes);
     }
  })
});

app.get('/recuperar', function(req, res){
  Cliente.findById(req.query._id, function(error, documento){
     if(error){
        res.send('Error.');
     }else{
        res.send(documento);
     }
  });
});

app.post('/guardar', function(req, res){
  if(req.query._id == null){
     //Inserta
     var cliente = new Cliente({
        nombre: req.query.nombre,
        apellido: req.query.apellido,
        domicilio: req.query.domicilio,
        telefono: req.query.telefono,
        email: req.query.email
     });
     cliente.save(function(error, documento){
        if(error){
           res.send('Error.');
        }else{
           res.send(documento);
        }
     });
  }else{
     //Modifica
     Cliente.findById(req.query._id, function(error, documento){
        if(error){
           res.send('Error al intentar modificar el personaje.');
        }else{
           var cliente = documento;
           cliente.nombre = req.query.nombre,
           cliente.apellido = req.query.apellido,
           cliente.domicilio = req.query.domicilio,
           cliente.telefono = req.query.telefono,
           cliente.email = req.query.email
           cliente.save(function(error, documento){
              if(error){
                 res.send('Error.');
              }else{ 
                 res.send(documento);
              }
           });
        }
     });
  }
});

app.post('/eliminar', function(req, res){
  Cliente.remove({_id: req.query._id}, function(error){
     if(error){
        res.send('Error.');
     }else{
        res.send('Ok');
     }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000)
module.exports = app;
