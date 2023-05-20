import { v4 as uuidv4 } from "uuid";
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
      const allNotes = [...notes, {...note, key: uuidv4()}];
      setNote({ title: '', content: '' });
      setNotes(allNotes);
      saveNotes(allNotes);
    }
  }

  useEffect(() => {
    const savedNotesJSON = localStorage.getItem('notes')
    if (savedNotesJSON) {
      const savedNotes: Notes = JSON.parse(savedNotesJSON);
      setNotes(savedNotes)
    }
  }, [])

  return (
    <div className="flex flex-col w-fit gap-3 border p-2 rounded-sm border-dim-gray bg-dim-black max-w-[250px]">
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
      {notes.map((n) => {
        return (
          <div key={n.key} className="grow max-h-12 overflow-scroll max-h-20">
            <p className="text-green2 text-center">{n.title}</p>
            <p className="text-white text-center break-words">{n.content}</p>
          </div>
        );
      })}
      <button
        type="button"
        onClick={handleSubmit}
        className="transition-all text-blue2 bg-gray/20 hover:bg-gray/60"
      >
        save note
      </button>
    </div>
  );
}

export default NotesComp;
