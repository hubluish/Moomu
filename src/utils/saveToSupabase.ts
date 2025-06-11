// utils/saveToSupabase.ts
import { request } from 'axios';
import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export async function saveToSupabase(results: any[]) {
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
}
