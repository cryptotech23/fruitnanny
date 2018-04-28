/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import DataSection from "./components/DataSection";
import MonitorSection from "./components/MonitorSection";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: {
        type: "Temperature",
        cur: "--",
        avg: "--"
      },
      humidity: {
        type: "Humidity",
        cur: "--",
        avg: "--"
      },
      naptime: {
        type: "Naptime",
        cur: "--",
        avg: "--"
      }
    };

    this.tempInterval = null;
  }

  componentDidMount() {
    // Update temperature once a minute
    this.fetchTemp();
    this.tempInterval = setInterval(() => {
      this.fetchTemp();
    }, 1 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tempInterval);
  }

  fetchTemp() {
    fetch("/api/dht/current")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        // DHT22 sensor may return {temperature: "Failed", humidity: "to"} if unsuccessful
        if (data.temperature === "Failed") {
          return this.fetchTemp();
        }

        const tempInC = data.temperature;
        const tempInF = Math.round(tempInC * (9 / 5) + 32);
        const h = Math.round(data.humidity);
        const { temp, humidity } = this.state;
        temp.cur = `${tempInF}°`;
        humidity.cur = `${h}%`;
        this.setState({ temp, humidity });
      })
      .catch(err => {
        window.console.log(err);
      });
  }

  render() {
    const { temp, humidity, naptime } = this.state;

    return (
      <div className="app">
        <MonitorSection />
        <DataSection temp={temp} humidity={humidity} naptime={naptime} />
      </div>
    );
  }
}

export default App;
