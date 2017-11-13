var authController = require('../controllers/authcontroller.js');
var secrets = require('../config/secrets');
var StageController = require('../controllers/StageController.js');
 var StageDao = require('../Dao/StageDao.js').StageDao;
 var ContentDao = require('../Dao/ContentDao.js').ContentDao;

/*var Enum = require('enum');
*/
module.exports = function(app,passport){
app.use(function (req, res, next) {
    res.locals.user = req.isAuthenticated() ? req.user : null;
/*    console.log("**************");
    ContentDao.getLastContents(
   function (LastContents) {
        global.LastContents={values:LastContents}
  });

/*var myEnum = new Enum({'None': 0, 'Black':1, 'Red': 2, 'Red2': 3, 'Green': 4, 'Blue': 5});
console.log(myEnum.Black.value);
for(var i=0; i<=5; i++){ console.log(myEnum.get(i).value + '=> '+ myEnum.get(i).key)}
*/
    next();
});

app.get('/signup', authController.signup);


app.get('/signin', authController.signin);
app.get('/viewUser',authController.isAdmin, authController.viewUser);
//app.get('/viewSubject', authController.viewSubject);

 app.get('/getAllUsers',authController.isAdmin,function (request, response) {

        console.log(request.isAuthenticated());
        console.log(request.user);
        var UserDao = require('../Dao/UserDao.js');
        UserDao.UserDao.getAllUsers(
            function (users) {

                response.json({ Users: users });
            });
    }
    );

app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/HomePage',
                                                    failureRedirect: '/signup'}
                                                    ));
app.get('/logout',authController.logout);
app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/HomePage',
                                                    failureRedirect: '/signin'}
                                                    ));

app.get('/auth/facebook', passport.authenticate('facebook', secrets.facebook.authOptions));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signup', failureFlash: true }), authController.safeRedirectToReturnTo);
app.get('/auth/google', passport.authenticate('google', secrets.google.authOptions));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/signin', failureFlash: true }), authController.safeRedirectToReturnTo);




app.get('/HomePage', authController.HomePage);
app.get('/dashboard',authController.isLoggedIn, authController.ViewDashBoard);
app.get('/getDashBoardData',authController.isLoggedIn, authController.GetDashBoardData);
app.get('/ErrorPage', authController.ViewErrorPage);

app.get('/ContactUs', function(req,res){
    res.render('HomePage/HP_ContactUS',{page_title:""}); });
app.get('/AboutUs', function(req,res){    
 res.render('HomePage/HP_AboutUs',{page_title:""});   });
app.get('/HowItWork', function(req,res){  
  res.render('HomePage/HP_HowItWork',{page_title:""});   });
app.get('/AdminPage',authController.isAdmin, authController.AdminPage);
app.post('/sendContactMessage', authController.sendContactMessage);


//app.get('/AdminPage/:Page',authController.isLoggedIn, authController.AdminPage);

/*app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
*/
/*app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
);*/
    // handle the callback after facebook has authenticated the user
   /* app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/viewAllContent',
            failureRedirect : '/signin'
        }));
*/
}






