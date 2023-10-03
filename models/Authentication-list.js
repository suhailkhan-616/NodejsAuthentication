const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
            email:{
                type:String,
                required:true,
                unique:true
            },
            password:{
                type:String,
                required:true,
                unique:true
            },
            name:{
                type:String,
                required: true
            },
            token:{
                type:String,
                default:""
            }
},{
    timestamps:true
});

const Listnode = mongoose.model('Listnode',authSchema);

module.exports = Listnode;