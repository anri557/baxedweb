"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const LOGO_PATH =
  "M80 24 L182 24 L207 32 L222 45 L229 58 L231 66 L231 85 L225 100 L215 111 L226 120 L231 128 L235 142 L235 153 L233 164 L228 175 L217 188 L203 197 L186 202 L78 202 L72 197 L70 193 L70 33 L74 27 L80 24 Z M325 24 L351 24 L359 31 L390 104 L428 186 L429 196 L425 201 L392 201 L386 191 L373 159 L301 159 L288 190 L281 201 L250 202 L245 197 L245 189 L285 104 L315 34 L317 30 L325 24 Z M439 24 L468 24 L473 26 L516 82 L520 79 L529 65 L533 62 L560 26 L565 24 L594 24 L600 29 L600 39 L540 110 L540 113 L544 116 L580 164 L599 186 L601 196 L597 201 L561 201 L517 142 L473 200 L469 202 L438 202 L433 198 L433 187 L437 184 L451 164 L493 113 L493 110 L484 101 L480 94 L474 89 L470 82 L454 65 L440 46 L434 41 L432 31 L434 27 L439 24 Z M629 24 L760 24 L764 26 L768 32 L768 54 L766 58 L760 62 L628 62 L621 55 L621 31 L626 25 L629 24 Z M796 24 L887 25 L910 33 L932 50 L945 69 L950 82 L954 104 L954 122 L951 140 L946 154 L939 167 L924 184 L905 196 L884 202 L794 202 L789 198 L787 194 L787 174 L792 166 L877 165 L889 162 L905 150 L913 136 L916 124 L916 101 L913 90 L903 74 L901 74 L894 67 L880 62 L795 62 L791 60 L787 53 L787 33 L790 27 L796 24 Z M109 60 L108 94 L173 95 L185 92 L190 88 L193 82 L193 72 L191 68 L187 64 L180 61 L109 60 Z M338 77 L333 84 L317 123 L358 123 L338 77 Z M630 93 L754 93 L759 95 L763 100 L763 125 L756 132 L628 132 L621 125 L621 100 L625 95 L630 93 Z M109 130 L108 165 L179 165 L191 160 L196 152 L195 140 L191 135 L183 131 L109 130 Z M628 165 L761 165 L767 170 L768 173 L768 195 L761 202 L627 202 L621 196 L621 171 L628 165 Z";

const galleryImages = [
  { src: "/shower-duo-2.jpg", alt: "Shower Duo on walnut pedestal" },
  { src: "/shower-duo-3.jpg", alt: "Shower Duo lifestyle wash" },
  { src: "/shower-duo-4.jpg", alt: "Shampoo foaming lather texture" },
];

const benefitItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    title: "Naturally-Derived Ingredients",
    desc: "We never compromise on quality."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
      </svg>
    ),
    title: "High-Performance Formula",
    desc: "Engineered to deliver with no compromise."
  },

  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
        <path d="M11 3 8 9l4 12 4-12-3-6" />
        <path d="M2 9h20" />
      </svg>
    ),
    title: "Stronger, Better Material",
    desc: "From the first wash to the last."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        <path d="M4 11h16" />
        <path d="M6 16h12" />
      </svg>
    ),
    title: "Science-Backed",
    desc: "Peak performance with no compromise."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    title: "Nothing To Hide",
    desc: "Every ingredient listed. Every one explained."
  }
];

const faqItems = [
  {
    q: "What makes this shampoo and conditioner different from drugstore ones?",
    a: "Conventional drugstore products often rely on harsh sulfates, synthetic silicones, and parabens that strip your natural scalp barrier and coat hair strands in heavy residue. BASED formulas use 100% naturally-derived botanical surfactants, essential oils, and targeted amino acids to nourish and restore hair health from root to tip without toxic buildup."
  },
  {
    q: "Will this shampoo clean my hair as effectively as drugstore shampoos?",
    a: "Yes, absolutely. We use high-performance plant-derived surfactants like sodium cocoyl isethionate and decyl glucoside that produce a rich, luxurious micro-foam. It thoroughly eliminates excess sebum, sweat, and environmental impurities while maintaining your scalp's optimal pH balance."
  },
  {
    q: "How long will it take to see results after switching to BASED?",
    a: "Most customers notice an immediate difference in scalp comfort and hair softness from the very first wash. Because your scalp is detoxing from synthetic silicones and sulfates, optimal hair strength and fullness typically shine through within 2 to 3 weeks of consistent daily or alternate-day use."
  },
  {
    q: "Are they suitable for all hair types?",
    a: "Yes. The Shower Duo is engineered and balanced for all hair types (straight, wavy, curly, coily) and all hair lengths. The formulation is lightweight, non-comedogenic, and safe for color-treated or sensitive scalps."
  },
  {
    q: "Does naturally-derived shampoo mean I have to sacrifice lather and scent?",
    a: "Not at all. We engineered a proprietary foaming matrix from coconut fatty acids that delivers dense, satisfying lather. Our scent profile is custom-blended from natural cedarwood, amber, and bergamot essential oils—clean, masculine, and sophisticated without synthetic perfumes."
  },
  {
    q: "How does the price compare to conventional hair care products?",
    a: "A single 250ml bottle of BASED lasts between 60 to 90 days with normal usage due to its concentrated, water-efficient formula. Cost per wash comes out to less than $0.50—comparable to drugstore products while delivering clinical-grade botanicals."
  },
  {
    q: "What if it's not a fit for me?",
    a: "We offer a 100% risk-free 60-Day Satisfaction Guarantee. If you don't love how your hair and scalp look and feel, simply email our customer care team and we will issue a full refund—no return shipping required."
  }
];

const deliveryItems = [
  {
    q: "How long does shipping take?",
    a: "Orders placed Monday through Friday before 2 PM EST ship within 24 hours. Standard US delivery takes 2 to 4 business days. Priority expedited options are also available at checkout."
  },
  {
    q: "Do you offer international shipping?",
    a: "Yes, we ship worldwide! Orders over $100 qualify for free international shipping. Transit times range from 5 to 10 business days depending on customs clearance in your country."
  },
  {
    q: "What is your return & satisfaction policy?",
    a: "We stand behind everything we make with our 60-Day Money-Back Guarantee. If you're not completely satisfied with your routine, you can request a full refund or exchange within 60 days of delivery."
  },
  {
    q: "How do I track my shipment?",
    a: "As soon as your package leaves our facility, you will receive an email and SMS with your live tracking number and delivery estimate updates."
  }
];

const clothingFaqItems = [
  {
    q: "What makes this piece different from everyday basics?",
    a: "Thoughtful fabric choices, a comfortable fit, and considered construction make this an easy essential you can reach for again and again."
  },
  {
    q: "What is the fabric made from?",
    a: "Check the product details for the exact fabric composition and material information for this style."
  },
  {
    q: "How should I care for it?",
    a: "Follow the care label inside the garment. For best results, wash with similar colors and avoid high heat when drying."
  },
  {
    q: "How do I choose the right size?",
    a: "Use the size guide on the product page to compare garment measurements with a piece you already own. If you are between sizes, consider your preferred fit."
  },
  {
    q: "Is it comfortable enough for all-day wear?",
    a: "The design prioritizes easy, everyday comfort and freedom of movement, so it works well on its own or as part of a layered outfit."
  },
  {
    q: "How can I style this piece?",
    a: "Its versatile design pairs easily with everyday staples. Dress it up or down with layers and accessories to suit your plans."
  },
  {
    q: "What if the fit is not right for me?",
    a: "If your purchase is not quite right, contact our customer care team to learn about return or exchange options."
  }
];

const clothingDeliveryItems = [
  {
    q: "How long does shipping take?",
    a: "Orders placed Monday through Friday before 2 PM EST ship within 24 hours. Standard US delivery takes 2 to 4 business days. Priority expedited options are also available at checkout."
  },
  {
    q: "Do you offer international shipping?",
    a: "Yes, we ship worldwide. Available shipping methods, costs, and estimated delivery times are shown at checkout."
  },
  {
    q: "Can I return or exchange an item for a different size?",
    a: "Contact our customer care team with your order details to review return and exchange options for your item."
  },
  {
    q: "How do I track my shipment?",
    a: "As soon as your package leaves our facility, you will receive an email and SMS with your tracking number and delivery updates."
  }
];

export default function ProductDetailClient({ slug }) {
  const rawSlug = slug || "shower-duo";
  const slugTitle =
    typeof rawSlug === "string"
      ? rawSlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
      : "Shower Duo";

  const productTitle =
    rawSlug.toLowerCase().includes("shower") || rawSlug === "shower-duo"
      ? "Shower Duo"
      : slugTitle;
  const isClothingProduct = rawSlug !== "shower-duo";
  const displayedBenefitItems = isClothingProduct
    ? [
        { ...benefitItems[0], title: "Comfort-First Fabrics", desc: "Soft, breathable materials chosen for all-day wear." },
        { ...benefitItems[1], title: "Made for Everyday Wear", desc: "Designed for comfort, movement, and repeat wear." },
        { ...benefitItems[2], title: "Quality Fabric & Construction", desc: "Considered materials and durable details, made to last." },
        { ...benefitItems[3], title: "Fit, Refined", desc: "Thoughtful cuts for an easy, comfortable fit." },
        { ...benefitItems[4], title: "Versatile by Design", desc: "Easy-to-style essentials for your everyday rotation." }
      ]
    : benefitItems;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showIncluded, setShowIncluded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);
  const [faqTab, setFaqTab] = useState("faqs");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toastTimeoutRef = useRef(null);

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastActive(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setIsToastActive(false);
    }, 1800);
  };

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

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isCartDrawerOpen) setIsCartDrawerOpen(false);
        if (isNavDrawerOpen) setIsNavDrawerOpen(false);
        if (showIncluded) setShowIncluded(false);
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartDrawerOpen, isNavDrawerOpen, showIncluded]);

  const handleAddToCart = () => {
    const productItem = {
      name: productTitle,
      category: "Duo",
      price: 50.4,
      color: "#222"
    };
    setCartItems((prev) => [...prev, productItem]);
    showToast(`${productTitle} added to cart`);
    setIsCartDrawerOpen(true);
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

  const cartCount = cartItems.length;
  const subtotal = cartItems.reduce(
    (total, p) => total + (typeof p.price === "number" && Number.isFinite(p.price) ? p.price : 0),
    0
  );
  const shippingGoal = 100;
  const amountToFreeShipping = Math.max(0, shippingGoal - subtotal);
  const shippingProgress = Math.min(100, (subtotal / shippingGoal) * 100);
  const displayedSubtotal = `$${subtotal.toFixed(2)}`;

  const groupedCartItems = cartItems.reduce((groups, product) => {
    const existing = groups.find((item) => item.product.name === product.name);
    if (existing) {
      existing.quantity++;
    } else {
      groups.push({ product, quantity: 1 });
    }
    return groups;
  }, []);

  return (
    <div className="pdp-wrapper">
      {/* Top Announcement Bar */}
      <div className="promo">BUILD YOUR OWN SET · SAVE UP TO 20% + 3 FREE GIFTS</div>

      {/* Main Header */}
      <header className="header" role="banner">
        <button
          className="menu-toggle"
          id="menuToggle"
          aria-label="Open navigation menu"
          aria-expanded={isNavDrawerOpen}
          type="button"
          onClick={() => setIsNavDrawerOpen(!isNavDrawerOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div className="nav-left">
          <Link className="logo" href="/" aria-label="BAXED">
            <svg viewBox="65 20 895 185" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d={LOGO_PATH} />
            </svg>
          </Link>

          <nav className="desktop-nav" aria-label="Desktop Navigation">
            <Link href="/" className="nav-link">
              Shop
            </Link>
            <Link href="/" className="nav-link">
              Hair
            </Link>
            <Link href="/" className="nav-link">
              Body
            </Link>
            <Link href="/" className="nav-link">
              Skin
            </Link>
            <Link href="/#sets" className="nav-link">
              Sets
            </Link>
          </nav>
        </div>

        <div className="nav-actions">
          <Link href="/#sets" className="nav-pill-btn">
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
          </Link>
          <button
            type="button"
            className="nav-icon-btn"
            aria-label="Account"
            onClick={() => showToast("Account portal opening soon")}
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
          </button>
          <button
            className="nav-icon-btn cart-btn"
            type="button"
            aria-label="Cart"
            onClick={() => setIsCartDrawerOpen(true)}
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
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </header>

      {/* Main PDP Content */}
      <main className="pdp-container">
        <div className="pdp-grid">
          {/* Left Column: Gallery & Specifications */}
          <div className="pdp-gallery-col">
            <div className="pdp-carousel-wrapper">
              <div className="pdp-main-image-box">
                <Image
                  src={galleryImages[activeImageIndex].src}
                  alt={galleryImages[activeImageIndex].alt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 550px"
                  className="pdp-main-image"
                />

                {/* Image Counter Badge */}
                <div className="pdp-image-counter" aria-hidden="true">
                  {activeImageIndex + 1} / {galleryImages.length}
                </div>

                {/* Prev & Next Image Navigation Buttons */}
                <button
                  type="button"
                  className="pdp-nav-arrow pdp-nav-prev"
                  aria-label="Previous product image"
                  onClick={handlePrevImage}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="pdp-nav-arrow pdp-nav-next"
                  aria-label="Next product image"
                  onClick={handleNextImage}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>

                {/* What's Included Trigger */}
                <button
                  type="button"
                  className="pdp-whats-included-btn"
                  onClick={() => setShowIncluded(!showIncluded)}
                  aria-expanded={showIncluded}
                >
                  <span>What&#39;s Included?</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    style={{
                      transform: showIncluded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s"
                    }}
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* What's Included Expandable Panel */}
                {showIncluded && (
                  <div className="pdp-whats-included-panel">
                    <div className="pdp-included-title">Inside the Shower Duo</div>
                    <ul className="pdp-included-list">
                      <li>
                        <strong>1x Nourishing Shampoo (250ml)</strong>
                        <span>Scalp Cleanser</span>
                      </li>
                      <li>
                        <strong>1x Invigorating Body Wash (250ml)</strong>
                        <span>Hydrating Wash</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="pdp-thumbnails">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`pdp-thumb-item ${activeImageIndex === idx ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View ${img.alt}`}
                  style={{ position: "relative" }}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="60px" style={{ objectFit: "cover" }} />
                </button>
              ))}
            </div>

            {/* Best For Bar */}
            <div className="pdp-best-for-bar">
              <span className="pdp-best-for-label">BEST FOR:</span>
              <div className="pdp-best-for-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M8 8c0 4 4 6 4 10M16 8c0 4-4 6-4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span>All Hair Types</span>
              </div>
              <div className="pdp-best-for-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18v3H3zM6 9v9M10 9v9M14 9v9M18 9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span>All Lengths</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Features, CTA, Trust Badges */}
          <div className="pdp-info-col">
            <div className="pdp-rating-row">
              <span className="pdp-stars">★★★★★</span>
              <span className="pdp-reviews-count">2573 reviews</span>
            </div>

            <h1 className="pdp-title">{productTitle}</h1>

            <div className="pdp-highlights">
              <div className="pdp-highlight-item">
                <span className="pdp-highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </span>
                <span>{isClothingProduct ? "Premium Materials & Construction" : "Naturally-Derived Ingredients"}</span>
              </div>
              <div className="pdp-highlight-item">
                <span className="pdp-highlight-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                  </svg>
                </span>
                <span>{isClothingProduct ? "Designed for Everyday Wear" : "The Essential Shower Duo for Hair &amp; Scalp"}</span>
              </div>
              <div className="pdp-highlight-item">
                <span className="pdp-highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </span>
                <span>{isClothingProduct ? "Comfortable Fit, Built to Last" : "Science-Backed"}</span>
              </div>
            </div>

            {/* Primary CTA Button */}
            <button
              type="button"
              className="pdp-cta-button"
              onClick={handleAddToCart}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>ADD TO CART</span>
              <span className="pdp-cta-price">$50.40</span>
              <span className="pdp-cta-original-price">$56.00</span>
            </button>

            {/* Build Your Own Set Promo Card */}
            <div className="pdp-promo-card">
              <div className="pdp-promo-card-title">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
                </svg>
                <span>Build Your Own Set: Save up to 20% + 3 free gifts</span>
              </div>
              <p className="pdp-promo-card-desc">
                Pick your routine, unlock up to 20% off, and get 3 free gifts at 4 items.
              </p>
            </div>

            {/* Trust / Shipping Badges (3 Column Grid) */}
            <div className="pdp-trust-row">
              <div className="pdp-trust-col">
                <span className="pdp-trust-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="8" width="18" height="13" rx="1" />
                    <path d="M12 17V11" />
                    <path d="m9 14 3-3 3 3" />
                    <path d="M3 8V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3" />
                  </svg>
                </span>
                <span className="pdp-trust-text">Free US Shipping $30+</span>
              </div>
              <div className="pdp-trust-col">
                <span className="pdp-trust-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 2 11 13" />
                    <path d="m22 2-7 20-4-9-9-4 20-7z" />
                  </svg>
                </span>
                <span className="pdp-trust-text">Free INTL Shipping $100+</span>
              </div>
              <div className="pdp-trust-col">
                <span className="pdp-trust-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v10" />
                    <path d="M15 9.5a2.5 2.5 0 0 0-5 0c0 3 5 2 5 5a2.5 2.5 0 0 1-5 0" />
                  </svg>
                </span>
                <span className="pdp-trust-text">60-Day Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Section */}


        {/* Section 2: Why BASED / 3,000,000+ have chosen BASED */}
        <section className="pdp-reasons-section">
          <h2 className="pdp-reasons-heading">3,000,000+ have already chosen {isClothingProduct ? "BAXED" : "BASED"}</h2>
          <p className="pdp-reasons-sub">
            {isClothingProduct
              ? "Everyday essentials, thoughtfully made for comfort and lasting style."
              : "Because confidence shouldn&#39;t come at the cost of your health."}
          </p>

          <div className="pdp-benefits-list">
            {displayedBenefitItems.map((item, idx) => (
              <div className="pdp-benefit-row" key={idx}>
                <div className="pdp-benefit-icon">{item.icon}</div>
                <div className="pdp-benefit-content">
                  <h3 className="pdp-benefit-title">{item.title}</h3>
                  <p className="pdp-benefit-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pdp-switch-btn-wrap">
            <button
              type="button"
              className="pdp-switch-btn"
              onClick={handleAddToCart}
            >
              {isClothingProduct ? "EXPLORE THE COLLECTION" : "MAKE THE SWITCH NOW"}
            </button>
          </div>
        </section>
      </main>
      <section className="pdp-faq-section" aria-labelledby="faq-heading">
        <div className="pdp-faq-container">
          <div className="pdp-faq-heading-col">
            <h2 className="pdp-faq-heading" id="faq-heading">
              {isClothingProduct ? (
                <><span className="pdp-faq-accent">P</span>roduct<br />Details</>
              ) : (
                <><span className="pdp-faq-accent">F</span>requently<br />Asked Questions</>
              )}
            </h2>
          </div>

          <div className="pdp-faq-content-col">
            <div className="pdp-faq-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={faqTab === "faqs"}
                className={`pdp-faq-tab ${faqTab === "faqs" ? "active" : ""}`}
                onClick={() => {
                  setFaqTab("faqs");
                  setOpenFaqIndex(null);
                }}
              >
                {isClothingProduct ? "PRODUCT & FIT" : "FAQS"}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={faqTab === "delivery"}
                className={`pdp-faq-tab ${faqTab === "delivery" ? "active" : ""}`}
                onClick={() => {
                  setFaqTab("delivery");
                  setOpenFaqIndex(null);
                }}
              >
                DELIVERY &amp; RETURNS
              </button>
            </div>

            <div className="pdp-faq-list">
              {(faqTab === "faqs"
                ? (isClothingProduct ? clothingFaqItems : faqItems)
                : (isClothingProduct ? clothingDeliveryItems : deliveryItems)
              ).map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div className="pdp-faq-item" key={idx}>
                    <button
                      type="button"
                      className="pdp-faq-trigger"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    >
                      <span>{item.q}</span>
                      <svg
                        className="pdp-faq-chevron"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {isOpen && <div className="pdp-faq-body">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Slide-out Cart Drawer */}
      <div
        className={`cart-drawer-backdrop ${isCartDrawerOpen ? "open" : ""}`}
        onClick={() => setIsCartDrawerOpen(false)}
      ></div>
      <aside
        className={`cart-drawer ${isCartDrawerOpen ? "open" : ""}`}
        aria-label="Shopping cart"
        aria-hidden={!isCartDrawerOpen}
      >
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? "item" : "items"} in cart` : "Your cart is empty"}
          </h2>
          <button
            className="cart-drawer-close"
            type="button"
            aria-label="Close cart"
            onClick={() => setIsCartDrawerOpen(false)}
          ></button>
        </div>
        <div className="cart-drawer-content">
          {cartCount === 0 ? (
            <div className="cart-empty-state">
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
            <div className="cart-items">
              <div className="cart-shipping">
                <p className="cart-shipping-message">
                  {amountToFreeShipping > 0 ? (
                    <>
                      Add <strong>${amountToFreeShipping.toFixed(2)}</strong> to unlock <strong>FREE SHIPPING</strong>
                    </>
                  ) : (
                    <>You unlocked <strong>FREE SHIPPING</strong></>
                  )}
                </p>
                <div className="cart-shipping-track">
                  <span
                    className="cart-shipping-progress"
                    style={{ width: `${shippingProgress}%` }}
                  ></span>
                </div>
              </div>
              <div className="cart-set-promo">
                <p className="cart-set-eyebrow">Build your own set</p>
                <p className="cart-set-copy">Save up to 20% and unlock 3 free gifts when you build your set.</p>
                <Link className="cart-set-link" href="/#sets" onClick={() => setIsCartDrawerOpen(false)}>
                  Build my set
                </Link>
              </div>
              <div className="cart-item-list">
                {groupedCartItems.map(({ product, quantity }) => (
                  <article className="cart-item" key={product.name}>
                    <div className="cart-item-art" style={{ background: "#111", position: "relative" }}>
                      <Image src="/shower-duo-1.jpg" alt={product.name} fill sizes="70px" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-main">
                        <div>
                          <div className="cart-item-name">{product.name}</div>
                          <p className="cart-item-category">Shower Routine</p>
                        </div>
                        <span className="cart-item-price">${(product.price * quantity).toFixed(2)}</span>
                      </div>
                      <div className="cart-item-controls">
                        <button
                          type="button"
                          aria-label={`Remove ${product.name}`}
                          onClick={() => handleRemoveFromCart(product.name)}
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 14, height: 14 }}>
                            <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" fill="none" stroke="currentColor" strokeWidth="1.7" />
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
                ))}
              </div>
              <div className="cart-summary">
                <div className="cart-subtotal-row">
                  <span>Subtotal</span>
                  <strong>{displayedSubtotal}</strong>
                </div>
                <button
                  className="cart-checkout-btn"
                  type="button"
                  onClick={() => showToast("Checkout is coming soon")}
                >
                  <span>Continue to checkout</span>
                  <span>{displayedSubtotal}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Footer */}
      <footer id="footer">
        <div className="footer-watermark" aria-hidden="true">
          BASED
        </div>
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="footer-brand-name" href="/" aria-label="BASED home">
              <svg viewBox="65 20 895 185" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d={LOGO_PATH} />
              </svg>
            </Link>
            <p className="footer-mission">
              Essential grooming engineered for men. Peak performance with natural ingredients.
            </p>
          </div>
          <nav className="footer-column" aria-label="Customer care">
            <h3>Customer Care</h3>
            <ul className="footer-links">
              <li><Link href="/">Contact Us</Link></li>
              <li><Link href="/">FAQs</Link></li>
              <li><Link href="/">Shipping &amp; Returns</Link></li>
            </ul>
          </nav>
          <nav className="footer-column" aria-label="Quick links">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/">Shop All</Link></li>
              <li><Link href="/products/shower-duo">Shower Duo</Link></li>
              <li><Link href="/#sets">Build A Set</Link></li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 BASED. All rights reserved.</span>
          <span>Made for everyday performance.</span>
        </div>
      </footer>

      {/* Notification Toast */}
      <div className={`toast gold ${isToastActive ? "on" : ""}`} id="toast" role="status">
        {toastMessage}
      </div>
    </div>
  );
}
