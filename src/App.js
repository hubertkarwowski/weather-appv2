import React from "react";
import { Component } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import "./App.css";
import {
  Clouds,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudLightningRain,
  CloudFog,
} from "react-bootstrap-icons";

const API_KEY = "69273a8a5ee6b16eee3269b6549c5d0e";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      temperature: undefined,
      wind_speed: undefined,
      description: "",
      icon: undefined,
    };

    this.icon = {
      Thunderstorm: <CloudLightningRain />,
      Drizzle: <CloudDrizzle />,
      Rain: <CloudRain />,
      Snow: <CloudSnow />,
      Atmosphere: <CloudFog />,
      Cloud: <Clouds />,
    };
    this.getWeather = this.getWeather.bind(this);
  }

  async getWeather(e) {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const response = await api_call.json();

    console.log(response);

    let weatherId = response.weather[0].id;
    if (weatherId >= 200 && weatherId <= 232) {
      this.setState({
        icon: this.icon.Thunderstorm,
      });
    } else if (weatherId >= 300 && weatherId <= 321) {
      this.setState({
        icon: this.icon.Drizzle,
      });
    } else if (weatherId >= 500 && weatherId <= 531) {
      this.setState({
        icon: this.icon.Rain,
      });
    } else if (weatherId >= 600 && weatherId <= 622) {
      this.setState({
        icon: this.icon.Snow,
      });
    } else if (weatherId >= 701 && weatherId <= 781) {
      this.setState({
        icon: this.icon.Atmosphere,
      });
    } else {
      this.setState({
        icon: this.icon.Cloud,
      });
    }

    this.setState({
      city: response.name,
      temperature: Math.floor(response.main.temp - 273.15),
      wind_speed: response.wind.speed,
      description: response.weather[0].description,
    });
  }

  render() {
    return (
      <Container className="text-center main-container">
        <Row>
          <Col>
            <h1 className="display-2">City:</h1>
            <h2 className="display-3">{this.state.city}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-1">{this.state.icon}</h1>
            <h3 className="my-5">Temperature: {this.state.temperature}&deg;</h3>
            <h3 className="my-5">Wind Speed: {this.state.wind_speed}</h3>
            <h3 className="my-5">Description: {this.state.description}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.getWeather}>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                className="mx-4"
                autoComplete="off"
              ></input>
              <button className="btn btn-dark">Check weather</button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
