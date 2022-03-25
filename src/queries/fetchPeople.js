export const fetchPeople = async (pageNumber) => {
  const response = await fetch(
    `https://swapi.dev/api/people/?page=${pageNumber}`
  );
  return response.json();
};
