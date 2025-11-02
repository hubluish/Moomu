'use client';
import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        kakao_adfit_loaded?: boolean;
    }
}

const BannerResponsive: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();
        const mobile = /android|iphone|ipad|ipod|windows phone/i.test(ua);
        setIsMobile(mobile);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        if (!window.kakao_adfit_loaded) {
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
        script.charset = 'utf-8';
        document.body.appendChild(script);
        window.kakao_adfit_loaded = true;
        }

        const adUnit = isMobile
        ? 'DAN-aNYLdqldrOwstqR9'
        : 'DAN-vQqmEiX8toGowUtq';

        const width = isMobile ? 320 : 728;
        const height = isMobile ? 100 : 90;

        containerRef.current.innerHTML = `
        <ins class="kakao_ad_area" style="display:none;"
            data-ad-unit="${adUnit}"
            data-ad-width="${width}"
            data-ad-height="${height}"></ins>
        `;
    }, [isMobile]);

    return (
        <div
        ref={containerRef}
        style={{
            width: isMobile ? '320px' : '728px',
            height: isMobile ? '100px' : '90px',
            margin: '40px auto',
        }}
        />
    );
};

export default BannerResponsive;
