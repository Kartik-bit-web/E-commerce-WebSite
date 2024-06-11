import connections from "../../index.js";

export default connections.query(
    `CREATE TABLE IF NOT EXISTS paiduser (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        phoneNumber BIGINT NOT NULL,
        timeStart DATE NOT NULL,
        timeEnd DATE NOT NULL,
        plan_id BIGINT NOT NULL,
        subscriptionId BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT paid_id FOREIGN KEY (userId) REFERENCES registeration_user(id)
    )`
, (err) => {
    if(err) return console.log(err);
    console.log('PiadUser for private Table Created Sucessfully')
}
)

// connections.end(err => {
//     if (err) {
//         return console.error('Error closing the connection:', err);
//     }
//     console.log('Database connection closed');
// });