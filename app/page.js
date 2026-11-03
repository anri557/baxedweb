"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

function BagPlusIcon({ className = "bag-icon cart-plus-icon" }) {
  return (
    <svg className={className} viewBox="0 0 15 17" fill="none" aria-hidden="true">
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
  );
}

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

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("baxed_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const flatItems = [];
          parsed.forEach((item) => {
            const count = Number(item.quantity || item.qty || 1);
            for (let i = 0; i < count; i++) {
              flatItems.push({
                name: item.name || item.title || "Product",
                category: item.category || "Apparel",
                description: item.description || item.subtitle || "",
                price: typeof item.price === "number" ? item.price : parseFloat(item.price) || 0,
                color: item.color || "#2b2b2b",
                image: item.image,
              });
            }
          });
          setCartItems(flatItems);
        }
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const saveCartToStorage = (items) => {
    try {
      const grouped = items.reduce((acc, it) => {
        const found = acc.find((g) => g.name === it.name);
        if (found) {
          found.quantity += 1;
        } else {
          acc.push({
            id: it.id || String(it.name).toLowerCase().replace(/\s+/g, "-"),
            name: it.name,
            subtitle: it.description || it.subtitle || it.category,
            price: typeof it.price === "number" ? it.price : 0,
            originalPrice: it.price,
            quantity: 1,
            category: it.category,
            image: it.image,
          });
        }
        return acc;
      }, []);
      localStorage.setItem("baxed_cart", JSON.stringify(grouped));
    } catch {
      // Storage unavailable
    }
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const next = [...prev, product];
      saveCartToStorage(next);
      return next;
    });
    showToast(`${product.name} added to cart`);
  };

  const handleAddFeaturedSet = (setName) => {
    setCartItems((prev) => {
      const next = [...prev, { name: setName, category: "Set", price: null }];
      saveCartToStorage(next);
      return next;
    });
    showToast(`${setName} added to cart`);
  };

  const handleRemoveFromCart = (productName) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => item.name !== productName);
      saveCartToStorage(next);
      return next;
    });
  };

  const handleAddQuantity = (productName) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.name === productName);
      if (item) {
        const next = [...prev, item];
        saveCartToStorage(next);
        return next;
      }
      return prev;
    });
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
  const displayedSubtotal = hasUnknownPrice ? "Price varies" : `₾${subtotal.toFixed(2)}`;

  const filteredProducts = products.filter(
    (product) => activeCategory === "all" || product.category === activeCategory
  );

  return (
    <>
      <Navbar
        navItems={[
          { label: "Shop", onSelect: "all" },
          { label: "Tops", onSelect: "Tops" },
          { label: "Bottoms", onSelect: "Bottoms" },
          { label: "Outerwear", onSelect: "Outerwear" },
          { label: "Sets", href: "/#sets" },
        ]}
        onItemSelect={handleCategoryFilter}
        isNavDrawerOpen={isNavDrawerOpen}
        onMenuToggle={() => {
          if (!isNavDrawerOpen && isCartDrawerOpen) setIsCartDrawerOpen(false);
          setIsNavDrawerOpen(!isNavDrawerOpen);
        }}
        onCartClick={() => setIsCartDrawerOpen(true)}
        cartCount={cartCount}
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
          <a className="nav-drawer-title" href="#" aria-label="BAXED home">
            <svg viewBox="65 20 895 185" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d={LOGO_PATH} />
            </svg>
          </a>
          <div className="nav-drawer-actions">
            <Link
              href="/signin"
              className="drawer-account"
              aria-label="Account"
              onClick={() => setIsNavDrawerOpen(false)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
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
                  <Link
                    href="/tops?filter=T-Shirts+%26+Basics"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
                    T-Shirts &amp; Basics
                  </Link>
                  <Link
                    href="/tops?filter=Blouses+%26+Shirts"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
                    Blouses &amp; Shirts
                  </Link>
                  <Link
                    href="/tops?filter=Sweaters+%26+Knitwear"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
                    Sweaters &amp; Knitwear
                  </Link>
                  <Link
                    href="/tops?filter=Casual+%26+Sleeveless+Wear"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
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
                  <Link
                    href="/bottoms?filter=Jeans+%26+Denim"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
                    Jeans &amp; Denim
                  </Link>
                  <Link
                    href="/bottoms?filter=Trousers+%26+Chinos"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
                    Trousers &amp; Chinos
                  </Link>
                  <Link
                    href="/bottoms?filter=Shorts"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
                    Shorts
                  </Link>
                  <Link
                    href="/bottoms?filter=Joggers+%26+Sweatpants"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
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
                  <Link
                    href="/outerwear?filter=Jackets"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
                    Jackets
                  </Link>
                  <Link
                    href="/outerwear?filter=Coats"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
                    Coats
                  </Link>
                  <Link
                    href="/outerwear?filter=Overshirts"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
                    Overshirts
                  </Link>
                  <Link
                    href="/outerwear?filter=Hoodies+%26+Sweatshirts"
                    onClick={() => setIsNavDrawerOpen(false)}
                  >
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
          <p style={{ margin: "0 0 12px" }}>Free worldwide shipping over ₾100.</p>
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
                      Add <strong>₾{amountToFreeShipping.toFixed(2)}</strong> to unlock{" "}
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
                <Link
                  className="cart-set-link"
                  href="/build-your-set"
                  onClick={() => setIsCartDrawerOpen(false)}
                >
                  Build my set
                </Link>
              </div>
              <div className="cart-item-list" id="cartItemList">
                {groupedCartItems.map(({ product, quantity }) => {
                  const isSet = product.category === "Set";
                  const itemPrice =
                    typeof product.price === "number" && Number.isFinite(product.price)
                      ? `₾${(product.price * quantity).toFixed(2)}`
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
                <Link
                  className="cart-checkout-btn"
                  id="cartCheckout"
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                >
                  <span>Continue to checkout</span>
                  <span id="cartCheckoutTotal">{displayedSubtotal}</span>
                </Link>
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
            <Link className="btn gold btn-hero" href="/build-your-set">
              BUILD MY SET
            </Link>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="banner gold" style={{ marginTop: "28px" }}>
        <div>
          <b className="banner-title">
            <span className="banner-title-line">The Winter Edit</span>
            <span className="banner-title-line">drops soon</span>
          </b>
        </div>
        <div>
          <a className="btn gold banner-cta" href="#shop">
            Be the first to know
          </a>
        </div>
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
                  <div className="price">
                    <span className="price-currency">₾</span>{product.price.toFixed(2)}
                  </div>
                </div>
                <button
                  className="btn gold"
                  type="button"
                  onClick={() => handleAddToCart(product)}
                >
                  <span>ADD TO CART</span>
                  <BagPlusIcon />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Categories Showcase (Stacked Banners) */}
      <div id="sets" className="cats-stack">
        {/* Category 1: Tops (Left-aligned) */}
        <Link
          className="cat-banner cat-left cat-tops"
          href="/tops"
          data-cat="Tops"
          aria-label="Shop tops"
        >
          <span className="cat-banner-content">
            Shop tops
            <span className="cat-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" focusable="false">
                <path
                  d="M15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM0 8V9H15V8V7H0V8Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </span>
        </Link>

        {/* Category 2: Bottoms (Right-aligned) */}
        <Link
          className="cat-banner cat-right cat-bottoms"
          href="/bottoms"
          data-cat="Bottoms"
          aria-label="Shop bottoms"
        >
          <span className="cat-banner-content">
            Shop bottoms
            <span className="cat-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" focusable="false">
                <path
                  d="M15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM0 8V9H15V8V7H0V8Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </span>
        </Link>

        {/* Category 3: Outerwear (Left-aligned) */}
        <Link
          className="cat-banner cat-left cat-outerwear"
          href="/outerwear"
          data-cat="Outerwear"
          aria-label="Shop outerwear"
        >
          <span className="cat-banner-content">
            Shop outerwear
            <span className="cat-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" focusable="false">
                <path
                  d="M15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM0 8V9H15V8V7H0V8Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </span>
        </Link>
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
              <th scope="row">Made for Everyday Wear</th>
              <td>
                <span className="why-check" role="img" aria-label="Yes">
                  <svg className="why-check-icon" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                    <path d="M3 17.5L12.3 27L31 8" stroke="#0a0a0a" strokeWidth="2.2" strokeMiterlimit="10" />
                  </svg>
                </span>
              </td>
              <td>
                <span className="why-cross" role="img" aria-label="No">
                  <svg className="why-cross-icon" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                    <path d="M26 8L8 26M8 8L26 26" stroke="currentColor" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" />
                  </svg>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">Comfort-First Fabrics</th>
              <td>
                <span className="why-check" role="img" aria-label="Yes">
                  <svg className="why-check-icon" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                    <path d="M3 17.5L12.3 27L31 8" stroke="#0a0a0a" strokeWidth="2.2" strokeMiterlimit="10" />
                  </svg>
                </span>
              </td>
              <td>
                <span className="why-cross" role="img" aria-label="No">
                  <svg className="why-cross-icon" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                    <path d="M26 8L8 26M8 8L26 26" stroke="currentColor" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" />
                  </svg>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">Modern Athletic Fit</th>
              <td>
                <span className="why-check" role="img" aria-label="Yes">
                  <svg className="why-check-icon" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                    <path d="M3 17.5L12.3 27L31 8" stroke="#0a0a0a" strokeWidth="2.2" strokeMiterlimit="10" />
                  </svg>
                </span>
              </td>
              <td>
                <span className="why-cross" role="img" aria-label="No">
                  <svg className="why-cross-icon" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                    <path d="M26 8L8 26M8 8L26 26" stroke="currentColor" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" />
                  </svg>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">Free Size Exchanges</th>
              <td>
                <span className="why-check" role="img" aria-label="Yes">
                  <svg className="why-check-icon" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                    <path d="M3 17.5L12.3 27L31 8" stroke="#0a0a0a" strokeWidth="2.2" strokeMiterlimit="10" />
                  </svg>
                </span>
              </td>
              <td>
                <span className="why-cross" role="img" aria-label="No">
                  <svg className="why-cross-icon" viewBox="0 0 34 34" fill="none" aria-hidden="true">
                    <path d="M26 8L8 26M8 8L26 26" stroke="currentColor" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" />
                  </svg>
                </span>
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
          <div className="proof-figure">
            <div className="proof-number" data-count="3000000" aria-label="3,000,000+">
              {stat1}
            </div>
            <div className="proof-rule" aria-hidden="true">
              <div
                className="proof-rule-fill"
                style={{ transform: `scaleX(${statProgress})` }}
              />
            </div>
          </div>
          <p className="proof-label">Have already chosen BAXED.</p>
        </div>
        <div className="proof-stat">
          <div className="proof-figure">
            <div className="proof-number proof-number-sm" data-count="200000" aria-label="200,000+">
              {stat2}
            </div>
            <div className="proof-rule" aria-hidden="true">
              <div
                className="proof-rule-fill"
                style={{ transform: `scaleX(${statProgress})` }}
              />
            </div>
          </div>
          <p className="proof-label">5-star reviews worldwide.</p>
        </div>
      </section>

      {/* Featured Sets */}
      <section id="featured-sets" className="featured-sets">
        <div className="head">
          <h2>Featured Sets</h2>
          <a className="featured-shop-link" href="#sets">
            Shop Sets{" "}
            <svg className="featured-shop-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM0 8V9H15V8V7H0V8Z"
                fill="currentColor"
              />
            </svg>
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
              <span>ADD TO CART</span>
              <BagPlusIcon />
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
              <span>ADD TO CART</span>
              <BagPlusIcon />
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
              <span>ADD TO CART</span>
              <BagPlusIcon />
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
              <span>ADD TO CART</span>
              <BagPlusIcon />
            </button>
          </article>
        </div>
      </section>


      {/* Footer */}
      <Footer />

      {/* Notification Toast */}
      <div className={`toast gold ${isToastActive ? "on" : ""}`} id="toast" role="status">
        {toastMessage}
      </div>
    </>
  );
}
