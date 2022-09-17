// **************** API KEY ******************

const apiPublic = '9793363e7276e556c84635fef3aecb00';
const apiPrivate = '70b432de62d5b48263eaf29757a150e30befce52';

const url = `http://gateway.marvel.com/v1/public/comics?apikey=${apiPublic}`;

fetch(url) // es una promesa pendiente
  .then(resp => resp.json()) // Resuelve exitosa => Respuesta status 200
  .then(json => console.log(json));




// *********** Botón modo claro/modo oscuro ****************

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

const divCardCharacter = document.getElementById('div-card-character');

let data = [];

const printData  = () => {
    let card = '';
        card +=  `<div class="col s12 m12 container-card-character">
        <div class="card card-character">
            <div class="card-image container-img-character">
                <img class="img-character" src="imagenes/strange2.png">
                <a class="mas-info" href="#"><i class="material-icons">add</i></a>
                <div class="card-content card-content-info">
                    <div class="contein-info">
                        <span class="title-character">Card Title</span>
                        <p class="text-character">I am a very simple card.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
  divCardCharacter.innerHTML= card;
}

const selectSearchTipo = document.getElementById("select-search-tipo");

selectSearchTipo.addEventListener('change' , () => {

  const porTipo = selectSearchTipo.value;

  if(porTipo === 'personajes'){
    printData()
  }

  console.log(porTipo);

})







$(document).ready(function(){
  $('select').formSelect();
})