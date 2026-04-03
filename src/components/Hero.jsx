import { useEffect, useRef, useState } from 'react';
import Stats from './Stats';

const PARTICLES_COUNT = 24;

function generateParticles() {
  const types = ['dot', 'ring', 'glow'];
  return Array.from({ length: PARTICLES_COUNT }, (_, i) => {
    const type = types[i % 3];
    const baseSize = type === 'glow' ? 8 + Math.random() * 12 : 2 + Math.random() * 4;
    return {
      id: i,
      type,
      left: `${Math.random() * 100}%`,
      animDuration: `${8 + Math.random() * 12}s`,
      animDelay: `${Math.random() * 8}s`,
      size: `${baseSize}px`,
    };
  });
}

const particles = generateParticles();
const HEADLINE_TEXT = 'WELCOME ITZFIZZ';

export default function Hero() {
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const accentRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lettersRef = useRef([]);

  // Entrance animations
  useEffect(() => {
    // Letter-by-letter fade in
    lettersRef.current.forEach((letter, i) => {
      if (!letter) return;
      letter.style.opacity = '0';
      letter.style.transform = 'translateY(30px) rotateX(40deg)';
      letter.style.transition = `opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${0.15 + i * 0.04}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.15 + i * 0.04}s`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          letter.style.opacity = '1';
          letter.style.transform = 'translateY(0) rotateX(0deg)';
        });
      });
    });

    // Subline entrance
    if (sublineRef.current) {
      sublineRef.current.style.opacity = '0';
      sublineRef.current.style.transform = 'translateY(20px)';
      sublineRef.current.style.transition =
        'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.6s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.6s';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          sublineRef.current.style.opacity = '1';
          sublineRef.current.style.transform = 'translateY(0)';
        });
      });
    }

    // Accent line entrance
    if (accentRef.current) {
      accentRef.current.style.opacity = '0';
      accentRef.current.style.transform = 'scaleX(0)';
      accentRef.current.style.transition =
        'opacity 0.6s ease 0.75s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.75s';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          accentRef.current.style.opacity = '1';
          accentRef.current.style.transform = 'scaleX(1)';
        });
      });
    }
  }, []);

  // Scroll-based hero parallax
  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply parallax to hero content via rAF
  useEffect(() => {
    if (!contentRef.current) return;
    const parallaxY = scrollProgress * 60;
    const opacity = 1 - scrollProgress * 1.2;
    contentRef.current.style.transform = `translateY(${parallaxY}px)`;
    contentRef.current.style.opacity = Math.max(opacity, 0).toString();
  }, [scrollProgress]);

  return (
    <section className="hero" id="hero">
      {/* Premium gradient background */}
      <div className="hero__bg" />

      {/* Subtle rotating gradient */}
      <div className="hero__gradient-anim" />

      {/* Noise texture */}
      <div className="hero__noise" />

      {/* Floating particles — mixed types */}
      <div className="hero__particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`hero__particle hero__particle--${p.type}`}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.animDuration,
              animationDelay: p.animDelay,
            }}
          />
        ))}
      </div>

      {/* Content with parallax */}
      <div className="hero__content" ref={contentRef}>
        <h1 className="hero__headline" ref={headlineRef} id="hero-headline">
          <div className="hero__headline-line">
            {'WELCOME'.split('').map((char, i) => (
              <span key={i} className="hero__letter" ref={(el) => (lettersRef.current[i] = el)}>
                {char}
              </span>
            ))}
          </div>
          <div className="hero__headline-line">
            {'ITZFIZZ'.split('').map((char, i) => (
              <span key={i + 7} className="hero__letter" ref={(el) => (lettersRef.current[i + 7] = el)}>
                {char}
              </span>
            ))}
          </div>
        </h1>
        <p className="hero__subline" ref={sublineRef}>
          Scroll-Driven Motion · Performance First · Zero Dependencies
        </p>
        <div className="hero__accent-line" ref={accentRef} />
        <Stats />
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint">
        <span>Scroll</span>
        <div className="hero__scroll-hint-line" />
        <div className="hero__scroll-hint-arrow" />
      </div>
    </section>
  );
}
