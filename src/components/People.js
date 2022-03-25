import React, { useState } from "react";
import { useQuery } from "react-query";
import { QUERY_NAME, STATUS } from "../common/enums";
import PeopleCard from "../common/PeopleCard";
import {
  ERROR_DATA,
  LOADING_DATA,
  NEXT_PAGE,
  PEOPLE,
  PREVIOUS_PAGE,
} from "../common/wordings";
import { fetchPeople } from "../queries/fetchPeople";

const People = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: peopleData, status: peopleDataStatus } = useQuery(
    [QUERY_NAME.PEOPLE, pageNumber],
    () => fetchPeople(pageNumber),
    { keepPreviousData: true }
  );

  return (
    <div>
      <h2>{PEOPLE}</h2>

      {peopleDataStatus === STATUS.LOADING && <div>{LOADING_DATA}</div>}
      {peopleDataStatus === STATUS.ERROR && <div>{ERROR_DATA}</div>}
      {peopleDataStatus === STATUS.SUCCESS && (
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
                peopleData.next &&
                setPageNumber((oldPageNumber) => oldPageNumber + 1)
              }
              disabled={!peopleData.next}
            >
              {NEXT_PAGE}
            </button>
          </div>
          {peopleData?.results.map((people) => (
            <PeopleCard key={people.name} people={people} />
          ))}
        </>
      )}
    </div>
  );
};

export default People;
