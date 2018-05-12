const processTemp = data => {
  // TODO: when settings page done, set temp unit accordingly
  const tempInC = data.temperature;
  const currentTemp = Math.round(tempInC * (9 / 5) + 32);
  const currentHumidity = Math.round(data.humidity);

  return {
    currentTemp,
    currentHumidity
  };
};

const fetchTemps = () =>
  fetch("/api/dht/current")
    .then(resp => resp.json())
    .then(data => {
      if (data.temperature === "Failed") {
        throw new Error("DHT22 sensor failed.");
      }
      return data;
    })
    .then(processTemp);

export default fetchTemps;
