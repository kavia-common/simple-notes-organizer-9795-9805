'use client';

import { Note } from '@/types/note';
import { format } from 'date-fns';

type Props = {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  selectedNoteId?: string;
  loading?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * Main area list/grid of notes for quick selection (used on mobile and desktop).
 */
export default function NotesList({
  notes,
  onSelectNote,
  selectedNoteId,
  loading,
}: Props) {
  return (
    <div className="h-full flex flex-col p-3 overflow-y-auto min-h-[60vh]">
      {loading ? (
        <div className="text-gray-400 py-8 text-center">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="text-gray-400 py-8 text-center">No notes to show.</div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`rounded border border-[#ececec] bg-white/90 shadow-md p-4 hover:border-primary cursor-pointer transition ${
                selectedNoteId === note.id ? 'ring-2 ring-primary' : ''
              }`}
              style={{
                borderColor: selectedNoteId === note.id ? '#4F46E5' : '#ececec',
              }}
              onClick={() => onSelectNote(note)}
              tabIndex={0}
              aria-label={`Note: ${note.title || 'Untitled'}`}
            >
              <div className="font-semibold text-lg text-primary truncate" style={{ color: '#4F46E5' }}>
                {note.title || <span className="italic text-gray-400">Untitled</span>}
              </div>
              <p className="mt-1 text-sm text-gray-800 line-clamp-3 min-h-[2.5em]">{note.content || <span className="italic text-gray-400">No content</span>}</p>
              <div className="text-xs text-right text-gray-500 mt-2">{format(new Date(note.updated_at), 'MMM d, yyyy')}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
