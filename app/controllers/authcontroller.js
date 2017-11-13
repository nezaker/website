var exports = module.exports = {}
 var ContentDao = require('../Dao/ContentDao.js').ContentDao;
var CityDao = require('../Dao/CityDao.js').CityDao;
var AccountTypeDao = require('../Dao/AccountTypeDao.js').AccountTypeDao;
 var Contact_usDao = require('../Dao/Contact_usDao.js').Contact_usDao;
 
var enums = require('../config/Enums');

exports.signup = function(req,res){
        CityDao.getAllCities(function(cities){
          AccountTypeDao.getAllAccountTypes(function(account_types){
            res.render('Account/signup',{page_title:"Create",cities:cities,account_types:account_types}); 
          });
    });
}
/*exports.viewSubject = function(req,res){

	res.render('Subject/viewSubject'); 

}
*/
exports.signin = function(req,res){
	res.render('Account/signin'); 
}

exports.ViewDashBoard = function(req,res){
    res.render('Account/dashboard'); 

  }

exports.GetDashBoardData = function(req,res){
   ContentDao. getContentsByStatus(1,req.user.id,function (PendingContents) {
   ContentDao. getContentsByStatus(2,req.user.id,function (ConfirmedContents) {

    res.json({PendingContents,ConfirmedContents}); 
    })});
  }

exports.ViewErrorPage = function(req,res){

 res.render('Admin/ErrorPage'); 
  /*res.render('Admin/ErrorPage', { error: err })
*/
}

exports.viewUser = function(req,res){

	res.render('Account/viewUser'); 

}
exports.HomePage = function(req,res){
                req.flash("msg","Error Occured");
  req.flash('success', { msg: 'Thank you for your interest. ' });

                res.locals.messages = req.flash();
        req.flash('success', { msg: 'Thank you for your interest. ' });

	  ContentDao.getLastContents(
   function (contents) {
 res.render('HomePage/HomePage',{page_title:"HomePage",contents: contents}); 
  });

}
exports.AdminPage = function(req,res){

 res.render('Admin/AdminPage',{page_title:"Admin"}); 
  }
 
exports.sendContactMessage = function(req,res){
 console.log(req.body);
          Contact_usDao.createContactMessage(req.body, function (status) {
           response.json(status);
           console.log(status);
           });
       res.redirect('/dashboard');
     
        
        }

exports.viewContactUsPage = function(req,res){
 //
 res.render('HomePage/HP_ContactUS',{page_title:""});     
        }

exports.logout = function(req,res){
  req.logout();
  res.locals.user = null;

  req.session.destroy(function(err) {
  res.redirect('/HomePage');
  }

  );
}


 exports.isLoggedIn= function(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}

 exports.isAdmin= function(req, res, next) {
       if (req.isAuthenticated())
{
    if (req.user.role_id==ConstantVal.Roles.SuperAdmin||
      req.user.role_id==ConstantVal.Roles.Admin)
        return next();
   res.redirect('/ErrorPage');
}
    res.redirect('/signin');
}
 exports.safeRedirectToReturnTo=function(req, res) {
  var returnTo = req.session.returnTo || '/dashboard';
  delete req.session.returnTo;
  res.redirect(returnTo);
}