import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
//лайтбокс
export let instance = new SimpleLightbox('.gallery .gallery__link', {
  // Задержка появления подписи
  showCounter: false,
  captionDelay: 250,
  captionSelector: 'img',
  //   Берем подпись из альта картинки
  captionsData: 'alt',
  //   Ставим подпись вниз картинки
});
