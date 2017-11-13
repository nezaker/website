var models = require("../models");
var familyTable =models.family;

var FamilyDao = {

    createFamily: function (family, OnSuccessfulCallback) {
        familyTable.create({
            name: family.name,
            user_id: family.user_id
        }).then(() => {
        })


    },
    getFamilyByID: function (familyID, callback) {
        //find one

        familyTable.find({
            where: {
                'id': familyID
            }
        }). then(data => {
            family = data;
            callback(family);
        });
    },

    updateFamily: function (family, OnSuccessfulCallback) {
        console.log(family);
        familyTable.update(family, {
            where: {
                id: family.id
            }
        })
            .then(function (updatedRecords) {
                console.log(updatedRecords);
            })
            .catch(function (error) {
                console.log.json(error);
            });
      
    },
    deleteFamily: function (familyId, OnSuccessfulCallback) {
console.log(familyId);
        familyTable.destroy({
            where: {
                id: familyId
            }
        })
            .then(function (deletedRecords) {
                console.log(deletedRecords);
            })
            .catch(function (error) {
                console.log.json(error);
            });

    },

    getAllFamilies: function (callback) {
        var families = [];
        familyTable.findAll().
            then(data => {
                families = data;
              
                callback(families);
            });
    },
    getFamilyByCountryID: function (country_id, callback) {
        //find one
        familyTable.findAll({
            where: {
                'country_id': country_id
            }
        }). then(data => {
            family = data;
            callback(family);
        });
    }
};
exports.FamilyDao = FamilyDao;