import { useState } from 'react';
import { TNotes } from '../../types/notes';

type Props = {
  notes: TNotes;
};

function DisplayNotes({ notes }: Props) {
  const [activeSettings, setActiveSettings] = useState<string | null>(null);

  function openSettings(id: string) {
    if (activeSettings === id) {
      setActiveSettings(null);
    } else {
      setActiveSettings(id);
    }
  }

  return (
    <div className="flex flex-col gap-3 w-[300px]">
      {notes.map((n) => {
        return (
          <div
            className="flex bg-gray rounded-sm px-2 py-2 justify-between items-start relative"
            key={n.key}
          >
            <div className="flex flex-col w-full overflow-scroll">
              <p className="text-xl font-bold">{n.title}</p>
              <p className="text-lg">{n.content}</p>
            </div>
            <button
              type="button"
              onClick={() => openSettings(n.key)}
              className="text-xl"
            >
              ...
            </button>
            {activeSettings === n.key && (
              <div className="absolute bg-white hover:bg-white/70 right-3 top-10 rounded-md px-2">
                <button type="button">Delete</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayNotes;
