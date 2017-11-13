var models = require("../models");
var lessonTable =models.lesson;
var subjectTable=models.subject;

var LessonDao = {

    createLesson: function (lesson, callback) {
        lessonTable.create({
            name: lesson.name,
            description: lesson.description,
            subject_id: lesson.subject_id,
            status: lesson.status,
            ordering: lesson.ordering==null?1:lesson.ordering,
            semester:lesson.semester==null?1:lesson.semester
        }).then(function (updatedRecords) {
                console.log(updatedRecords);
               callback(updatedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);
            });
    },
    getLessonByID: function (lessonID, callback) {
        //find one
         models.lesson.belongsTo(models.subject);  
        models.subject.belongsTo(models.grade);  
        models.grade.belongsTo(models.stage);  
        lessonTable.find({include: [
        {
          model: models.subject,
          include: [{ model: models.grade ,include: [{ model: models.stage  }] }]
        }],      where: {'id': lessonID }
        }). then(data => {
            lesson = data;
            callback(lesson);
        });
    },

    updateLesson: function (lesson, callback) {
        console.log(lesson);
        lessonTable.update({ name: lesson.name,
            description: lesson.description,
            subject_id: lesson.subject_id,
            status: lesson.status,
            ordering: lesson.ordering==null?1:lesson.ordering,
            semester:lesson.semester==null?1:lesson.semester},
            {where: { id: lesson.id }
        }).then(function (updatedRecords) {
                console.log(updatedRecords);
                callback(updatedRecords);

            })
            .catch(function (error) {
                console.log(error);
                callback(error);

            });
      
    },
    deleteLesson: function (lessonId, callback) {

        lessonTable.destroy( {  where: { id: lessonId }  })
            .then(function (deletedRecords) {
                console.log(deletedRecords);
             callback(deletedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);
            });
    },
 getLastLessons: function (callback) {
        var lessons = [];
        lessonTable.belongsTo(subjectTable);
        lessonTable.findAll({ include: [subjectTable] ,  limit: 6,order: [['created_at', 'DESC']]}).
            then(data => {
                lessons = data;
              
                callback(lessons);
            });
    },
    getAllLessons: function (callback) {
        var lessons = [];
        models.lesson.belongsTo(models.subject);  
        models.subject.belongsTo(models.grade);  
        models.lesson.findAll({ include: [
        {
          model: models.subject,
          include: [{ model: models.grade
            }]
        }] }).
            then(data => {
                lessons = data;     
                callback(lessons);
            });
    },
     getPaged: function (page,limit,callback) {
        var lessons = [];
        models.lesson.belongsTo(models.subject);  
        models.subject.belongsTo(models.grade);  
        models.grade.belongsTo(models.stage);  
        models.lesson.findAll({ include: [
        {
          model: models.subject,
          include: [{ model: models.grade ,include: [{ model: models.stage  }] }]
        }],offset: (page-1)*limit, limit: limit ,order: [['created_at', 'DESC']]}).
            then(data => {
                lessons = data;     
                callback(lessons);
            });
    },
     getCount: function (callback) {
        models.lesson.count().
            then(count => {               
                callback(count);
            });
    },
};
exports.LessonDao = LessonDao;