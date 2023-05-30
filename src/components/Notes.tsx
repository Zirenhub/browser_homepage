import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { Notes, Note } from '../types/notes';

function NotesComp() {
  const [note, setNote] = useState<Note>({
    title: '',
    content: '',
  });
  const [notes, setNotes] = useState<Notes>([]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputClass =
    'bg-transparent border-yellow/20 border-b outline-none text-white px-2';

  function handleChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setNote((prevNote) => {
      return { ...prevNote, [target.name]: target.value };
    });
    if (target.name === 'content' && textAreaRef.current) {
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }

  function saveNotes(notes: Notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function handleSubmit() {
    const { title, content } = note;
    if (title && content) {
      const allNotes = [...notes, { ...note, key: uuidv4() }];
      setNote({ title: '', content: '' });
      setNotes(allNotes);
      saveNotes(allNotes);
    }
  }

  function handleClear() {
    localStorage.removeItem('notes');
    setNotes([]);
  }

  useEffect(() => {
    const savedNotesJSON = localStorage.getItem('notes');
    if (savedNotesJSON) {
      const savedNotes: Notes = JSON.parse(savedNotesJSON);
      setNotes(savedNotes);
    }
  }, []);

  return (
    <div className="flex flex-col overflow-scroll gap-3 rounded-lg border border-transparent transition-all bg-dim-black grow w-[250px] hover:border-red2/60">
      <div className="sticky top-0 bg-dim-black w-full flex flex-col justify-center">
        <p className="text-yellow2 self-center">Notes</p>
        <input
          type="text"
          onChange={handleChange}
          value={note.title}
          name="title"
          placeholder="Title"
          className={inputClass}
        />
        <textarea
          onChange={handleChange}
          value={note.content}
          name="content"
          placeholder="Content"
          ref={textAreaRef}
          className={`${inputClass} overflow-hidden`}
        />
      </div>
      <div className="flex flex-col px-3 grow max-h-full">
        {notes.length > 0 ? (
          notes.map((n) => {
            return (
              <div key={n.key} className="border-b border-dim-gray">
                <p className="text-green2 text-center">{n.title}</p>
                <p className="text-white text-center break-words">
                  {n.content}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-center text-blue2/40">Notes go here!</p>
        )}
      </div>
      <div className="sticky bottom-0 p-2 w-full bg-dim-black flex justify-between items-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="transition-all text-blue2 w-[60%] bg-gray/20 hover:bg-gray/60"
        >
          save note
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="text-red2 text-sm"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

export default NotesComp;
