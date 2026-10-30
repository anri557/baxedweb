"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// SVG Brand Logo Path
const LOGO_PATH =
  "M80 24 L182 24 L207 32 L222 45 L229 58 L231 66 L231 85 L225 100 L215 111 L226 120 L231 128 L235 142 L235 153 L233 164 L228 175 L217 188 L203 197 L186 202 L78 202 L72 197 L70 193 L70 33 L74 27 L80 24 Z M325 24 L351 24 L359 31 L390 104 L428 186 L429 196 L425 201 L392 201 L386 191 L373 159 L301 159 L288 190 L281 201 L250 202 L245 197 L245 189 L285 104 L315 34 L317 30 L325 24 Z M439 24 L468 24 L473 26 L516 82 L520 79 L529 65 L533 62 L560 26 L565 24 L594 24 L600 29 L600 39 L540 110 L540 113 L544 116 L580 164 L599 186 L601 196 L597 201 L561 201 L517 142 L473 200 L469 202 L438 202 L433 198 L433 187 L437 184 L451 164 L493 113 L493 110 L484 101 L480 94 L474 89 L470 82 L454 65 L440 46 L434 41 L432 31 L434 27 L439 24 Z M629 24 L760 24 L764 26 L768 32 L768 54 L766 58 L760 62 L628 62 L621 55 L621 31 L626 25 L629 24 Z M796 24 L887 25 L910 33 L932 50 L945 69 L950 82 L954 104 L954 122 L951 140 L946 154 L939 167 L924 184 L905 196 L884 202 L794 202 L789 198 L787 194 L787 174 L792 166 L877 165 L889 162 L905 150 L913 136 L916 124 L916 101 L913 90 L903 74 L901 74 L894 67 L880 62 L795 62 L791 60 L787 53 L787 33 L790 27 L796 24 Z M109 60 L108 94 L173 95 L185 92 L190 88 L193 82 L193 72 L191 68 L187 64 L180 61 L109 60 Z M338 77 L333 84 L317 123 L358 123 L338 77 Z M630 93 L754 93 L759 95 L763 100 L763 125 L756 132 L628 132 L621 125 L621 100 L625 95 L630 93 Z M109 130 L108 165 L179 165 L191 160 L196 152 L195 140 L191 135 L183 131 L109 130 Z M628 165 L761 165 L767 170 L768 173 L768 195 L761 202 L627 202 L621 196 L621 171 L628 165 Z";

// Catalog of buildable products with verified images and categories
const BYOB_PRODUCTS = [
  // TOPS
  {
    id: "heavyweight-tee",
    title: "Heavyweight Tee",
    category: "tops",
    price: 32.0,
    summary: "Boxy fit, 280gsm cotton",
    tag: "BEST SELLER",
    rating: 5,
    reviews: 2784,
    image: "/ShopTop.jpeg"
  },
  {
    id: "merino-crew",
    title: "Merino Crew",
    category: "tops",
    price: 78.0,
    summary: "Fine knit, all-season wool",
    tag: "",
    rating: 5,
    reviews: 1120,
    image: "/ShopTop.jpeg"
  },
  {
    id: "oxford-shirt",
    title: "Oxford Shirt",
    category: "tops",
    price: 64.0,
    summary: "Crisp, wrinkle-resistant cotton",
    tag: "",
    rating: 5,
    reviews: 940,
    image: "/ShopTop.jpeg"
  },

  // BOTTOMS
  {
    id: "tapered-chinos",
    title: "Tapered Chinos",
    category: "bottoms",
    price: 68.0,
    summary: "Stretch twill, clean taper",
    tag: "BEST SELLER",
    rating: 5,
    reviews: 3445,
    image: "/ShopBottoms.jpeg"
  },
  {
    id: "washed-denim",
    title: "Washed Denim",
    category: "bottoms",
    price: 89.0,
    summary: "Straight leg, 12oz denim",
    tag: "NEW",
    rating: 5,
    reviews: 1873,
    image: "/ShopBottoms.jpeg"
  },
  {
    id: "cargo-joggers",
    title: "Cargo Joggers",
    category: "bottoms",
    price: 72.0,
    summary: "Relaxed fit with zip utility pockets",
    tag: "",
    rating: 5,
    reviews: 860,
    image: "/ShopBottoms.jpeg"
  },

  // OUTWEARS
  {
    id: "mans-outwear",
    title: "Mans Outwear",
    category: "outwears",
    price: 149.0,
    summary: "Matte shell, quilted lining",
    tag: "BEST SELLER",
    rating: 5,
    reviews: 2896,
    image: "/outwear.jpeg"
  },
  {
    id: "wool-overcoat",
    title: "Wool Overcoat",
    category: "outwears",
    price: 229.0,
    summary: "Knee length, tailored wool blend",
    tag: "NEW",
    rating: 5,
    reviews: 869,
    image: "/outwear.jpeg"
  },

  // FOOTWEAR
  {
    id: "leather-chelsea",
    title: "Leather Chelsea",
    category: "footwear",
    price: 159.0,
    summary: "Full-grain leather, Goodyear welt",
    tag: "",
    rating: 5,
    reviews: 1402,
    image: "/chelsea.jpg"
  },
  {
    id: "minimal-sneaker",
    title: "Minimal Sneaker",
    category: "footwear",
    price: 110.0,
    summary: "Clean white leather cupsole",
    tag: "BEST SELLER",
    rating: 5,
    reviews: 3120,
    image: "/sneaker.jpg"
  }
];

export default function BuildYourSetPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [bundleMap, setBundleMap] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (category) => {
    setOpenSubmenu((prev) => (prev === category ? null : category));
  };

  const toastTimeoutRef = useRef(null);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastActive(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setIsToastActive(false);
    }, 2400);
  };

  // Sync body scroll when any drawer is open
  useEffect(() => {
    if (isNavDrawerOpen || isCartDrawerOpen || isMobilePanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavDrawerOpen, isCartDrawerOpen, isMobilePanelOpen]);

  // Read existing cart from localStorage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem("baxed_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        setTimeout(() => {
          setCartItems(parsed);
        }, 0);
      }
    } catch (e) {}
  }, []);

  const saveCart = (items) => {
    setCartItems(items);
    try {
      localStorage.setItem("baxed_cart", JSON.stringify(items));
    } catch (e) {}
  };

  // Bundle calculations (pure total, no offer/discounts)
  const totalCount = Object.values(bundleMap).reduce((sum, count) => sum + count, 0);

  const subtotal = Object.entries(bundleMap).reduce((sum, [id, count]) => {
    const prod = BYOB_PRODUCTS.find((p) => p.id === id);
    return sum + (prod ? prod.price * count : 0);
  }, 0);

  // Flatten bundle items for the 4 slots
  const flatItems = [];
  Object.entries(bundleMap).forEach(([id, count]) => {
    const prod = BYOB_PRODUCTS.find((p) => p.id === id);
    if (prod) {
      for (let i = 0; i < count; i++) {
        flatItems.push(prod);
      }
    }
  });

  const addItemToBundle = (product) => {
    setBundleMap((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    showToast(`Added ${product.title} to set`);
  };

  const removeItemFromBundle = (product) => {
    setBundleMap((prev) => {
      const current = prev[product.id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[product.id];
        return next;
      }
      return {
        ...prev,
        [product.id]: current - 1
      };
    });
  };

  const removeSlotItem = (index) => {
    const itemToRemove = flatItems[index];
    if (!itemToRemove) return;
    removeItemFromBundle(itemToRemove);
  };

  // Add the built set directly to cart
  const handleProceedToCheckout = () => {
    if (totalCount === 0) {
      showToast("Select at least 1 item to add to your set!");
      return;
    }

    const bundleCartItem = {
      name: `Custom Set (${totalCount} ${totalCount === 1 ? "Item" : "Items"})`,
      category: "Build your set",
      description: flatItems.map((p) => p.title).join(" + "),
      price: Math.round(subtotal),
      rating: 5.0,
      reviews: 200,
      color: "#9b36ff",
      quantity: 1,
      bundleProducts: flatItems.map((p) => p.title)
    };

    const nextCart = [bundleCartItem, ...cartItems];
    saveCart(nextCart);
    setIsMobilePanelOpen(false);
    setIsCartDrawerOpen(true);
    showToast("Custom set added to your bag!");
  };

  // Filtered products
  const filteredProducts =
    activeCategory === "all"
      ? BYOB_PRODUCTS
      : BYOB_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="site-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar
        isNavDrawerOpen={isNavDrawerOpen}
        onMenuToggle={() => {
          if (!isNavDrawerOpen && isCartDrawerOpen) setIsCartDrawerOpen(false);
          setIsNavDrawerOpen(!isNavDrawerOpen);
        }}
        onCartClick={() => {
          if (!isCartDrawerOpen && isNavDrawerOpen) setIsNavDrawerOpen(false);
          setIsCartDrawerOpen(true);
        }}
        onAccountClick={() => showToast("Account portal opening soon")}
        cartCount={cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
      />

      {/* Slide-out Navigation Drawer (Mobile) */}
      <div
        className={`nav-drawer-backdrop ${isNavDrawerOpen ? "open" : ""}`}
        id="navDrawerBackdrop"
        onClick={() => setIsNavDrawerOpen(false)}
      ></div>
      <aside
        className={`nav-drawer ${isNavDrawerOpen ? "open" : ""}`}
        id="navDrawer"
        aria-label="Navigation drawer"
        aria-hidden={!isNavDrawerOpen}
      >
        <div className="nav-drawer-promo">BUILD YOUR OWN SET · SAVE UP TO 20% + 3 FREE GIFTS</div>
        <div className="nav-drawer-header">
          <button
            className="nav-drawer-close"
            id="drawerClose"
            aria-label="Close menu"
            type="button"
            onClick={() => setIsNavDrawerOpen(false)}
          >
            &times;
          </button>
          <Link className="nav-drawer-title" href="/" aria-label="BAXED home" onClick={() => setIsNavDrawerOpen(false)}>
            <svg viewBox="65 20 895 185" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d={LOGO_PATH} />
            </svg>
          </Link>
          <div className="nav-drawer-actions">
            <button
              type="button"
              className="drawer-account"
              aria-label="Account"
              onClick={() => {
                setIsNavDrawerOpen(false);
                showToast("Account portal opening soon");
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button
              type="button"
              className="drawer-cart-btn"
              aria-label="Cart"
              onClick={() => {
                setIsNavDrawerOpen(false);
                setIsCartDrawerOpen(true);
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="drawer-cart-count">
                {cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0)}
              </span>
            </button>
          </div>
        </div>
        <nav className="nav-drawer-links" id="drawerNav">
          <div className={`drawer-category ${openSubmenu === "Tops" ? "is-expanded" : ""}`}>
            <button
              className="drawer-category-toggle"
              type="button"
              aria-expanded={openSubmenu === "Tops"}
              aria-controls="drawer-submenu-tops"
              onClick={() => toggleSubmenu("Tops")}
            >
              <span>Tops</span>
              <span className="drawer-category-chevron" aria-hidden="true"></span>
            </button>
            <div
              className={`drawer-submenu-wrapper ${openSubmenu === "Tops" ? "is-open" : ""}`}
              id="drawer-submenu-tops"
              aria-hidden={openSubmenu !== "Tops"}
            >
              <div className="drawer-submenu-inner">
                <div className="drawer-submenu-list">
                  <Link href="/tops?filter=T-Shirts+%26+Basics" onClick={() => setIsNavDrawerOpen(false)}>
                    T-Shirts &amp; Basics
                  </Link>
                  <Link href="/tops?filter=Blouses+%26+Shirts" onClick={() => setIsNavDrawerOpen(false)}>
                    Blouses &amp; Shirts
                  </Link>
                  <Link href="/tops?filter=Sweaters+%26+Knitwear" onClick={() => setIsNavDrawerOpen(false)}>
                    Sweaters &amp; Knitwear
                  </Link>
                  <Link href="/tops?filter=Casual+%26+Sleeveless+Wear" onClick={() => setIsNavDrawerOpen(false)}>
                    Casual &amp; Sleeveless Wear
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={`drawer-category ${openSubmenu === "Bottoms" ? "is-expanded" : ""}`}>
            <button
              className="drawer-category-toggle"
              type="button"
              aria-expanded={openSubmenu === "Bottoms"}
              aria-controls="drawer-submenu-bottoms"
              onClick={() => toggleSubmenu("Bottoms")}
            >
              <span>Bottoms</span>
              <span className="drawer-category-chevron" aria-hidden="true"></span>
            </button>
            <div
              className={`drawer-submenu-wrapper ${openSubmenu === "Bottoms" ? "is-open" : ""}`}
              id="drawer-submenu-bottoms"
              aria-hidden={openSubmenu !== "Bottoms"}
            >
              <div className="drawer-submenu-inner">
                <div className="drawer-submenu-list">
                  <Link href="/bottoms?filter=Jeans+%26+Denim" onClick={() => setIsNavDrawerOpen(false)}>
                    Jeans &amp; Denim
                  </Link>
                  <Link href="/bottoms?filter=Trousers+%26+Chinos" onClick={() => setIsNavDrawerOpen(false)}>
                    Trousers &amp; Chinos
                  </Link>
                  <Link href="/bottoms?filter=Shorts" onClick={() => setIsNavDrawerOpen(false)}>
                    Shorts
                  </Link>
                  <Link href="/bottoms?filter=Joggers+%26+Sweatpants" onClick={() => setIsNavDrawerOpen(false)}>
                    Joggers &amp; Sweatpants
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={`drawer-category ${openSubmenu === "Outerwear" ? "is-expanded" : ""}`}>
            <button
              className="drawer-category-toggle"
              type="button"
              aria-expanded={openSubmenu === "Outerwear"}
              aria-controls="drawer-submenu-outerwear"
              onClick={() => toggleSubmenu("Outerwear")}
            >
              <span>Outerwear</span>
              <span className="drawer-category-chevron" aria-hidden="true"></span>
            </button>
            <div
              className={`drawer-submenu-wrapper ${openSubmenu === "Outerwear" ? "is-open" : ""}`}
              id="drawer-submenu-outerwear"
              aria-hidden={openSubmenu !== "Outerwear"}
            >
              <div className="drawer-submenu-inner">
                <div className="drawer-submenu-list">
                  <Link href="/outerwear?filter=Jackets" onClick={() => setIsNavDrawerOpen(false)}>
                    Jackets
                  </Link>
                  <Link href="/outerwear?filter=Coats" onClick={() => setIsNavDrawerOpen(false)}>
                    Coats
                  </Link>
                  <Link href="/outerwear?filter=Overshirts" onClick={() => setIsNavDrawerOpen(false)}>
                    Overshirts
                  </Link>
                  <Link href="/outerwear?filter=Hoodies+%26+Sweatshirts" onClick={() => setIsNavDrawerOpen(false)}>
                    Hoodies &amp; Sweatshirts
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={`drawer-category ${openSubmenu === "Footwear" ? "is-expanded" : ""}`}>
            <button
              className="drawer-category-toggle"
              type="button"
              aria-expanded={openSubmenu === "Footwear"}
              aria-controls="drawer-submenu-footwear"
              onClick={() => toggleSubmenu("Footwear")}
            >
              <span>Footwear</span>
              <span className="drawer-category-chevron" aria-hidden="true"></span>
            </button>
            <div
              className={`drawer-submenu-wrapper ${openSubmenu === "Footwear" ? "is-open" : ""}`}
              id="drawer-submenu-footwear"
              aria-hidden={openSubmenu !== "Footwear"}
            >
              <div className="drawer-submenu-inner">
                <div className="drawer-submenu-list">
                  <Link href="/#shop" onClick={() => setIsNavDrawerOpen(false)}>
                    Sneakers
                  </Link>
                  <Link href="/#shop" onClick={() => setIsNavDrawerOpen(false)}>
                    Boots
                  </Link>
                  <Link href="/#shop" onClick={() => setIsNavDrawerOpen(false)}>
                    Loafers
                  </Link>
                  <Link href="/#shop" onClick={() => setIsNavDrawerOpen(false)}>
                    Sandals
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/#sets"
            className="drawer-direct-link"
            onClick={() => setIsNavDrawerOpen(false)}
          >
            Shop by category
          </Link>
          <Link
            href="/#shop"
            className="drawer-direct-link"
            onClick={() => setIsNavDrawerOpen(false)}
          >
            Early Access
          </Link>
        </nav>
        <div className="nav-drawer-footer">
          <p style={{ margin: "0 0 12px" }}>Free worldwide shipping over $100.</p>
          <div>
            <Link
              href="/#shop"
              id="drawerAccountLink"
              onClick={() => setIsNavDrawerOpen(false)}
            >
              Join Member Club
            </Link>
          </div>
        </div>
      </aside>

      {/* Cart Drawer */}
      <div
        className={`cart-drawer-backdrop ${isCartDrawerOpen ? "open" : ""}`}
        onClick={() => {
          setIsCartDrawerOpen(false);
        }}
      />
      <aside className={`cart-drawer ${isCartDrawerOpen ? "open" : ""}`} id="cartDrawer" aria-hidden={!isCartDrawerOpen}>
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <span>Your bag</span>
            <span className="cart-drawer-count">
              ({cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0)})
            </span>
          </div>
          <button
            type="button"
            className="cart-drawer-close"
            aria-label="Close cart"
            onClick={() => setIsCartDrawerOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="cart-drawer-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <p>Your bag is currently empty.</p>
              <button
                type="button"
                className="btn gold"
                style={{ marginTop: "16px" }}
                onClick={() => setIsCartDrawerOpen(false)}
              >
                Start building
              </button>
            </div>
          ) : (
            <div className="cart-items-wrapper">
              <div className="cart-items-list">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-desc">{item.description}</p>
                      <p className="cart-item-price">${item.price}</p>
                    </div>
                    <button
                      type="button"
                      className="cart-item-remove"
                      onClick={() => {
                        const next = cartItems.filter((_, i) => i !== idx);
                        saveCart(next);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <span>${cartItems.reduce((s, it) => s + it.price * (it.quantity || 1), 0)}</span>
                </div>
                <button
                  type="button"
                  className="btn gold btn-checkout"
                  onClick={() => showToast("Checkout integration opening soon")}
                >
                  Continue to checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* SECTION 1: HERO BANNER (WITH HERO.JPEG) */}
      <section
        className="byob-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(10, 10, 10, 0.96) 0%, rgba(10, 10, 10, 0.85) 45%, rgba(10, 10, 10, 0.4) 100%), linear-gradient(180deg, rgba(10, 10, 10, 0.5) 0%, transparent 20%, transparent 80%, rgba(10, 10, 10, 0.95) 100%), url('/hero.jpeg')`,
          backgroundPosition: "right center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
        aria-label="Build Your Set Header"
      >
        <div className="byob-hero-inner">
          <span className="byob-hero-eyebrow">BUILD YOUR SET</span>
          <div className="byob-hero-headings">
            <h1 className="byob-hero-title">Build your set</h1>
            <h2 className="byob-hero-title-accent">Curate your look</h2>
          </div>
          <p className="byob-hero-body">
            Mix and match essential tops, bottoms, outwears, and footwear to create your personal 4-piece BASED set.
          </p>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE BUNDLE BUILDER */}
      <main className="byob-main-section">
        <div className="byob-container">
          {/* Builder Layout: Product Grid + Sticky Sidebar */}
          <div className="byob-layout">
            {/* Left Column: Category Tabs & Product Grid */}
            <div className="byob-main">
              {/* Category Filter Tabs: Square and compact styling */}
              <div className="byob-tabs" role="tablist" aria-label="Category filter">
                {[
                  { id: "all", label: "ALL" },
                  { id: "tops", label: "TOPS" },
                  { id: "bottoms", label: "BOTTOMS" },
                  { id: "outwears", label: "OUTWEARS" },
                  { id: "footwear", label: "FOOTWEAR" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === tab.id}
                    className={`byob-tab ${activeCategory === tab.id ? "active" : ""}`}
                    onClick={(e) => {
                      setActiveCategory(tab.id);
                      if (e.currentTarget?.scrollIntoView) {
                        e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                      }
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Product Cards Grid */}
              <div className="byob-grid">
                {filteredProducts.map((product) => {
                  const qty = bundleMap[product.id] || 0;
                  return (
                    <div key={product.id} className="byob-card">
                      <div className="byob-card-media">
                        {product.tag && <span className="byob-card-badge">{product.tag}</span>}
                        <img
                          src={product.image}
                          alt={product.title}
                          className="byob-card-img"
                          loading="lazy"
                        />
                        {qty > 0 && (
                          <span className="byob-card-added-chip">
                            Added ({qty})
                          </span>
                        )}
                      </div>

                      <div className="byob-card-info">
                        <div className="byob-card-rating">
                          <span className="byob-stars">★★★★★</span>
                          <span className="byob-review-count">({product.reviews})</span>
                        </div>
                        <h3 className="byob-card-title">{product.title}</h3>
                        <p className="byob-card-subtitle">{product.summary}</p>
                        <div className="byob-card-price">
                          <span className="price-currency">$</span>{product.price.toFixed(2)}
                        </div>
                      </div>

                      <div className="byob-card-actions">
                        {qty === 0 ? (
                          <button
                            type="button"
                            className="byob-btn-add"
                            onClick={() => addItemToBundle(product)}
                          >
                            <span>ADD TO SET</span>
                            <svg className="byob-bag-icon" viewBox="0 0 15 17" fill="none" aria-hidden="true">
                              <path
                                d="M6.40625 0C7.42331 0 8.39893 0.403967 9.11816 1.12305C9.83733 1.84222 10.2421 2.81791 10.2422 3.83496V3.85645H12.8125V9.74414C12.6078 9.71838 12.3992 9.70312 12.1875 9.70312C11.9757 9.70313 11.7673 9.71835 11.5625 9.74414V5.10645H10.2422V6.40625H8.99219V5.10645H3.82129V6.40625H2.57129V5.10645H1.25V12.834C1.25005 13.1786 1.38716 13.5092 1.63086 13.7529C1.8746 13.9966 2.20513 14.1338 2.5498 14.1338H7.25977C7.24159 14.3063 7.23242 14.4818 7.23242 14.6592C7.23244 14.9053 7.25048 15.1473 7.28516 15.3838H2.5498C1.87361 15.3838 1.22523 15.1148 0.74707 14.6367C0.268949 14.1586 5.35364e-05 13.5102 0 12.834V3.85645H2.57129V3.83496C2.5714 2.81792 2.97517 1.84222 3.69434 1.12305C4.41355 0.403901 5.38918 5.04216e-05 6.40625 0ZM6.40625 1.25C5.7207 1.25005 5.06291 1.52211 4.57812 2.00684C4.09338 2.49158 3.8214 3.14944 3.82129 3.83496V3.85645H8.99219V3.83496C8.99208 3.14943 8.71913 2.49159 8.23438 2.00684C7.74956 1.52218 7.09178 1.25 6.40625 1.25Z"
                                fill="currentColor"
                              />
                              <path
                                d="M12.6758 12.501V14.0117H14.1875V14.8232H12.6758V16.335H11.8643V14.8232H10.3535V14.0117H11.8643V12.501H12.6758Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.2"
                              />
                            </svg>
                          </button>
                        ) : (
                          <div className="byob-stepper">
                            <button
                              type="button"
                              className="byob-step-btn"
                              aria-label="Remove one"
                              onClick={() => removeItemFromBundle(product)}
                            >
                              −
                            </button>
                            <span className="byob-step-qty">{qty}</span>
                            <button
                              type="button"
                              className="byob-step-btn"
                              aria-label="Add one"
                              onClick={() => addItemToBundle(product)}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Bottom Sheet Backdrop */}
            <div
              className={`byob-sheet-backdrop ${isMobilePanelOpen ? "open" : ""}`}
              onClick={() => setIsMobilePanelOpen(false)}
              aria-hidden="true"
            />

            {/* Right Column: Sticky Sidebar on Desktop / Popup Bottom Sheet on Mobile */}
            <aside
              className={`byob-sidebar ${isMobilePanelOpen ? "is-open" : "is-collapsed"}`}
              aria-label="Bundle status and checkout"
            >
              {/* Header / Expand Handle */}
              <div
                className="byob-sidebar-header-bar"
                onClick={() => setIsMobilePanelOpen((prev) => !prev)}
                role="button"
                tabIndex={0}
                aria-expanded={isMobilePanelOpen}
                aria-label={isMobilePanelOpen ? "Collapse bundle set" : "Expand bundle set"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsMobilePanelOpen((prev) => !prev);
                  }
                }}
              >
                <div className="byob-sidebar-head">
                  <div className="byob-sidebar-titles">
                    <h2 className="byob-sidebar-title">Build your set.</h2>
                    <h3 className="byob-sidebar-accent">Curate your 4 pieces</h3>
                  </div>
                  <div className="byob-mobile-status">
                    {totalCount < 4 ? (
                      <span>{totalCount} of 4 items selected</span>
                    ) : (
                      <span className="purple-text">Set Complete ({totalCount} items)</span>
                    )}
                    {subtotal > 0 && <span> · ${subtotal.toFixed(2)}</span>}
                  </div>
                </div>

                <button
                  type="button"
                  className={`byob-sidebar-toggle-btn ${isMobilePanelOpen ? "open" : ""}`}
                  aria-label={isMobilePanelOpen ? "Collapse bundle set" : "Expand bundle set"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobilePanelOpen((prev) => !prev);
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="byob-chevron-icon"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </div>

              {/* Sidebar Body (Clean Squares, Totals, Actions) */}
              <div className="byob-sidebar-body">
                <div className="byob-sidebar-progress-row">
                  <p className="byob-sidebar-progress-msg">
                    {totalCount < 4 ? (
                      <span>{totalCount} of 4 items selected</span>
                    ) : (
                      <span className="purple-text">
                        <strong>Set Complete ({totalCount} items)</strong>
                      </span>
                    )}
                  </p>
                  <div className="byob-sidebar-bar">
                    <div
                      className="byob-sidebar-bar-fill"
                      style={{ width: `${Math.min(100, (totalCount / 4) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* 4 Slots (Clean Squares, No Offers) */}
                <div className="byob-slots-grid">
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const item = flatItems[slotIdx];
                    return (
                      <div
                        key={slotIdx}
                        className={`byob-slot ${item ? "filled" : "empty"}`}
                      >
                        <span className="byob-slot-num">{slotIdx + 1}</span>
                        {item ? (
                          <div className="byob-slot-content">
                            <img src={item.image} alt="" className="byob-slot-thumb" />
                            <div className="byob-slot-info">
                              <span className="byob-slot-title">{item.title}</span>
                              <span className="byob-slot-price">${item.price.toFixed(2)}</span>
                            </div>
                            <button
                              type="button"
                              className="byob-slot-remove"
                              aria-label={`Remove ${item.title}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSlotItem(slotIdx);
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span className="byob-slot-hint">Select Product</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Extra Items Indicator if > 4 */}
                {flatItems.length > 4 && (
                  <div className="byob-extra-count-row">
                    <span>+{flatItems.length - 4} additional item(s) in set</span>
                  </div>
                )}

                {/* Totals Summary */}
                <div className="byob-totals">
                  <div className="byob-total-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="byob-total-row grand-total-row">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout / Add Bundle Button */}
                <button
                  type="button"
                  className={`byob-checkout-btn ${totalCount > 0 ? "active" : "disabled"}`}
                  onClick={() => {
                    if (totalCount === 0) {
                      setIsMobilePanelOpen(false);
                      showToast("Select products to add to your set");
                    } else {
                      handleProceedToCheckout();
                    }
                  }}
                >
                  {totalCount === 0 ? (
                    <span>SELECT PRODUCTS</span>
                  ) : (
                    <span>ADD TO BAG · ${subtotal.toFixed(2)}</span>
                  )}
                </button>

                <p className="byob-checkout-note">Review and complete your custom set.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      <div
        className={`toast ${isToastActive ? "active" : ""}`}
        id="toast"
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>

      {/* Footer from main page */}
      <Footer />
    </div>
  );
}
