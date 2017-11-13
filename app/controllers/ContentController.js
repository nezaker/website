var exports = module.exports = {}
 var ContentDao = require('../Dao/ContentDao.js').ContentDao;
var StageDao = require('../Dao/StageDao.js').StageDao;
var GradeDao = require('../Dao/GradeDao.js').GradeDao;
var SubjectDao = require('../Dao/SubjectDao.js').SubjectDao;        
var authController = require('../controllers/authcontroller.js');

exports.GetCreateContent = function(req,res){
      StageDao.getAllStages(function(stages){
          	res.render('Content/createContent',{page_title:"Create",stages}); 
    });
}


exports.PostCreateContentPopup =function (req, res) {
            var input = JSON.parse(JSON.stringify(req.body));
            input.user_id=req.user.id;
           ContentDao.createContent(input, req.user.id,function (status) {
           res.json(status);
           console.log(status);
                      
           }).then(function (status) {
       
            })
            .catch(function (error) {
            });
         //    
        }


exports.PostCreateContent =function (req, res) {
            var input = JSON.parse(JSON.stringify(req.body));
            input.user_id=req.user.id;
           ContentDao.createContent(input, req.user.id,function (status) {
           res.json(status);
           console.log(status);
                      
           }).then(function (status) {
       
         res.locals.messages=  req.flash('success', { msg: 'تمت الاضافه. ' });
            })
            .catch(function (error) {
      res.locals.messages=   req.flash('error', error);
            });

                    res.redirect('/dashboard');

         //    
        }


exports.viewAllContent = function(req,res){
  ContentDao.getAllContentsAdmin(
   function (contents) {
 res.render('Content/viewAllContent',{page_title:"View All Contents",contents: contents}); 
  });
  }
  exports.viewAllContentAdminPaged = function(req,res){
res.render('Content/viewAllContent',{page_title:"View All Contents"});
}

exports.getContentsPaged = function(req,res){
  var totalRecords,
    pageSize =Pagination.LargePageSize,
    pageCount,
    currentPage = 1;
    ContentDao.getCount(function (count) {
  totalRecords=count;
     pageCount=  Math.ceil(totalRecords/pageSize);
if (typeof req.query.page !== 'undefined') {
    currentPage = +req.query.page;
  }
  ContentDao.getAllContentsAdminPaged(currentPage,pageSize,
   function (contents) {
 res.json({contents: contents,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage:  currentPage,
    pageName:"/viewAllContent"}); 
  });
  
});
  }
exports.GetLessonsBySubjectID = function (request, response) {

      console.log(request.params.SubjectId);    
            var ContentDao = require('../Dao/ContentDao.js');
           ContentDao.ContentDao.getAllContentsBySubjectID(request.params.SubjectId,
                function (lessons) {
                    response.json({ lessons: lessons });
       });
}


exports.getGradesByStageID = function (request, response) {

console.log(request.params.StageId);    
           GradeDao.getGradesByStageID(request.params.StageId,
                function (grades) {
                    response.json({ grades: grades });
       });
}
exports.getAllContents = function (request, response) {
            ContentDao.getAllContents(
                function (contents) {
                    response.json({ contents });
                });
        }
exports.getLastContents = function (req, res) {
 ContentDao.getLastContents(
   function (LastContents) {
        // global.LastContents={values:LastContents}
        res.json ({LastContents});
  });
}
exports.GetUpdateContent = function (request, response) {
           var id = request.params.id;
           
            ContentDao.getContentByID(request.params.ContentID,
                function (content) {
       StageDao.getAllStages(function(stages){
                    //response.render('Content/updateContent',{page_title:"Edit Contents - Node.js",content,stages});
                    response.json({content,stages});
                    });
          });
        }
exports.PostUpdateContent =  function (request, response) {
            var input = JSON.parse(JSON.stringify(request.body));
            input.id=request.params.id;
            console.log(request.params.id);
            console.log("rou");

            console.log(input);
            ContentDao.updateContent(input, function (status) {
                response.json(status);
                console.log(status);
            });
               // response.redirect("/AdminPage");

        }
exports.GetContentByID = function (request, response) {         
          ContentDao.getContentByID(request.params.id,
                function (content) {
                    response.json({ content: content });
                });
        }

exports.viewContent = function (request, response) {
  ContentDao.getContentByID(request.params.id,
   function (content) {
    response.render("Content/viewContent",{ content: content });
   });
}
exports.deleteContent= function(req,res){
     var id = req.params.id;
      console.log(id);
      ContentDao.deleteContent(id,function(){
    });
   res.redirect("/viewAllContent");

}

exports.viewSubjectLessons = function (request, response) {
    response.render("Content/viewSubjectLessons",{SubjectID:request.params.SubjectId});
 }