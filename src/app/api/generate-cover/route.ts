// app/api/generate-cover/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // 서버 전용 키
    );

    export async function POST(req: Request) {
    const body = await req.json() as {
        boardId: string;
        categories: string[];
        thumbs: string[];
        palette: string[];
    };

    // 1) /api/og 호출 (요청 origin 기준으로 안전하게 구성)
    const origin = new URL(req.url).origin;
    const base = process.env.NEXT_PUBLIC_BASE_URL || origin;
    const baseUrl = base.replace('localhost', '127.0.0.1');
    let ogRes: Response;
    try {
      ogRes = await fetch(`${baseUrl}/api/og`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        categories: body.categories,
        thumbs: body.thumbs,
        palette: body.palette,
        }),
        cache: "no-store",
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return NextResponse.json({ error: `OG fetch failed: ${message}` }, { status: 500 });
    }

    if (!ogRes.ok) {
        return NextResponse.json({ error: "OG render failed" }, { status: 500 });
    }

    const buf = Buffer.from(await ogRes.arrayBuffer());

    // 2) Supabase Storage 업로드
    const path = `covers/${body.boardId}.webp`;
    const { error: uploadError } = await supabase.storage
        .from("moodboard")
        .upload(path, buf, {
        contentType: "image/webp",
        upsert: true,
        cacheControl: "31536000, immutable",
        });

    if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // 3) Public URL
    const { data: pub } = supabase.storage.from("moodboard").getPublicUrl(path);
    const coverUrl = pub.publicUrl;

    // 4) DB 업데이트
    const { error: updateError } = await supabase
        .from("moodboard")
        .update({ cover_image_url: coverUrl })
        .eq("id", body.boardId);

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ cover_image_url: coverUrl });
    }
