//if user loged in
function authUser(req,res ,next) {
    if(req.user == null){
        res.status(403)
        return res.send('you need to login')
    }
    next()
}


function authRole(role){
    return(req,res, next)=>{
        res.status(401)
        return res.send("not allowed")
    }

    next()
}


  module.exports = authUser