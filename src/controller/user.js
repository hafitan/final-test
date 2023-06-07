const { users } = require('../../models')
const { siswas } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.get = async (req, res) => {
    try{
        const data = await users.findAll()

        return res.render("users/index", {
            data: data
        })
    }catch(err) {
        console.error(err)
    }
}

exports.getPost = async (req, res) => {
    return res.render('users/create')
}

exports.post = async (req, res) => {
    try{
        const body = req.body

        const schema = joi.object({
            username: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            role: joi.string().required(),
        })

        const { error } = schema.validate(body)
        if(error) {
            return res.render('users/create', {
                error: error.details[0].message,
            })
        }

        const hash = await bcrypt.hash(body.password, 10)

        const email = await users.findOne({
            where: {
                email: body.email
            }
        })

        if(email){
            return res.render('users/create', {
                error: 'Email already in use'
            })
        }

        const data = await users.create({
            username: body.username,
            email: body.email,
            password: hash,
            role: body.role
        })

        console.log(data)

        return res.redirect('/users')
    }catch(err){
        console.error(err)
    }
}

exports.getEdit = async (req, res) => {
    try{
        const user = await users.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!user) {
            return res.status(404).send({
                message: 'data tidak ditemukan!'
            })
        }else{
            res.render('users/edit', {
                data: user
            })
        }
    }catch (err){
        console.error(err)
    }
}

exports.edit = async (req, res) => {
    try{
        const body = req.body
        const schema = joi.object({
            username: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            role: joi.string().required(),
        })
        const { error } = schema.validate(body)
        if(error) {
            return res.render('users/edit', {
                error: error.details[0].message
            })
        }
        const hash = await bcrypt.hash(body.password, 10)

        const update = await users.update({
            username: body.username,
            email: body.email,
            password: hash,
            role: body.role
        },{
            where: {
                id: req.params.id
            },
            returning: true
        })
        console.log(update)
        
        // res.send({
        //     message: 'success!'
        // })
        return res.redirect('/users')
    }catch(err){
        console.error(err)
    }
}

exports.delete = async (req, res) => {
    try{
        const getId = await users.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!getId) {
            return res.status(404).send({
                message: 'id tidak ditemukan'
            })
        }

        const del = await users.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.redirect('/users')
    }catch(err){
        console.error(err)
    }
}

exports.getRegister = async (req, res) => {
    return res.render('users/regis')
}

exports.register = async (req, res) => {
    try{
        const body = req.body

        const schema = joi.object({
            username: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            role: joi.string().required(),
        })

        const { error } = schema.validate(body)
        if(error) {
            return res.render('users/create', {
                error: error.details[0].message,
            })
        }

        const hash = await bcrypt.hash(body.password, 10)

        const email = await users.findOne({
            where: {
                email: body.email
            }
        })

        if(email){
            return res.render('users/create', {
                error: 'Email already in use'
            })
        }

        const data = await users.create({
            username: body.username,
            email: body.email,
            password: hash,
            role: body.role
        })

        console.log(data)

        return res.redirect('/')
    }catch(err){
        console.error(err)
    }
}

exports.logins = async (req, res) => {
    return res.render('users/login')
}

exports.login = async (req, res) => {
    try{
        const body = req.body
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required()
        })
        const { error } = schema.validate(body)
        if(error){
            return res.render('/',{
                error: error.details[0].message,
            })
        }
        let dataUser = await users.findOne({
            where: {
                email: body.email
            }
        })
        if(!dataUser){
            return res.render('/', {
                error: 'Email yang anda masukkan salah!'
            })
        }
        const password = await bcrypt.compare(body.password, dataUser.password)
        if(!password){
            return res.render('/', {
                error: 'Password yang anda masukkan salah!'
            })
        }
        let login = await users.findOne({
            where: {
                email: body.email
            }
        })

        let mapel = await siswas.findOne({
            where: {
                email: body.email
            }
        })

        const accessToken = jwt.sign({
            id:login.id,
            username: login.username,
            email: login.email,
            role: login.role
        },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.cookie('token', accessToken)
        res.redirect('/siswas')
    //     const role = login.dataValues.role
    //      if (role === "admin") {
    //   res.cookie("token", accessToken);
    //   return res.redirect(`/siswas`);
    // }

    // const findClass = await siswas.findOne({
    //   where: {
    //     email: body.email,
    //   },
    // });

    // let category = findClass.dataValues.kelas.toLowerCase();
    // if (category.includes(" ")) {
    //   category = category.replace(/\s/g, "_");
    // }
    
    // res.cookie("token", accessToken);
    // res.redirect(`/siswas/${category}`);
    }catch(err)  {
        console.error(err)
    }
}

exports.logout = async (req, res) => {
    console.log(req.cookies)
    res.clearCookie('token')
    res.redirect('/')
}