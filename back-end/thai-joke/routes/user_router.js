const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UserModel = require('../models/user_model');
var jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/user_auth');

//GET ALL USERS
router.get('/', checkAuth, async (req,res)=>{
    try {
        const users = await UserModel.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({message: error})
    }
});

//CREATE NEW USER
router.post('/signup',async (req,res)=>{
    try {
        const existingUser = await UserModel.find({email:req.body.email})
        if(existingUser.length !== 0){
            return res.status(409).json({message : "The User does exist ..."})
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });
       const createdUser = await user.save();
       res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({message : error})
    }
});

//UPDATE USER INFO
router.put('/:user_id',checkAuth,(req,res)=>{
    UserModel.updateMany({_id : req.params.user_id},{$set : req.body, updated: new Date() }).exec()
    .then(()=>{
        res.json(req.body)
    }).catch(err =>{
        res.json({message : err})
    })
});

//DELETE USER
router.delete('/:userID',checkAuth,async (req,res)=>{
    try {
        const deletedUser =  await UserModel.deleteOne({ _id : req.params.userID})
        res.status(200).json({
            message : 'User been deleted ...',
            data : deletedUser,
        })
    } catch (error) {
        res.status(500).json({message : error})
    }
});

router.post('/login',(req,res)=>{
    UserModel.findOne({username : req.body.username}).exec()
        .then(user =>{
                if(user){
                    var passwordIsValid = bcrypt.compareSync(
                        req.body.password,
                        user.password
                    );
                
                    if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                    }
                    
                    const payload = {
                        sub: req.body.username,
                        iat: new Date().getTime()
                     };
                     const SECRET = "THAIJOKE_SECRET_KEY";
                     const token = jwt.sign(payload, SECRET, {expiresIn: 86400});

                    // const token = jwt.sign({ id: user.id }, "thaijoke-secret-key", {
                    // expiresIn: 86400
                    // });

                    const datetime = new Date();

                    UserModel.findOneAndUpdate(
                        {username : req.body.username}, 
                        {$set: {
                            updated: datetime, 
                            token: token 
                            }}, 
                        {new: true, upsert: true, useFindAndModify: false},
                        (err, data) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).send({
                        status: "Yes",
                        message : "success to login and update access token",
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        token: token,
                        updated: datetime
                        });
                    });      
 
                }else{
                    res.json({status:"No", message : "Incorrect email or password...", 
                })
                }
            }).catch(error =>{
                res.status(500).json({message : `error : ${error}` })
        })
})

module.exports = router;