function fillForm(username, email, phone, textArr) {
    for (let str of textArr) {
        str = str.replace(/\<\![a-zA-Z]+\!\>/g, username);
        str = str.replace(/\<\@[a-zA-Z]+\@\>/g, email);
        str = str.replace(/\<\+[a-zA-Z]+\+\>/g, phone);
        console.log(str);
    }
}

fillForm('Pesho',
    'pesho@softuni.bg',
    '90-60-90',
    ['Hello, <!username!>!',
        'Welcome to your Personal profile.',
        'Here you can modify your profile freely.',
        'Your current username is: <!fdsfs!>. Would you like to change that? (Y/N)',
        'Your current email is: <@DasEmail@>. Would you like to change that? (Y/N)',
        'Your current phone number is: <+number+>. Would you like to change that? (Y/N)'
    ]
);
