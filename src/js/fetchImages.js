const axios = require('axios').default;
//Функция запрос к серверу
export default async function getImg(querry, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=26707302-c4002c16b6eea875c4b1f9ef4&q=${querry}
    &image_type=photo&pretty=true&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
  );

  return response;
}
