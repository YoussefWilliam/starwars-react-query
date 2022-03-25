import React, { useState } from "react";
import { useQuery } from "react-query";
import { QUERY_NAME, STATUS } from "../common/enums";
import PlanetCard from "../common/PlanetCard";
import {
  ERROR_DATA,
  LOADING_DATA,
  NEXT_PAGE,
  PLANETS,
  PREVIOUS_PAGE,
} from "../common/wordings";
import { fetchPlanets } from "../queries/fetchPlanets";

const Planets = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: planetsData, status: planetDataStatus } = useQuery(
    [QUERY_NAME.PLANETS, pageNumber],
    () => fetchPlanets(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h2>{PLANETS}</h2>
      {planetDataStatus === STATUS.LOADING && <div>{LOADING_DATA}</div>}
      {planetDataStatus === STATUS.ERROR && <div>{ERROR_DATA}</div>}
      {planetDataStatus === STATUS.SUCCESS && (
        <>
          <div>
            <button
              onClick={() =>
                setPageNumber((oldPageNumber) => Math.max(oldPageNumber - 1, 1))
              }
              disabled={pageNumber === 1}
            >
              {PREVIOUS_PAGE}
            </button>
            {pageNumber}
            <button
              onClick={() =>
                planetsData.next &&
                setPageNumber((oldPageNumber) => oldPageNumber + 1)
              }
              disabled={!planetsData.next}
            >
              {NEXT_PAGE}
            </button>
          </div>

          {planetsData.results.map((planet) => (
            <PlanetCard key={planet.name} planet={planet} />
          ))}
        </>
      )}
    </div>
  );
};

export default Planets;
