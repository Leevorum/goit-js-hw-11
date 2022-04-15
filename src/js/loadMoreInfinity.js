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
