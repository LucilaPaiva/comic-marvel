const toggle = document.getElementById('toggle');
const main = document.getElementById('main');

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        main.classList.add('modo-oscuro');
        main.classList.remove('modo-claro');
      } else {
        main.classList.add('modo-claro');
        main.classList.remove('modo-oscuro');
      }
})