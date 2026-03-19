document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling & Close mobile menu on click
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            if (!targetId) return;

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                // Scroll with offset for fixed header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Link on Scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - header.offsetHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Reveal Animations
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Contact Form handling (Mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert("Thanks for contacting me! I’ll get back to you soon 🚀");
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeIcon) {
        if (currentTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                theme = 'dark';
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                theme = 'light';
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }
});

///image down work position
const roles = [
    { text: "Full Stack Developer", icon: "fas fa-code" },
    { text: "Frontend Developer", icon: "fas fa-laptop-code" },
    { text: "Backend Developer", icon: "fas fa-server" },
    { text: "SQL Developer", icon: "fas fa-database" }
];
let index = 0;

function changeRole() {
    const el = document.getElementById("role");
    const iconEl = document.getElementById("role-icon");
    if (!el || !iconEl) return;

    el.style.opacity = 0;
    iconEl.style.opacity = 0;

    setTimeout(() => {
        el.innerText = roles[index].text;
        iconEl.className = roles[index].icon;
        el.style.opacity = 1;
        iconEl.style.opacity = 1;
        index = (index + 1) % roles.length;
    }, 500);
}

setInterval(changeRole, 2000);
changeRole();