const selectSearchTipo = document.querySelector("#select-search-tipo");
// const loaderContainer = document.querySelector("#loader-container");
const resultsNumber = document.querySelector(".results-number");
// const results = document.querySelector("#results");
const resultsSection = document.querySelector(".results-section");
// const characterSection = document.querySelector(".character-section");
const searchButton = document.querySelector(".search-button");
// const comicImg = document.querySelector(".comic-img");
// const comicTitle = document.querySelector(".comic-title");
// const comicPublished = document.querySelector(".comic-published");
// const comicWriters = document.querySelector(".comic-writers");
// const comicDescription = document.querySelector(".comic-description");
// const comicSection= document.querySelector(".comic-section");
// const comicDetails= document.querySelector(".comic-details");


// // **************** API KEY ******************

// // luci
// const apiPublic = "9793363e7276e556c84635fef3aecb00";
// // const apiPrivate = '70b432de62d5b48263eaf29757a150e30befce52';

// // vero
// // const apiPublic = 'd90ce40c311fdc6a575a0346b72d9613';
// // const apiPrivate = 'd4c1e8a42b7f85e84a903e89a2673e46778befc3';

// // const url = `http://gateway.marvel.com/v1/public/comics?apikey=${apiPublic}`;

// // fetch(url) // es una promesa pendiente
// //   .then(resp => resp.json()) // Resuelve exitosa => Respuesta status 200
// //   .then(json => console.log(json));

// // // *********** Botón modo claro/modo oscuro ****************

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



// // **************** API KEY ******************

// // const url = `http://gateway.marvel.com/v1/public/comics?apikey=${apiPublic}`;

// const baseUrl = "https://gateway.marvel.com/v1/public/";
// let offset = 0;


// const getSearchParams = (isSearch) => {
//   let url = baseUrl;
//   let searchParams = `?apikey=${apiPublic}&offset=${offset}`;

//   if (!searchParams) {
//     return searchParams;
//   }

//   return searchParams;
// };

// const getApiURL = (resourse, resourseId, subResourse) => {
//   const isSearch = !resourse && !subResourse;
//   let url = `${baseUrl}${resourse}`;

//   if (resourseId) {
//     url += `/${resourseId}`;
//   }

//   if (subResourse) {
//     url += `/${subResourse}`;
//   }

//   url += getSearchParams(isSearch);
//   return url;
// };


// const fectchUrl = async (url) => {
//   const response = await fetch(url);
//   const json = await response.json();
//   return json;
// };

// // **************** Card de comics **************

// const fectchComics = async () => {
//   const {
//     data: {results, total}
//   } = await fectchUrl(getApiURL("comics"));
//   clearResults();
//   printComics(results);
//   updateResultsCount(total);
//   hideLoader()
// };

// const printComics = (comics) => {
//   if (comics.length === 0) {
//     results.innerHTML =
//       '<h2 class= "no-results">No se encontraron resultados</h2>';
//   }

//   for (const comic of comics) {
//     const comicCard = document.createElement("div");
//     comicCard.tabIndex = 0;
//     comicCard.classList.add("comic");
//     comicCard.onclick = () => {
//       fetchComic(comic.id);
//     };

//     comicCard.innerHTML = `<div class="comic-img-container">
//                             <img src="${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}" alt="${comic.title}" class="comic-thumbnail" />
//                           </div>
//                           <p class="comic-title">${comic.title}</p>`;
//     results.append(comicCard);
//   }
// };

// const fetchComic = async (comicId) => {
//   const {
//     data: {
//       results: [comic]
//     }
//   } = await fectchUrl(getApiURL("comics", comicId));

//     const coverPath = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
//     const releaseDate = new Intl.DateTimeFormat('es-AR').format(
//       new Date(comic.dates.find(date => date.type === 'onsaleDate').date)
//     )
//     const writers = comic.creators.items
//     .filter(creator => creator.role === 'writer')
//     .map(creator => creator.name)
//     .join(', ')
//     updateComicDetails(
//       coverPath,
//       comic.title,
//       releaseDate,
//       writers,
//       comic.description
//     )
//     showComicDetail()
//     charactersComic(comicId)
//     charactersCardComic(comicId)
// };

const hiddenComics = () => {
  resultsSection.classList.add('hidden')
}
const showComics = () => {
    resultsSection.classList.remove('hidden')
  }

// const showDetailComic = () => {
//   comicSection.classList.remove('hidden')
//   comicDetails.classList.remove('hidden')
// }

// const updateComicDetails =  (img, title, releaseDate, writers, description) => {
//   comicImg.src = img;
//   comicTitle.innerHTML = title;
//   comicPublished.innerHTML = releaseDate;
//   comicWriters.innerHTML = writers;
//   comicDescription.innerHTML = description
//   hideLoader()
// }

// const resultadoPersonajesComic = document.getElementById('resultados-personajes');
// const cardsComicPersonajes = document.getElementById('cards-comic-personajes')

// const charactersComic = async (comicId) => {
//   const {
//     data: {results, total}
//   } = await fectchUrl(getApiURL("comics", comicId, 'characters'));

//   if(results.length === 0){
//     resultadoPersonajesComic.innerHTML = `
//     <div class="resultados-card">
//       <h3>Personajes</h3>
//       <p>0 RESULTADOS</p>
//       <h4>No hemos encontrado resultados</h4>
//     </div>`
//   }
//   for (const result of results) { 
//     comicSection.tabIndex = 0;
//     resultadoPersonajesComic.innerHTML = `
//     <div class="resultados-card">
//     <h3>Personajes</h3>
//     <p>${results.length} RESULTADOS</p>
//     </div>
//     `
//   }
// };

// const charactersCardComic = async (comicId) => {
//   const {
//     data: {results}
//   } = await fectchUrl(getApiURL("comics", comicId, 'characters'));

//   for (const result of results) { 
//     resultadoPersonajesComic.innerHTML += `
//     <div class="character-img-container">
//       <div class="col s12 m12 container-card-character">
//         <div class="card card-character">
//           <div class="card-image container-img-character">
//             <img src="${result.thumbnail.path}/portrait_fantastic.${result.thumbnail.extension}" alt=${result.name} class="character-thumbnail">
//             <div class="card-content-info">
//                 <div class="contein-info">
//                   <h3 class="title-character">${result.name}</h3>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>`
//   }
// };



// // ****************** CARD DE PERSONAJE ***********************

// const fectchCharacters = async () => {
//   const {
//     data: {results, total}
//   } = await fectchUrl(getApiURL("characters"));
//     clearResults();
//     printCharacters(results);
//     updateResultsCount(total);
//     hideLoader()
// };

// const printCharacters = (characters) => {
//   if (characters.length === 0) {
//     results.innerHTML =
//       '<h2 class= "no-results">No se encontraron resultados</h2>';
//   }

//   for (const character of characters) {
//     const charactersCard = document.createElement("div");
//     charactersCard.tabIndex = 0;
//     charactersCard.onclick = () => {
//       fetchCharacter(character.id);
//     };

    // charactersCard.innerHTML = `
    // <div class="character-img-container">
    //   <div class="col s12 m12 container-card-character">
    //     <div class="card card-character">
    //       <div class="card-image container-img-character">
    //         <img src="${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}" alt=${character.name} class="character-thumbnail">
    //         <div class="card-content-info">
    //             <div class="contein-info">
    //               <h3 class="title-character">${character.name}</h3>
    //             </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>`;
    // results.append(charactersCard);
//   }
// };

// const fetchCharacter = async (characterId) => {
//   showLoader()
//   const {
//     data: {
//       results: [character],
//     },
//   } = await fectchUrl(getApiURL("characters", characterId));
//   clearResults();
//   printCharacters(results);

// };

// const showComicDetail = () => {
//   showDetailComic()
//   hiddenComics()
// }

const clearResults = () => (results.innerHTML = "");

// const showLoader  = () => loaderContainer.style.display="block";

// const hideLoader = () => loaderContainer.style.display="none";


const search = () => {
  // showLoader()
  if (selectSearchTipo.value === "comics") {
    loadComics()
  }
  if (selectSearchTipo.value === "characters") {
    loadCharacters();
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
