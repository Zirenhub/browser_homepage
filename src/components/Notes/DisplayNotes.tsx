import { useState } from 'react';
import { TNotes } from '../../types/notes';

type Props = {
  notes: TNotes;
  deleteNote: (id: string) => void;
};

function DisplayNotes({ notes, deleteNote }: Props) {
  const [activeSettings, setActiveSettings] = useState<string | null>(null);

  function openSettings(id: string) {
    if (activeSettings === id) {
      setActiveSettings(null);
    } else {
      setActiveSettings(id);
    }
  }

  return (
    <div className="flex flex-col gap-3 grow w-[300px] px-1 py-2">
      {notes.length > 0 ? (
        notes.map((n) => {
          return (
            <div
              className="flex transition-all hover:bg-gray/80 bg-gray rounded-sm px-2 py-2 justify-between items-start relative"
              key={n.key}
            >
              <div className="flex flex-col w-full overflow-scroll">
                <div className="flex justify-between">
                  <p className="text-xl font-bold">{n.title}</p>
                  <button
                    type="button"
                    onClick={() => openSettings(n.key)}
                    className="text-xl"
                  >
                    ...
                  </button>
                  {activeSettings === n.key && (
                    <div className="absolute bg-white z-10 hover:bg-dim-gray right-3 top-10 rounded-md px-2">
                      <button type="button" onClick={() => deleteNote(n.key)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-lg">{n.content}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-white text-center">Notes go here!</p>
      )}
    </div>
  );
}

export default DisplayNotes;
