// The Minimalist Greenery - Main JavaScript

// Google Maps Variables
let map;
let geocoder;
let marker;
let autocomplete;

// Initialize Google Maps
function initMap() {
    // Initialize map centered on Indonesia
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -6.2088, lng: 106.8456 },
        zoom: 12
    });
    
    geocoder = new google.maps.Geocoder();
    
    // Initialize autocomplete for address search
    const addressInput = document.getElementById('purchase-address-search');
    if (addressInput) {
        autocomplete = new google.maps.places.Autocomplete(addressInput);
        autocomplete.addListener('place_changed', function() {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                fillAddressFromPlace(place);
            }
        });
    }
}

// Fill address form from Google Places
function fillAddressFromPlace(place) {
    let address = '';
    let city = '';
    let postalCode = '';
    
    // Get address components
    for (const component of place.address_components) {
        const componentType = component.types[0];
        
        switch (componentType) {
            case 'street_number':
                address += component.long_name + ' ';
                break;
            case 'route':
                address += component.long_name;
                break;
            case 'locality':
                city = component.long_name;
                break;
            case 'administrative_area_level_2':
                if (!city) city = component.long_name;
                break;
            case 'postal_code':
                postalCode = component.long_name;
                break;
        }
    }
    
    // Fill form fields
    document.getElementById('purchase-address').value = address || place.formatted_address;
    document.getElementById('purchase-city').value = city;
    document.getElementById('purchase-postal').value = postalCode;
    
    // Show map with marker
    showMapLocation(place.geometry.location);
}

// Search address using Google Places
function searchAddress() {
    const address = document.getElementById('purchase-address-search').value;
    if (!address) return;
    
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK' && results[0]) {
            fillAddressFromPlace(results[0]);
        } else {
            showErrorMessage('Alamat tidak ditemukan. Silakan coba lagi.');
        }
    });
}

// Show location on map
function showMapLocation(location) {
    if (!map) return;
    
    // Show map container
    document.getElementById('map-container').classList.remove('hidden');
    
    // Remove existing marker
    if (marker) {
        marker.setMap(null);
    }
    
    // Add new marker
    marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Lokasi Pengiriman'
    });
    
    // Center map on location
    map.setCenter(location);
    map.setZoom(15);
}

// Plant Database
const plants = [
    {
        id: 1,
        name: 'Sansevieria (Snake Plant)',
        scientific: 'Sansevieria Trifasciata',
        image: [
            'https://images.unsplash.com/photo-1543076654-771d9a9ea1af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1573165072025-ef8e7e28d5a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        description: 'Garis vertikal tegas yang sempurna untuk arsitektur modern',
        care: 'Sangat mudah - hanya perlu disiram 10-14 hari sekali',
        light: 'low',
        features: ['low-light', 'easy-care', 'air-purifying'],
        price: 'Rp 150.000',
        space: ['bathroom', 'bedroom', 'living']
    },
    {
        id: 2,
        name: 'Fiddle Leaf Fig',
        scientific: 'Ficus Lyrata',
        image: [
            'https://images.unsplash.com/photo-1485955900006-10b4e3273983?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1578860093420-6a4a3a4bb4b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        description: 'Daun besar sebagai statement piece yang dramatis',
        care: 'Sedang - disiram saat tanah kering, butuh cahaya baik',
        light: 'high',
        features: ['air-purifying'],
        price: 'Rp 350.000',
        space: ['living', 'workspace']
    },
    {
        id: 3,
        name: 'ZZ Plant',
        scientific: 'Zamioculcas Zamiifolia',
        image: [
            'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1573165072025-ef8e7e28d5a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        ],
        description: 'Daun mengkilap, sangat tahan banting dan modern',
        care: 'Sangat mudah - tahan lama tanpa air',
        light: 'low',
        features: ['low-light', 'easy-care'],
        price: 'Rp 200.000',
        space: ['bathroom', 'bedroom', 'workspace']
    },
    {
        id: 4,
        name: 'Monstera Adansonii',
        scientific: 'Monstera Adansonii',
        image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb8bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        description: 'Kesan tropis tapi tetap rapi jika dirambat pada tiang minimalis',
        care: 'Sedang - suka kelembapan, butuh penyiraman teratur',
        light: 'medium',
        features: ['air-purifying'],
        price: 'Rp 250.000',
        space: ['living', 'workspace']
    },
    {
        id: 5,
        name: 'Pothos',
        scientific: 'Epipremnum Aureum',
        image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        description: 'Tanaman merambat yang sangat fleksibel dan mudah',
        care: 'Mudah - tahan berbagai kondisi',
        light: 'low',
        features: ['low-light', 'easy-care', 'air-purifying'],
        price: 'Rp 120.000',
        space: ['bathroom', 'bedroom', 'workspace', 'living']
    },
    {
        id: 6,
        name: 'Rubber Tree',
        scientific: 'Ficus Elastica',
        image: 'https://images.unsplash.com/photo-1577174172114-9c5006b4c1c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        description: 'Daun lebar mengkilap dengan siluet dramatis',
        care: 'Sedang - butuh cahaya baik dan penyiraman teratur',
        light: 'high',
        features: ['air-purifying'],
        price: 'Rp 300.000',
        space: ['living', 'workspace']
    }
];

// Comments Storage
let comments = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderPlantGrid('all');
    loadComments();
    setupSmoothScrolling();
    setupIntersectionObserver();
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Plant Grid Rendering
function renderPlantGrid(filter = 'all') {
    const grid = document.getElementById('plant-grid');
    const filteredPlants = filter === 'all' 
        ? plants 
        : plants.filter(plant => plant.features.includes(filter));
    
    grid.innerHTML = '';
    
    filteredPlants.forEach((plant, index) => {
        const plantCard = createPlantCard(plant, index);
        grid.appendChild(plantCard);
    });
    
    // Animate cards
    setTimeout(() => {
        grid.querySelectorAll('.plant-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }, 100);
}

function createPlantCard(plant, index) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Handle both single image and array of images
    const plantImages = Array.isArray(plant.image) ? plant.image : [plant.image];
    const currentImage = plantImages[0];
    
    card.innerHTML = `
        <div class="relative overflow-hidden">
            <div class="plant-image-carousel relative" data-plant-id="${plant.id}">
                <img src="${currentImage}" alt="${plant.name}" class="plant-card-image w-full h-64 object-cover">
                ${plantImages.length > 1 ? `
                    <div class="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                        ${plantImages.map((_, idx) => `
                            <button onclick="changePlantImage(${plant.id}, ${idx})" class="w-2 h-2 bg-white bg-opacity-60 rounded-full hover:bg-opacity-100 transition-all ${idx === 0 ? 'bg-opacity-100' : ''}"></button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="plant-badge">${plant.features[0]}</div>
        </div>
        <div class="plant-card-content">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${plant.name}</h3>
            <p class="text-sm text-gray-600 mb-3">${plant.scientific}</p>
            <p class="text-gray-700 mb-4">${plant.description}</p>
            <div class="flex items-center justify-between mb-4">
                <span class="text-green-700 font-semibold">${plant.price}</span>
                <div class="flex space-x-2">
                    ${plant.features.map(feature => `
                        <span class="text-xs bg-gray-100 px-2 py-1 rounded-full">${feature}</span>
                    `).join('')}
                </div>
            </div>
            <button onclick="purchasePlant('${plant.name}')" class="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-colors">
                Beli Sekarang
            </button>
        </div>
    `;
    
    // Store images array for later use
    if (plantImages.length > 1) {
        card.dataset.plantImages = JSON.stringify(plantImages);
    }
    
    return card;
}

// Change plant image in carousel
function changePlantImage(plantId, imageIndex) {
    const carousel = document.querySelector(`[data-plant-id="${plantId}"]`);
    if (!carousel) return;
    
    const card = carousel.closest('.plant-card');
    const plantImages = JSON.parse(card.dataset.plantImages || '[]');
    
    if (plantImages.length === 0) return;
    
    // Update image
    const img = carousel.querySelector('.plant-card-image');
    img.src = plantImages[imageIndex];
    
    // Update dots
    const dots = carousel.querySelectorAll('button');
    dots.forEach((dot, idx) => {
        if (idx === imageIndex) {
            dot.classList.add('bg-opacity-100');
            dot.classList.remove('bg-opacity-60');
        } else {
            dot.classList.add('bg-opacity-60');
            dot.classList.remove('bg-opacity-100');
        }
    });
}

// Filter Plants
function filterPlants(filter) {
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-green-700', 'text-white');
        btn.classList.add('hover:bg-gray-100');
    });
    
    event.target.classList.add('active', 'bg-green-700', 'text-white');
    event.target.classList.remove('hover:bg-gray-100');
    
    // Render filtered plants
    renderPlantGrid(filter);
}

// Space Matcher
function matchSpace(spaceType) {
    const spaceCards = document.querySelectorAll('.space-card');
    spaceCards.forEach(card => card.classList.remove('active'));
    event.target.closest('.space-card').classList.add('active');
    
    const recommendedPlants = plants.filter(plant => plant.space.includes(spaceType));
    const resultDiv = document.getElementById('space-result');
    const plantsDiv = document.getElementById('recommended-plants');
    
    plantsDiv.innerHTML = '';
    
    recommendedPlants.forEach(plant => {
        const plantCard = document.createElement('div');
        plantCard.className = 'bg-white p-4 rounded-lg shadow-md';
        plantCard.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" class="w-full h-32 object-cover rounded-lg mb-3">
            <h4 class="font-semibold text-gray-800">${plant.name}</h4>
            <p class="text-sm text-gray-600 mb-2">${plant.care}</p>
            <button onclick="purchasePlant('${plant.name}')" class="w-full bg-green-700 text-white py-2 rounded text-sm hover:bg-green-800">
                Beli
            </button>
        `;
        plantsDiv.appendChild(plantCard);
    });
    
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('fade-in');
}

// Global variables for care lab
let currentTemp = 24;
let currentHumidity = 50;
let currentLightLevel = 'medium';

// Care Lab
function updateCareSchedule() {
    const lightLevel = document.querySelector('.light-btn.active')?.dataset.level || 'medium';
    
    const schedule = calculateCareSchedule(currentTemp, currentHumidity, lightLevel);
    displayCareSchedule(schedule);
}

function setTemperature(level) {
    // Remove active class from all temp buttons
    document.querySelectorAll('.temp-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Set temperature based on level
    switch(level) {
        case 'cold':
            currentTemp = 20; // Average of 18-22
            break;
        case 'normal':
            currentTemp = 24; // Average of 23-26
            break;
        case 'hot':
            currentTemp = 28; // Average of 27-30
            break;
    }
    
    updateCareSchedule();
}

function setHumidity(level) {
    // Remove active class from all humidity buttons
    document.querySelectorAll('.humidity-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Set humidity based on level
    switch(level) {
        case 'low':
            currentHumidity = 37; // Average of 30-45
            break;
        case 'medium':
            currentHumidity = 55; // Average of 46-65
            break;
        case 'high':
            currentHumidity = 73; // Average of 66-80
            break;
    }
    
    updateCareSchedule();
}

function setLightLevel(level) {
    document.querySelectorAll('.light-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    event.target.dataset.level = level;
    currentLightLevel = level;
    updateCareSchedule();
}

function calculateCareSchedule(temp, humidity, light) {
    const schedule = [];
    
    // Watering frequency based on conditions
    let wateringDays = 7;
    if (temp > 26) wateringDays = 5;
    if (temp < 22) wateringDays = 10;
    if (humidity > 60) wateringDays = 8;
    if (humidity < 40) wateringDays = 6;
    
    schedule.push({
        icon: '💧',
        task: 'Penyiraman',
        frequency: `Setiap ${wateringDays} hari`,
        detail: temp > 26 ? 'Tambahkan penyiraman pagi hari' : 'Penyiraman normal'
    });
    
    // Light requirements
    let lightAdvice = '';
    if (light === 'low') {
        lightAdvice = 'Tempatkan dekat jendela utara';
    } else if (light === 'medium') {
        lightAdvice = 'Tempatkan dekat jendela timur/barat';
    } else {
        lightAdvice = 'Tempatkan dekat jendela selatan';
    }
    
    schedule.push({
        icon: '☀️',
        task: 'Pencahayaan',
        frequency: 'Harian',
        detail: lightAdvice
    });
    
    // Fertilizing
    schedule.push({
        icon: '🌱',
        task: 'Pemupukan',
        frequency: 'Sebulan sekali',
        detail: 'Gunakan pupuk cair setengah dosis'
    });
    
    // Pruning
    schedule.push({
        icon: '✂️',
        task: 'Pemangkasan',
        frequency: '2 bulan sekali',
        detail: 'Hapus daun kuning dan kering'
    });
    
    return schedule;
}

function displayCareSchedule(schedule) {
    const scheduleDiv = document.getElementById('care-schedule');
    scheduleDiv.innerHTML = '';
    
    schedule.forEach(item => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'flex items-start space-x-3';
        scheduleItem.innerHTML = `
            <div class="text-2xl">${item.icon}</div>
            <div class="flex-1">
                <h4 class="font-semibold text-gray-800">${item.task}</h4>
                <p class="text-sm text-gray-600">${item.frequency}</p>
                <p class="text-xs text-gray-500 mt-1">${item.detail}</p>
            </div>
        `;
        scheduleDiv.appendChild(scheduleItem);
    });
}

// Purchase Functions
function purchasePlant(plantName) {
    const modal = document.getElementById('purchase-modal');
    const itemText = document.getElementById('purchase-item');
    
    itemText.textContent = `Anda akan membeli: ${plantName}`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closePurchaseModal() {
    const modal = document.getElementById('purchase-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function completePurchase(event) {
    event.preventDefault();
    
    const email = document.getElementById('purchase-email').value;
    const phone = document.getElementById('purchase-phone').value;
    const name = document.getElementById('purchase-name').value;
    const address = document.getElementById('purchase-address').value;
    const city = document.getElementById('purchase-city').value;
    const postal = document.getElementById('purchase-postal').value;
    const notes = document.getElementById('purchase-notes').value;
    const plantName = document.getElementById('purchase-item').textContent.replace('Anda akan membeli: ', '');
    
    // Validate form
    if (!email || !phone || !name || !address || !city || !postal) {
        showErrorMessage('Mohon lengkapi semua field yang diperlukan.');
        return;
    }
    
    // Create order object
    const orderData = {
        plant: plantName,
        customer: {
            name: name,
            email: email,
            phone: phone,
            address: address,
            city: city,
            postalCode: postal,
            notes: notes
        },
        timestamp: new Date().toISOString()
    };
    
    // Simulate order processing
    const formData = new FormData();
    Object.keys(orderData).forEach(key => {
        if (typeof orderData[key] === 'object') {
            formData.append(key, JSON.stringify(orderData[key]));
        } else {
            formData.append(key, orderData[key]);
        }
    });
    
    // Show success message with order details
    showSuccessMessage(`Pesanan berhasil! ${plantName} akan dikirim ke ${address}, ${city}. Kami akan menghubungi ${phone} untuk konfirmasi.`);
    
    // Reset form and close modal
    document.getElementById('purchase-form').reset();
    document.getElementById('map-container').classList.add('hidden');
    closePurchaseModal();
    
    // Log for demonstration (in real app, this would be sent to server)
    console.log('Order placed:', orderData);
    
    // Store order in localStorage for demo purposes
    const orders = JSON.parse(localStorage.getItem('minimalist-greenery-orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('minimalist-greenery-orders', JSON.stringify(orders));
}

// Comment Functions
function submitComment(event) {
    event.preventDefault();
    
    const name = document.getElementById('comment-name').value;
    const email = document.getElementById('comment-email').value;
    const text = document.getElementById('comment-text').value;
    
    const comment = {
        id: Date.now(),
        name,
        email,
        text,
        date: new Date().toLocaleDateString('id-ID'),
        avatar: name.charAt(0).toUpperCase()
    };
    
    comments.unshift(comment);
    saveComments();
    renderComments();
    
    // Reset form
    document.getElementById('comment-form').reset();
    
    // Show success message
    showSuccessMessage('Komentar Anda telah ditambahkan!');
}

function renderComments() {
    const commentsDiv = document.getElementById('comments-display');
    commentsDiv.innerHTML = '';
    
    if (comments.length === 0) {
        commentsDiv.innerHTML = '<p class="text-center text-gray-500">Belum ada komentar. Jadilah yang pertama!</p>';
        return;
    }
    
    comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsDiv.appendChild(commentElement);
    });
}

function createCommentElement(comment) {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `
        <div class="comment-header">
            <div class="comment-avatar">${comment.avatar}</div>
            <div class="comment-meta">
                <div class="comment-name">${comment.name}</div>
                <div class="comment-date">${comment.date}</div>
            </div>
        </div>
        <div class="comment-text text-gray-700">${comment.text}</div>
    `;
    return div;
}

function saveComments() {
    localStorage.setItem('minimalist-greenery-comments', JSON.stringify(comments));
}

function loadComments() {
    const saved = localStorage.getItem('minimalist-greenery-comments');
    if (saved) {
        comments = JSON.parse(saved);
        renderComments();
    } else {
        // Add sample comments
        comments = [
            {
                id: 1,
                name: 'Sarah Designer',
                email: 'sarah@example.com',
                text: 'Konsep minimalis untuk tanaman indoor ini sangat brilian! Saya sudah menerapkannya di beberapa proyek klien dan hasilnya luar biasa.',
                date: '2 hari yang lalu',
                avatar: 'S'
            },
            {
                id: 2,
                name: 'Budi Architect',
                email: 'budi@example.com',
                text: 'Fitur Space Matcher sangat membantu dalam memilih tanaman yang tepat untuk setiap ruangan. Highly recommended!',
                date: '5 hari yang lalu',
                avatar: 'B'
            }
        ];
        renderComments();
    }
}

// Utility Functions
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message fixed top-20 right-4 z-50 max-w-md';
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message fixed top-20 right-4 z-50 max-w-md';
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, options);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Mobile Menu Toggle (if needed)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone.replace(/[^0-9]/g, ''));
}

// Initialize Care Lab on load
document.addEventListener('DOMContentLoaded', function() {
    updateCareSchedule();
    
    // Set initial light level
    const mediumLightBtn = document.querySelector('.light-btn:nth-child(2)');
    if (mediumLightBtn) {
        mediumLightBtn.classList.add('active');
        mediumLightBtn.dataset.level = 'medium';
    }
    
    // Set initial temperature
    const normalTempBtn = document.querySelector('.temp-btn:nth-child(2)');
    if (normalTempBtn) {
        normalTempBtn.classList.add('active');
    }
    
    // Set initial humidity
    const mediumHumidityBtn = document.querySelector('.humidity-btn:nth-child(2)');
    if (mediumHumidityBtn) {
        mediumHumidityBtn.classList.add('active');
    }
});

// Handle escape key for modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePurchaseModal();
    }
});

// Click outside modal to close
document.getElementById('purchase-modal').addEventListener('click', function(event) {
    if (event.target === this) {
        closePurchaseModal();
    }
});
