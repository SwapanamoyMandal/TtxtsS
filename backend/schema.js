const mongo = require('mongoose')
const { roomdb } = require('./database')
const rooomschema = mongo.Schema({ //dealear strucutee of schema
    username :{
        type:String,
        required: true
    },
    id:{
        type:String,
        required:true,
        uique:true
    },
    lock :{
        type:Boolean,
        default: false
    },
    roomtime:{
        type:Number,
        default: 10000000
    },
    members:{
        type:Number,
        default:0
    }
})

const roomModel = roomdb.model('roomModel',rooomschema) //connect schama with data base

module.exports = {roomModel}