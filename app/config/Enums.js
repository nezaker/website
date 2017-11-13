'use strict';
var Enum = require('enum');
global.Pagination={
DefaultPageSize:10,
UserPageSize:20,
LargePageSize:20,
ChildrenPageSize:5
}; 
global.ConstantVal = {
    x: 3,
    y: function() { console.log('Works.'); },
AdminRole:4,
Roles:
{
	SuperAdmin:1,
	Admin:2,
	ContactUsReceiver:3,
	user:4
},
AccountTypes:{

	Father:	1,	
	mother:9,
	teacher:2,			
	student:10
},
status:
	[{value:1,text:'Pending Approval'},
	{value:2,text:'Approved'},
	{value:3,text:'Disapproved'}]
,
statusVal:[{
	PendingApproval:1,
	Approved:2,
	Disapproved:3}]
};

/*
console.log(ConstantVal.Roles.user);
console.log('Does this work?');
ConstantVal.y();*/
/*module.exports = {
var myEnum :new Enum({'None': 0, 'Black':1, 'Red': 2, 'Red2': 3, 'Green': 4, 'Blue': 5});
*/
/*

declare global {
  Enum MyEnum {
    MyEnumMember1,
    MyEnumMember2,
    MyEnumMember3
  }
}*/
/* myEnum: {new Enum({'None': 0, 'Black':1, 'Red': 2, 'Red2': 3, 'Green': 4, 'Blue': 5})};
Status :{new Enum({'Pending': 1, 'Confermied':2})};*/
/*console.log(myEnum.Black.value);
for(var i=0; i<=5; i++){ console.log(myEnum.get(i).value + '=> '+ myEnum.get(i).key)}
*/
//}