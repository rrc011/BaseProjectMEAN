const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

let validateToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
        if(error){
            return res.status(401).json({
                ok:false,
                error
            })
        }

        req.user = decoded.user;

        next();
    })
}

let validateAdminRole = (req, res, next) => {
    let user = req.user;
    console.log(user);
    if(user.role === 'ADMIN_ROLE') {
        next();
    }
    else{
        return res.json({
            ok:false,
            error: {
                message: 'El usuario no es administrador'
            }
        })
    }
}

async function verifyGoogleToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    return payload
  }

module.exports = {
    validateToken,
    validateAdminRole,
    verifyGoogleToken
}