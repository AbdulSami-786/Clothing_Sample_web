import React, { useState, useEffect, createContext, useContext, useReducer } from 'react';
import './App.css';

// =============================================
// HARDCODED CLOTHING DATA
// =============================================

const CLOTHING_PRODUCTS = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    price: 34.99,
    discountPercentage: 20,
    category: "men",
    subcategory: "tops",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    rating: 4.8,
    stock: 42,
    description: "Soft 100% organic cotton t-shirt with premium finish. Perfect for everyday wear.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop"
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    brand: "Premium Basics",
    material: "100% Organic Cotton",
    care: "Machine wash cold, tumble dry low"
  },
  {
    id: 2,
    title: "Designer Denim Jacket",
    price: 89.99,
    discountPercentage: 15,
    category: "men",
    subcategory: "outerwear",
    thumbnail: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    rating: 4.9,
    stock: 18,
    description: "Vintage wash denim jacket with custom distressing.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=500&fit=crop"
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Blue', 'Black'],
    brand: "Denim Co.",
    material: "100% Cotton Denim",
    care: "Dry clean only"
  },
  {
    id: 3,
    title: "Summer Floral Dress",
    price: 79.99,
    discountPercentage: 30,
    category: "women",
    subcategory: "dresses",
    thumbnail: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=500&fit=crop",
    rating: 4.7,
    stock: 28,
    description: "Lightweight floral print dress with ruffled sleeves.",
    images: [
      "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop"
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral', 'Blue'],
    brand: "Summer Styles",
    material: "Cotton Blend",
    care: "Hand wash, line dry"
  },
  {
    id: 4,
    title: "Cashmere Sweater",
    price: 129.99,
    discountPercentage: 25,
    category: "women",
    subcategory: "knitwear",
    thumbnail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
    rating: 4.9,
    stock: 12,
    description: "Luxury 100% cashmere crewneck sweater.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1584670747417-594a9412fba5?w=400&h=500&fit=crop"
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['Camel', 'Grey', 'Navy'],
    brand: "Luxury Wool",
    material: "100% Cashmere",
    care: "Dry clean only"
  },
  {
    id: 5,
    title: "Athleisure Joggers",
    price: 49.99,
    discountPercentage: 15,
    category: "activewear",
    subcategory: "bottoms",
    thumbnail: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=500&fit=crop",
    rating: 4.6,
    stock: 65,
    description: "Comfortable athletic joggers with moisture-wicking fabric.",
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop"
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    brand: "Active Life",
    material: "Polyester Blend",
    care: "Machine wash, tumble dry"
  },
  {
    id: 6,
    title: "Leather Chelsea Boots",
    price: 149.99,
    discountPercentage: 0,
    category: "footwear",
    subcategory: "boots",
    thumbnail: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop",
    rating: 4.8,
    stock: 24,
    description: "Premium leather chelsea boots with rubber sole.",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400&h=500&fit=crop"
    ],
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Brown', 'Black'],
    brand: "Leather Craft",
    material: "Genuine Leather",
    care: "Use leather conditioner"
  },
  {
    id: 7,
    title: "Slim Fit Blazer",
    price: 139.99,
    discountPercentage: 20,
    category: "men",
    subcategory: "formal",
    thumbnail: "https://images.unsplash.com/photo-1594938374182-2511f6d4c0b3?w=400&h=500&fit=crop",
    rating: 4.5,
    stock: 16,
    description: "Modern slim-fit blazer for business and formal occasions.",
    images: [
      "https://images.unsplash.com/photo-1594938374182-2511f6d4c0b3?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&h=500&fit=crop"
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Navy', 'Charcoal', 'Black'],
    brand: "Formal Wear",
    material: "Wool Blend",
    care: "Dry clean only"
  },
  {
    id: 8,
    title: "Silk Scarf",
    price: 39.99,
    discountPercentage: 10,
    category: "accessories",
    subcategory: "scarves",
    thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
    rating: 4.7,
    stock: 75,
    description: "Pure silk scarf with hand-rolled edges.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop"
    ],
    sizes: ['One Size'],
    colors: ['Multicolor', 'Blue', 'Red'],
    brand: "Silk Elegance",
    material: "100% Silk",
    care: "Hand wash in cold water"
  },
  {
    id: 9,
    title: "Classic Chino Pants",
    price: 59.99,
    discountPercentage: 10,
    category: "men",
    subcategory: "bottoms",
    thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    rating: 4.6,
    stock: 56,
    description: "Slim-fit chino pants in premium cotton twill.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=500&fit=crop"
    ],
    sizes: ['30x30', '32x32', '34x32', '36x32'],
    colors: ['Khaki', 'Navy', 'Olive'],
    brand: "Casual Wear",
    material: "100% Cotton",
    care: "Machine wash cold"
  },
  {
    id: 10,
    title: "Wool Overcoat",
    price: 199.99,
    discountPercentage: 25,
    category: "women",
    subcategory: "outerwear",
    thumbnail: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
    rating: 4.9,
    stock: 8,
    description: "Premium wool overcoat for winter season.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1539533113208-f6dfee2386e7?w=400&h=500&fit=crop"
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Camel', 'Navy', 'Black'],
    brand: "Winter Collection",
    material: "100% Wool",
    care: "Dry clean only"
  },
  {
    id: 11,
    title: "Graphic Hoodie",
    price: 45.99,
    discountPercentage: 20,
    category: "men",
    subcategory: "tops",
    thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    rating: 4.4,
    stock: 35,
    description: "Comfortable hoodie with modern graphic print.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop"
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Red'],
    brand: "Street Style",
    material: "Cotton Blend",
    care: "Machine wash cold"
  },
  {
    id: 12,
    title: "Evening Gown",
    price: 189.99,
    discountPercentage: 15,
    category: "women",
    subcategory: "dresses",
    thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    rating: 4.9,
    stock: 6,
    description: "Elegant evening gown with intricate detailing.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=500&fit=crop"
    ],
    sizes: ['XS', 'S', 'M'],
    colors: ['Black', 'Red', 'Gold'],
    brand: "Evening Elegance",
    material: "Silk Blend",
    care: "Dry clean only"
  }
];

const CLOTHING_CATEGORIES = [
  { 
    id: 'men', 
    name: 'Men', 
    icon: '👔', 
    count: 45,
    subcategories: ['Tops', 'Bottoms', 'Outerwear', 'Formal', 'Footwear']
  },
  { 
    id: 'women', 
    name: 'Women', 
    icon: '👗', 
    count: 52,
    subcategories: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories']
  },
  { 
    id: 'kids', 
    name: 'Kids', 
    icon: '👶', 
    count: 28,
    subcategories: ['Boys', 'Girls', 'Babies', 'Accessories']
  },
  { 
    id: 'footwear', 
    name: 'Footwear', 
    icon: '👟', 
    count: 31,
    subcategories: ['Sneakers', 'Boots', 'Sandals', 'Formal']
  },
  { 
    id: 'accessories', 
    name: 'Accessories', 
    icon: '👜', 
    count: 42,
    subcategories: ['Bags', 'Jewelry', 'Hats', 'Scarves', 'Belts']
  },
  { 
    id: 'activewear', 
    name: 'Activewear', 
    icon: '🏃', 
    count: 28,
    subcategories: ['Tops', 'Bottoms', 'Outerwear', 'Footwear']
  }
];

// =============================================
// CONTEXTS AND REDUCERS
// =============================================

const CartContext = createContext();
const WishlistContext = createContext();
const UserContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => 
        item.id === action.payload.product.id && 
        item.selectedSize === action.payload.size && 
        item.selectedColor === action.payload.color
      );
      
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.product.id && 
          item.selectedSize === action.payload.size && 
          item.selectedColor === action.payload.color
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        return [...state, {
          ...action.payload.product,
          quantity: action.payload.quantity,
          selectedSize: action.payload.size,
          selectedColor: action.payload.color,
          addedAt: new Date().toISOString()
        }];
      }
      
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
      
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      
    case 'CLEAR_CART':
      return [];
      
    default:
      return state;
  }
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.some(item => item.id === action.payload.id)) {
        return state;
      }
      return [...state, { ...action.payload, addedAt: new Date().toISOString() }];
      
    case 'REMOVE_FROM_WISHLIST':
      return state.filter(item => item.id !== action.payload);
      
    case 'CLEAR_WISHLIST':
      return [];
      
    default:
      return state;
  }
};

// =============================================
// TOAST SYSTEM
// =============================================

const Toast = ({ title, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{icons[type]}</span>
      <div className="toast-content">
        <div className="toast-title">{title}</div>
        <div className="toast-message">{message}</div>
      </div>
      <button onClick={onClose} className="toast-close">✕</button>
    </div>
  );
};

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  const showToast = (title, message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            title={toast.title}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// =============================================
// PRODUCT CARD COMPONENT
// =============================================

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { showToast } = useContext(ToastContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  useEffect(() => {
    setIsInWishlist(wishlist.some(item => item.id === product.id));
  }, [wishlist, product.id]);
  
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  
  const handleAddToCart = () => {
    addToCart(product, 1);
    showToast('Added to cart!', `${product.title} added to your cart`, 'success');
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist', `${product.title} removed`, 'info');
    } else {
      addToWishlist(product);
      showToast('Added to wishlist!', `${product.title} saved`, 'success');
    }
  };
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="product-image"
        />
        
        <div className="product-badges">
          {product.discountPercentage > 0 && (
            <span className="discount-badge">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
          {product.rating > 4.7 && (
            <span className="bestseller-badge">
              ⭐ Best Seller
            </span>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <span className="lowstock-badge">
              Only {product.stock} left
            </span>
          )}
        </div>
        
        <button 
          onClick={handleWishlistToggle}
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>
        
        <div className="quick-view-overlay">
          <div className="quick-view-buttons">
            <button 
              onClick={handleAddToCart}
              className="quick-add-btn"
            >
              Add to Cart
            </button>
            {onQuickView && (
              <button 
                onClick={() => onQuickView(product)}
                className="quick-view-btn"
              >
                Quick View
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="product-info">
        <div className="product-header">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <span className="star">★</span>
            <span className="rating-value">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="product-title">{product.title}</h3>
        <p className="product-brand">{product.brand}</p>
        
        <div className="product-pricing">
          <span className="current-price">${discountedPrice.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <span className="original-price">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        <div className="product-footer">
          <span className={`stock-status ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
          </span>
          <button 
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================
// HEADER COMPONENT
// =============================================

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;
  
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo(0, 0);
  };
  
  const filteredProducts = searchQuery 
    ? CLOTHING_PRODUCTS.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];
  
  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <span className="top-bar-item">🚚 Free shipping over $50</span>
              <span className="top-bar-item">↩️ 30-day returns</span>
            </div>
            <div className="top-bar-right">
              <a href="#contact" className="top-bar-link">Contact Us</a>
              <select className="currency-select">
                <option>USD $</option>
                <option>EUR €</option>
                <option>GBP £</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo" onClick={() => handleNavigation('home')}>
              <span className="logo-text">Style</span>Hub
            </div>
            
            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <button 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavigation('home')}
              >
                Home
              </button>
              <button 
                className={`nav-link ${currentPage === 'shop' ? 'active' : ''}`}
                onClick={() => handleNavigation('shop')}
              >
                Shop
              </button>
              <button 
                className={`nav-link ${currentPage === 'men' ? 'active' : ''}`}
                onClick={() => handleNavigation('men')}
              >
                Men
              </button>
              <button 
                className={`nav-link ${currentPage === 'women' ? 'active' : ''}`}
                onClick={() => handleNavigation('women')}
              >
                Women
              </button>
              <button 
                className={`nav-link ${currentPage === 'sale' ? 'active' : ''}`}
                onClick={() => handleNavigation('sale')}
              >
                Sale
              </button>
            </nav>
            
            {/* Search Bar */}
            <div className="search-container">
              <div className="search-wrapper">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for clothing..."
                  className="search-input"
                />
                <button className="search-btn">🔍</button>
                
                {filteredProducts.length > 0 && (
                  <div className="search-results">
                    {filteredProducts.map(product => (
                      <div 
                        key={product.id} 
                        className="search-result-item"
                        onClick={() => {
                          handleNavigation('product');
                          setSearchQuery('');
                        }}
                      >
                        <img src={product.thumbnail} alt={product.title} />
                        <div>
                          <div className="search-result-title">{product.title}</div>
                          <div className="search-result-price">${product.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="action-btn mobile-search-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                🔍
              </button>
              
              <button 
                className="action-btn"
                onClick={() => handleNavigation('wishlist')}
              >
                <span className="btn-icon">❤️</span>
                {wishlistCount > 0 && (
                  <span className="badge">{wishlistCount}</span>
                )}
              </button>
              
              <button 
                className="action-btn"
                onClick={() => handleNavigation('cart')}
              >
                <span className="btn-icon">🛒</span>
                {cartCount > 0 && (
                  <span className="badge">{cartCount}</span>
                )}
              </button>
              
              <button 
                className="action-btn account-btn"
                onClick={() => handleNavigation('account')}
              >
                <span className="btn-icon">👤</span>
              </button>
              
              <button 
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
          
          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="mobile-search">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="mobile-search-input"
              />
            </div>
          )}
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mobile-menu">
              <button 
                className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavigation('home')}
              >
                Home
              </button>
              <button 
                className={`mobile-nav-link ${currentPage === 'shop' ? 'active' : ''}`}
                onClick={() => handleNavigation('shop')}
              >
                Shop All
              </button>
              <button 
                className={`mobile-nav-link ${currentPage === 'men' ? 'active' : ''}`}
                onClick={() => handleNavigation('men')}
              >
                Men
              </button>
              <button 
                className={`mobile-nav-link ${currentPage === 'women' ? 'active' : ''}`}
                onClick={() => handleNavigation('women')}
              >
                Women
              </button>
              <button 
                className={`mobile-nav-link ${currentPage === 'kids' ? 'active' : ''}`}
                onClick={() => handleNavigation('kids')}
              >
                Kids
              </button>
              <button 
                className={`mobile-nav-link ${currentPage === 'sale' ? 'active' : ''}`}
                onClick={() => handleNavigation('sale')}
              >
                Sale
              </button>
              <button 
                className={`mobile-nav-link ${currentPage === 'account' ? 'active' : ''}`}
                onClick={() => handleNavigation('account')}
              >
                Account
              </button>
              <button 
                className={`mobile-nav-link ${currentPage === 'wishlist' ? 'active' : ''}`}
                onClick={() => handleNavigation('wishlist')}
              >
                Wishlist
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// =============================================
// HOME PAGE
// =============================================

const HomePage = ({ setCurrentPage, setSelectedProduct }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  
  useEffect(() => {
    // Featured products (high rating)
    setFeaturedProducts(CLOTHING_PRODUCTS.filter(p => p.rating >= 4.5).slice(0, 4));
    // New arrivals (simulate new products)
    setNewArrivals(CLOTHING_PRODUCTS.slice(0, 8));
    // Sale products (discount > 15%)
    setSaleProducts(CLOTHING_PRODUCTS.filter(p => p.discountPercentage >= 15).slice(0, 4));
  }, []);
  
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };
  
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };
  
  const categories = [
    { id: 'men', name: 'Men', image: '👔', count: 45 },
    { id: 'women', name: 'Women', image: '👗', count: 52 },
    { id: 'kids', name: 'Kids', image: '👶', count: 28 },
    { id: 'footwear', name: 'Footwear', image: '👟', count: 31 }
  ];
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Summer Collection 2024</h1>
            <p className="hero-subtitle">Discover the latest trends in fashion</p>
            <button 
              className="hero-btn"
              onClick={() => setCurrentPage('shop')}
            >
              Shop Now →
            </button>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over $50</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>30-Day Returns</h3>
              <p>Easy return policy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Quality Guarantee</h3>
              <p>Premium quality products</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <div 
                key={category.id}
                className="category-card"
                onClick={() => {
                  setCurrentPage(category.id);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="category-icon">{category.image}</div>
                <h3>{category.name}</h3>
                <p>{category.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <button 
              className="view-all-btn"
              onClick={() => setCurrentPage('shop')}
            >
              View All →
            </button>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Sale Banner */}
      <section className="sale-banner">
        <div className="container">
          <div className="sale-content">
            <h2>Summer Sale</h2>
            <p>Up to 50% off on selected items</p>
            <button 
              className="sale-btn"
              onClick={() => setCurrentPage('sale')}
            >
              Shop Sale
            </button>
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="new-arrivals-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <button 
              className="view-all-btn"
              onClick={() => setCurrentPage('shop')}
            >
              View All →
            </button>
          </div>
          <div className="products-grid">
            {newArrivals.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest updates</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-modal"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>
            <div className="quick-view-content">
              <img src={quickViewProduct.thumbnail} alt={quickViewProduct.title} />
              <div className="quick-view-info">
                <h3>{quickViewProduct.title}</h3>
                <p className="quick-view-price">${quickViewProduct.price}</p>
                <p className="quick-view-desc">{quickViewProduct.description}</p>
                <button 
                  className="view-details-btn"
                  onClick={() => handleViewProduct(quickViewProduct)}
                >
                  View Full Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================
// SHOP PAGE
// =============================================

const ShopPage = ({ setCurrentPage, setSelectedProduct }) => {
  const [products, setProducts] = useState(CLOTHING_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(CLOTHING_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  
  const categories = [
    { id: 'all', name: 'All Products', count: CLOTHING_PRODUCTS.length },
    { id: 'men', name: 'Men', count: CLOTHING_PRODUCTS.filter(p => p.category === 'men').length },
    { id: 'women', name: 'Women', count: CLOTHING_PRODUCTS.filter(p => p.category === 'women').length },
    { id: 'footwear', name: 'Footwear', count: CLOTHING_PRODUCTS.filter(p => p.category === 'footwear').length },
    { id: 'accessories', name: 'Accessories', count: CLOTHING_PRODUCTS.filter(p => p.category === 'accessories').length },
    { id: 'activewear', name: 'Activewear', count: CLOTHING_PRODUCTS.filter(p => p.category === 'activewear').length }
  ];
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['White', 'Black', 'Blue', 'Red', 'Green', 'Grey', 'Brown'];
  
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Simulate newest by ID (higher ID = newer)
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - by rating and discount
        filtered.sort((a, b) => {
          const scoreA = a.rating * 20 + a.discountPercentage;
          const scoreB = b.rating * 20 + b.discountPercentage;
          return scoreB - scoreA;
        });
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, priceRange, selectedSizes, selectedColors, products]);
  
  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 200]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('featured');
  };
  
  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1>Shop All Products</h1>
          <p>{filteredProducts.length} products found</p>
        </div>
        
        <div className="shop-content">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="filter-section">
              <h3>Categories</h3>
              <div className="filter-options">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`filter-option ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span>{category.name}</span>
                    <span className="filter-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-filter">
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                />
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
                <div className="price-range-values">
                  <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Sizes</h3>
              <div className="size-filters">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-filter ${selectedSizes.includes(size) ? 'active' : ''}`}
                    onClick={() => handleSizeToggle(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Colors</h3>
              <div className="color-filters">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`color-filter ${selectedColors.includes(color) ? 'active' : ''}`}
                    onClick={() => handleColorToggle(color)}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
          
          {/* Products Grid */}
          <div className="products-container">
            <div className="products-header">
              <div className="sort-options">
                <span>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No products match your filters.</p>
                <button onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onQuickView={(product) => {
                      setSelectedProduct(product);
                      setCurrentPage('product');
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// CATEGORY PAGES (Men, Women, Kids, etc.)
// =============================================

const CategoryPage = ({ category, setCurrentPage, setSelectedProduct }) => {
  const categoryProducts = CLOTHING_PRODUCTS.filter(p => p.category === category);
  const categoryInfo = CLOTHING_CATEGORIES.find(c => c.id === category);
  
  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="container">
          <h1>{categoryInfo?.name || category}</h1>
          <p>Explore our collection of {categoryProducts.length} items</p>
        </div>
      </div>
      
      <div className="container">
        {categoryInfo?.subcategories && (
          <div className="subcategories-section">
            <h2>Shop by Type</h2>
            <div className="subcategories-grid">
              {categoryInfo.subcategories.map(subcat => {
                const subcatProducts = categoryProducts.filter(p => 
                  p.subcategory?.toLowerCase().includes(subcat.toLowerCase())
                );
                return (
                  <div 
                    key={subcat}
                    className="subcategory-card"
                    onClick={() => {
                      // Filter products by subcategory
                      setCurrentPage('shop');
                    }}
                  >
                    <h3>{subcat}</h3>
                    <p>{subcatProducts.length} items</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <div className="category-products">
          <div className="section-header">
            <h2>All {categoryInfo?.name} Products</h2>
            <p>{categoryProducts.length} items</p>
          </div>
          
          <div className="products-grid">
            {categoryProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onQuickView={(product) => {
                  setSelectedProduct(product);
                  setCurrentPage('product');
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// PRODUCT DETAIL PAGE
// =============================================

const ProductDetailPage = ({ product, setCurrentPage }) => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { showToast } = useContext(ToastContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  useEffect(() => {
    if (product) {
      setIsInWishlist(wishlist.some(item => item.id === product.id));
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || '');
    }
  }, [product, wishlist]);
  
  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product not found</h2>
          <button onClick={() => setCurrentPage('shop')}>Continue Shopping</button>
        </div>
      </div>
    );
  }
  
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const relatedProducts = CLOTHING_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      showToast('Please select size and color', 'Choose options before adding to cart', 'warning');
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
    showToast('Added to cart!', `${product.title} added to your cart`, 'success');
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist', `${product.title} removed`, 'info');
    } else {
      addToWishlist(product);
      showToast('Added to wishlist!', `${product.title} saved`, 'success');
    }
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    setCurrentPage('cart');
  };
  
  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <button onClick={() => setCurrentPage('shop')}>Shop</button>
          <span>/</span>
          <button onClick={() => setCurrentPage(product.category)}>{product.category}</button>
          <span>/</span>
          <span>{product.title}</span>
        </div>
        
        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.images?.[selectedImage] || product.thumbnail} 
                alt={product.title}
              />
            </div>
            <div className="thumbnail-images">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} view ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1>{product.title}</h1>
              <div className="product-meta">
                <span className="brand">{product.brand}</span>
                <div className="rating">
                  <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
                  <span className="rating-value">{product.rating}</span>
                  <span className="review-count">({product.stock} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="product-pricing">
              <div className="price-container">
                <span className="current-price">${discountedPrice.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="original-price">${product.price.toFixed(2)}</span>
                    <span className="discount-percent">Save {product.discountPercentage}%</span>
                  </>
                )}
              </div>
              <div className="stock-status">
                {product.stock > 10 ? (
                  <span className="in-stock">✅ In Stock</span>
                ) : product.stock > 0 ? (
                  <span className="low-stock">⚠️ Only {product.stock} left</span>
                ) : (
                  <span className="out-of-stock">❌ Out of Stock</span>
                )}
              </div>
            </div>
            
            <div className="product-description">
              <p>{product.description}</p>
            </div>
            
            {/* Size Selection */}
            <div className="size-selection">
              <h3>Size</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="color-selection">
              <h3>Color</h3>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                    style={{ 
                      backgroundColor: color.toLowerCase(),
                      border: selectedColor === color ? '2px solid #000' : '1px solid #ddd'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button 
                className="buy-now-btn"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
              <button 
                className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                onClick={handleWishlistToggle}
              >
                {isInWishlist ? '❤️ Saved' : '🤍 Save'}
              </button>
            </div>
            
            {/* Product Tabs */}
            <div className="product-tabs">
              <div className="tab-headers">
                <button 
                  className={activeTab === 'description' ? 'active' : ''}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button 
                  className={activeTab === 'details' ? 'active' : ''}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button 
                  className={activeTab === 'shipping' ? 'active' : ''}
                  onClick={() => setActiveTab('shipping')}
                >
                  Shipping & Returns
                </button>
              </div>
              
              <div className="tab-content">
                {activeTab === 'description' && (
                  <div>
                    <p>{product.description}</p>
                    <ul>
                      <li>Material: {product.material}</li>
                      <li>Care: {product.care}</li>
                      <li>Brand: {product.brand}</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'details' && (
                  <div>
                    <h4>Product Details</h4>
                    <ul>
                      <li><strong>Material:</strong> {product.material}</li>
                      <li><strong>Care Instructions:</strong> {product.care}</li>
                      <li><strong>Brand:</strong> {product.brand}</li>
                      <li><strong>Category:</strong> {product.category}</li>
                      <li><strong>Subcategory:</strong> {product.subcategory}</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'shipping' && (
                  <div>
                    <h4>Shipping Information</h4>
                    <ul>
                      <li>📦 Free shipping on orders over $50</li>
                      <li>🚚 Standard shipping: 3-5 business days</li>
                      <li>⚡ Express shipping available</li>
                      <li>🌍 International shipping available</li>
                    </ul>
                    <h4>Returns Policy</h4>
                    <ul>
                      <li>↩️ 30-day return policy</li>
                      <li>✅ Free returns for unworn items</li>
                      <li>💳 Refund to original payment method</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct}
                  onQuickView={(product) => {
                    setCurrentPage('product');
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =============================================
// CART PAGE
// =============================================

const CartPage = ({ setCurrentPage }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };
  
  const calculateDiscount = () => {
    if (couponApplied) {
      return calculateSubtotal() * 0.1; // 10% discount for demo
    }
    return 0;
  };
  
  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 50 ? 0 : 5.99;
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };
  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = calculateShipping();
    const tax = calculateTax();
    return subtotal - discount + shipping + tax;
  };
  
  const handleApplyCoupon = () => {
    if (couponCode === 'STYLE10') {
      setCouponApplied(true);
      showToast('Coupon applied!', '10% discount has been applied', 'success');
    } else {
      showToast('Invalid coupon', 'Please enter a valid coupon code', 'error');
    }
  };
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Cart is empty', 'Add items to your cart before checkout', 'warning');
      return;
    }
    setCurrentPage('checkout');
  };
  
  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => setCurrentPage('shop')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item, index) => {
              const discountedPrice = item.price * (1 - item.discountPercentage / 100);
              const itemTotal = discountedPrice * item.quantity;
              
              return (
                <div key={`${item.id}-${index}`} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h3>{item.title}</h3>
                      <button 
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                    
                    <p className="cart-item-brand">{item.brand}</p>
                    
                    <div className="cart-item-options">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                    
                    <div className="cart-item-price">
                      <span className="current-price">${discountedPrice.toFixed(2)}</span>
                      {item.discountPercentage > 0 && (
                        <span className="original-price">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <div className="cart-item-quantity">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="cart-item-total">
                      Total: <span>${itemTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="cart-actions">
              <button 
                className="continue-shopping-btn"
                onClick={() => setCurrentPage('shop')}
              >
                ← Continue Shopping
              </button>
              <button 
                className="clear-cart-btn"
                onClick={() => {
                  clearCart();
                  showToast('Cart cleared', 'All items removed from cart', 'info');
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              {couponApplied && (
                <div className="summary-row discount">
                  <span>Discount (10%)</span>
                  <span>-${calculateDiscount().toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {calculateShipping() === 0 ? 'FREE' : `$${calculateShipping().toFixed(2)}`}
                </span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              
              <div className="summary-total">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            {/* Coupon Code */}
            <div className="coupon-section">
              <h3>Have a coupon?</h3>
              <div className="coupon-input">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                />
                <button 
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {couponApplied && (
                <p className="coupon-applied">Coupon "STYLE10" applied - 10% off!</p>
              )}
            </div>
            
            {/* Checkout Button */}
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            
            {/* Security Info */}
            <div className="security-info">
              <div className="security-item">
                <span>🔒</span>
                <span>Secure checkout</span>
              </div>
              <div className="security-item">
                <span>🛡️</span>
                <span>SSL encrypted</span>
              </div>
              <div className="security-item">
                <span>💳</span>
                <span>Multiple payment options</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// CHECKOUT PAGE
// =============================================

const CheckoutPage = ({ setCurrentPage }) => {
  const { cart, clearCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    shippingMethod: 'standard',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false
  });
  
  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discountPercentage / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
    
    const shipping = subtotal > 50 ? 0 : 
      formData.shippingMethod === 'express' ? 12.99 : 
      formData.shippingMethod === 'next-day' ? 24.99 : 5.99;
    
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      // Validate shipping info
      if (!formData.email || !formData.firstName || !formData.lastName || !formData.address) {
        showToast('Please fill all required fields', 'Complete shipping information', 'warning');
        return;
      }
    } else if (step === 2) {
      // Validate payment info
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        showToast('Please fill all payment details', 'Complete payment information', 'warning');
        return;
      }
    }
    setStep(step + 1);
  };
  
  const handlePlaceOrder = () => {
    // Generate order number
    const newOrderNumber = 'ORD-' + Date.now().toString().slice(-8);
    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);
    
    // Clear cart
    clearCart();
    
    showToast('Order placed successfully!', `Order #${newOrderNumber}`, 'success');
  };
  
  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page empty-cart">
        <div className="container">
          <h2>Your cart is empty</h2>
          <button onClick={() => setCurrentPage('shop')}>Continue Shopping</button>
        </div>
      </div>
    );
  }
  
  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <div className="container">
          <div className="confirmation-content">
            <div className="confirmation-icon">✅</div>
            <h1>Order Confirmed!</h1>
            <p className="order-number">Order #: {orderNumber}</p>
            <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
            
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Items:</span>
                  <span>{cart.length} items</span>
                </div>
                <div className="summary-row">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Delivery:</span>
                  <span>3-5 business days</span>
                </div>
              </div>
            </div>
            
            <div className="confirmation-actions">
              <button 
                className="continue-shopping-btn"
                onClick={() => setCurrentPage('shop')}
              >
                Continue Shopping
              </button>
              <button 
                className="view-orders-btn"
                onClick={() => setCurrentPage('account')}
              >
                View My Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        
        {/* Progress Steps */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Shipping</div>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Payment</div>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Review</div>
          </div>
        </div>
        
        <div className="checkout-content">
          {/* Shipping Information */}
          {step === 1 && (
            <div className="checkout-form">
              <h2>Shipping Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="shipping-methods">
                <h3>Shipping Method</h3>
                <div className="method-options">
                  <label className={`method-option ${formData.shippingMethod === 'standard' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                    />
                    <div className="method-info">
                      <span className="method-name">Standard Shipping</span>
                      <span className="method-time">3-5 business days</span>
                    </div>
                    <span className="method-price">${calculateTotal() > 50 ? 'FREE' : '5.99'}</span>
                  </label>
                  
                  <label className={`method-option ${formData.shippingMethod === 'express' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                    />
                    <div className="method-info">
                      <span className="method-name">Express Shipping</span>
                      <span className="method-time">1-2 business days</span>
                    </div>
                    <span className="method-price">$12.99</span>
                  </label>
                  
                  <label className={`method-option ${formData.shippingMethod === 'next-day' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="next-day"
                      checked={formData.shippingMethod === 'next-day'}
                      onChange={handleInputChange}
                    />
                    <div className="method-info">
                      <span className="method-name">Next Day Delivery</span>
                      <span className="method-time">Next business day</span>
                    </div>
                    <span className="method-price">$24.99</span>
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setCurrentPage('cart')}
                >
                  ← Back to Cart
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleNextStep}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}
          
          {/* Payment Information */}
          {step === 2 && (
            <div className="checkout-form">
              <h2>Payment Information</h2>
              
              <div className="payment-methods">
                <div className="payment-method selected">
                  <span>💳</span>
                  <span>Credit Card</span>
                </div>
                <div className="payment-method">
                  <span>📱</span>
                  <span>PayPal</span>
                </div>
                <div className="payment-method">
                  <span>🏦</span>
                  <span>Bank Transfer</span>
                </div>
              </div>
              
              <div className="form-group">
                <label>Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Name on Card *</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date *</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                />
                Save payment information for future purchases
              </label>
              
              <div className="security-badges">
                <div className="security-badge">
                  <span>🔒</span>
                  <span>256-bit SSL</span>
                </div>
                <div className="security-badge">
                  <span>🛡️</span>
                  <span>PCI Compliant</span>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setStep(1)}
                >
                  ← Back to Shipping
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleNextStep}
                >
                  Continue to Review
                </button>
              </div>
            </div>
          )}
          
          {/* Review Order */}
          {step === 3 && (
            <div className="checkout-form">
              <h2>Review Your Order</h2>
              
              <div className="order-review">
                <div className="review-section">
                  <h3>Shipping Information</h3>
                  <div className="review-info">
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p>{formData.country}</p>
                    <p>{formData.phone}</p>
                    <p>{formData.email}</p>
                  </div>
                </div>
                
                <div className="review-section">
                  <h3>Payment Method</h3>
                  <div className="review-info">
                    <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                    <p>{formData.cardName}</p>
                    <p>Expires: {formData.expiryDate}</p>
                  </div>
                </div>
                
                <div className="review-section">
                  <h3>Order Items</h3>
                  <div className="order-items-review">
                    {cart.map(item => {
                      const discountedPrice = item.price * (1 - item.discountPercentage / 100);
                      return (
                        <div key={item.id} className="order-item-review">
                          <div className="item-info">
                            <img src={item.thumbnail} alt={item.title} />
                            <div>
                              <h4>{item.title}</h4>
                              <p>Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                            </div>
                          </div>
                          <div className="item-price">
                            <span>${discountedPrice.toFixed(2)} × {item.quantity}</span>
                            <span>${(discountedPrice * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="order-total-review">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>${cart.reduce((total, item) => {
                    const discountedPrice = item.price * (1 - item.discountPercentage / 100);
                    return total + (discountedPrice * item.quantity);
                  }, 0).toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>
                    {formData.shippingMethod === 'standard' && calculateTotal() > 50 ? 'FREE' : 
                     formData.shippingMethod === 'express' ? '$12.99' : 
                     formData.shippingMethod === 'next-day' ? '$24.99' : '$5.99'}
                  </span>
                </div>
                <div className="total-row">
                  <span>Tax</span>
                  <span>${(cart.reduce((total, item) => {
                    const discountedPrice = item.price * (1 - item.discountPercentage / 100);
                    return total + (discountedPrice * item.quantity);
                  }, 0) * 0.08).toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="terms-agreement">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
              
              <div className="form-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setStep(2)}
                >
                  ← Back to Payment
                </button>
                <button 
                  className="btn-primary place-order-btn"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
          
          {/* Order Summary Sidebar */}
          <div className="order-summary-sidebar">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cart.slice(0, 3).map(item => (
                <div key={item.id} className="summary-item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <p>Qty: {item.quantity} | ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              {cart.length > 3 && (
                <p className="more-items">+{cart.length - 3} more items</p>
              )}
            </div>
            
            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>
                  {formData.shippingMethod === 'standard' && calculateTotal() > 50 ? 'FREE' : 
                   formData.shippingMethod === 'express' ? '$12.99' : 
                   formData.shippingMethod === 'next-day' ? '$24.99' : '$5.99'}
                </span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${(cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.08).toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// WISHLIST PAGE
// =============================================

const WishlistPage = ({ setCurrentPage, setSelectedProduct }) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  
  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    showToast('Moved to cart!', `${product.title} added to cart`, 'success');
  };
  
  const handleRemoveAll = () => {
    clearWishlist();
    showToast('Wishlist cleared', 'All items removed from wishlist', 'info');
  };
  
  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page empty-wishlist">
        <div className="container">
          <div className="empty-wishlist-content">
            <div className="empty-wishlist-icon">❤️</div>
            <h2>Your wishlist is empty</h2>
            <p>Save items you love for later</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => setCurrentPage('shop')}
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>{wishlist.length} items</p>
        </div>
        
        <div className="wishlist-actions">
          <button 
            className="clear-wishlist-btn"
            onClick={handleRemoveAll}
          >
            Clear All
          </button>
        </div>
        
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item.id} className="wishlist-item">
              <div className="wishlist-item-image">
                <img src={item.thumbnail} alt={item.title} />
                <button 
                  className="remove-wishlist-btn"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  ✕
                </button>
              </div>
              
              <div className="wishlist-item-info">
                <h3>{item.title}</h3>
                <p className="wishlist-item-brand">{item.brand}</p>
                
                <div className="wishlist-item-price">
                  <span className="current-price">
                    ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                  </span>
                  {item.discountPercentage > 0 && (
                    <span className="original-price">${item.price.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="wishlist-item-actions">
                  <button 
                    className="move-to-cart-btn"
                    onClick={() => handleMoveToCart(item)}
                  >
                    Move to Cart
                  </button>
                  <button 
                    className="view-item-btn"
                    onClick={() => {
                      setSelectedProduct(item);
                      setCurrentPage('product');
                    }}
                  >
                    View Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// =============================================
// ACCOUNT PAGE
// =============================================

const AccountPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (123) 456-7890',
    address: '123 Main St, New York, NY 10001',
    joinDate: 'January 2023'
  });
  
  const orders = [
    { id: 'ORD-2023-001', date: 'Jan 15, 2023', total: '$149.99', status: 'Delivered' },
    { id: 'ORD-2023-002', date: 'Feb 28, 2023', total: '$89.99', status: 'Delivered' },
    { id: 'ORD-2023-003', date: 'Mar 12, 2023', total: '$199.99', status: 'Processing' },
    { id: 'ORD-2023-004', date: 'Apr 5, 2023', total: '$59.99', status: 'Shipped' }
  ];
  
  return (
    <div className="account-page">
      <div className="container">
        <h1>My Account</h1>
        
        <div className="account-content">
          {/* Sidebar */}
          <div className="account-sidebar">
            <div className="user-profile">
              <div className="user-avatar">👤</div>
              <h3>{userData.name}</h3>
              <p>Member since {userData.joinDate}</p>
            </div>
            
            <div className="account-menu">
              <button 
                className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                📦 My Orders
              </button>
              <button 
                className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                👤 Profile
              </button>
              <button 
                className={`menu-item ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                🏠 Addresses
              </button>
              <button 
                className={`menu-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setCurrentPage('wishlist')}
              >
                ❤️ Wishlist
              </button>
              <button 
                className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                ⚙️ Settings
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="account-main">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="account-tab">
                <h2>My Orders</h2>
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div>
                          <h3>Order #{order.id}</h3>
                          <p className="order-date">Placed on {order.date}</p>
                        </div>
                        <div className="order-status">
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="order-details">
                        <div className="order-total">
                          <span>Total:</span>
                          <strong>{order.total}</strong>
                        </div>
                        <button className="view-order-btn">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="account-tab">
                <h2>Profile Information</h2>
                <form className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" defaultValue={userData.name} />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue={userData.email} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" defaultValue={userData.phone} />
                  </div>
                  <button type="submit" className="save-btn">Save Changes</button>
                </form>
              </div>
            )}
            
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="account-tab">
                <h2>My Addresses</h2>
                <div className="addresses-list">
                  <div className="address-card">
                    <h3>Default Shipping Address</h3>
                    <p>{userData.address}</p>
                    <div className="address-actions">
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                  <button className="add-address-btn">+ Add New Address</button>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="account-tab">
                <h2>Account Settings</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <h3>Email Notifications</h3>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <h3>SMS Notifications</h3>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <h3>Two-Factor Authentication</h3>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// SALE PAGE
// =============================================

const SalePage = ({ setCurrentPage, setSelectedProduct }) => {
  const saleProducts = CLOTHING_PRODUCTS.filter(p => p.discountPercentage >= 15);
  
  return (
    <div className="sale-page">
      <div className="sale-hero">
        <div className="container">
          <h1>Summer Sale</h1>
          <p>Up to 50% off on selected items</p>
          <div className="sale-countdown">
            <div className="countdown-item">
              <span className="countdown-value">12</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">18</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">45</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">30</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="sale-products">
          <div className="section-header">
            <h2>On Sale Now</h2>
            <p>{saleProducts.length} items at discounted prices</p>
          </div>
          
          <div className="products-grid">
            {saleProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onQuickView={(product) => {
                  setSelectedProduct(product);
                  setCurrentPage('product');
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="sale-categories">
          <h2>Shop Sale Categories</h2>
          <div className="sale-categories-grid">
            <div 
              className="sale-category-card"
              onClick={() => setCurrentPage('men')}
            >
              <h3>Men's Sale</h3>
              <p>Up to 50% off</p>
            </div>
            <div 
              className="sale-category-card"
              onClick={() => setCurrentPage('women')}
            >
              <h3>Women's Sale</h3>
              <p>Up to 60% off</p>
            </div>
            <div 
              className="sale-category-card"
              onClick={() => setCurrentPage('footwear')}
            >
              <h3>Footwear Sale</h3>
              <p>Up to 40% off</p>
            </div>
            <div 
              className="sale-category-card"
              onClick={() => setCurrentPage('accessories')}
            >
              <h3>Accessories Sale</h3>
              <p>Up to 30% off</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// FOOTER
// =============================================

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>StyleHub</h3>
            <p>Your destination for premium fashion and curated style.</p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🎵</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Shop</h4>
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Kids</a>
            <a href="#">Accessories</a>
            <a href="#">Sale</a>
          </div>
          
          <div className="footer-section">
            <h4>Help</h4>
            <a href="#">Contact Us</a>
            <a href="#">Shipping Info</a>
            <a href="#">Returns</a>
            <a href="#">Size Guide</a>
            <a href="#">FAQs</a>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Sustainability</a>
            <a href="#">Press</a>
            <a href="#">Terms</a>
          </div>
          
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe for updates and exclusive offers</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button>→</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 StyleHub. All rights reserved.</p>
          <div className="payment-methods">
            <span>💳</span>
            <span>🏦</span>
            <span>📱</span>
            <span>🔒</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// =============================================
// MAIN APP COMPONENT
// =============================================

function App() {
  const [cart, cartDispatch] = useReducer(cartReducer, []);
  const [wishlist, wishlistDispatch] = useReducer(wishlistReducer, []);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const addToCart = (product, quantity = 1, size = null, color = null) => {
    cartDispatch({ 
      type: 'ADD_TO_CART', 
      payload: { product, quantity, size, color }
    });
  };
  
  const updateQuantity = (id, quantity) => {
    cartDispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const removeFromCart = (id) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  const clearCart = () => {
    cartDispatch({ type: 'CLEAR_CART' });
  };
  
  const addToWishlist = (product) => {
    wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };
  
  const removeFromWishlist = (id) => {
    wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };
  
  const clearWishlist = () => {
    wishlistDispatch({ type: 'CLEAR_WISHLIST' });
  };
  
  const cartContextValue = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
  
  const wishlistContextValue = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
      case 'shop':
        return <ShopPage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
      case 'men':
      case 'women':
      case 'kids':
      case 'footwear':
      case 'accessories':
      case 'activewear':
        return <CategoryPage 
          category={currentPage} 
          setCurrentPage={setCurrentPage} 
          setSelectedProduct={setSelectedProduct} 
        />;
      case 'product':
        return <ProductDetailPage product={selectedProduct} setCurrentPage={setCurrentPage} />;
      case 'cart':
        return <CartPage setCurrentPage={setCurrentPage} />;
      case 'checkout':
        return <CheckoutPage setCurrentPage={setCurrentPage} />;
      case 'wishlist':
        return <WishlistPage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
      case 'account':
        return <AccountPage setCurrentPage={setCurrentPage} />;
      case 'sale':
        return <SalePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
    }
  };
  
  return (
    <CartContext.Provider value={cartContextValue}>
      <WishlistContext.Provider value={wishlistContextValue}>
        <ToastProvider>
          <div className="app">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            {renderPage()}
            <Footer />
          </div>
        </ToastProvider>
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
}

export default App;