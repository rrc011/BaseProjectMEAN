const express = require('express');
const app = express();
const { login, loginWithGoogle} = require('../controllers/login.controller')

app.post('/login', login)  

app.post('/google', loginWithGoogle)

module.exports = app;