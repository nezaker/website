var models = require("../models");
var subjectTable =models.subject;
var gradeTable=models.grade;

var SubjectDao = {

    createSubject: function (subject, callback) {
        subjectTable.create({
            name: subject.name,
            description: subject.description,
            grade_id: subject.grade_id,
            status: subject.status,
            ordering: subject.ordering==null?1 :subject.ordering
        }).then(function (updatedRecords) {
                console.log(updatedRecords);
               callback(updatedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);
            });
    },
    getSubjectByID: function (subjectID, callback) {
        //find one
        subjectTable.belongsTo(gradeTable);
         subjectTable.find({include: [gradeTable],
            where: {
                'id': subjectID
            }
        }). then(data => {
            subject = data;
            callback(subject);
        });
    },

    updateSubject: function (subject, callback) {
        subjectTable.update({ name: subject.name,
            description: subject.description,
            grade_id: subject.grade_id,
            status: subject.status}, {
            where: { id: subject.id}})
            .then(function (updatedRecords) {
                console.log(updatedRecords);
               callback(updatedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);
            });
      
    },
    deleteSubject: function (subjectId, callback) {
         subjectTable.destroy({where: { id: subjectId}})
            .then(function (deletedRecords) {
                console.log(deletedRecords);
                callback(deletedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);
});

    },
 getLastSubjects: function (callback) {
        var subjects = [];
        subjectTable.belongsTo(gradeTable);
        subjectTable.findAll({ include: [gradeTable] ,  limit: 6,order: [['created_at', 'DESC']]}).
            then(data => {
                subjects = data;
              
                callback(subjects);
            });
    },

    getAllSubjects: function (callback) {
        var subjects = [];
        subjectTable.belongsTo(gradeTable);
        subjectTable.findAll({ include: [gradeTable] }).
            then(data => {
                subjects = data;
              
                callback(subjects);
            });
    },
     getPaged: function (page,limit,callback) {
        var subjects = [];
        subjectTable.belongsTo(models.grade);
        models.grade.belongsTo(models.stage);
        subjectTable.findAll({ include: [
                  {model:models.grade, include: [{model:models.stage} ]}]
         ,offset: (page-1)*limit, limit: limit ,order: [['created_at', 'DESC']]}).
            then(data => {
                subjects = data;
              
                callback(subjects);
            });
    },
     getCount: function (callback) {
        subjectTable.count().
            then(count => {               
                callback(count);
            });
    },
    getSubjectByGradeID: function (GradeId, callback) {
        //find one
        subjectTable.findAll({
            where: {
                'grade_id': GradeId
            }
        }). then(data => {
            subject = data;
            callback(subject);
        });
    }
};
exports.SubjectDao = SubjectDao;