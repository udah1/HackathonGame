'use strict';

const express = require("express");
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const socketEvents = require('./utils/socket');
const routes = require('./utils/routes');


const data = {
    rooms: {
        1: {
            players: {
                'uda': {
                    points: 100
                }
            },
            isFull: false,
            generatedClause: '',
            selectedLetters: [],
            gamePoints: 100,
        }
    }
};

class Server{

    constructor(){
        this.port =  process.env.PORT || 4000;
        this.host = '0.0.0.0';

        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);

    }

    appConfig(){
        this.app.use(
            bodyParser.json()
        );
        this.app.use(
            cors()
        );
    }

    /* Including app Routes starts*/
    async includeRoutes(){
        new routes(this.app, data).routesConfig();
        new socketEvents(this.socket, data).socketConfig();
    }
    /* Including app Routes ends*/

    async appExecute(){
        this.appConfig();
        await this.includeRoutes();

        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
    });
    }

}

const app = new Server();
app.appExecute();