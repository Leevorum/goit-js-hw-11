import './css/styles.css';
import getImg from './js/fetchImages.js';
import imgDataMarkup from './js/imgDataMarkup';
import Notiflix from 'notiflix';
import loadMoreInfinity from './js/loadMoreInfinity.js';
import lightboxGallery from './js/lightboxGallery.js';
import smoothScroll from './js/smoothScroll.js';
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
function loadMoreResponce() {
  if (querryPage > totalPages) {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    return;
  }
  //С каждым нажатием увеличиваем счетчик страниц
  querryPage += 1;
  //Отправляем запросс
  createResponse();
}

//Функция для создания запроса и рендера разметки
async function createResponse() {
  try {
    const response = await getImg(formData, querryPage);
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
    lightboxGallery(querryPage);
    //Делаем мягкую прокрутку на две карточки вниз
    if (querryPage > 1) {
      smoothScroll();
    }
    //Убираем лоад-мор по сабмиту
    // loadMoreBtn.classList.remove('is-hidden');
    loadMoreInfinity(loadMoreResponce);
  } catch (error) {
    console.log(error.message);
  }
}
//Чистка хтмл
function clearHtml() {
  galleryEl.innerHTML = '';
}
//Ошибки
function onError() {
  Notiflix.Notify.failure('Sorry, something went wrong . Please try again.');
}
