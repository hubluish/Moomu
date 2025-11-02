import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: Request) {
    const { color, font, image } = await req.json();

    if (!color || !font || !image) {
        return new Response(JSON.stringify({ error: 'Missing required fields: color, font, image' }), { status: 400 });
    }

const prompt = `
You are a professional consultant who specializes in emotional moodboard design,
well-versed in color psychology and latest design trends,
and familiar with searchable data from ColorHunt, Pinterest, and Noonnu databases.

[Input]
Color: ${color}
Font: ${font}
Image/Emotion: ${image}

[Task]
Generate a JSON file containing 3 unique sets based on the given keywords.
Each set must include the following fields in this exact order:
colors → image → font → sentences

colors
You are a professional color palette designer.
Based on the given description, create a color palette with 4 HEX codes that best express the intended mood and atmosphere.

image
Generate one single English word representing a real, searchable image keyword that aligns with the selected mood.

font
Choose one font keyword from the following list that most closely matches the input keyword:
붓글씨, 캘리그라피, 삐뚤빼뚤, 어른 손글씨, 손글씨 바탕, 각진 손글씨, 둥근 손글씨, 장식 손글씨, 감성적인, 크레파스, 장식체, 아이 손글씨, 색연필, 필기체, 마카, 네모 폰트, 캐릭터, 별모양, 구름, 복실복실, 분필

sentences
Create three short poetic and emotional sentences (in Korean) that reflect the mood and feeling of the given keywords.
Each sentence must:
- Be around 20 Korean characters
- Never include commas (,)
- Feel like warm, intuitive lines of poetry
- Use metaphorical yet easily understandable language
- Express the emotion of the keywords without being overly literal or descriptive
- The three lines should be organically connected, forming a natural emotional flow

[Output Format Rules]
- You must output exactly 3 sets, all unique (no overlap, except for fonts if contextually appropriate)
- Each set must include: colors, image, font, and sentences
- Both colors and sentences must be arrays
- Output only the JSON content, and nothing else`;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        const match = text.match(/```json\s*([\s\S]+?)\s*```/);
        const jsonStr = match ? match[1] : text;

        const outputJson = JSON.parse(jsonStr);
        
        // console.log("파싱된 JSON 응답 : ", outputJson)

        return new Response(JSON.stringify(outputJson), { status: 200 });
    } catch (error) {
        console.error('Error calling Gemini API:', error instanceof Error ? error.message : error);
        return new Response(JSON.stringify({ error: 'Failed to call Gemini API' }), { status: 500 });
    }
}
