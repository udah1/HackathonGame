'use strict';
class Routes{

    constructor(app, data){
        this.data = data;
        this.app = app;
    }

    appRoutes(){

        /* Getting the total room count and Avaialable rooms to chat */
        this.app.get('/getRoomStats', (request, response) => {
            console.log(request);
            Promise.all(['totalRoomCount', 'allRooms'].map(key => this.data[key])).then(values => {
                const totalRoomCount = values[0];
                const allRooms = JSON.parse(values[1]);
                response.status(200).json({
                    'totalRoomCount' : totalRoomCount,
                    'fullRooms' : allRooms['fullRooms'],
                    'emptyRooms': allRooms['emptyRooms']
                });
            });
        });
    }

    routesConfig(){
        this.appRoutes();
    }
}
module.exports = Routes;