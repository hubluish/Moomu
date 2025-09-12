import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const { color, font, image } = req.body;

  if (!color || !font || !image) {
    return res.status(400).json({ error: 'Missing required fields: color, font, image' });
  }

  const prompt = `
당신은 최신 디자인 트렌드와 색채 심리학에 정통하며, ColorHunt, Pinterest, Noonnu 데이터베이스에서 실제 검색 가능한 키워드를 기반으로 감성 무드보드를 기획하는 전문 컨설턴트입니다.

[입력]
색상: ${color}
폰트: ${font}
이미지/감정: ${image}

[요청사항]
키워드 기반으로 총 3세트를 json 파일로 응답할 것

각 세트는 아래 항목 포함 (순서: 색상 → 이미지 → 폰트 → 문장)

colors: 분위기에 어울리는 헥사 코드 4개

image: 선택된 무드에 맞는 2~3 단어로 된 실제 검색 가능한 이미지 키워드 1개

font: 폰트 키워드 (제공 리스트 중 입력 키워드와 유사한 단어 1개 선택)

선택 가능한 폰트 키워드 리스트:  
붓글씨, 캘리그라피, 삐뚤빼뚤, 어른 손글씨, 손글씨 바탕, 각진 손글씨, 둥근 손글씨, 장식 손글씨, 감성적인, 크레파스, 장식체, 아이 손글씨, 색연필, 필기체, 마카, 네모 폰트, 캐릭터, 별모양, 구름, 복실복실, 분필

sentences: 입력된 키워드들의 분위기와 감정을 반영하여, 감성적이고 시적인 짧은 문장 3개를 만들 것.  
- 각 문장은 15자 이내, 문장 내 쉼표 절대 포함하지 말 것
- 시 구절처럼 따뜻하고 직관적으로 표현할 것  
- 은유적이면서도 이해하기 쉬운 표현  
- 키워드의 감성을 직접적으로 드러내되, 너무 설명적이지 않고 감각적으로 쓸 것  

기존 프롬프트 구조(3세트, JSON 파일로 출력) 반드시 유지  
결과 외 다른 말 절대 출력 금지

각 항목의 제목은 다음으로 설정:
colors, image, font, sentences

모든 세트는 겹치지 않도록 구성(폰트 제외), colors와 sentences는 배열로 구성할 것
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Extract JSON from the response
    const match = text.match(/```json\s*([\s\S]+?)\s*```/);
    const jsonStr = match ? match[1] : text;

    const outputJson = JSON.parse(jsonStr);
    
    console.log("파싱된 JSON 응답 : ", outputJson)

    return res.status(200).json(outputJson);
  } catch (error) {
    console.error('Error calling Gemini API:', error instanceof Error ? error.message : error);
    return res.status(500).json({ error: 'Failed to call Gemini API' });
  }
}
