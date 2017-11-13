var models = require("../models");
var stageTable =models.stage;

var StageDao = {

    createStage: function (stage, callback) {
        stageTable.create({
            name: stage.name,
            description: stage.description,
            status: stage.status,
            ordering: stage.ordering==null?1:stage.ordering
        }).then(function (updatedRecords) {
                console.log(updatedRecords);
               callback(updatedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);
            });
    },
    getStageByID: function (stageID, callback) {
        //find one

        stageTable.find({
            where: {
                'id': stageID
            }
        }). then(data => {
            stage = data;
            callback(stage);
        });
    },

    updateStage: function (stage, callback) {
        console.log(stage);
        stageTable.update({
            name: stage.name,
            description: stage.description,
            status: stage.status,
            ordering: stage.ordering==null?1:stage.ordering, 
            where: { id: stage.id   }
        }).then(function (updatedRecords) {
                console.log(updatedRecords);
               callback(updatedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);
            });
    },
    deleteStage: function (stageId, callback) {

        stageTable.destroy({ where: { id: stageId  }})
            .then(function (deletedRecords) {
                console.log(deletedRecords);
             callback(deletedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);
            });
    },

    getAllStages: function (callback) {
        var stages = [];
        stageTable.findAll().
            then(data => {
                stages = data;
                callback(stages);
            });
    },

    getAllStagesWithGrads: function (callback) {
        var stages = [];
        stageTable.hasMany(models.grade);
        models.grade.belongsTo(stageTable);
        stageTable.findAll({ include: [models.grade] }).
            then(data => {
                stages = data;
              
                callback(stages);
            });
    },
     getPaged: function (page,limit,callback) {
        var stages = [];
        stageTable.findAll({ offset: (page-1)*limit, limit: limit }).
            then(data => {
                stages = data;
                callback(stages);
            });
    },
     getCount: function (callback) {
        stageTable.count().
            then(count => {               
                callback(count);
            });
    }

};
exports.StageDao = StageDao;