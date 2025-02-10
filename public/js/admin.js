const input = document.querySelector('#input-modal'), list = document.querySelector('#wrapper'), edit = document.querySelector('#edit');
const form = document.querySelector('form'), id = document.querySelector('#id'), btn = document.querySelector('#submit'), del = document.querySelector('#delete'), title = document.querySelector('form #titl'), files = document.querySelector('form #files'), tags = document.querySelectorAll('form .form-check-input');
let currentID = '000000000000000000000000';
function populateEdit(data) {
    title.value = '';
    hugerte.activeEditor.setContent('');
    tags.forEach(tag => tag.checked = false);
    files.value = '';
    if(!(data?.title)) {
        btn.innerHTML = 'Add';
        del.classList.remove('show');
        currentID = '000000000000000000000000';
        id.value = currentID;
        console.log(id.value);
    } else {
        btn.innerHTML = 'Update';
        hugerte.activeEditor.setContent(data?.description);
        data.tags.split('').forEach(tag => {tags[Number(tag)].checked = true});
        title.value = data.title;
        files.value = data.files;
        del.classList.add('show');
        currentID = data._id;
        id.value = currentID;
    }
    edit.classList.toggle('show');
}
function updateList() {
    if(input.value == '') return;
    fetch(`/api/news?q=${input.value}`)
        .then(response => response.json())
        .then(data => {
            list.innerHTML = '';
            if(!data.news.length) {
                const newsItem = document.createElement('p');
                newsItem.style.marginBottom = '.5rem';
                newsItem.textContent = 'Nema podudaranja';
                list.appendChild(newsItem);
                return;
            }
            data.news.forEach(item => {
                const newsItem = document.createElement('p');
                newsItem.classList.add('search-item', 'list-group-item');
                newsItem.onclick = () => populateEdit(item);
                newsItem.textContent = item.title;
                list.appendChild(newsItem);
            });
            if(!data.end) {
                const newsItem = document.createElement('p');
                newsItem.textContent = '...';
                newsItem.style.textAlign = 'center';
                newsItem.style.marginBottom = '.5rem';
                list.appendChild(newsItem);
                return;
            }
        })
        .catch(() => {
            list.innerHTML = '';
            const newsItem = document.createElement('p');
            newsItem.style.color = 'red';
            newsItem.style.marginBottom = '.5rem';
            newsItem.textContent = 'Došlo je do greške prilikom pretrage';
            list.appendChild(newsItem);
        });
}
input.addEventListener('input', () => {
    clearTimeout(this.delay);
    this.delay = setTimeout(updateList, 500);
});
document.querySelector('#back').addEventListener('click', () => edit.classList.toggle('show'));
document.querySelector('#add').addEventListener('click', () => populateEdit({}));
del.addEventListener('click', () => {
    if(window.confirm('Do you really want to completely delete this activity?')) {
        fetch('/admin/api/delnews', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({_id: currentID})
        }).then(() => window.location = '/admin');
    }
});
id.value = currentID;
hugerte.init({
    selector:'#editor',
});
updateList();