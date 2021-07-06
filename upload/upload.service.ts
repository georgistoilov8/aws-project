import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import ConnectionConfiguration from '../connection/connection.config';
import path from 'path';

export class UploadService {
    static uploadFile(request: any, response: any) {
        const file = request.file;
        const userId = request.body.userId;
        if (file && userId) {
            const fileExtension = path.extname(file.originalname);
            const fileName = uuidv4() + fileExtension;
            this.saveUserWithFile(userId, fileName);
            this.uploadFileToS3(file, fileName);
            response.send('Upload successfull.');
        } else {
            response.send('Upload failed. File not found');
        }
        response.end();
    }

    private static uploadFileToS3(file: any, fileName: string) {
        const s3 = new AWS.S3({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            region: process.env.REGION,
            sessionToken: process.env.SESSION_TOKEN
        });

        const bucketParams = {
            Bucket: 'photo-app-dev-test-bucket',
            Key: fileName,
            Body: file.buffer
        };

        s3.upload(bucketParams, function(s3Err: any, data: any) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
        });
    }

    private static saveUserWithFile(userId: number, fileName: string): boolean {
        ConnectionConfiguration.connection.query('INSERT INTO dbo.files (userId, fileName) VALUES (?, ?)', [userId, fileName], function(_: any, results: any) {
            if (results && results.affectedRows > 0) {
                console.log('User and file linked');
                return true;
            } else {
                console.log('User and file not linked');
                return false;
            }
        });
        return false;
    }
}