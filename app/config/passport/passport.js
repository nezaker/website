 var UserDao = require('../../Dao/UserDao.js').UserDao;
var secrets = require('../secrets');
var enums = require('../Enums');

  //load bcrypt
  var bCrypt = require('bcrypt-nodejs');

  module.exports = function(passport,user){

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  passport.serializeUser(function(user, done) {
         done(null, user.id);
      });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if(user){
          done(null, user.get());
        }
        else{
          done(user.errors,null);
        }
      });

  });


  passport.use('local-signup', new LocalStrategy(

    {           
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done){
       

      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

       User.findOne({where: {email:email}}).then(function(user){

      if(user)
      {
        return done(null, false, {message : 'That email is already taken'} );
      }

      else
      {
        var userPassword = generateHash(password);
            var data =
            {
                /*email: email,
                password: userPassword,
                firstname: req.body.firstname,
                username: req.body.username,
                status: 1,
                last_login: new Date().getDate(),
                first_name: 'fdfdfd',
                last_name: 'sds',
                birth_date: new Date().getDate(),
                gender: 1,
                phone_numbers: "dsdds",
                type: 1*/
            username: (req.body.username==null?req.body.email:req.body.username),
            email: email,
            password: userPassword,            
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            accountType_id: req.body.accountType_id,
            city_id: req.body.city_id,
            phone_numbers: req.body.phone_numbers,
            last_login: new Date(),
            birth_date: new Date().getDate(),
            status:1,
            gender:1,
            type:1,
             role:4
   
                };
        User.create(data).then(function(newUser,created){
          if(!newUser){
            return done(null,false);
          }

          if(newUser){
            return done(null,newUser);            
          }
        });
      }
    });
  }



  ));
    
  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
    
  {

  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {

    var User = user;

    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }

    User.findOne({ where : { email: email}}).then(function (user) {

      if (!user) {
        return done(null, false, { message: 'Email does not exist' });
      }

      if (!isValidPassword(user.password,password)) {

        return done(null, false, { message: 'Incorrect password.' });

      }

      var userinfo = user.get();

      return done(null,userinfo);

    }).catch(function(err){

      console.log("Error:",err);

      return done(null, false, { message: 'Something went wrong with your Signin' });


    });

  }
  ));
  // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    
passport.use(new FacebookStrategy(secrets.facebook,  function(req, accessToken, refreshToken, profile, done) {

  if (req.user) {
  //if user is logged in before and need to link account with Facebook
    UserDao.linkFacebookProfile(req.user.id, accessToken, refreshToken, profile)
      .then(function(user) {
                req.flash('info', { msg: 'Facebook account has been linked.' });

        done(null, user);
      })
      .catch(function(err) {
                req.flash('errors', { msg: err });

        done(null, false, { message: err });
      });
  }

  else {
  //if user accout is exist in database with the same email and want to link account with Facebook

       User.findOne({where: {email:profile._json.email }}).then(function(user){
      if(user)
      {
          UserDao.linkFacebookProfile(user.id, accessToken, refreshToken, profile)
          .then(function(user) {
          req.flash('info', { msg: 'Facebook account has been linked.' });

            done(null, user);
      })
      .catch(function(err) {
                req.flash('errors', { msg: err });
console.log(error);
        done(null, false, { message: err });
      });

      }
      else
      {
          UserDao.createAccFromFacebook(accessToken, refreshToken, profile)
          .then(function(user) { 
           done(null, user); })
          .catch(/*function(error) {console.log(error); done(error); }*/

        );
  } 
  });
 }
}));

/**
 * Sign in with Google.
 */
passport.use(new GoogleStrategy(secrets.google, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    UserDao.linkGoogleProfile(req.user.id, accessToken, refreshToken, profile)
      .then(function(user) {
        done(null, user);
      })
      .catch(function(err) {
        
        done(null, false, { message: err });
      });
  } else {
  User.findOne({where: {email:profile.emails[0].value }}).then(function(user){
      if(user)
      {
          UserDao.linkGoogleProfile(user.id, accessToken, refreshToken, profile)
          .then(function(user) {
            done(null, user);
      })
      .catch(function(err) {
        done(null, false, { message: err });
      });

      }
      else
      {
    UserDao.createAccFromGoogle(accessToken, refreshToken, profile)
      .then(function(user) { done(null, user); })
      .catch(function(error) { done(error); });
    }
  })
  }
}));



  }

