import { instance } from './lightboxGallery.js';
//Функция для создания запроса и рендера разметки
export default async function createResponse({
  getImg,
  formData,
  querryPage,
  smoothScroll,
  loadMoreInfinity,
  imgDataMarkup,
  galleryEl,
  Notiflix,
  totalPages,
}) {
  try {
    console.log(querryPage);
    //По сабмиту выводит количество найденных картинок
    const response = await getImg(formData, querryPage);
    //Если запрос пустой выбрасываем ошибку
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }
    if (querryPage === 1) {
      Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }
    //Рендер разметки
    galleryEl.insertAdjacentHTML('beforeend', imgDataMarkup(response));

    //галерея лайтбокс
    instance.refresh();

    //Делаем мягкую прокрутку на две карточки вниз
    if (querryPage > 1) {
      smoothScroll();
    }
    //Увеличиваем счетчик страниц
    querryPage += 1;
    //Вызываем функцию врапер с бесконечным скролом
    //Передаем нашей функции обьект тех же параметров, с обновленными счетчиками
    loadMoreInfinity(createResponse, {
      totalHits: response.data.totalHits,
      getImg,
      formData,
      querryPage,
      smoothScroll,
      loadMoreInfinity,
      imgDataMarkup,
      galleryEl,
      Notiflix,
      totalPages,
    });
  } catch (error) {
    console.log(error.message);
  }
}
