function race(arr) {
    let pilots = arr[0].split(/\s+/g).filter(x => x !== '');
    for (let i = 1; i < arr.length; i++) {
        let str = arr[i].split(/\s+/g).filter(x => x !== '');
        let command = str[0];
        let pilotName = str[1];
        switch (command) {
            case 'Join':
                if (!pilots.includes(pilotName)) {
                    pilots.push(pilotName);
                }
                break;
            case 'Crash':
                pilots = pilots.filter(x => x !== pilotName);
                break;
            case 'Pit':
                if (pilots.includes(pilotName)) {
                    let indexOfPilotToPit = pilots.indexOf(pilotName);
                    if (indexOfPilotToPit >= 0 && indexOfPilotToPit < pilots.length - 1) {
                        let temp = pilots[indexOfPilotToPit + 1];
                        pilots[indexOfPilotToPit + 1] = pilots[indexOfPilotToPit];
                        pilots[indexOfPilotToPit] = temp;
                    }
                }
                break;
            case 'Overtake':
                if (pilots.includes(pilotName)) {
                    let indexOfPilotToOvertake = pilots.indexOf(pilotName);
                    if (indexOfPilotToOvertake > 0 && indexOfPilotToOvertake < pilots.length) {
                        let temp = pilots[indexOfPilotToOvertake - 1];
                        pilots[indexOfPilotToOvertake - 1] = pilots[indexOfPilotToOvertake];
                        pilots[indexOfPilotToOvertake] = temp;
                    }
                }
                break;
            default:
                break;
        }
    }
    console.log(pilots.join(' ~ '));
}

race(["Vetel Hamilton Raikonnen Botas Slavi",
    "Pit Hamilton",
    "Overtake LeClerc",
    "Join Ricardo",
    "Crash Botas",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Overtake Ricardo",
    "Crash Slavi"
]);
