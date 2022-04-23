//Переменные
const functionParams = {
  //Форма
  formEl: document.querySelector('.search-form'),
  //Галерея, куда делаем рендер картинок
  galleryEl: document.querySelector('.gallery'),
  //Изначальное значение инпута поиска
  formData: '',
  //начальная страница для запроса
  querryPage: 1,
  //Лимит картинок в запросе на страницу
  limit: 40,
};
export default functionParams;
