const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/electrondb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db => console.log("Base de Datos Conectada"))
    .catch(err => console.log(err));

module.exports = mongoose

// const low = require('lowdb')
// const FileAsync=require('lowdb/adapters/FileSync')

// let db;
// const createConnection=async()=>{
//     const adapter=new FileAsync('data.json')
//     db= await low(adapter);
//     db.defaults({productos:[]}).write()
// }

// const getConnection=()=> db;

// module.exports={
//     createConnection,
//     getConnection
// }