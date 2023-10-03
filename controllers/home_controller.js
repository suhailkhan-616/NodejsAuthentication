module.exports.home = async function(req,res){
    try{
        console.log('home');
        return res.render('home',{
            title:'Home |'
        })
    }catch(err){
        console.log('Error the home',err);
    }
}