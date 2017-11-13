var express = require('express');
var app = express();
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs     = require('express-handlebars')
var path = require('path');
var http = require('http');
/*var flash = require('express-flash');*/
var flash = require('connect-flash');
var paginate = require('express-paginate');
const port = process.env.PORT || 80;
app.use(paginate.middleware(10, 50));


//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 // For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize()); 
app.use(passport.session()); // persistent login sessions
app.use(flash());
//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');
    app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
    /** API path that will upload the files */
    app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });


/*app.use(errorHandler)

function errorHandler (err, req, res, next) {
  res.status(500);
  console.log(err);
  res.render('Admin/ErrorPage', { error: err })
}*/

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/nezaker', express.static(path.join(__dirname, 'public')));
app.use('/nezakerApp',express.static(__dirname + '/public'));

     //For Handlebars

//app.set('views', path.join(__dirname, 'views'));

app.set('views', './app/views')

//app.set('view engine', 'jade');
app.set('view engine', 'ejs');
/*app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
*/
app.get('/', function(req, res) {
    res.send('Welcome to Passport with Sequelize');
});



	//Models
    var models = require("./app/models");


    //Routes
    var authRoute = require('./app/routes/auth.js')(app,passport);
    var MainRoute = require('./app/routes/MainRoute.js')(app);

    //load passport strategies
    require('./app/config/passport/passport.js')(passport,models.user);

   /* //Sync Database
   	models.sequelize.sync().then(function(){
    console.log('Nice! Database looks fine')

    }).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
    });
*/

 
   
//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);
app.locals.title = "My App";

/*app.locals({
    version: 3,
    somefunction: function() {
        return "function result";
    }
});*/
  

 

app.listen(port, function(err) {
 
    if (!err)
        console.log("Site is live Listining on "+ port);
    else console.log(err)
 
});

    
/*
 var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('nezaker', 'root', 'root');

auto.run(function (err) {
    if (err) throw err;

    console.log(auto.tables); // table list
  // console.log(auto.foreignKeys); // foreign key list
});
*/