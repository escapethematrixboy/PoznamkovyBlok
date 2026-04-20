  return (
    <div className="container">
      <h1>Můj Blok</h1>
      
      {/* ПОЛЕ ПОИСКА */}
      <input 
        style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Vyhledat poznámku..."
      />

      <div className="input-group">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder={editId ? "Upravit..." : "Napiš něco..."} 
        />
        <button onClick={addNote}>{editId ? "Uložit" : "Přidat"}</button>
      </div>

      <hr />

      <div className="notes-list">
        {/* ВАЖНО: используем filteredNotes вместо notes */}
        {filteredNotes.map(note => (
          <div key={note.id} className="note-item">
            <span>{note.content}</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => startEdit(note)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✎</button>
              <button className="delete-btn" onClick={() => deleteNote(note.id)}>Smazat</button>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '10px', color: 'gray', textAlign: 'center', marginTop: '20px' }}>
        Změny automaticky uloženy v LocalStorage.
      </p>
    </div>
  );
