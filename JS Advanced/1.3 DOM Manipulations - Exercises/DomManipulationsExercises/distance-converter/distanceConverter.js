function attachEventsListeners() {
    let button = document.getElementById('convert');
    button.addEventListener('click', () => {
        let inputMenu = document.getElementById('inputUnits');
        let multiplier;
        let inputOption = +inputMenu.selectedIndex;
        let units = +document.getElementById('inputDistance').value;
        switch (inputOption) {
            case 0:
                multiplier = 1000;
                break;
            case 1:
                multiplier = 1;
                break;
            case 2:
                multiplier = 0.01;
                break;
            case 3:
                multiplier = 0.001;
                break;
            case 4:
                multiplier = 1609.34;
                break;
            case 5:
                multiplier = 0.9144;
                break;
            case 6:
                multiplier = 0.3048;
                break;
            case 7:
                multiplier = 0.0254;
                break;
            default:
                break;
        }
        let meters = units * multiplier;

        let outputMenu = document.getElementById('outputUnits');
        let outputOption = +outputMenu.selectedIndex;
        let outputMultiplier;
        let result;
        switch (outputOption) {
            case 0:
                outputMultiplier = 1000;
                break;
            case 1:
                outputMultiplier = 1;
                break;
            case 2:
                outputMultiplier = 0.01;
                break;
            case 3:
                outputMultiplier = 0.001;
                break;
            case 4:
                outputMultiplier = 1609.34;
                break;
            case 5:
                outputMultiplier = 0.9144;
                break;
            case 6:
                outputMultiplier = 0.3048;
                break;
            case 7:
                outputMultiplier = 0.0254;
                break;
            default:
                break;
        }
        result = meters / outputMultiplier;
        let output = document.getElementById('outputDistance');
        output.value = result;
    });
}
