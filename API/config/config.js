//Port of build
process.env.PORT = process.env.PORT || 3000;

//Evironment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//DataBase
let urlDB;

if (process.env.NODE_ENV === 'dev') urlDB = 'mongodb://localhost:27017/cafe';
else urlDB = 'mongodb+srv://cafeDB_admin:cafe123@cafe-aw74i.mongodb.net/test?retryWrites=true&w=majority';
process.env.URLDB = 'mongodb://cafeDB_admin:hBvo9GOoGJ2UAHgK@cafe-shard-00-00-aw74i.mongodb.net:27017,cafe-shard-00-01-aw74i.mongodb.net:27017,cafe-shard-00-02-aw74i.mongodb.net:27017/test?ssl=true&replicaSet=cafe-shard-0&authSource=admin&retryWrites=true&w=majority';

//token
process.env.EXPIRE_TOKEN = 60 * 60 * 24 * 30;
process.env.SECRET_TOKEN = process.env.SECRET_TOKEN || 'asdufhoiudfgw';