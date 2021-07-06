import * as bcrypt from "bcrypt";
import ConnectionConfiguration from '../connection/connection.config';

export class UserActionService {
    static async likeFile(request: any, response: any) {
        const userId = request.body.userId;
        const fileId = request.body.fileId;

        if (userId && fileId && !(await this.hasUserLikedFile(userId, fileId))) {
            ConnectionConfiguration.connection.query('INSERT INTO dbo.like (userId, fileId) VALUES (?, ?)', [userId, fileId], function(_: any, results: any) {
                if (results && results.affectedRows > 0) {
                    response.send('User' + userId + ' liked file ' + fileId)
                } else {
                    response.send('Failed to like file');
                }
                response.end();
                return;
            });
        } else {
            response.send('User already liked this file');
            response.end();
            return;
        }
    }

    static unlikeFile(request: any, response: any) {
        const userId = request.body.userId;
        const fileId = request.body.fileId;
        if (userId && fileId) {
            ConnectionConfiguration.connection.query('DELETE FROM dbo.like WHERE userId = ? AND fileId = ?', [userId, fileId], function(_: any, results: any) {
                if (results && results.affectedRows > 0) {
                    response.send('User' + userId + ' disliked file ' + fileId)
                } else {
                    response.send('Failed to dislike file');
                }
                response.end();
            });
        } 
    }

    static showLikedFiles(request: any, response: any) {
        const userId = request.body.userId;
        if (userId) {
            ConnectionConfiguration.connection.query('SELECT * FROM dbo.like WHERE userId = ?', [userId], function(_: any, results: any) {
                response.send(results);
                response.end();
            });
        } 
    }

    private static async hasUserLikedFile(userId: number, fileId: string): Promise<boolean> {
        const results = await this.getUserLiked(userId, fileId);
        return results && results.length > 0;
    }

    private static getUserLiked(userId: number, fileId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            ConnectionConfiguration.connection.query(
                'SELECT * FROM dbo.like WHERE userId = ? AND fileId = ?',
                [userId, fileId],
                (err, result) => {
                    return err ? reject(err) : resolve(result);
                }
            );
        });
      }
}