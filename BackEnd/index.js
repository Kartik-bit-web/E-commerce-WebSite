import mysql from 'mysql';

const connections = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '@karTIK321',
    database: 'mydb'
    
});

// let sql = `INSERT INTO useremailverify(userId, code) VALUES(?, ?)`;
// let values = [1, 123212]

// connections.query(sql, values, (err, result) => {
//     if(err) return console.log(err);
//     console.log(result.insertId)
// })
// // connections.end()

export default connections;