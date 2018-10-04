function printLetters(str) {
    for (const index in str) {
        console.log(`str[${index}] -> ${str.charAt(index)}`);
    }
}

printLetters('Hello  | world w!');
