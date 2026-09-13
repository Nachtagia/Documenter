const mainFinal = (array) => {

    const finalArray = []
    let entryVal = 0

    try {

        for (const dataString of array) {

            const newString = dataString.replaceAll(/[^a-zA-Z0-9]/g, "");

            // Yeah, here is the unfun part of the entire code.

            if (newString.length >= 2) {

                const finalString = newString.toLowerCase();
                finalArray.push(finalString);

            } else {

                entryVal = entryVal + 1;

            }

        };

    } catch (error) {
        
        console.error(`[FINAL] ERROR HAS BEEN ENCOUNTERED ${error}`);

    } finally {

        console.log(finalArray);
        console.log(`[FINAL] TOTAL ENTRIES REMOVED ${entryVal}`);
        return finalArray;

    }
};
module.exports = mainFinal;