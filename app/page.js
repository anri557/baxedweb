"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Product catalog data
const products = [
  {
    name: "Heavyweight Tee",
    category: "Tops",
    description: "Boxy fit, 280gsm cotton",
    price: 32,
    rating: 4.8,
    reviews: 2784,
    color: "#2b2b2b",
    tag: "Best seller"
  },
  {
    name: "Merino Crew",
    category: "Tops",
    description: "Fine knit, all-season",
    price: 78,
    rating: 4.9,
    reviews: 1120,
    color: "#3a3326",
    tag: ""
  },
  {
    name: "Oxford Shirt",
    category: "Tops",
    description: "Crisp, wrinkle-resistant",
    price: 64,
    rating: 4.7,
    reviews: 940,
    color: "#27313b",
    tag: ""
  },
  {
    name: "Tapered Chinos",
    category: "Bottoms",
    description: "Stretch twill, clean taper",
    price: 68,
    rating: 4.8,
    reviews: 3445,
    color: "#3b3528",
    tag: ""
  },
  {
    name: "Washed Denim",
    category: "Bottoms",
    description: "Straight leg, 12oz",
    price: 89,
    rating: 4.6,
    reviews: 1873,
    color: "#1f2937",
    tag: "New"
  },
  {
    name: "Cargo Joggers",
    category: "Bottoms",
    description: "Relaxed with zip pockets",
    price: 72,
    rating: 4.7,
    reviews: 860,
    color: "#2d3326",
    tag: ""
  },
  {
    name: "Bomber Jacket",
    category: "Outerwear",
    description: "Matte shell, quilted lining",
    price: 149,
    rating: 4.9,
    reviews: 2896,
    color: "#222",
    tag: ""
  },
  {
    name: "Wool Overcoat",
    category: "Outerwear",
    description: "Knee length, tailored",
    price: 229,
    rating: 4.8,
    reviews: 869,
    color: "#33291f",
    tag: "New"
  },
  {
    name: "Leather Chelsea",
    category: "Footwear",
    description: "Full-grain, Goodyear welt",
    price: 159,
    rating: 4.9,
    reviews: 1402,
    color: "#2a1d14",
    tag: ""
  },
  {
    name: "Minimal Sneaker",
    category: "Footwear",
    description: "Clean white leather",
    price: 110,
    rating: 4.7,
    reviews: 3120,
    color: "#d8d4c8",
    tag: "Best seller"
  }
];

// SVG icon paths by product category
const categoryShapes = {
  Tops: "M30 10 L10 24 L20 42 L30 36 V92 H70 V36 L80 42 L90 24 L70 10 Q50 24 30 10Z",
  Bottoms: "M28 8 H72 L78 94 H54 L50 40 L46 94 H22 Z",
  Outerwear: "M32 8 Q50 20 68 8 L92 26 L82 50 L74 44 V94 H26 V44 L18 50 L8 26 Z",
  Footwear: "M8 54 L36 50 L48 36 L60 52 Q90 54 94 70 V78 H8 Z"
};

const LOGO_PATH =
  "M80 24 L182 24 L207 32 L222 45 L229 58 L231 66 L231 85 L225 100 L215 111 L226 120 L231 128 L235 142 L235 153 L233 164 L228 175 L217 188 L203 197 L186 202 L78 202 L72 197 L70 193 L70 33 L74 27 L80 24 Z M325 24 L351 24 L359 31 L390 104 L428 186 L429 196 L425 201 L392 201 L386 191 L373 159 L301 159 L288 190 L281 201 L250 202 L245 197 L245 189 L285 104 L315 34 L317 30 L325 24 Z M439 24 L468 24 L473 26 L516 82 L520 79 L529 65 L533 62 L560 26 L565 24 L594 24 L600 29 L600 39 L540 110 L540 113 L544 116 L580 164 L599 186 L601 196 L597 201 L561 201 L517 142 L473 200 L469 202 L438 202 L433 198 L433 187 L437 184 L451 164 L493 113 L493 110 L484 101 L480 94 L474 89 L470 82 L454 65 L440 46 L434 41 L432 31 L434 27 L439 24 Z M629 24 L760 24 L764 26 L768 32 L768 54 L766 58 L760 62 L628 62 L621 55 L621 31 L626 25 L629 24 Z M796 24 L887 25 L910 33 L932 50 L945 69 L950 82 L954 104 L954 122 L951 140 L946 154 L939 167 L924 184 L905 196 L884 202 L794 202 L789 198 L787 194 L787 174 L792 166 L877 165 L889 162 L905 150 L913 136 L916 124 L916 101 L913 90 L903 74 L901 74 L894 67 L880 62 L795 62 L791 60 L787 53 L787 33 L790 27 L796 24 Z M109 60 L108 94 L173 95 L185 92 L190 88 L193 82 L193 72 L191 68 L187 64 L180 61 L109 60 Z M338 77 L333 84 L317 123 L358 123 L338 77 Z M630 93 L754 93 L759 95 L763 100 L763 125 L756 132 L628 132 L621 125 L621 100 L625 95 L630 93 Z M109 130 L108 165 L179 165 L191 160 L196 152 L195 140 L191 135 L183 131 L109 130 Z M628 165 L761 165 L767 170 L768 173 L768 195 L761 202 L627 202 L621 196 L621 171 L628 165 Z";

const filterCategories = ["Tops", "Bottoms", "Outerwear", "Footwear"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Tops");
  const [cartItems, setCartItems] = useState([]);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);

  const [stat1, setStat1] = useState("3,000,000+");
  const [stat2, setStat2] = useState("200,000+");
  const [statProgress, setStatProgress] = useState(1);

  const toastTimeoutRef = useRef(null);
  const proofSectionRef = useRef(null);
  const hasAnimatedStatsRef = useRef(false);

  // Display temporary toast alert
  const showToast = (message) => {
    setToastMessage(message);
    setIsToastActive(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setIsToastActive(false);
    }, 1800);
  };

  // Sync body scroll when any drawer is open
  useEffect(() => {
    if (isNavDrawerOpen || isCartDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavDrawerOpen, isCartDrawerOpen]);

  // Keyboard accessibility: Escape closes open drawers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isCartDrawerOpen) setIsCartDrawerOpen(false);
        if (isNavDrawerOpen) setIsNavDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartDrawerOpen, isNavDrawerOpen]);

  // Social proof counter animation on scroll into view
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || hasAnimatedStatsRef.current) {
      return;
    }

    if ("IntersectionObserver" in window && proofSectionRef.current) {
      setStat1("0+");
      setStat2("0+");
      setStatProgress(0);

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            hasAnimatedStatsRef.current = true;
            observer.disconnect();

            const duration = 2000;
            let startTime = null;

            const updateCount = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              // Smooth cubic ease out
              const eased = 1 - Math.pow(1 - progress, 3);

              const val1 = Math.round(3000000 * eased);
              const val2 = Math.round(200000 * eased);

              setStat1(`${val1.toLocaleString()}+`);
              setStat2(`${val2.toLocaleString()}+`);
              setStatProgress(eased);

              if (progress < 1) {
                window.requestAnimationFrame(updateCount);
              } else {
                setStat1("3,000,000+");
                setStat2("200,000+");
                setStatProgress(1);
              }
            };

            window.requestAnimationFrame(updateCount);
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(proofSectionRef.current);
      return () => observer.disconnect();
    }
  }, []);

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    showToast(`${product.name} added to cart`);
  };

  const handleAddFeaturedSet = (setName) => {
    setCartItems((prev) => [
      ...prev,
      { name: setName, category: "Set", price: null }
    ]);
    showToast(`${setName} added to cart`);
  };

  const handleRemoveFromCart = (productName) => {
    setCartItems((prev) => prev.filter((item) => item.name !== productName));
  };

  const handleAddQuantity = (productName) => {
    const item = cartItems.find((i) => i.name === productName);
    if (item) {
      setCartItems((prev) => [...prev, item]);
    }
  };

  const openCart = () => {
    if (isNavDrawerOpen) setIsNavDrawerOpen(false);
    setIsCartDrawerOpen(true);
  };

  const handleCategoryFilter = (cat) => {
    setActiveCategory(cat);
    const shopEl = document.getElementById("shop");
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: "smooth" });
    }
    setIsNavDrawerOpen(false);
  };

  const toggleSubmenu = (category) => {
    setOpenSubmenu((prev) => (prev === category ? null : category));
  };

  const handleAccountClick = (e) => {
    e.preventDefault();
    showToast("Account portal opening soon");
  };

  // Group items for cart display
  const groupedCartItems = cartItems.reduce((groups, product) => {
    const existing = groups.find((item) => item.product.name === product.name);
    if (existing) {
      existing.quantity++;
    } else {
      groups.push({ product, quantity: 1 });
    }
    return groups;
  }, []);

  const cartCount = cartItems.length;
  const subtotal = cartItems.reduce((total, product) => {
    return total + (typeof product.price === "number" && Number.isFinite(product.price) ? product.price : 0);
  }, 0);

  const hasUnknownPrice = cartItems.some(
    (product) => product.price == null || !Number.isFinite(product.price)
  );
  const shippingGoal = 100;
  const amountToFreeShipping = Math.max(0, shippingGoal - subtotal);
  const shippingProgress = Math.min(100, (subtotal / shippingGoal) * 100);
  const displayedSubtotal = hasUnknownPrice ? "Price varies" : `$${subtotal.toFixed(2)}`;

  const filteredProducts = products.filter(
    (product) => activeCategory === "all" || product.category === activeCategory
  );

  return (
    <>
      {/* Top Announcement Promo Bar */}
      <div className="promo">BUILD YOUR OWN SET · SAVE UP TO 20% + 3 FREE GIFTS</div>

      {/* Primary Header & Navigation */}
      <header className="header" role="banner">
        {/* Left: 2-line minimalist menu toggle (Mobile) */}
        <button
          className="menu-toggle"
          id="menuToggle"
          aria-label="Open navigation menu"
          aria-expanded={isNavDrawerOpen}
          aria-controls="navDrawer"
          onClick={() => {
            if (!isNavDrawerOpen && isCartDrawerOpen) setIsCartDrawerOpen(false);
            setIsNavDrawerOpen(!isNavDrawerOpen);
          }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Left Group on Desktop: Logo + Category Links */}
        <div className="nav-left">
          <a className="logo" href="#" aria-label="BAXED">
            <svg viewBox="65 20 895 185" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d={LOGO_PATH} />
            </svg>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav" aria-label="Desktop Navigation">
            <div className="nav-dropdown">
              <a
                href="#shop"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryFilter("all");
                }}
              >
                <span>Shop</span>
                <svg className="dropdown-chevron" viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <div className="dropdown-menu">
                <button type="button" onClick={() => handleCategoryFilter("all")}>
                  All Items
                </button>
                <button type="button" onClick={() => handleCategoryFilter("Tops")}>
                  Tops
                </button>
                <button type="button" onClick={() => handleCategoryFilter("Bottoms")}>
                  Bottoms
                </button>
                <button type="button" onClick={() => handleCategoryFilter("Outerwear")}>
                  Outerwear
                </button>
                <button type="button" onClick={() => handleCategoryFilter("Footwear")}>
                  Footwear
                </button>
              </div>
            </div>
            <a
              href="#shop"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryFilter("Tops");
              }}
            >
              Tops
            </a>
            <a
              href="#shop"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryFilter("Bottoms");
              }}
            >
              Bottoms
            </a>
            <a
              href="#shop"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryFilter("Outerwear");
              }}
            >
              Outerwear
            </a>
            <a href="#sets" className="nav-link">
              Sets
            </a>
          </nav>
        </div>

        {/* Right: Build Your Own Set pill button + Account Profile + Shopping Bag Cart */}
        <div className="nav-actions">
          <a href="#sets" className="nav-pill-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pill-icon"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
            </svg>
            <span>BUILD YOUR OWN SET</span>
          </a>
          <a
            href="#account"
            className="nav-icon-btn"
            aria-label="Account"
            id="accountBtn"
            onClick={handleAccountClick}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
          <button
            className="nav-icon-btn cart-btn"
            id="cartBtn"
            aria-label="Cart"
            type="button"
            onClick={openCart}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-badge" id="count">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Slide-out Navigation Drawer */}
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
          <a className="nav-drawer-title" href="#" aria-label="BAXED home">
            <svg viewBox="65 20 895 185" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d={LOGO_PATH} />
            </svg>
          </a>
          <div className="nav-drawer-actions">
            <a
              href="#account"
              className="drawer-account"
              aria-label="Account"
              onClick={handleAccountClick}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </a>
            <button
              type="button"
              className="drawer-cart-btn"
              aria-label="Cart"
              onClick={openCart}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="drawer-cart-count">{cartCount}</span>
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
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Tops");
                    }}
                  >
                    T-Shirts &amp; Basics
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Tops");
                    }}
                  >
                    Blouses &amp; Shirts
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Tops");
                    }}
                  >
                    Sweaters &amp; Knitwear
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Tops");
                    }}
                  >
                    Casual &amp; Sleeveless Wear
                  </a>
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
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Bottoms");
                    }}
                  >
                    Jeans &amp; Denim
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Bottoms");
                    }}
                  >
                    Trousers &amp; Chinos
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Bottoms");
                    }}
                  >
                    Shorts
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Bottoms");
                    }}
                  >
                    Joggers &amp; Sweatpants
                  </a>
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
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Outerwear");
                    }}
                  >
                    Jackets
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Outerwear");
                    }}
                  >
                    Coats
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Outerwear");
                    }}
                  >
                    Overshirts
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Outerwear");
                    }}
                  >
                    Hoodies &amp; Sweatshirts
                  </a>
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
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Footwear");
                    }}
                  >
                    Sneakers
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Footwear");
                    }}
                  >
                    Boots
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Footwear");
                    }}
                  >
                    Loafers
                  </a>
                  <a
                    href="#shop"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter("Footwear");
                    }}
                  >
                    Sandals
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a
            href="#sets"
            className="drawer-direct-link"
            onClick={() => setIsNavDrawerOpen(false)}
          >
            Shop by category
          </a>
          <a
            href="#shop"
            className="drawer-direct-link"
            onClick={() => setIsNavDrawerOpen(false)}
          >
            Early Access
          </a>
        </nav>
        <div className="nav-drawer-footer">
          <p style={{ margin: "0 0 12px" }}>Free worldwide shipping over $100.</p>
          <div>
            <a
              href="#shop"
              id="drawerAccountLink"
              onClick={() => setIsNavDrawerOpen(false)}
            >
              Join Member Club
            </a>
          </div>
        </div>
      </aside>

      {/* Slide-out Cart Drawer */}
      <div
        className={`cart-drawer-backdrop ${isCartDrawerOpen ? "open" : ""}`}
        id="cartDrawerBackdrop"
        onClick={() => setIsCartDrawerOpen(false)}
      ></div>
      <aside
        className={`cart-drawer ${isCartDrawerOpen ? "open" : ""}`}
        id="cartDrawer"
        aria-label="Shopping cart"
        aria-hidden={!isCartDrawerOpen}
      >
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title" id="cartDrawerTitle">
            {cartCount > 0
              ? `${cartCount} ${cartCount === 1 ? "item" : "items"} in cart`
              : "Your cart is empty"}
          </h2>
          <button
            className="cart-drawer-close"
            id="cartDrawerClose"
            type="button"
            aria-label="Close cart"
            onClick={() => setIsCartDrawerOpen(false)}
          ></button>
        </div>
        <div className="cart-drawer-content">
          {cartCount === 0 ? (
            <div className="cart-empty-state" id="cartEmptyState">
              <p className="cart-empty-message">Nothing here yet.</p>
              <button
                className="cart-continue-btn"
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <div className="cart-items" id="cartItems">
              <div className="cart-shipping">
                <p className="cart-shipping-message" id="cartShippingMessage">
                  {hasUnknownPrice ? (
                    "Shipping progress updates once set pricing is confirmed"
                  ) : amountToFreeShipping > 0 ? (
                    <>
                      Add <strong>${amountToFreeShipping.toFixed(2)}</strong> to unlock{" "}
                      <strong>FREE SHIPPING</strong>
                    </>
                  ) : (
                    <>
                      You unlocked <strong>FREE SHIPPING</strong>
                    </>
                  )}
                </p>
                <div className="cart-shipping-track" aria-hidden="true">
                  <span
                    className="cart-shipping-progress"
                    id="cartShippingProgress"
                    style={{ width: `${shippingProgress}%` }}
                  ></span>
                </div>
              </div>
              <div className="cart-set-promo">
                <p className="cart-set-eyebrow">Build your own set</p>
                <p className="cart-set-copy">
                  Save up to 20% and unlock 3 free gifts when you build your set.
                </p>
                <a
                  className="cart-set-link"
                  href="#sets"
                  onClick={() => setIsCartDrawerOpen(false)}
                >
                  Build my set
                </a>
              </div>
              <div className="cart-item-list" id="cartItemList">
                {groupedCartItems.map(({ product, quantity }) => {
                  const isSet = product.category === "Set";
                  const itemPrice =
                    typeof product.price === "number" && Number.isFinite(product.price)
                      ? `$${(product.price * quantity).toFixed(2)}`
                      : "Price varies";
                  const categoryLabel = isSet ? "Build your own set" : product.category;

                  return (
                    <article className="cart-item" key={product.name}>
                      {isSet ? (
                        <div className="cart-item-art is-set" aria-hidden="true">
                          BAXED SET
                        </div>
                      ) : (
                        <div
                          className="cart-item-art"
                          style={{ "--item-color": product.color }}
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 100 100">
                            <path d={categoryShapes[product.category] || ""} />
                          </svg>
                        </div>
                      )}
                      <div className="cart-item-details">
                        <div className="cart-item-main">
                          <div>
                            <div className="cart-item-name">{product.name}</div>
                            <p className="cart-item-category">{categoryLabel}</p>
                          </div>
                          <span className={`cart-item-price${isSet ? " is-unknown" : ""}`}>
                            {itemPrice}
                          </span>
                        </div>
                        <div
                          className="cart-item-controls"
                          aria-label={`Quantity controls for ${product.name}`}
                        >
                          <button
                            type="button"
                            aria-label={`Remove ${product.name} from cart`}
                            onClick={() => handleRemoveFromCart(product.name)}
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <span className="cart-item-quantity">{quantity}</span>
                          <button
                            type="button"
                            aria-label={`Add another ${product.name}`}
                            onClick={() => handleAddQuantity(product.name)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="cart-summary">
                <div className="cart-subtotal-row">
                  <span id="cartSubtotalLabel">Subtotal</span>
                  <strong id="cartSubtotal">{displayedSubtotal}</strong>
                </div>
                <button
                  className="cart-checkout-btn"
                  id="cartCheckout"
                  type="button"
                  onClick={() => showToast("Checkout is coming soon")}
                >
                  <span>Continue to checkout</span>
                  <span id="cartCheckoutTotal">{displayedSubtotal}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Hero Section (With hero.jpeg - Left Bottom Layout) */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">BUILD YOUR OWN SET</div>
          <div className="hero-title">
            <h1>
              BUILD YOUR<br />
              <span>OWN SET</span>
            </h1>
          </div>
          <p>
            Pick your routine. Save up to <br />
            20% and unlock 3 free gifts.
          </p>
          <div className="hero-actions">
            <a className="btn gold btn-hero" href="#sets">
              BUILD MY SET
            </a>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="banner gold" style={{ marginTop: "28px" }}>
        <div>
          <b>The Winter Edit drops soon</b>
          <small>First 500 orders get a free wool scarf ($60 value).</small>
        </div>
        <a className="btn gold banner-cta" href="#shop">
          Be the first to know
        </a>
      </div>

      {/* Best Sellers Catalog Section */}
      <section id="shop" className="shop-section">
        <div className="head">
          <h2>Best sellers</h2>
          <a
            href="#"
            style={{ textDecoration: "underline", fontSize: "14px" }}
            onClick={(e) => {
              e.preventDefault();
              setActiveCategory("all");
            }}
          >
            Shop all
          </a>
        </div>

        {/* Category Filter Tabs */}
        <div className="tabs" id="tabs">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              className="tab"
              aria-pressed={activeCategory === cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid" id="grid">
          {filteredProducts.map((product) => {
            const roundedRating = Math.round(Number(product.rating));
            const shapePath = categoryShapes[product.category] || "";
            const slug = product.name.toLowerCase().replace(/\s+/g, "-");

            return (
              <article className="card" key={product.name}>
                <Link href={`/products/${slug}`} className="thumb" style={{ "--c": product.color, display: "grid" }}>
                  {product.tag && <span className="tag gold">{product.tag}</span>}
                  <svg viewBox="0 0 100 100" aria-hidden="true">
                    <path d={shapePath} />
                  </svg>
                </Link>
                <div className="meta">
                  <div className="stars">
                    {"★".repeat(roundedRating)}
                    <i>{"★".repeat(5 - roundedRating)}</i>
                    <span style={{ color: "var(--muted)", marginLeft: "4px" }}>
                      ({product.reviews})
                    </span>
                  </div>
                  <h3>
                    <Link href={`/products/${slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {product.name}
                    </Link>
                  </h3>
                  <p>{product.description}</p>
                  <div className="price">${product.price.toFixed(2)}</div>
                </div>
                <button
                  className="btn gold"
                  type="button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Categories Showcase (Stacked Banners) */}
      <div id="sets" className="cats-stack">
        {/* Category 1: Tops (Left-aligned) */}
        <a
          className="cat-banner cat-left cat-tops"
          href="#shop"
          data-cat="Tops"
          aria-label="Shop tops"
          onClick={(e) => {
            e.preventDefault();
            handleCategoryFilter("Tops");
          }}
        >
          <span className="cat-banner-content">
            Shop tops{" "}
            <span className="cat-arrow" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path
                  d="M6 10h8m-3.5-3.5l3.5 3.5-3.5 3.5"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </a>

        {/* Category 2: Bottoms (Right-aligned) */}
        <a
          className="cat-banner cat-right cat-bottoms"
          href="#shop"
          data-cat="Bottoms"
          aria-label="Shop bottoms"
          onClick={(e) => {
            e.preventDefault();
            handleCategoryFilter("Bottoms");
          }}
        >
          <span className="cat-banner-content">
            Shop bottoms{" "}
            <span className="cat-arrow" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path
                  d="M6 10h8m-3.5-3.5l3.5 3.5-3.5 3.5"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </a>

        {/* Category 3: Outerwear (Left-aligned) */}
        <a
          className="cat-banner cat-left cat-outerwear"
          href="#shop"
          data-cat="Outerwear"
          aria-label="Shop outerwear"
          onClick={(e) => {
            e.preventDefault();
            handleCategoryFilter("Outerwear");
          }}
        >
          <span className="cat-banner-content">
            Shop outerwear{" "}
            <span className="cat-arrow" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path
                  d="M6 10h8m-3.5-3.5l3.5 3.5-3.5 3.5"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </a>
      </div>

      {/* Why BAXED comparison */}
      <section className="why-section" aria-labelledby="why-heading">
        <h2 className="why-heading" id="why-heading">
          Why{" "}
          <svg
            className="why-heading-logo"
            viewBox="65 20 895 185"
            fill="currentColor"
            aria-label="BAXED"
            role="img"
          >
            <path fillRule="evenodd" d={LOGO_PATH} />
          </svg>
        </h2>
        <p className="why-subtitle">Here is why 3,000,000+ chose BAXED.</p>

        <table className="why-table" aria-label="BAXED product standards compared with others">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <svg
                  className="why-brand-logo"
                  viewBox="65 20 895 185"
                  fill="currentColor"
                  aria-label="BAXED"
                  role="img"
                >
                  <path fillRule="evenodd" d={LOGO_PATH} />
                </svg>
              </th>
              <th scope="col">Others</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">No Parabens</th>
              <td>
                <span className="why-check" role="img" aria-label="Yes"></span>
              </td>
              <td>
                <span className="why-cross" role="img" aria-label="No"></span>
              </td>
            </tr>
            <tr>
              <th scope="row">No Sulfates</th>
              <td>
                <span className="why-check" role="img" aria-label="Yes"></span>
              </td>
              <td>
                <span className="why-cross" role="img" aria-label="No"></span>
              </td>
            </tr>
            <tr>
              <th scope="row">Full Ingredient Transparency</th>
              <td>
                <span className="why-check" role="img" aria-label="Yes"></span>
              </td>
              <td>
                <span className="why-cross" role="img" aria-label="No"></span>
              </td>
            </tr>
            <tr>
              <th scope="row">Formulated &amp; Filled in USA</th>
              <td>
                <span className="why-check" role="img" aria-label="Yes"></span>
              </td>
              <td>
                <span className="why-cross" role="img" aria-label="No"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Brand confidence and social proof */}
      <section
        className="proof-section"
        aria-label="BAXED customer community"
        ref={proofSectionRef}
      >
        <div className="proof-intro">
          <h2>
            Because confidence shouldn&#39;t come at the <span>cost of your health.</span>
          </h2>
        </div>
        <div className="proof-stat">
          <div className="proof-number" data-count="3000000" aria-label="3,000,000+">
            {stat1}
          </div>
          <div className="proof-rule" aria-hidden="true">
            <div
              className="proof-rule-fill"
              style={{ transform: `scaleX(${statProgress})` }}
            />
          </div>
          <p className="proof-label">Have already chosen BAXED.</p>
        </div>
        <div className="proof-stat">
          <div className="proof-number" data-count="200000" aria-label="200,000+">
            {stat2}
          </div>
          <div className="proof-rule" aria-hidden="true">
            <div
              className="proof-rule-fill"
              style={{ transform: `scaleX(${statProgress})` }}
            />
          </div>
          <p className="proof-label">5-star reviews worldwide.</p>
        </div>
      </section>

      {/* Featured Sets */}
      <section id="featured-sets" className="featured-sets">
        <div className="head">
          <h2>Featured Sets</h2>
          <a className="featured-shop-link" href="#sets">
            Shop Sets <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="featured-grid">
          {/* Card 1 */}
          <article className="featured-card">
            <div className="featured-art" aria-hidden="true">
              <svg viewBox="0 0 200 160">
                <g transform="translate(8 23) scale(1.12)">
                  <path
                    d="M30 10 L10 24 L20 42 L30 36 V92 H70 V36 L80 42 L90 24 L70 10 Q50 24 30 10Z"
                    fill="#252525"
                    stroke="#555"
                    strokeWidth="1.5"
                  />
                </g>
                <g transform="translate(91 17) scale(.82)">
                  <path
                    d="M28 8 H72 L78 94 H54 L50 40 L46 94 H22 Z"
                    fill="#3b3528"
                    stroke="#655a43"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
            <div className="meta">
              <div className="stars">TOPS · BOTTOMS</div>
              <h3>The Everyday Uniform</h3>
              <p>Easy staples, made to work together.</p>
            </div>
            <button
              className="btn gold"
              type="button"
              onClick={() => handleAddFeaturedSet("The Everyday Uniform")}
            >
              Add to cart
            </button>
          </article>

          {/* Card 2 */}
          <article className="featured-card">
            <div className="featured-art" aria-hidden="true">
              <svg viewBox="0 0 200 160">
                <g transform="translate(4 20) scale(1.08)">
                  <path
                    d="M32 8 Q50 20 68 8 L92 26 L82 50 L74 44 V94 H26 V44 L18 50 L8 26 Z"
                    fill="#30291f"
                    stroke="#655a43"
                    strokeWidth="1.5"
                  />
                </g>
                <g transform="translate(106 58) scale(.78)">
                  <path
                    d="M8 54 L36 50 L48 36 L60 52 Q90 54 94 70 V78 H8 Z"
                    fill="#242424"
                    stroke="#666"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
            <div className="meta">
              <div className="stars">OUTERWEAR · FOOTWEAR</div>
              <h3>Weekend Layers</h3>
              <p>Comfortable layers for days off.</p>
            </div>
            <button
              className="btn gold"
              type="button"
              onClick={() => handleAddFeaturedSet("Weekend Layers")}
            >
              Add to cart
            </button>
          </article>

          {/* Card 3 */}
          <article className="featured-card">
            <div className="featured-art" aria-hidden="true">
              <svg viewBox="0 0 200 160">
                <g transform="translate(5 20) scale(1.06)">
                  <path
                    d="M30 10 L10 24 L20 42 L30 36 V92 H70 V36 L80 42 L90 24 L70 10 Q50 24 30 10Z"
                    fill="#e2dfd7"
                    stroke="#85827c"
                    strokeWidth="1.5"
                  />
                </g>
                <g transform="translate(100 20) scale(.9)">
                  <path
                    d="M28 8 H72 L78 94 H54 L50 40 L46 94 H22 Z"
                    fill="#252525"
                    stroke="#555"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
            <div className="meta">
              <div className="stars">TOPS · BOTTOMS</div>
              <h3>Clean Essentials</h3>
              <p>Minimal pieces for everyday rotation.</p>
            </div>
            <button
              className="btn gold"
              type="button"
              onClick={() => handleAddFeaturedSet("Clean Essentials")}
            >
              Add to cart
            </button>
          </article>

          {/* Card 4 */}
          <article className="featured-card">
            <div className="featured-art" aria-hidden="true">
              <svg viewBox="0 0 200 160">
                <g transform="translate(6 20) scale(1.04)">
                  <path
                    d="M32 8 Q50 20 68 8 L92 26 L82 50 L74 44 V94 H26 V44 L18 50 L8 26 Z"
                    fill="#29323b"
                    stroke="#56616b"
                    strokeWidth="1.5"
                  />
                </g>
                <g transform="translate(104 76) scale(.74)">
                  <path
                    d="M8 54 L36 50 L48 36 L60 52 Q90 54 94 70 V78 H8 Z"
                    fill="#d8d4c8"
                    stroke="#88857b"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
            <div className="meta">
              <div className="stars">OUTERWEAR · FOOTWEAR</div>
              <h3>The Layered Edit</h3>
              <p>Go-to layers with a clean finish.</p>
            </div>
            <button
              className="btn gold"
              type="button"
              onClick={() => handleAddFeaturedSet("The Layered Edit")}
            >
              Add to cart
            </button>
          </article>
        </div>
      </section>


      {/* Footer */}
      <footer id="footer">
        {/* Mobile watermark: standing on the right side, fading out */}
        <img
          src="/footer-watermark-mobile.svg"
          alt=""
          className="footer-watermark-mobile"
          aria-hidden="true"
        />

        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-brand-name" href="#" aria-label="BAXED home">
              <svg viewBox="65 20 895 185" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d={LOGO_PATH} />
              </svg>
            </a>
            <p className="footer-mission">
              Thoughtful menswear, designed for a better fit and made for everyday wear.
            </p>
            <div className="footer-socials" aria-hidden="true">
              <span>
                <svg viewBox="0 0 24 24">
                  <path d="M19.6 7.1a5.2 5.2 0 0 1-3.8-4.8h-3.5v13.1a2.9 2.9 0 1 1-2.9-2.9c.4 0 .8.1 1.1.2V9.1a6.4 6.4 0 1 0 5.3 6.3V8.7a8.6 8.6 0 0 0 5.1 1.7V7a5.3 5.3 0 0 1-1.3.1Z" />
                </svg>
              </span>
              <span>
                <svg viewBox="0 0 24 24">
                  <path d="M23.2 6.2a3 3 0 0 0-2.1-2.1C19.2 3.6 12 3.6 12 3.6s-7.2 0-9.1.5A3 3 0 0 0 .8 6.2C.3 8 .3 12 .3 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.1.5 9.1.5s7.2 0 9.1-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-5.8.5-5.8s0-4-.5-5.8ZM9.7 15.6V8.4l6.2 3.6-6.2 3.6Z" />
                </svg>
              </span>
            </div>
          </div>
          <nav className="footer-column" aria-label="Customer care">
            <h3>Customer Care</h3>
            <ul className="footer-links">
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQs</Link>
              </li>
              <li>
                <Link href="/size-guide">Size Guide</Link>
              </li>
              <li>
                <Link href="/shipping-returns">Shipping &amp; Returns</Link>
              </li>
            </ul>
          </nav>
          <nav className="footer-column" aria-label="Quick links">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a
                  href="#shop"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryFilter("all");
                  }}
                >
                  Shop All
                </a>
              </li>
              <li>
                <a
                  href="#shop"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryFilter("Tops");
                  }}
                >
                  Shop Tops
                </a>
              </li>
              <li>
                <a
                  href="#shop"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryFilter("Bottoms");
                  }}
                >
                  Shop Bottoms
                </a>
              </li>
              <li>
                <a href="#sets">Shop by Category</a>
              </li>
              <li>
                <a href="#featured-sets">Featured Sets</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Desktop watermark: wide logo fading underneath */}
        <div className="footer-watermark-wrap" aria-hidden="true">
          <img
            src="/footer-watermark.svg"
            alt=""
            className="footer-watermark-desktop"
          />
        </div>

        <div className="footer-bottom">
          <span>© 2026 BAXED. All rights reserved.</span>
          <span>Made for everyday wear.</span>
        </div>
      </footer>

      {/* Notification Toast */}
      <div className={`toast gold ${isToastActive ? "on" : ""}`} id="toast" role="status">
        {toastMessage}
      </div>
    </>
  );
}
