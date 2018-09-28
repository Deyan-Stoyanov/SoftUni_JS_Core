function checkSpeed([speed, area]){
    let speedLimit = 0;
    switch(area){
    case 'motorway':
        speedLimit = 130;
        break;
    case 'interstate':
        speedLimit = 90;
        break;
    case 'city':
        speedLimit = 50;
        break;
    case 'residential':
        speedLimit = 20;
        break;
    }
    let difference = speed - speedLimit;
    let warning = '';
    if(difference > 40){
        warning = 'reckless driving';
    } else if(difference > 20){
        warning = 'excessive speeding';
    } else if(difference > 0){
        warning = 'speeding';
    }
    return warning;
}

console.log(checkSpeed([21, 'residential']));
