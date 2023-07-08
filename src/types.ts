/**
 * @typedef {Object} Task
 * @property {string} content
 * @property {string} id
 */

/**
 * @typedef {Object} Card
 * @property {string} date '2023-05-13T00:00:00.000Z'
 * @property {string} id '23.05.2023'
 * @property {Task[]} tasks
 */

/**
 * @typedef {Object} DataState
 * @property {Card[]} cards
 */

interface CardState {
  cards: Card[];
  searched: string | null;
}

interface Card {
  date: string;
  id: string;
  tasks: Task[];
}

interface Task {
  content: string;
  id: string;
  done?: boolean;
}

/**
 * @typedef {Object} WeatherData
 * @property {WeatherLocation} location
 * @property {Current} current
 */

/**
 * @typedef {Object} ForecastData
 * @property {WeatherLocation} location
 * @property {Current} current
 * @property {Forecast} forecast
 */

/**
 * @typedef {Object} Forecast
 * @property {Forecastday} forecastday
 */

/**
 * @typedef {Object} WeatherLocation
 * @property {string} name
 * @property {string} region
 * @property {string} country
 * @property {number} lat
 * @property {number} lon
 * @property {string} tz_id
 * @property {number} localtime_epoch
 * @property {string} localtime
 */

/**
 * @typedef {Object} Current
 * @property {number} last_updated_epoch
 * @property {string} last_updated
 * @property {number} temp_c
 * @property {number} temp_f
 * @property {number} is_day
 * @property {Condition} condition
 * @property {number} wind_mph
 * @property {number} wind_kph
 * @property {number} wind_degree
 * @property {string} wind_dir
 * @property {number} pressure_mb
 * @property {number} pressure_in
 * @property {number} precip_mm
 * @property {number} precip_in
 * @property {number} humidity
 * @property {number} cloud
 * @property {number} feelslike_c
 * @property {number} feelslike_f
 * @property {number} vis_km
 * @property {number} vis_miles
 * @property {number} uv
 * @property {number} gust_mph
 * @property {number} gust_kph
 */

/**
 * @typedef {Object} Condition
 * @property {string} text
 * @property {string} icon
 * @property {number} code
 */

/**
 * @typedef {Object} Hour
 * @property {number} time_epoch
 * @property {string} time
 * @property {number} temp_c
 * @property {number} temp_f
 * @property {number} is_day
 * @property {Condition} condition
 * @property {number} wind_mph
 * @property {number} wind_kph
 * @property {number} wind_degree
 * @property {string} wind_dir
 * @property {number} pressure_mb
 * @property {number} pressure_in
 * @property {number} precip_mm
 * @property {number} precip_in
 * @property {number} humidity
 * @property {number} cloud
 * @property {number} feelslike_c
 * @property {number} feelslike_f
 * @property {number} windchill_c
 * @property {number} windchill_f
 * @property {number} heatindex_c
 * @property {number} heatindex_f
 * @property {number} dewpoint_c
 * @property {number} dewpoint_f
 * @property {number} will_it_rain
 * @property {number} chance_of_rain
 * @property {number} will_it_snow
 * @property {number} chance_of_snow
 * @property {number} vis_km
 * @property {number} vis_miles
 * @property {number} gust_mph
 * @property {number} gust_kph
 * @property {number} uv
 */
