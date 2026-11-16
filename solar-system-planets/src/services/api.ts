import { Planet } from "../types/Planet";
import { planetNames } from "./planetNames";

const BASE_URL = "https://planets-17f2.onrender.com/planets/getPlanet?name=";

const options = {
  method: "GET",
};

// The API returns broken picture URLs for these planets, so we serve our own copies from /public.
const localPictures: Record<string, string> = {
  Earth: "/earth.jpg",
};

const withLocalPicture = (planet: Planet): Planet =>
  localPictures[planet.name] ? { ...planet, picture: localPictures[planet.name] } : planet;

const getAllPlanets = async function () {
  const mappedRequests = planetNames.map((planetName) => fetch(`${BASE_URL}${planetName}`));

  const responses = await Promise.all(mappedRequests);

  const data: Planet[] = await Promise.all(responses.map((res) => res.json()));

  return data.map(withLocalPicture);
};

const getPlanet = async function (planetName: string) {
  const res = await fetch(`${BASE_URL}${planetName}`);
  const data: Planet = await res.json();
  return withLocalPicture(data);
};

export const planetService = {
  getAllPlanets,
  getPlanet,
};
