'use strict';
const categories = require ("../categories.json");
class Routes{

    constructor(app, data){
        this.data = data;
        this.app = app;
    }

    appRoutes(){
        /* Getting the total room count and Available rooms to chat */
        this.app.get('/getRooms', (request, response) => {
            response.status(200).json(this.data.rooms); 
        });
        this.app.get('/categories', (request, response) => {
            response.status(200).json(Object.keys(this.categories));
        });
    }

    routesConfig(){
        this.appRoutes();
    }
}
module.exports = Routes;