// // luci

const getComics = async (page, orderBy,query) =>{
    const offset = (page - 1) * 20;
    let url = `${baseUrl}/comics?apikey=${apiKey}`;

  if (offset) url += `&offset=${offset}`;

  if (orderBy) url += `&orderBy=${orderBy}`;

  if (query && query !== "") url += `&titleStartsWith=${query}`;

    const response = await fetch(url);
    const data = await response.json()
    return data;
};

const loadInfoComic = async () =>{
    const response = await fetch(`${baseUrl}/comics?apikey=${apiKey}&offset=0&orderBy=title`);
    const data = await response.json()
    return data;
};
