const selectSearchTipo = document.querySelector('#select-search-tipo');
const divCardCharacter = document.querySelector('#div-card-character');
const resultsNumber = document.querySelector('.results-number');   



// **************** API KEY ******************

// luci
// const apiPublic = '9793363e7276e556c84635fef3aecb00';
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
const iconSearch= document.getElementById("icon-search");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    main.classList.add("modo-oscuro");
    main.classList.remove("modo-claro");
    iconSearch.style.color= '#fff'
  } else {
    main.classList.add("modo-claro");
    main.classList.remove("modo-oscuro");
    iconSearch.style.color= '#000'
  }
});

// const divCardCharacter = document.getElementById('div-card-character');

// let data = [];

// const printData  = () => {
//     let card = '';
//         card +=  `<div class="col s12 m12 container-card-character">
//         <div class="card card-character">
//             <div class="card-image container-img-character">
//                 <img class="img-character" src="imagenes/strange2.png">
//                 <a class="mas-info" href="#"><i class="material-icons">add</i></a>
//                 <div class="card-content card-content-info">
//                     <div class="contein-info">
//                         <span class="title-character">Card Title</span>
//                         <p class="text-character">I am a very simple card.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>`
//   divCardCharacter.innerHTML= card;
// }

// selectSearchTipo.addEventListener('change' , () => {

//   const porTipo = selectSearchTipo.value;

//   if(porTipo === 'personajes'){
//     printData()
//   }

//   console.log(porTipo);

// })

// const element = (el) => document.querySelector(el);

// **************** API KEY ******************

// const url = `http://gateway.marvel.com/v1/public/comics?apikey=${apiPublic}`;

const baseUrl = 'http://gateway.marvel.com/v1/public/';
let offset = 0;
let resultCount = 0;

const getSearchParams = (isSearch) => {
  let searchParams = `?apikey=${apiPublic}&offset=${offset}`

  if(!searchParams){
   return searchParams;
  }

  return searchParams
}

const getApiURL = (resourse, resourseId, subResourse) => {
  const isSearch = !resourse && !subResourse;
  let url = `${baseUrl}${resourse}`;

  if(resourseId){
    url += `/${resourseId}`
  }

  if(subResourse){
    url += `/${subResourse}`
  }

  url += getSearchParams(isSearch)
  return url;
}

const updateResultsCount = count => {
  resultsNumber.innerHTML = count;
  resultCount = count;
}

const fectchUrl = async url => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

const fectchComics = async () => {
  const {data: {results, total}
    } = await fectchUrl(getApiURL('comics'));
  printComics(results);
  updateResultsCount(total)
}

const printComics = comics => {
  if(comics.length === 0){
    results.innerHTML = '<h2 class= "no-results">No se encontraron resultados</h2>'
  }

  for (const comic of comics) {
    const comicCard = document.createElement('div');
    comicCard.tabIndex = 0;
    comicCard.classList.add('comic');
    comicCard.onclick = () => {
    }
    fetchComic(comic.id)
    comicCard.innerHTML = `<div class="comic-img-container">
                            <img src="${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}" alt="${comic.title}" class="comic-thumbnail" />
                          </div>
                          <p class="comic-title">${comic.title}</p>`
    results.append(comicCard)
  }
}

const fetchComic = async comicId => {
  const {
    data : 
    {
      results: [comic]
    }
  } = await fectchUrl(getApiURL('comics', comicId))

//   const coverPath = `${comic.thunbnail.path}.${comic.thumbnail.extension}`
//   const releaseDate = new Intl.DateTimeFormat('es-MX').format(
//     new Date(comic.date.find(date => date.type === 'onsaleDate').date)
//   )
//   const writers = comic.creators.items
//   .filter(creator => creator.role === 'writer')
//   .map(creator => creator.rame)
//   .join(', ')
//   updateComicDetails(
//     coverPath,
//     comic.title,
//     releaseDate,
//     writers,
//     comic.description
//   )
//   showComicDetail()
 }

// const updateComicDetails =  (img, title, releaseDate, writers, description) => {
//   comicCover.src = img;
//   comicTitle.innerHTML = title;
//   comicPublished.innerHTML = releaseDate;
//   comicWriters.innerHTML = writers;
//   comicDescription.innerHTML = description
// }

// const showComicDetail = () => {
//   if(selectSearchTipo.value === 'comics'){

//   }
// }


const search = () => {
  if(selectSearchTipo.value === 'comics'){
    fectchComics()
  }
}

const inicio = () => {
  search()
}



$(document).ready(function(){
  $('select').formSelect();
})

window.onload = inicio;