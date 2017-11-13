var models = require("../models");
var RoleUser =models.role_user;
var User =models.user;
var Role =models.role;


var RoleDao = {

    createRole: function (role, OnSuccessfulCallback) {
        roleTable.create({
            name: role.name,
            description: role.description,
           status: role.status,
            ordering: role.ordering
        }).then(() => {
        })


    },
    getRoleByID: function (roleID, callback) {
        //find one
        roleTable.find({
        include: [{
      }], 
            where: {
                'id': roleID
            }
        }). then(data => {
            role = data;
            callback(role);
        });
    },

    updateRole: function (role, OnSuccessfulCallback) {
        console.log(role);
        roleTable.update(role, {
            where: {
                id: role.id
            }
        })
            .then(function (updatedRecords) {
                console.log(updatedRecords);
            })
            .catch(function (error) {
                console.log(error);
            });
      
    },
     deletePermission: function (roleId, OnSuccessfulCallback) {

        models.permission.destroy( {
            where: {
                id: roleId
            }
        })
            .then(function (deletedRecords) {
                console.log(deletedRecords);
            })
            .catch(function (error) {
                console.log(error);
            });

    },

    deleteRole: function (roleId, OnSuccessfulCallback) {

        roleTable.destroy( {
            where: {
                id: roleId
            }
        })
            .then(function (deletedRecords) {
                console.log(deletedRecords);
            })
            .catch(function (error) {
                console.log(error);
            });

    },
     getAllPermissionRoles: function (callback) {
        models.permission_role.hasMany(models.permission);
         models.permission_role.hasMany(models.role);

        var Roles=[];
        models.permission_role.findAll
        ({
            attributes: [ require('sequelize').col('role.name'),[require('sequelize').fn('COUNT', require('sequelize').col('role.id')), 'product_count']],
            include: [models.permission,models.role] ,
             group : ['permission.id' ]
            }).then(data => {
                Roles = data;
              
                callback(Roles);
            });
}
,
     getPaged: function (page,limit,callback) {
     models.permission_role.belongsTo(models.role);
     models.permission_role.belongsTo(models.permission);

    var Roles=[];
models.permission_role.findAll(
    { include: [models.permission,models.role],
       offset: (page-1)*limit, limit: limit  }).
            then(data => {
                Roles = data;
                callback(Roles);
            });       
    },
     getCount: function (callback) {
        models.role.count().
            then(count => {               
                callback(count);
            });
    },
    
     getPermissionsPaged: function (page,limit,callback) {
    models.permission_role.belongsTo(models.role);
     models.permission_role.belongsTo(models.permission);

    var Roles=[];
models.permission_role.findAll(
    { include: [models.permission,models.role],
        offset: (page-1)*limit, limit: limit  }).
            then(data => {
                //Roles = data;
                callback(data);
            });  
              },
     getPermissionsCount: function (callback) {
        models.permission.count().
            then(count => {               
                callback(count);
            });
    },
    getAllRoles: function (callback) {
     models.permission_role.belongsTo(models.role);
     models.permission_role.belongsTo(models.permission);

    var Roles=[];
models.permission_role.findAll({ include: [models.permission,models.role]  }).
            then(data => {
                Roles = data;
              
                callback(Roles);
            });
}
      /*  RoleUser.belongsTo(User);
        RoleUser.belongsTo(Role);  
     var Roles = [];

       Role.findAll().
            then(data => {
                Roles = data;
              
                callback(Roles);
            });
    }
*/
       /* RoleUser.belongsTo(User);
        RoleUser.belongsTo(Role);  
     var Roles = [];

       RoleUser.findAll({ include: [Role,User]  }).
            then(data => {
                Roles = data;
              
                callback(Roles);
            });
    }*/
};
exports.RoleDao = RoleDao;