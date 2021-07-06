import AWS from 'aws-sdk';

export class RetrieveService {
    static retrieveFile(request: any, response: any) {
        const s3 = new AWS.S3({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            region: process.env.REGION,
            sessionToken: process.env.SESSION_TOKEN
        });
        const fileId = request.body.fileId;
        const getParams = {
            Bucket: 'photo-app-dev-test-bucket',
            Key: fileId
        }
        s3.getObject(getParams, function(err, data) {
            if (err || !data) {
                response.send('Could not retrieve file with id: ' + fileId);
                response.end();
                return;
            }
        
            let objectData = data.toString();
            console.log(data);
            response.send(objectData);
            response.end();
        });
    }
}