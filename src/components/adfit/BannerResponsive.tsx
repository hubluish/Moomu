'use client';
import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        [key: string]: (() => void) | undefined;
    }
}

const MOBILE_WIDTH = 320;
const MOBILE_HEIGHT = 100;
const PC_WIDTH = 728;
const PC_HEIGHT = 90;

const MOBILE_AD_UNIT = 'DAN-pRkvjhCBVEydrEHD';
const PC_AD_UNIT = 'DAN-tKYETg9PXwRePvPU';

type Props = {
    mobileFallbackHref?: string;
    mobileFallbackImg?: string;
    pcFallbackHref?: string;
    pcFallbackImg?: string;
    };

    export default function BannerResponsive({
    mobileFallbackHref = '#',
    mobileFallbackImg = 'data/images/adfit/fallback-mobile-banner.png',
    pcFallbackHref = '#',
    pcFallbackImg = 'data/images/adfit/fallback-pc-banner.png',
    }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const cbNameRef = useRef('kakaoOnFail_' + Math.random().toString(36).slice(2));

    useEffect(() => {
        const detect = () => {
        const ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
        const byUA = /android|iphone|ipad|ipod|windows phone/i.test(ua);
        const byVW = typeof window !== 'undefined' ? window.innerWidth <= 480 : false;
        setIsMobile(byUA || byVW);
        };
        detect();
        const onResize = () => detect();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        const cbName = cbNameRef.current;
        window[cbName] = () => {
        if (!containerRef.current) return;
        const href = isMobile ? mobileFallbackHref : pcFallbackHref;
        const img = isMobile ? mobileFallbackImg : pcFallbackImg;
        const w = isMobile ? MOBILE_WIDTH : PC_WIDTH;
        const h = isMobile ? MOBILE_HEIGHT : PC_HEIGHT;
        containerRef.current.innerHTML = `
            <a href="${href}" style="display:inline-block;width:${w}px;height:${h}px;overflow:hidden;border-radius:8px">
            <img src="${img}" alt="sponsored" style="width:100%;height:100%;object-fit:cover;display:block"/>
            </a>
        `;
        };

        const unit = isMobile ? MOBILE_AD_UNIT : PC_AD_UNIT;
        const w = isMobile ? MOBILE_WIDTH : PC_WIDTH;
        const h = isMobile ? MOBILE_HEIGHT : PC_HEIGHT;

        containerRef.current.innerHTML = `
        <ins class="kakao_ad_area" style="display:none;"
            data-ad-unit="${unit}"
            data-ad-width="${w}"
            data-ad-height="${h}"
            data-ad-onfail="${cbName}"></ins>
        `;

        const s = document.createElement('script');
        s.async = true;
        s.type = 'text/javascript';
        s.charset = 'utf-8';
        s.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
        containerRef.current.appendChild(s);
    }, [isMobile, mobileFallbackHref, mobileFallbackImg, pcFallbackHref, pcFallbackImg]);

    return (
        <div
        ref={containerRef}
        style={{
            width: isMobile ? `${MOBILE_WIDTH}px` : `${PC_WIDTH}px`,
            height: isMobile ? `${MOBILE_HEIGHT}px` : `${PC_HEIGHT}px`,
            margin: '40px auto',
        }}
        />
    );
}
