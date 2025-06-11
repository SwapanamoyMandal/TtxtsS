const mongo = require('mongoose')
require('dotenv').config()
const url = process.env.DB_URL 

const roomdb = mongo.createConnection(url,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

roomdb.on('connected',()=>{
    console.log("room database connected succussfully ✅")
})

roomdb.on('error',()=>{
    console.log("room database failed to connect ❌")
})

module.exports = {roomdb}