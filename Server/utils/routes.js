'use strict';
const categories = require ("../categories.json");
class Routes{

    constructor(app, data){
        this.data = data;
        this.app = app;
    }

    appRoutes(){
        /* Getting the categories */
        this.app.get('/categories', (request, response) => {
            response.status(200).json(Object.keys(categories));
        });
    }

    routesConfig(){
        this.appRoutes();
    }
}
module.exports = Routes;