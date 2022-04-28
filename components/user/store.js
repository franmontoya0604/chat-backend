

const Model = require('./model');

const addUser = (user)=>{
 const myUser =  new Model(user)
 return myUser.save();
}


const getUser = async ()=>{

 

  const users = await Model.find(); 

  return users;
}



 
 

module.exports = {
  add:  addUser,
  list: getUser,
 
 
}