import Link from "next/link";
import { sections } from "@/content/sections";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          JCK
        </Link>
        <ul className="flex items-center gap-3 text-xs text-zinc-400 sm:gap-6 sm:text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={`/#${section.id}`}
                className="transition-colors hover:text-zinc-100"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
