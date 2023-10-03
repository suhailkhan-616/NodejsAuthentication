const mongoose =require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Authentication_list_skills');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in mongoose connection"));

db.once('open',function(){
        console.log('Successfull connected to MongoDb');
});

module.exports = db;