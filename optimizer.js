// optimizer.js - Performance Fixes for freeebooks.online
(function() {
    // 1. PRE-CONNECT TO CRITICAL DOMAINS (Fixes render-blocking)
    const domains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'];
    domains.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        if (url.includes('gstatic.com')) link.crossOrigin = '';
        document.head.appendChild(link);
    });

    // 2. REPLACE VIDEO ON MOBILE (Fixes 54s LCP)
    if (window.innerWidth < 768) {
        const videoSection = document.getElementById('video-section');
        if (videoSection) {
            const video = videoSection.querySelector('video');
            if (video) {
                video.remove(); // Remove the heavy video file
                // Add a fast CSS gradient background instead
                videoSection.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
                videoSection.style.backgroundSize = '400% 400%';
                videoSection.style.animation = 'gradient 15s ease infinite';
            }
        }
    }

    // 3. LAZY LOAD IMAGES (Fixes image delivery issues)
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img.book-image');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Load the real image
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            // Store real source and set a tiny placeholder
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjVmOSIvPjwvc3ZnPg==';
            observer.observe(img);
        });
    });
})();
