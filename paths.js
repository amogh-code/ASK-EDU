// Smooth scrolling for internal links within the Paths page
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, 
          behavior: 'smooth'
        });
      }
    });
  });
};
smoothScroll();

// Path Card Hover Animation
const pathCards = document.querySelectorAll('.category');
pathCards.forEach(card => {
  card.addEventListener('mouseover', () => {
    gsap.to(card, { scale: 1.05, duration: 0.2 }); 
  });

  card.addEventListener('mouseout', () => {
    gsap.to(card, { scale: 1, duration: 0.2 }); 
  });
});

// Optional: Fade-in animation for path cards
gsap.fromTo('.category', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 });
