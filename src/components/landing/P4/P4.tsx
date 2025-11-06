import React, { useEffect, useRef } from "react";
import SectionTitle from "../sectionTitle/SectionTitle";
import "./P4.css";

const lerp = (start: number, end: number, factor: number) => {
  return start * (1 - factor) + end * factor;
};

const P4 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);

  const images = ["/assets/images/p4.png"];

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    let maxScroll = 0;
    const updateMaxScroll = () => {
      maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    };
    updateMaxScroll();

    const onWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = Math.max(
        0,
        Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
      );
      const ratio = visible / Math.max(1, rect.height);
      if (ratio < 0.9) return;

      e.preventDefault();

      targetScrollRef.current += e.deltaY;
      targetScrollRef.current = Math.max(
        0,
        Math.min(maxScroll, targetScrollRef.current)
      );
    };

    const loop = () => {
      if (Math.abs(targetScrollRef.current - currentScrollRef.current) < 0.1) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      currentScrollRef.current = lerp(
        currentScrollRef.current,
        targetScrollRef.current,
        0.08
      );

      scroller.scrollLeft = currentScrollRef.current;

      rafRef.current = requestAnimationFrame(loop);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", updateMaxScroll);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateMaxScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [images.length]);

  return (
    <section className="about-section">
      <SectionTitle category="about moodboard">
        <div className="p4-container" ref={containerRef}>
          <div className="p4-scroller" ref={scrollerRef}>
            {images.map((src, idx) => (
              <img
                key={idx}
                className="p4-image"
                src={src}
                alt={`p4 horizontal ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </SectionTitle>
    </section>
  );
};

export default P4;
