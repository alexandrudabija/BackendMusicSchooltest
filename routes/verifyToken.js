const jwt= require('jsonwebtoken');

module.exports = function auth (req,res,next)
{

    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Access Denied');
    }
    const token = authHeader.split(' ')[1];

try{
// we verify the token in header when make any request
const verified = jwt.verify(token,process.env.TOKEN_SECRET );
req.user= verified;
next();


}catch(err){
 res.status(400).send('invalid Token')

}

}
  