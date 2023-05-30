import { useEffect, useState } from 'react';

type Time = {
  hour: number;
  minute: number | string;
  day: number;
  month: number | string;
  year: number | string;
  dayName: string;
};

function Clock() {
  const [time, setTime] = useState<Time>({
    hour: 0,
    minute: 0,
    day: 0,
    month: 0,
    year: 0,
    dayName: '',
  });

  function formatDate(date: number, increase?: number) {
    const modifiedDate = increase ? date + 1 : date;
    if (date < 10) {
      return `0${modifiedDate}`;
    } else {
      return modifiedDate;
    }
  }

  useEffect(() => {
    const days: Record<number, string> = {
      1: 'Monday/Понеделник',
      2: 'Tuesday/Вторник',
      3: 'Wednesday/Сряда',
      4: 'Thursday/Четвъртък',
      5: 'Friday/Петък',
      6: 'Saturday/Събота',
      7: 'Sunday/Неделя',
    };

    function refreshTime() {
      const newDate = new Date();
      const newTime = {
        hour: newDate.getHours(),
        minute: formatDate(newDate.getMinutes()),
        day: newDate.getDate(),
        month: formatDate(newDate.getMonth(), 1),
        year: newDate.getFullYear().toString().slice(2),
        dayName: days[newDate.getDay()],
      };
      setTime(newTime);
    }
    const interval = setInterval(refreshTime, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-fit font-bold cursor-pointer">
      <div className="flex flex-col leading-none items-center border-b border-yellow pb-2">
        <p className="text-[5rem] text-white [text-shadow:_0_8px_0_rgb(0_0_0_/_40%)]">
          <span className="text-yellow2/90">{time.hour}</span>:
          <span>{time.minute}</span>
        </p>
        <p className="text-gray text-[2rem] [text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]">
          {time.day}.{time.month}.{time.year}
        </p>
      </div>
      <p className="text-white px-2 bg-yellow w-fit">{time.dayName}</p>
    </div>
  );
}

export default Clock;
