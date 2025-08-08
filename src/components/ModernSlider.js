import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import './ModernSlider.css';

const ModernSlider = ({ banners = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Données par défaut si aucune bannière n'est fournie
  const defaultSlides = [
    {
      id: 1,
      image: 'images/main-banner-1.jpg',
      title: 'Découvrez nos nouveautés',
      subtitle: 'Collection Automne 2024',
      description: 'Des produits exceptionnels à prix imbattables',
      buttonText: 'Découvrir',
      buttonLink: '/product'
    },
    {
      id: 2,
      image: 'images/main-banner.jpg',
      title: 'Offres exceptionnelles',
      subtitle: 'Jusqu\'à -50% de réduction',
      description: 'Profitez de nos meilleures offres du moment',
      buttonText: 'Voir les offres',
      buttonLink: '/product'
    },
    {
      id: 3,
      image: 'images/main-banner-1.jpg',
      title: 'Livraison gratuite',
      subtitle: 'Dès 50€ d\'achat',
      description: 'Commandez maintenant et recevez gratuitement',
      buttonText: 'Commander',
      buttonLink: '/product'
    }
  ];

  const slides = banners.length > 0 ? banners : defaultSlides;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (slides.length === 0) return null;

  return (
    <div className="modern-slider">
      <div className="slider-container">
        {/* Slides */}
        <div className="slides-wrapper">
          {slides.map((slide, index) => (
            <div
              key={slide.id || index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - currentSlide) * 100}%)`
              }}
            >
              <div className="slide-image">
                <img
                  src={slide.image}
                  alt={slide.title || `Slide ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
              <div className="slide-content">
                <div className="slide-text">
                  {slide.subtitle && (
                    <span className="slide-subtitle">{slide.subtitle}</span>
                  )}
                  <h1 className="slide-title">
                    {slide.title || 'Titre par défaut'}
                  </h1>
                  {slide.description && (
                    <p className="slide-description">{slide.description}</p>
                  )}
                  {(slide.buttonText || slide.buttonLink) && (
                    <a
                      href={slide.buttonLink || '/product'}
                      className="slide-button"
                    >
                      {slide.buttonText || 'En savoir plus'}
                      <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="slider-nav slider-nav-prev"
          onClick={goToPrevious}
          aria-label="Slide précédent"
        >
          <ChevronLeftIcon className="nav-icon" />
        </button>
        <button
          className="slider-nav slider-nav-next"
          onClick={goToNext}
          aria-label="Slide suivant"
        >
          <ChevronRightIcon className="nav-icon" />
        </button>

        {/* Dots Indicator */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernSlider;