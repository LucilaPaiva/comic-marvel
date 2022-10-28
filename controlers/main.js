const resultsComics = document.getElementById("results-comics");
const resultsCharacters = document.getElementById("results-characters");
resultsCharacters.style.display= 'none';

let resultCount = 0;

const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return params;
};

// const getParam = () => {
//   const param = new URLSearchParams(window.location.search);
//   return param;
// };

const loadComics = async () => {
  const params = getParams();
  const comicsResponse = await getComics(params.get('offset') || 0, params.get("order") || "title");
  const data = comicsResponse.data;
  const comics = data.results;
  const total = data.total;

  comics.forEach((comic) => {
    const comicCard = document.createElement("div");
    comicCard.classList.add("comic");
    comicCard.innerHTML = `<div class="comic-img-container">
                                    <img src="${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}" alt="${comic.title}" class="comic-thumbnail" />
                                </div>
                                <p class="comic-title">${comic.title}</p>`;
    resultsComics.append(comicCard);
    updateResultsCount(total);
  });
};

// const loadInfoComics = async () =>{
//   const comicsResponse = await getComics();
//   const data = comicsResponse.data;
//   const comics = data.results;
//   const detail = comics;

// }

// loadInfoComics()

loadComics();

const updateResultsCount = (count) => {
  resultsNumber.innerHTML = count;
  resultCount = count;
};

const loadCharacters = async () =>{
    const params = getParams();
    const charactersResponse = await getCharacters(params.get('offset') || 0, params.get("tipo") || "name");
    const data = charactersResponse.data
    const characters = data.results

    characters.forEach(character => {
        const charactersCard = document.createElement("div");
        charactersCard.classList.add('card-character')
        charactersCard.innerHTML = `
        <div class="character-img-container">
          <div class="col s12 m12 container-card-character">
            <div class="card card-character">
              <div class="card-image container-img-character">
                <img src="${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}" alt=${character.name} class="character-thumbnail">
                <div class="card-content-info">
                    <div class="contein-info">
                      <h3 class="title-character">${character.name}</h3>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        resultsCharacters.append(charactersCard);
    });
}

loadCharacters();

const formSearch = document.getElementById("form-search");

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();

  const orderBy = e.target["order-by"].value;
  const params = new URLSearchParams(window.location.search);
  params.set("order", orderBy);
  params.set('offset', 20);
  window.location = window.location.pathname + "?" + params.toString();

  const tipoBy = e.target['tipo-by'].value;
  // if (tipoBy === 'characters') {
  //   resultsCharacters.style.display= 'flex';
  //   resultsComics.style.display= 'none'
  // }
});


// const crearOptions = () => {
//   if (tipoBy === 'comics'){
//     orderBy.innerHTML= `
//     <option value="title">A/Z</option>
//     <option value="-title">Z/A</option>
//     <option value="-focDate">Más Nuevo</option>
//     <option value="focDate">Más Viejo</option>`
//     alert('hola')
//   }
//   if (tipoBy === 'charaters'){
//     orderBy.innerHTML= `
//     <option value="title">A/Z</option>
//     <option value="-title">Z/A</option>`
//   }
// }

// crearOptions()
