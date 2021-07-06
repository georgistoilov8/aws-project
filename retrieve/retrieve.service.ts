import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: 'ASIAWDLCSG3JQ3YJLLMH',
    secretAccessKey: '4Na0Tv2+XAwtiFeJBr3QyOXpEkH9v944FBCN7/t4',
    region: 'us-east-1',
    sessionToken: 'FwoGZXIvYXdzEF4aDEV0WwzNy1qD5sRnZyLGAdJrxnikrpkptOwkYFkaOCbVtLDxhqsQ+kvhmhcuj8oepWUi9hIxYEcG1UfQ7ojc8afZi4tqiwuB2PYGdO+z/pNbfJysDNtbN0FyIIBjc5cBIkTaSFdxhELMnr6prFLNEaiVHCgRn1GMdmGIl1nPS/p6+bbcN4bVLJYKCMS94n9V9m/zuR86R3Qe9SQ3a6lrtlR6l4rtO3VJkPELJpQzXb4O/RfhOlF9kO0O/hUnmRsT3Js+Q8nBzBZHyOIGJ6/H9+2reDAFESjm042HBjItie7AdYJ8liqTOrjigljmezYd8ElRMbGs9Vwm2UvRspbvqdy2p/xs/h0XvMOR'
});

export class RetrieveService {
    static retrieveFile(request: any, response: any) {
        console.log(request.body);
        const fileId = request.body.fileId;
        const getParams = {
            Bucket: 'photo-app-dev-test-bucket',
            Key: fileId
        }
        console.log(fileId);
        s3.getObject(getParams, function(err, data) {
            if (err || !data) {
                response.send('Could not retrieve file with id: ' + fileId);
                response.end();
                return;
            }
        
            let objectData = data.toString();
            response.send(objectData);
            response.end();
        });
    }
}