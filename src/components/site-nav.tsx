import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { sections } from "@/content/sections";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-edge bg-surface backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          JCK
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <ul className="flex items-center gap-3 text-xs text-muted sm:gap-6 sm:text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <Link
                  href={`/#${section.id}`}
                  className="transition-colors hover:text-foreground"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
