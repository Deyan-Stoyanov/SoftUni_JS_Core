function extractValidSentences(arr) {
    function checkSentence(companies, sentence) {
        for (let c of companies) {
            if (sentence.indexOf(c) === -1) {
                return false;
            }
        }
        return true;
    }
    let companies = arr[0];
    let delimiter = arr[1];
    let regex = new RegExp(delimiter, 'ig');
    companies = companies.split(regex).filter(x => x !== '');
    let validSentences = [];
    let invalidSentences = [];
    for (let i = 2; i < arr.length; i++) {
        arr[i] = arr[i].toLowerCase();
        if (checkSentence(companies, arr[i])) {
            validSentences.push(arr[i]);
        } else {
            invalidSentences.push(arr[i]);
        }
    }
    if (validSentences.length !== 0) {
        console.log('ValidSentences');
        for (let v in validSentences) {
            console.log(`${+v + 1}. ${validSentences[v]}`);
        }
    }
    if (validSentences.length !== 0 && invalidSentences.length !== 0) {
        console.log('='.repeat(30));
    }
    if (invalidSentences.length !== 0) {
        console.log('InvalidSentences');
        for (let i in invalidSentences) {
            console.log(`${+i + 1}. ${invalidSentences[i]}`);
        }
    }
}

extractValidSentences(["bulgariatour@, minkatrans@, koftipochivkaltd",
    "@,",
    "Mincho e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
    "dqdo mraz some text but is KoftiPochivkaLTD MinkaTrans",
    "someone continues as no "
]);
