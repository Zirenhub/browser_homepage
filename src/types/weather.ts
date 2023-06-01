export type TWeather = {
  weather: {
    main: string;
    description: string;
  };
  temperature: {
    feelsLike: number;
    humidity: number;
    temp: number;
    tempMax: number;
    tempMin: number;
  };
  cloudiness: number;
  visibility: number;
  sunrise: Date;
  sunset: Date;
};

export type CurrentWeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
