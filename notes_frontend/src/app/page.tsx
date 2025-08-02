'use client';

import { useEffect, useState } from 'react';
import NotesSidebar from '@/components/NotesSidebar';
import NotesHeader from '@/components/NotesHeader';
import NotesList from '@/components/NotesList';
import NoteModal from '@/components/NoteModal';
import { Note } from '@/types/note';
import { fetchNotes, createNote, updateNote, deleteNote } from '@/lib/notesApi';

/**
 * PUBLIC_INTERFACE
 * Notes app main page component.
 */
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch notes on mount
  useEffect(() => {
    setLoading(true);
    fetchNotes()
      .then((data) => setNotes(data))
      .finally(() => setLoading(false));
  }, []);

  // Handlers
  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };
  const handleNewNote = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };
  const handleSaveNote = async (note: Partial<Note>) => {
    setLoading(true);
    let saved: Note;
    if (note.id) {
      saved = await updateNote(note as Note);
      setNotes((prev) =>
        prev.map((n) => (n.id === saved.id ? saved : n))
      );
    } else {
      saved = await createNote(note);
      setNotes((prev) => [saved, ...prev]);
    }
    setIsModalOpen(false);
    setSelectedNote(null);
    setLoading(false);
  };
  const handleDeleteNote = async (id: string) => {
    setLoading(true);
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setIsModalOpen(false);
    setSelectedNote(null);
    setLoading(false);
  };

  // Filter notes
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <NotesHeader onSearch={setSearch} onNewNote={handleNewNote} />
      <div className="flex flex-1 overflow-hidden pt-2">
        {/* Sidebar - visible on desktop */}
        <div className="hidden md:block w-56 border-r border-[#ececec] bg-white/60">
          <NotesSidebar
            notes={filteredNotes}
            onSelectNote={handleSelectNote}
            selectedNoteId={selectedNote?.id}
            onNewNote={handleNewNote}
            loading={loading}
          />
        </div>
        {/* Main area */}
        <main className="flex-1 flex flex-col items-stretch overflow-auto">
          <div className="md:hidden flex justify-end p-2">
            <button
              className="btn btn-primary"
              onClick={handleNewNote}
              aria-label="Add Note"
            >
              + New Note
            </button>
          </div>
          <div className="flex-1">
            <NotesList
              notes={filteredNotes}
              onSelectNote={handleSelectNote}
              selectedNoteId={selectedNote?.id}
              loading={loading}
            />
          </div>
        </main>
      </div>
      {/* Modal for Add/Edit Note */}
      {isModalOpen && (
        <NoteModal
          note={selectedNote}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedNote(null);
          }}
        />
      )}
    </div>
  );
}
