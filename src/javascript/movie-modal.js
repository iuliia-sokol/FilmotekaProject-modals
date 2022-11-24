import * as basicLightbox from 'basiclightbox';
import { refs } from './refs';

const lightboxedCard = document.querySelectorAll('.list__item');

lightboxedCard.forEach(item => item.addEventListener('click', openLightbox));

const allProducts = [...lightboxedCard];
console.log(allProducts);

function getSelectedItem(event, array) {
  const selectedProduct = array.find(
    item => item.dataset.id === event.currentTarget.dataset.id
  );
  return selectedProduct;
}

function openLightbox(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'LI' && event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (event.target.nodeName === 'LI') {
    onFilmCardClick(event);
  }
}

function onFilmCardClick(event) {
  const selectedProduct = getSelectedItem(event, allProducts);
  console.log(selectedProduct);

  //  CREATE MODAL

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
 <img class="image-display lightbox-modal__image"
  srcset="#"
  src="#"
  data-source="#"
  loading="lazy"
  alt="#"/>
</div>

<div class="lightbox-modal__data">
<p class="lightbox-modal__title" data-title>A FISTFUL OF LEAD</p>

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
<li class="lightbox-modal__meta-value-list-item"><span class="lightbox-modal__meta-value-vote" data-vote>7.3</span><span class="lightbox-modal__meta-value-votes-divider">/</span><span class="lightbox-modal__meta-value-votes" data-votes>1260</span></li>
<li class="lightbox-modal__meta-value-list-item"><span data-popularity>100.2</span></li>
<li class="lightbox-modal__meta-value-list-item"><span class="lightbox-modal__meta-value-title" data-original-title>A FISTFUL OF LEAD</span></li>
<li class="lightbox-modal__meta-value-list-item"><span data-genre>Western</span></li>
</ul>
</div>
</div>

<p class="lightbox-modal__description">
<span class="lightbox-modal__description-title">About</span>
Four of the West’s most infamous outlaws assemble to steal a huge stash of gold from the most corrupt settlement of the gold rush towns. But not all goes to plan one is killed and the other three escapes with bags of gold hide out in the abandoned gold mine where they happen across another gang of three – who themselves were planning to hit the very same bank! As tensions rise, things go from bad to worse as they realise the bags of gold are filled with lead... they’ve been double crossed – but by who and how?
</p>

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
