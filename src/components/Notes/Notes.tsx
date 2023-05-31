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
    'bg-transparent border-b-2 border-gray2 text-white/70 w-full py-2 px-1 outline-none';

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
    // todo
  }

  function getButtonClass(color: string) {
    // "hover:bg-${color}" WONT WORK Tailwind CSS does not support dynamic class names
    return `bg-${color}/70 transition-all rounded-sm px-3 font-bold text-white`;
  }

  useEffect(() => {
    const savedNotesJSON = localStorage.getItem('notes');
    if (savedNotesJSON) {
      const savedNotes: TNotes = JSON.parse(savedNotesJSON);
      setNotes(savedNotes);
    }
  }, []);

  return (
    <div className="bg-dim-black/70 p-1 rounded-sm shadow-lg flex flex-col gap-1 overflow-y-scroll overflow-x-hidden">
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
      <DisplayNotes notes={notes} />
      <div className="flex justify-between mt-3">
        <button
          type="button"
          onClick={handleSubmit}
          className={`${getButtonClass('red')} hover:bg-red`}
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleClear}
          className={`${getButtonClass('aqua')} hover:bg-aqua`}
        >
          Delete all
        </button>
      </div>
    </div>
  );
}

export default Notes;
