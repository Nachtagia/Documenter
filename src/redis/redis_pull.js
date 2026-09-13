const { createClient } = require("redis");
const { v4 } = require("uuid");

const redisPull = async (redisURL) => {

    const client = createClient({url: redisURL})
    let redisArray = []

    try {
        
        await client.connect();
        const redisContainer = "redis_keybase";

        console.log(`[REDIS] DATA PULLER ACTIVE.`)

        redisArray = await client.hVals(redisContainer)
        
        if (redisArray.length > 0) {

            await client.del(redisContainer);
            console.log(`[REDIS] CONTAINER PURGED, ENTRIES DELETED ${redisArray.length}`);

        }

    } catch (error) {
        
        console.error(`[REDIS] DATA PULLER ERROR ${error}`);

    } finally {
        
        if (redisArray.length === 0) {

            console.log(`[REDIS] NO ENTRIES IN DATABASE.`)
            process.exit(1)

        } else {

        console.log(`[REDIS] DATA SUCCESSFULLY FETCHED.`)

        return redisArray

        }

    }
}
module.exports = redisPull;