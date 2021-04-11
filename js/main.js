const url = 'https://rickandmortyapi.com/api/character/';
const pageContent = document.querySelector('.page__content');
const navList = document.querySelector('.menu__list');

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function createNavItem(name) {
  return `
    <li class="menu__item">
      <button class="menu__btn" data-name="${name}">
        ${name}
      </button>
    </li>
  `;
}

function createPageContent(item) {
  return `
    <div class="character" data-name="${item.name}">
      <img class="character__avatar" src="${item.image}" alt="${item.name}" width="300" height="300"/>
      <dl class="character__desc-list">
        <div class="character__desc-item">
          <dt class="character__desc-key">Name:</dt>
          <dd class="character__desc-value">${item.name}</dd>
        </div>
        <div class="character__desc-item">
          <dt>Species:</dt>
          <dd class="character__desc-value">${item.species}</dd>
        </div>
        <div class="character__desc-item">
          <dt class="character__desc-key">Gender:</dt>
          <dd class="character__desc-value">${item.gender}</dd>
        </div>
        <div class="character__desc-item">
          <dt class="character__desc-key">Origin:</dt>
          <dd class="character__desc-value">${item.origin.name}</dd>
        </div>
        <div class="character__desc-item">
          <dt class="character__desc-key">Status:</dt>
          <dd class="character__desc-value">${item.status}</dd>
        </div>
        <div class="character__desc-item">
          <dt class="character__desc-key">Location:</dt>
          <dd class="character__desc-value">${item.location.name}</dd>
        </div>
      </dl>
    </div>
  `;
}

function generateHtml(data) {
  let menuContent = '';
  let mainContent = '';

  data.forEach((el) => {
    menuContent += createNavItem(el.name);
    mainContent += createPageContent(el);
  });
  return {
    menuContent,
    mainContent,
  };
}

function render(html) {
  navList.insertAdjacentHTML('afterbegin', html.menuContent);
  pageContent.insertAdjacentHTML('afterbegin', html.mainContent);
}

function highlightCurrentNavItem(activeItem) {
  const navItems = navList.querySelectorAll('.menu__btn');

  navItems.forEach((el) => {
    el.classList.remove('menu__btn--current');
  });
  activeItem.classList.add('menu__btn--current');
}

function showCurrentContent(activeItem) {
  const contentItems = pageContent.querySelectorAll('.character');
  const currentPageContent = pageContent.querySelector(
    `.character[data-name='${activeItem.dataset.name}']`
  );

  contentItems.forEach((el) => {
    el.classList.remove('character--current');
  });
  currentPageContent.classList.add('character--current');
}

function initApp(url) {
  fetchData(url)
    .then((data) => {
      const html = generateHtml(data);
      render(html);
    })
    .catch((error) => console.error(error.message));

  navList.addEventListener('click', function (e) {
    const currentNavItem = e.target;

    highlightCurrentNavItem(currentNavItem);
    showCurrentContent(currentNavItem);

    if (currentNavItem) pageContent.classList.add('page__content--not-empty');
  });
}

document.addEventListener(
  'DOMContentLoaded',
  (init = () => {
    initApp(url);
    document.removeEventListener('DOMContentLoaded', init);
  })
);
