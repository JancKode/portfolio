# Domain Glossary

The ubiquitous language for jckfrigillana.dev. Use these terms in code, tests, issues, and commits.

## Terms

**Scroll Story** — The one-page home experience: a sequence of Sections (Hero → About → Featured Projects → Skills → Career Timeline → Contact) choreographed with scroll-triggered animation. There is exactly one Scroll Story; Case Studies and blog posts live outside it on their own pages.

**Section** — One full unit of the Scroll Story, reachable via a sticky-nav anchor.

**Hero** — The first Section: Jan's name, role, and primary CTAs (View work / Download CV).

**Hero Accent** — The deferred WebGL centerpiece that will mount inside the Hero (phase 2). Until then the Hero shows a static gradient in its reserved mount point.

**Case Study** — A deep-dive page for one professional project (Storyline, akeno.ai, Emirates Group, AICPA), structured problem → what he built → stack → impact. Authored in MDX, deep-linkable, illustrated with abstract visuals only — never proprietary screenshots.

**Featured Project card** — The card in the Scroll Story's Featured Projects Section that links to one Case Study.

**Career Timeline** — The Section rendering all seven roles (2014 → present) as a vertical line that draws itself on scroll.

**Content layer** — The typed modules and MDX files holding all CV-derived facts (profile, skills, career, Case Studies, posts). Presentation components read from it; no CV fact is hardcoded in a component.

**Seam** — The single agreed test boundary: Playwright driving the rendered pages. Tests assert visitor-visible behavior only, never component internals or animation state.
