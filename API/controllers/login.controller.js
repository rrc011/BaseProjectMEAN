const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {verifyGoogleToken} = require('../middlewares/authentication')

let login = (req, res) => {
    let body = req.body;

    User.findOne({email: body.email}, (error, userDB) => {
      if(error){
          return res.status(500).json({
              ok:false,
              error
          })
      }
  
      if(!userDB){
          return res.status(400).json({
              ok:false,
              error:{
                  message: 'User o password incorrectos'
              }
          })
      }
  
      if(!bcrypt.compareSync(body.password, userDB.password)){
          return res.status(400).json({
              ok:false,
              error:{
                  message: 'User o password incorrectos'
              }
          })
      }
  
      let token = jwt.sign({
          user: userDB
        }, process.env.SECRET_TOKEN, { expiresIn: process.env.EXPIRE_TOKEN });
  
      return res.json({
          ok:true,
          user: userDB,
          token
      })
    })
}

let loginWithGoogle = async (req, res) => {
    let token = req.body.idtoken;

  let googleUser = await verifyGoogleToken(token)
                    .catch(e => {
                        return {
                            ok:false,
                            error: e
                        }
                    })

   User.findOne({email: googleUser.email}, (error, userDB) => {
       if (error) {
           return res.status(500).json({
               ok:false,
               error
           })
       }

       if (userDB) {
           if (!userDB.google) {
               return res.status(400).json({
                   ok:false,
                   error:{
                       message: 'Debe autenticarse de manera normal'
                   }
               })
           }else{
            let token = jwt.sign({
                user: userDB
              }, process.env.SECRET_TOKEN, { expiresIn: process.env.EXPIRE_TOKEN });
    
              return res.json({
                ok:true,
                user: userDB,
                token
            })
            }
        }else{
          let user = new User({
              nombre: googleUser.nombre,
              email: googleUser.email,
              google: true,
              img: google.picture,
              password: ':)'
          });

          user.save((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
    
            return res.json({
                ok: true,
                user: userDB,
                token
            });
        });
        }

    })
}

module.exports = {
    login,
    loginWithGoogle
}