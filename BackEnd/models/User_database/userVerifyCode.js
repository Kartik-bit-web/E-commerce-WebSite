import connections from '../../index.js';

export default connections.query(
    `CREATE TABLE IF NOT EXISTS UserEmailVerify (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        code VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        constraint fk_id foreign key(userId) references registeration_user(id)
    )`
, (err) => {
    if(err){
        return console.log(err);
    }
    console.log("EmailCodeVerify Table Created Sucessfully");
});




