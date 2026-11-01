"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const LOGO_PATH =
  "M80 24 L182 24 L207 32 L222 45 L229 58 L231 66 L231 85 L225 100 L215 111 L226 120 L231 128 L235 142 L235 153 L233 164 L228 175 L217 188 L203 197 L186 202 L78 202 L72 197 L70 193 L70 33 L74 27 L80 24 Z M325 24 L351 24 L359 31 L390 104 L428 186 L429 196 L425 201 L392 201 L386 191 L373 159 L301 159 L288 190 L281 201 L250 202 L245 197 L245 189 L285 104 L315 34 L317 30 L325 24 Z M439 24 L468 24 L473 26 L516 82 L520 79 L529 65 L533 62 L560 26 L565 24 L594 24 L600 29 L600 39 L540 110 L540 113 L544 116 L580 164 L599 186 L601 196 L597 201 L561 201 L517 142 L473 200 L469 202 L438 202 L433 198 L433 187 L437 184 L451 164 L493 113 L493 110 L484 101 L480 94 L474 89 L470 82 L454 65 L440 46 L434 41 L432 31 L434 27 L439 24 Z M629 24 L760 24 L764 26 L768 32 L768 54 L766 58 L760 62 L628 62 L621 55 L621 31 L626 25 L629 24 Z M796 24 L887 25 L910 33 L932 50 L945 69 L950 82 L954 104 L954 122 L951 140 L946 154 L939 167 L924 184 L905 196 L884 202 L794 202 L789 198 L787 194 L787 174 L792 166 L877 165 L889 162 L905 150 L913 136 L916 124 L916 101 L913 90 L903 74 L901 74 L894 67 L880 62 L795 62 L791 60 L787 53 L787 33 L790 27 L796 24 Z M109 60 L108 94 L173 95 L185 92 L190 88 L193 82 L193 72 L191 68 L187 64 L180 61 L109 60 Z M338 77 L333 84 L317 123 L358 123 L338 77 Z M630 93 L754 93 L759 95 L763 100 L763 125 L756 132 L628 132 L621 125 L621 100 L625 95 L630 93 Z M109 130 L108 165 L179 165 L191 160 L196 152 L195 140 L191 135 L183 131 L109 130 Z M628 165 L761 165 L767 170 L768 173 L768 195 L761 202 L627 202 L621 196 L621 171 L628 165 Z";

// Exact vector bag-plus icon (15x17)
function BagPlusIcon({ className = "bag-icon" }) {
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

// Full Menswear Outfit Catalog Data
export const CATEGORY_CONFIG = {
  tops: {
    categoryKey: "Tops",
    pageTitle: "Tops",
    heroHeading: "Invest In Your",
    heroHeadingAccent: "Tops",
    heroDesc:
      "High-performance heavyweight tees, tailored shirts, fine knitwear, and sleeveless essentials engineered for modern menswear layering.",
    subcategories: [
      "All",
      "T-Shirts & Basics",
      "Blouses & Shirts",
      "Sweaters & Knitwear",
      "Casual & Sleeveless Wear",
    ],
    products: [
      {
        id: "heavyweight-boxy-tee",
        name: "Heavyweight Boxy Tee",
        sub: "T-Shirts & Basics",
        description: "Boxy fit, 280gsm combed cotton with drop-shoulder silhouette.",
        price: 32.0,
        rating: 5,
        reviews: 2784,
        tag: "BEST SELLER",
        image: "/ShopTop.jpeg",
        slug: "heavyweight-tee",
      },
      {
        id: "core-relaxed-pocket-tee",
        name: "Core Relaxed Pocket Tee",
        sub: "T-Shirts & Basics",
        description: "Clean front chest pocket, premium pre-shrunk heavyweight jersey.",
        price: 30.0,
        rating: 5,
        reviews: 1420,
        tag: "ESSENTIAL",
        image: "/ShopTop.jpeg",
        slug: "heavyweight-tee",
      },
      {
        id: "oxford-button-down",
        name: "Oxford Button-Down Shirt",
        sub: "Blouses & Shirts",
        description: "Crisp, wrinkle-resistant structured cotton with mother-of-pearl buttons.",
        price: 64.0,
        rating: 5,
        reviews: 940,
        tag: "POPULAR",
        image: "/ShopTop.jpeg",
        slug: "oxford-shirt",
      },
      {
        id: "relaxed-camp-collar-shirt",
        name: "Relaxed Camp Collar Shirt",
        sub: "Blouses & Shirts",
        description: "Breathable linen-tencel blend tailored for warm days and layered evenings.",
        price: 58.0,
        rating: 5,
        reviews: 612,
        tag: "NEW",
        image: "/ShopTop.jpeg",
        slug: "oxford-shirt",
      },
      {
        id: "merino-crew-knitwear",
        name: "Merino Crew Knitwear",
        sub: "Sweaters & Knitwear",
        description: "Ultra-fine Australian merino wool, naturally temperature regulating.",
        price: 78.0,
        rating: 5,
        reviews: 1120,
        tag: "LUXURY",
        image: "/ShopTop.jpeg",
        slug: "merino-crew",
      },
      {
        id: "waffle-textured-jumper",
        name: "Waffle Textured Jumper",
        sub: "Sweaters & Knitwear",
        description: "Heavyweight waffle knit with ribbed collar, hem, and cuffs.",
        price: 82.0,
        rating: 5,
        reviews: 735,
        tag: "PREMIUM",
        image: "/ShopTop.jpeg",
        slug: "merino-crew",
      },
      {
        id: "ribbed-muscle-tank",
        name: "Ribbed Muscle Tank",
        sub: "Casual & Sleeveless Wear",
        description: "Heavyweight 240gsm ribbed cotton with reinforced armholes.",
        price: 26.0,
        rating: 5,
        reviews: 890,
        tag: "CORE",
        image: "/ShopTop.jpeg",
        slug: "heavyweight-tee",
      },
      {
        id: "sleeveless-terry-hoodie",
        name: "Sleeveless Terry Hoodie",
        sub: "Casual & Sleeveless Wear",
        description: "French terry raw-edge cut with deep kangaroo pocket and split hem.",
        price: 42.0,
        rating: 5,
        reviews: 540,
        tag: "TRENDING",
        image: "/ShopTop.jpeg",
        slug: "heavyweight-tee",
      },
    ],
  },
  bottoms: {
    categoryKey: "Bottoms",
    pageTitle: "Bottoms",
    heroHeading: "Invest In Your",
    heroHeadingAccent: "Bottoms",
    heroDesc:
      "Engineered selvedge denim, tailored trousers, relaxed summer shorts, and utilitarian joggers designed for effortless everyday wear.",
    subcategories: [
      "All",
      "Jeans & Denim",
      "Trousers & Chinos",
      "Shorts",
      "Joggers & Sweatpants",
    ],
    products: [
      {
        id: "washed-denim",
        name: "Washed Denim",
        sub: "Jeans & Denim",
        description: "Straight leg, 12oz authentic selvedge washed denim with vintage fade.",
        price: 89.0,
        rating: 5,
        reviews: 1873,
        tag: "BEST SELLER",
        image: "/ShopBottoms.jpeg",
        slug: "washed-denim",
      },
      {
        id: "raw-indigo-slim-jean",
        name: "Raw Indigo Slim Jean",
        sub: "Jeans & Denim",
        description: "Deep indigo rigid cotton denim crafted to develop unique patina.",
        price: 94.0,
        rating: 5,
        reviews: 640,
        tag: "NEW",
        image: "/ShopBottoms.jpeg",
        slug: "washed-denim",
      },
      {
        id: "tapered-chinos",
        name: "Tapered Chinos",
        sub: "Trousers & Chinos",
        description: "Stretch twill fabric with tailored taper and hidden coin pocket.",
        price: 68.0,
        rating: 5,
        reviews: 3445,
        tag: "BEST SELLER",
        image: "/ShopBottoms.jpeg",
        slug: "tapered-chinos",
      },
      {
        id: "pleated-minimal-trouser",
        name: "Pleated Minimal Trouser",
        sub: "Trousers & Chinos",
        description: "Relaxed single-pleat wool blend drape trouser for clean silhouettes.",
        price: 78.0,
        rating: 5,
        reviews: 1050,
        tag: "PREMIUM",
        image: "/ShopBottoms.jpeg",
        slug: "tapered-chinos",
      },
      {
        id: "everyday-linen-shorts",
        name: "Everyday Linen Shorts",
        sub: "Shorts",
        description: "Breathable garment-dyed linen blend with elastic drawstring waist.",
        price: 48.0,
        rating: 5,
        reviews: 820,
        tag: "SUMMER",
        image: "/ShopBottoms.jpeg",
        slug: "cargo-joggers",
      },
      {
        id: "tactical-utility-shorts",
        name: "Tactical Utility Shorts",
        sub: "Shorts",
        description: "Water-repellent ripstop with magnetic fidlock utility pocket closures.",
        price: 54.0,
        rating: 5,
        reviews: 415,
        tag: "OUTDOOR",
        image: "/ShopBottoms.jpeg",
        slug: "cargo-joggers",
      },
      {
        id: "cargo-joggers",
        name: "Cargo Joggers",
        sub: "Joggers & Sweatpants",
        description: "Relaxed taper with zippered dual utility cargo pockets.",
        price: 72.0,
        rating: 5,
        reviews: 860,
        tag: "TRENDING",
        image: "/ShopBottoms.jpeg",
        slug: "cargo-joggers",
      },
      {
        id: "heavyweight-terry-sweatpants",
        name: "Heavyweight Terry Sweatpants",
        sub: "Joggers & Sweatpants",
        description: "450gsm loopback cotton with custom metal aglet drawstrings.",
        price: 68.0,
        rating: 5,
        reviews: 1210,
        tag: "COMFORT",
        image: "/ShopBottoms.jpeg",
        slug: "cargo-joggers",
      },
    ],
  },
  outerwear: {
    categoryKey: "Outerwear",
    pageTitle: "Outerwear",
    heroHeading: "Invest In Your",
    heroHeadingAccent: "Outerwear",
    heroDesc:
      "Weather-resistant shell jackets, structured wool overcoats, versatile canvas overshirts, and heavyweight zip hoodies.",
    subcategories: [
      "All",
      "Jackets",
      "Coats",
      "Overshirts",
      "Hoodies & Sweatshirts",
    ],
    products: [
      {
        id: "bomber-jacket",
        name: "Bomber Jacket",
        sub: "Jackets",
        description: "Matte weather-resistant shell with diamond quilted thermal lining.",
        price: 149.0,
        rating: 5,
        reviews: 2896,
        tag: "BEST SELLER",
        image: "/outwear.jpeg",
        slug: "bomber-jacket",
      },
      {
        id: "harrington-zip-jacket",
        name: "Harrington Zip Jacket",
        sub: "Jackets",
        description: "Raglan sleeve cut with two-way zipper and interior cotton lining.",
        price: 135.0,
        rating: 5,
        reviews: 720,
        tag: "CLASSIC",
        image: "/outwear.jpeg",
        slug: "bomber-jacket",
      },
      {
        id: "wool-overcoat",
        name: "Wool Overcoat",
        sub: "Coats",
        description: "Knee length, structured tailored wool blend with horn buttons.",
        price: 229.0,
        rating: 5,
        reviews: 869,
        tag: "NEW",
        image: "/outwear.jpeg",
        slug: "wool-overcoat",
      },
      {
        id: "minimal-trench-coat",
        name: "Minimal Trench Coat",
        sub: "Coats",
        description: "Double-breasted storm flap trench in water-resistant technical cotton.",
        price: 210.0,
        rating: 5,
        reviews: 430,
        tag: "ELEGANT",
        image: "/outwear.jpeg",
        slug: "wool-overcoat",
      },
      {
        id: "heavy-canvas-overshirt",
        name: "Heavy Canvas Overshirt",
        sub: "Overshirts",
        description: "Durable 10oz cotton duck canvas with dual chest flap pockets.",
        price: 110.0,
        rating: 5,
        reviews: 940,
        tag: "RUGGED",
        image: "/outwear.jpeg",
        slug: "bomber-jacket",
      },
      {
        id: "flannel-wool-overshirt",
        name: "Flannel Wool Overshirt",
        sub: "Overshirts",
        description: "Soft brushed wool-blend check overshirt, ideal for cold weather layering.",
        price: 95.0,
        rating: 5,
        reviews: 680,
        tag: "POPULAR",
        image: "/outwear.jpeg",
        slug: "bomber-jacket",
      },
      {
        id: "heavyweight-zip-hoodie",
        name: "Heavyweight Zip Hoodie",
        sub: "Hoodies & Sweatshirts",
        description: "Double-layered hood, 480gsm custom milled fleece with metal zipper.",
        price: 84.0,
        rating: 5,
        reviews: 1650,
        tag: "ESSENTIAL",
        image: "/outwear.jpeg",
        slug: "bomber-jacket",
      },
      {
        id: "minimalist-sweatshirt",
        name: "Minimalist Sweatshirt",
        sub: "Hoodies & Sweatshirts",
        description: "Classic crewneck sweatshirt with ribbed V-insert and side panels.",
        price: 74.0,
        rating: 5,
        reviews: 1180,
        tag: "CORE",
        image: "/outwear.jpeg",
        slug: "bomber-jacket",
      },
    ],
  },
};

function CategoryPageContent({ categoryType = "tops" }) {
  const config = CATEGORY_CONFIG[categoryType] || CATEGORY_CONFIG.tops;
  const searchParams = useSearchParams();

  // Selected filter pill
  const initialFilter = searchParams.get("filter") || "All";
  const [activeSubcategory, setActiveSubcategory] = useState(initialFilter);

  // Cart & Drawer State
  const [cartItems, setCartItems] = useState([]);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(config.categoryKey);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);
  const [adminProducts, setAdminProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : [])
      .then((products) => {
        if (!cancelled && Array.isArray(products)) setAdminProducts(products);
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  // Sync with searchParams if changed
  useEffect(() => {
    const filterFromUrl = searchParams.get("filter");
    if (filterFromUrl) {
      const match = config.subcategories.find(
        (sub) => sub.toLowerCase() === filterFromUrl.toLowerCase()
      );
      if (match) {
        setActiveSubcategory(match);
      }
    }
  }, [searchParams, config.subcategories]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("baxed_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const loaded = parsed.map((item, idx) => ({
            id: item.id || `item-${idx}`,
            name: item.name || item.title || "Product",
            sub: item.subtitle || item.description || "",
            price: typeof item.price === "number" ? item.price : parseFloat(item.price) || 0,
            qty: Number(item.quantity || item.qty || 1),
            image: item.image,
            category: item.category || config.categoryKey,
          }));
          setCartItems(loaded);
        }
      }
    } catch {
      // Storage unavailable
    }
  }, [config.categoryKey]);

  // Prevent background scroll when drawer is open
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

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastActive(true);
    setTimeout(() => {
      setIsToastActive(false);
    }, 2800);
  };

  const syncCategoryCartToStorage = (items) => {
    try {
      const mapped = items.map((item) => ({
        id: item.id,
        name: item.name,
        subtitle: item.sub || item.description || "",
        price: item.price,
        originalPrice: item.price,
        quantity: item.qty,
        category: item.category,
        image: item.image,
      }));
      localStorage.setItem("baxed_cart", JSON.stringify(mapped));
    } catch {
      // Storage unavailable
    }
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const next = existing
        ? prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prev, { ...product, qty: 1 }];
      syncCategoryCartToStorage(next);
      return next;
    });
    showToast(`Added ${product.name} to cart`);
    setIsCartDrawerOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCartItems((prev) => {
      const next = prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
      syncCategoryCartToStorage(next);
      return next;
    });
  };

  const removeCartItem = (id) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      syncCategoryCartToStorage(next);
      return next;
    });
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.qty, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cartItems]);

  const freeShippingThreshold = 100;
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Filtered Products
  const catalogProducts = useMemo(() => {
    const categoryKey = categoryType === "outwears" ? "outerwear" : categoryType;
    return [
      ...config.products,
      ...adminProducts.filter((product) => product.category === categoryKey),
    ];
  }, [adminProducts, categoryType, config.products]);

  const filteredProducts = useMemo(() => {
    if (activeSubcategory === "All") {
      return catalogProducts;
    }
    return catalogProducts.filter(
      (p) => p.sub.toLowerCase() === activeSubcategory.toLowerCase()
    );
  }, [catalogProducts, activeSubcategory]);

  const toggleSubmenu = (category) => {
    setOpenSubmenu(openSubmenu === category ? null : category);
  };

  // Nav items with active state for current category
  const navItems = [
    { label: "Shop", href: "/" },
    { label: "Tops", href: "/tops", active: categoryType === "tops" },
    { label: "Bottoms", href: "/bottoms", active: categoryType === "bottoms" },
    {
      label: "Outerwear",
      href: "/outerwear",
      active: categoryType === "outerwear" || categoryType === "outwears",
    },
    { label: "Sets", href: "/build-your-set" },
  ];

  return (
    <div className="cat-page-wrapper">
      {/* Toast Notification */}
      <div className={`toast-notification ${isToastActive ? "active" : ""}`} role="status">
        {toastMessage}
      </div>

      {/* Primary Site Navbar */}
      <Navbar
        navItems={navItems}
        cartCount={totalCartCount}
        isNavDrawerOpen={isNavDrawerOpen}
        onMenuToggle={() => {
          if (!isNavDrawerOpen && isCartDrawerOpen) setIsCartDrawerOpen(false);
          setIsNavDrawerOpen(!isNavDrawerOpen);
        }}
        onCartClick={() => setIsCartDrawerOpen(true)}
        onAccountClick={() => showToast("Account portal opening soon")}
      />

      {/* Slide-out Navigation Drawer (Mobile) */}
      <div
        className={`nav-drawer-backdrop ${isNavDrawerOpen ? "open" : ""}`}
        onClick={() => setIsNavDrawerOpen(false)}
      />
      <aside
        className={`nav-drawer ${isNavDrawerOpen ? "open" : ""}`}
        aria-label="Navigation drawer"
        aria-hidden={!isNavDrawerOpen}
      >
        <div className="nav-drawer-promo">BUILD YOUR OWN SET · SAVE UP TO 20% + 3 FREE GIFTS</div>
        <div className="nav-drawer-header">
          <button
            className="nav-drawer-close"
            aria-label="Close menu"
            type="button"
            onClick={() => setIsNavDrawerOpen(false)}
          >
            &times;
          </button>
          <Link className="nav-drawer-title" href="/" onClick={() => setIsNavDrawerOpen(false)}>
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
              <span className="drawer-cart-count">{totalCartCount}</span>
            </button>
          </div>
        </div>

        <nav className="nav-drawer-links" id="drawerNav">
          {/* Tops Accordion */}
          <div className={`drawer-category ${openSubmenu === "Tops" ? "is-expanded" : ""}`}>
            <button
              className="drawer-category-toggle"
              type="button"
              aria-expanded={openSubmenu === "Tops"}
              onClick={() => toggleSubmenu("Tops")}
            >
              <span>Tops</span>
              <span className="drawer-category-chevron" aria-hidden="true" />
            </button>
            <div
              className={`drawer-submenu-wrapper ${openSubmenu === "Tops" ? "is-open" : ""}`}
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

          {/* Bottoms Accordion */}
          <div className={`drawer-category ${openSubmenu === "Bottoms" ? "is-expanded" : ""}`}>
            <button
              className="drawer-category-toggle"
              type="button"
              aria-expanded={openSubmenu === "Bottoms"}
              onClick={() => toggleSubmenu("Bottoms")}
            >
              <span>Bottoms</span>
              <span className="drawer-category-chevron" aria-hidden="true" />
            </button>
            <div
              className={`drawer-submenu-wrapper ${openSubmenu === "Bottoms" ? "is-open" : ""}`}
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

          {/* Outerwear Accordion */}
          <div className={`drawer-category ${openSubmenu === "Outerwear" ? "is-expanded" : ""}`}>
            <button
              className="drawer-category-toggle"
              type="button"
              aria-expanded={openSubmenu === "Outerwear"}
              onClick={() => toggleSubmenu("Outerwear")}
            >
              <span>Outerwear</span>
              <span className="drawer-category-chevron" aria-hidden="true" />
            </button>
            <div
              className={`drawer-submenu-wrapper ${openSubmenu === "Outerwear" ? "is-open" : ""}`}
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

          <Link
            href="/build-your-set"
            className="drawer-direct-link"
            onClick={() => setIsNavDrawerOpen(false)}
          >
            Build A Set
          </Link>
        </nav>
      </aside>

      {/* Slide-out Cart Drawer */}
      <div
        className={`cart-drawer-backdrop ${isCartDrawerOpen ? "open" : ""}`}
        id="cartDrawerBackdrop"
        onClick={() => setIsCartDrawerOpen(false)}
      />
      <aside
        className={`cart-drawer ${isCartDrawerOpen ? "open" : ""}`}
        id="cartDrawer"
        aria-hidden={!isCartDrawerOpen}
      >
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title" id="cartDrawerTitle">
            Your Cart ({totalCartCount})
          </h2>
          <button
            type="button"
            className="cart-drawer-close"
            id="cartDrawerClose"
            aria-label="Close cart"
            onClick={() => setIsCartDrawerOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className="free-shipping-bar">
          <p className="free-shipping-text">
            {amountToFreeShipping > 0
              ? `Add $${amountToFreeShipping.toFixed(2)} more to unlock free shipping`
              : "🎉 You have unlocked FREE shipping!"}
          </p>
          <div className="free-shipping-progress-bg">
            <div
              className="free-shipping-progress-fill"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="cart-drawer-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p>Your bag is empty.</p>
              <button
                type="button"
                className="btn gold"
                onClick={() => setIsCartDrawerOpen(false)}
              >
                Shop {config.pageTitle}
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-drawer-item">
                <img src={item.image} alt={item.name} className="cart-item-thumb" />
                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <h3 className="cart-item-title">{item.name}</h3>
                    <button
                      type="button"
                      className="cart-item-remove"
                      onClick={() => removeCartItem(item.id)}
                      aria-label="Remove item"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="cart-item-meta">{item.sub}</div>
                  <div className="cart-item-bottom">
                    <div className="cart-item-stepper">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => updateCartQty(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="stepper-val">{item.qty}</span>
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => updateCartQty(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-price">
                      <span className="price-currency">$</span>
                      {(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal</span>
              <span className="cart-subtotal-val">
                <span className="price-currency">$</span>
                {cartSubtotal.toFixed(2)}
              </span>
            </div>
            <p className="cart-shipping-note">Shipping &amp; taxes calculated at checkout.</p>
            <Link
              href="/cart"
              className="btn gold cart-checkout-btn"
              onClick={() => setIsCartDrawerOpen(false)}
            >
              CHECKOUT
            </Link>
          </div>
        )}
      </aside>

      {/* MAIN CATEGORY PAGE CONTENT */}
      <main className="cat-hero-wrap">
        {/* SECTION 1: HERO HEADER (Title + Description, matching Screenshot 1) */}
        <section className="cat-hero-header">
          <div>
            <h1 className="cat-hero-heading">
              {config.heroHeading}{" "}
              <span className="cat-hero-accent">{config.heroHeadingAccent}</span>
            </h1>
          </div>
          <div>
            <p className="cat-hero-desc">{config.heroDesc}</p>
          </div>
        </section>

        {/* SECTION 2: SUBCATEGORY FILTER BUTTONS (Matching Screenshot 1 & Screenshot 2) */}
        <nav className="cat-filter-tabs" aria-label="Filter by subcategory">
          {config.subcategories.map((sub) => {
            const isActive = activeSubcategory.toLowerCase() === sub.toLowerCase();
            return (
              <button
                key={sub}
                type="button"
                className={`cat-filter-tab ${isActive ? "active" : ""}`}
                aria-pressed={isActive}
                onClick={() => setActiveSubcategory(sub)}
              >
                {sub}
              </button>
            );
          })}
        </nav>

        {/* SECTION 3: WIDE HERO BANNER (With hero.jpeg - matching Screenshot 1) */}
        <section className="cat-hero-banner" aria-label="Build Your Set Promotion">
          <div className="cat-hero-banner-overlay" />
          <div className="cat-hero-banner-content">
            <span className="cat-banner-eyebrow">BUILD YOUR OWN SET</span>
            <h2 className="cat-banner-title">
              BUILD YOUR <br /> <span className="cat-banner-title-accent">OWN SET</span>
            </h2>
            <p className="cat-banner-sub">
              Save up to 20% and unlock 3 free <br /> gifts when you build your set.
            </p>
            <Link className="cat-banner-cta" href="/build-your-set">
              BUILD MY SET
            </Link>
          </div>
        </section>

        {/* SECTION 4: PRODUCT CARDS GRID (Menswear Outfits Only - matching Screenshot 1) */}
        <section aria-label={`${config.pageTitle} Collection`}>
          <div className="cat-products-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="cat-card">
                <div className="cat-card-media">
                  {product.tag && <span className="cat-card-badge">{product.tag}</span>}
                  <Link href={`/products/${product.slug}`} aria-label={product.name}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cat-card-img"
                      loading="lazy"
                    />
                  </Link>
                </div>

                <div className="cat-card-body">
                  <div className="cat-card-rating">
                    {"★".repeat(product.rating)}
                    <span className="cat-card-reviews">({product.reviews})</span>
                  </div>
                  <div className="cat-card-sub">{product.sub}</div>
                  <h3 className="cat-card-title">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="cat-card-desc">{product.description}</p>
                  <div className="cat-card-price">
                    <span className="price-currency">$</span>
                    {product.price.toFixed(2)}
                  </div>
                  <button
                    className="cat-card-btn"
                    type="button"
                    onClick={() => handleAddToCart(product)}
                  >
                    <span>ADD TO CART</span>
                    <BagPlusIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Global Site Footer */}
      <Footer />
    </div>
  );
}

export default function CategoryPageClient({ categoryType = "tops" }) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#060606" }} />}>
      <CategoryPageContent categoryType={categoryType} />
    </Suspense>
  );
}
