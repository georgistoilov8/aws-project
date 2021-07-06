import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import { AuthenticationService } from './authentication.service';

export class AuthenticationRoutes extends CommonRoutesConfig {
    constructor(
        app: express.Application,
    ) {
        super(app, 'AuthenticationRoutes');
    }

    configureRoutes() {
        this.app.post('/auth', function(this: AuthenticationRoutes, request, response) {
            AuthenticationService.checkUser(request, response);
        });

        this.app.post('/register', function(this: AuthenticationRoutes, request, response) {
            AuthenticationService.registerUser(request, response);
        });

        return this.app;
    }
}