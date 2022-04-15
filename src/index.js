import './css/styles.css';
import getImg from './js/fetchImages.js';
import imgDataMarkup from './js/imgDataMarkup';
import Notiflix from 'notiflix';
import loadMoreInfinity from './js/loadMoreInfinity.js';
import lightboxGallery from './js/lightboxGallery.js';
import smoothScroll from './js/smoothScroll.js';
import createResponse from './js/createResponse.js';

let limit = 40;
const totalPages = 500 / limit;
//Параметры функций
const functionParams = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  Notiflix,
  formData: '',
  querryPage: 1,
  totalPages,
  loadMoreResponce,
  getImg,
  lightboxGallery,
  smoothScroll,
  loadMoreInfinity,
  imgDataMarkup,
};
//Слушатель на форму инпута, записываем дату для поиска
functionParams.formEl.addEventListener('input', evt => {
  functionParams.formData = evt.target.value;
});
//Слушатель на форм по сабмиту
functionParams.formEl.addEventListener('submit', searchBtnResponse);

//Функция для отправки запроса на кнопке поиска
function searchBtnResponse(evt) {
  evt.preventDefault();
  functionParams.querryPage = 1;

  //Если строка пустая не отправляем запрос
  if (functionParams.formData === '') {
    Notiflix.Notify.info('Please fill in input field!');
    return;
  }
  //Вызываем функцию для создания запроса
  createResponse(functionParams);
  //Чистим хтмл
  clearHtml();
}
// Функция для дозагрузки картинок
function loadMoreResponce() {
  //Отправляем запросс
  if (functionParams.querryPage > totalPages) {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    return;
  }
  functionParams.querryPage += 1;
  createResponse(functionParams);
}

//Чистка хтмл
function clearHtml() {
  functionParams.galleryEl.innerHTML = '';
}
