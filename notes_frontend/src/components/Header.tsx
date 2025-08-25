"use client";

type HeaderProps = {
  search: string;
  onSearchChange: (v: string) => void;
  onCreateNote: () => void;
};

export default function Header({ search, onSearchChange, onCreateNote }: HeaderProps) {
  return (
    <header className="header">
      <div className="brand">Simple Notes</div>
      <div className="flex-1" />
      <div className="w-full max-w-[520px]">
        <input
          className="search-input"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      <div className="flex-1" />
      <button className="primary-btn" onClick={onCreateNote} aria-label="Create note">
        + New Note
      </button>
    </header>
  );
}
