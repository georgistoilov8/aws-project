import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import ConnectionConfiguration from '../connection/connection.config';
import path from 'path';

const s3 = new AWS.S3({
    accessKeyId: 'ASIAWDLCSG3JQ3YJLLMH',
    secretAccessKey: '4Na0Tv2+XAwtiFeJBr3QyOXpEkH9v944FBCN7/t4',
    region: 'us-east-1',
    sessionToken: 'FwoGZXIvYXdzEF4aDEV0WwzNy1qD5sRnZyLGAdJrxnikrpkptOwkYFkaOCbVtLDxhqsQ+kvhmhcuj8oepWUi9hIxYEcG1UfQ7ojc8afZi4tqiwuB2PYGdO+z/pNbfJysDNtbN0FyIIBjc5cBIkTaSFdxhELMnr6prFLNEaiVHCgRn1GMdmGIl1nPS/p6+bbcN4bVLJYKCMS94n9V9m/zuR86R3Qe9SQ3a6lrtlR6l4rtO3VJkPELJpQzXb4O/RfhOlF9kO0O/hUnmRsT3Js+Q8nBzBZHyOIGJ6/H9+2reDAFESjm042HBjItie7AdYJ8liqTOrjigljmezYd8ElRMbGs9Vwm2UvRspbvqdy2p/xs/h0XvMOR'
});

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