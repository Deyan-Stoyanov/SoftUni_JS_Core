function parseUsernames(arr) {
    let usernames = [];
    for (let email of arr) {
        let username = email.slice(0, email.indexOf('@')) + '.';
        email = email.substring(email.indexOf('@') + 1);
        let suffix = email.split('.').map(x => x.substring(0, 1)).join('');
        username += suffix;
        usernames.push(username);
    }
    return usernames.join(', ');
}
console.log(parseUsernames(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']));
