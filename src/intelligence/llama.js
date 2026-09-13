const { Ollama } = require("ollama");
const redisData = require("../redis/redis_pull.js");
require("dotenv/config.js")

const ollama = new Ollama();

const mainOllama = async (redisURL) => {

    const redisArray = await redisData(redisURL);

    let mainArray = []

    try {

        console.log(`[OLLAMA] PROCESSING ${redisArray.length} ENTRIES FROM REDIS.`)

        for (let i = 0; i < redisArray.length; i++) {
            const currentChunk = redisArray[i];

            console.log(`[OLLAMA] Processing chunk ${i + 1}/${redisArray.length}.`);

        const llamaPrompt = await ollama.chat({
            model: "qwen2.5:1.5b",
            messages: [
                { 
                    role: "system", 
                    content: process.env.LLAMA_PROMPT
                },
                {
                    role: "user",
                    content: `${currentChunk}.`
                }
            ],
            options: {
                temperature: 0.0
            }
        });

        const chunkWords = llamaPrompt.message.content.trim().split(/\s+/);
        mainArray = mainArray.concat(chunkWords);

        }

        console.log(`[OLLAMA] DATA PROCESSED.`)
        return mainArray;

    } catch (error) {
        
        console.log(`[OLLAMA] FAILED TO PROCESS DUE TO ERROR ${error}`);

    }
};
module.exports = mainOllama;