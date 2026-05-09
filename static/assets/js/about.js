// About Page Animations
document.addEventListener("DOMContentLoaded", function() {
  // Initialize AOS (Animate on Scroll) if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  // Initialize GSAP animations
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation
    gsap.from('.about-hero h1', {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from('.about-hero p', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out'
    });

    // Section title animations
    gsap.utils.toArray('.about-section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Section subtitle animations
    gsap.utils.toArray('.about-section-subtitle').forEach(subtitle => {
      gsap.from(subtitle, {
        scrollTrigger: {
          trigger: subtitle,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
      });
    });

    // Card animations
    gsap.utils.toArray('.team-card, .mission-vision-card, .achievement-card').forEach((card, index) => {
      const delay = index * 0.1;
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: delay,
        ease: 'power2.out'
      });
    });

    // Image animations
    gsap.utils.toArray('.company-image img, .founder-image img, .mission-vision-image img').forEach(img => {
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power2.out'
      });
    });

    // Timeline animations
    const timelineOl = document.querySelector('.timeline ol');
    if (timelineOl) {
      gsap.from('.timeline ol li div', {
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 70%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.to('.timeline ol li:not(:last-child)::after', {
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 70%',
        },
        scale: 1.2,
        duration: 0.5,
        repeat: 1,
        yoyo: true,
        stagger: 0.2,
        ease: 'power1.inOut'
      });
    }

    // Vertical timeline animations
    const timelineItems = document.querySelectorAll('#timeline .timeline-item');
    if (timelineItems.length > 0) {
      timelineItems.forEach((item, index) => {
        gsap.from(item.querySelector('.cont'), {
          scrollTrigger: {
            trigger: '#timeline',
            start: 'top 60%',
          },
          opacity: 0,
          x: index % 2 === 0 ? -30 : 30,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out'
        });
      });
    }
  }

  // Add hover effects for cards
  const cards = document.querySelectorAll('.team-card, .mission-vision-card, .achievement-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
      this.style.transition = 'all 0.3s ease';
    });
  });

  // Add parallax effect to mission-vision section
  const missionVisionSection = document.querySelector('.mission-vision-section');
  if (missionVisionSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const sectionPosition = missionVisionSection.offsetTop;
      const distance = scrollPosition - sectionPosition;
      
      if (distance > -500 && distance < 500) {
        missionVisionSection.style.backgroundPosition = `center ${distance * 0.05}px`;
      }
    });
  }
});
