// ====================================
// Sri Mallikarjuna Temple Website JavaScript
// ====================================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  try {
    // Core functionality
    initMobileMenu();
    initHeroSlider();
    initSmoothScrolling();
    initHeaderScroll();
    initForms();
    initAnimationOnScroll();
    initDropdownMenus();
    initScrollToTop();

    // Register service worker for PWA
    registerServiceWorker();

    // Performance monitoring
    monitorPerformance();

    // Error handling
    setupGlobalErrorHandling();

    // Mobile-specific enhancements
    initMobileEnhancements();
  } catch (error) {
    console.error("Error initializing website:", error);
    // Fallback functionality or user notification
  }
});

// Service Worker Registration
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
}

// Performance Monitoring
function monitorPerformance() {
  // Monitor Core Web Vitals
  if ("PerformanceObserver" in window) {
    // Monitor Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === "largest-contentful-paint") {
          console.log("LCP:", entry.startTime);
        }
      }
    }).observe({ entryTypes: ["largest-contentful-paint"] });

    // Monitor First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === "first-input") {
          const fid = entry.processingStart - entry.startTime;
          console.log("FID:", fid);
        }
      }
    }).observe({ entryTypes: ["first-input"] });

    // Monitor Cumulative Layout Shift (CLS)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === "layout-shift" && !entry.hadRecentInput) {
          console.log("Layout shift:", entry.value);
        }
      }
    }).observe({ entryTypes: ["layout-shift"] });
  }
}

// Global Error Handling
function setupGlobalErrorHandling() {
  window.addEventListener("error", (event) => {
    console.error("Global error:", event.error);
    // Could send to error tracking service
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    // Could send to error tracking service
  });
}

// Mobile Menu Toggle Functionality
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          mobileMenuToggle.classList.remove("active");
          navMenu.classList.remove("active");
          document.body.classList.remove("menu-open");
        }
      });
    });

    // Handle dropdown toggles on mobile
    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".dropdown-toggle");
      if (toggle) {
        toggle.addEventListener("click", function (e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle("active");

            // Close other dropdowns
            dropdowns.forEach((otherDropdown) => {
              if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove("active");
              }
            });
          }
        });
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }
}

// Hero Slider Functionality
function initHeroSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  const slideContents = document.querySelectorAll(".slide-content");

  if (slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 6000; // 6 seconds for better viewing
  let slideTimer;
  let isTransitioning = false;

  function showSlide(index, direction = 'next') {
    if (isTransitioning) return;
    isTransitioning = true;

    // Add exit animations to current slide
    const currentSlideElement = slides[currentSlide];
    const currentContent = currentSlideElement.querySelector('.slide-content');
    
    if (currentContent) {
      currentContent.style.animation = direction === 'next' 
        ? 'slideOutLeft 0.5s ease-in-out' 
        : 'slideOutRight 0.5s ease-in-out';
    }

    setTimeout(() => {
      // Remove active class from all slides and dots
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      // Add active class to new slide and dot
      slides[index].classList.add("active");
      if (dots[index]) {
        dots[index].classList.add("active");
      }

      // Add entrance animation to new slide content
      const newContent = slides[index].querySelector('.slide-content');
      if (newContent) {
        newContent.style.animation = direction === 'next'
          ? 'slideInRight 0.6s ease-out'
          : 'slideInLeft 0.6s ease-out';
      }

      currentSlide = index;
      
      // Reset transition flag
      setTimeout(() => {
        isTransitioning = false;
        // Reset animations
        if (newContent) {
          newContent.style.animation = '';
        }
      }, 600);
    }, 500);
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next, 'next');
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev, 'prev');
  }

  function startSlideTimer() {
    slideTimer = setInterval(nextSlide, slideInterval);
  }

  function stopSlideTimer() {
    clearInterval(slideTimer);
  }

  // Add touch feedback to navigation buttons
  function addButtonFeedback(button) {
    if (!button) return;
    
    button.addEventListener('touchstart', () => {
      button.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('touchend', () => {
      button.style.transform = 'scale(1)';
    });
  }

  // Event listeners with enhanced feedback
  if (nextBtn) {
    addButtonFeedback(nextBtn);
    nextBtn.addEventListener("click", function () {
      nextSlide();
      stopSlideTimer();
      startSlideTimer();
      
      // Haptic feedback on mobile
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    });
  }

  if (prevBtn) {
    addButtonFeedback(prevBtn);
    prevBtn.addEventListener("click", function () {
      prevSlide();
      stopSlideTimer();
      startSlideTimer();
      
      // Haptic feedback on mobile
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    });
  }

  // Enhanced dot navigation with better feedback
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      if (index === currentSlide) return;
      
      const direction = index > currentSlide ? 'next' : 'prev';
      showSlide(index, direction);
      stopSlideTimer();
      startSlideTimer();
      
      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    });
    
    // Touch feedback for dots
    dot.addEventListener('touchstart', () => {
      if (index !== currentSlide) {
        dot.style.transform = 'scale(1.2)';
      }
    });
    
    dot.addEventListener('touchend', () => {
      dot.style.transform = '';
    });
  });

  // Pause on hover/touch with visual feedback
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", stopSlideTimer);
    heroSection.addEventListener("mouseleave", startSlideTimer);
    
    // Touch pause functionality
    let touchPaused = false;
    heroSection.addEventListener("touchstart", () => {
      if (!touchPaused) {
        stopSlideTimer();
        touchPaused = true;
      }
    });
    
    heroSection.addEventListener("touchend", () => {
      setTimeout(() => {
        if (touchPaused) {
          startSlideTimer();
          touchPaused = false;
        }
      }, 1000);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      stopSlideTimer();
      startSlideTimer();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      stopSlideTimer();
      startSlideTimer();
    }
  });
  }

  // Start the slider
  startSlideTimer();

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
      stopSlideTimer();
      startSlideTimer();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      stopSlideTimer();
      startSlideTimer();
    }
  });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Hide header when scrolling down, show when scrolling up
    if (scrollY > lastScrollY && scrollY > 200) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
}

// Form Handling
function initForms() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.fullName || !data.email || !data.subject || !data.message) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }

      if (!isValidEmail(data.email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        showNotification(
          "Thank you for your message! We will get back to you soon.",
          "success"
        );
        contactForm.reset();

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Newsletter subscription
  const newsletterForms = document.querySelectorAll("[data-newsletter-form]");
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      showNotification(
        "Thank you for subscribing to our newsletter!",
        "success"
      );
      form.reset();
    });
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "100px",
    right: "20px",
    backgroundColor: getNotificationColor(type),
    color: "white",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    zIndex: "9999",
    maxWidth: "400px",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };
  return icons[type] || icons.info;
}

function getNotificationColor(type) {
  const colors = {
    success: "#27AE60",
    error: "#E74C3C",
    warning: "#F39C12",
    info: "#3498DB",
  };
  return colors[type] || colors.info;
}

// Animation on Scroll
function initAnimationOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".action-card, .event-card, .contact-card, .timing-card, .info-card, .story-section"
  );
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
}

// Dropdown Menu Handling (Desktop)
function initDropdownMenus() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (toggle && menu) {
      let hoverTimer;

      // Mouse enter
      dropdown.addEventListener("mouseenter", function () {
        clearTimeout(hoverTimer);
        if (window.innerWidth > 768) {
          dropdown.classList.add("show");
        }
      });

      // Mouse leave
      dropdown.addEventListener("mouseleave", function () {
        hoverTimer = setTimeout(() => {
          dropdown.classList.remove("show");
        }, 100);
      });
    }
  });
}

// Image Lazy Loading
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Search Functionality (if needed)
function initSearch() {
  const searchToggle = document.querySelector(".search-toggle");
  const searchModal = document.querySelector(".search-modal");
  const searchInput = document.querySelector(".search-input");
  const searchClose = document.querySelector(".search-close");

  if (searchToggle && searchModal) {
    searchToggle.addEventListener("click", function () {
      searchModal.classList.add("active");
      searchInput.focus();
    });

    if (searchClose) {
      searchClose.addEventListener("click", function () {
        searchModal.classList.remove("active");
      });
    }

    // Close on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && searchModal.classList.contains("active")) {
        searchModal.classList.remove("active");
      }
    });

    // Close on backdrop click
    searchModal.addEventListener("click", function (e) {
      if (e.target === searchModal) {
        searchModal.classList.remove("active");
      }
    });
  }
}

// Scroll to Top Button
function initScrollToTop() {
  const scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-to-top";
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.setAttribute("aria-label", "Scroll to top");

  // Styles
  Object.assign(scrollBtn.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "var(--primary-color)",
    color: "white",
    cursor: "pointer",
    fontSize: "1.2rem",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    opacity: "0",
    visibility: "hidden",
    zIndex: "1000",
  });

  document.body.appendChild(scrollBtn);

  // Show/hide based on scroll position
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  });

  // Click handler
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effects
  scrollBtn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.backgroundColor = "#FF8C42";
  });

  scrollBtn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.backgroundColor = "var(--primary-color)";
  });
}

// Initialize scroll to top button
document.addEventListener("DOMContentLoaded", function () {
  initScrollToTop();
});

// Utility Functions
const utils = {
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Get element position
  getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      bottom: rect.bottom + window.scrollY,
      right: rect.right + window.scrollX,
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};

// Export for other scripts if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initMobileMenu,
    initHeroSlider,
    showNotification,
    utils,
  };
}

// Add CSS classes for animations
const style = document.createElement("style");
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .header.scrolled {
        background: rgba(139, 69, 19, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 30px rgba(0,0,0,0.15);
    }
    
    .header.hidden {
        transform: translateY(-100%);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        font-size: 0.9rem;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .lazy {
        filter: blur(5px);
        transition: filter 0.3s ease;
    }
    
    .lazy.loaded {
        filter: none;
    }
`;
document.head.appendChild(style);

// Mobile-specific enhancements
function initMobileEnhancements() {
  // Improve touch responsiveness
  addTouchFeedback();

  // Handle orientation changes
  handleOrientationChange();

  // Optimize for mobile browsers
  optimizeForMobileBrowsers();

  // Add swipe gestures for hero slider
  addSwipeGestures();
}

// Add visual feedback for touch interactions
function addTouchFeedback() {
  const touchElements = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .action-card, .nav-menu a"
  );

  touchElements.forEach((element) => {
    element.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.98)";
      this.style.transition = "transform 0.1s ease";
    });

    element.addEventListener("touchend", function () {
      setTimeout(() => {
        this.style.transform = "";
        this.style.transition = "";
      }, 100);
    });
  });
}

// Handle orientation changes
function handleOrientationChange() {
  window.addEventListener("orientationchange", function () {
    // Close mobile menu on orientation change
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }

    // Recalculate hero height
    setTimeout(() => {
      const hero = document.querySelector(".hero");
      if (hero) {
        hero.style.height = Math.min(window.innerHeight * 0.7, 500) + "px";
      }
    }, 500);
  });
}

// Optimize for mobile browsers
function optimizeForMobileBrowsers() {
  // Prevent zoom on input focus (iOS Safari)
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      if (input.type !== "checkbox" && input.type !== "radio") {
        const currentSize = window.getComputedStyle(input).fontSize;
        if (parseFloat(currentSize) < 16) {
          input.style.fontSize = "16px";
        }
      }
    });
  }

  // Improve performance on mobile
  if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty("--animation-duration", "0.2s");
  }
}

// Add swipe gestures for hero slider
function addSwipeGestures() {
  const heroSlider = document.querySelector(".hero-slider");
  if (!heroSlider) return;

  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let isScrolling;

  heroSlider.addEventListener(
    "touchstart",
    function (e) {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      isScrolling = undefined;
    },
    { passive: true }
  );

  heroSlider.addEventListener(
    "touchmove",
    function (e) {
      const touch = e.touches[0];
      distX = touch.clientX - startX;
      distY = touch.clientY - startY;

      if (isScrolling === undefined) {
        isScrolling = Math.abs(distY) > Math.abs(distX);
      }

      if (!isScrolling) {
        e.preventDefault(); // Prevent scrolling only for horizontal swipes
      }
    },
    { passive: false }
  );

  heroSlider.addEventListener(
    "touchend",
    function (e) {
      if (isScrolling) return; // Don't handle if user was scrolling

      // Check if it's a horizontal swipe
      if (Math.abs(distX) > 50) {
        if (distX > 0) {
          // Swipe right - previous slide
          const prevBtn = document.querySelector(".prev-slide");
          if (prevBtn) prevBtn.click();
        } else {
          // Swipe left - next slide
          const nextBtn = document.querySelector(".next-slide");
          if (nextBtn) nextBtn.click();
        }
      }
    },
    { passive: true }
  );
}
