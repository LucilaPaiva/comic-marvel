
const results = document.getElementById("results");


let resultCount = 0;

const loadComics = async () =>{
    const comicsResponse = await getComics();
    const data = comicsResponse.data;
    const comics = data.results;
    const total = data.total;

    clearResults();

    comics.forEach(comic => {
        
        const comicCard = document.createElement("div");
        comicCard.classList.add("comic");
        comicCard.innerHTML = `<div class="comic-img-container">
                                    <img src="${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}" alt="${comic.title}" class="comic-thumbnail" />
                                </div>
                                <p class="comic-title">${comic.title}</p>`;
    results.append(comicCard);
    updateResultsCount(total);
    });
}

const loadInfoComics = async () =>{
  const comicsResponse = await getComics();
  const data = comicsResponse.data;
  const comics = data.results;
  const detail = comics;
  console.log(detail)
}

loadInfoComics()

loadComics();

const updateResultsCount = (count) => {
    resultsNumber.innerHTML = count;
    resultCount = count;
};

const loadCharacters = async () =>{
    const charactersResponse = await getCharacters();
    const data = charactersResponse.data
    const characters = data.results
    clearResults();

    characters.forEach(character => {
        const charactersCard = document.createElement("div"); 
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
        results.append(charactersCard);
    });
}

loadCharacters();