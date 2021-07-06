import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import multer from 'multer';
import { UploadService } from './upload.service';

var storage = multer.memoryStorage();
var upload = multer({ storage });

export class UploadRoutes extends CommonRoutesConfig {
    constructor(
        app: express.Application,
    ) {
        super(app, 'UploadRoutes');
    }

    configureRoutes() {
        this.app.post('/file', upload.single('file'), function(this: UploadRoutes, request, response) {
            UploadService.uploadFile(request, response);
        });

        return this.app;
    }
}