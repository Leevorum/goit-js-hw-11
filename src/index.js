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
    lightboxGallery();
    //Делаем мягкую прокрутку на две карточки вниз
    if (querryPage > 1) {
      smoothScroll();
    }
    //Убираем лоад-мор по сабмиту
    // loadMoreBtn.classList.remove('is-hidden');
    loadMoreInfinity();
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
  if (querryPage > 1) {
    instance.refresh();
  }
}
//Функция мягкой прокрутки при загрузке новых картинок
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
//Функция бесконечного скролла
function loadMoreInfinity() {
  //обьект опций
  const options = {
    rootMargin: '0px',
    threshold: [0, 0.25, 0.5, 0.75, 1.0],
  };
  //коллбек с вызовом следующего запроса
  const callback = function(entries, observer) {
    //Если нужный элемент просмотрен(Intersecting:true)
    //Сбрасываем "просмотренно", и вызываем функцию запроса
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        loadMoreBtnResponce();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const lastImg = document.querySelector('.photo-card:last-child');
  if (lastImg) {
    observer.observe(lastImg);
  }
}
