import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/site";

export const alt = `${siteConfig.name} — ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #050508 0%, #14141f 45%, #050508 100%)",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#8b5cf6",
            fontSize: 22,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Full Stack Developer
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#f4f4f8",
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            <span>Engineering </span>
            <span style={{ color: "#00e5ff" }}>Distributed </span>
            <span>Systems</span>
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.5,
              color: "#a1a1b5",
              maxWidth: 820,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #2a2a3a",
            paddingTop: 32,
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 700, color: "#f4f4f8" }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["React", "Node.js", "AWS", "Next.js"].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid #2a2a3a",
                  color: "#00e5ff",
                  fontSize: 18,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
