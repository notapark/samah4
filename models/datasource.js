// database.js
var mysql = require('mysql');

// 개발기 정보
var pool = mysql.createPool({
	connectionLimit: 150,
	host: '127.0.0.1',
	user: 'root',
	password: '1234',
	database: 'samah'
});

// 운영기 정보
// var pool = mysql.createPool({
// 	connectionLimit: 150,
// 	host: '127.0.0.1',
// 	user: 'root',
// 	password: '1234',
// 	database: 'test'
// });

console.log('pool 호출됨!!!');

module.exports = pool;
