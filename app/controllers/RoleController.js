var exports = module.exports = {}
 var RoleDao = require('../Dao/RoleDao.js').RoleDao;


exports.GetCreateRole = function(req,res){
           	res.render('Role/createRole',{page_title:"Create",grades:grades}); 
    
}

exports.PostCreateRole =function (request, response,next) {
           console.log(request.body);
           RoleDao.createRole(request.body, function (status) {
           response.json(status);
           console.log(status);
           });
             response.redirect('/viewAllRoles');
        }

exports.viewAllRoles = function(req,res){
  RoleDao.getAllRoles(
   function (roles) {
 res.render('Role/viewAllRoles',{page_title:"View All Roles",roles: roles}); 
  });
  }

exports.viewRolesPaged = function(req,res){

    var totalRecords,
    pageSize =10,
    pageCount,
    currentPage = 1;

RoleDao.getCount(function (count) {
  totalRecords=count;
     pageCount=  Math.ceil(totalRecords/pageSize);
});
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  RoleDao.getPaged(currentPage,pageSize,
   function (records) {
 res.render('Role/viewAllRoles',{page_title:"View All Roles",roles: records,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    pageName:"/viewAllRoles"}); 
  });
 
  }
exports.viewPermissionsPaged = function(req,res){

    var totalRecords,
    pageSize =10,
    pageCount,
    currentPage = 1;

RoleDao.getPermissionsCount(function (count) {
  totalRecords=count;
     pageCount=  Math.ceil(totalRecords/pageSize);
});
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  RoleDao.getPermissionsPaged(currentPage,pageSize,
   function (records) {
 res.render('Role/viewAllPermissions',{page_title:"View All Roles",permissions: records,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    pageName:"/viewAllRoles"}); 
  });
 
  }
exports.getAllRoles = function (request, response) {
            RoleDao.getAllRoles(
                function (roles) {
                    response.json({ roles: roles });
                });
        }
        exports.getAllPermissionRoles = function (request, response) {
            RoleDao.getAllPermissionRoles(
                function (roles) {
                    response.json({ roles: roles });
                });
        }

exports.GetUpdateRole = function (request, response) {
           var id = request.params.id;
           
            RoleDao.getRoleByID(request.params.RoleID,
                function (role) {
                    GradeDao.getAllGrades(function(grades){
                    response.render('Role/UpdateRole',{page_title:"Edit Roles - Node.js",role:role,grades:grades});
                    });
          });
        }
exports.PostUpdateRole =  function (request, response) {
            var input = JSON.parse(JSON.stringify(request.body));
            input.id=request.params.id;
            console.log(request.params.id);
            console.log("rou");

            var RoleDao = require('../Dao/RoleDao.js').RoleDao;
            console.log(input);
            RoleDao.updateRole(input, function (status) {
                response.json(status);
                console.log(status);
            });
                response.redirect("/viewAllRoles");

        }
exports.GetRoleByID = function (request, response) {


            var RoleDao = require('../Dao/RoleDao.js');

            RoleDao.RoleDao.getRoleByID(request.params.RoleID,
                function (role) {
                    response.json({ role: role });
                });
        }
                

exports.deletePermission = function(req,res){
     var id = req.params.id;
      console.log(id);
      RoleDao.deletePermission(id,function(status){
    });
   res.redirect("/viewAllRoles");

}
exports.deleteRole = function(req,res){
     var id = req.params.id;
      console.log(id);
      RoleDao.deleteRole(id,function(grades){
    });
   res.redirect("/viewAllRoles");

}
