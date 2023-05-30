import { useState } from 'react';
import shortcuts from './data';

function Shortcuts() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="flex bg-white shrink-0 rounded-lg shadow-md">
      {shortcuts.map((s) => {
        const isHovered = hoveredLink === s._id;

        return (
          <a
            type="button"
            onMouseEnter={() => setHoveredLink(s._id)}
            onMouseLeave={() => setHoveredLink(null)}
            href={s.link}
            key={s._id}
            className={`${
              isHovered ? 'border-b-4 border-aqua' : null
            } relative flex flex-col items-center justify-center p-2 h-18 w-18`}
          >
            {isHovered && (
              <p className="absolute -top-7 bg-aqua text-white rounded-full px-2">
                {s.name}
              </p>
            )}
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
}

export default Shortcuts;
