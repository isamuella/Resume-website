document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('.main, .main1, .main2, .main4, .main5');
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: remove observer after animation
                    // observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '-50px'
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });

    // Sticky navbar with hide/show on scroll
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    let scrollTimer = null;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Clear the previous timer
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }

        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 50) {
            // Scrolling down & not at top
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;

        // Set a timer to show navbar after user stops scrolling
        scrollTimer = setTimeout(() => {
            navbar.style.transform = 'translateY(0)';
        }, 1000);
    });

    // Handle sticky navigation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = '#12355B';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = '#12355B';
            navbar.style.boxShadow = 'none';
        }
    });

    // Handle mobile menu toggle
    const menuToggleMobile = document.querySelector('.menu-toggle-mobile');
    const navLinksMobile = document.querySelector('.nav-links-mobile');

    menuToggleMobile.addEventListener('click', () => {
        navLinksMobile.classList.toggle('active');
    });
});