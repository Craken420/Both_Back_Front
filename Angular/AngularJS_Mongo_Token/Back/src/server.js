// Módulos requeridos
var express= require("express");
var morgan     = require("morgan");
var jwt        = require("jsonwebtoken");
var mongoose   = require("mongoose");
var app        = express();

var port = process.env.PORT || 3001;
var User = require('./models/User');
 
// Connect to DB
mongoose.connect('mongodb://localhost:dbtest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).
then(db => console.log('DB is running'))
.catch(err => console.log(err))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(function(req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*'); // permitido para todos los dominios.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Peticiones permitidas
    res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorization'); // Headers permitidos
    next();
});

app.post('/authenticate', function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({type:false, data: 'Error ocurred: ' + err})
        } else {
            if (user) {
                res.json({
                    type: true,
                    data: user,
                    token: user.token
                })
            } else {
                res.json({
                    type: false,
                    data: 'Incorrect email/password'
                })
            }
        }
    })
})

app.post('/signin', function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: 'Error ocurred' + err
            })
        } else {
            if (user) {
                res.json({type: false, data: 'User already exist!'});
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, 'secret');
                    user.save(function(err, user1) {
                        res.json({type: true, data: user1, token: user1.token})
                    })
                })
            }
        }
    })
})

app.get('/me', ensureAuthentication, function(req, res) {
    User.findOne({token: req.token}, function (err, user) {
        if (err) {
            res.json({type: false, data: 'Error ocurred: ' + err})
        } else {
            res.json({
                type: true,
                data: user
            })
        }
    })

})

function ensureAuthentication(req, res, next) {
    var bearerToken;
    var bearerToken = req.headers['authorization'];
    if (typeof bearerToken !== 'undefined') {
        var bearer = bearerToken.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403)
    }
}

process.on('uncaughtException', function(err){
    console.log(err);
});

app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});
