//лайтбокс
export default function lightboxGallery(querryPage) {
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
