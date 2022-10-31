const resultsElement = document.getElementById("results");
const resultsNumber = document.querySelector(".results-number");

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
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get("p")) || 1;
  //const order = params.get('title')
  //const tipo = params.get('comics')

  const comicsRsponse = await getComics(page, "title");

  const data = comicsRsponse.data;
  const comics = data.results;
  const total = data.total;

  comics.forEach((comic) => {
    const comicCard = document.createElement("div");
    comicCard.classList.add("comic");
    comicCard.innerHTML = `<div class="comic-img-container">
                                    <img src="${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}" alt="${comic.title}" class="comic-thumbnail" />
                                </div>
                                <p class="comic-title">${comic.title}</p>`;
    resultsElement.append(comicCard);
    updateResultsCount(total);
  });

  renderPagination(Math.ceil(data.total / 20));
};

// const loadInfoComics = async () =>{
//   const comicsResponse = await getComics();
//   const data = comicsResponse.data;
//   const comics = data.results;
//   const detail = comics;

// }

// loadInfoComics()

const loadCharacters = async () => {
  console.log('ejecute loadCharaters');
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get("p")) || 1;
  //const order = params.get('name')
  //const tipo = params.get('characters')
  const charactersResponse = await getCharacters(page, "name");
  const data = charactersResponse.data;
  const characters = data.results;
  const total = data.total;

  characters.forEach((character) => {
    const charactersCard = document.createElement("div");
    charactersCard.classList.add("card-character");
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
    resultsElement.append(charactersCard);
    updateResultsCount(total)
  });
  renderPagination(Math.ceil(data.total / 20));
};

const updateResultsCount = (count) => {
  resultsNumber.innerHTML = count;
  resultCount = count;
};

const containerSelectTipo = document.getElementById("select-tipo");
const selectOrderContainer = document.getElementById("select-order");
const formSearch = document.getElementById("form-search");
//const containerTipo = document.createElement("div");
//containerTipo.setAttribute("id", "container-tipo");

//cambiar esto en el sass

//containerTipo.classList.add("select-tipo");
const labelTipo = document.createElement("label");
const labelOrder = document.createElement("label");
const optionComic = document.createElement('option');
const optionCharacter = document.createElement('option');

const optionAz = document.createElement('option');
const optionZa = document.createElement('option');
const optionNew = document.createElement('option');
const optionOld = document.createElement('option');


labelTipo.classList.add("label-select-tipo");
labelOrder.classList.add("label-select-orden");



const labelText = document.createTextNode("Tipo");
const labelOrderText = document.createTextNode("Orden");
const comicText = document.createTextNode("Comic");
const characterText = document.createTextNode("Personajes");

const aZText = document.createTextNode("A/Z");
const zAText = document.createTextNode("Z/A");
const newText = document.createTextNode("Más nuevo");
const oldText = document.createTextNode("Más antiguo");

const selectTipo = document.createElement("select");
const selectOrder = document.createElement("select");


selectTipo.setAttribute("id", "tipo-by");
selectOrder.setAttribute("id", "order-by")

selectTipo.classList.add("select-search-tipo");
selectOrder.classList.add("select-search-orden");
//formSearch.appendChild(containerTipo);
//containerTipo.appendChild(containerSelectTipo);
containerSelectTipo.appendChild(labelTipo);
selectOrderContainer.appendChild(labelOrder);

labelTipo.appendChild(labelText);
labelOrder.appendChild(labelOrderText);

containerSelectTipo.appendChild(selectTipo);
selectOrderContainer.appendChild(selectOrder);

selectTipo.appendChild(optionComic);
selectTipo.appendChild(optionCharacter);


selectOrder.appendChild(optionAz);
selectOrder.appendChild(optionZa);
selectOrder.appendChild(optionNew);
selectOrder.appendChild(optionOld);

optionComic.appendChild(comicText);
optionCharacter.appendChild(characterText);
optionAz.appendChild(aZText);
optionZa.appendChild(zAText);
optionNew.appendChild(newText);
optionOld.appendChild(oldText);

optionComic.setAttribute("value","comics");
optionCharacter.setAttribute("value","characters");
optionAz.setAttribute("value","title");
optionZa.setAttribute("value","-title");
optionNew.setAttribute("value","-focDate");
optionOld.setAttribute("value","focDate");

///// funcion para los selects ///////

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const tipoBy = e.target["tipo-by"].value;
  const orderBy = e.target["order-by"].value;
  const params = new URLSearchParams(window.location.search);
  params.set("order", orderBy);
  params.set("offset", 20);
  params.set("tipo", tipoBy);
  window.location = window.location.pathname + "?" + params.toString();
});

//****************** PAGINADOR *****************

const containerPagination = document.getElementById("container-pagination");

const renderPagination = (totalPages) => {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get("p")) || 1;
  const buttons = [
    {
      text: "<<",
      class: "btn",
      onClick: function () {
        params.set("p", 1);
        window.location.href =
          window.location.pathname + "?" + params.toString();
      },
    },
    {
      text: page - 1,
      class: "btn",
      onClick: function () {
        params.set("p", page - 1);
        window.location.href =
          window.location.pathname + "?" + params.toString();
      },
    },
    {
      text: page,
      class: "btn",
    },
    {
      text: page + 1,
      class: "btn",
      onClick: function () {
        params.set("p", page + 1);
        window.location.href =
          window.location.pathname + "?" + params.toString();
      },
    },
    {
      text: ">>",
      class: "btn",
      onClick: function () {
        params.set("p", totalPages);
        window.location.href =
          window.location.pathname + "?" + params.toString();
      },
    },
  ];

  const pagination = document.createElement("div");
  pagination.setAttribute("id", "pagination");
  pagination.classList.add("pagination");

  buttons.forEach((button) => {
    const buttonNode = document.createElement("button");
    const textNode = document.createTextNode(button.text);
    buttonNode.appendChild(textNode);
    buttonNode.classList.add(button.class);

    buttonNode.addEventListener("click", button.onClick);

    pagination.appendChild(buttonNode);
  });

  containerPagination.appendChild(pagination);
};



const init = () => {
  const orderBy = document.getElementById('order-by')
  console.log(orderBy);
  const params = new URLSearchParams(window.location.search);
  if (params.get("tipo") === "characters") {
    optionCharacter.setAttribute('selected', true)
    loadCharacters();
  } else {
    optionComic.setAttribute('selected', true)
    loadComics();
  }
  if(params.get('order') === 'title'){
    optionAz.setAttribute('selected', true)
  }
  if(params.get('order') === '-title'){
    optionZa.setAttribute('selected', true)
  }
  if(params.get('order') === '-focDate'){
    optionNew.setAttribute('selected', true)
  }
  if(params.get('order') === 'focDate'){
    optionOld.setAttribute('selected', true)
  }
  // orderBy.setAttribute('selected',params.get('order'))
};

init();

// const inputSearch = document.getElementById('search');
// const valueInputSearch = inputSearch.value;
// console.log(valueInputSearch);

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
