const axios = require("axios");

const baseUrl = "https://exam.ankush.wiki/data?part=";
const connectSid = "s%3ALvHNdeoYPMDHcl7Pux5c4aOmUtL-AVZ_.8l2tEqbkhcSlt2WSpR%2BISy3ipAqiq6YhgtVy5c9uSqc";
const decodedMapData = new Map();

(async () => {
    for (let number = 1; number <= 21; number++) {
        await fetchData(number);     // function call - line 113 
        await delay(2600);
    }
    const chainCode = constructChaincode();    // function call - line 18 

    // final answer
    console.log("chaincode", chainCode);
    return chainCode;
})();

async function fetchData(number) {
    const url = baseUrl + number;
    console.log(url);
    try {
    const response = await axios.get(url, {
        headers: {
            Cookie: `connect.sid=${connectSid}`,
        },
    });
    console.log(response.data);
    decodeData(response.data);    // function call - line 85

    } 
    catch (error) {
        console.error(
            `Failed to get data for number ${number}. Error:`,
            error
        );
    }
}

function decodeData(data) {
    const arrayOfString = data.data.join(",").replace(/,/g, "");
    console.log("arrayOfString", arrayOfString);
    const morseArray = arrayOfString.split("➡➡➡");
    console.log("morseArray", morseArray);

    // assumption - data is key:value pair
    const firstPartLength = morseArray[0].length;
    
    if (firstPartLength === 5) {

        const digit = morseCodeToNumber[morseArray[0]];
        console.log("digit", digit);
        const stringPart = morseCodeDict[morseArray[1]];
        console.log("stringPart", stringPart);
        decodedMapData.set(digit, stringPart);
        console.log(decodedMapData);
        console.log("decodedMapData", decodedMapData);
    } 
    else if (firstPartLength === 10) {

        const firstDigitMorse = morseArray[0].slice(0,5);
        const secondDigitMorse = morseArray[0].slice(5);

        const firstDigit = morseCodeToNumber[firstDigitMorse];
        const secondDigit = morseCodeToNumber[secondDigitMorse];

        const doubleDigit = parseInt(`${firstDigit}${secondDigit}`, 10);
        console.log("doubleDigit", doubleDigit);

        const stringPart = morseCodeDict[morseArray[1]];
        console.log("stringPart", stringPart);
        decodedMapData.set(doubleDigit, stringPart);
        console.log("decodedMapData", decodedMapData);
    }
}

function constructChaincode(){

    // need to debug sorting part
    console.log("decodeMapData", decodedMapData);
    const sorted = [...decodedMapData].sort();
    console.log("Sorted array", sorted);
    const chainCode = sorted.map(value => value[1]).join('');
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// manually tested on this data - yes, I couldn't fetch full dataset by 11.30 PM IST - but logic below adheres to assignment rules. 
const mockData = {
    "data": [
        ".",
        "-",
        "-",
        "-",
        "-",
        ".",
        ".",
        ".",
        ".",
        "-",
        "➡➡➡",
        "."
    ]
}

const morseCodeToNumber = {
    "-----": 0,
    ".----": 1,
    "..---": 2,
    "...--": 3,
    "....-": 4,
    ".....": 5,
    "-....": 6,
    "--...": 7,
    "---..": 8,
    "----.": 9,
};

const morseCodeDict = {
    '.-': 'A',
    '-...': 'B',
    '-.-.': 'C',
    '-..': 'D',
    '.': 'E',
    '..-.': 'F',
    '--.': 'G',
    '....': 'H',
    '..': 'I',
    '.---': 'J',
    '-.-': 'K',
    '.-..': 'L',
    '--': 'M',
    '-.': 'N',
    '---': 'O',
    '.--.': 'P',
    '--.-': 'Q',
    '.-.': 'R',
    '...': 'S',
    '-': 'T',
    '..-': 'U',
    '...-': 'V',
    '.--': 'W',
    '-..-': 'X',
    '-.--': 'Y',
    '--..': 'Z'
};



