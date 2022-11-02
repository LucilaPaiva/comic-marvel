// // luci
const baseUrl = "https://gateway.marvel.com/v1/public";
const apiKey = "9793363e7276e556c84635fef3aecb00";


// // const apiPrivate = '70b432de62d5b48263eaf29757a150e30befce52';

// // vero
//const apiPublic = 'd90ce40c311fdc6a575a0346b72d9613';
// // const apiPrivate = 'd4c1e8a42b7f85e84a903e89a2673e46778befc3';

const getComics = async (page, orderBy) =>{
    const offset = (page - 1) * 20;
    const response = await fetch(`${baseUrl}/comics?apikey=${apiKey}&offset=${offset}&orderBy=${orderBy}`);
    const data = await response.json()
    return data;
};

const getCharacters = async (page, orderBy) =>{
    const offset = (page - 1) * 20;
    const response = await fetch(`${baseUrl}/characters?apikey=${apiKey}&offset=${offset}&orderBy=${orderBy}`);
    const data = await response.json()
    
    return data;
};

// const getInfoComic = async () =>{
//     const response = await fetch(`${baseUrl}/comics?apikey=${apiKey}&offset=0&orderBy=title`);
//     const data = await response.json()
//     return data;
// }
