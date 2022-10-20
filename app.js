const selectSearchTipo = document.querySelector("#select-search-tipo");
const loaderContainer = document.querySelector(".loader-container");
const resultsNumber = document.querySelector(".results-number");
const results = document.querySelector("#results");
const resultsSection = document.querySelector(".results-section");
const characterSection = document.querySelector(".character-section");
const searchButton = document.querySelector(".search-button");
const comicImg = document.querySelector(".comic-img");
const comicTitle = document.querySelector(".comic-title");
const comicPublished = document.querySelector(".comic-published");
const comicWriters = document.querySelector(".comic-writers");
const comicDescription = document.querySelector(".comic-description");
const comicSection= document.querySelector(".comic-section");
const comicDetails= document.querySelector(".comic-details");


// **************** API KEY ******************

// luci
const apiPublic = "9793363e7276e556c84635fef3aecb00";
// const apiPrivate = '70b432de62d5b48263eaf29757a150e30befce52';

// vero
// const apiPublic = 'd90ce40c311fdc6a575a0346b72d9613';
// const apiPrivate = 'd4c1e8a42b7f85e84a903e89a2673e46778befc3';

// const url = `http://gateway.marvel.com/v1/public/comics?apikey=${apiPublic}`;

// fetch(url) // es una promesa pendiente
//   .then(resp => resp.json()) // Resuelve exitosa => Respuesta status 200
//   .then(json => console.log(json));

// // *********** Botón modo claro/modo oscuro ****************

const toggle = document.getElementById("toggle");
const main = document.getElementById("main");
const iconSearch = document.getElementById("icon-search");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    main.classList.add("modo-oscuro");
    main.classList.remove("modo-claro");
    iconSearch.style.color = "#fff";
  } else {
    main.classList.add("modo-claro");
    main.classList.remove("modo-oscuro");
    iconSearch.style.color = "#000";
  }
});



// **************** API KEY ******************

// const url = `http://gateway.marvel.com/v1/public/comics?apikey=${apiPublic}`;

const baseUrl = "https://gateway.marvel.com/v1/public/";
let offset = 0;
let resultCount = 0;

const getSearchParams = (isSearch) => {
  let url = baseUrl;
  let searchParams = `?apikey=${apiPublic}&offset=${offset}`;

  if (!searchParams) {
    return searchParams;
  }

  return searchParams;
};

const getApiURL = (resourse, resourseId, subResourse) => {
  const isSearch = !resourse && !subResourse;
  let url = `${baseUrl}${resourse}`;

  if (resourseId) {
    url += `/${resourseId}`;
  }

  if (subResourse) {
    url += `/${subResourse}`;
  }

  url += getSearchParams(isSearch);
  return url;
};

const updateResultsCount = (count) => {
  resultsNumber.innerHTML = count;
  resultCount = count;
};

const fectchUrl = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

// **************** Card de comics **************

const fectchComics = async () => {
  const {
    data: {results, total}
  } = await fectchUrl(getApiURL("comics"));
  clearResults();
  printComics(results);
  updateResultsCount(total);
};

const printComics = (comics) => {
  if (comics.length === 0) {
    results.innerHTML =
      '<h2 class= "no-results">No se encontraron resultados</h2>';
  }

  for (const comic of comics) {
    const comicCard = document.createElement("div");
    comicCard.tabIndex = 0;
    comicCard.classList.add("comic");
    comicCard.onclick = () => {
      fetchComic(comic.id);
    };

    comicCard.innerHTML = `<div class="comic-img-container">
                            <img src="${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}" alt="${comic.title}" class="comic-thumbnail" />
                          </div>
                          <p class="comic-title">${comic.title}</p>`;
    results.append(comicCard);
  }
};

const fetchComic = async (comicId) => {
  showLoader()
  const {
    data: {
      results: [comic]
    }
  } = await fectchUrl(getApiURL("comics", comicId));

    const coverPath = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
    const releaseDate = new Intl.DateTimeFormat('es-AR').format(
      new Date(comic.dates.find(date => date.type === 'onsaleDate').date)
    )
    const writers = comic.creators.items
    .filter(creator => creator.role === 'writer')
    .map(creator => creator.name)
    .join(', ')
    updateComicDetails(
      coverPath,
      comic.title,
      releaseDate,
      writers,
      comic.description
    )
    showComicDetail()
};

const hiddenComics = () => {
  resultsSection.classList.add('hidden')
}

const showDetailComic = () => {
  comicSection.classList.remove('hidden')
  comicDetails.classList.remove('hidden')
}

const updateComicDetails =  (img, title, releaseDate, writers, description) => {
  comicImg.src = img;
  comicTitle.innerHTML = title;
  comicPublished.innerHTML = releaseDate;
  comicWriters.innerHTML = writers;
  comicDescription.innerHTML = description
  hideLoader()
}


// ****************** CARD DE PERSONAJE ***********************

const fectchCharacters = async () => {
  const {
    data: {results, total}
  } = await fectchUrl(getApiURL("characters"));
    clearResults();
    printCharacters(results);
    updateResultsCount(total);
};

const printCharacters = (characters) => {
  if (characters.length === 0) {
    results.innerHTML =
      '<h2 class= "no-results">No se encontraron resultados</h2>';
  }

  for (const character of characters) {
    const charactersCard = document.createElement("div");
    charactersCard.tabIndex = 0;
    charactersCard.onclick = () => {
      fetchCharacter(character.id);
    };

    charactersCard.innerHTML = `
    <div class="character-img-container">
      <div class="col s12 m12 container-card-character">
        <div class="card card-character">
          <div class="card-image container-img-character">
            <img class="img-character" src="${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}" alt=${character.name} class="character-thumbnail">
            <div class="card-content">
                <div class="contein-info">
                  <h3 class="title-character">${character.name}</h3>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    results.append(charactersCard);
  }
};

const fetchCharacter = async (characterId) => {
  showLoader()
  const {
    data: {
      results: [character],
    },
  } = await fectchUrl(getApiURL("characters", characterId));
  clearResults();
  printCharacters(results);
};

const showComicDetail = () => {
  showDetailComic()
  hiddenComics()
}

const clearResults = () => (results.innerHTML = "");

const showLoader = () => loaderContainer.classList.remove('hidden');
const hideLoader = () => loaderContainer.classList.add('hidden');

const search = () => {
  showLoader()
  if (selectSearchTipo.value === "comics") {
    fectchComics();
  }
  if (selectSearchTipo.value === "characters") {
    fectchCharacters();
  }
};

const inicio = () => {
  searchButton.addEventListener("click", () => {
    search();
  });
  search();
};

$(document).ready(function () {
  $("select").formSelect();
});

window.onload = inicio;
