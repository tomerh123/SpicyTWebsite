document.addEventListener('DOMContentLoaded', () => {



    // --- Mobile Services Carousel ---
    const servicesGrid = document.querySelector('.services-grid');
    const serviceDots = document.querySelectorAll('.service-dot');
    let currentServiceIndex = 0;

    if (servicesGrid && serviceDots.length > 0) {
        // Update dots on scroll
        servicesGrid.addEventListener('scroll', () => {
            const scrollLeft = servicesGrid.scrollLeft;
            const cardWidth = servicesGrid.offsetWidth;
            const index = Math.round(scrollLeft / cardWidth);
            currentServiceIndex = index;

            serviceDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });

        // Click dot to scroll - only allow one step at a time
        serviceDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Only allow scrolling to adjacent slides
                let targetIndex = index;
                if (index > currentServiceIndex + 1) {
                    targetIndex = currentServiceIndex + 1;
                } else if (index < currentServiceIndex - 1) {
                    targetIndex = currentServiceIndex - 1;
                }

                const cards = servicesGrid.querySelectorAll('.service-card');
                if (cards[targetIndex]) {
                    cards[targetIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                    currentServiceIndex = targetIndex;
                }
            });
        });
    }

    // --- Mobile Audience Carousel ---
    const audienceSplit = document.querySelector('.audience-split');
    const audienceDots = document.querySelectorAll('.audience-dot');
    let currentAudienceIndex = 0;

    if (audienceSplit && audienceDots.length > 0) {
        // Update dots on scroll
        audienceSplit.addEventListener('scroll', () => {
            const scrollLeft = audienceSplit.scrollLeft;
            const cardWidth = audienceSplit.offsetWidth;
            const index = Math.round(scrollLeft / cardWidth);
            currentAudienceIndex = index;

            audienceDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });

        // Click dot to scroll - only allow one step at a time
        audienceDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                let targetIndex = index;
                if (index > currentAudienceIndex + 1) {
                    targetIndex = currentAudienceIndex + 1;
                } else if (index < currentAudienceIndex - 1) {
                    targetIndex = currentAudienceIndex - 1;
                }

                const cards = audienceSplit.querySelectorAll('.audience-card');
                if (cards[targetIndex]) {
                    cards[targetIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                    currentAudienceIndex = targetIndex;
                }
            });
        });
    }

    // --- Reliability (Difference) Carousel ---
    const differenceContainer = document.querySelector('.carousel-container');
    const differenceDots = document.querySelectorAll('.difference-dot');
    let currentDifferenceIndex = 0;

    if (differenceContainer && differenceDots.length > 0) {
        // Update dots on scroll
        differenceContainer.addEventListener('scroll', () => {
            const scrollLeft = differenceContainer.scrollLeft;
            const cardWidth = differenceContainer.offsetWidth; // Viewport width
            const index = Math.round(scrollLeft / cardWidth);
            currentDifferenceIndex = index;

            differenceDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });

        // Click dot to scroll
        differenceDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                let targetIndex = index;
                // Since there are only 2 cards, one-by-one check is simple but keeping consistent logic
                if (index > currentDifferenceIndex + 1) {
                    targetIndex = currentDifferenceIndex + 1;
                } else if (index < currentDifferenceIndex - 1) {
                    targetIndex = currentDifferenceIndex - 1;
                }

                const cards = differenceContainer.querySelectorAll('.difference-card');
                if (cards[targetIndex]) {
                    cards[targetIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                    currentDifferenceIndex = targetIndex;
                }
            });
        });
    }

    // --- Modal Functionality ---
    const modal = document.getElementById('leadModal');
    const modalClose = document.getElementById('modalClose');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const modalForm = document.getElementById('modalLeadForm');

    // Open modal when any CTA is clicked
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking overlay (outside content)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Modal form submission
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = modalForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;

        btn.innerText = 'Sending...';
        btn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            btn.innerText = 'Sent Successfully!';
            btn.style.backgroundColor = '#28a745';

            modalForm.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = '';
                closeModal();
                alert('Thank you! Your request has been received. We will contact you within 2 hours.');
            }, 2000);
        }, 1500);
    });

    // --- Mobile Navigation ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    });

    // --- Sticky Header Effect ---
    const header = document.getElementById('header');
    const stickyCta = document.querySelector('.sticky-mobile-cta');
    const heroSection = document.querySelector('.hero');
    const contactSection = document.getElementById('contact') || document.querySelector('.contact');

    window.addEventListener('scroll', () => {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show sticky CTA only after scrolling past hero (mobile only)
        if (stickyCta && heroSection && window.innerWidth < 768) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrolledPastHero = window.scrollY > heroBottom - 100;

            let contactVisible = false;
            if (contactSection) {
                const rect = contactSection.getBoundingClientRect();
                // Check if contact section is visible in viewport
                // We add a buffer so it disappears just as the section comes into view
                if (rect.top < window.innerHeight - 50) {
                    contactVisible = true;
                }
            }

            if (scrolledPastHero && !contactVisible) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        }
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Contact Form Handling (inline form on page) ---
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = leadForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Sent Successfully!';
                btn.style.backgroundColor = '#28a745';
                leadForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                }, 3000);

                alert('Thank you! Your request has been received. We will contact you shortly.');
            }, 1500);
        });
    }

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections and cards
    document.querySelectorAll('.service-card, .section-title, .audience-card, .portfolio-item, .process-step').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});
