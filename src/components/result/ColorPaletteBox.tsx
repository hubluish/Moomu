'use client';

import React, { useEffect, useState } from 'react';
import styles from './ColorPaletteBox.module.css';
import { getPaletteById } from '@/utils/index.js';

interface ColorPaletteBoxProps {
    colorKeywords: string[];
}

interface PaletteInfo {
    id: string;
}

export default function ColorPaletteBox({ colorKeywords }: ColorPaletteBoxProps) {
    const [hexCodes, setHexCodes] = useState<string[][]>([]); // [[#xxxxxx, ...], [#yyyyyy, ...], ...]

    useEffect(() => {
        async function fetchPalettes() {
            const allHexCodes: string[][] = [];
            // colorKeywords가 배열이 아니면 빈 배열로 대체
            const safeKeywords = Array.isArray(colorKeywords) ? colorKeywords : [];
            // 키워드 우선순위 순서대로 시도
            for (const keyword of safeKeywords) {
                try {
                    const fileName = `/data/colorhunt_colors/${encodeURIComponent(keyword.toLowerCase())}.json`;
                    const res = await fetch(fileName);
                    if (!res.ok) {
                        continue;
                    }
                    const palettes = await res.json();
                    if (!Array.isArray(palettes)) continue;
                    
                    // 첫 번째 팔레트만 사용
                    const palette = palettes[0];
                    if (!palette?.id) continue;
                    
                    const paletteData = getPaletteById(palette.id);
                    if (!paletteData) continue;
                    
                    const codes = [];
                    for (let i = 0; i < 24; i += 6) {
                        const hex = paletteData.code.slice(i, i + 6);
                        if (hex.length === 6) codes.push(`#${hex}`);
                    }
                    allHexCodes.push(codes);
                    
                    // 첫 번째로 찾은 팔레트만 사용하고 종료
                    break;
                } catch (e) {
                    console.error(`Error fetching palette for ${keyword}:`, e);
                    continue;
                }
            }
            setHexCodes(allHexCodes);
        }
        fetchPalettes();
    }, [colorKeywords]);

    // 클릭 시 복사
    const handleCopy = (hex: string) => {
        navigator.clipboard.writeText(hex);
        alert(`${hex}가 복사되었습니다!`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>Color Palette</div>
            <div className={styles.content}>
                {hexCodes.length === 0 ? (
                    <div>팔레트가 없습니다.</div>
                ) : (
                    hexCodes.map((palette, idx) => (
                        <div key={idx} style={{ display: 'flex', marginBottom: 8 }}>
                            {palette.map((hex, i) => (
                                <div
                                    key={hex}
                                    className={styles.colorBlock}
                                    style={{ backgroundColor: hex, cursor: 'pointer' }}
                                    onClick={() => handleCopy(hex)}
                                >
                                    <span className={styles.colorCode}>{hex}</span>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
