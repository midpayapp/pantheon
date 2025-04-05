// Main JavaScript file for MidPay website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // ROI Calculator functionality
    const calculateRoiBtn = document.getElementById('calculate-roi');
    if (calculateRoiBtn) {
        calculateRoiBtn.addEventListener('click', function() {
            const monthlyValue = parseFloat(document.getElementById('monthly-value').value) || 20000;
            
            // Calculate costs and savings
            const costWithout = monthlyValue * 0.125; // 12.5% of monthly value
            const escrowFee = monthlyValue * 0.02; // 2% escrow fee
            const costWith = 199 + escrowFee; // $199 monthly fee + escrow fee
            const monthlySavings = costWithout - costWith;
            const annualSavings = monthlySavings * 12;
            
            // Update the result display
            document.getElementById('cost-without').textContent = '$' + costWithout.toLocaleString();
            document.getElementById('cost-with').textContent = '$' + costWith.toLocaleString();
            document.getElementById('monthly-savings').textContent = '$' + monthlySavings.toLocaleString();
            document.getElementById('annual-savings').textContent = '$' + annualSavings.toLocaleString();
            
            // Show the result
            document.getElementById('roi-result').style.display = 'block';
        });
    }
    
    // Form validation and submission
    const waitlistForm = document.getElementById('waitlist-form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = waitlistForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = 'red';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '0.3rem';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            // Email validation
            const emailField = document.getElementById('email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = emailField.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = 'red';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '0.3rem';
                        errorMsg.textContent = 'Please enter a valid email address';
                        emailField.parentNode.appendChild(errorMsg);
                    } else {
                        errorMsg.textContent = 'Please enter a valid email address';
                    }
                }
            }
            
            // Phone validation
            const phoneField = document.getElementById('phone');
            if (phoneField && phoneField.value.trim()) {
                const phonePattern = /^[\d\s\-\(\)]+$/;
                if (!phonePattern.test(phoneField.value.trim())) {
                    isValid = false;
                    phoneField.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = phoneField.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = 'red';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '0.3rem';
                        errorMsg.textContent = 'Please enter a valid phone number';
                        phoneField.parentNode.appendChild(errorMsg);
                    } else {
                        errorMsg.textContent = 'Please enter a valid phone number';
                    }
                }
            }
            
            // If form is valid, submit it
            if (isValid) {
                // Show loading indicator
                const submitBtn = waitlistForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="loading"></span> Processing...';
                submitBtn.disabled = true;
                
                // Simulate form submission (would be an AJAX call in production)
                setTimeout(function() {
                    // Hide the form
                    waitlistForm.style.display = 'none';
                    
                    // Create and show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'message success';
                    successMessage.style.backgroundColor = '#4caf50';
                    successMessage.style.color = 'white';
                    successMessage.style.padding = '2rem';
                    successMessage.style.borderRadius = '8px';
                    successMessage.style.textAlign = 'center';
                    
                    successMessage.innerHTML = `
                        <h3 style="color: white; margin-bottom: 1rem;">Thank You for Joining Our Waitlist!</h3>
                        <p style="margin-bottom: 1.5rem;">Your spot has been secured. Check your email for confirmation and next steps.</p>
                        <p>We're excited to have you as an early adopter of MidPay!</p>
                    `;
                    
                    // Insert the success message where the form was
                    waitlistForm.parentNode.appendChild(successMessage);
                    
                    // Scroll to the success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }, 1500);
            }
        });
    }
    
    // FAQ Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                content.classList.toggle('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
    
    // Testimonial carousel (if exists)
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    if (testimonialItems.length > 3) {
        let currentIndex = 0;
        const testimonialContainer = testimonialItems[0].parentNode;
        
        // Create navigation buttons
        const navButtons = document.createElement('div');
        navButtons.className = 'testimonial-nav';
        navButtons.style.textAlign = 'center';
        navButtons.style.marginTop = '2rem';
        
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&larr; Previous';
        prevButton.className = 'btn btn-outline btn-sm';
        prevButton.style.marginRight = '1rem';
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = 'Next &rarr;';
        nextButton.className = 'btn btn-outline btn-sm';
        
        navButtons.appendChild(prevButton);
        navButtons.appendChild(nextButton);
        
        testimonialContainer.parentNode.appendChild(navButtons);
        
        // Show only first 3 testimonials initially
        for (let i = 3; i < testimonialItems.length; i++) {
            testimonialItems[i].style.display = 'none';
        }
        
        // Navigation functionality
        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                testimonialItems[currentIndex + 2].style.display = 'none';
                currentIndex--;
                testimonialItems[currentIndex].style.display = 'block';
            }
        });
        
        nextButton.addEventListener('click', function() {
            if (currentIndex < testimonialItems.length - 3) {
                testimonialItems[currentIndex].style.display = 'none';
                currentIndex++;
                testimonialItems[currentIndex + 2].style.display = 'block';
            }
        });
    }
    
    // Dark mode toggle (if exists)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode-support');
            
            // Save preference to localStorage
            if (document.body.classList.contains('dark-mode-support')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode-support');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    
    // Add scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.width = '40px';
    scrollTopBtn.style.height = '40px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.backgroundColor = 'var(--primary)';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.style.justifyContent = 'center';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.zIndex = '999';
    scrollTopBtn.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add tooltip functionality
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.querySelector('.tooltip-text');
            if (tooltipText) {
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            }
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltipText = this.querySelector('.tooltip-text');
            if (tooltipText) {
                tooltipText.style.visibility = 'hidden';
                tooltipText.style.opacity = '0';
            }
        });
    });
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && animateElements.length > 0) {
        const animateOnScroll = function() {
            animateElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight * 0.9) {
                    element.classList.add('animated');
                }
            });
        };
        
        // Run once on load
        animateOnScroll();
        
        // Run on scroll
        window.addEventListener('scroll', animateOnScroll);
    } else {
        // If user prefers reduced motion, add the animated class immediately
        animateElements.forEach(element => {
            element.classList.add('animated');
        });
    }
});
