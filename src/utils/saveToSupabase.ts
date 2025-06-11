// utils/saveToSupabase.ts
import { supabase } from './supabaseClient';


export async function saveToSupabase(results: any[]) {
    const array = Array.isArray(results) ? results : [results];

    for (let i = 0; i < array.length; i++) {
        const data = array[i];

        const color_keyword = data.colors;
        const font_keyword = data.font;
        const image_keyword = data.image;
        const mood_sentence = data.sentences;

        try {
        await supabase.from('moodboard_results').insert({
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
