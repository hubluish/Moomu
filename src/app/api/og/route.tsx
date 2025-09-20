// app/api/og/route.ts
import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function POST(req: Request) {
  const { thumbs = [], palette = [] } = await req.json() as {
    thumbs?: string[];
    palette?: string[];
  };

  const WIDTH = 455;
  const HEIGHT = 188;

  const thumbSize = 54;
  const thumbGap = 2.081;

  const swatchSize = 80;
  const swatchGap = 10;

  const targetRowHeight = 188.99;
  const rowScale = HEIGHT / targetRowHeight;

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0,0,0,0)",
          fontFamily: "Pretendard, system-ui, -apple-system, Segoe UI, Roboto, Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            transform: `scale(${rowScale})`,
            transformOrigin: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 188.574,
              height: 188.99,
              padding: 8.326,
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderRadius: 5.466,
              border: "0.208px solid #C5C2FF",
              background: "rgba(255, 255, 255, 0.05)",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: thumbGap,
                width: 188.574 - 8.326 * 2,
                height: 188.99 - 8.326 * 2,
              }}
            >
              {Array.from({ length: 9 }).map((_, i) => {
                const src = thumbs[i];
                return src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt=""
                    style={{
                      width: thumbSize,
                      height: thumbSize,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <div
                    key={i}
                    style={{
                      width: thumbSize,
                      height: thumbSize,
                      background: "#F6F5FF",
                      border: "1px solid #E4E0FF",
                      borderRadius: 8,
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: 188.574,
              height: 188.99,
              padding: 8.326,
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderRadius: 5.466,
              border: "0.208px solid #C5C2FF",
              background: "rgba(255, 255, 255, 0.05)",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: swatchGap,
                width: 188.574 - 8.326 * 2,
                height: 188.99 - 8.326 * 2,
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => {
                const c = palette[i] ?? "#EEE";
                return (
                  <div
                    key={i}
                    style={{
                      width: swatchSize,
                      height: swatchSize,
                      borderRadius: 12,
                      background: c,
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT }
  );
}
