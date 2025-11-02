import React, { useEffect, useRef } from 'react';
import Image from 'next/image'; // Added import
import SectionTitle from '../sectionTitle/SectionTitle';
import './P4.css';
const P4 = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollerRef = useRef<HTMLDivElement>(null);
	const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
	// 여러 이미지 파일명 배열 선언
	const images = [
		'/assets/images/p4.png',
	];

	useEffect(() => {
		const container = containerRef.current;
		const scroller = scrollerRef.current;
		if (!container || !scroller) return;

		const onWheel = (e: WheelEvent) => {
			if (!scroller || !container) return; // Check for scroller and container once

			// 실제 스크롤 가능한 거리 계산
			const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
			if (maxScroll === 0) return;

			// 화면의 90% 이상 보일 때만
			const rect = container.getBoundingClientRect();
			const vh = window.innerHeight;
			const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
			const ratio = visible / Math.max(1, rect.height);
			if (ratio < 0.9) return;

			const atStart = scroller.scrollLeft <= 0;
			const atEnd = Math.ceil(scroller.scrollLeft) >= maxScroll;
			const step = maxScroll / 5;

			if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) {
				// 경계에서 바깥 방향 스크롤은 기본 동작 허용
				return;
			}

			// 가로 이동 처리
			e.preventDefault();
			container.classList.add('p4-scrolling');
			const next = Math.max(0, Math.min(maxScroll, scroller.scrollLeft + Math.sign(e.deltaY) * step));
			scroller.scrollLeft = next;
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
			hideTimerRef.current = setTimeout(() => {
				container.classList.remove('p4-scrolling');
				hideTimerRef.current = null;
			}, 400);
		};

		container.addEventListener('wheel', onWheel, { passive: false });
		return () => {
			container.removeEventListener('wheel', onWheel);
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
		};
	}, [images.length]);

	return (
		<section className="about-section">
			<SectionTitle category="about moodboard">
				<div className="p4-container" ref={containerRef}>
					<div className="p4-scroller" ref={scrollerRef}>
						{images.map((src, idx) => (
							<Image key={idx} className="p4-image" src={src} alt={`p4 horizontal ${idx + 1}`} width={500} height={300} />
						))}
					</div>
				</div>
			</SectionTitle>
		</section>
	);
};

	export default P4;
