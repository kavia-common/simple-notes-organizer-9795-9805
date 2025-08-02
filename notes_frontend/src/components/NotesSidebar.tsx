'use client';

import { Note } from '@/types/note';
import { format } from 'date-fns';

type Props = {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  selectedNoteId?: string;
  onNewNote: () => void;
  loading?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * Sidebar on desktop to show note summary list and create new note.
 */
export default function NotesSidebar({
  notes,
  onSelectNote,
  selectedNoteId,
  onNewNote,
  loading,
}: Props) {
  return (
    <aside className="h-full flex flex-col">
      <button
        className="m-3 mb-2 rounded px-4 py-2 bg-primary text-white font-semibold hover:bg-secondary transition"
        style={{ background: '#4F46E5', color: '#fff' }}
        onClick={onNewNote}
      >
        + New Note
      </button>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="px-3 py-6 text-gray-400">Loading...</div>
        ) : notes.length === 0 ? (
          <div className="px-3 py-6 text-gray-400">No notes found.</div>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <button
                  className={`block px-4 py-3 w-full text-left rounded mb-1 hover:bg-secondary/30 ${
                    selectedNoteId === note.id ? 'bg-accent/30' : ''
                  }`}
                  style={{
                    background: selectedNoteId === note.id ? '#F8E9D8' : undefined,
                  }}
                  onClick={() => onSelectNote(note)}
                >
                  <div className="font-bold text-sm truncate">{note.title || <span className="italic text-gray-400">Untitled</span>}</div>
                  <div className="text-xs text-gray-500">{format(new Date(note.updated_at), 'MMM d, yyyy h:mma')}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
