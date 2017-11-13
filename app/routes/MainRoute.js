var Controller = require('../controllers/SubjectController.js');
var GradeController = require('../controllers/GradeController.js');
var authController = require('../controllers/authcontroller.js');
var ContentCtrl = require('../controllers/ContentController.js');
var LessonCtrl = require('../controllers/LessonController.js');
var StageController = require('../controllers/StageController.js');
var UserController = require('../controllers/UserController.js');
var RoleController = require('../controllers/RoleController.js');

module.exports = function(app){
//Subject


app.get('/FileUpload',authController.isLoggedIn, Controller.FileUpload);

app.get('/getSubjectByGradeID/:GradeId',authController.isLoggedIn,Controller.GetSubjectByGradeID);
app.get('/getLessonsBySubjectID/:SubjectId',authController.isLoggedIn,ContentCtrl.GetLessonsBySubjectID);
app.get('/getGradesByStageID/:StageId',authController.isLoggedIn,ContentCtrl.getGradesByStageID);

app.get('/createSubject',authController.isLoggedIn, Controller.GetCreateSubject);
app.post('/createSubject',authController.isLoggedIn, Controller.PostCreateSubject);

app.get('/UpdateSubject/:SubjectID', authController.isLoggedIn,Controller.GetUpdateSubject);
app.post('/UpdateSubject/:id',authController.isLoggedIn, Controller.PostUpdateSubject);
app.get('/deleteSubject/:id',authController.isLoggedIn, Controller.deleteSubject);


app.get('/getAllSubjects',authController.isLoggedIn, Controller.getAllSubjects);
app.get('/getSubjectByID/:SubjectID',authController.isLoggedIn, Controller.GetSubjectByID);
/*app.get('/viewSubject',authController.isLoggedIn,Controller.viewSubject);*/

app.get('/getSubjectsPaged',authController.isAdmin,Controller.getSubjectsPaged);
app.get('/viewSubject',authController.isAdmin,Controller.viewSubject);
app.get('/LessonsPage',authController.isLoggedIn,Controller.LessonsPage);

//Stage
app.get('/createStage',authController.isLoggedIn, StageController.GetCreateStage);
app.post('/createStage', authController.isLoggedIn,StageController.PostCreateStage);

app.get('/UpdateStage/:StageID',authController.isLoggedIn, StageController.GetUpdateStage);
app.post('/UpdateStage/:id', authController.isLoggedIn,StageController.PostUpdateStage);
app.get('/deleteStage/:id',authController.isLoggedIn, StageController.deleteStage);


app.get('/getAllStages',authController.isLoggedIn, StageController.getAllStages);
app.get('/getStageByID/:StageID', authController.isLoggedIn,StageController.GetStageByID);
app.get('/viewAllStages',authController.isAdmin, StageController.viewAllStagesPaged);
app.get('/getStagesPaged',authController.isAdmin, StageController.getStagesPaged);
/*app.get('/viewAllStages',authController.isAdmin, StageController.viewAllStages);*/


//Grade
app.get('/createGrade',authController.isLoggedIn, GradeController.GetCreateGrade);
app.post('/createGrade', authController.isLoggedIn,GradeController.PostCreateGrade);

app.get('/UpdateGrade/:GradeID',authController.isLoggedIn, GradeController.GetUpdateGrade);
app.post('/UpdateGrade/:id', authController.isLoggedIn,GradeController.PostUpdateGrade);
app.get('/deleteGrade/:id', GradeController.deleteGrade);


app.get('/getAllGrades',authController.isLoggedIn, GradeController.getAllGrades);
app.get('/getGradesPaged',authController.isLoggedIn, GradeController.getGradesPaged);
app.get('/getGradeByID/:GradeID', authController.isLoggedIn,GradeController.GetGradeByID);
/*app.get('/viewAllGrades',authController.isLoggedIn, GradeController.viewAllGrades);
*/app.get('/viewAllGrades',authController.isLoggedIn, GradeController.getPaged);

//Content

 
  
app.get('/getLastContents',ContentCtrl.getLastContents);
app.get('/createContent',authController.isLoggedIn,ContentCtrl.GetCreateContent);
app.post('/createContent',authController.isLoggedIn,ContentCtrl.PostCreateContent);
app.post('/PostCreateContentPopup',authController.isLoggedIn,ContentCtrl.PostCreateContentPopup);

app.get('/updateContent/:ContentID', authController.isAdmin,ContentCtrl.GetUpdateContent);
app.post('/updateContent/:id',authController.isAdmin, ContentCtrl.PostUpdateContent);
app.get('/deleteContent/:id',authController.isAdmin, ContentCtrl.deleteContent);


app.get('/getAllContents', authController.isLoggedIn,ContentCtrl.getAllContents);
app.get('/getContentByID/:ContentID',authController.isLoggedIn, ContentCtrl.GetContentByID);
app.get('/viewAllContent',authController.isAdmin, ContentCtrl.viewAllContentAdminPaged);
app.get('/getContentsPaged',authController.isAdmin, ContentCtrl.getContentsPaged);
app.get('/viewContent/:id', authController.isLoggedIn,ContentCtrl.viewContent);
//get all children Subjects 
app.get('/viewSubjectLessons/:SubjectId', authController.isLoggedIn,ContentCtrl.viewSubjectLessons);

//app.get('/createContent',authController.isLoggedIn,ContentCtrl.GetCreateContent);

//Lesson


app.get('/createLesson',authController.isLoggedIn,LessonCtrl.GetCreateLesson);
app.post('/createLesson',authController.isLoggedIn, LessonCtrl.PostCreateLesson);

app.get('/UpdateLesson/:LessonID',authController.isLoggedIn, LessonCtrl.GetUpdateLesson);
app.post('/UpdateLesson/:id',authController.isLoggedIn, LessonCtrl.PostUpdateLesson);
app.get('/deleteLesson/:id', authController.isLoggedIn,LessonCtrl.deleteLesson);


app.get('/getAllLessons',authController.isLoggedIn, LessonCtrl.getAllLessons);
app.get('/getLessonByID/:LessonID',authController.isLoggedIn, LessonCtrl.GetLessonByID);
app.get('/viewAllLesson',authController.isLoggedIn,LessonCtrl.viewLessonPaged);
app.get('/getLessonsPaged',authController.isLoggedIn,LessonCtrl.getLessonPaged);



//User
app.get('/createUser',authController.isLoggedIn, UserController.GetCreateUser);
app.post('/createUser',authController.isLoggedIn, UserController.PostCreateUser);
//popup
app.get('/GetUser/:id', authController.isLoggedIn,UserController.GetUserPopup);
app.post('/UpdateChild/:id',authController.isLoggedIn, UserController.UpdateChildPopup);

app.get('/UpdateUser', authController.isLoggedIn,UserController.GetUpdateUserPopup);
app.post('/UpdateUser',authController.isLoggedIn, UserController.PostUpdateUserPopup);
//pages
app.get('/EditProfile', authController.isLoggedIn,UserController.GetUpdateUser);
app.post('/EditProfile',authController.isLoggedIn, UserController.PostUpdateUser);
app.get('/deleteUser/:id',authController.isAdmin, UserController.deleteUser);
//Check if pareent is del
app.get('/deleteChild/:id',authController.isLoggedIn, UserController.deleteChild);
app.post('/CheckPassword',authController.isLoggedIn, UserController.CheckPassword);


app.get('/getAllUsers',authController.isLoggedIn, UserController.getAllUsers);
app.get('/getUserByID/:UserID',authController.isLoggedIn, UserController.GetUserByID);
app.get('/viewAllUsers',authController.isLoggedIn,UserController.viewUsersPaged);
app.get('/getUsersPaged',authController.isLoggedIn,UserController.getUsersPaged);
// app.get('/viewAllUsers',authController.isLoggedIn,UserController.viewAllUsers);

app.post('/AddChild/:id', authController.isLoggedIn,UserController.AddChild);
app.get('/getUserByEmail/:Email',authController.isLoggedIn, UserController.GetUserByEmail);
app.get('/getAllChildren',authController.isLoggedIn, UserController.getAllChildren);
app.get('/getChildren/:ParentId',authController.isLoggedIn, UserController.getChildrenPaged);
app.get('/getAllCities',authController.isLoggedIn, UserController.getAllCities);
app.get('/getAllAccountTypes', UserController.getAllAccountTypes);

//Role
app.get('/createRole',authController.isLoggedIn, RoleController.GetCreateRole);
app.post('/createRole',authController.isLoggedIn, RoleController.PostCreateRole);

app.get('/UpdateRole/:RoleID', authController.isLoggedIn,RoleController.GetUpdateRole);
app.post('/UpdateRole/:id',authController.isLoggedIn, RoleController.PostUpdateRole);
app.get('/deleteRole/:id',authController.isLoggedIn, RoleController.deleteRole);
app.get('/deletePermission/:id',authController.isLoggedIn, RoleController.deletePermission);


app.get('/getAllRoles',authController.isLoggedIn, RoleController.getAllRoles);
app.get('/getRoleByID/:RoleID',authController.isLoggedIn, RoleController.GetRoleByID);
app.get('/viewAllRoles',authController.isLoggedIn,RoleController.viewRolesPaged);
app.get('/viewAllPermissions',authController.isLoggedIn,RoleController.viewPermissionsPaged);
//app.get('/viewAllRoles',authController.isLoggedIn,RoleController.viewAllRoles);
app.get('/viewAllPermissionRoles',authController.isLoggedIn,RoleController.getAllPermissionRoles);

app.get('/NodeMovieList', function (request, response) {
    response.sendfile("app/views/index.html");
});
}