function authUser(req,res ,next) {
    if(req.user == null){
        res.status(403)
        return res.send('you need to login')
    }
    next()
}
  module.exports = authUser