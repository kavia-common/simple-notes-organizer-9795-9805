'use client';

type Props = {
  onSearch: (query: string) => void;
  onNewNote: () => void;
};

/**
 * PUBLIC_INTERFACE
 * Fixed header for notes app containing brand and search bar.
 */
export default function NotesHeader({ onSearch, onNewNote }: Props) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#ececec] bg-white/80 sticky top-0 z-10 shadow-sm">
      <div className="font-bold text-xl tracking-tight text-primary select-none" style={{ color: '#4F46E5' }}>
        simple.<span style={{ color: '#F59E42' }}>notes</span>
      </div>
      <div className="flex gap-2 items-center">
        <input
          aria-label="Search notes"
          type="search"
          placeholder="Search"
          onChange={e => onSearch(e.target.value)}
          className="rounded border border-[#ddd] px-3 py-1 outline-none transition focus:border-primary text-base w-40 max-w-xs bg-white"
          style={{ borderColor: '#ddd', color: '#222' }}
        />
        <button
          className="btn btn-primary hidden md:inline-block"
          style={{ backgroundColor: '#4F46E5', color: '#fff' }}
          onClick={onNewNote}
        >
          + New Note
        </button>
      </div>
    </header>
  );
}
