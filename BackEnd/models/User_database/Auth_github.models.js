import connections from "../../index.js";

export default connections.query(
    `
    CREATE TABLE IF NOT EXISTS AuthGithub_User (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        userId VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        avatar VARCHAR(255),
        product_ref INT
    )`
, (err) => {
    if(err){
        return console.log(err);
    }
    console.log("Github Registeration Table Created Sucessfully");
})