// Imports
const redisPush = require("./redis/redis_push.js");
const mainOllama = require("./intelligence/llama.js");
const mainFinal = require("./final/final.js");
const duckPush = require("./duck/duck_push.js");
// Modules
require("dotenv/config.js")
// Constants & Variables.

// Execution.

// just type "npm run dev" in the terminal.

const mainRun = async () => {

    try {
        // This inserts data into a redis database online.
        await redisPush(process.env.REDIS_URL);
        // This pulls the data and processes it into an AI, then cleans the array and pushe s it into a nosql duck database.
        await duckPush(await mainFinal(await mainOllama(process.env.REDIS_URL)));

    } catch (error) {
        
        console.error(`[MAIN EXECUTION] ERROR ${error}`);

    } finally {

    }

}
mainRun();