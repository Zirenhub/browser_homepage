import { useEffect, useState } from 'react';
import { TShortcut } from '../../types/shortcuts';
import shortcuts from './data';

function Shortcuts() {
  const [formatedShortcuts, setFormatedShortcuts] = useState<TShortcut[][]>([]);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  function formatArray(arr: TShortcut[]) {
    const result = [];
    for (let i = 0; i < arr.length; i += 3) {
      result.push(arr.slice(i, i + 3));
    }
    return result;
  }

  useEffect(() => {
    const formated = formatArray(shortcuts);
    setFormatedShortcuts(formated);
  }, []);

  return (
    <div className="flex flex-col relative gap-3 hover:scale-110 transition-all bg-white rounded-t-lg rounded-br-lg shadow-md">
      {formatedShortcuts.map((x) => {
        return (
          <div className="flex gap-3">
            {x.map((s) => {
              return (
                <a
                  type="button"
                  onMouseEnter={() => setHoveredName(s.name)}
                  onMouseLeave={() => setHoveredName(null)}
                  href={s.link}
                  key={s._id}
                  className="p-2 h-18 w-18 transition-all hover:scale-110"
                >
                  <img
                    src={s.ico}
                    alt={s.name}
                    className="object-contain block h-8 w-8"
                  />
                </a>
              );
            })}
          </div>
        );
      })}
      {hoveredName && (
        <p className="text-yellow font-bold absolute px-3 -bottom-[23.5px] bg-dim-black/50">
          {hoveredName}
        </p>
      )}
    </div>
  );
}

export default Shortcuts;
