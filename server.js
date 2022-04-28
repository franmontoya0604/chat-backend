const express = require('express');
const router = require('./network/routes')
const db = require('./db')
const cors = require('cors')

const { config } = require('./config');

const user = encodeURIComponent(config.dbUser);
const pass =encodeURIComponent(config.dbPassword); 
const database = encodeURIComponent(config.dbName);
const uri = `mongodb+srv://${user}:${pass}@cluster0.qycj7.mongodb.net/${database}?retryWrites=true&w=majority`;


db(uri) 

const app = express();

app.use(cors())
app.disable('x-powered-by')   
app.use(express.json());  
app.use(express.urlencoded({extended : false}));
router(app);  




app.use('/app',express.static('./public'))  
.listen(3000)
console.log('el servidor esta escuchando en el puerto 3000')

module.exports = app;