'use strict';

import { designProjects } from '/data/design-projects.js';

// Environment detection (no debug logs in production)
const IS_PRODUCTION = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const debugLog = IS_PRODUCTION ? () => {} : console.log.bind(console);

// Lightbox state
let allLightboxImages = [];
let lightboxIndex = 0;

/**
 * Build flat image list from all design project categories
 */
function buildImageList() {
  allLightboxImages = [
    ...(designProjects.identity || []),
    ...(designProjects.packaging || []),
    ...(designProjects.marketing || [])
  ];
}

/**
 * Open lightbox with navigation support
 * @param {string} src - Image source URL
 */
function openLightbox(src) {
  const modal = document.getElementById('lightbox');
  const modalImg = document.getElementById('lightbox-img');
  if (!modal || !modalImg) return;

  // Find index in the flat list
  const idx = allLightboxImages.findIndex(item => item.src === src);
  if (idx !== -1) lightboxIndex = idx;

  modalImg.src = src;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
function closeLightbox() {
  const modal = document.getElementById('lightbox');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Navigate lightbox by offset (-1 = prev, +1 = next)
 */
function navigateLightbox(offset) {
  if (!allLightboxImages.length) return;
  lightboxIndex = (lightboxIndex + offset + allLightboxImages.length) % allLightboxImages.length;
  const modalImg = document.getElementById('lightbox-img');
  if (modalImg) {
    modalImg.src = allLightboxImages[lightboxIndex].src;
  }
}

/**
 * Setup lightbox event listeners (call once)
 */
function setupLightbox() {
  buildImageList();

  const modal = document.getElementById('lightbox');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    const isActive = modal && modal.classList.contains('active');
    if (!isActive) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

/**
 * Check if current viewport is mobile (matches CSS breakpoint)
 */
function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches;
}

/**
 * Initialize an auto-sliding carousel with arrows and preview
 * @param {string} containerId - The ID of the slider container
 * @param {array} dataArray - Array of project objects with src and title
 */
function initAutoSlider(containerId, dataArray) {
  const container = document.getElementById(containerId);
  debugLog(`Initializing slider: ${containerId}`, container ? 'found' : 'not found');
  if (!container || !dataArray.length) return;

  const wrapper = container.parentElement;
  const slideCount = dataArray.length;
  let currentIndex = 0;
  let isAutoPlaying = true;
  let isDragging = false;
  let startX = 0;
  let animationTimeout = null;
  let autoPlayInterval = null;

  // Create track
  const track = document.createElement('div');
  track.className = 'slider-track';

  /**
   * Create a slide with image and preview button
   * @param {object} item - Project data
   * @returns {HTMLElement}
   */
  const createSlide = (item) => {
    const slide = document.createElement('div');
    slide.className = 'slide';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.title;
    img.draggable = false;

    const previewBtn = document.createElement('div');
    previewBtn.className = 'preview-btn';
    previewBtn.innerHTML = '⤢';
    previewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(item.src);
    });

    // Make the image itself clickable (essential for mobile where preview-btn is hidden)
    img.style.cursor = 'pointer';
    img.style.pointerEvents = 'auto';
    img.addEventListener('click', () => openLightbox(item.src));

    slide.appendChild(img);
    slide.appendChild(previewBtn);
    return slide;
  };

  // Create and append slides
  dataArray.forEach((item) => {
    const slide = createSlide(item);
    track.appendChild(slide);
  });

  // On mobile: just render all slides vertically, skip slider behavior
  if (isMobile()) {
    container.appendChild(track);
    return;
  }

  // Clone first slide for infinite loop
  const clonedFirstSlide = createSlide(dataArray[0]);
  track.appendChild(clonedFirstSlide);

  // Set up container
  container.appendChild(track);

  /**
   * Update slider position
   * @param {boolean} animate - Whether to animate the transition
   */
  const updatePosition = (animate = true) => {
    if (animate) {
      track.style.transition =
        'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  /**
   * Move slide by direction
   * @param {number} direction - -1 for prev, 1 for next
   */
  const moveSlide = (direction) => {
    stopAutoPlay();
    if (direction === 1) {
      goNext();
    } else {
      goPrev();
    }
    // Restart auto-play after manual interaction
    setTimeout(() => {
      if (isAutoPlaying) startAutoPlay();
    }, 500);
  };

  /**
   * Go to next slide
   */
  const goNext = () => {
    currentIndex++;
    updatePosition(true);

    // If we've reached the cloned slide, reset to beginning
    if (currentIndex === slideCount) {
      clearTimeout(animationTimeout);
      animationTimeout = setTimeout(() => {
        currentIndex = 0;
        updatePosition(false);
      }, 600);
    }
  };

  /**
   * Go to previous slide
   */
  const goPrev = () => {
    if (currentIndex === 0) {
      // Jump to cloned slide, then animate back to last real slide
      currentIndex = slideCount;
      updatePosition(false);
      clearTimeout(animationTimeout);
      animationTimeout = setTimeout(() => {
        currentIndex = slideCount - 1;
        updatePosition(true);
      }, 50);
    } else {
      currentIndex--;
      updatePosition(true);
    }
  };

  /**
   * Start auto-play
   */
  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayInterval = setInterval(goNext, 4000);
  };

  /**
   * Stop auto-play
   */
  const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
  };

  /**
   * Handle pointer down (start drag)
   */
  const handlePointerDown = (e) => {
    if (e.target.classList.contains('preview-btn')) return;
    stopAutoPlay();
    isDragging = true;
    startX = e.clientX || e.touches?.[0]?.clientX;
    track.style.cursor = 'grabbing';
  };

  /**
   * Handle pointer up (end drag)
   */
  const handlePointerUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = 'grab';

    const endX = e.clientX || e.changedTouches?.[0]?.clientX;
    const distance = startX - endX;
    const threshold = 50;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        goNext();
      } else {
        goPrev();
      }
    } else {
      updatePosition(true);
    }

    if (isAutoPlaying) startAutoPlay();
  };

  // Arrow button listeners
  const leftBtn = wrapper.querySelector('.slider-arrow.left');
  const rightBtn = wrapper.querySelector('.slider-arrow.right');

  if (leftBtn) {
    leftBtn.addEventListener('click', () => moveSlide(-1));
  }
  if (rightBtn) {
    rightBtn.addEventListener('click', () => moveSlide(1));
  }

  // Drag event listeners
  container.addEventListener('pointerdown', handlePointerDown);
  document.addEventListener('pointerup', handlePointerUp);

  // Pause on hover
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', () => {
    if (isAutoPlaying && !isDragging) {
      startAutoPlay();
    }
  });

  // Initialize
  updatePosition(false);
  startAutoPlay();
}

/**
 * Initialize all sliders on page load
 */
function initializeAllSliders() {
  // Setup lightbox first
  setupLightbox();

  if (designProjects.identity) {
    initAutoSlider('identity-slider', designProjects.identity);
  }
  if (designProjects.packaging) {
    initAutoSlider('packaging-slider', designProjects.packaging);
  }
  if (designProjects.marketing) {
    initAutoSlider('marketing-slider', designProjects.marketing);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAllSliders);
} else {
  initializeAllSliders();
}

export { initAutoSlider, initializeAllSliders, openLightbox, closeLightbox };

