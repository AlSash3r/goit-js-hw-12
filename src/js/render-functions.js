export function renderImages(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
                <a href="${largeImageURL}" class="list-item">
                    <div class="describe">
                        <img src="${webformatURL}" alt="${tags}" class="list-image">
                    </div>
                    <ul class="categories">
                        <li class="categories-item">
                            <h2 class="link-text">Likes</h2>
                            <p class="number">${likes}</p>
                        </li>
                        <li class="categories-item">
                            <h2 class="link-text">Views</h2>
                            <p class="number">${views}</p>
                        </li>
                        <li class="categories-item">
                            <h2 class="link-text">Comments</h2>
                            <p class="number">${comments}</p>
                        </li>
                        <li class="categories-item">
                            <h2 class="link-text">Downloads</h2>
                            <p class="number">${downloads}</p>
                        </li>
                    </ul>
                </a>
            </li>
        `
    )
    .join('');
}
export default renderImages;
