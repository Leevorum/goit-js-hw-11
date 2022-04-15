//Функция для создания запроса и рендера разметки
export default async function createResponse({
  getImg,
  formData,
  querryPage,
  lightboxGallery,
  smoothScroll,
  loadMoreInfinity,
  loadMoreResponce,
  imgDataMarkup,
  galleryEl,
  Notiflix,
  totalPages,
}) {
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
    loadMoreInfinity(loadMoreResponce);
  } catch (error) {
    console.log(error.message);
  }
}
