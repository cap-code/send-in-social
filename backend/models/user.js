const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avalserv:{
        type:String,
        required:true
    },
    uuid:{
        type:String,
        required:true
    },
    apikey:{
        type:String,
        required:true
    },
    content:{
        type:String
    }
},{timestamps:true});

const Data = mongoose.model('User',userSchema);

module.exports = Data; 