import { CurrentWeatherData, TWeather } from '../types/weather';
const API: string = import.meta.env.VITE_WEATHER_API;

async function getWeather(): Promise<TWeather> {
  try {
    const response = await fetch(API);
    const data: CurrentWeatherData = await response.json();
    const currentWeather = data.weather[0];
    const output: TWeather = {
      weather: {
        main: currentWeather.main,
        description: currentWeather.description,
      },
      temperature: {
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
      },
      cloudiness: data.clouds.all,
      visibility: data.visibility,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
    };

    return output;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch weather data');
  }
}

export { getWeather };
