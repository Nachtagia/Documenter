const path = require("path");
const fs = require("fs").promises;

const fileExt = [".png", ".jpg", ".jpeg", ".tif"];
const inputDir = path.join(__dirname, "..", "images")

const mainDir = async () => {

        let fileDirs = [];
        console.log(`[DIRECTORY] GETTING FILE PATHS.`)

    try {

        const getDir = async (myDir = inputDir) => {

            const files = await fs.readdir(myDir, {withFileTypes: true})
            
            for (const file of files) {

                const filePath = path.join(myDir, file.name);

                if (file.isDirectory()) {

                    await getDir(filePath);

                }   else if (file.isFile() && fileExt.includes(path.extname(file.name).toLowerCase())) {

                        fileDirs.push(filePath);

                }
            }   
        };

        await getDir()
        if (fileDirs.length !== 0) {
            console.log(`[DIRECTORY] FILE PATHS ACQUIRED.`)
            return fileDirs

        } else {

            console.error(`[DIRECTORY ERROR] NO PATHS FOUND.`)
            process.exit(1)
            
        }

    } catch (err) {

        console.error(`[DIRECTORY ERROR] ${err}`)
    }
}
module.exports = mainDir;