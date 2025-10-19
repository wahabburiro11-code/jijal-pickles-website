// Google Translate Initialization
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: 'en',
            includedLanguages: 'ur,sd,en',
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
        },
        'google_translate_element'
    );
}

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const deliveryForm = document.getElementById('deliveryForm');
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const customerName = document.getElementById('customerName').value;
            const contactNumber = document.getElementById('contactNumber').value;
            const productType = document.getElementById('productType').options[document.getElementById('productType').selectedIndex].text;
            const quantity = document.getElementById('quantity').value;
            const packs = document.getElementById('packs').value === 'custom' 
                ? document.getElementById('customPacks').value 
                : document.getElementById('packs').value;
            const deliveryAddress = document.getElementById('deliveryAddress').value;

            if (!customerName || !contactNumber || !productType || !quantity || !packs || !deliveryAddress) {
                alert('Please fill in all required fields.');
                return;
            }

            // Create FormData object for proper encoding
            const formData = new FormData();
            formData.append('Customer Name', customerName);
            formData.append('Contact Number', contactNumber);
            formData.append('Product Type', productType);
            formData.append('Quantity', quantity);
            formData.append('Packs', packs);
            formData.append('Delivery Address', deliveryAddress);

            // Replace with your actual Google Apps Script URL
            const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
            
            // Send data to Google Sheets
            fetch(scriptURL, {
                method: "POST",
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok');
            })
            .then(data => {
                alert("✅ Order placed successfully! We will contact you shortly.");
                deliveryForm.reset();
                document.getElementById('customPacks').style.display = 'none';
            })
            .catch(err => {
                console.error('Error:', err);
                alert("❌ Something went wrong. Please try again or contact us directly.");
            });
        });
    }

    // Show/hide custom packs field
    const packsSelect = document.getElementById('packs');
    if (packsSelect) {
        packsSelect.addEventListener('change', function() {
            const customPack = document.getElementById('customPacks');
            if (customPack) {
                customPack.style.display = this.value === 'custom' ? 'block' : 'none';
            }
        });
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            const languageSelector = document.querySelector('.language-selector');
            
            if (navLinks) navLinks.classList.toggle('show');
            if (languageSelector) languageSelector.classList.toggle('show');
        });
    }

    // Language selector functionality
    const languageSpans = document.querySelectorAll('.language-selector span');
    languageSpans.forEach(span => {
        span.addEventListener('click', function() {
            // Remove active class from all spans
            languageSpans.forEach(s => s.classList.remove('active'));
            // Add active class to clicked span
            this.classList.add('active');
            
            // Here you would typically implement language switching
            // For now, we'll just show an alert
            alert(`Language switched to: ${this.textContent}`);
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinksContainer = document.querySelector('.nav-links');
                const languageSelector = document.querySelector('.language-selector');
                
                if (navLinksContainer) navLinksContainer.classList.remove('show');
                if (languageSelector) languageSelector.classList.remove('show');
            }
        });
    });

    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-section');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});
