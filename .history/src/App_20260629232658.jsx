import { useEffect, useRef, useState } from 'react'
import './App.css'

const productImages = [
  {
    src: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80',
    alt: 'Premium earbuds in a minimalist charging case',
  },
  {
    src: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    alt: 'Earbuds resting on a premium matte surface',
  },
  {
    src: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    alt: 'Close-up view of premium earbuds with a soft glow',
  },
]

const trustBadges = [
  { icon: '🚚', title: 'Fast Nationwide Delivery' },
  { icon: '🔒', title: 'Secure Checkout' },
  { icon: '💳', title: 'Cash on Delivery Available' },
  { icon: '⭐', title: 'Premium Quality Guaranteed' },
  { icon: '↩', title: 'Easy Returns' },
]

const features = [
  { icon: '🔋', title: 'Long Battery Life', description: 'Up to 36 hours of playtime with the case.' },
  { icon: '⚡', title: 'Fast Charging', description: 'A quick 10-minute charge for an instant boost.' },
  { icon: '💧', title: 'Waterproof Design', description: 'Built to handle rain, sweat, and everyday movement.' },
  { icon: '📶', title: 'Bluetooth 5.4', description: 'Stable pairing with ultra-low latency for calls and audio.' },
  { icon: '🎧', title: 'Premium Sound Quality', description: 'Balanced highs, rich mids, and deep bass.' },
  { icon: '🤫', title: 'Noise Cancellation', description: 'Smart ANC keeps your focus locked in.' },
  { icon: '✨', title: 'Lightweight Design', description: 'Pocketsized comfort that feels almost weightless.' },
  { icon: '🛡️', title: 'One-Year Warranty', description: 'Confidence backed by our premium support team.' },
]

const benefits = [
  {
    icon: '🎯',
    title: 'Made for momentum',
    text: 'A seamless fit for work, workouts, and commutes without compromise.',
  },
  {
    icon: '🔊',
    title: 'Immersive listening',
    text: 'Engineered for studio-quality detail at every volume.',
  },
  {
    icon: '📱',
    title: 'Instant pairing',
    text: 'Connect in one tap and move between devices effortlessly.',
  },
]

const reviews = [
  {
    name: 'Amina T.',
    role: 'Verified Purchase',
    date: '2 weeks ago',
    text: 'The sound quality feels premium, and the fit is so comfortable I forgot I was wearing them.',
    avatar: 'AT',
  },
  {
    name: 'Daniel K.',
    role: 'Verified Purchase',
    date: '1 month ago',
    text: 'Charging is incredibly fast and the noise cancellation actually makes a real difference.',
    avatar: 'DK',
  },
  {
    name: 'Sade O.',
    role: 'Verified Purchase',
    date: '3 weeks ago',
    text: 'They look luxurious, feel sturdy, and the battery lasts much longer than I expected.',
    avatar: 'SO',
  },
]

const faqs = [
  {
    question: 'How long does delivery take?',
    answer: 'Most orders arrive within 24 to 48 hours nationwide, with priority handling for premium customers.',
  },
  {
    question: 'Is payment secure?',
    answer: 'Yes. We use encrypted checkout and trusted payment gateways to protect every order.',
  },
  {
    question: 'Can I return the product?',
    answer: 'Absolutely. You can return it within 7 days if it is unused and still in its original packaging.',
  },
  {
    question: 'Does it come with a warranty?',
    answer: 'Every pair includes a one-year warranty covering manufacturing defects and performance issues.',
  },
  {
    question: 'How can I contact support?',
    answer: 'Reach our support team by email or live chat, and we will help you within a few hours.',
  },
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)
  const [openDescription, setOpenDescription] = useState(true)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const pauseTimerRef = useRef(null)

  useEffect(() => {
    if (isPaused) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % productImages.length)
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [isPaused])

  const pauseAutoplay = () => {
    setIsPaused(true)
    if (pauseTimerRef.current) {
      window.clearTimeout(pauseTimerRef.current)
    }

    pauseTimerRef.current = window.setTimeout(() => {
      setIsPaused(false)
    }, 5000)
  }

  const changeSlide = (direction) => {
    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % productImages.length
      }
      return (prev - 1 + productImages.length) % productImages.length
    })
    pauseAutoplay()
  }

  const goToSlide = (index) => {
    setActiveIndex(index)
    pauseAutoplay()
  }

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX)
  }

  const handleTouchEnd = (event) => {
    if (touchStartX === null) {
      return
    }

    const delta = event.changedTouches[0].clientX - touchStartX
    if (delta > 50) {
      changeSlide('prev')
    } else if (delta < -50) {
      changeSlide('next')
    }
    setTouchStartX(null)
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Lumen Audio home">
          Lumen<span>Audio</span>
        </a>
        <button className="icon-button" type="button" aria-label="View cart">
          🛍️
        </button>
      </header>

      <main className="main-layout">
        <section className="hero-card" aria-labelledby="product-title">
          <div
            className="carousel-panel"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Product image carousel"
          >
            <button
              className="carousel-control"
              type="button"
              aria-label="Show previous image"
              onClick={() => changeSlide('prev')}
            >
              ‹
            </button>

            <div className="carousel-frame">
              {productImages.map((image, index) => (
                <figure
                  key={image.alt}
                  className={`carousel-slide ${index === activeIndex ? 'active' : ''}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index === activeIndex ? 'eager' : 'lazy'}
                  />
                </figure>
              ))}
            </div>

            <button
              className="carousel-control"
              type="button"
              aria-label="Show next image"
              onClick={() => changeSlide('next')}
            >
              ›
            </button>

            <div className="carousel-dots" aria-label="Select image">
              {productImages.map((image, index) => (
                <button
                  key={image.alt}
                  type="button"
                  className={`dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <p className="eyebrow">New release • Premium audio</p>
            <h1 id="product-title">Premium Bluetooth Earbuds</h1>

            <div className="rating-row" aria-label="Customer rating">
              <span className="stars">★★★★★</span>
              <span className="rating-copy">(2,845 Reviews)</span>
            </div>

            <div className="price-row">
              <div className="price-stack">
                <span className="price">₦34,999</span>
                <span className="original-price">₦49,999</span>
              </div>
              <span className="discount-badge">30% OFF</span>
            </div>

            <a className="buy-button primary" id="buy" href="#purchase-bar">
              <span aria-hidden="true">🛒</span>
              Buy Now
            </a>

            <div className="trust-row" aria-label="Trust indicators">
              {trustBadges.map((badge) => (
                <div key={badge.title} className="trust-badge">
                  <span aria-hidden="true">{badge.icon}</span>
                  <span>{badge.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-card">
          <button
            className="accordion-trigger"
            type="button"
            aria-expanded={openDescription}
            onClick={() => setOpenDescription((prev) => !prev)}
          >
            <span>Product Description</span>
            <span className={`accordion-icon ${openDescription ? 'open' : ''}`}>⌄</span>
          </button>

          <div className={`accordion-panel ${openDescription ? 'open' : ''}`}>
            <div className="description-grid">
              <div>
                <h3>Overview</h3>
                <p>
                  Crafted for movement, the Lumen Earbuds combine luxury design with rich sound and an all-day battery life.
                </p>
              </div>
              <div>
                <h3>Specifications</h3>
                <ul>
                  <li>Bluetooth 5.4</li>
                  <li>Noise cancellation</li>
                  <li>Water-resistant IPX7</li>
                  <li>36-hour total playtime</li>
                </ul>
              </div>
              <div>
                <h3>Materials</h3>
                <p>Soft-touch aluminum casing with a premium silicone fit sleeve and a matte finish.</p>
              </div>
              <div>
                <h3>What's included</h3>
                <p>Charging case, USB-C cable, three ear tip sizes, and a travel pouch.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-card section-spacing">
          <div className="section-heading">
            <p className="eyebrow">Key features</p>
            <h2>Everything you want in a premium everyday audio companion.</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-card section-spacing">
          <div className="section-heading">
            <p className="eyebrow">Why customers love it</p>
            <h2>Designed to feel effortless from the first listen.</h2>
          </div>

          <div className="benefit-list">
            {benefits.map((benefit, index) => (
              <article key={benefit.title} className={`benefit-card ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className="benefit-icon" aria-hidden="true">{benefit.icon}</div>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-card section-spacing">
          <div className="section-heading">
            <p className="eyebrow">Customer reviews</p>
            <h2>Trusted by thousands of discerning listeners.</h2>
          </div>

          <div className="review-row" aria-label="Customer reviews">
            {reviews.map((review) => (
              <article key={review.name} className="review-card">
                <div className="review-head">
                  <div className="avatar" aria-hidden="true">{review.avatar}</div>
                  <div>
                    <h3>{review.name}</h3>
                    <p className="review-role">{review.role}</p>
                  </div>
                </div>
                <div className="stars">★★★★★</div>
                <p className="review-text">“{review.text}”</p>
                <p className="review-date">{review.date}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-card section-spacing">
          <div className="section-heading">
            <p className="eyebrow">Frequently asked questions</p>
            <h2>Everything you need to buy with confidence.</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="faq-item">
                <button
                  className="faq-trigger"
                  type="button"
                  aria-expanded={openFaqIndex === index}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-icon ${openFaqIndex === index ? 'open' : ''}`}>+</span>
                </button>
                <div className={`faq-panel ${openFaqIndex === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-card section-spacing">
          <p className="eyebrow">Limited stock available</p>
          <h2>Ready to get yours today?</h2>
          <p>Don’t miss today’s special offer and upgrade your everyday sound.</p>
          <a className="buy-button primary large" href="#buy">
            Buy Now • Limited Stock
          </a>
        </section>
      </main>

      <footer className="footer">
        <p>Premium audio crafted for modern life.</p>
      </footer>

      <div className="floating-buy-bar" id="purchase-bar">
        <div>
          <p className="bar-price">₦34,999</p>
          <p className="bar-copy">Free shipping • 7-day returns</p>
        </div>
        <a className="buy-button compact" href="#buy">
          Buy Now
        </a>
      </div>
    </div>
  )
}

export default App
