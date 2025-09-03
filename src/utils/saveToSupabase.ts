// utils/saveToSupabase.ts
import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

interface GeminiResponse {
    colors?: string;
    color_keywords?: string;
    color?: string;
    font?: string;
    image?: string;
    sentences?: string;
    mood_sentence?: string;
    mood?: string;
}

export async function saveToSupabase(results: GeminiResponse | GeminiResponse[]): Promise<string> {
    const array = Array.isArray(results) ? results : [results];
    const requestId = uuidv4();

    for (let i = 0; i < array.length; i++) {
        const data = array[i];

        const color_keyword = data.colors ?? data.color_keywords ?? data.color;
        const font_keyword = data.font;
        const image_keyword = data.image;
        const mood_sentence = data.sentences ?? data.mood_sentence ?? data.mood;

        try {
            console.log('📦 insert payload:', {
                request_id: requestId,
                color_keyword,
                font_keyword,
                image_keyword,
                mood_sentence,
            });

            await supabase.from('moodboard_results').insert({
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
