function toggle() {
    let button = document.getElementsByClassName('button')[0];
    let extraElement = document.getElementById('extra');
    if (button.textContent == 'More') {
        extraElement.style.display = 'block';
        button.textContent = 'Less';
    } else {
        extraElement.style.display = 'none';
        button.textContent = 'More';
    }
}
