import { useEffect, useRef, useState } from 'react';

/**
 * Multi-stage scroll mapping:
 *   0.00 → 0.30  =  intro (car enters, accelerates)
 *   0.30 → 0.70  =  main motion (full speed)
 *   0.70 → 1.00  =  slow finish (decelerates)
 */
function mapScrollToPosition(progress) {
  if (progress <= 0.3) {
    const t = progress / 0.3;
    return t * t * 0.3;
  } else if (progress <= 0.7) {
    const t = (progress - 0.3) / 0.4;
    return 0.3 + t * 0.5;
  } else {
    const t = (progress - 0.7) / 0.3;
    return 0.8 + (1 - Math.pow(1 - t, 2)) * 0.2;
  }
}

export default function Car() {
  const [target, setTarget] = useState(0);
  const current = useRef(0);
  const velocity = useRef(0);
  const carRef = useRef(null);
  const glowRef = useRef(null);
  const speedRef = useRef(null);
  const shadowRef = useRef(null);
  const headlightRef = useRef(null);
  const exhaustRef = useRef(null);
  const progressRef = useRef(null);
  const trackRef = useRef(null);

  // Listen to scroll and compute normalized progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const rawProgress = Math.min(scrollY / maxScroll, 1);
      const mappedProgress = mapScrollToPosition(rawProgress);
      setTarget(mappedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth interpolation via rAF — with rotation & scale
  useEffect(() => {
    let raf;

    const animate = () => {
      const prevVal = current.current;
      current.current += (target - current.current) * 0.06;

      if (Math.abs(target - current.current) < 0.0001) {
        current.current = target;
      }

      velocity.current = current.current - prevVal;

      const translateX = current.current * 85;
      const scale = 0.75 + current.current * 0.35;
      const rotation = velocity.current * 120;
      const clampedRotation = Math.max(-3, Math.min(3, rotation));

      if (carRef.current) {
        carRef.current.style.transform =
          `translateX(${translateX}vw) scale(${scale}) rotate(${clampedRotation}deg)`;
      }
      if (shadowRef.current) {
        const shadowScale = scale * 1.2;
        shadowRef.current.style.transform =
          `translateX(${translateX + 1}vw) scaleX(${shadowScale}) scaleY(${0.8 + current.current * 0.3})`;
      }
      if (glowRef.current) {
        const glowOpacity = Math.min(Math.abs(velocity.current) * 80, 0.9);
        glowRef.current.style.transform = `translateX(${translateX - 3}vw) scale(${scale})`;
        glowRef.current.style.opacity = Math.max(0.2, glowOpacity).toString();
      }
      if (headlightRef.current) {
        headlightRef.current.style.transform = `translateX(${translateX + 5}vw) scale(${scale})`;
        headlightRef.current.style.opacity = (0.4 + current.current * 0.4).toString();
      }
      if (speedRef.current) {
        speedRef.current.style.transform = `translateX(${translateX - 5}vw) scale(${scale})`;
      }
      if (exhaustRef.current) {
        exhaustRef.current.style.transform = `translateX(${translateX - 2}vw) scale(${scale})`;
      }
      if (progressRef.current) {
        progressRef.current.style.width = `${current.current * 100}%`;
      }

      const delta = Math.abs(velocity.current);
      if (trackRef.current) {
        if (delta > 0.0008) {
          trackRef.current.classList.add('car-track--moving');
        } else {
          trackRef.current.classList.remove('car-track--moving');
        }
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <div className="car-track" ref={trackRef} id="car-track">
      {/* Road */}
      <div className="car-track__road">
        <div className="car-track__road-edge" />
      </div>

      {/* Speed lines */}
      <div className="car-track__speed-lines" ref={speedRef}>
        <div className="car-track__speed-line" />
        <div className="car-track__speed-line" />
        <div className="car-track__speed-line" />
      </div>

      {/* Exhaust particles */}
      <div className="car-track__exhaust" ref={exhaustRef}>
        <div className="car-track__exhaust-dot" />
        <div className="car-track__exhaust-dot" />
        <div className="car-track__exhaust-dot" />
      </div>

      {/* Glow trail */}
      <div className="car-track__glow" ref={glowRef} />

      {/* Headlight beam */}
      <div className="car-track__headlight" ref={headlightRef} />

      {/* Shadow under car */}
      <div className="car-track__shadow" ref={shadowRef} />

      {/* Vehicle */}
      <div className="car-track__vehicle" ref={carRef}>
        <img src="/car.png" alt="Sports car driven by scroll" />
      </div>

      {/* Progress bar */}
      <div className="car-track__progress" ref={progressRef} />
    </div>
  );
}
//
