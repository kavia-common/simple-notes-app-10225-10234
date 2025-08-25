"use client";

import { Note } from "@/lib/types";

type NotesListProps = {
  notes: Note[];
  activeId?: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

function formatDate(ts: number) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return "";
  }
}

export default function NotesList({ notes, activeId, onSelect, onDelete }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No notes yet. Create your first note to get started.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {notes.map((n) => {
        const isActive = n.id === activeId;
        return (
          <li
            key={n.id}
            className={`note-item ${isActive ? "ring-1 ring-[--color-primary]" : ""}`}
            onClick={() => onSelect(n.id)}
            role="button"
            aria-label={`Open note ${n.title || "Untitled"}`}
          >
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[15px] font-medium text-gray-800 truncate">
                    {n.title || "Untitled"}
                  </h3>
                  <span className="badge">{n.category}</span>
                </div>
                <p className="text-[13px] text-gray-600 line-clamp-2 mt-1">
                  {n.content || "No content"}
                </p>
                <div className="text-[12px] text-gray-500 mt-2">
                  Updated {formatDate(n.updatedAt)}
                </div>
              </div>
              <button
                className="secondary-btn text-[12px]"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(n.id);
                }}
                aria-label="Delete note"
                title="Delete note"
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
