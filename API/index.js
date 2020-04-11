const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;
require('./config/config');

//middlewares
app.use(express.json())

//routes
app.use(require('./routes/index'));

//database
let options = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(process.env.URLDB, options)
	.then(() => console.log(`Base de datos Online`))
	.catch((e) => console.error(e));

//start server
app.listen(port, () => console.log(`Example app listening on port port!`))