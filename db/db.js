import mysql from 'mysql'

// const connection = mysql.createConnection({
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'bb17c774dfebcf',
//     password: 'f8d8c847',
//     database: 'heroku_12e645818a37291', //crud
//     port: 3306
// });


const connection = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bb17c774dfebcf',
    password: 'f8d8c847',
    database: 'heroku_12e645818a37291', //crud
    port: 3306
});
// connection.connect(function (error) {
//     if (!!error) {
//         console.log(error);
//     } else {
//         console.log('Connected!:)');
//     }
// });

// connection.query(`CREATE TABLE users(
// 	firstName VARCHAR(50) NOT NULL,
//     lastName VARCHAR(30) NOT NULL,
//     email VARCHAR(60) NOT NULL UNIQUE, 
//     _password VARCHAR(2000) NOT NULL,
//     _id INT AUTO_INCREMENT PRIMARY KEY,
//     state VARCHAR(255) NOT NULL,
//     country VARCHAR(255) NOT NULL,
//     username VARCHAR(200) NOT NULL UNIQUE
//     )`)

// connection.query(`
// CREATE TABLE products(
// 	name VARCHAR(100) NOT NULL UNIQUE,
//     price VARCHAR(100) NOT NULL,
//     category VARCHAR(100) NOT NULL,
//     description VARCHAR(1000) NOT NULL
// )`)

connection.query(`ALTER TABLE products MODIFY COLUMN name VARCHAR(200) NOT NULL UNIQUE`)

export default connection