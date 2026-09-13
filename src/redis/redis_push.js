const {createClient} = require("redis");
const { v4 } = require("uuid");
const mainTes = require("../tesseract/tesseract.js");

const redisPush = async (redisURL) => {

    const client = createClient({url: redisURL});

    try {

        await client.connect();
        const tesData = await mainTes();
        
        console.log(`[REDIS] DATA PUSHER ACTIVE.`);
        const redisContainer = "redis_keybase";

        for (const dataLarge of tesData) {

            const dataMedium = dataLarge.trim().split(/\s+/);

            for (let i = 0; i < dataMedium.length; i += 25) {

                const dataSmall = dataMedium.slice(i, i + 25);
                const dataChunk = dataSmall.join(" ");

                const uniqueKey = v4();

                await client.hSet(redisContainer, uniqueKey, dataChunk);
                console.log(`[REDIS] KEY ${uniqueKey} HAS BEEN LOGGED.`);
            }
        }

        console.log(`[REDIS] KEYS SUCCESSFULLY LOGGED.`);
        
    } catch (error) {

        console.error(`[REDIS ERROR] ${error}`);

    }
};
module.exports = redisPush;