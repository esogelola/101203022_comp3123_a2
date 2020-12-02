import React from "react";
import axios from "axios";
import { Container, Button, Card } from "react-bootstrap";
import { RiCelsiusLine } from "react-icons/ri";
import { WiStrongWind , WiRaindrop} from "react-icons/wi";
function WeatherCard(props) {
  let date = new Date();
  let data = props.props;
  const enUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Card className="ml-auto mr-auto mt-5 text-white bg-info shadow-lg rounded" style={{ width: "35rem"}}>
      <Card.Img
        variant="top"
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        className="img-fluid"
      />
      <hr/>
      <Card.Body>
        <h4 className="font-weight-bold">{data.name}</h4>
        <Card.Text>{props.weather}</Card.Text>
        <Card.Text>
          {enUSFormatter.format(date)} | {data.weather[0].description}.
        </Card.Text>
        <div>
          <p className="display-1 ">
            {Math.round(data.main.temp)} <sup>&deg;C</sup>
          </p>
        </div>
        <div class="d-flex justify-content-between mb-4 ">
          <h4 >
            <WiStrongWind />{data.wind.speed} km/h Winds
          </h4>
          <h4>
           <WiRaindrop className="grey-text pr-2"/>{data.main.humidity}% Humidity
          </h4>
        </div>
      </Card.Body>
    </Card>
  );
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      city: 'Brampton',
      appid: "00d8a058be5b877563fd8b84b028b622",

    };
  }

  componentDidMount() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=${this.state.appid}`
      )
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      });
  }

  render() {
    return (
      <Container>
        <h1>Weather - Emmanuel Sogelola </h1>
        {this.state.data.weather === undefined ? (
          <div>
            <p>Loading....</p>
            <h1>Be patient, we're getting things ready!</h1>
          </div>
        ) : (
          <div>
            <WeatherCard props={this.state.data} />
          </div>
        )}
      </Container>
    );
  }
}
