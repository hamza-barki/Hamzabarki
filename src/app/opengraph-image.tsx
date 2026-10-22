import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Hamza Barki — Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B1F38",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative grid/line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#FFC107",
          }}
        />

        {/* Top brand header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              backgroundColor: "#FFC107",
              color: "#0B1F38",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 900,
            }}
          >
            H
          </div>
          <div
            style={{
              color: "#94A3B8",
              fontSize: "24px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Portfolio &amp; Work
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Hamza Barki
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "4px",
                backgroundColor: "#FFC107",
              }}
            />
            <div
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#FFC107",
              }}
            >
              Full-Stack Developer
            </div>
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#CBD5E1",
              maxWidth: "850px",
              lineHeight: 1.4,
              marginTop: "8px",
            }}
          >
            I build websites, online stores, web apps and custom software for businesses, schools and startups.
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              color: "#94A3B8",
              fontSize: "20px",
            }}
          >
            Direction C · Web Apps · Business Software
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#E2E8F0",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            <span>Available for selected projects</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
