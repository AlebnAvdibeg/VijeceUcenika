document.addEventListener('DOMContentLoaded', () => {
    let search = document.getElementById('search'), input = document.getElementById('input-modal'), list = document.querySelector('#wrapper');
    function updateList() {
        fetch(`/api/news?q=${input.value}&l=5`)
            .then(response => response.json())
            .then(data => {
                list.innerHTML = '';
                if(!data.news.length) {
                    const newsItem = document.createElement('p');
                    newsItem.textContent = 'Nema podudaranja';
                    newsItem.style.marginBottom = '.5rem';
                    list.appendChild(newsItem);
                    return;
                }
                data.news.forEach(item => {
                    const newsItem = document.createElement('a');
                    newsItem.classList.add('search-item', 'list-group-item');
                    newsItem.href = `/news/${item._id}`;
                    newsItem.textContent = item.title;
                    list.appendChild(newsItem);
                });
            })
            .catch(() => {
                list.innerHTML = '';
                const newsItem = document.createElement('p');
                newsItem.style.color = 'red';
                newsItem.textContent = 'Došlo je do greške prilikom pretrage';
                list.appendChild(newsItem);
            });
    }
    document.getElementById('fake-input')?.addEventListener('focus', () => {
        updateList();
        document.body.classList.add('disable');
        search.classList.add('show');
        input.focus();
    });
    document.getElementById('fake-icon')?.addEventListener('click', () => {
        updateList();
        document.body.classList.add('disable');
        search.classList.add('show');
        input.focus();
    });
    search?.addEventListener('click', (e) => {
        if (e.target != e.currentTarget) return;
        search.classList.remove('show');
        document.body.classList.remove('disable');
    });
    input.addEventListener('input', () => {
        clearTimeout(this.delay);
        this.delay = setTimeout(updateList, 500);
    });
    input.parentElement.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location = `/news?q=${input.value}&l=3`;
    });
    document.querySelector('#title')?.addEventListener('click', () => window.location = '/');
});