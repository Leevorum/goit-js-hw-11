import Notiflix from 'notiflix';
//Функция бесконечного скролла
export default function loadMoreInfinity(createResponse, params) {
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
        //Если количество страниц достигает предела, выбрасываем сообщение
        //Если на странице контента только на один запрос, выбрасываем это же сообщение после прокрутки страници вниз
        if (
          params.querryPage > Math.ceil(params.totalHits / params.limit) ||
          Number(params.totalHits) <= 40
        ) {
          Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
          return;
        }
        //Функция запроса и отрисовки
        createResponse(params);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const lastImg = document.querySelector('.photo-card:last-child');
  if (lastImg) {
    observer.observe(lastImg);
  }
}
