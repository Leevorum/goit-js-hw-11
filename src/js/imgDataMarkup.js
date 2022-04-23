//Функция рендера галереи
export default function imgDataMarkup(data) {
  return data.data.hits
    .map(
      obj =>
        `
      <div class="photo-card">
        <a class="gallery__link" href="${obj.largeImageURL}">
          <img class="gallery__image" src="${obj.webformatURL}" alt="${obj.tags}" loading="lazy" />
       
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${obj.likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${obj.views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${obj.comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${obj.downloads}</span>
            </p>
          
          </div>
        </a>
      </div>
      `,
    )
    .join('');
}
