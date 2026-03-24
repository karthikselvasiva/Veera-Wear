/* ============================================
   VEERA WEAR — Product Data & Seed Data
   ============================================ */

const PRODUCTS = [
  {
    id: 1, name: "Midnight Velvet Blazer", category: "men", subcategory: "outerwear",
    price: 189.00, oldPrice: 249.00, badge: "Sale",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop"
    ],
    sizes: ["S","M","L","XL"], rating: 4.8, reviews: 124, isNew: false,
    description: "Crafted from premium Italian velvet, this blazer transitions effortlessly from boardroom to evening events. Features a slim-fit silhouette, satin-lined interior, and hand-finished details."
  },
  {
    id: 2, name: "Ivory Silk Drape Dress", category: "women", subcategory: "dresses",
    price: 245.00, oldPrice: null, badge: "New",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop"
    ],
    sizes: ["XS","S","M","L"], rating: 4.9, reviews: 89, isNew: true,
    description: "A statement piece in pure mulberry silk with a fluid drape that flatters every figure. Features a cowl neckline, adjustable straps, and a bias-cut hem."
  },
  {
    id: 3, name: "Charcoal Cashmere Overcoat", category: "men", subcategory: "outerwear",
    price: 395.00, oldPrice: null, badge: null,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&h=800&fit=crop"
    ],
    sizes: ["M","L","XL","XXL"], rating: 4.7, reviews: 56, isNew: false,
    description: "Luxurious double-breasted overcoat in 100% cashmere. Fully lined with a tailored fit that exudes sophistication. Perfect for the modern gentleman."
  },
  {
    id: 4, name: "Rose Gold Sequin Top", category: "women", subcategory: "tops",
    price: 125.00, oldPrice: 165.00, badge: "Sale",
    image: "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0uj7a?w=600&h=800&fit=crop"
    ],
    sizes: ["XS","S","M","L"], rating: 4.6, reviews: 203, isNew: false,
    description: "Turn heads with this dazzling rose gold sequin top. Features a relaxed fit, scoop neckline, and fully lined interior for comfortable all-night wear."
  },
  {
    id: 5, name: "Obsidian Slim-Fit Jeans", category: "men", subcategory: "bottoms",
    price: 98.00, oldPrice: null, badge: "New",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop"
    ],
    sizes: ["28","30","32","34","36"], rating: 4.5, reviews: 312, isNew: true,
    description: "Our signature slim-fit jeans in deep obsidian wash. Made from premium stretch denim with a mid-rise waist and tapered leg for a modern silhouette."
  },
  {
    id: 6, name: "Emerald Wrap Maxi Dress", category: "women", subcategory: "dresses",
    price: 198.00, oldPrice: null, badge: null,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop"
    ],
    sizes: ["XS","S","M","L","XL"], rating: 4.8, reviews: 67, isNew: false,
    description: "A stunning wrap maxi dress in rich emerald green. Features a deep V-neckline, flutter sleeves, and a self-tie waist that creates a beautifully defined silhouette."
  },
  {
    id: 7, name: "Pearl White Oxford Shirt", category: "men", subcategory: "tops",
    price: 85.00, oldPrice: null, badge: null,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=800&fit=crop"
    ],
    sizes: ["S","M","L","XL","XXL"], rating: 4.4, reviews: 178, isNew: false,
    description: "The essential Oxford shirt in crisp pearl white. Crafted from Egyptian cotton with a spread collar, French cuffs, and mother-of-pearl buttons."
  },
  {
    id: 8, name: "Noir Leather Biker Jacket", category: "women", subcategory: "outerwear",
    price: 320.00, oldPrice: 420.00, badge: "Sale",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&h=800&fit=crop"
    ],
    sizes: ["XS","S","M","L"], rating: 4.9, reviews: 145, isNew: false,
    description: "Iconic biker jacket in buttery-soft lambskin leather. Features asymmetric zip closure, quilted panels, and antique silver hardware."
  },
  {
    id: 9, name: "Sapphire Knit Polo", category: "men", subcategory: "tops",
    price: 72.00, oldPrice: null, badge: "New",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=800&fit=crop"
    ],
    sizes: ["S","M","L","XL"], rating: 4.3, reviews: 92, isNew: true,
    description: "Luxurious knitted polo in deep sapphire blue. Made from premium pima cotton with a textured weave and ribbed collar and cuffs."
  },
  {
    id: 10, name: "Blush Silk Camisole", category: "women", subcategory: "tops",
    price: 78.00, oldPrice: null, badge: null,
    image: "https://images.unsplash.com/photo-1564246544814-647aff343b24?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564246544814-647aff343b24?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0uj7a?w=600&h=800&fit=crop"
    ],
    sizes: ["XS","S","M","L"], rating: 4.6, reviews: 158, isNew: false,
    description: "Effortless elegance in a delicate silk camisole. Features adjustable spaghetti straps, a lace-trimmed neckline, and a relaxed fit."
  },
  {
    id: 11, name: "Graphite Tailored Trousers", category: "men", subcategory: "bottoms",
    price: 145.00, oldPrice: null, badge: null,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop"
    ],
    sizes: ["28","30","32","34","36"], rating: 4.7, reviews: 86, isNew: false,
    description: "Precision-tailored trousers in sophisticated graphite. Made from premium wool blend with a flat front, slim-tapered leg, and hidden flex waistband."
  },
  {
    id: 12, name: "Champagne Pleated Skirt", category: "women", subcategory: "bottoms",
    price: 110.00, oldPrice: 145.00, badge: "Sale",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaec?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaec?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=600&h=800&fit=crop"
    ],
    sizes: ["XS","S","M","L"], rating: 4.5, reviews: 73, isNew: false,
    description: "Flowing pleated midi skirt in luxurious champagne satin. Features an elasticized waist, knife pleats, and a luminous sheen that catches the light."
  }
];

const REVIEWS_DATA = [
  { productId: 1, author: "James K.", rating: 5, date: "2026-03-10", text: "Absolutely stunning blazer. The velvet quality is remarkable and the fit is perfect. Worth every penny." },
  { productId: 1, author: "Michael R.", rating: 5, date: "2026-02-28", text: "Received so many compliments wearing this to a gala. The satin lining is a beautiful touch." },
  { productId: 2, author: "Sophie L.", rating: 5, date: "2026-03-15", text: "This dress is pure elegance. The silk drapes beautifully and the cowl neckline is so flattering." },
  { productId: 2, author: "Emma W.", rating: 5, date: "2026-03-01", text: "I wore this to a wedding and couldn't stop receiving compliments. The quality is exceptional." },
  { productId: 3, author: "David H.", rating: 5, date: "2026-02-20", text: "The cashmere feels incredible. It's warm, stylish, and the double-breasted design is classic." },
  { productId: 4, author: "Aria M.", rating: 4, date: "2026-03-05", text: "Love the sparkle! Perfect for a night out. Sizing runs slightly large so consider going down a size." },
  { productId: 5, author: "Chris T.", rating: 5, date: "2026-03-12", text: "Best fitting jeans I've ever owned. The stretch is perfect and the obsidian wash is gorgeous." },
  { productId: 6, author: "Isabella N.", rating: 5, date: "2026-02-15", text: "The color is absolutely stunning in person. This wrap dress makes me feel like a million dollars." },
  { productId: 7, author: "Robert P.", rating: 4, date: "2026-03-08", text: "Great quality Oxford. The Egyptian cotton is soft and the fit is spot-on. A wardrobe essential." },
  { productId: 8, author: "Olivia S.", rating: 5, date: "2026-03-18", text: "This leather is buttery soft! The jacket fits like a glove and the hardware is beautiful." },
  { productId: 9, author: "Alexander V.", rating: 4, date: "2026-03-14", text: "Nice polo with a premium feel. The sapphire color is deeper than expected but I love it." },
  { productId: 10, author: "Grace R.", rating: 5, date: "2026-02-25", text: "So delicate and beautiful. Perfect layering piece. The lace trim is a gorgeous detail." },
  { productId: 11, author: "Nathan B.", rating: 5, date: "2026-03-02", text: "These trousers are a game-changer. The flex waistband is genius and the fit is impeccable." },
  { productId: 12, author: "Charlotte E.", rating: 4, date: "2026-03-11", text: "Beautiful skirt with a lovely movement. The champagne color is versatile for many occasions." }
];

const TESTIMONIALS = [
  { name: "Victoria M.", role: "Fashion Blogger", avatar: "VM", text: "VEERA WEAR has completely elevated my wardrobe. Every piece feels like it was designed specifically for me. The quality is unmatched." },
  { name: "Alexander J.", role: "Creative Director", avatar: "AJ", text: "Finally, a brand that understands modern luxury. The attention to detail in every stitch is remarkable. I'm a customer for life." },
  { name: "Priya S.", role: "Architect", avatar: "PS", text: "I appreciate brands that combine aesthetics with sustainability. VEERA WEAR does both beautifully. Their pieces are timeless investments." }
];

// Utility functions
function _getProductsSource() {
  return window.SITE_PRODUCTS || PRODUCTS;
}

function getProductsByCategory(category) {
  const source = _getProductsSource();
  if (!category || category === 'all') return source;
  return source.filter(p => p.category === category);
}

function getNewArrivals() {
  return _getProductsSource().filter(p => p.is_new || p.isNew || p.badge === 'New' || p.badge === 'NEW');
}

function getProductById(id) {
  return _getProductsSource().find(p => p.id === parseInt(id));
}

function getRelatedProducts(product, limit = 4) {
  return _getProductsSource().filter(p => p.id !== product.id && p.category === product.category).slice(0, limit);
}

async function getProductReviews(productId) {
  const defaults = REVIEWS_DATA.filter(r => r.productId === parseInt(productId));

  // Fetch from Supabase
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', parseInt(productId))
      .order('created_at', { ascending: false });

    if (!error && data) {
      const supaReviews = data.map(r => ({
        productId: r.product_id,
        author: r.author_name,
        rating: r.rating,
        date: r.created_at.split('T')[0],
        text: r.review_text
      }));
      return [...defaults, ...supaReviews];
    }
  } catch (e) {
    console.error('Reviews fetch error:', e);
  }

  // Fallback to localStorage
  const stored = JSON.parse(localStorage.getItem('veerawear_reviews') || '[]');
  return [...defaults, ...stored.filter(r => r.productId === parseInt(productId))];
}

async function getAllReviewStats() {
  const stats = {};
  
  REVIEWS_DATA.forEach(r => {
    if (!stats[r.productId]) stats[r.productId] = { sum: 0, count: 0 };
    stats[r.productId].sum += r.rating;
    stats[r.productId].count += 1;
  });

  if (window.supabase) {
    try {
      const { data } = await supabase.from('reviews').select('product_id, rating');
      if (data) {
        data.forEach(r => {
          if (!stats[r.product_id]) stats[r.product_id] = { sum: 0, count: 0 };
          stats[r.product_id].sum += r.rating;
          stats[r.product_id].count += 1;
        });
      }
    } catch(e){}
  }

  const stored = JSON.parse(localStorage.getItem('veerawear_reviews') || '[]');
  stored.forEach(r => {
    if (!stats[r.productId]) stats[r.productId] = { sum: 0, count: 0 };
    stats[r.productId].sum += r.rating;
    stats[r.productId].count += 1;
  });

  return stats;
}

async function submitReviewToSupabase(productId, authorName, rating, text) {
  if (Auth.isLoggedIn()) {
    const { error } = await supabase
      .from('reviews')
      .insert({
        user_id: Auth.getCurrentUser().id,
        product_id: parseInt(productId),
        author_name: authorName,
        rating: parseInt(rating),
        review_text: text
      });
    if (error) { console.error('Review insert error:', error); return false; }
    return true;
  }
  // Fallback: store locally
  const stored = JSON.parse(localStorage.getItem('veerawear_reviews') || '[]');
  stored.push({ productId: parseInt(productId), author: authorName, rating: parseInt(rating), date: new Date().toISOString().split('T')[0], text });
  localStorage.setItem('veerawear_reviews', JSON.stringify(stored));
  return true;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '<span class="star-empty">' + '★'.repeat(empty) + '</span>';
}

function formatPrice(price) {
  return 'Rs. ' + price.toFixed(2);
}

function generateOrderId() {
  return 'AW-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}
