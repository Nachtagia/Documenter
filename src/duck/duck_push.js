const { default: duckdb } = require("@duckdb/node-api");

const duckPush = async (wordsArray) => {

    const client = await duckdb.DuckDBInstance.create(`./data/duck.db`);
    const connect = await client.connect();

    try {

        await connect.run(`CREATE SEQUENCE IF NOT EXISTS word_id START 1`);

        await connect.run(`
            CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY DEFAULT nextval('word_id'),
            word VARCHAR
            )`);

        for (const word of wordsArray) {
            await connect.run(
                `INSERT INTO words (word) VALUES (?)`, [word]
            );
        }

        const displayDuck = await connect.runAndReadAll(`SELECT * FROM words ORDER BY id ASC`);
        console.log(`[DUCK] ENTRIES `,displayDuck.getRows());        
        
    } catch (error) {
        
        console.error(`[DUCK] ERROR ENCOUNTERED ${error}`);

    } finally {

        if (connect) await connect.closeSync();
        if (client) await client.closeSync();

    }


};
module.exports = duckPush;