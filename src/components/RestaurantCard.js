import React from "react";
import "../styles/RestaurantCard.css";

export const RestaurantCard = (props) => {
  const { id, thumb, url, name, cuisines, address, cost } = props;

  return (
    <div class="card-container">
      <div class="image-col">
        <img src={thumb} alt="restaurant thumbnail" />
      </div>
      <div class="text-col">
        <a href={url}>
          <h4>{name}</h4>
        </a>
        <p>
          <b>Cuisines: {cuisines}</b>
        </p>
        <p>
          <b>Address: {address}</b>
        </p>
        <p>
          <b>Average Cost for two: {cost}</b>
        </p>
      </div>
    </div>
  );
};
