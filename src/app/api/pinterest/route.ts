// app/api/pinterest/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get('term');
  const countryCode = searchParams.get('country_code') || 'KR';
  const limit = searchParams.get('limit') || '10';

  if (!term) {
    return NextResponse.json({ error: '검색어가 필요합니다.' }, { status: 400 });
  }

  const accessToken = process.env.PINTEREST_API_KEY;

  try {
    const pinterestRes = await fetch(
      `https://api.pinterest.com/v5/search/partner/pins?term=${encodeURIComponent(term)}&country_code=${countryCode}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    const data = await pinterestRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Pinterest 요청 실패', detail: String(error) }, { status: 500 });
  }
}
