import createResponse from './createResponse';
import clearHtml from './clearHtml';
import functionParams from './functionParams';
import Notiflix from 'notiflix';
//Функция для отправки запроса на кнопке поиска
export default function searchBtnResponse(evt) {
  evt.preventDefault();
  functionParams.querryPage = 1;
  //Если строка пустая не отправляем запрос
  if (functionParams.formData.trim() === '') {
    Notiflix.Notify.info('Please fill in input field!');
    return;
  }
  //Вызываем функцию для создания запроса
  createResponse(functionParams);
  //Чистим хтмл
  clearHtml();
}
