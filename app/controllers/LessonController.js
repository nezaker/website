var exports = module.exports = {}
 var LessonDao = require('../Dao/LessonDao.js').LessonDao;
var SubjectDao = require('../Dao/SubjectDao.js').SubjectDao;
var StageDao = require('../Dao/StageDao.js').StageDao;


exports.GetCreateLesson = function(req,res){
        StageDao.getAllStages(function(stages){
            res.json({stages}); 
          	//res.render('Lesson/createLesson',{page_title:"Create",subjects:subjects}); 
}); 
}

exports.PostCreateLesson =function (request, response,next) {
           console.log(request.body);
           LessonDao.createLesson(request.body, function (status) {
           response.json(status);
           console.log(status);
           });
           //  response.redirect('/viewLesson');
        }

exports.viewLesson = function(req,res){
  LessonDao.getAllLessons(
   function (lessons) {
 res.render('Lesson/viewLesson',{page_title:"View All Lessons",lessons: lessons}); 
  });
  }
  
exports.getLessonPaged = function(req,res){

    var totalRecords,
    pageSize =10,
    pageCount,
    currentPage = 1;

LessonDao.getCount(function (count) {
  totalRecords=count;
     pageCount=  Math.ceil(totalRecords/pageSize);
});
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  LessonDao.getPaged(currentPage,pageSize,
   function (records) {
 res.json({lessons: records,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    pageName:"/viewAllLesson"}); 
  });
  }

exports.viewLessonPaged = function(req,res){

   res.render('Lesson/viewLesson',{page_title:"View All Lessons"});
  }

exports.getAllLessons = function (request, response) {
            LessonDao.getAllLessons(
                function (lessons) {
                    response.json({ lessons: lessons });
                });
        }

exports.GetUpdateLesson = function (request, response) {
           var id = request.params.id;
           
            LessonDao.getLessonByID(request.params.LessonID,
                function (lesson) {
        StageDao.getAllStages(function(stages){
                    response.json({lesson,stages});
                  //  response.render('Lesson/UpdateLesson',{page_title:"Edit Lessons - Node.js",lesson:lesson,subjects:subjects});
                    });
          });
        }
exports.PostUpdateLesson =  function (request, response) {
            var input = JSON.parse(JSON.stringify(request.body));
            input.id=request.params.id;
            var LessonDao = require('../Dao/LessonDao.js').LessonDao;
            console.log(input);
            LessonDao.updateLesson(input, function (status) {
                response.json(status);
                console.log(status);
            });
           //     response.redirect("/viewLesson");

        }
exports.GetLessonByID = function (request, response) {
            var LessonDao = require('../Dao/LessonDao.js');
            LessonDao.LessonDao.getLessonByID(request.params.LessonID,
                function (lesson) {
                    response.json({ lesson: lesson });
                });
        }
        
exports.deleteLesson = function(req,res){
     var id = req.params.id;
      LessonDao.deleteLesson(id,function(status){
        res.json(status);
    });
   //res.redirect("/viewLesson");

}