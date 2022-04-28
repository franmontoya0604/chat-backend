const store = require('./store')


const addMessage = (user,message) => {
return new Promise((resolve,reject) =>{ //devolvemos una funcion para ver si se resolvio.
if(!user || !message ){
console.error('[messageController] no hay usuario o message')

return reject('los datos son incorrectos')
}



const fullMessage = { //generamos el mensaje completo que vamos a guardar.
  
    user: user,
    message: message,
    date: new Date(),
}

store.add(fullMessage) //se guarda en la bd
resolve(fullMessage);
} )

}

const getMessages = (filterByMessage)=>{
    return new Promise((resolve,reject)=>{
        resolve(store.list(filterByMessage))
    })
}






module.exports = {
    addMessage,
    getMessages
   
}