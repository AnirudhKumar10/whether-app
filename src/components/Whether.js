import React, { Component } from "react";
import { WetherCard } from "./WetherCard";

export class Whether extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      country: "",
      temperatures: [],
      show: true,
    };
  }

  getWeather() {
    if (this.state.city === "") {
      alert("Please Enter Some Value");
    } else {
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&APPID=2cc60b9d293603c2b43f2b1162bababb`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === "404") {
            alert("City not found.");
            this.setState({
              city: "Pune",
              country: "",
              temperatures: [],
              show: true,
            });
          } else {
            this.setState({
              temperatures: data.list.filter((el) => {
                return el.dt_txt.includes("18:00:00");
              }),
              city: data.city.name,
              country: data.city.country,
            });
          }
        });
    }
    this.setState({ show: false });
  }

  onchangeValue = (e) => {
    this.setState({ city: e.target.value });
  };

  render() {
    let data = this.state.temperatures;
    return (
      <div>
        <div className="container p-3">
          <div className="row justify-content-center">
            <div className="col-6 p-0">
              <input
                type="text"
                className="form-control mr-sm-2"
                placeholder="City"
                value={this.state.city}
                onChange={this.onchangeValue}
              ></input>
            </div>
            <div className="col-2">
              <button
                className="btn btn-block btn-primary"
                onClick={() => this.getWeather()}
              >
                Get Wheather
              </button>
            </div>
          </div>
          <h4 hidden={this.state.show} className="mt-3 text-white">
            {this.state.city + " " + this.state.country}
          </h4>
          <ul className="nav justify-content-center">
            {data.map((el) => {
              return <WetherCard key={data.indexOf(el)} records={el} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
