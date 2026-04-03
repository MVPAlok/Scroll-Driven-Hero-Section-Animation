import { useEffect, useRef } from 'react';

const statsData = [
  {
    value: '58%',
    label: 'Increase in Performance',
    desc: 'Optimized rendering pipeline delivers buttery-smooth 60fps animations across all devices.',
  },
  {
    value: '27%',
    label: 'Increase in Engagement',
    desc: 'Scroll-driven interactions keep users immersed, boosting time-on-page significantly.',
  },
  {
    value: '3.2×',
    label: 'Faster Load Times',
    desc: 'Lightweight vanilla JS logic with zero external dependencies for instant interactivity.',
  },
];

export default function Stats() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      card.style.opacity = '0';
      card.style.transform = 'translateY(35px) scale(0.95)';
      card.style.transition = `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${0.85 + i * 0.15}s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${0.85 + i * 0.15}s`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        });
      });
    });
  }, []);

  return (
    <div className="stats">
      {statsData.map((stat, i) => (
        <div
          key={i}
          className="stats__card"
          ref={(el) => (cardsRef.current[i] = el)}
          id={`stat-card-${i}`}
        >
          <div className="stats__value">{stat.value}</div>
          <div className="stats__label">{stat.label}</div>
          <div className="stats__desc">{stat.desc}</div>
        </div>
      ))}
    </div>
  );
}
