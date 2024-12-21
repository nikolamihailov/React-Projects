// old API key is not working anymore
// const BASE_URL = "https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/";
// const API_KEY = import.meta.env.VITE_API_KEY;
// const API_HOST = import.meta.env.VITE_API_HOST;

import { planetNames } from "./planetNames";

const BASE_URL = "https://planets-17f2.onrender.com/planets/getPlanet?name=";

const options = {
  method: "GET",
  /*  headers: {
         'X-RapidAPI-Key': API_KEY,
         'X-RapidAPI-Host': API_HOST
     } */
};

const getAllPlanets = async function () {
  const mappedRequests = planetNames.map((planetName) => fetch(`${BASE_URL}${planetName}`));

  const responses = await Promise.all(mappedRequests);

  const data = await Promise.all(responses.map((res) => res.json()));

  return data;
};

const getPlanet = async function (planetName) {
  const res = await fetch(`${BASE_URL}${planetName}`);
  const data = await res.json();
  return data;
};

export const planetService = {
  getAllPlanets,
  getPlanet,
};
