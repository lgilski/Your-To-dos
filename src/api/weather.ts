import { ForecastData, WeatherData } from '@/types';

export async function fetchWeather({
  city,
}: {
  city: string;
}): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_WEATHER_KEY
      }&q=${city}&aqi=no`
    );

    const data = await response.json();

    if (data?.error) {
      return data.error;
    }

    return data;
  } catch (err: any) {
    return err;
  }
}

export async function fetchForecast({
  city,
}: {
  city: string;
}): Promise<ForecastData> {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_WEATHER_KEY
    }&q=${city}&days=3&aqi=no&alerts=no`
  );

  const data = await response.json();

  if (data?.error) {
    return data.error;
  }

  return data;
}
