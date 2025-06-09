// EcoShop React.js-like Application - Fixed Version
// Modern Component-Based Architecture with State Management

// State Management System (similar to React Context + useState)
class StateManager {
    constructor() {
        this.state = {
            currentRoute: 'home',
            cart: [],
            searchQuery: '',
            showCart: false
        };
        this.listeners = {};
    }

    setState(key, value) {
        this.state[key] = value;
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(value));
        }
    }

    getState(key) {
        return this.state[key];
    }

    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);

        // Return unsubscribe function
        return () => {
            this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
        };
    }
}

// Application Data
const appData = {
    products: [
        {
            id: "p1",
            name: "Organic Bamboo Toothbrush Set",
            price: 299,
            originalPrice: 399,
            discount: 25,
            category: "body-care",
            sustainabilityScore: { overall: 95, carbonFootprint: 98, waterUsage: 90, recyclability: 95, ethicalSourcing: 96 },
            description: "100% biodegradable bamboo toothbrush with soft bristles",
            reviews: 142,
            rating: 4.8,
            inStock: true
        },
        {
            id: "p2",
            name: "Eco-Friendly Yoga Mat",
            price: 1299,
            originalPrice: 1599,
            discount: 19,
            category: "fitness",
            sustainabilityScore: { overall: 88, carbonFootprint: 85, waterUsage: 92, recyclability: 90, ethicalSourcing: 85 },
            description: "Natural rubber yoga mat with organic cotton strap",
            reviews: 89,
            rating: 4.6,
            inStock: true
        },
        {
            id: "p3",
            name: "Organic Skincare Gift Set",
            price: 2199,
            originalPrice: 2899,
            discount: 24,
            category: "body-care",
            sustainabilityScore: { overall: 92, carbonFootprint: 94, waterUsage: 88, recyclability: 93, ethicalSourcing: 94 },
            description: "Complete organic skincare routine with natural ingredients",
            reviews: 267,
            rating: 4.9,
            inStock: true
        },
        {
            id: "p4",
            name: "Sustainable Water Bottle",
            price: 899,
            originalPrice: 1199,
            discount: 25,
            category: "lifestyle",
            sustainabilityScore: { overall: 91, carbonFootprint: 89, waterUsage: 95, recyclability: 92, ethicalSourcing: 88 },
            description: "Stainless steel insulated water bottle with bamboo cap",
            reviews: 156,
            rating: 4.7,
            inStock: true
        }
    ],
    communityPosts: [
        {
            id: "post1",
            userId: "user1",
            userName: "EcoWarrior_Priya",
            userAvatar: "P",
            content: "Just completed my 30-day zero waste challenge! 🌱 These bamboo products from EcoShop made it so much easier. My carbon footprint reduced by 15%!",
            productId: "p1",
            likes: 89,
            comments: 23,
            challengeId: "zero-waste-30",
            timestamp: "2025-06-02T14:30:00Z",
            liked: false
        },
        {
            id: "post2",
            userId: "user2",
            userName: "SustainableArjun",
            userAvatar: "A",
            content: "My morning yoga routine just got more sustainable! This eco mat is amazing and the sustainability score convinced me. 🧘‍♂️",
            productId: "p2",
            likes: 156,
            comments: 31,
            challengeId: null,
            timestamp: "2025-06-01T08:15:00Z",
            liked: true
        },
        {
            id: "post3",
            userId: "user3",
            userName: "GreenBeauty_Ananya",
            userAvatar: "G",
            content: "Skincare routine upgrade! ✨ These organic products are not only good for my skin but also for the planet. Check out my sustainability score!",
            productId: "p3",
            likes: 234,
            comments: 45,
            challengeId: "green-beauty",
            timestamp: "2025-05-31T19:20:00Z",
            liked: false
        }
    ],
    challenges: [
        {
            id: "zero-waste-30",
            name: "30-Day Zero Waste Challenge",
            description: "Reduce your waste to zero for 30 days",
            participants: 1247,
            reward: "Eco Warrior Badge",
            duration: 30,
            carbonSaving: "25kg CO2"
        },
        {
            id: "green-beauty",
            name: "Green Beauty Revolution",
            description: "Switch to sustainable beauty products",
            participants: 856,
            reward: "Beauty Eco Champion",
            duration: 14,
            carbonSaving: "10kg CO2"
        }
    ],
    user: {
        id: "current-user",
        name: "Rahul Sharma",
        avatar: "R",
        sustainabilityScore: 1250,
        level: "Eco Champion",
        badges: ["eco-warrior", "carbon-saver", "water-guardian"],
        followers: 189,
        following: 234,
        totalCO2Saved: "120kg",
        monthlyGoal: "15kg CO2",
        currentProgress: "8.5kg CO2"
    },
    categories: [
        { id: "body-care", name: "Body Care", icon: "🧴", productCount: 47 },
        { id: "bamboo-products", name: "Bamboo Products", icon: "🎋", productCount: 23 },
        { id: "health-supplements", name: "Health Supplements", icon: "💊", productCount: 31 },
        { id: "organic-food", name: "Organic Food", icon: "🥗", productCount: 89 },
        { id: "fitness", name: "Fitness", icon: "🏃‍♀️", productCount: 15 },
        { id: "lifestyle", name: "Lifestyle", icon: "🌿", productCount: 34 }
    ]
};

// Global state manager
const appState = new StateManager();

// Utility Functions
function getTimeAgo(timestamp) {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffHours = Math.floor((now - postTime) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

function getCategoryName(categoryId) {
    const category = appData.categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
}

function getChallengeName(challengeId) {
    const challenge = appData.challenges.find(c => c.id === challengeId);
    return challenge ? challenge.name : challengeId;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-eco-green);
        color: white;
        padding: 12px 20px;
        border-radius: var(--radius-base);
        z-index: 1001;
        box-shadow: var(--shadow-lg);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Services
const CartService = {
    addToCart(productId) {
        const product = appData.products.find(p => p.id === productId);
        if (!product) return;

        const cart = appState.getState('cart');
        const existingItem = cart.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                productId,
                product,
                quantity: 1
            });
        }

        appState.setState('cart', [...cart]);
        showNotification(`${product.name} added to cart!`);
    },

    removeFromCart(productId) {
        const cart = appState.getState('cart');
        const newCart = cart.filter(item => item.productId !== productId);
        appState.setState('cart', newCart);
    },

    updateQuantity(productId, quantity) {
        const cart = appState.getState('cart');
        const item = cart.find(item => item.productId === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                appState.setState('cart', [...cart]);
            }
        }
    },

    getTotal() {
        const cart = appState.getState('cart');
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }
};

const CommunityService = {
    toggleLike(postId) {
        const post = appData.communityPosts.find(p => p.id === postId);
        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            renderApp();
        }
    },

    createPost() {
        showNotification('Post creation feature coming soon! 📝');
    },

    joinChallenge(challengeId) {
        showNotification('Successfully joined the challenge! 🎉');
    }
};

// Page Renderers
function renderProductCard(product) {
    const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const scoreClass = product.sustainabilityScore.overall >= 90 ? 'high' :
        product.sustainabilityScore.overall >= 75 ? 'medium' : 'low';

    return `
        <div class="product-card" onclick="viewProduct('${product.id}')">
            <div class="product-image">
                📦
                <div class="sustainability-score ${scoreClass}">
                    ${product.sustainabilityScore.overall}/100
                </div>
            </div>
            <div class="product-content">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h4 class="product-name">${product.name}</h4>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    <span class="original-price">₹${product.originalPrice}</span>
                    <span class="discount-badge">${discountPercentage}% OFF</span>
                </div>
                <div class="product-rating">
                    <span class="stars">${renderStars(product.rating)}</span>
                    <span>${product.rating} (${product.reviews})</span>
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); CartService.addToCart('${product.id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

function renderPostCard(post) {
    const timeAgo = getTimeAgo(post.timestamp);

    return `
        <div class="post-card">
            <div class="post-header">
                <div class="user-avatar">${post.userAvatar}</div>
                <div class="post-user-info">
                    <h5>${post.userName}</h5>
                    <div class="post-timestamp">${timeAgo}</div>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.challengeId ? `<div class="challenge-badge">#${getChallengeName(post.challengeId)}</div>` : ''}
            </div>
            <div class="post-actions">
                <button class="post-action ${post.liked ? 'liked' : ''}" onclick="CommunityService.toggleLike('${post.id}')">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </button>
                <button class="post-action">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </button>
                <button class="post-action">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
            </div>
        </div>
    `;
}

function renderChallengeCard(challenge) {
    return `
        <div class="product-card">
            <div class="product-image">
                🏆
            </div>
            <div class="product-content">
                <h4 class="product-name">${challenge.name}</h4>
                <p class="mb-16">${challenge.description}</p>
                <div class="challenge-badge mb-16">${challenge.reward}</div>
                <div class="flex justify-between mb-16">
                    <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                        ${challenge.participants} participants
                    </span>
                    <span style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                        ${challenge.duration} days
                    </span>
                </div>
                <div class="eco-impact mb-16">
                    <span class="impact-positive">Save ${challenge.carbonSaving}</span>
                </div>
                <button class="add-to-cart" onclick="CommunityService.joinChallenge('${challenge.id}')">
                    Join Challenge
                </button>
            </div>
        </div>
    `;
}

// Page Components
function renderHomePage() {
    const featuredProducts = appData.products.slice(0, 3);
    const communityHighlights = appData.communityPosts.slice(0, 2);

    return `
        <div class="home-page">
            <div class="hero">
                <h2>Sustainable Shopping Made Easy for Gen Z 🌍</h2>
                <p>Discover eco-friendly products, connect with like-minded community, and get AI-powered sustainability insights</p>
                <div class="hero-actions">
                    <button class="btn btn--primary" onclick="navigateTo('shop')">
                        Start Shopping
                    </button>
                    <button class="btn btn--outline" onclick="navigateTo('community')">
                        Join Community
                    </button>
                </div>
            </div>

            <div class="products-section">
                <div class="section-header">
                    <h3>Featured Eco Products</h3>
                    <button class="btn btn--outline" onclick="navigateTo('shop')">View All</button>
                </div>
                <div class="products-grid">
                    ${featuredProducts.map(product => renderProductCard(product)).join('')}
                </div>
            </div>

            <div class="community-section">
                <div class="section-header">
                    <h3>Community Highlights</h3>
                    <button class="btn btn--outline" onclick="navigateTo('community')">Join Community</button>
                </div>
                <div class="posts-grid">
                    ${communityHighlights.map(post => renderPostCard(post)).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderShopPage() {
    const searchQuery = appState.getState('searchQuery') || '';
    let products = [...appData.products];

    if (searchQuery) {
        products = products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return `
        <div class="shop-page">
            <div class="section-header">
                <h2>Sustainable Products</h2>
                <div class="filters">
                    <select class="filter-select" onchange="filterByCategory(this.value)">
                        <option value="">All Categories</option>
                        ${appData.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
                    </select>
                    <select class="filter-select" onchange="filterBySustainability(this.value)">
                        <option value="">All Eco Scores</option>
                        <option value="90">90+ Eco Score</option>
                        <option value="80">80+ Eco Score</option>
                        <option value="70">70+ Eco Score</option>
                    </select>
                </div>
            </div>
            <div class="products-grid">
                ${products.map(product => renderProductCard(product)).join('')}
            </div>
            ${products.length === 0 ? '<div class="text-center mt-24"><h3>No products found</h3><p>Try adjusting your filters</p></div>' : ''}
        </div>
    `;
}

function renderCommunityPage() {
    const activeTab = appState.getState('communityTab') || 'feed';

    return `
        <div class="community-page">
            <div class="section-header">
                <h2>EcoConnect Community</h2>
                <button class="btn btn--primary" onclick="CommunityService.createPost()">
                    <i class="fas fa-plus"></i> Create Post
                </button>
            </div>

            <div class="nav-tabs">
                <button class="nav-tab ${activeTab === 'feed' ? 'active' : ''}" onclick="setCommunityTab('feed')">
                    <i class="fas fa-home"></i> Feed
                </button>
                <button class="nav-tab ${activeTab === 'challenges' ? 'active' : ''}" onclick="setCommunityTab('challenges')">
                    <i class="fas fa-trophy"></i> Challenges
                </button>
                <button class="nav-tab ${activeTab === 'leaderboard' ? 'active' : ''}" onclick="setCommunityTab('leaderboard')">
                    <i class="fas fa-crown"></i> Leaderboard
                </button>
            </div>

            <div class="community-content">
                ${renderCommunityTabContent(activeTab)}
            </div>
        </div>
    `;
}

function renderCommunityTabContent(activeTab) {
    switch (activeTab) {
        case 'feed':
            return `
                <div class="posts-grid">
                    ${appData.communityPosts.map(post => renderPostCard(post)).join('')}
                </div>
            `;
        case 'challenges':
            return `
                <div class="products-grid">
                    ${appData.challenges.map(challenge => renderChallengeCard(challenge)).join('')}
                </div>
            `;
        case 'leaderboard':
            const leaderboard = [
                { rank: 1, name: "EcoWarrior_Priya", avatar: "P", score: 2450 },
                { rank: 2, name: "SustainableArjun", avatar: "A", score: 2180 },
                { rank: 3, name: "GreenBeauty_Ananya", avatar: "G", score: 1950 },
                { rank: 4, name: "EcoMinimalist_Rohan", avatar: "R", score: 1820 },
                { rank: 5, name: "ZeroWaste_Kavya", avatar: "K", score: 1750 },
                { rank: 6, name: "You (Rahul)", avatar: "R", score: 1250, isUser: true }
            ];

            return `
                <div class="cart-container">
                    ${leaderboard.map(user => `
                        <div class="cart-item ${user.isUser ? 'current-user' : ''}">
                            <div style="min-width: 40px; font-weight: bold; color: var(--color-eco-green);">#${user.rank}</div>
                            <div class="user-avatar">${user.avatar}</div>
                            <div class="item-details">
                                <div class="item-name">${user.name}</div>
                                <div class="item-price" style="color: var(--color-eco-green);">${user.score} pts</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        default:
            return '';
    }
}

function renderEcoGuidePage() {
    const messages = appState.getState('ecoGuideMessages') || [
        {
            id: 1,
            content: "Hi! I'm your AI EcoGuide. I can help you find sustainable products, compare environmental impacts, and track your eco-journey. What would you like to know?",
            sender: 'ai',
            timestamp: new Date()
        }
    ];
    const user = appData.user;

    return `
        <div class="ecoguide-page">
            <div class="section-header text-center mb-24">
                <h2>🤖 AI EcoGuide Assistant</h2>
                <p>Your personal sustainability companion</p>
            </div>

            <div class="stats-grid mb-32">
                <div class="stat-card">
                    <div class="stat-icon">🌱</div>
                    <div class="stat-value">${user.sustainabilityScore}</div>
                    <div class="stat-label">Eco Score</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💚</div>
                    <div class="stat-value">${user.totalCO2Saved}</div>
                    <div class="stat-label">CO2 Saved</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-value">${user.badges.length}</div>
                    <div class="stat-label">Badges Earned</div>
                </div>
            </div>

            <div class="chat-container mb-32">
                <div class="chat-header">
                    <h4>Chat with EcoGuide</h4>
                </div>
                <div class="chat-messages" id="chatMessages">
                    ${messages.map(msg => renderMessage(msg)).join('')}
                </div>
                <div class="chat-input">
                    <input 
                        type="text" 
                        placeholder="Ask about sustainability..." 
                        onkeypress="handleEcoGuideMessage(event)"
                        id="ecoGuideInput"
                    />
                    <button class="btn btn--primary" onclick="sendEcoGuideMessage()">Send</button>
                </div>
            </div>

            <div class="cart-container">
                <h4 class="mb-16">Product Sustainability Comparison</h4>
                <div class="products-grid">
                    ${renderProductComparison()}
                </div>
            </div>
        </div>
    `;
}

function renderMessage(message) {
    return `
        <div class="message ${message.sender}">
            <div class="message-avatar">${message.sender === 'ai' ? '🤖' : '👤'}</div>
            <div class="message-content">
                <p class="mb-0">${message.content}</p>
            </div>
        </div>
    `;
}

function renderProductComparison() {
    const products = appData.products.slice(0, 2);

    return products.map(product => `
        <div class="product-card">
            <div class="product-image">
                📦
                <div class="sustainability-score ${product.sustainabilityScore.overall >= 90 ? 'high' : 'medium'}">
                    ${product.sustainabilityScore.overall}/100
                </div>
            </div>
            <div class="product-content">
                <h4 class="product-name">${product.name}</h4>
                <div class="eco-impact">
                    <div style="font-size: var(--font-size-sm); margin-bottom: var(--space-4);">
                        🌱 Carbon: ${product.sustainabilityScore.carbonFootprint}/100
                    </div>
                    <div style="font-size: var(--font-size-sm); margin-bottom: var(--space-4);">
                        ♻️ Recyclable: ${product.sustainabilityScore.recyclability}/100
                    </div>
                    <div style="font-size: var(--font-size-sm); margin-bottom: var(--space-4);">
                        💧 Water: ${product.sustainabilityScore.waterUsage}/100
                    </div>
                    <div style="font-size: var(--font-size-sm);">
                        🤝 Ethical: ${product.sustainabilityScore.ethicalSourcing}/100
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderDashboardPage() {
    const user = appData.user;

    return `
        <div class="Profile-page">
            <div class="section-header mb-32">
                <div>
                    <h2>Welcome back, ${user.name}! 👋</h2>
                    <p>Track your sustainability journey and achievements</p>
                </div>
                <div class="user-avatar" style="width: 60px; height: 60px; font-size: var(--font-size-xl);">
                    ${user.avatar}
                </div>
            </div>

            <div class="stats-grid mb-32">
                <div class="stat-card">
                    <div class="stat-icon">🌱</div>
                    <div class="stat-value">${user.sustainabilityScore}</div>
                    <div class="stat-label">Sustainability Score</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💚</div>
                    <div class="stat-value">${user.totalCO2Saved}</div>
                    <div class="stat-label">Total CO2 Saved</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div class="stat-value">${user.followers}</div>
                    <div class="stat-label">Followers</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-value">${user.badges.length}</div>
                    <div class="stat-label">Badges Earned</div>
                </div>
            </div>

            <div class="cart-container mb-32">
                <h4 class="mb-16">Monthly Progress</h4>
                <div class="eco-impact">
                    <div class="flex justify-between mb-8">
                        <span>Goal: ${user.monthlyGoal}</span>
                        <span class="impact-positive">${user.currentProgress}</span>
                    </div>
                    <div style="background: var(--color-secondary); height: 8px; border-radius: var(--radius-full); overflow: hidden;">
                        <div style="background: var(--color-eco-green); height: 100%; width: 57%; transition: width 0.3s ease;"></div>
                    </div>
                    <p class="mt-8 mb-0" style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                        57% of monthly goal achieved
                    </p>
                </div>
            </div>

            <div class="cart-container">
                <h4 class="mb-16">Your Badges</h4>
                <div class="flex gap-8" style="flex-wrap: wrap;">
                    ${user.badges.map(badge => `
                        <div class="challenge-badge">${formatBadge(badge)}</div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function formatBadge(badge) {
    const badgeMap = {
        'eco-warrior': '🌱 Eco Warrior',
        'carbon-saver': '💚 Carbon Saver',
        'water-guardian': '💧 Water Guardian'
    };
    return badgeMap[badge] || badge;
}

// Header Component
function renderHeader() {
    const cart = appState.getState('cart');
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return `
        <header class="header">
            <div class="header-content">
                <div class="logo" onclick="navigateTo('home')">
                    <h1>🌱 EcoShop</h1>
                </div>
                <div class="search-container">
                    <input 
                        type="text" 
                        class="search-input" 
                        placeholder="Search sustainable products..."
                        onkeypress="handleSearch(event)"
                    />
                </div>
                <div class="header-actions">
                    <button class="cart-button" onclick="toggleCart()">
                        <i class="fas fa-shopping-cart"></i>
                        ${cartCount > 0 ? `<span class="cart-count">${cartCount}</span>` : ''}
                    </button>
                </div>
            </div>
        </header>
    `;
}

// Navigation Component
function renderNavigation() {
    const currentRoute = appState.getState('currentRoute');

    return `
        <div class="nav-tabs">
            <button class="nav-tab ${currentRoute === 'home' ? 'active' : ''}" onclick="navigateTo('home')">
                <i class="fas fa-home"></i> Home
            </button>
            <button class="nav-tab ${currentRoute === 'shop' ? 'active' : ''}" onclick="navigateTo('shop')">
                <i class="fas fa-store"></i> Shop
            </button>
            <button class="nav-tab ${currentRoute === 'community' ? 'active' : ''}" onclick="navigateTo('community')">
                <i class="fas fa-users"></i> Community
            </button>
            <button class="nav-tab ${currentRoute === 'ecoguide' ? 'active' : ''}" onclick="navigateTo('ecoguide')">
                <i class="fas fa-robot"></i> EcoGuide
            </button>
            <button class="nav-tab ${currentRoute === 'dashboard' ? 'active' : ''}" onclick="navigateTo('dashboard')">
                <i class="fas fa-user"></i> Dashboard
            </button>
        </div>
    `;
}

// Cart Component
function renderCart() {
    const cart = appState.getState('cart');
    const showCart = appState.getState('showCart');
    const total = CartService.getTotal();
    const totalCO2Impact = cart.reduce((sum, item) =>
        sum + (item.product.sustainabilityScore.carbonFootprint * item.quantity / 100), 0
    ).toFixed(1);

    if (!showCart) return '';

    return `
        <div class="modal" style="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
            <div class="cart-container" style="max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; position: relative;">
                <div class="flex justify-between items-center mb-16">
                    <h3>Your Cart</h3>
                    <button onclick="toggleCart()" style="background: none; border: none; font-size: var(--font-size-xl); cursor: pointer;">&times;</button>
                </div>
                
                ${cart.length === 0 ? `
                    <div class="text-center">
                        <p>Your cart is empty</p>
                        <button class="btn btn--primary" onclick="toggleCart(); navigateTo('shop')">
                            Start Shopping
                        </button>
                    </div>
                ` : `
                    ${cart.map(item => `
                        <div class="cart-item">
                            <div class="item-image">📦</div>
                            <div class="item-details">
                                <div class="item-name">${item.product.name}</div>
                                <div class="item-price">₹${item.product.price}</div>
                            </div>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="CartService.updateQuantity('${item.productId}', ${item.quantity - 1})">-</button>
                                <span style="min-width: 20px; text-align: center;">${item.quantity}</span>
                                <button class="quantity-btn" onclick="CartService.updateQuantity('${item.productId}', ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                    `).join('')}
                    
                    <div class="cart-summary">
                        <div class="eco-impact">
                            <div class="flex justify-between">
                                <span>🌱 Environmental Impact:</span>
                                <span class="impact-positive">-${totalCO2Impact}kg CO2 saved!</span>
                            </div>
                        </div>
                        <div class="summary-row total">
                            <span>Total:</span>
                            <span>₹${total}</span>
                        </div>
                        <button class="btn btn--primary btn--full-width mt-16" onclick="checkout()">
                            Proceed to Checkout
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
}

// Main App Renderer
function renderApp() {
    const currentRoute = appState.getState('currentRoute');
    const showCart = appState.getState('showCart');

    let pageContent = '';

    switch (currentRoute) {
        case 'home':
            pageContent = renderHomePage();
            break;
        case 'shop':
            pageContent = renderShopPage();
            break;
        case 'community':
            pageContent = renderCommunityPage();
            break;
        case 'ecoguide':
            pageContent = renderEcoGuidePage();
            break;
        case 'dashboard':
            pageContent = renderDashboardPage();
            break;
        default:
            pageContent = renderHomePage();
    }

    const appHTML = `
        <div class="app">
            ${renderHeader()}
            ${renderNavigation()}
            <main class="main-content">
                ${pageContent}
            </main>
            ${showCart ? renderCart() : ''}
        </div>
    `;

    document.getElementById('root').innerHTML = appHTML;
}

// Event Handlers
function navigateTo(route) {
    appState.setState('currentRoute', route);
    renderApp();
}

function toggleCart() {
    const showCart = appState.getState('showCart');
    appState.setState('showCart', !showCart);
    renderApp();
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query) {
            appState.setState('searchQuery', query);
            navigateTo('shop');
        }
    }
}

function filterByCategory(category) {
    // This could be implemented with more sophisticated filtering
    showNotification(`Filtering by category: ${category || 'All'}`);
}

function filterBySustainability(score) {
    showNotification(`Filtering by sustainability score: ${score || 'All'}`);
}

function viewProduct(productId) {
    const product = appData.products.find(p => p.id === productId);
    if (product) {
        showNotification(`Viewing ${product.name} - Feature coming soon!`);
    }
}

function setCommunityTab(tab) {
    appState.setState('communityTab', tab);
    renderApp();
}

function handleEcoGuideMessage(event) {
    if (event.key === 'Enter') {
        sendEcoGuideMessage();
    }
}

function sendEcoGuideMessage() {
    const input = document.getElementById('ecoGuideInput');
    const message = input.value.trim();
    if (!message) return;

    const messages = appState.getState('ecoGuideMessages') || [];

    // Add user message
    const userMessage = {
        id: Date.now(),
        content: message,
        sender: 'user',
        timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    appState.setState('ecoGuideMessages', newMessages);

    input.value = '';

    // Simulate AI response
    setTimeout(() => {
        const responses = [
            "Based on your preferences, I'd recommend products with sustainability scores above 85. They typically have lower carbon footprints and better ethical sourcing.",
            "The bamboo toothbrush has a 95/100 sustainability score! It's biodegradable and reduces plastic waste by 100% compared to traditional toothbrushes.",
            "Your current eco-score is amazing! To improve further, try choosing products with better recyclability ratings and lower water usage.",
            "Great question! Sustainable products often cost more upfront but save money long-term through durability and reduced environmental costs.",
            "I can help you compare products! The organic skincare set reduces your carbon footprint by 2.3kg CO2 compared to conventional alternatives."
        ];

        const aiResponse = {
            id: Date.now() + 1,
            content: responses[Math.floor(Math.random() * responses.length)],
            sender: 'ai',
            timestamp: new Date()
        };

        const currentMessages = appState.getState('ecoGuideMessages') || [];
        appState.setState('ecoGuideMessages', [...currentMessages, aiResponse]);
        renderApp();
    }, 1000);

    renderApp();
}

function checkout() {
    showNotification('Checkout feature coming soon! 🛒');
    toggleCart();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen and show app
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        renderApp();
    }, 1000);
});

// Subscribe to state changes
appState.subscribe('cart', renderApp);
appState.subscribe('currentRoute', renderApp);
appState.subscribe('showCart', renderApp);