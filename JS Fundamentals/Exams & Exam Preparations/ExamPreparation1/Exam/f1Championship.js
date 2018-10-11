function calculateAndDislayTeams(arr) {
    let teams = new Map();
    for (let str of arr) {
        let[teamName, pilotName, score] = str.split(' -> ').filter(x => x !== '');
        if (!teams.has(teamName)) {
            teams.set(teamName, new Map());
        }
        if (!teams.get(teamName).has(pilotName)) {
            teams.get(teamName).set(pilotName, 0);
        }
        teams.get(teamName).set(pilotName, teams.get(teamName).get(pilotName) + score);
    }
    let keys = Array.from(teams.keys()).sort((a, b) => {
        return Array.from(teams.get(b).values()).reduce((acc, val) => {
            return acc += val;
        }, 0) - Array.from(teams.get(a).values()).reduce((accum, value) => {
            return accum += value;
        }, 0);
    });
    for (let i = 0; i < 3; i++) {
        let totalPoints = Array.from(teams.get(keys[i]).values()).reduce((acc, val) => {
            return acc += val;
        }, 0);
        console.log(`${keys[i]}: ${totalPoints}`);
        let pilotKeys = Array.from(teams.get(keys[i]).keys()).sort((a, b) => {
            return teams.get(keys[i]).get(b) - teams.get(keys[i]).get(a);
        });
        for (let pilotKey of pilotKeys) {
            console.log(`-- ${pilotKey} -> ${teams.get(keys[i]).get(pilotKey)}`);
        }
    }
}

calculateAndDislayTeams(["Ferrari -> Kimi Raikonnen -> 25",
    "Ferrari -> Sebastian Vettel -> 18",
    "Mercedes -> Lewis Hamilton -> 10",
    "Mercedes -> Valteri Bottas -> 8",
    "Red Bull -> Max Verstapen -> 6",
    "Red Bull -> Daniel Ricciardo -> 4"
]);
