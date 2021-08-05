const fs = require("fs");
const csv = require("csvtojson")

async function init() {
    const monkeyBreed = await csv().fromFile("./labels.csv")
    console.log("monkeyBreed:", monkeyBreed)
    const mainFolderPath = "./training/training"
    const mainFolder = fs.readdirSync(mainFolderPath)
    console.log("mainFolder:", mainFolder)
    let records = []
    for (let i = 0; i < mainFolder.length; i++) {
        const subFolder = mainFolder[i]
        console.log("subFolder:", subFolder)
        const subFolderPath = mainFolderPath + "/" + subFolder
        console.log("subFolderPath:", subFolderPath)
        const fileNames = fs.readdirSync(subFolderPath)
        //console.log("fileNames:", fileNames)
        console.log(`${fileNames.length} are found`)
        const breedDetails = monkeyBreed.find(e => e.Label === subFolder)
        console.log("breedDetails:", breedDetails)
        fileNames.forEach(fileName => {
            const record = {
                Label: breedDetails.Label,
                LatinName: breedDetails.LatinName,
                CommonName: breedDetails.CommonName,
                id: fileName
            }
            records.push(record)
        })
    }
    console.log(records)
    const jsonString = JSON.stringify(records)
    fs.writeFileSync("monkeys_records.json", jsonString)
}
init()