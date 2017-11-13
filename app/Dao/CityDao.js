var models = require("../models");
var cityTable =models.city;

var CityDao = {

    createCity: function (city, OnSuccessfulCallback) {
        cityTable.create({
            name: city.name,
            country_id: city.country_id==null? 1:city.country_id,
            is_enabled: 1,
        }).then(() => {
        })


    },
    getCityByID: function (cityID, callback) {
        //find one

        cityTable.find({
            where: {
                'id': cityID
            }
        }). then(data => {
            city = data;
            callback(city);
        });
    },

    updateCity: function (city, OnSuccessfulCallback) {
        console.log(city);
        cityTable.update(city, {
            where: {
                id: city.id
            }
        })
            .then(function (updatedRecords) {
                console.log(updatedRecords);
            })
            .catch(function (error) {
                console.log.json(error);
            });
      
    },
    deleteCity: function (cityId, OnSuccessfulCallback) {
console.log(cityId);
        cityTable.destroy({
            where: {
                id: cityId
            }
        })
            .then(function (deletedRecords) {
                console.log(deletedRecords);
            })
            .catch(function (error) {
                console.log.json(error);
            });

    },

    getAllCities: function (callback) {
        var cities = [];
        cityTable.findAll().
            then(data => {
                cities = data;
              
                callback(cities);
            });
    },
    getCityByCountryID: function (country_id, callback) {
        //find one
        cityTable.findAll({
            where: {
                'country_id': country_id
            }
        }). then(data => {
            city = data;
            callback(city);
        });
    }
};
exports.CityDao = CityDao;