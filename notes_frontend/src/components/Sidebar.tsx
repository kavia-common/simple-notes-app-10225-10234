"use client";

type SidebarProps = {
  categories: { name: string; count: number }[];
  active: string;
  onSelect: (name: string) => void;
};

export default function Sidebar({ categories, active, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Categories</div>
      <div className="flex flex-col gap-2">
        {categories.map((cat) => {
          const selected = cat.name === active;
          return (
            <button
              key={cat.name}
              className={`category-btn ${selected ? "active" : ""}`}
              onClick={() => onSelect(cat.name)}
              aria-pressed={selected}
              aria-label={`Category ${cat.name}`}
            >
              <div className="flex items-center justify-between">
                <span>{cat.name}</span>
                <span className="badge">
                  <span className="badge-dot" />
                  {cat.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
