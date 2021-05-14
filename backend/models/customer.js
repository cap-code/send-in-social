const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const customerSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    socialMedia:{
        type:String,
        required:true
    },
    uuid:{
        type:String
    },
    apikey:{
        type:String
    }
},{timestamps:true});

const Data = mongoose.model('customer',customerSchema);

module.exports = Data; 