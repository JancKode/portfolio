import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { siteUrl } from "@/content/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The social card: dark-first, on the Hero's gradient language.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(99,102,241,0.35), #0a0a0a 70%), #0a0a0a",
          color: "#ededed",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.15 }}>
          {profile.name}
        </div>
        <div style={{ marginTop: 28, fontSize: 36, color: "#a1a1aa" }}>
          {`${profile.role} · ${profile.focus}`}
        </div>
        <div style={{ marginTop: 56, fontSize: 28, color: "#71717a" }}>
          {new URL(siteUrl).hostname}
        </div>
      </div>
    ),
    size,
  );
}
