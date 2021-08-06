const fs = require("fs");
const csv = require("csvtojson")
const objToCsv = require('csv-to-js-parser').objToCsv;

function collectRecords(mainFolderPath, monkeyBreed) {

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
                id: fileName,
                FilePath: `${mainFolderPath.substr(2)}/${fileName}`
            }
            records.push(record)
        })
    }
    console.log(records)
    return records

}
async function init() {
    const monkeyBreed = await csv().fromFile("./labels.csv")
    console.log("monkeyBreed:", monkeyBreed)

    const trainingMainFolderPath = "./training/training"
    const trainingRecords = collectRecords(trainingMainFolderPath, monkeyBreed)
    const validatonMainFolderPath = "./validation/validation"
    const validationRecords = collectRecords(validatonMainFolderPath, monkeyBreed)
    const records = [...trainingRecords, ...validationRecords]
    const jsonString = JSON.stringify(records)
    fs.writeFileSync("monkeys_records.json", jsonString)
    const csvString = objToCsv(records, ',');

    fs.writeFileSync('monkeys_records.csv', csvString);
}
init()