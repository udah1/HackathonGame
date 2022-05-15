"use strict";

class redisDB{

    constructor(){
        this.redis = require("redis");
    }

    async connectDB(){
        const client = this.redis.createClient({
            host : '127.0.0.1',
            post : 6379
        });
        await client.connect();

        client.on("error", (err) => {
            console.log("Error " + err);
        });

        client.on("ready", (err) => {
            console.log("Ready ");
        });

        require('bluebird').promisifyAll(client);
        return client;
    }
}

module.exports = new redisDB();