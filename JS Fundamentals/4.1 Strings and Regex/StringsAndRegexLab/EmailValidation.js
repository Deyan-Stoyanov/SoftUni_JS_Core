function validateEmail(email){
    let regex = /[A-Za-z0-9]+@[a-z]+\.[a-z]+/g;
    return regex.test(email) ? 'Valid' : 'Invalid';
}

console.log(validateEmail('valid@email.bg'));
