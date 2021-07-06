import * as bcrypt from "bcrypt";
import ConnectionConfiguration from '../connection/connection.config';

export class AuthenticationService {
    static checkUser(request: any, response: any) {
        let username = request.body.username;
        let password = request.body.password;
        if (username && password) {
            ConnectionConfiguration.connection.query('SELECT * FROM dbo.accounts WHERE username = ?', [username], function(_: any, results: any) {
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password, function(err, result) {
                        console.log(password, results[0].password)
                        if (result === true) {
                            request.session.loggedin = true;
                            request.session.username = username;
                            response.send('Login Successfull');
                        } else {
                            response.send('Incorrect Username and/or Password!');
                        }
                        response.end();
                    });
                }	
                
            });
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    }

    static async registerUser(request: any, response: any) {
        let username = request.body.username;
        const saltRounds = 10;
        let password = await bcrypt.hash(request.body.password, saltRounds);
        if (username && password && !this.doesUserExist(username)) {
            console.log(password);
            ConnectionConfiguration.connection.query('INSERT INTO dbo.accounts (username, password) VALUES (?, ?)', [username, password], function(_: any, results: any) {
                if (results) {
                    response.send('Successful registration!');
                } else {
                    response.send('Incorrect Username and/or Password!');
                }			
                response.end();
            });
        } else {
            response.send('Please enter Username and Password!');
            response.end();
        }
    }

    private static doesUserExist(username: string): boolean {
        ConnectionConfiguration.connection.query('SELECT * FROM dbo.accounts WHERE username = ?', [username], function(_: any, results: any) {
            console.log(results);
            if (results.length > 0) {
                return true;
            } else {
                return false;
            }
        });
        return false;
    }
}