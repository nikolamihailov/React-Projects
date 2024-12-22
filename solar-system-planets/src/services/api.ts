import { Planet } from "../types/Planet";
import { planetNames } from "./planetNames";

const BASE_URL = "https://planets-17f2.onrender.com/planets/getPlanet?name=";

const options = {
  method: "GET",
};

const getAllPlanets = async function () {
  const mappedRequests = planetNames.map((planetName) => fetch(`${BASE_URL}${planetName}`));

  const responses = await Promise.all(mappedRequests);

  const data: Planet[] = await Promise.all(responses.map((res) => res.json()));

  return data;
};

const getPlanet = async function (planetName: string) {
  const res = await fetch(`${BASE_URL}${planetName}`);
  const data: Planet = await res.json();
  return data;
};

export const planetService = {
  getAllPlanets,
  getPlanet,
};
