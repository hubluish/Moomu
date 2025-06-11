// utils/saveToSupabase.ts
import { supabase } from './supabaseClient';

interface MoodboardData {
    color: string;
    font: string;
    image: string;
    sentences: string;
}

export async function saveToSupabase(data: MoodboardData | MoodboardData[]) {
    console.log('%c📦 저장할 데이터:', 'color: blue; font-weight: bold;', data);
    const array = Array.isArray(data) ? data : [data];

    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        console.log('%c📝 처리 중인 데이터:', 'color: blue; font-weight: bold;', item);

        const color_keyword = item.color || '';
        const font_keyword = item.font || '';
        const image_keyword = item.image || '';
        const mood_sentence = item.sentences || '';

        console.log('%c🔍 변환된 데이터:', 'color: blue; font-weight: bold;', {
            color_keyword,
            font_keyword,
            image_keyword,
            mood_sentence
        });

        try {
            const { data: insertData, error } = await supabase.from('moodboard_results').insert({
                color_keyword,
                font_keyword,
                image_keyword,
                mood_sentence,
            });
            
            if (error) {
                console.error(`❌ Supabase 저장 실패 (index: ${i}):`, error);
                throw error;
            }
            
            console.log(`✅ 저장 성공 (index: ${i}):`, insertData);
        } catch (err) {
            console.error(`❌ 저장 실패 (index: ${i}):`, err);
            throw err;
        }
    }
}
