import { useEffect, useMemo, useState } from 'react';
import { getWeather } from '../../api/weather';
import { TWeather } from '../../types/weather';

function Weather() {
  const [currentWeather, setCurrentWeather] = useState<TWeather | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const weather = await getWeather();
        setCurrentWeather(weather);
      } catch (err) {
        // handle err
      }
    };

    init();
  }, []);

  const lineColors = useMemo(
    () => ['text-red2', 'text-gray', 'text-green', 'text-purple'],
    []
  );

  function createPanel(
    details: { span: string; para: string | number; isTemp?: boolean }[]
  ) {
    return (
      <div className="flex flex-col justify-between">
        {details.map((d, i) => {
          return (
            <div className="flex gap-3" key={i}>
              <span className={`${lineColors[i]} mr-auto`}>{d.span}</span>
              <span>
                {d.para}
                {d.isTemp && <>&deg;</>}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  if (!currentWeather) {
    return null;
  }

  const {
    weather: { main: weatherMain, description: weatherDescription },
    visibility,
    sunrise,
    sunset,
    cloudiness,
    temperature: { temp, tempMax, tempMin, humidity },
  } = currentWeather;

  return (
    <div className="flex flex-col text-white bg-dim-black px-2 py-1 rounded-md shadow-md">
      <div className="flex justify-between w-full items-center">
        <p className="text-xl text-yellow">{weatherMain}</p>
        <p className="text-sm text-dim-gray">{weatherDescription}</p>
      </div>
      <div className="flex gap-3">
        {createPanel([
          {
            span: 'Visibility',
            para: `${visibility / 1000}km`,
          },
          {
            span: 'Sunrise',
            para: `${sunrise.getHours()}:${sunrise.getMinutes()}`,
          },
          {
            span: 'Sunset',
            para: `${sunset.getHours()}:${sunset.getMinutes()}`,
          },
          {
            span: 'Cloudiness',
            para: `${cloudiness}%`,
          },
        ])}
        {createPanel([
          {
            span: 'Temp',
            para: temp,
            isTemp: true,
          },
          {
            span: 'High',
            para: tempMax,
            isTemp: true,
          },
          {
            span: 'Low',
            para: tempMin,
            isTemp: true,
          },
          {
            span: 'Humidity',
            para: `${humidity}%`,
          },
        ])}
      </div>
    </div>
  );
}

export default Weather;
