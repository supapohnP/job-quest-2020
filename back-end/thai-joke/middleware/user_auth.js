const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try {
        // const token = req.headers.authorization.split(" ")[1];
        // const decoded = jwt.verify(token, process.env.JWT_KEY)
        // res.userData = decoded;
        var authorization = req.headers.authorization
        var userpass = authorization.split(' ')[1]
        var plaintext = Buffer.from(userpass, 'base64').toString('ascii')
        var username = plaintext.split(':')[0]
        var password = plaintext.split(':')[1]
        if(username=='admin'&&password=='1234'){
            next();
        }

    } catch (error) {
        res.status(401).json({message : "Auth failed"})
    }
}