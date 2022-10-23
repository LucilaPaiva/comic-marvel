
const results = document.getElementById("results");

const loadComics = async () =>{
    const comicsResponse = await getComics();
    const data = comicsResponse.data
    const comics = data.results

    console.log(data);

    comics.forEach(comic => {
        console.log(comic) 
        
        const comicCard = document.createElement("div");
        comicCard.classList.add("comic");
        comicCard.innerHTML = `<div class="comic-img-container">
                                    <img src="${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}" alt="${comic.title}" class="comic-thumbnail" />
                                </div>
                                <p class="comic-title">${comic.title}</p>`;
    results.append(comicCard);
    });
}

loadComics();