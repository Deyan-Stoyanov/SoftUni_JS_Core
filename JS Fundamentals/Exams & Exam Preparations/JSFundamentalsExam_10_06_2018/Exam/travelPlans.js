function calculateGold(arr) {
    let specializedCustomers = 0;
    let clumsyCustomers = 0;
    let specializedJobs = ["Programming", "Hardware maintenance", "Cooking", "Translating", "Designing"];
    let averageJobs = ["Driving", "Managing", "Fishing,", "Gardening"];
    let clumsyJobs = ["Singing", "Accounting", "Teaching,", "Exam-Making", "Acting", "Writing", "Lecturing", "Modeling", "Nursing"];
    let totalGold = 0;
    for (let str of arr) {
        str = str.split(" : ");
        let job = str[0];
        let gold = +str[1];
        if (specializedJobs.includes(job)) {
            if (gold < 200) {
                continue;
            }
            specializedCustomers++;
            gold *= 0.8;
            if (specializedCustomers % 2 === 0) {
                gold += 200;
            }
        } else if (clumsyJobs.includes(job)) {
            clumsyCustomers++;
            if (clumsyCustomers % 3 === 0) {
                gold *= 0.9;
            } else if (clumsyCustomers % 2 === 0) {
                gold *= 0.95;
            }
        } else if(!averageJobs.includes(job)){
            continue;
        }
        totalGold += gold;
    }
    console.log(`Final sum: ${totalGold.toFixed(2)}`);
    if (totalGold >= 1000) {
            console.log(`Mariyka earned ${(totalGold - 1000).toFixed(2)} gold more.`);
    } else {
        console.log(`Mariyka need to earn ${(1000 - totalGold).toFixed(2)} gold more to continue in the next task.`);
    }
}


calculateGold(["Programming : 500", "Driving : 243.55", "Acting : 200", "Singing : 100", "Cooking : 199", "Hardware maintenance : 800", "Gardening : 700", "Programming : 500"]);
