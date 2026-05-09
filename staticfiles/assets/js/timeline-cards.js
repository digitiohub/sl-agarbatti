// Timeline Cards Functionality
document.addEventListener("DOMContentLoaded", function() {
  // Initialize GSAP animations if available
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate timeline cards title
    gsap.from('.timeline-cards-title', {
      scrollTrigger: {
        trigger: '.timeline-cards-container',
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });
    
    // Animate timeline cards
    gsap.from('.timeline-cards-wrapper > div', {
      scrollTrigger: {
        trigger: '.timeline-cards-container',
        start: 'top 70%',
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });
  }
  
  // Horizontal scroll navigation
  const scrollContainer = document.querySelector('.timeline-scroll-container');
  const prevBtn = document.querySelector('.timeline-prev-btn');
  const nextBtn = document.querySelector('.timeline-next-btn');
  
  if (scrollContainer && prevBtn && nextBtn) {
    // Scroll amount (width of one card + gap)
    const scrollAmount = 320;
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Next button click
    nextBtn.addEventListener('click', function() {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Hide/show navigation buttons based on scroll position
    scrollContainer.addEventListener('scroll', function() {
      // Show/hide previous button
      if (scrollContainer.scrollLeft <= 10) {
        prevBtn.classList.add('disabled');
      } else {
        prevBtn.classList.remove('disabled');
      }
      
      // Show/hide next button
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth - 10;
      if (scrollContainer.scrollLeft >= maxScrollLeft) {
        nextBtn.classList.add('disabled');
      } else {
        nextBtn.classList.remove('disabled');
      }
    });
    
    // Trigger scroll event to initialize button states
    scrollContainer.dispatchEvent(new Event('scroll'));
  }
  
  // Mouse wheel horizontal scrolling
  if (scrollContainer) {
    scrollContainer.addEventListener('wheel', function(e) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    });
  }
  
  // Touch scrolling for mobile
  let isDown = false;
  let startX;
  let scrollLeft;
  
  if (scrollContainer) {
    scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollContainer.classList.add('active');
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
      isDown = false;
      scrollContainer.classList.remove('active');
    });
    
    scrollContainer.addEventListener('mouseup', () => {
      isDown = false;
      scrollContainer.classList.remove('active');
    });
    
    scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      scrollContainer.scrollLeft = scrollLeft - walk;
    });
  }
});
