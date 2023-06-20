/**
 * @returns {Promise<WeatherData>}
 */
export async function fetchWeather({ city }) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&aqi=no`
  );

  const data = await response.json();

  if (data?.error) {
    return data.error;
  }

  return data;
}

/**
 * @returns {Promise<ForecastData>}
 */

export async function fetchForecast({ city }) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&days=3&aqi=no&alerts=no`
  );

  const data = await response.json();

  if (data?.error) {
    return data.error;
  }

  return data;
}
