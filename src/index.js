import './css/styles.css';

import Notiflix from 'notiflix';
import createResponse from './js/createResponse.js';
import searchBtnResponse from './js/searchBtnResponse.js';
import functionParams from './js/functionParams';
//Параметры функций

//Слушатель на форму инпута, записываем дату для поиска
functionParams.formEl.addEventListener('input', evt => {
  functionParams.formData = evt.target.value;
});
//Слушатель на форм по сабмиту
functionParams.formEl.addEventListener('submit', searchBtnResponse);
