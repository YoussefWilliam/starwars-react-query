export const fetchPlanets = async (pageNumebr) => {
  const response = await fetch(
    `http://swapi.dev/api/planets/?page=${pageNumebr}`
  );
  return response.json();
};
