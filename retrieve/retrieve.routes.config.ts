import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import { RetrieveService } from './retrieve.service';

export class RetrieveRoutes extends CommonRoutesConfig {
    constructor(
        app: express.Application,
    ) {
        super(app, 'RetrieveRoutes');
    }

    configureRoutes() {
        this.app.post('/retrieve', function(this: RetrieveRoutes, request, response) {
            RetrieveService.retrieveFile(request, response);
        });

        return this.app;
    }
}