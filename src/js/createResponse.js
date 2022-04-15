//Функция для создания запроса и рендера разметки
export default async function createResponse({
  getImg,
  formData,
  querryPage,
  lightboxGallery,
  smoothScroll,
  loadMoreInfinity,
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
    if (querryPage === 1) {
      Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }
    //По сабмиту выводит количество найденных картинок

    //Рендер разметки
    galleryEl.insertAdjacentHTML('beforeend', imgDataMarkup(response));

    //галерея лайтбокс
    lightboxGallery(querryPage);
    //Делаем мягкую прокрутку на две карточки вниз
    if (querryPage > 1) {
      smoothScroll();
    }
    querryPage += 1;
    if (querryPage > totalPages + 1) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      return;
    }

    loadMoreInfinity(createResponse, {
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
    });
  } catch (error) {
    console.log(error.message);
  }
}
