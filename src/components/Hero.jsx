import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/shikshaCards/ac2.png';
import image2 from '../assets/shikshaCards/LvRc2.png';
import image3 from '../assets/shikshaCards/sd2.png';
import image4 from '../assets/shikshaCards/bt2.png';
import image5 from '../assets/shikshaCards/tutor2.png';
import image6 from '../assets/shikshaCards/green.jpg';
import '../css/Hero.css';

const rotatingCards = [
  {
    id: 1,
    name: 'Academic Coaching',
    img: image1,
    accent: '#60a5fa',
    path: '/courses',
  },
  {
    id: 2,
    name: 'Live & Recorded Classes',
    img: image2,
    accent: '#34d399',
    path: '/courses',
  },
  {
    id: 3,
    name: 'Skill Development',
    img: image3,
    accent: '#fbbf24',
    path: '/skill/browse',
  },
  {
    id: 4,
    name: 'Book a Tutor',
    img: image4,
    accent: '#a78bfa',
    path: '/skill/browse',
  },
  {
    id: 5,
    name: 'Become a Tutor',
    img: image5,
    accent: '#f87171',
    path: '/signup?role=teacher&skill=true',
  },
];

const fixedCard = {
  id: 6,
  name: 'English',
  img: image6,
  accent: '#fb923c',
};

const updates = [
  {
    id: 1,
    title: 'Enrollment available for Classes 8–12',
    accent: '#ff8f01'
  },

  {
    id: 2,
    title: 'CBSE, NCERT & MBSE coaching programs added',
    accent: '#f87171'
  },

  {
    id: 3,
    title: 'Competitive exam preparation will be available soon',
    accent: '#1dcaab'
  },

  {
    id: 4,
    title: 'New skill development programs launched',
    accent: '#a78bfa'
  },

  {
    id: 5,
    title: 'Live classes and recorded sessions available',
    accent: '#34d399'
  },

  {
    id: 6,
    title: 'Expert mentors and guest tutors joining ShikshaCom',
    accent: '#fbbf24'
  },

  {
    id: 7,
    title: 'Tutor applications open for specialized skills',
    accent: '#60a5fa'
  },

  {
    id: 8,
    title: 'Subscription plans and guest access available',
    accent: '#fb923c'
  }
];

const CARD_HEIGHT = 64;
const GAP = 10;
const CARDS_PER_PAGE = 5;

const Hero = () => {

  const navigate = useNavigate();

  const [cards, setCards] = useState(rotatingCards);

  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const items = [...updates, ...updates];
  const currentRef = useRef(0);
  const intervalRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    setVisible(true);
  }, []);


  useEffect(() => {
  const interval = setInterval(() => {
    setCards((prev) => {
      const next = [...prev];

      const first = next.shift();

      next.push(first);

      return next;
    });
  }, 2000);   //change every 2 sec

  return () => clearInterval(interval);
}, []);


  const step = CARD_HEIGHT + GAP;

  const advance = () => {
    currentRef.current += CARDS_PER_PAGE;
    setTransitioning(true);
    setOffset(currentRef.current * step);

    if (currentRef.current >= updates.length) {
      resetTimeoutRef.current = setTimeout(() => {
        setTransitioning(false);
        currentRef.current = 0;
        setOffset(0);
      }, 520);
    }
  };

  useEffect(() => {
    if (paused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(advance, 4000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [paused]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  return (
    <section className="shiksha-hero">
      <div className="hero-bg-grid"></div>
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      <div className="hero-glow-3"></div>

      <div className="hero-inner">
        <div className="hero-left">
          <div className="subject-grid">
            {[...cards, fixedCard].map((card, i) => (
  <div
    key={card.id}
    className={`scard ${visible ? 'scard-visible' : ''}`}
    style={{
      '--delay': `${i * 40}ms`,
      '--accent': card.accent
    }}
    onClick={() => {
      if (card.path) navigate(card.path);
    }}
  >
    <img
      src={card.img}
      alt={card.name}
      className="scard-img"
      decoding="async"
    />
  </div>
))}
          </div>
        </div>

        <div className="hero-right">
          <div className="updates-panel">
            <div className="up-header">
              <div className="up-header-left">
                <span className="up-title">Latest Updates</span>
              </div>
            </div>

            <div
              className="up-viewport"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                className="up-track"
                style={{
                  transform: `translateY(-${offset}px)`,
                  transition: transitioning
                    ? 'transform 0.52s cubic-bezier(0.4,0,0.2,1)'
                    : 'none',
                }}
              >
                {items.map((u, i) => (
                  <div
                    key={`${u.id}-${i}`}
                    className="up-card"
                    style={{ '--uaccent': u.accent }}
                  >
                    <div className="up-card-dot"></div>
                    <span className="up-card-title">{u.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;