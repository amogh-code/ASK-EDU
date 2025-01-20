// Smooth Scrolling
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

// Path Card Hover Effect
const pathCards = document.querySelectorAll('.path-card');
pathCards.forEach(card => {
  card.addEventListener('mouseover', () => {
    card.style.transform = 'scale(1.05)';
    card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
  });

  card.addEventListener('mouseout', () => {
    card.style.transform = 'scale(1)';
    card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  });
});

// Hero Text Animation
const heroText = document.querySelector('.hero-content');
gsap.fromTo(heroText, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 }); 

// Quotes Animation
const quotes = document.querySelectorAll('.quote-container');
quotes.forEach((quote, index) => {
  gsap.fromTo(quote, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, delay: index * 0.2 });
});

// Featured Paths Animation
const pathCardsContainer = document.querySelector('.path-cards');
gsap.fromTo(pathCardsContainer, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });

// About Section Animation
const aboutSection = document.querySelector('.about-edward-de-bono');
gsap.fromTo(aboutSection, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1 });

// How It Works Section Animation
const steps = document.querySelectorAll('.step');
steps.forEach((step, index) => {
  gsap.fromTo(step, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 + index * 0.2 });
});

// Benefits Section Animation
const benefitsList = document.querySelector('.benefits ul');
const benefitsItems = benefitsList.querySelectorAll('li');
benefitsItems.forEach((item, index) => {
  gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 + index * 0.2 });
});

// Call to Action Animation
const callToAction = document.querySelector('.call-to-action');
gsap.fromTo(callToAction, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1.5 }); 

// Simple Form Validation (Placeholder)
const contactForm = document.getElementById('contact-form'); 
if (contactForm) { 
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    // Add your form validation logic here 
    // (e.g., check for required fields, email validity)

    // If form is valid, submit the form 
    // (e.g., send data to server using AJAX) 
  });
}
