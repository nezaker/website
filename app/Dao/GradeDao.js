var models = require("../models");
var gradeTable =models.grade;
var StageTable =models.stage;

var GradeDao = {

    createGrade: function (Grade, callback) {

        gradeTable.create({
            name: Grade.name,
            description: Grade.description,
            stage_id: Grade.stage_id,
            status: Grade.status,
            ordering: Grade.ordering==null?1:Grade.ordering
        }).then(function (updatedRecords) {
                console.log(updatedRecords);
               callback(updatedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);
            });
    },
    getGradeByID: function (gradeID, callback) {
        gradeTable.find({
            where: {
                'id': gradeID
            }
        }). then(data => {
            grade = data;
            callback(grade);
        });
    },

    updateGrade: function (grade, callback) {
        console.log(grade);
        gradeTable.update( {name: grade.name,
            description: grade.description,
            stage_id: grade.stage_id,
            status: grade.status,
            ordering: grade.ordering==null?1:grade.ordering}
            , { where: {id: grade.id }
        })
            .then(function (updatedRecords) {
                console.log(updatedRecords);
                callback(updatedRecords);

            })
            .catch(function (error) {
                console.log(error);
                callback(error);

            });
      
    },

 deleteGrade: function (gradeId, callback) {
console.log(gradeId);
        gradeTable.destroy({
            where: {
                id: gradeId
            }
        })
            .then(function (deletedRecords) {
                console.log(deletedRecords);
                callback(deletedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);

            });

    },
    getAllGrades: function (callback) {
      
        var Grades = [];
        gradeTable.belongsTo(StageTable);
        gradeTable.findAll({ include: StageTable }).then(data => {
            Grades = data;
         //   console.log(data);
            callback(Grades);
        });

    },
    getPaged: function (page,limit,callback) {
               var Grades = [];
        gradeTable.belongsTo(StageTable);
        gradeTable.findAll({ include: StageTable
            ,offset: (page-1)*limit, limit: limit ,order: [['created_at', 'DESC']]}).then(data => {
            Grades = data;
            callback(Grades);
        });
    },
     getCount: function (callback) {
        gradeTable.count().
            then(count => {               
                callback(count);
            });
    },
    getGradesByStageID: function (StageId ,callback) {
      
        var Grades = [];
        gradeTable.belongsTo(StageTable);
        gradeTable.findAll({ include: StageTable ,where :{"stage_id":StageId}}).then(data => {
            Grades = data;
         //   console.log(data);
            callback(Grades);
        });

    }

};
exports.GradeDao = GradeDao;