export async function fetchWeather({
  city,
}: {
  city: string;
}): Promise<WeatherData> {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&aqi=no`
  );

  const data = await response.json();

  if (data?.error) {
    return data.error;
  }

  return data;
}

export async function fetchForecast({
  city,
}: {
  city: string;
}): Promise<ForecastData> {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${city}&days=3&aqi=no&alerts=no`
  );

  const data = await response.json();

  if (data?.error) {
    return data.error;
  }

  return data;
}

export async function getCardsData(uid: string): Promise<CardState> {
  const cardsResponse = await fetch(
    process.env.REACT_APP_FIREBASE_LINK + 'users/' + uid + '/cards.json'
  );

  const cardsData = await cardsResponse.json();

  return cardsData;
}
