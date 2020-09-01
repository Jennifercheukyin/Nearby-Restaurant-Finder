import React, { Component } from "react";
import "./App.css";
import RestaurantList from "./components/RestaurantList";
import axios from "axios";

import Map from "./components/Map";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantQuery: "",
      nearByRestaurants: [],
      latitude: 0,
      longitude: 0,
    };
  }

  onChange = (e) => {
    this.setState({
      restaurantQuery: e.target.value,
    });
  };

  fetchRestaurants = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setState({
          latitude: lat,
          longitude: lng,
        });
        console.log("Latitude is :", this.state.latitude);
        console.log("Longitude is :", lng);

        axios({
          method: "GET",
          url:
            "https://developers.zomato.com/api/v2.1/search?start=0&count=10&lat=" +
            this.state.latitude +
            "&lon=" +
            this.state.longitude +
            "&radius=50000" +
            "&q=" +
            this.state.restaurantQuery,
          headers: {
            "user-key": "a766c238e22ff6e4cdc93a49ab17f518",
            "content-type": "application/json",
          },
        })
          .then((response) => {
            const data = response.data;
            console.log(data.restaurants[0].restaurant);
            this.setState({
              nearByRestaurants: data.restaurants,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };

  componentDidMount = () => {
    this.fetchRestaurants();
  };

  render() {
    return (
      <div>
        <div class="header">
          <h2>Nearby Restaurant</h2>
        </div>
        <div class="searchBar">
          <input
            type="text"
            placeholder="Enter restaurant name"
            id="restaurant name"
            value={this.state.restaurantQuery}
            style={{ width: 400 }}
            onChange={this.onChange}
          />
          <button onClick={this.fetchRestaurants}>Search</button>
        </div>
        <div class="map">
          <Map
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            restaurants={this.state.nearByRestaurants}
          />
        </div>
        <div class="restaurants">
          <RestaurantList restaurants={this.state.nearByRestaurants} />
        </div>
      </div>
    );
  }
}

export default App;
