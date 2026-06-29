import { useEffect, useRef, useState } from 'react'
import './App.css'
import product1 from "../assets/1.avif";
import product2 from "../assets/2.avif";
import product3 from "../assets/3.avif";


const productImages = [
  {
    src: product1,
    alt: "Premium earbuds in a minimalist charging case",
  },
  {
    src: product2,
    alt: "Earbuds resting on a premium matte surface",
  },
  {
    src: product3,
    alt: "Close-up view of premium earbuds with a soft glow",
  },
];

const trustBadges = [
  { icon: '🚚', title: 'Fast Nationwide Delivery' },
  { icon: '🔒', title: 'Secure Checkout' },
  { icon: '💳', title: 'Cash on Delivery Available' },
  { icon: '⭐', title: 'Premium Quality Guaranteed' },
  { icon: '↩', title: 'Easy Returns' },
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)
  const [openDescription, setOpenDescription] = useState(true)
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

      </main>

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
