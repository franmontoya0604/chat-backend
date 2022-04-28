
const Model = require('./model');




const addMessage = (message)=>{
const myMessage = new Model(message);  
myMessage.save();  
}

 const getMessage = async (filterByMessage)=>{

    try {
      let filterMessage = {};
      if (filterByMessage !== null) {
        filterMessage = { message: filterByMessage}; 
      }
      return await Model.find(filterMessage).populate('user').exec()  
    } catch (error) {
      console.log(error.message)
      throw new Error('Unexpected error')
    }

   
   

}





module.exports = {
  add:  addMessage,
  list:  getMessage,
 
}