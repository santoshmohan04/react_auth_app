import React, { useEffect, useState } from "react";
import "./vatavaran.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const [query, setQuery] = useState("");
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(true);
  const [weather, setWeatherData] = useState([]);
  const [form, setForm] = useState({
    city: "",
  });
  const [alertMsg, setAlertMsg] = useState([]);
  const [cityData, setCityWeather] = useState([]);
  const [cityName, setCityName] = useState("");
  const APIKEY = "d4594364698122bfd1c4b3eb5f2ff19f";
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDate = (item) => {
    if (item) {
      const d = new Date(item * 1000);
      let day = weekday[d.getDay()];
      let day_number = d.getDate();
      return day.substring(0, 3) + " " + day_number;
    }
  };

  // This function will called only once
  useEffect(() => {});
  async function getGeoLoc(e) {
    e.preventDefault();
    if (form.city === "") {
      setAlertMsg("Enter City");
      toggleShowA();
    } else {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&units=metric&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (data) => {
            if (data.cod !== "404") {
              setCityWeather((prevArray) => [...prevArray, data]);
              getCityWeather(data.name, data.coord.lat, data.coord.lon, e);
              e.target.reset();
            } else {
              setAlertMsg(data.message);
              toggleShowA();
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  async function getCityWeather(city, latitude, longitude, e) {
    e.preventDefault();
    if (city) {
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (data) => {
            if (data.cod !== "404") {
              setCityName(city);
              setWeatherData(data);
              //   console.log("data ??? ", data);
            } else {
              setAlertMsg(data.message);
              toggleShowA();
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
  };

  const clearCities = (e) => {
    e.preventDefault();
    setCityWeather([]);
    setWeatherData([]);
  };

  const List_city = cityData
    .filter((post) => {
      if (query === "") {
        return post;
      } else if (post.name.toLowerCase().includes(query.toLowerCase())) {
        return post;
      } else {
        return null;
      }
    })
    .map((t) => (
      <ul key={t.id}>
        <li>
          {t.name} - {t.main.temp}
          <sup>o</sup>C {t.weather.main}
          <img
            src={
              "http://openweathermap.org/img/wn/" +
              `${t.cod !== 404 ? t.weather[0].icon : null}` +
              ".png"
            }
            alt={t.weather[0].main}
            width="50"
            height="50"
          />
          <div style={{ float: "right" }}>
            <span
              className="pointer"
              onClick={(e) =>
                getCityWeather(t.name, t.coord.lat, t.coord.lon, e)
              }
            >
              <i className="bi bi-arrow-repeat"></i>
            </span>
            <span className="pointer pl-10">X</span>
          </div>
          <hr />
        </li>
      </ul>
    ));

  return (
    <React.Fragment>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          show={showA}
          bg="danger"
          onClose={() => setShowA(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Warning!</strong>
          </Toast.Header>
          <Toast.Body>{alertMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Container fluid>
        <h2 className="text-success">Weather App</h2>
        <Row>
          <div className="col-4" id="cities">
            <form onSubmit={(e) => getGeoLoc(e)}>
              <div className="input-group">
                <input
                  type="text"
                  required
                  name="city"
                  className="form-control"
                  placeholder="Type City Name"
                  onChange={(e) => handleChange(e)}
                />
                <button className="btn btn-primary" type="submit">
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </form>
            <hr />
            <input
              type="search"
              className="form-control"
              placeholder="Recent Locations"
              onChange={(event) => setQuery(event.target.value)}
            />
            <hr />
            {List_city}
            <button
              type="button"
              className="btn btn-secondary m-1"
              style={{ float: "right" }}
              onClick={(e) => clearCities(e)}
            >
              Clear
            </button>
          </div>
          <div className="col-8" id="city-weather">
            {Object.keys(weather).length > 0 && (
              <React.Fragment>
                <h3 className="text-primary">
                  {cityName}
                  <span
                    className="pointer"
                    style={{ float: "right" }}
                    onClick={(e) =>
                      getCityWeather(cityName, weather.lat, weather.lon, e)
                    }
                  >
                    <i className="bi bi-arrow-repeat"></i>
                  </span>
                </h3>
                <Row>
                  <Col>
                    <img
                      src={
                        "http://openweathermap.org/img/wn/" +
                        `${weather.current.weather[0].icon}` +
                        "@4x.png"
                      }
                      alt={weather.current.weather[0].description}
                      width="200"
                      height="200"
                    />
                  </Col>
                  <Col>
                    <p>{weather.current.temp} C</p>
                    <p>{weather.current.weather[0].description}</p>
                    <p>
                      {weather.current.wind_speed}ms {weather.current.wind_deg}
                      deg
                    </p>
                    <p>{weather.current.pressure}</p>
                  </Col>
                </Row>
                <Row>
                  {weather.daily.map((t) => (
                    <Col style={{ display: "inline-block" }} key={t.sunrise}>
                      {handleDate(t.dt)}
                      <img
                        src={
                          "http://openweathermap.org/img/wn/" +
                          `${t.weather[0].icon}` +
                          "@4x.png"
                        }
                        alt={t.weather[0].description}
                        width="80"
                        height="80"
                      />
                      {t.temp.max} <sup>o</sup>C
                    </Col>
                  ))}
                </Row>
              </React.Fragment>
            )}
          </div>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default Home;
