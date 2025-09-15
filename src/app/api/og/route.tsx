// app/api/og/route.ts
import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function POST(req: Request) {
  const { categories = [], thumbs = [], palette = [] } = await req.json() as {
    categories?: string[];
    thumbs?: string[];  // 최대 9장 사용
    palette?: string[]; // 최대 4개 사용
  };

  // Pretendard 쓰려면 주석 해제해서 폰트 임베드 (선택)
  // const fontData = await fetch(new URL("/fonts/Pretendard-Medium.ttf", import.meta.url)).then(r=>r.arrayBuffer());

  // 사이즈는 카드 원본 규격에 맞춤
  const WIDTH = 455;
  const HEIGHT = 276; // 275.534 반올림

  // 3x3 썸네일(54x54), gap 2.081 반영
  const thumbSize = 54;
  const thumbGap = 2.081;

  // 팔레트 2x2(80x80), gap 10
  const swatchSize = 80;
  const swatchGap = 10;

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 13.665,
          gap: 19.131,
          borderRadius: 27.33,
          border: "0.911px solid #C5C2FF",
          background: "rgba(0,0,0,0)",
          boxShadow: "0 3.644px 3.644px rgba(0,0,0,0.25)",
          // 폰트 기본값
          fontFamily: "Pretendard, system-ui, -apple-system, Segoe UI, Roboto, Arial",
        }}
      >
        {/* 상단: 카테고리 배지 영역 */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: 8, // 배지 사이 간격은 살짝 여유
            justifyContent: "flex-start",
          }}
        >
          {(categories ?? []).slice(0, 6).map((cat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 97.5,
                height: 40.083,
                padding: 7.288,
                justifyContent: "center",
                alignItems: "center",
                gap: 7.288,
                flexShrink: 0,
                borderRadius: 18.22,
                border: "1px solid #8865F3",
                background: "#FFF",
              }}
            >
              <span
                style={{
                  color: "#8865F3",
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {cat}
              </span>
            </div>
          ))}
        </div>

        {/* 하단: 좌우 컨테이너 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 188.99,
            padding: 8.326,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* 좌: 3x3 이미지 그리드 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: 172.339,
              height: 172.339,
              
              flexShrink: 0,
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => {
              const src = thumbs[i];
              return src ? (
                <img
                  key={i}
                  src={src}
                  style={{
                    width: thumbSize,
                    height: thumbSize,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              ) : (
                // 썸네일 부족할 때 빈칸(연보라 테두리)
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

          {/* 우: 2x2 팔레트 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              
              gap: swatchGap,
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
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      // fonts: [{ name: "Pretendard", data: fontData, weight: 500, style: "normal" }],
    }
  );
}
