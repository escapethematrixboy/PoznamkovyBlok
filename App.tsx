// @ts-nocheck
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './index.css';

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('notes-data');
    if (savedData) {
      setNotes(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes-data', JSON.stringify(notes));
  }, [notes]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert("Vyplňte pole!");

    if (editId) {
      setNotes(notes.map(n => n.id === editId ? { ...n, title, content } : n));
      setEditId(null);
    } else {
      const newNote: Note = { id: Date.now(), title, content };
      setNotes([...notes, newNote]);
    }
    setTitle(''); 
    setContent('');
  };

  const deleteNote = (id: number) => {
    if (window.confirm("Smazat?")) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const startEdit = (note: Note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="container">
      <h1>Poznámkový blok</h1>
      
      <form onSubmit={handleSave} className="note-form">
        <h3>{editId ? 'Upravit' : 'Nová poznámka'}</h3>
        <input 
          value={title} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
          placeholder="Název" 
        />
        <textarea 
          value={content} 
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} 
          placeholder="Text" 
        />
        <button type="submit" className="btn-save">Uložit</button>
        {editId && (
          <button type="button" onClick={() => {setEditId(null); setTitle(''); setContent('');}}>
            Zrušit
          </button>
        )}
      </form>

      <div className="note-list">
        {notes.map(n => (
          <div key={n.id} className="note-card">
            <h4>{n.title}</h4>
            <p>{n.content}</p>
            <div className="actions">
              <button onClick={() => startEdit(n)} className="btn-edit">Edit</button>
              <button onClick={() => deleteNote(n.id)} className="btn-delete">Smazat</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}