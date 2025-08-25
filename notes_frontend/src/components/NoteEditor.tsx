"use client";

import { Note } from "@/lib/types";
import { useEffect, useState } from "react";

type NoteEditorProps = {
  note: Note | null;
  onChange: (patch: Partial<Pick<Note, "title" | "content" | "category">>) => void;
  onSave: () => void;
};

export default function NoteEditor({ note, onChange, onSave }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [category, setCategory] = useState(note?.category ?? "General");

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    setCategory(note?.category ?? "General");
  }, [note?.id, note?.title, note?.content, note?.category]);

  useEffect(() => {
    onChange({ title, content, category });
  }, [title, content, category, onChange]);

  if (!note) {
    return (
      <div className="text-sm text-gray-500">
        Select a note from the list or create a new one.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex gap-2">
        <input
          className="search-input flex-1"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
        <select
          className="search-input max-w-[200px]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Note category"
        >
          <option>General</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Ideas</option>
          <option>Archive</option>
        </select>
      </div>
      <textarea
        className="search-input flex-1 min-h-[240px] h-[50vh]"
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="Note content"
      />
      <div className="flex justify-end">
        <button className="primary-btn" onClick={onSave} aria-label="Save note">
          Save
        </button>
      </div>
    </div>
  );
}
