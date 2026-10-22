import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "#0B1F38",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFC107",
          fontWeight: 900,
          borderRadius: 6,
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
