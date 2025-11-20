// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializePhotoReveal();
    initializeCountdown();
    initializeCarousels();
    initializeCopyFunctionality();
    initializeScrollAnimations();
    initializeSwiper();
});

// Photo Reveal Animation
function initializePhotoReveal() {
    const clickButton = document.querySelector('.click-button');
    const photoReveal = document.getElementById('photo-reveal');
    
    if (clickButton && photoReveal) {
        clickButton.addEventListener('click', function() {
            // Smooth scroll to photo reveal section
            photoReveal.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add visible class with delay for smooth animation
            setTimeout(() => {
                photoReveal.classList.add('visible');
            }, 300);
        });
    }
}

// Countdown Timer
function initializeCountdown() {
    const targetDate = new Date('2026-05-19T18:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update countdown display
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.textContent = days;
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Wedding day has arrived
            const countdownItems = document.querySelectorAll('.countdown-number');
            countdownItems.forEach(item => {
                item.textContent = '00';
            });
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Carousel Functionality
function initializeCarousels() {
    // Hotel Carousel
    initializeHotelCarousel();
    
    // Photo Gallery Carousel
    initializePhotoGallery();
}

function initializeHotelCarousel() {
    const hotelItems = document.querySelectorAll('.hotel-item');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentHotelIndex = 0;
    
    if (hotelItems.length === 0) return;
    
    function showHotel(index) {
        hotelItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
    
    function nextHotel() {
        currentHotelIndex = (currentHotelIndex + 1) % hotelItems.length;
        showHotel(currentHotelIndex);
    }
    
    function prevHotel() {
        currentHotelIndex = (currentHotelIndex - 1 + hotelItems.length) % hotelItems.length;
        showHotel(currentHotelIndex);
    }
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevHotel);
        nextButton.addEventListener('click', nextHotel);
    }
    
    // Auto-advance hotel carousel every 5 seconds
    setInterval(nextHotel, 5000);
}

function initializePhotoGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const galleryPrevButton = document.querySelector('.gallery-prev');
    const galleryNextButton = document.querySelector('.gallery-next');
    let currentImageIndex = 0;
    
    if (galleryImages.length === 0) return;
    
    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    }
    
    if (galleryPrevButton && galleryNextButton) {
        galleryPrevButton.addEventListener('click', prevImage);
        galleryNextButton.addEventListener('click', nextImage);
    }
    
    // Auto-advance photo gallery every 4 seconds
    setInterval(nextImage, 4000);
    
    // Add touch/swipe support for mobile
    let startX = 0;
    const galleryCarousel = document.querySelector('.gallery-carousel');
    
    if (galleryCarousel) {
        galleryCarousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        galleryCarousel.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextImage();
                } else {
                    prevImage();
                }
            }
        });
    }
}

// Copy to Clipboard Functionality
function initializeCopyFunctionality() {
    // Add global copy function
    window.copyToClipboard = function(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyNotification('¡Copiado al portapapeles!');
            }).catch(() => {
                fallbackCopyText(text);
            });
        } else {
            fallbackCopyText(text);
        }
    };
    
    function fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyNotification('¡Copiado al portapapeles!');
        } catch (err) {
            console.error('Could not copy text: ', err);
            showCopyNotification('Error al copiar. Por favor, copia manualmente.');
        }
        
        document.body.removeChild(textArea);
    }
    
    function showCopyNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.copy-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #c9a876;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-family: 'Lato', sans-serif;
            font-weight: 500;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section:not(.hero):not(.photo-reveal)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
    
    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Button Click Handlers
document.addEventListener('click', function(e) {
    // Map button clicks
    if (e.target.classList.contains('map-button') || 
        e.target.classList.contains('hotel-map-button') || 
        e.target.classList.contains('bus-map-button')) {
        
        e.preventDefault();
        
        // In a real implementation, you would add actual map URLs
        let mapUrl = '';
        if (e.target.textContent.includes('Catedral')) {
            mapUrl = 'https://maps.google.com/?q=Catedral+de+Palma+Mallorca';
        } else if (e.target.textContent.includes('Mesón')) {
            mapUrl = 'https://maps.google.com/?q=Meson+Can+Torrat+Calvia+Mallorca';
        } else if (e.target.textContent.includes('FINCA CAN ESTADES')) {
            mapUrl = 'https://maps.google.com/?q=Finca+Can+Estades+Mallorca';
        } else if (e.target.textContent.includes('SON MALERO')) {
            mapUrl = 'https://maps.google.com/?q=Son+Malero+Mallorca';
        } else if (e.target.textContent.includes('parada')) {
            mapUrl = 'https://maps.google.com/?q=Plaza+de+la+Seu+Palma+Mallorca';
        }
        
        if (mapUrl) {
            window.open(mapUrl, '_blank');
        }
    }
    
    // RSVP button
    if (e.target.classList.contains('rsvp-button')) {
        e.preventDefault();
        // In a real implementation, you would redirect to an RSVP form
        alert('¡Gracias por confirmar tu asistencia! En una implementación real, esto te llevaría a un formulario de confirmación.');
    }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add CSS for loading state
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #fdf7f0 0%, #f8f1e6 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        body:not(.loaded)::after {
            content: 'Cargando...';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            font-family: 'Dancing Script', cursive;
            font-size: 2rem;
            color: #8b5a3c;
            animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Initialize Swiper
function initializeSwiper() {
    // Check if Swiper is loaded
    if (typeof Swiper === 'undefined') {
        console.error('Swiper not loaded');
        return;
    }
    
    const swiper = new Swiper('.mySwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 600,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                coverflowEffect: {
                    rotate: 30,
                    stretch: 10,
                    depth: 60,
                    modifier: 1,
                }
            },
            480: {
                slidesPerView: 'auto',
                spaceBetween: 30,
                coverflowEffect: {
                    rotate: 40,
                    stretch: 0,
                    depth: 80,
                    modifier: 1,
                }
            },
            768: {
                slidesPerView: 'auto',
                spaceBetween: 30,
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                }
            }
        }
    });
    
    // Add animation when slides change
    swiper.on('slideChange', function() {
        // Add a subtle fade effect to active slide
        const activeSlide = document.querySelector('.swiper-slide-active img');
        if (activeSlide) {
            activeSlide.style.transform = 'scale(1)';
        }
    });
}