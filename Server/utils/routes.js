'use strict';
class Routes{

    constructor(app, data){
        this.data = data;
        this.app = app;
    }

    appRoutes(){
        /* Getting the total room count and Available rooms to chat */
        this.app.get('/getRoomStats', (request, response) => {
            response.status(200).json(this.data.rooms);
        });
    }

    routesConfig(){
        this.appRoutes();
    }
}
module.exports = Routes;