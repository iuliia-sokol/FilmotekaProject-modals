import * as basicLightbox from 'basiclightbox';
import axios from 'axios';
import { refs } from './refs';

const lightboxedCard = document.querySelectorAll('.list__item');

lightboxedCard.forEach(item => item.addEventListener('click', openLightbox));

const allProducts = [...lightboxedCard];
// console.log(allProducts);

function getSelectedItem(event, array) {
  const selectedProduct = array.find(
    item => item.dataset.id === event.currentTarget.dataset.id
  );
  return selectedProduct;
}

function openLightbox(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'LI') {
    return;
  }
  if (event.target.nodeName === 'LI') {
    onFilmCardClick(event);
  }
}

function onFilmCardClick(event) {
  const selectedProduct = getSelectedItem(event, allProducts);

  const filmId = selectedProduct.dataset.id;

  try {
    fetchData(filmId).then(result => {
      const data = result.data;

      const filmData = {
        id: data.id,
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        title: data.title,
        originalTitle: data.original_title,
        genres: [],
        popularity: data.popularity,
        overview: data.overview,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
      };

      data.genres.forEach(genre => {
        filmData.genres.push(genre.name);
      });
      filmData.genres = filmData.genres.join(', ');

      createModalMarkUp(filmData);

      const addToWatchedBtn = document.querySelector(
        '.lightbox-modal__watched-button'
      );

      const addToQuequeBtn = document.querySelector(
        '.lightbox-modal__queque-button'
      );

      addToWatchedBtn.addEventListener('click', onAddToWatchedClick);
      addToQuequeBtn.addEventListener('click', onAddToQuequeClick);
    });
  } catch {
    er => {
      console.log(er);
    };
  }
}

async function fetchData(filmId) {
  const API_KEY = '663bd5fd8d905b7ce2d57e9867d3492e';

  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
  });

  const url = `https://api.themoviedb.org/3/movie/${filmId}?${searchParams}`;

  const response = await axios.get(url);
  if (response.status === 404) {
    // Notify.failure('Oops, no pics found. Please try again', notifySettings);
    return Promise.reject();
  }
  return response;
}

function createModalMarkUp({
  id,
  poster,
  title,
  originalTitle,
  genres,
  popularity,
  overview,
  vote_average,
  vote_count,
}) {
  const instance = basicLightbox.create(
    `
   <div class="lightbox-modal">
   <button
      data-map-close
      class="lightbox-modal__close-btn"
      aria-label="close modal window"
    >&#10005;
    </button>
<div class="lightbox-modal__img-wrapper">
 <img class="lightbox-modal__image"
  src="${poster}"
  alt="${title}"/>
</div>

<div class="lightbox-modal__data">
<p class="lightbox-modal__title" data-title>${title}</p>

<div class="lightbox-modal__meta">
<div class="lightbox-modal__meta-title">
<ul class="lightbox-modal__meta-title-list">
<li class="lightbox-modal__meta-title-list-item">Vote / Votes</li>
<li class="lightbox-modal__meta-title-list-item">Popularity</li>
<li class="lightbox-modal__meta-title-list-item">Original Title</li>
<li class="lightbox-modal__meta-title-list-item">Genre</li>
</ul>
</div>

<div class="lightbox-modal__meta-value">
<ul class="lightbox-modal__meta-value-list">
<li class="lightbox-modal__meta-value-list-item"><span class="lightbox-modal__meta-value-vote" data-vote>${vote_average}</span><span class="lightbox-modal__meta-value-votes-divider">/</span><span class="lightbox-modal__meta-value-votes" data-votes>${vote_count}</span></li>
<li class="lightbox-modal__meta-value-list-item"><span data-popularity>${popularity}</span></li>
<li class="lightbox-modal__meta-value-list-item"><span class="lightbox-modal__meta-value-title" data-original-title>${originalTitle}</span></li>
<li class="lightbox-modal__meta-value-list-item"><span data-genre>${genres}</span></li>
</ul>
</div>
</div>

<p class="lightbox-modal__description">
<span class="lightbox-modal__description-title">About</span>
${overview}
</p>

<div class="lightbox-modal__buttons">
<button type="button" class="lightbox-modal__watched-button" data-id="${id}">Add to Watched</button>
<button type="button" class="lightbox-modal__queque-button" data-id="${id}">Add to queue</button>
</div>

</div>`,
    {
      onShow: instance => {
        instance.element().querySelector('.lightbox-modal__close-btn').onclick =
          instance.close;
        window.addEventListener('keydown', event => {
          if (event.code === 'Escape' || event.code === 'Space') {
            instance.close();
            window.removeEventListener;
          }
        });
      },
      onClose: instance => {},
    }
  );
  instance.show();
}

function onAddToWatchedClick(event) {
  event.preventDefault();
  event.target.textContent = 'Added to watched';
}

function onAddToQuequeClick(event) {
  event.preventDefault();
  event.target.textContent = 'Added to queque';
}
