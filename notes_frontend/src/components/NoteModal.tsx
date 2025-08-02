'use client';

import { useState, useEffect, useRef } from 'react';
import { Note } from '@/types/note';

type Props = {
  note: Note | null;
  onSave: (note: Partial<Note>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
};

/**
 * PUBLIC_INTERFACE
 * Modal dialog for creating/editing a note.
 */
export default function NoteModal({ note, onSave, onDelete, onClose }: Props) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      ...note,
      title: title.trim(),
      content: content.trim(),
    });
    setSaving(false);
  };

  // Click outside to close
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onClose]);

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center px-3 py-12">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 flex flex-col"
        ref={ref}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="p-2 border border-[#ececec] rounded text-lg font-semibold focus:border-primary"
            placeholder="Title"
            value={title}
            style={{ borderColor: '#ececec' }}
            onChange={e => setTitle(e.target.value)}
            autoFocus
            required
          />
          <textarea
            className="p-2 border border-[#ececec] rounded min-h-[100px] text-base focus:border-primary"
            placeholder="Note content..."
            value={content}
            style={{ borderColor: '#ececec' }}
            onChange={e => setContent(e.target.value)}
          />
          <div className="flex items-center justify-between mt-4">
            {note && note.id && (
              <button
                type="button"
                className="text-red-600 px-2 hover:underline"
                disabled={saving}
                onClick={() => (note.id ? onDelete(note.id) : undefined)}
              >
                Delete
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                className="btn btn-secondary px-4"
                style={{ background: '#ececec', color: '#222' }}
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4"
                style={{ background: '#4F46E5', color: '#fff' }}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
