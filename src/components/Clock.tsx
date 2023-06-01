import { useState, useEffect } from 'react';

type Time = {
  timePart: {
    hour: string;
    minute: string;
  };
  datePart: string;
  dayName: string;
};

const days: Record<number, string> = {
  1: 'Monday/Понеделник',
  2: 'Tuesday/Вторник',
  3: 'Wednesday/Сряда',
  4: 'Thursday/Четвъртък',
  5: 'Friday/Петък',
  6: 'Saturday/Събота',
  7: 'Sunday/Неделя',
};

function Clock() {
  const [time, setTime] = useState<Time | null>(null);

  useEffect(() => {
    function refreshTime() {
      const newDate = new Date();
      const datePart = newDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      });
      const [hour, minute] = newDate
        .toLocaleTimeString([], {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        })
        .split(':');
      const weekdayNum = newDate.getDay();
      setTime({
        timePart: { hour, minute },
        datePart,
        dayName: days[weekdayNum],
      });
    }
    const interval = setInterval(refreshTime, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (time) {
    return (
      <div className="font-bold cursor-pointer">
        <div className="flex flex-col leading-none items-center border-b border-yellow2 pb-2">
          <p className="text-[5rem] text-white [text-shadow:_0_8px_0_rgb(0_0_0_/_40%)]">
            <span className="text-yellow2/90">{time.timePart.hour}</span>:
            <span>{time.timePart.minute}</span>
          </p>
          <p className="text-gray2 text-[2rem] [text-shadow:_0_3px_0_rgb(0_0_0_/_10%)]">
            {time.datePart}
          </p>
        </div>
        <p className="text-[#ffffff] px-2 bg-yellow2/70 w-fit">
          {time.dayName}
        </p>
      </div>
    );
  }

  return null;
}

export default Clock;
