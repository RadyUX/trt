const  UserModel = require("../models/User")

const getUser = (req, res, next) => {
    
    UserModel.findOne({
        attributes: ["role"],
        where: {
            name: 'admin',
        },
    })
    .then((result) => {
      	return res.json(result);
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: 'Unable to fetch the record!'
        });
    });
}

module.exports = getUser