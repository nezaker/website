var exports = module.exports = {}
 var StageDao = require('../Dao/StageDao.js').StageDao;
var GradeDao = require('../Dao/GradeDao.js').GradeDao;
        

exports.GetCreateStage = function(req,res){
          	res.render('Stage/createStage',{page_title:"Create"}); 
  
}

exports.PostCreateStage =function (request, response,next) {
           console.log(request.body);
           StageDao.createStage(request.body, function (status) {
           response.json(status);
           console.log(status);
           });
          //   response.redirect('/viewStage');
        }

exports.viewAllStages = function(req,res){
  StageDao.getAllStages(
   function (stages) {
 res.render('Stage/viewStages',{page_title:"View All Stages",stages: stages}); 
  });
  }
exports.getAllStages = function (request, response) {
            StageDao.getAllStagesWithGrads(
                function (stages) {
                    response.json({ stages });
                });
        }
exports.getStagesNav = function (request, response) {
            StageDao.getAllStagesWithGrads(
                function (stages) {
                    res.locals.StagesNav=stages;
                });
        }

exports.GetUpdateStage = function (request, response) {
           var id = request.params.id;
            StageDao.getStageByID(request.params.StageID,
                function (stage) {
                   // response.render('Stage/UpdateStage',{page_title:"Edit Stages - Node.js",stage:stage});
                    response.json({stage});
          });
        }
exports.PostUpdateStage =  function (request, response) {
            var input = JSON.parse(JSON.stringify(request.body));
            input.id=request.params.id;
             var StageDao = require('../Dao/StageDao.js').StageDao;
            console.log(input);
            StageDao.updateStage(input, function (status) {
                response.json(status);
                console.log(status);
            });
              //  response.redirect("/viewStage");

        }
exports.GetStageByID = function (request, response) {
            var StageDao = require('../Dao/StageDao.js');
            StageDao.StageDao.getStageByID(request.params.StageID,
                function (stage) {
                    response.json({ stage: stage });
                });
        }
        
exports.getStagesPaged = function(req,res){
    var totalRecords,
    pageSize =10,
    pageCount,
    currentPage = 1;

StageDao.getCount(function (count) {
  totalRecords=count;
     pageCount=  Math.ceil(totalRecords/pageSize);
});
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  StageDao.getPaged(currentPage,pageSize,
   function (records) {
// res.render('Stage/viewStages',{page_title:"View All Stages",stages: records,
   res.json({stages: records,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    pageName:"/viewAllStages"}); 
  });
}
exports.viewAllStagesPaged = function(req,res){
  res.render('Stage/viewStages',{page_title:"View All Stages"});
    /*var totalRecords,
    pageSize =10,
    pageCount,
    currentPage = 1;

StageDao.getCount(function (count) {
  totalRecords=count;
     pageCount=  Math.ceil(totalRecords/pageSize);
});
  //set current page if specifed as get variable (eg: /?page=2)
  if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  StageDao.getPaged(currentPage,pageSize,
   function (records) {

// res.render('Stage/viewStages',{page_title:"View All Stages",stages: records,
   res.json({stages: records,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    pageName:"/viewAllStages"}); 
  });*/
 
  }

exports.deleteStage = function(req,res){
     var id = req.params.id;
      StageDao.deleteStage(id,function(status){
      res.json({ status });

    });
   //res.redirect("/viewStage");
}
