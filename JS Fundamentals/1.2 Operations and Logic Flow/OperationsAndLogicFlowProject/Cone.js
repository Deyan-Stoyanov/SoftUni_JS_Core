function calculateConeData(r, h) {
    function calculateArea(r, h) {
        return  Math.PI * Math.pow(r, 2) + (Math.PI * r * Math.sqrt(Math.pow(r, 2) + Math.pow(h, 2)));
    }

    function calculateVolume(r, h) {
        return 1 / 3 * (Math.PI * Math.pow(r, 2) * h);
    }

    console.log(`volume = ${calculateVolume(r, h)}`);
    console.log(`area = ${calculateArea(r, h)}`);
}

calculateConeData(3, 5);
