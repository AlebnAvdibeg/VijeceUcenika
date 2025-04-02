const input = document.querySelector('#input-modal'), list = document.querySelector('#wrapper'), edit = document.querySelector('#edit'), spinner = document.querySelector(".spinner-grow");
const form = document.querySelector('#edit-form'), id = document.querySelector('#id'), btn = document.querySelector('#submit'), del = document.querySelector('#delete'), title = document.querySelector('#edit-form #titl'), tags = document.querySelectorAll('#edit-form .form-check-input');
const images = document.querySelector('#images'), files = document.querySelector('#files');
let currentID = '', ci, cf;
function populateEdit(data) {
    title.value = '';
    ci = false, cf = false;
    hugerte.activeEditor.setContent('');
    tags.forEach(tag => tag.checked = false);
    if(!(data?.title)) {
        btn.innerHTML = 'Dodaj';
        form.setAttribute('action', '/admin/api/addnews');
        del.classList.remove('show');
        currentID = '';
        id.value = currentID;
    } else {
        btn.innerHTML = 'Promijeni';
        form.setAttribute('action', '/admin/api/updatenews');
        hugerte.activeEditor.setContent(data?.description);
        data.tags.split('').forEach(tag => {tags[Number(tag)].checked = true});
        title.value = data.title;
        del.classList.add('show');
        currentID = data._id;
        id.value = currentID;
    }
    edit.classList.toggle('show');
}
function updateList() {
    list.innerHTML = '';
    spinner.classList.add('show');
    fetch(`/api/news?q=${input.value}&l=5`)
        .then(response => response.json())
        .then(data => {
            spinner.classList.remove('show');
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
        })
        .catch(() => {
            spinner.classList.remove('show');
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
    if(window.confirm('Aktivnost će biti trajno obrisana!')) {
        fetch('/admin/api/delnews', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({_id: currentID})
        }).then(() => window.location = '/admin');
    }
});
images.addEventListener('change', () => ci = true);
files.addEventListener('change', () => cf = true);
form.addEventListener('submit', (e) => {
    form.setAttribute('action', form.getAttribute('action') + `?h=${Number(ci)}${Number(cf)}`);
    return false;
});
id.value = currentID;
hugerte.init({
    selector:'#editor',
});
updateList();