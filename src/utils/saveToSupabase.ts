import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

interface GeminiResponse {
    colors: string | string[];
    font: string;
    image: string;
    sentences: string | string[];
}

export async function saveToSupabase(
    results: GeminiResponse | GeminiResponse[],
    providedRequestId?: string
): Promise<string> {
    const array = Array.isArray(results) ? results : [results];
    const requestId = (providedRequestId?.trim()) || uuidv4();

    for (let i = 0; i < array.length; i++) {
        const data = array[i];

        // Postgres column color_keyword appears to be an array type.
        // Send a string array instead of a comma-joined string to avoid 22P02.
        const color_keyword = Array.isArray(data.colors)
            ? data.colors.map((c) => String(c).trim())
            : (data.colors ? String(data.colors).trim() : null);
        const font_keyword = data.font ? String(data.font).replace(/\r?\n/g, ' ').trim() : null;
        const image_keyword = data.image ? String(data.image).replace(/\r?\n/g, ' ').trim() : null;
        const mood_sentence = Array.isArray(data.sentences)
            ? data.sentences.map((s) => String(s).trim())
            : (data.sentences ? String(data.sentences).trim() : null);

        try {
            console.log('📦 insert payload:', {
                request_id: requestId,
                color_keyword,
                font_keyword,
                image_keyword,
                mood_sentence,
            });

            const { error } = await supabase.from('moodboard_results').insert({
                request_id: requestId,
                color_keyword,
                font_keyword,
                image_keyword,
                mood_sentence,
            });
            
        } catch (err) {
            console.error(`❌ 저장 실패 (index: ${i}):`, err);
        }
    }

    // 요청 식별자를 호출자에게 반환하고, 클라이언트라면 임시로 저장합니다.
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem('last_request_id', requestId);
        } catch (e) {
            console.warn('last_request_id 저장 실패', e);
        }
    }

    return requestId;
}
