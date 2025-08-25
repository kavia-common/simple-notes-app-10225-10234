"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import { storage } from "@/lib/storage";
import { Note } from "@/lib/types";
import { useDebouncedValue } from "@/lib/hooks";

type Category = "All" | "General" | "Work" | "Personal" | "Ideas" | "Archive";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 250);
  const [category, setCategory] = useState<Category>("All");
  const [draft, setDraft] = useState<Partial<Pick<Note, "title" | "content" | "category">>>({});

  // Load list (depends on search and category)
  const refresh = async () => {
    const list = await storage.listNotes(debouncedSearch, category === "All" ? undefined : category);
    setNotes(list);
    // if activeNoteId missing (deleted or filtered), adjust
    if (activeNoteId && !list.some((n) => n.id === activeNoteId)) {
      setActiveNoteId(list[0]?.id ?? null);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, category]);

  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeNoteId) ?? null,
    [notes, activeNoteId]
  );

  const categories = useMemo(() => {
    const base: Category[] = ["All", "General", "Work", "Personal", "Ideas", "Archive"];
    const counts: Record<string, number> = { All: notes.length };
    for (const n of notes) {
      counts[n.category] = (counts[n.category] ?? 0) + 1;
    }
    return base.map((name) => ({
      name,
      count: name === "All" ? (counts["All"] ?? 0) : (counts[name] ?? 0),
    }));
  }, [notes]);

  const onCreateNote = async () => {
    const newNote = await storage.createNote({ title: "Untitled", content: "", category: category === "All" ? "General" : category });
    await refresh();
    setActiveNoteId(newNote.id);
  };

  const onDeleteNote = async (id: string) => {
    if (confirm("Delete this note? This action cannot be undone.")) {
      await storage.deleteNote(id);
      await refresh();
    }
  };

  const onSaveNote = async () => {
    if (!activeNote) return;
    await storage.updateNote(activeNote.id, {
      title: draft.title ?? activeNote.title,
      content: draft.content ?? activeNote.content,
      category: draft.category ?? activeNote.category,
    });
    await refresh();
  };

  return (
    <main className="min-h-screen">
      <Header search={search} onSearchChange={setSearch} onCreateNote={onCreateNote} />
      <div className="layout">
        <Sidebar
          categories={categories}
          active={category}
          onSelect={(c) => setCategory(c as Category)}
        />
        <section className="content">
          <div className="panel">
            <div className="panel-title">Your Notes</div>
            <NotesList
              notes={notes}
              activeId={activeNoteId}
              onSelect={setActiveNoteId}
              onDelete={onDeleteNote}
            />
          </div>
          <div className="panel">
            <div className="panel-title">Editor</div>
            <NoteEditor
              note={activeNote}
              onChange={setDraft}
              onSave={onSaveNote}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
