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




$(document).ready(function(){
  $('select').formSelect();
});
