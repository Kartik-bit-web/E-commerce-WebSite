import mysql from 'mysql2';

const connections = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '@karTIK321',
    database: 'mydb'
    
});

// console.log(process.env)


// connection.query('SELECT * FROM category', (result, err) => {
//     if(err){
//         return console.log(err)
//     }
//     console.log(result);
// });

// connection.connect((err) => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('connection connected to mysql')
// })

// connection.end((err) => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('Connection Closed')
// });

export default connections;