import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: "#0B1F38",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFC107",
          fontWeight: 900,
          borderRadius: 36,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        H
      </div>
    ),
    {
      ...size,
    }
  );
}
