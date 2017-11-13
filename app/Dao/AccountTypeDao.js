var models = require("../models");
var account_typeTable =models.account_type;

var AccountTypeDao = {

    createAccountType: function (account_type, OnSuccessfulCallback) {
        account_typeTable.create({
            name: account_type.name,
            country_id: account_type.country_id==null? 1:account_type.country_id,
        }).then(() => {
        })


    },
    getAccountTypeByID: function (account_typeID, callback) {
        //find one

        account_typeTable.find({
            where: {
                'id': account_typeID
            }
        }). then(data => {
            account_type = data;
            callback(account_type);
        });
    },

    updateAccountType: function (account_type, OnSuccessfulCallback) {
        console.log(account_type);
        account_typeTable.update(account_type, {
            where: {
                id: account_type.id
            }
        })
            .then(function (updatedRecords) {
                console.log(updatedRecords);
            })
            .catch(function (error) {
                console.log.json(error);
            });
      
    },
    deleteAccountType: function (account_typeId, OnSuccessfulCallback) {
console.log(account_typeId);
        account_typeTable.destroy({
            where: {
                id: account_typeId
            }
        })
            .then(function (deletedRecords) {
                console.log(deletedRecords);
            })
            .catch(function (error) {
                console.log.json(error);
            });

    },

    getAllAccountTypes: function (callback) {
        var account_types = [];
        account_typeTable.findAll().
            then(data => {
                account_types = data;
              
                callback(account_types);
            });
    }
};
exports.AccountTypeDao = AccountTypeDao;