import { useParams } from 'react-router-dom';
import { fetchForecast } from '../api/weather';
import WeatherDetailCards from '../components/Weather/WeatherDetailCards/WeatherDetailCards';

function WeatherDetailPage() {
  // const weatherForecast = useLoaderData();
  const { city } = useParams();

  return <WeatherDetailCards city={city!} />;
}

export default WeatherDetailPage;

export async function loader({ params }: { params: any }) {
  const city = params.weatherId;

  const data = await fetchForecast({ city });

  if (data?.message) {
    return;
  }

  return data;
}
