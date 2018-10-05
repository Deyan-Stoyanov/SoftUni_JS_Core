function extractLinks(arr) {
    let regex = /www\.[A-Za-z0-9-]+(\.[a-z]+)+/g;
    let websites = arr.join(' ').match(regex);
    return websites === null ? '' : websites.join('\n');
}

console.log(extractLinks(['Join WebStars now for free, at www.web-stars.com',
    'You can also support our partners:',
    'Internet - www.internet.com',
    'WebSpiders - www.webspiders101.com',
    'Sentinel - www.sentinel.-ko'
]));
