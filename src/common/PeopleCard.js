import React from "react";

const PeopleCard = ({ people }) => {
  const { name, gender, height } = people || {};
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Gender: {gender}</p>
      <p>Height: {height}</p>
    </div>
  );
};
export default PeopleCard;
