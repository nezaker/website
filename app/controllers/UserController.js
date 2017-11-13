var exports = module.exports = {}
  var bCrypt = require('bcrypt-nodejs');

 var UserDao = require('../Dao/UserDao.js').UserDao;
var GradeDao = require('../Dao/GradeDao.js').GradeDao;
var CityDao = require('../Dao/CityDao.js').CityDao;
var AccountTypeDao = require('../Dao/AccountTypeDao.js').AccountTypeDao;
        

exports.GetCreateUser = function(req,res){
  GradeDao.getAllGrades(function(grades){
  res.render('Account/createUser',{page_title:"Create",grades:grades}); 
 });
}
exports.getAllCities = function(req,res){
  CityDao.getAllCities(function(cities){
  res.json({cities});
  }); 
}

exports.getAllAccountTypes = function(req,res){
  AccountTypeDao.getAllAccountTypes(function(account_types){
  res.json({account_types});
  }); 
}
              
exports.PostCreateUser =function (req, res,next) {
  console.log(req.body);
  UserDao.createUser(req.body, function (status) {
  res.json(status);
  console.log(status);
});
//   response.redirect('/viewAllUsers');
}

exports.viewAllUsers = function(req,res){
  UserDao.getAllUsers(function (users) {
   res.render('Account/viewAllUsers',{page_title:"View All Users",users: users}); 
  });
}
  
exports.getUsersPaged = function(req,res){
  var totalRecords,
  pageSize =Pagination.UserPageSize,
  pageCount,
  currentPage = 1;
  UserDao.getCount(function (count) {
    totalRecords=count;
    pageCount=  Math.ceil(totalRecords/pageSize);
  });
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  UserDao.getUsersPaged(currentPage,pageSize,
   function (records) {
    res.json({users: records,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    pageName:"/viewAllUsers"}); 
  });
}
exports.viewUsersPaged = function(req,res){
 res.render('Account/viewAllUsers',{page_title:"View All Users"});
}
exports.getAllUsers = function (request, response) {
  UserDao.getAllUsers(
  function (users) {
    response.json({ users: users });
  });
}
//Edit profile
exports.GetUpdateUser = function (request, response) {
  // var id = request.params.id;
  var id = request.user.id;
  console.log(id);
  //load cchilder if exist 
  UserDao.getUserByID(id,
  function (user) {
    CityDao.getAllCities(function(cities){
    AccountTypeDao.getAllAccountTypes(function(account_types){
      response.render('Account/UpdateUser',{page_title:"Edit Users - Node.js",user:user,cities:cities,account_types:account_types});
    })
   });    
  });
}
        
exports.PostUpdateUser =  function (request, response) {
  var input = JSON.parse(JSON.stringify(request.body));
  //input.id=request.params.id;
  input.id=request.user.id;
  var UserDao = require('../Dao/UserDao.js').UserDao;
  console.log(input);
  UserDao.updateUser(input, function (status) {
  response.json(status);
  console.log(status);
 });
 response.redirect("/dashboard");
}
exports.GetUpdateUserPopup = function (req, res) {
  var id = req.user.id;
  UserDao.getUserByID(id,function (user) {
    CityDao.getAllCities(function(cities){
     AccountTypeDao.getAllAccountTypes(function(account_types){
      res.json({user,cities,account_types});
      })
   }); 
  });
}
        

exports.GetUserPopup = function (req, res) {
  var id = req.params.id;
  UserDao.getUserByID(id,function (user) {
      res.json({user});
  });
}
exports.PostUpdateUserPopup =  function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  input.id=req.user.id;
  UserDao.updateUser(req.body, function (status) {
   res.json(status);
   console.log(status);
  });
}    

exports.UpdateChildPopup =  function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  input.id=req.params.id;
  UserDao.updateUser(req.body, function (status) {
   res.json(status);
   console.log(status);
  });
}
exports.AddChild =  function (request, response) {
  var input = JSON.parse(JSON.stringify(request.body));
  ParentID=request.params.id;
  console.log(input);
  UserDao.AddChild(input,ParentID, function (status) {
    response.json(status);
    console.log(status);      
    request.flash('success', { msg: 'Your account has been created and you\'ve been logged in.' });
    });         
}
exports.GetUserByID = function (request, response) {
  var UserDao = require('../Dao/UserDao.js');
  UserDao.UserDao.getUserByID(request.params.UserID, function (user) {
    response.json({ user: user });
   });
}
exports.GetUserByEmail= function (request, response) {
  var UserDao = require('../Dao/UserDao.js');
  UserDao.UserDao.getUserByEmail(request.params.Email,
  function (user) {
    response.json({ user: user });
  });
}

exports.getChildrenPaged= function (req, res) {
  var totalRecords,
  pageSize =Pagination.ChildrenPageSize,
  pageCount,
  currentPage = 1;
  UserDao.getChildrenCount(req.params.ParentId,function (count) {
    totalRecords=count;
    pageCount=  Math.ceil(totalRecords/pageSize);
  });
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  UserDao.getChildrenPaged(req.params.ParentId,currentPage,pageSize,
   function (users) {
    res.json({Children: users,
    totalRecords:totalRecords,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage}); 
  });
}
//Get children of current user
exports.getAllChildren= function (request, response) {
  UserDao.getChildren(request.user.id,
    function (users) {
      response.json({ Children: users });
    });
}
exports.deleteUser = function(req,res){
  var id = req.params.id;
  UserDao.deleteUser(id,function(status){
  res.json(status);
});
   //res.redirect("/viewAllUsers");
}

exports.CheckPassword = function(req,res){
  var OldPassword=req.body;
  console.log(OldPassword);
  var   password=bCrypt.hashSync(OldPassword, bCrypt.genSaltSync(8), null);
  if(password==user.password)
  {
    req.flash('success', { msg: 'Your account has been created and you\'ve been logged in.' });
  }
  else
  {
    req.flash('errors', { msg: 'Your password dosent match or not exist ' });
  }
}
exports.deleteChild = function(req,res){
  //if(req.user.id==)
  UserDao.getUserByID(req.params.id,
  function (Child) {
    if(Child.family_id==req.user.family_id)
    {    
      UserDao.deleteUser(Child.id,function(status){
        res.json({ status });
     });
    }
 }); 
}