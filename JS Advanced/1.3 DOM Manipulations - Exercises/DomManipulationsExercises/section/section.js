function create(sentences) {
    let content = document.getElementById('content');
    for (let str of sentences) {
        let div = document.createElement('div');
        let paragraph = document.createElement('p');
        paragraph.textContent = str;
        paragraph.style.display = 'none';
        div.appendChild(paragraph);
        div.addEventListener('click', function () {
            let children = div.childNodes;
            for (let child of children) {
                if(child.style.display == 'none'){
                    child.style.display = 'block';
                } else {
                    child.style.display = 'none';
                }
            }
        });
        content.appendChild(div);
    }
}
