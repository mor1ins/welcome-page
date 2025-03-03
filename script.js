// Set the current year in the footer
document.addEventListener('DOMContentLoaded', function() {
    // Update the current year in the footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Track installation and retrieve installation count
    trackInstallation();
    getInstallationCount();

    // Add event listeners for tracking button clicks
    addButtonTracking();
});

/**
 * Track new installations and increment the installation counter in the backend
 */
function trackInstallation() {
    // Check if this is the first time the page is opened (new installation)
    const isFirstVisit = !localStorage.getItem('json_parser_installed');
    
    if (isFirstVisit) {
        // Mark as installed in local storage
        localStorage.setItem('json_parser_installed', 'true');
        localStorage.setItem('json_parser_install_date', new Date().toISOString());
        
        // Send the installation data to the analytics service
        // In a real implementation, you would call your analytics service API
        incrementInstallCounter();
        
        console.log('New installation tracked');
    } else {
        console.log('Returning user detected');
    }
}

/**
 * Increment the installation counter
 */
function incrementInstallCounter() {
    // In a real implementation, this would make an API call to your analytics service
    // For demonstration purposes, we'll simulate an API call and update the counter
    
    // Generate a unique user identifier if it doesn't exist
    let userId = localStorage.getItem('json_parser_user_id');
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem('json_parser_user_id', userId);
    }
    
    // In a real implementation, you would send this data to your analytics backend
    const analyticsData = {
        event: 'installation',
        userId: userId,
        timestamp: new Date().toISOString(),
        browserInfo: {
            userAgent: navigator.userAgent,
            language: navigator.language
        }
    };
    
    console.log('Analytics data:', analyticsData);
    
    // Simulate API call success
    simulateApiSuccess();
}

/**
 * Generate a random user ID for analytics purposes
 */
function generateUserId() {
    return 'user_' + Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

/**
 * Get the installation count from the analytics service
 */
function getInstallationCount() {
    // In a real implementation, this would make an API call to get actual data
    // For demonstration, we'll simulate a random number of installations
    
    // Simulate API request delay
    setTimeout(() => {
        // Generate a realistic-looking installation count (between 5,000 and 100,000)
        const installCount = Math.floor(5000 + Math.random() * 95000);
        
        // Update the installation count display
        const installCountElement = document.getElementById('install-count');
        if (installCountElement) {
            installCountElement.textContent = installCount.toLocaleString();
        }
    }, 500);
}

/**
 * Simulate successful API call to analytics service
 */
function simulateApiSuccess() {
    console.log('Installation tracked successfully');
}

/**
 * Add event tracking to buttons and links
 */
function addButtonTracking() {
    // Track clicks on support and documentation links
    const docsLink = document.getElementById('docs-link');
    const supportLink = document.getElementById('support-link');
    
    if (docsLink) {
        docsLink.addEventListener('click', function(e) {
            trackEvent('click', 'documentation_link');
        });
    }
    
    if (supportLink) {
        supportLink.addEventListener('click', function(e) {
            trackEvent('click', 'support_link');
        });
    }
}

/**
 * Track user events
 */
function trackEvent(eventType, eventName, eventData = {}) {
    // In a real implementation, this would send event data to your analytics service
    const eventPayload = {
        type: eventType,
        name: eventName,
        timestamp: new Date().toISOString(),
        data: eventData
    };
    
    console.log('Event tracked:', eventPayload);
}

// Additional functionality for a more interactive experience

// Function to automatically scroll through screenshots every few seconds
function initializeScreenshotCarousel() {
    const carousel = document.querySelector('.screenshot-carousel');
    if (!carousel || carousel.children.length <= 1) return;
    
    let scrollPosition = 0;
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    
    setInterval(() => {
        scrollPosition += 320; // approximate width of a screenshot + gap
        if (scrollPosition > maxScroll) {
            scrollPosition = 0;
        }
        
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }, 5000); // scroll every 5 seconds
}

// Initialize the carousel when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScreenshotCarousel();
}); 