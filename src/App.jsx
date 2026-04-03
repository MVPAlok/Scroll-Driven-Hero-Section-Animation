import { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Car from './components/Car';
import './index.css';

/* ── SVG Icon Components ── */
const IconScrollTracking = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="20" height="24" rx="3" stroke="#00e676" strokeWidth="1.5" />
    <line x1="11" y1="11" x2="21" y2="11" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="11" y1="15" x2="21" y2="15" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="11" y1="19" x2="17" y2="19" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <circle cx="16" cy="28" r="1.5" fill="#00e676" opacity="0.8" />
    <path d="M13 7L16 4L19 7" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconInterpolation = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 26C4 26 10 20 16 14C22 8 28 6 28 6" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="4" cy="26" r="2.5" stroke="#00e676" strokeWidth="1.5" fill="none" />
    <circle cx="28" cy="6" r="2.5" stroke="#00e676" strokeWidth="1.5" fill="none" />
    <circle cx="16" cy="14" r="2" fill="#00e676" opacity="0.6" />
    <line x1="16" y1="14" x2="16" y2="22" stroke="#00e676" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
  </svg>
);

const IconRAF = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="12" stroke="#00e676" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="3" fill="#00e676" opacity="0.5" />
    <line x1="16" y1="16" x2="16" y2="8" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="16" x2="22" y2="12" stroke="#00e676" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="16" y1="4" x2="16" y2="6" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <line x1="28" y1="16" x2="26" y2="16" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <line x1="16" y1="28" x2="16" y2="26" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <line x1="4" y1="16" x2="6" y2="16" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const IconGPU = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="8" width="22" height="16" rx="2" stroke="#00e676" strokeWidth="1.5" />
    <rect x="9" y="12" width="6" height="4" rx="1" stroke="#00e676" strokeWidth="1" opacity="0.6" />
    <rect x="17" y="12" width="6" height="4" rx="1" stroke="#00e676" strokeWidth="1" opacity="0.6" />
    <rect x="9" y="18" width="6" height="2" rx="0.5" stroke="#00e676" strokeWidth="1" opacity="0.4" />
    <rect x="17" y="18" width="6" height="2" rx="0.5" stroke="#00e676" strokeWidth="1" opacity="0.4" />
    <line x1="8" y1="24" x2="8" y2="27" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="24" x2="12" y2="27" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="20" y1="24" x2="20" y2="27" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="24" y1="24" x2="24" y2="27" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="#00e676" strokeWidth="1.5" opacity="0.3" />
    <path d="M6 10L9 13L14 7" stroke="#00e676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  {
    Icon: IconScrollTracking,
    title: 'Scroll Tracking',
    desc: 'Real-time scroll position mapping converts viewport movement into normalized progress values for precise animation control.',
  },
  {
    Icon: IconInterpolation,
    title: 'Interpolation Engine',
    desc: 'Custom lerp-based easing creates natural, physics-inspired motion with smooth acceleration and deceleration curves.',
  },
  {
    Icon: IconRAF,
    title: 'requestAnimationFrame',
    desc: 'Hardware-accelerated rendering locked to display refresh rate delivers buttery-smooth 60fps animation performance.',
  },
  {
    Icon: IconGPU,
    title: 'GPU Optimization',
    desc: 'Only transform and opacity are animated — the two CSS properties that trigger GPU compositing without layout reflow.',
  },
];

const perfPoints = [
  { label: 'GPU Accelerated Rendering', value: 98 },
  { label: 'Zero Layout Thrashing', value: 100 },
  { label: 'Smooth 60fps Motion', value: 96 },
];

const perfFeatures = [
  'Passive scroll listeners prevent main-thread blocking',
  'Single rAF loop batches all visual updates per frame',
  'Transform-only animations bypass expensive layout recalculation',
];

export default function App() {
  const sectionRefs = useRef([]);
  const perfBarsRef = useRef([]);

  // Intersection Observer for section reveal + perf bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-reveal--visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Perf bars animation
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.perf-bar__fill');
            bars.forEach((bar, i) => {
              setTimeout(() => {
                bar.style.width = bar.dataset.value + '%';
              }, i * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    perfBarsRef.current.forEach((ref) => {
      if (ref) barObserver.observe(ref);
    });

    return () => {
      observer.disconnect();
      barObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* SCROLL-DRIVEN CAR */}
      <Car />

      {/* ── HOW IT WORKS — 2×2 STAGGERED GRID ── */}
      <section className="section section--features" id="features-section">
        {/* Background glow path */}
        <div className="section__glow-path" />
        <div
          className="section__inner section-reveal"
          ref={(el) => (sectionRefs.current[0] = el)}
        >
          <div className="section__badge">How It Works</div>
          <h2 className="section__title">The Engine Behind the Motion</h2>
          <p className="section__subtitle">
            Every pixel of motion is driven by scroll position, smoothed with
            linear interpolation, and rendered via requestAnimationFrame.
          </p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div
                className="feature-card"
                key={i}
                id={`feature-card-${i}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="feature-card__icon-wrap">
                  <f.Icon />
                </div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
                <div className="feature-card__number">0{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR PERFORMANCE — VISUAL DASHBOARD ── */}
      <section className="section section--about" id="about-section">
        <div className="section__grid-bg" />
        <div
          className="section__inner section__inner--wide section-reveal"
          ref={(el) => (sectionRefs.current[1] = el)}
        >
          <div className="perf-split">
            {/* LEFT — Visual Dashboard */}
            <div
              className="perf-split__visual"
              ref={(el) => (perfBarsRef.current[0] = el)}
            >
              {/* Terminal Window */}
              <div className="perf-terminal">
                <div className="perf-terminal__header">
                  <div className="perf-terminal__dots">
                    <span className="perf-terminal__dot perf-terminal__dot--red" />
                    <span className="perf-terminal__dot perf-terminal__dot--yellow" />
                    <span className="perf-terminal__dot perf-terminal__dot--green" />
                  </div>
                  <span className="perf-terminal__title">performance.js</span>
                </div>
                <div className="perf-terminal__body">
                  <div className="perf-terminal__line">
                    <span className="perf-code--keyword">const</span>{' '}
                    <span className="perf-code--var">animate</span>{' '}
                    <span className="perf-code--op">=</span>{' '}
                    <span className="perf-code--paren">()</span>{' '}
                    <span className="perf-code--op">=&gt;</span>{' '}
                    <span className="perf-code--paren">{'{'}</span>
                  </div>
                  <div className="perf-terminal__line perf-terminal__line--indent">
                    <span className="perf-code--var">current</span>{' '}
                    <span className="perf-code--op">+=</span>{' '}
                    <span className="perf-code--paren">(</span>
                    <span className="perf-code--var">target</span>{' '}
                    <span className="perf-code--op">-</span>{' '}
                    <span className="perf-code--var">current</span>
                    <span className="perf-code--paren">)</span>{' '}
                    <span className="perf-code--op">*</span>{' '}
                    <span className="perf-code--num">0.06</span>
                    <span className="perf-code--op">;</span>
                  </div>
                  <div className="perf-terminal__line perf-terminal__line--indent">
                    <span className="perf-code--var">el</span>
                    <span className="perf-code--op">.</span>
                    <span className="perf-code--method">style</span>
                    <span className="perf-code--op">.</span>
                    <span className="perf-code--method">transform</span>{' '}
                    <span className="perf-code--op">=</span>
                  </div>
                  <div className="perf-terminal__line perf-terminal__line--indent2">
                    <span className="perf-code--string">{`\`translateX(\${current}vw)\``}</span>
                    <span className="perf-code--op">;</span>
                  </div>
                  <div className="perf-terminal__line perf-terminal__line--indent">
                    <span className="perf-code--keyword">requestAnimationFrame</span>
                    <span className="perf-code--paren">(</span>
                    <span className="perf-code--var">animate</span>
                    <span className="perf-code--paren">)</span>
                    <span className="perf-code--op">;</span>
                  </div>
                  <div className="perf-terminal__line">
                    <span className="perf-code--paren">{'}'}</span>
                    <span className="perf-code--op">;</span>
                  </div>
                </div>
              </div>

              {/* Live Metrics Strip */}
              <div className="perf-metrics">
                <div className="perf-metric">
                  <div className="perf-metric__value">60</div>
                  <div className="perf-metric__label">FPS</div>
                  <div className="perf-metric__bar">
                    <div className="perf-metric__bar-fill" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="perf-metric">
                  <div className="perf-metric__value">0.4</div>
                  <div className="perf-metric__label">ms Paint</div>
                  <div className="perf-metric__bar">
                    <div className="perf-metric__bar-fill perf-metric__bar-fill--low" style={{ width: '4%' }} />
                  </div>
                </div>
                <div className="perf-metric">
                  <div className="perf-metric__value">0</div>
                  <div className="perf-metric__label">Layout Shifts</div>
                  <div className="perf-metric__bar">
                    <div className="perf-metric__bar-fill perf-metric__bar-fill--perfect" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>

              {/* Animated Waveform */}
              <div className="perf-wave">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="perf-wave__bar"
                    style={{
                      animationDelay: `${i * 0.08}s`,
                      height: `${12 + Math.sin(i * 0.6) * 10}px`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — Content */}
            <div className="perf-split__content">
              <div className="section__badge">Performance</div>
              <h2 className="section__title section__title--left">
                Built for Speed
              </h2>
              <p className="perf-split__desc">
                Scroll-driven animations that use only{' '}
                <code>transform</code> and <code>opacity</code> — the two
                properties that trigger GPU compositing without reflow.
              </p>

              {/* Progress bars */}
              {perfPoints.map((p, i) => (
                <div className="perf-bar" key={i}>
                  <div className="perf-bar__header">
                    <span className="perf-bar__name">{p.label}</span>
                    <span className="perf-bar__value">{p.value}%</span>
                  </div>
                  <div className="perf-bar__track">
                    <div
                      className="perf-bar__fill"
                      data-value={p.value}
                      style={{ width: '0%', transitionDelay: `${i * 0.2}s` }}
                    />
                  </div>
                </div>
              ))}

              <ul className="perf-features">
                {perfFeatures.map((feat, i) => (
                  <li className="perf-features__item" key={i}>
                    <IconCheck />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── READY TO BUILD — FULL-WIDTH CTA ── */}
      <section className="section section--cta" id="cta-section">
        <div className="cta__noise" />
        <div className="cta__gradient-orb" />
        <div className="cta__particles">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="cta__particle"
              style={{
                left: `${8 + Math.random() * 84}%`,
                animationDuration: `${6 + Math.random() * 8}s`,
                animationDelay: `${Math.random() * 5}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>
        <div
          className="section__inner section-reveal"
          ref={(el) => (sectionRefs.current[2] = el)}
        >
          <div className="cta-content">
            <div className="section__badge">Get Started</div>
            <h2 className="cta-content__title">Ready to Build?</h2>
            <p className="cta-content__desc">
              Fork the repo. Swap the car. Add your own scroll-driven magic.
              Zero animation libraries. Pure vanilla JavaScript.
            </p>
            <div className="cta-content__buttons">
              <button className="cta-btn cta-btn--primary" id="cta-button">
                <span>Get Started</span>
              </button>
              <button className="cta-btn cta-btn--outline" id="cta-source-button">
                <span>View Source</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
