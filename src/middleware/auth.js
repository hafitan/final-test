const jwt = require('jsonwebtoken')
const { users } = require('../../models')

exports.authToken = async (req, res, next) => {
    try{
        const cookie = req.cookies
        const token = cookie && cookie.token
        console.log(cookie)

        if(!cookie || cookie == null || Object.keys(cookie).length == 0){
            // return res.status(401).send({
            //     message: 'Unauthorize'
            // })
            return res.redirect('/')
        }

        const userVerifiedId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                return res.send({
                    message: err.message
                })
            }
            console.log(user)
            return user.id
        })

        const userVerified = await users.findOne({
            where: {
                id: userVerifiedId
            }
        })

        req.user = userVerified.dataValues
        next()
    }catch (err){
        console.error(err)
    }
}