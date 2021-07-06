import * as mysql from 'mysql';
require('dotenv').config();

class ConnectionConfiguration {
    
    connection;

    constructor() {
        this.connection = this.getConnection();
    }

    private getConnection() {
        // let connection = mysql.createConnection({
        //     host: "localhost",
        //     user: "root",
        //     password: "password",
        //     port: 3306
        // })
        
        let connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: 3306
        })
        
        connection.connect(function(err) {
            if (err) {
                console.log('Database connection failed: ' + err.stack);
                return;
            }
            console.log('Connected to database.');
        });

        return connection;
    }
}

export default new ConnectionConfiguration();
