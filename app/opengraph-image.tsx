import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ReserveDaily — Reserve Your Path to Wellness";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/favicon-dark.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a2659",
          padding: "60px",
        }}
      >
        <img src={logoSrc} style={{ width: 180, height: 180, marginBottom: 40 }} />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          ReserveDaily
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#f0a028",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Reserve Your Path to Wellness
        </div>
      </div>
    ),
    { ...size }
  );
}
