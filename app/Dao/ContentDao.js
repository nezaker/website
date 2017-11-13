var models = require("../models");
var contentTable =models.content;
var gradeTable=models.grade;
var moment = require('moment');

var ContentDao = {

    createContent : function (content, UserId,OnSuccessfulCallback) {
       console.log("**********************///////////////////////"+content);
/*       content.user_id=UserId;
*/       content.ordering=1;
       content.status=(content.status==null)?1:content.status;
        content.type=1;

      return  contentTable.create(content).then(function (status) {
                console.log(status);
                 callback(status);
           
            })
            .catch(function (error) {
                 callback(error);
            });;
      

    },
    getContentByID: function (contentID, callback) {
        //find one
                models.content.belongsTo(models.user);
        models.content.belongsTo(models.lesson);
        models.lesson.belongsTo(models.subject);  
        models.subject.belongsTo(models.grade);  
        models.grade.belongsTo(models.stage);  
  contentTable.find({
       include: [
        { model: models.lesson,
          include: [
            { model: models.subject,
               include: [
                  {model:models.grade, include: [{model:models.stage} ]}]
            }]},{ model: models.user  }] , 
            where: {
                'id': contentID
            }
        }). then(data => {
            content = data;
            callback(content);
        });
    },

    updateContent: function (content, callback) {
        console.log(content);
         content.created_at=  moment.utc( content.created_at).format('YYYY-MM-DD HH:mm:ss');
      content.updated_at=  moment.utc(content.updated_at).format('YYYY-MM-DD HH:mm:ss');

        contentTable.update(content, {
            where: {
                id: content.id
            }
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
    deleteContent: function (contentId, OnSuccessfulCallback) {

        contentTable.destroy( {
            where: {
                id: contentId
            }
        })
            .then(function (deletedRecords) {
                console.log(deletedRecords);
            callback(updatedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);

            });
    },
  
   getLastContents: function (callback) {
         models.content.belongsTo(models.user);
        models.content.belongsTo(models.lesson);
        models.lesson.belongsTo(models.subject);  
        models.subject.belongsTo(models.grade);  
        models.grade.belongsTo(models.stage);  

        var Contents = [];

        models.content.findAll({ include: [
        { model: models.lesson,
          include: [
            {
              model: models.subject,
               include: [
                  {model:models.grade, include: [{model:models.stage} ]}
            ]
            }
          ]
        },{ model: models.user  }
            ] ,limit: 6,     
      /* where: {thumbnail : {$ne: null},youtube_video_id:{$ne: null}} ,order: [['created_at', 'DESC']]}).
      */ where: {status:2} ,order: [['created_at', 'DESC']]}).
            then(data => {
            
                Contents = data;
                callback(Contents);
            });
    },

    getAllContents: function (callback) {
       models.content.belongsTo(models.user);
        models.content.belongsTo(models.lesson);
        models.lesson.belongsTo(models.subject);  
        models.subject.belongsTo(models.grade);  
        models.grade.belongsTo(models.stage);  


        var Contents = [];

        models.content.findAll({ include: [
        { model: models.lesson,
          include: [
            { model: models.subject,
               include: [
                  {model:models.grade, include: [{model:models.stage} ]}]
            }]},{ model: models.user  }] 
        ,where: {status:2} ,order: [['created_at', 'DESC']] }).
            then(data => {
                Contents = data;
              
                callback(Contents);
            });
    },
   
     getCount: function (callback) {
        models.content.count().
            then(count => {               
                callback(count);
            });
    },
getAllContentsAdminPaged: function (page,limit,callback) {
      models.content.belongsTo(models.user);
        models.content.belongsTo(models.lesson);
        models.lesson.belongsTo(models.subject);  
        models.subject.belongsTo(models.grade);  
        models.grade.belongsTo(models.stage);  
        var Contents = [];
        models.content.findAll({ include: [
        { model: models.lesson,
          include: [
            { model: models.subject,
               include: [
                  {model:models.grade, include: [{model:models.stage} ]}]
            }]},{ model: models.user  }] 
            ,offset: (page-1)*limit, limit: limit ,order: [['created_at', 'DESC']] }).
            then(data => {
                Contents = data;
              
                callback(Contents);
            });
    },
getAllContentsAdmin: function (callback) {

      models.content.belongsTo(models.user);
        models.content.belongsTo(models.lesson);
        models.lesson.belongsTo(models.subject);  
        models.subject.belongsTo(models.grade);  
        models.grade.belongsTo(models.stage);  


        var Contents = [];

        models.content.findAll({ include: [
        { model: models.lesson,
          include: [
            { model: models.subject,
               include: [
                  {model:models.grade, include: [{model:models.stage} ]}]
            }]},{ model: models.user  }] ,order: [['created_at', 'DESC']] }).
            then(data => {
                Contents = data;
              
                callback(Contents);
            });
    },
    getAllContentsBySubjectID: function (SubjectID,callback) {
               models.content.belongsTo(models.user);
        models.content.belongsTo(models.lesson);
        models.lesson.belongsTo(models.subject);  
        models.subject.belongsTo(models.grade);  
        models.grade.belongsTo(models.stage);  

  var Contents = [];

        models.content.findAll({ include: [
        {           
          model: models.lesson,where :{'subject_id':SubjectID },
          include: [
            { model: models.subject,
               include: [
                  {model:models.grade, include: [{model:models.stage} ]}]
            }]},{ model: models.user  }] ,
where: {status:2} ,order: [['created_at', 'DESC'] ] }).
            then(data => {
                Contents = data;
              
                callback(Contents);
            });
    },
     getContentsByStatus: function (status,UserId,callback) {
                models.content.belongsTo(models.user);
        models.content.belongsTo(models.lesson);
        models.lesson.belongsTo(models.subject);  
        models.subject.belongsTo(models.grade);  
        models.grade.belongsTo(models.stage);  


        var Contents = [];

        models.content.findAll({ include: [
        { model: models.lesson,
          include: [
            { model: models.subject,
               include: [
                  {model:models.grade, include: [{model:models.stage} ]}]
            }]},{ model: models.user  }] ,
       where: {status:status,user_id:UserId} ,order: [['created_at', 'DESC']]}).
            then(data => {
                Contents = data;

                callback(Contents);
            });
    }
};
exports.ContentDao = ContentDao;