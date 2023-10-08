const BASE_URL = "https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/";

/* console.log(import.meta.env.VITE_API_KEY);
const options = {
    method: 'GET',
    url: 'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_API_HOST
    }
};
 */

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '783d4795f5msh7b334c2c6ddf04ep1174e1jsn4f5402dd379b',
        'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
    }
};

const getAllPlanets = async function () {
    const res = await fetch(BASE_URL, options);
    const data = await res.json();
    return data;
};

const getPlanet = async function (planetId) {
    const res = await fetch(`${BASE_URL}${planetId}`, options);
    const data = await res.json();
    return data;
};

export const planetService = {
    getAllPlanets,
    getPlanet
};