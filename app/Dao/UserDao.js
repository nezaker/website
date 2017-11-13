  var bCrypt = require('bcrypt-nodejs');
  var moment = require('moment');

//var userTable =  require("../app/models").models.user;

    //Models
    var models = require("../models");
//var userTable=models.user;
var UserDao = {

    createUser: function (user,callback) {
        models.user.create({
            username: (user.username==null?user.email:user.username),
 /*           username: user.email,*/
            email: user.email,
            password: bCrypt.hashSync(user.password, bCrypt.genSaltSync(8), null),
            
            last_login: new Date(),
            first_name: user.first_name,
            last_name:user.last_name,
            accountType_id:user.accountType_id,
            city_id:user.city_id,
            birth_date: new Date(),
            status:1,
            gender:1,
            phone_numbers:user.phone_numbers,
/*            phone_numbers:"dsdds",
*/            type:1,
             role:4
        }).then((user) => {
            console.log("Da" + user.id);
            var userID = user.id;
            callback(userID);
        })


    },
    getUserByID: function (userID, callback) {
        //find one
     models.user.belongsTo(models.grade);
     models.grade.belongsTo(models.stage);

        models.user.find({
           include: {model:models.grade, include: [{model:models.stage} ]} ,
            where: {
                'id': userID
            }
        }).then(data => {
            user = data;
            callback(user);
        });
    },
    
    getAllUsers: function (callback) {
        var users = [];
         models.user.belongsTo( models.city);

        models.user.findAll({ include: [models.city]}).
            then(data => {
                users = data;
                callback(users);
            });

    },
     getUsersPaged: function (page,limit,callback) {
        var users = [];
         models.user.belongsTo( models.city);

        models.user.findAll({ include: [models.city],offset: (page-1)*limit,
         limit: limit,order: [['created_at', 'DESC']]}).
            then(data => {
                users = data;
                callback(users);
            });
      },
     getCount: function (callback) {
        models.user.count().
            then(count => {               
                callback(count);
            });
    },
getChildren: function (ParentId, callback) {
        //find one
    var ParentUser;
    models.user.belongsTo(models.grade);
    models.grade.belongsTo(models.stage);


        models.user.findOne({
            where: {  'id': ParentId} })
        .then(data => {
            ParentUser = data.user;
            console.log(ParentUser);
          if(data.family_id!=null)
        {

         // models.user.findAll({ include: [models.grade] }).
        models.user.findAll({
           include: {model:models.grade, include: [{model:models.stage} ]} ,
            where: {
                'family_id': data.family_id,'accountType_id':10,'id':{$ne: ParentId}                
            }
        }).then(data => {
            users = data;
            callback(users);
        });
      }
    }
    )},
getChildrenCount: function (ParentId,callback) {
   models.user.findOne({
   where: {  'id': ParentId} })
  .then(data => {
   ParentUser = data.user;
   console.log(ParentUser);
   if(data.family_id!=null)
   {
     models.user.count({
     where: {'family_id': data.family_id,'accountType_id':10,'id':{$ne: ParentId}}}).
     then(count => {
     callback(count);
    });
   }})
},
getChildrenPaged: function (ParentId,page,limit, callback) {
   //find one
    var ParentUser;
    models.user.findOne({
    where: {  'id': ParentId} })
    .then(data => {
     ParentUser = data.user;
     console.log(ParentUser);
     if(data.family_id!=null)
     {
    models.user.belongsTo(models.grade);
    models.grade.belongsTo(models.stage);
         // models.user.findAll({ include: [models.grade] }).
        models.user.findAll({
           include: {model:models.grade, include: [{model:models.stage} ]} ,
          where: {
          'family_id': data.family_id,'accountType_id':10,'id':{$ne: ParentId}
          }
        , offset: (page-1)*limit, limit: limit}).then(data => {
            users = data;
            callback(users);
        });
      }
    }
    )},

    getUserByEmail: function (Email, callback) {
        //find one
        models.user.find({ where: { 'email': Email}}).
        then(data => {
            user = data;
            callback(user);
        });
    },
 updateUser: function (user, callback) {
  user.created_at=  moment.utc( user.created_at).format('YYYY-MM-DD HH:mm:ss');
  user.updated_at=  moment.utc(user.updated_at).format('YYYY-MM-DD HH:mm:ss');
  user.birth_date=  moment.utc(user.birth_date).format('YYYY-MM-DD HH:mm:ss');

  console.log(user);

if(user.password==null)
{
  models.user.findOne({where: { 'id': user.id}}).
    then(data => {
    user.password=data.password;
      models.user .update(user, {
      where: {  id: user.id  } }).
      then(function (updatedRecords) {
        console.log(updatedRecords);
        callback(updatedRecords);
    })
    .catch(function (error) {
      console.log(error);
      callback(error);
  });
});
}
else{
    user.password=bCrypt.hashSync(user.password, bCrypt.genSaltSync(8), null);
 models.user .update(user, {
  where: {  id: user.id  } }).
  then(function (updatedRecords) {
    console.log(updatedRecords);
    callback(updatedRecords);
 })
 .catch(function (error) {
  console.log(error);
  callback(error);
  });
}
}
,
 AddChild: function (user, ParentID,callback) {
    //Get Parent Data
    var ParentUser;
        models.user.findOne({
            where: {  'id': ParentID} })
        .then(data => {
            ParentUser = data;
            console.log(data);

        //Get family id or insert new record in family table and get id
        if(ParentUser.family_id==null )
        {
        models.family.create({
            user_id: ParentID
        }).then((Newfamily) => {
          ParentUser.family_id=Newfamily.id;
          ParentUser.save();
        });
        }
        models.user.findOne({ where : { email: user.email}}).then(function (Existuser) {

      if (Existuser) {
        throw 'There is already an account using this email address.';

      }
      else
      {   
         models.user.create({
            username: (user.username==null?user.email:user.username),
            email: user.email,
            password: bCrypt.hashSync(user.password, bCrypt.genSaltSync(8), null),
            
            last_login: new Date(),
            first_name: user.first_name,
            last_name:user.last_name,
            accountType_id:ConstantVal.AccountTypes.student,
            city_id:ParentUser.city_id,
             birth_date: new Date(),
             grade_id:user.grade_id,
            status:1,
            gender:1,
            phone_numbers:ParentUser.phone_numbers,
            type:1,
             role_id:ConstantVal.Roles.user,
           family_id:ParentUser.family_id
        }).then((user) => {
            console.log("Da" + user.id);
            var userID = user.id;
            callback(userID);
        })     
      }

});
        });

    },
    _createUser:function(user,callback)
    {},
    
      deleteChild: function (Parent,userId, OnSuccessfulCallback) {
        models.user.destroy( {
            where: {
                id: userId
            }
        })
            .then(function (deletedRecords) {
                console.log(deletedRecords);
            })
            .catch(function (error) {
                console.log(error);
            });

    },
    deleteUser: function (userId, callback) {
        models.user.destroy({  where: { id: userId}})
            .then(function (deletedRecords) {
                console.log("***************deletedRecords"+deletedRecords);
                callback(deletedRecords);
            })
            .catch(function (error) {
                console.log(error);
                callback(error);

            });

    },
   linkFacebookProfile : function(userId, accessToken, refreshToken, profile) {
      var profileId = profile.id.toString();
      console.log("Link"+profileId);
      return models.user.findOne({ where: { facebookId: profileId } })
      .then(function(existingUser) {
          if (existingUser)
            return existingUser;
            //throw 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.';

      return models.user.findById(userId);
    })
    .then(function(user) {
      user.facebookId = profileId;
      if(!user.tokens) user.tokens = {};
      if(!user.profile) user.profile = {};
      user.tokens.facebook = accessToken;
      user.profile.name = user.profile.name || profile.displayName;
      user.profile.gender = user.profile.gender || profile._json.gender;
/*       user.username=profile.name.givenName + ' ' + profile.name.familyName; 
            user.email=profile.emails[0].value; 
             user.first_name= profile.name.givenName;
             user.last_name=profile.name.familyName;

*/           
      user.last_login= new Date().getDate();
      user.gender=(profile._json.gender=='female') ?2 : 1 ;             
      //addAvatarToProfile('facebook', 'https://graph.facebook.com/' + profileId + '/picture?type=large', user.profile);
      user.set('tokens', user.tokens);
      user.set('profile', user.profile);

      return user.save();
    });
},
    createAccFromFacebook : function(accessToken, refreshToken, profile) {
  if(!profile._json) {
    throw 'Facebook profile is missing _json property!';
  }
  var profileId = profile.id.toString();

console.log("create"+profile._json.email);
console.log("create"+profile.name.familyName);
  return models.user.findOne({ where: { facebookId: profileId } })
    .then(function(existingUser) {
      if (existingUser)
        return existingUser;

      return models.user.findOne({ where: { email: profile._json.email } })
        .then(function(emailUser) {

          if (emailUser)
            {//throw 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.';
console.log("exxxxxxxxxxxxxxxxxxxxxist");
throw 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.';

}
          var user = models.user.build({ facebookId: profileId });

          user.email = profile._json.email || ( profileId + '@facebook.com' );
          user.tokens = { facebook: accessToken };
          user.profile = {
            name: profile.displayName,
            gender: profile.gender
          };
            user.username=profile.name.givenName + ' ' + profile.name.familyName; 
            user.email=profile.emails[0].value; 
             user.last_login= new Date().getDate();
             user.first_name= profile.name.givenName;
             user.last_name=profile.name.familyName;
             user.birth_date= new Date().getDate();
             user.gender=(profile._json.gender=='female') ?2 : 1 ;
             user.phone_numbers="dsdds";
             user.type=1;
            user.status=1;
            user.role_id=4;
            user.accountType_id=1;
             user.password="";
                //       addAvatarToProfile('facebook', 'https://graph.facebook.com/' + profileId + '/picture?type=large', user.profile);
          return user.save();
        });
    });
}


,
/**
 * Google
 */
linkGoogleProfile :function(userId, accessToken, tokenSecret, profile) {
  return models.user.findOne({ where: { googleId: profile.id.toString() } })
    .then(function(existingUser) {
      if (existingUser)
        return existingUser;
       // throw 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.';

      return models.user.findById(userId);
    })
    .then(function(user) {
      user.googleId = profile.id.toString();
      if(!user.tokens) user.tokens = {};
      if(!user.profile) user.profile = {};
      user.tokens.google = accessToken;
      user.profile.name = user.profile.name || profile.displayName;
      user.profile.gender = user.profile.gender || profile.gender;
      /*user.username=profile.name.givenName + ' ' + profile.name.familyName; 
            user.email=profile.emails[0].value; 
             user.first_name= profile.name.givenName;
             user.last_name=profile.name.familyName;
             user.birth_date= new Date().getDate();
      
      */  
       user.last_login= new Date().getDate();
        user.gender=(profile._json.gender=='female') ?2 : 1 ;
             
     // addAvatarToProfile('google', (profile._json.image ? profile._json.image.url : ''), user.profile);
      user.set('tokens', user.tokens);
      user.set('profile', user.profile);
      return user.save();
    });
},

createAccFromGoogle : function(accessToken, tokenSecret, profile) {
  return models.user.findOne({ where: { googleId: profile.id.toString() } })
    .then(function(existingUser) {
      if (existingUser)
        return existingUser;

      return models.user.findOne({ where: { email: profile.emails[0].value } })
        .then(function(existingEmailUser) {
          if (existingEmailUser)
            throw 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.';

          var user = models.user.build({ googleId: profile.id.toString() });
          user.email = profile.emails[0].value;
          user.tokens = { google: accessToken };
          user.profile = {
            name: profile.displayName,
            gender: profile.gender
          };
           user.username=profile.name.givenName + ' ' + profile.name.familyName; 
            user.email=profile.emails[0].value; 
             user.last_login= new Date().getDate();
             user.first_name= profile.name.givenName;
             user.last_name=profile.name.familyName;
             user.birth_date= new Date().getDate();
             user.gender=(profile._json.gender=='female') ?2 : 1 ;
             user.phone_numbers="dsdds";
             user.type=1;
            user.status=1;
             user.password="";
       //   addAvatarToProfile('google', (profile._json.image ? profile._json.image.url : ''), user.profile);
          return user.save();
        });
    });
}

};
exports.UserDao = UserDao;