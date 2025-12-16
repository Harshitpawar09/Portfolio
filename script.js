// =========================================================
// SCRIPT.JS - Complete JavaScript Code
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typewriter Effect ---
    const typedText = document.querySelector(".typed-text");
    const phrases = ["Web Developer", "AI Engineer", "Graphic Designer", "UI UX Designer"];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typedText) return; 

        const current = phrases[index];
        if (isDeleting) {
            charIndex--;
            typedText.textContent = current.substring(0, charIndex);
            if (charIndex === 0) {
                isDeleting = false;
                index = (index + 1) % phrases.length;
                setTimeout(type, 500); 
                return;
            }
        } else {
            charIndex++;
            typedText.textContent = current.substring(0, charIndex);
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, 1500);
                return;
            }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }

    if (typedText) {
        type();
    }


    // --- 2. SCROLL ANIMATION EFFECT (Intersection Observer) ---
    
    // Select all elements designated for scroll animation
    const elementsToAnimate = document.querySelectorAll('.scroll-animate');

    // Observer Options
    const observerOptions = {
        rootMargin: '0px 0px -100px 0px', 
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'animated' class to trigger the CSS transition/delay
                entry.target.classList.add('animated');
                // Stop observing after it has animated once
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Apply the observer to all elements
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });


    // --- 3. Navigation Scroll Effect ---
    const header = document.querySelector('header');
    function handleNavScroll() {
        if (header) { 
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleNavScroll);
    window.addEventListener('load', handleNavScroll);
    handleNavScroll();


    // --- 4. CONTACT FORM HANDLER (Handles form reset after mailto triggers) ---
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        // e.preventDefault() is intentionally NOT used here so the 'mailto:' action runs.

        // Add a small delay before resetting the form for a better experience.
        setTimeout(() => {
            this.reset();
        }, 100); 
    });


    // --- 5. Hover Effects & Dynamic Delays ---
    
    // Smooth hover effects (assuming .about-card and .card-icon exist, though not in provided HTML)
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) icon.style.transform = 'rotate(360deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            if (icon) icon.style.transform = 'rotate(0deg)';
        });
    });

    // Dynamic Animation Delays (for other sections using this class)
    const fadeUpElements = document.querySelectorAll('.animate-fade-up');
    fadeUpElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});