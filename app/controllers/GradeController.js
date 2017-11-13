var exports = module.exports = {}
 var GradeDao = require('../Dao/GradeDao.js').GradeDao;
var StageDao = require('../Dao/StageDao.js').StageDao;
        

exports.GetCreateGrade = function(req,res){
        StageDao.getAllStages(function(stages){
           // res.render('Grade/createGrade',{page_title:"Create",Stages:Stages}); 
            res.json({stages}); 
    });
}

exports.PostCreateGrade =function (request, response,next) {
           console.log(request.body);
           GradeDao.createGrade(request.body, function (status) {
           response.json(status);
           console.log(status);
           });
            // response.redirect('/viewGrade');
        }

exports.viewAllGrades = function(req,res){
  GradeDao.getAllGrades(
   function (grades) {
 res.render('Grade/viewGrades',{page_title:"View All Grades",grades: grades}); 
  });
  }

exports.getGradesPaged = function (req, res) {
          
var totalRecords,
    pageSize =10,
    pageCount,
    currentPage = 1;

GradeDao.getCount(function (count) {
  totalRecords=count;
     pageCount=  Math.ceil(totalRecords/pageSize);
});
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  GradeDao.getPaged(currentPage,pageSize,
   function (records) {
 res.json({grades:  records,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    pageName:"/viewAllGrades"}); 
  });
  
  }
exports.getPaged = function (req, res) {
          
var totalRecords,
    pageSize =10,
    pageCount,
    currentPage = 1;

GradeDao.getCount(function (count) {
  totalRecords=count;
     pageCount=  Math.ceil(totalRecords/pageSize);
});
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  GradeDao.getPaged(currentPage,pageSize,
   function (records) {
 res.render('Grade/viewGrades',{page_title:"View All Grades",grades:  records,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    pageName:"/viewAllGrades"}); 
  });
  
  }
exports.getAllGrades = function (request, response) {
            GradeDao.getAllGrades(
                function (grades) {
                    response.json({ grades: grades });
                });
        }

exports.GetUpdateGrade = function (request, response) {
           var id = request.params.id;
           
            GradeDao.getGradeByID(request.params.GradeID,
                function (grade) {
                 StageDao.getAllStages(function(stages){
                   // response.render('Grade/UpdateGrade',{page_title:"Edit Grades - Node.js",grade:grade,grades:grades});
                    response.json({grade,stages});
                    
                    });
          });
        }
exports.PostUpdateGrade =  function (request, response) {
            var input = JSON.parse(JSON.stringify(request.body));
            input.id=request.params.id;
            var GradeDao = require('../Dao/GradeDao.js').GradeDao;
            GradeDao.updateGrade(input, function (status) {
                response.json(status);
                console.log(status);
            });
      //          response.redirect("/Grade/viewGrades");

        }
exports.GetGradeByID = function (request, response) {


            var GradeDao = require('../Dao/GradeDao.js');

            GradeDao.GradeDao.getGradeByID(request.params.GradeID,
                function (grade) {
                    response.json({ grade: grade });
                });
        }
        
exports.deleteGrade = function(req,res){
     var id = req.params.id;
      console.log(id);
      GradeDao.deleteGrade(id,function(status){
                    response.json({ status });

    });
  // res.redirect("/Grade/viewGrades");

}