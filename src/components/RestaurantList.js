import React, { Component } from "react";
import { RestaurantCard } from "./RestaurantCard";

class RestaurantList extends Component {
  render() {
    var restaurants = this.props.restaurants || [];
    return (
      <div>
        <ul>
          {restaurants.map((restaurantObject) => {
            return (
              <RestaurantCard
                key={restaurantObject.restaurant.id}
                thumb={restaurantObject.restaurant.thumb}
                url={restaurantObject.restaurant.url}
                name={restaurantObject.restaurant.name}
                cuisines={restaurantObject.restaurant.cuisines}
                address={restaurantObject.restaurant.location.address}
                cost={restaurantObject.restaurant.average_cost_for_two}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
export default RestaurantList;
