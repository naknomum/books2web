var bookData;
const prefix = 'books2web-';

function initBooks() {
    fetch('books.json')
        .then((resp) => resp.json())
        .then((data) => gotBookJson(data));
}


function gotBookJson(json) {
    bookData = json;
    json.keys.splice(0, 0, '#');
    let tableEl = document.getElementsByTagName('table')[0];
    if (!tableEl) return alert('no table element');
    let tr = document.createElement('tr');
    tr.classList.add(prefix + 'header', prefix + 'row');

    let keyClass = [];
    for (let i = 0 ; i < json.keys.length ; i++) {
        keyClass[i] = json.keys[i].toLowerCase().replaceAll(' ', '-');
        if (i == 0) keyClass[i] = 'num';
        let th = document.createElement('th');
        th.classList.add(prefix + 'header', prefix + 'col', prefix + 'col-' + i, prefix + 'key-' + keyClass[i]);
        th.innerHTML = json.keys[i];
        tr.appendChild(th);
    }
    tableEl.appendChild(tr);

    for (let j = 0 ; j < json.data.length ; j++) {
        let tr = document.createElement('tr');
        tr.classList.add(prefix + 'data', prefix + 'row', prefix + 'row-' + j, prefix + 'parity-' + (j % 2 ? 'even' : 'odd'));
        json.data[j].splice(0, 0, j+1);
        for (let i = 0 ; i < json.data[j].length ; i++) {
            let td = document.createElement('td');
            td.classList.add(prefix + 'data', prefix + 'col', prefix + 'col-' + i, prefix + 'key-' + keyClass[i]);
            td.innerHTML = json.data[j][i];
            tr.appendChild(td);
        }
        tableEl.appendChild(tr);
    }
}
