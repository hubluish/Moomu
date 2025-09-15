import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const per_page = searchParams.get('per_page') ?? '9';
    const page = searchParams.get('page') ?? '1';
    const orientation = searchParams.get('orientation') ?? '';
    const color = searchParams.get('color') ?? '';

    if (!q) return NextResponse.json({ error: 'Missing q (query)' }, { status: 400 });

    const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'PEXELS_API_KEY not set' }, { status: 500 });

    const url = new URL('https://api.pexels.com/v1/search');
    url.searchParams.set('query', q);
    url.searchParams.set('per_page', per_page);
    url.searchParams.set('page', page);
    if (orientation) url.searchParams.set('orientation', orientation);
    if (color) url.searchParams.set('color', color);

    const upstream = await fetch(url.toString(), {
        headers: { Authorization: apiKey },
    });

    if (!upstream.ok) {
        const text = await upstream.text().catch(() => '');
        return NextResponse.json({ error: text.slice(0, 500) }, { status: upstream.status });
    }

    const data = await upstream.json();

    const photos = (data?.photos ?? [])
        .map((p: any) => ({
        thumbnail_url: p?.src?.medium ?? '',
        pin_url: p?.url ?? '',
        alt: p?.alt ?? '',
        photographer: p?.photographer ?? '',
        photographer_url: p?.photographer_url ?? '',
        }))
        .filter((i: any) => i.thumbnail_url && i.pin_url);

    const res = NextResponse.json({
        photos,
        page: data.page,
        per_page: data.per_page,
        total_results: data.total_results,
        next_page: data.next_page ?? null,
        prev_page: data.prev_page ?? null,
    });

    res.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
    const remain = upstream.headers.get('X-Ratelimit-Remaining');
    const reset = upstream.headers.get('X-Ratelimit-Reset');
    if (remain) res.headers.set('X-Ratelimit-Remaining', remain);
    if (reset) res.headers.set('X-Ratelimit-Reset', reset);

    return res;
}
