const db = require('mongoose')


const connect = async (url)=>{
    db.Promise = global.Promise; 
    try {
        await db.connect(url, {useNewUrlParser:true,useUnifiedTopology: true}) 
        console.log('[db] conectada con exito');
    } catch (error) {
        console.log('[db] conexion fallida',err);
    }




}

module.exports = connect;