import './css/styles.css';
import getImg from './js/fetchImages.js';
import imgDataMarkup from './js/imgDataMarkup';
import Notiflix from 'notiflix';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const formInput = formEl.elements.searchQuery;
const formSearchBtn = formEl.elements[1];
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let querryPage = 1;
let limit = 40;
const totalPages = 500 / limit;
let formData = '';
//Слушатель на форму инпута, записываем дату для поиска
formInput.addEventListener('input', evt => {
  formData = evt.target.value;
});
//Слушатель на форм по сабмиту
formEl.addEventListener('submit', searchBtnResponse);
//Слушатель на кнопку загрузить еще
loadMoreBtn.addEventListener('click', loadMoreBtnResponce);

//Функция для отправки запроса на кнопке поиска
function searchBtnResponse(evt) {
  evt.preventDefault();
  querryPage = 1;

  //Если строка пустая не отправляем запрос
  if (formData === '') {
    Notiflix.Notify.info('Please fill in input field!');
    return;
  }
  //Вызываем функцию для создания запроса
  createResponse();
  //Чистим хтмл
  clearHtml();
}
//Функция для дозагрузки картинок
function loadMoreBtnResponce() {
  if (querryPage > totalPages) {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  //С каждым нажатием увеличиваем счетчик страниц
  querryPage += 1;
  //Отправляем запросс
  createResponse();
  lightboxGallery.instance.refresh();
}

//Функция для создания запроса и рендера разметки
function createResponse() {
  getImg(formData, querryPage)
    //Если все ок создаем разметку с помощью функции
    .then(response => {
      //Если массив пустой, ретурн
      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
        return;
      }
      //По сабмиту выводит количество найденных картинок
      if (querryPage === 1) {
        Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      }
      //Рендер разметки
      galleryEl.insertAdjacentHTML('beforeend', imgDataMarkup(response));
      //галерея лайтбокс
      lightboxGallery();

      //Делаем мягкую прокрутку на две карточки вниз
      if (querryPage > 1) {
        smoothScroll();
      }
      //Убираем лоад-мор по сабмиту
      loadMoreBtn.classList.remove('is-hidden');
    })
    // // Если все плохо ловим ошибку
    .catch(onError);
}
//Чистка хтмл
function clearHtml() {
  galleryEl.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
}
//Ошибки
function onError() {
  Notiflix.Notify.failure('Sorry, something went wrong . Please try again.');
}
//лайтбокс
function lightboxGallery() {
  const instance = new SimpleLightbox('.gallery .gallery__link', {
    // Задержка появления подписи
    showCounter: false,
    captionDelay: 250,
    captionSelector: 'img',
    //   Берем подпись из альта картинки
    captionsData: 'alt',
    //   Ставим подпись вниз картинки
    captionPosition: 'bottom',
  });
}
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
