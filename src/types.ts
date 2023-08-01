export type WholeState = {
  data: { loading: boolean; isSidenavOpen: boolean };
  cards: CardState;
  timers: TimerState;
  weather: WeatherState;
  stopwatch: StopwatchState;
};

export type CardState = {
  cards: Card[];
  searched: string | undefined;
  isLoading: boolean | null;
  hideHappened: boolean;
};

export type Card = {
  date: string;
  id: string;
  tasks: Task[];
};

export type Task = {
  content: string;
  id: string;
  done?: boolean;
};

export type TimerState = {
  timers: Timer[];
  countDownMethod: string;
  startAllTimers: boolean;
  resetAllTimers: boolean;
  activeIndex: number;
  startSequence: boolean;
};

export type Timer = {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
  timeRemaining?: number;
  timeInSeconds: number;
  id: string;
  timerName: string;
  isCounting: boolean;
};

export type StopwatchState = {
  isCounting: boolean;
  currentTime: number;
  lapTimes: LapTime[];
};

export type LapTime = {
  currentHours: number;
  currentMinutes: number;
  currentSeconds: number;
  currentMiliseconds: number;
};

export type WeatherState = {
  data: string[];
  error: string | null;
  showOnCards: string | null;
};

export type WeatherData = {
  location: WeatherLocation;
  current: Current;
  message?: string;
};

export type ForecastData = {
  location: WeatherLocation;
  current: Current;
  forecast: Forecast;
  message?: string;
};

export type Forecast = {
  forecastday: ForecastdayArray;
};

export type ForecastdayArray = {
  date: string;
  data_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
}[];

export type Forecastday = {
  date: string;
  data_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
};

export type Day = {
  avghumidity: number;
  avgtemp_c: number;
  avgtemp_f: number;
  avgvis_km: number;
  avgvis_miles: number;
  condition: Condition;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  daily_will_it_rain: number;
  daily_will_it_snow: number;
  maxtemp_c: number;
  maxtemp_f: number;
  maxwind_kph: number;
  maxwind_mph: number;
  mintemp_c: number;
  mintemp_f: number;
  totalprecip_in: number;
  totalprecip_mm: number;
  totalsnow_cm: number;
  uv: number;
};

export type Astro = {
  is_moon_up: number;
  is_sun_up: number;
  moon_illumination: string;
  moon_phase: string;
  moonrise: string;
  moonset: string;
  sunrise: string;
  sunset: string;
};

export type WeatherLocation = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

export type Current = {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
};

export type Condition = {
  text: string;
  icon: string;
  code: number;
};

export type Hour = {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
};

// export type Routes = Route[];

// export type Route = {
//   index?: boolean;
//   element: HTMLElement;
//   path: string;
//   children: Route[];
//   loader: () => any;
//   action: () => any;
// };
