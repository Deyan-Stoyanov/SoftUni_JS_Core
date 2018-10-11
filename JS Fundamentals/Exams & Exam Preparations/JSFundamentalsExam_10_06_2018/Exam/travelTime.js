function calculatetravelCosts(arr) {
    let countries = new Map();
    for (let str of arr) {
        str = str.split(' > ').filter(x => x !== '');
        let country = str[0];
        let city = str[1].substring(0, 1).toUpperCase() + str[1].substring(1);
        let costs = +str[2];
        if (!countries.has(country)) {
            countries.set(country, new Map());
        }
        if (!countries.get(country).has(city)) {
            countries.get(country).set(city, costs);
        } else if (countries.get(country).get(city) > costs) {
            countries.get(country).set(city, costs);
        }
    }
    let countryNames = Array.from(countries.keys()).sort((a, b) => {
        return a.localeCompare(b);
    });
    for (let c of countryNames) {
        let cityNames = Array.from(countries.get(c).keys()).sort((a, b) => {
            return countries.get(c).get(a) - countries.get(c).get(b);
        });
        let result = c + ' -> ';
        for (let city of cityNames) {
            result += `${city} -> ${countries.get(c).get(city)} `;
        }
        result = result.trim();
        console.log(result);
    }
}

calculatetravelCosts(["Bulgaria > Sofia > 500",
    "Bulgaria > Sopot > 800",
    "France > Paris > 2000",
    "Albania > Tirana > 1000",
    "Bulgaria > Sofia > 200"
]);
