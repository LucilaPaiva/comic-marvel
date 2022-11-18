const getCharacters = async (page, orderBy, query) =>{
    const offset = (page - 1) * 20;
    let url = `${baseUrl}/characters?apikey=${apiKey}`;

   if (offset) url += `&offset=${offset}`;

  if (orderBy) url += `&orderBy=${orderBy}`;

  if (query && query !== "") url += `&nameStartsWith=${query}`;

    const response = await fetch(url);
    const data = await response.json()
    
    return data;
};