'use client';

import React, { useEffect, useState } from 'react';
import styles from './ColorPaletteBox.module.css';
import { getPaletteById } from '@/utils/index.js';

interface ColorPaletteBoxProps {
    colorKeywords: string[];
}

export default function ColorPaletteBox({ colorKeywords }: ColorPaletteBoxProps) {
    const [hexCodes, setHexCodes] = useState<string[][]>([]);

    useEffect(() => {
        async function fetchPalettes() {
            const allHexCodes: string[][] = [];
            const safeKeywords = Array.isArray(colorKeywords) ? colorKeywords : [];
            for (const keyword of safeKeywords) {
                try {
                    const fileName = `/data/colorhunt_colors/${encodeURIComponent(keyword.toLowerCase())}.json`;
                    const res = await fetch(fileName);
                    if (!res.ok) continue;
                    const palettes = await res.json();
                    if (!Array.isArray(palettes) || palettes.length === 0) continue;

                    // palettes는 id string 배열임
                    const paletteId = palettes[0];
                    const paletteData = getPaletteById(paletteId);
                    if (!paletteData) continue;

                    const codes = [];
                    for (let i = 0; i < 24; i += 6) {
                        const hex = paletteData.code.slice(i, i + 6);
                        if (hex.length === 6) codes.push(`#${hex}`);
                    }
                    allHexCodes.push(codes);
                    break; // 첫 번째로 찾은 팔레트만 사용
                } catch (e) {
                    console.error(`Error fetching palette for ${keyword}:`, e);
                    continue;
                }
            }
            setHexCodes(allHexCodes);
        }
        fetchPalettes();
    }, [colorKeywords]);

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
