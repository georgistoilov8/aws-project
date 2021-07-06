import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import { UserActionService } from './user-actions.service';

export class UserActionsRoutes extends CommonRoutesConfig {
    constructor(
        app: express.Application,
    ) {
        super(app, 'UserActionsRoutes');
    }

    configureRoutes() {
        this.app.post('/like', function(this: UserActionsRoutes, request, response) {
            UserActionService.likeFile(request, response);
        });

        this.app.post('/unlike', function(this: UserActionsRoutes, request, response) {
            UserActionService.unlikeFile(request, response);
        });

        this.app.get('/showliked', function(this: UserActionsRoutes, request, response) {
            UserActionService.showLikedFiles(request, response);
        });

        return this.app;
    }
}