import { useEffect, useState } from 'react';

function formatDate(date: number, increase?: number) {
  const modifiedDate = increase ? date + 1 : date;
  if (date < 10) {
    return `0${modifiedDate}`;
  } else {
    return modifiedDate;
  }
}

type Time = {
  hour: number;
  minute: number | string;
  day: number;
  month: number | string;
  year: number;
};

function Clock() {
  const [time, setTime] = useState<Time>({
    hour: 0,
    minute: 0,
    day: 0,
    month: 0,
    year: 0,
  });

  useEffect(() => {
    function refreshTime() {
      const newDate = new Date();
      const newTime = {
        hour: newDate.getHours(),
        minute: formatDate(newDate.getMinutes()),
        day: newDate.getDate(),
        month: formatDate(newDate.getMonth(), 1),
        year: newDate.getFullYear(),
      };
      setTime(newTime);
    }
    const interval = setInterval(refreshTime, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='w-fit'>
      <div className="transition-all hover:scale-105 hover:border-red2 cursor-pointer flex flex-col rounded-sm leading-none bg-dim-black border border-transparent w-fit items-center p-2">
        <p className="text-gray2 text-[5rem]">
          {time.hour}<span className='text-blue'>:</span>{time.minute}
        </p>
        <p className="text-gray text-[2rem]">
          {time.day}<span className='text-aqua'>.</span>{time.month}<span className='text-aqua'>.</span>{time.year}
        </p>
      </div>
    </div>
  );
}

export default Clock;
