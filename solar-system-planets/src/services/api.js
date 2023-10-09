const BASE_URL = "https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = import.meta.env.VITE_API_HOST;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
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