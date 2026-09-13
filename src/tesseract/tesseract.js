const {createWorker} = require("tesseract.js");
const mainDir = require("../utility/utility.js")
const fs = require("fs");

const mainTes = async () => {
    
    const images = await mainDir();
    const worker = await createWorker("eng");
    let tesData = [];

    console.log(`[TESSERACT] COMMENCING IMAGE PARSING.`)

    try {
            for (const image of images) {
                const imgProcess = await worker.recognize(image);
                const imgData = imgProcess.data.text;
                tesData.push(imgData);
                fs.rmSync(image, {recursive : true, force : true});
    }

    console.log(`[TESSERACT] IMAGE PARSING COMPLETE, ${tesData.length} ENTRIES ACQUIRED.`)
    return tesData;
        
    } catch (error) {

        console.error(`[TESSERACT ERROR] ${error}`);

    } finally {

        worker.terminate();

    }
}
module.exports = mainTes;