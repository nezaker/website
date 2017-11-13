var exports = module.exports = {}
 var SubjectDao = require('../Dao/SubjectDao.js').SubjectDao;
var GradeDao = require('../Dao/GradeDao.js').GradeDao;
        var StageDao = require('../Dao/StageDao.js').StageDao;

var models = require("../models");
exports.GetCreateSubject = function(req,res){
      StageDao.getAllStagesWithGrads( function (stages) {
        res.json({stages});
});

       /* GradeDao.getAllGrades(function(grades){
          	res.render('Subject/createSubject',{page_title:"Create",grades:grades}); 
    });*/
}

exports.PostCreateSubject =function (request, response,next) {
           console.log(request.body);
           SubjectDao.createSubject(request.body, function (status) {
           response.json(status);
           console.log(status);
           });
           //  response.redirect('/viewSubject');
        }
exports.LessonsPage= function(req,res){
   res.render('Content/viewLessonsVideo');
  /* StageDao.getAllStagesWithGrads(
        function (stages) {
              //      res.locals.StagesNav=stages;
              
    res.render('Content/viewLessonsVideo',{page_title:"View All ",StagesNav:stages}); 
  });*/
  }

exports.getSubjectsPaged = function(req,res){

  var totalRecords,
    pageSize =10,
    pageCount,
    currentPage = 1;

SubjectDao.getCount(function (count) {
  totalRecords=count;
     pageCount=  Math.ceil(totalRecords/pageSize);
});
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  SubjectDao.getPaged(currentPage,pageSize,
   function (subjects) {
 res.json({subjects: subjects,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    totalRecords:totalRecords,
    pageName:"/viewSubject"}); 
  });
  }

exports.viewSubject = function(req,res){
  res.render('Subject/viewSubject',{page_title:"View All Subjects"});
  
/*
  var totalRecords,
    pageSize =10,
    pageCount,
    currentPage = 1;

SubjectDao.getCount(function (count) {
  totalRecords=count;
     pageCount=  Math.ceil(totalRecords/pageSize);
});
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  SubjectDao.getPaged(currentPage,pageSize,
   function (subjects) {
 res.render('Subject/viewSubject',{page_title:"View All Subjects",subjects: subjects,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    pageName:"/viewSubject"}); 
  });*/
  }
exports.getAllSubjects = function (request, response) {
            SubjectDao.getAllSubjects(
                function (subjects) {
                    response.json({ subjects: subjects });
                });
        }

exports.GetUpdateSubject = function (request, response) {
           var id = request.params.id;
           
            SubjectDao.getSubjectByID(request.params.SubjectID,
                function (subject) {
                     StageDao.getAllStagesWithGrads( function (stages) {

/*                    response.render('Subject/UpdateSubject',{page_title:"Edit Subjects - Node.js",subject:subject,grades:grades});
*/                   response.json({subject,stages}); });
          });
        }
exports.PostUpdateSubject =  function (request, response) {
            var input = JSON.parse(JSON.stringify(request.body));
            input.id=request.params.id;
            console.log(request.params.id);
            console.log("rou");

            var SubjectDao = require('../Dao/SubjectDao.js').SubjectDao;
            console.log(input);
            SubjectDao.updateSubject(input, function (status) {
                response.json(status);
                console.log(status);
            });
             //   response.redirect("/viewSubject");

        }
        
exports.FileUpload = function (req, res) {
          res.render("Account/FileUpload");
        }

exports.GetSubjectByID = function (request, response) {
            var SubjectDao = require('../Dao/SubjectDao.js');
            SubjectDao.SubjectDao.getSubjectByID(request.params.SubjectID,
                function (subject) {
                    response.json({ subject: subject });
                });
        }
         exports.GetSubjectByGradeID = function (request, response) {

console.log(request.params.GradeId);    
            var SubjectDao = require('../Dao/SubjectDao.js');
            SubjectDao.SubjectDao.getSubjectByGradeID(request.params.GradeId,
                function (subjects) {
                    response.json({ subjects: subjects });
                  });
   
}

         
exports.deleteSubject = function(req,res){
     var id = req.params.id;
      SubjectDao.deleteSubject(id,function(Status){
       response.json({ status });
    });
     
  
  // res.redirect("/viewSubject");
}


