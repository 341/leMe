import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050508, #1a1a24)",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#f4f4f8",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          EM
        </div>
      </div>
    ),
    { ...size },
  );
}
