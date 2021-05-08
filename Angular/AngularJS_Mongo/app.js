var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/database');
var User = require('./models/users')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});

app.get('/listar', function(req, res){
  User.find({}, function(error, users){
     if(error){
        res.send('Error.');
     }else{
        res.send(users);
     }
  })
});

app.get('/recuperar', function(req, res){
   User.findById(req.query._id, function(error, documento){
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
     var user = new User({
        name: req.query.name,
        email: req.query.email
     });
     user.save(function(error, documento){
        if(error){
           res.send('Error.');
        }else{
           res.send(documento);
        }
     });
  }else{
     //Modifica
     User.findById(req.query._id, function(error, documento){
        if(error){
           res.send('Error al intentar modificar el personaje.');
        }else{
           var user = documento;
           user.nombre = req.query.name,
           user.email = req.query.email
           user.save(function(error, documento){
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

app.delete('/eliminar', function(req, res){
   User.remove({_id: req.query._id}, function(error){
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

app.listen(3001, () => {
   console.log(`Servidor corriendo en http://localhost:3001`)
})
module.exports = app;
