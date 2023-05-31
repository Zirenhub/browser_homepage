import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { TNotes, TNote } from '../../types/notes';
import DisplayNotes from './DisplayNotes';

function Notes() {
  const [note, setNote] = useState<TNote>({
    title: '',
    content: '',
  });
  const [notes, setNotes] = useState<TNotes>([]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputClass =
    'bg-transparent border-b-2 border-gray2 text-white/70 py-2 px-3 outline-none';

  function handleChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setNote((prevNote) => {
      return { ...prevNote, [target.name]: target.value };
    });
    if (target.name === 'content' && textAreaRef.current) {
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }

  function saveNotes(notes: TNotes) {
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

  function deleteNote(id: string) {
    const updatedNotes = notes.filter((n) => n.key !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  }

  useEffect(() => {
    const savedNotesJSON = localStorage.getItem('notes');
    if (savedNotesJSON) {
      const savedNotes: TNotes = JSON.parse(savedNotesJSON);
      setNotes(savedNotes);
    }
  }, []);

  return (
    <div className="bg-dim-black/70 rounded-sm shadow-lg flex flex-col overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-col sticky top-0 bg-dim-black z-10 pb-1">
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Note Title"
          className={inputClass}
        />
        <textarea
          name="content"
          ref={textAreaRef}
          onChange={handleChange}
          value={note.content}
          placeholder="Note Content"
          className={inputClass}
        />
      </div>
      <DisplayNotes notes={notes} deleteNote={deleteNote} />
      <div className="flex justify-between sticky bottom-0 bg-dim-black px-3 py-1">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-red/70 transition-all rounded-sm px-3 font-bold text-white hover:bg-red"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-aqua/70 transition-all rounded-sm px-3 font-bold text-white hover:bg-aqua"
        >
          Delete all
        </button>
      </div>
    </div>
  );
}

export default Notes;
