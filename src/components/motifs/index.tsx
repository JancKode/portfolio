import { AicpaMotif } from "@/components/motifs/aicpa-motif";
import { AkenoMotif } from "@/components/motifs/akeno-motif";
import { EmiratesMotif } from "@/components/motifs/emirates-motif";
import { MatterworxMotif } from "@/components/motifs/matterworx-motif";
import { StorylineMotif } from "@/components/motifs/storyline-motif";

// Living motif registry, keyed by Case Study slug. Each motif abstractly
// depicts what the system does, in the brand's own tokens; the same motif
// appears on the card and the Case Study hero (one object, two sizes).
// Supersedes the old static gradient registry.
const motifs = {
  matterworx: MatterworxMotif,
  storyline: StorylineMotif,
  "akeno-ai": AkenoMotif,
  "emirates-group": EmiratesMotif,
  aicpa: AicpaMotif,
} as const;

export function BrandMotif({
  slug,
  variant,
}: {
  slug: string;
  variant: "card" | "hero";
}) {
  const Motif = motifs[slug as keyof typeof motifs];
  return Motif ? <Motif variant={variant} /> : null;
}
