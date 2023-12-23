// script masih gagal

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
const params = new URLSearchParams({
  'page[number]': 1,
  'page[size]': 10,
  append: ['small_image', 'medium_image'],
  sort: '-published_at',
});

const urlWithParams = `${apiUrl}?${params.toString()}`;

fetch(proxyUrl + urlWithParams)
  .then(response => response.json())
  .then(data => {
    const ideasContainer = document.getElementById('ideas-container');

    if (data.data && data.data.length > 0) {
      data.data.forEach(idea => {
        const ideaCard = document.createElement('div');
        ideaCard.classList.add('col', 'm-2', 'col-md-4');
        ideaCard.innerHTML = `
          <div class="card shadow" style="width: 15rem; height: 18rem;">
            <img src="${idea.attributes.small_image}" class="card-img-top" alt="${idea.attributes.title}">
              <div class="card-body">
              <p class="card-date">${idea.attributes.date}</p>
              <p class="card-text fw-semibold">${idea.attributes.title}</p>
              </div>
          </div>
        `;
        ideasContainer.appendChild(ideaCard);
      });
    } else {
      console.error('Data not found');
    }

  })
  .catch(error => console.error('Error fetching data:', error));
