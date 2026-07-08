import { profile } from "@/content/profile";

const links = [
  { label: "GitHub", href: profile.githubUrl },
  { label: "LinkedIn", href: profile.linkedinUrl },
  { label: "Email", href: `mailto:${profile.email}` },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-24">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Contact
      </h2>
      <p className="mt-4 max-w-xl text-muted">
        Open to senior roles in AI systems and automation. The fastest way to
        reach me is email.
      </p>
      <ul className="mt-8 flex flex-wrap gap-4">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-block rounded-full border border-edge px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-edge-strong"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
