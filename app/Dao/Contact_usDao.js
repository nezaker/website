var models = require("../models");
var contact_usTable =models.contact_us;

var Contact_usDao = {

    createContactMessage: function (message, OnSuccessfulCallback) {
        contact_usTable.create({
            name: message.name,
            email: message.email,
            phone_number: message.phone_number,
            message: message.message
             }).then(() => {
        })


    },
    getContact_usByID: function (contact_usID, callback) {
        //find one

        contact_usTable.find({
            where: {
                'id': contact_usID
            }
        }). then(data => {
            contact_us = data;
            callback(contact_us);
        });
    },

    updateContact_us: function (contact_us, OnSuccessfulCallback) {
        console.log(contact_us);
        contact_usTable.update(contact_us, {
            where: {
                id: contact_us.id
            }
        })
            .then(function (updatedRecords) {
                console.log(updatedRecords);
            })
            .catch(function (error) {
                console.log.json(error);
            });
      
    },
    deleteContact_us: function (contact_usId, OnSuccessfulCallback) {
console.log(contact_usId);
        contact_usTable.destroy({
            where: {
                id: contact_usId
            }
        })
            .then(function (deletedRecords) {
                console.log(deletedRecords);
            })
            .catch(function (error) {
                console.log.json(error);
            });

    },

    getAllContact_usMessage: function (callback) {
        var Contact_usMessage = [];
        contact_usTable.findAll().
            then(data => {
                Contact_usMessage = data;
              
                callback(Contact_usMessage);
            });
    },
    getContact_usByCountryID: function (country_id, callback) {
        //find one
        contact_usTable.findAll({
            where: {
                'country_id': country_id
            }
        }). then(data => {
            contact_us = data;
            callback(contact_us);
        });
    }
};
exports.Contact_usDao = Contact_usDao;