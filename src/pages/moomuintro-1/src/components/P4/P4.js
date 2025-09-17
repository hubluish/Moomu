import React, { useEffect, useRef } from 'react';
import SectionTitle from '../sectionTitle/SectionTitle';
import './P4.css';
import p4img from '../../images/p4.png';

const P4 = () => {
	const containerRef = useRef(null);
	const scrollerRef = useRef(null);
	const hideTimerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		const scroller = scrollerRef.current;
		if (!container || !scroller) return;

		const onWheel = (e) => {
			const dy = e.deltaY || e.wheelDelta || 0;
			if (dy === 0) return;
			// 섹션이 화면의 90% 이상 보일 때만 가로 스크롤로 전환
			const rect = container.getBoundingClientRect();
			const vh = window.innerHeight;
			const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
			const ratio = visible / Math.max(1, rect.height);
			if (ratio < 0.9) return; // 기본 스크롤 유지
			const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
			if (max === 0) return;
			const direction = dy > 0 ? 1 : -1; // 아래: 오른쪽, 위: 왼쪽
			const step = max / 5; // 5번 스크롤에 끝에 도달하도록
			const atStart = scroller.scrollLeft <= 0;
			const atEnd = Math.ceil(scroller.scrollLeft) >= max;
			// 경계에서 바깥 방향 스크롤은 기본 동작 허용
			if ((atStart && direction < 0) || (atEnd && direction > 0)) {
				return;
			}
			// 가로 이동 처리 + 스크롤 중에는 넘침 표시
			e.preventDefault();
			container.classList.add('p4-scrolling');
			const next = Math.max(0, Math.min(max, scroller.scrollLeft + direction * step));
			scroller.scrollLeft = next;
			// 스크롤 멈춘 뒤 일정 시간 후 자동 숨김
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
	}, []);

	return (
		<section className="about-section">
			<SectionTitle category="about moodboard" />
			<div className="p4-container" ref={containerRef}>
				<div className="p4-scroller" ref={scrollerRef}>
					<img className="p4-image" src={p4img} alt="p4 horizontal" />
				</div>
			</div>
		</section>
	);
};

export default P4;