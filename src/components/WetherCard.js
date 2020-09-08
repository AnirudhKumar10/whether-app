import React, { Component } from "react";
import * as moment from "moment";

export class WetherCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  getIcon(a) {
    return `http://openweathermap.org/img/wn/${a}@2x.png`
  }

  getClicked = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const el = this.props.records;
    return (
      <li onClick={() => this.getClicked()} className="nav-item card-1 mx-2">
        <div className="card p-3" style={{ width: "100" }}>
          <h6>{moment(new Date().setTime(el.dt*1000)).format('dddd')}</h6>
          <div className="card-body">
            <img src={this.getIcon(el.weather[0].icon)} alt="img" />
            <br />
            <span>Max: {(el.main.temp_max - 273).toFixed(2)} &#8451;</span>
            <br />
            <span>Min: {(el.main.temp_min - 273).toFixed(2)} &#8451;</span>
            <br />
            <span className="text-small text-secondary">
              {el.weather[0].main}
            </span>
            <br />
            <span className="small text-secondary text-capitalize">
              {el.weather[0].description}
            </span>
            <br />
          </div>
        </div>
        <div
          className="card-1 position-absolute mt-4 p-3"
          hidden={this.state.show}
        >
          <span>
            <b>Wind: </b>
            {el.wind.speed} Km/h
          </span>
          <br />
          <span>
            <b>Humidity: </b>
            {el.main.humidity} %
          </span>
          <br />
        </div>
      </li>
    );
  }
}
