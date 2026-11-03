"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

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
    a: "Conventional drugstore products often rely on harsh sulfates, synthetic silicones, and parabens that strip your natural scalp barrier and coat hair strands in heavy residue. BAXED formulas use 100% naturally-derived botanical surfactants, essential oils, and targeted amino acids to nourish and restore hair health from root to tip without toxic buildup."
  },
  {
    q: "Will this shampoo clean my hair as effectively as drugstore shampoos?",
    a: "Yes, absolutely. We use high-performance plant-derived surfactants like sodium cocoyl isethionate and decyl glucoside that produce a rich, luxurious micro-foam. It thoroughly eliminates excess sebum, sweat, and environmental impurities while maintaining your scalp's optimal pH balance."
  },
  {
    q: "How long will it take to see results after switching to BAXED?",
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
    a: "A single 250ml bottle of BAXED lasts between 60 to 90 days with normal usage due to its concentrated, water-efficient formula. Cost per wash comes out to less than ₾0.50—comparable to drugstore products while delivering clinical-grade botanicals."
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
    a: "Yes, we ship worldwide! Orders over ₾100 qualify for free international shipping. Transit times range from 5 to 10 business days depending on customs clearance in your country."
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
  const [storeProduct, setStoreProduct] = useState(null);
  const displayedTitle = storeProduct?.name || productTitle;
  const displayedPrice = storeProduct?.price ?? 50.4;
  const displayedGallery = storeProduct?.image
    ? [{ src: storeProduct.image, alt: storeProduct.name }]
    : galleryImages;
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
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);
  const [faqTab, setFaqTab] = useState("faqs");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : [])
      .then((products) => {
        if (!cancelled && Array.isArray(products)) {
          const matchingProduct = products.find((product) => product.slug === rawSlug) || null;
          setStoreProduct(matchingProduct);
          if (matchingProduct) setActiveImageIndex(0);
        }
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [rawSlug]);

  // Load stored cart on mount
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
                id: item.id || String(item.name).toLowerCase().replace(/\s+/g, "-"),
                name: item.name || item.title || "Product",
                category: item.category || "Apparel",
                description: item.description || item.subtitle || "",
                price: typeof item.price === "number" ? item.price : parseFloat(item.price) || 0,
                color: item.color || "#222",
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

  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? displayedGallery.length - 1 : prev - 1));
  }, [displayedGallery.length]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === displayedGallery.length - 1 ? 0 : prev + 1));
  }, [displayedGallery.length]);

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
  }, [handleNextImage, handlePrevImage, isCartDrawerOpen, isNavDrawerOpen, showIncluded]);

  const handleAddToCart = () => {
    const productItem = {
      id: storeProduct?.id || rawSlug,
      name: displayedTitle,
      category: "Duo",
      price: displayedPrice,
      originalPrice: displayedPrice,
      quantity: 1,
      subtitle: storeProduct?.sub || "",
      description: storeProduct?.description || "",
      image: storeProduct?.image || galleryImages[0].src,
      color: "#222"
    };
    try {
      const storedCart = JSON.parse(localStorage.getItem("baxed_cart") || "[]");
      const currentItems = Array.isArray(storedCart) ? storedCart : [];
      const existing = currentItems.find((item) => item.id === productItem.id);
      const nextItems = existing
        ? currentItems.map((item) => item.id === productItem.id
          ? { ...item, quantity: Number(item.quantity || item.qty || 1) + 1 }
          : item)
        : [...currentItems, productItem];
      localStorage.setItem("baxed_cart", JSON.stringify(nextItems));
    } catch {
      // Keep the product page usable when browser storage is unavailable.
    }
    setCartItems((prev) => [...prev, productItem]);
    showToast(`${displayedTitle} added to cart`);
    setIsCartDrawerOpen(true);
  };

  const syncCartToStorage = (items) => {
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

  const handleRemoveFromCart = (productName) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => item.name !== productName);
      syncCartToStorage(next);
      return next;
    });
  };

  const handleAddQuantity = (productName) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.name === productName);
      if (item) {
        const next = [...prev, item];
        syncCartToStorage(next);
        return next;
      }
      return prev;
    });
  };

  const cartCount = cartItems.length;
  const subtotal = cartItems.reduce(
    (total, p) => total + (typeof p.price === "number" && Number.isFinite(p.price) ? p.price : 0),
    0
  );
  const shippingGoal = 100;
  const amountToFreeShipping = Math.max(0, shippingGoal - subtotal);
  const shippingProgress = Math.min(100, (subtotal / shippingGoal) * 100);
  const displayedSubtotal = `₾${subtotal.toFixed(2)}`;

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
      <Navbar
        isNavDrawerOpen={isNavDrawerOpen}
        onMenuToggle={() => setIsNavDrawerOpen(!isNavDrawerOpen)}
        onCartClick={() => setIsCartDrawerOpen(true)}
        onAccountClick={() => showToast("Account portal opening soon")}
        cartCount={cartCount}
      />

      {/* Main PDP Content */}
      <main className="pdp-container">
        <div className="pdp-grid">
          {/* Left Column: Gallery & Specifications */}
          <div className="pdp-gallery-col">
            <div className="pdp-carousel-wrapper">
              <div className="pdp-main-image-box">
                <Image
                  src={displayedGallery[activeImageIndex].src}
                  alt={displayedGallery[activeImageIndex].alt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 550px"
                  className="pdp-main-image"
                />

                {/* Image Counter Badge */}
                <div className="pdp-image-counter" aria-hidden="true">
                  {activeImageIndex + 1} / {displayedGallery.length}
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
              {displayedGallery.map((img, idx) => (
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

            <h1 className="pdp-title">{displayedTitle}</h1>
            {storeProduct?.description && <p className="admin-store-product-description">{storeProduct.description}</p>}

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

            {/* Price */}
            <div className="price pdp-price">
              <span className="price-currency">₾</span>{displayedPrice.toFixed(2)}
              {!storeProduct && <span className="pdp-original-price">₾56.00</span>}
            </div>

            {/* Primary CTA Button */}
            <button
              type="button"
              className="pdp-cta-button"
              onClick={handleAddToCart}
            >
              <span>ADD TO CART</span>
              <svg className="byob-bag-icon cart-plus-icon" viewBox="0 0 15 17" fill="none" aria-hidden="true">
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

            {/* Build Your Own Set Promo Card */}
            <Link href="/build-your-set" className="pdp-promo-card" style={{ display: "block" }}>
              <div className="pdp-promo-card-title">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
                </svg>
                <span>Build Your Own Set: Save up to 20% + 3 free gifts</span>
              </div>
              <p className="pdp-promo-card-desc">
                Pick your routine, unlock up to 20% off, and get 3 free gifts at 4 items.
              </p>
            </Link>

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
                <span className="pdp-trust-text">Free US Shipping ₾30+</span>
              </div>
              <div className="pdp-trust-col">
                <span className="pdp-trust-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 2 11 13" />
                    <path d="m22 2-7 20-4-9-9-4 20-7z" />
                  </svg>
                </span>
                <span className="pdp-trust-text">Free INTL Shipping ₾100+</span>
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


        {/* Section 2: Why BAXED / 3,000,000+ have chosen BAXED */}
        <section className="pdp-reasons-section">
          <h2 className="pdp-reasons-heading">3,000,000+ have already chosen BAXED</h2>
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
      {/* Slide-out Navigation Drawer (Mobile & Desktop Menu) */}
      <div
        className={`nav-drawer-backdrop ${isNavDrawerOpen ? "open" : ""}`}
        id="navDrawerBackdrop"
        onClick={() => setIsNavDrawerOpen(false)}
      />
      <aside
        className={`nav-drawer ${isNavDrawerOpen ? "open" : ""}`}
        id="navDrawer"
        aria-label="Navigation drawer"
        aria-hidden={!isNavDrawerOpen}
      >
        <div className="nav-drawer-promo">
          BUILD YOUR OWN SET · SAVE UP TO 20% + 3 FREE GIFTS
        </div>
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
          <Link
            className="nav-drawer-title"
            href="/"
            aria-label="BAXED home"
            onClick={() => setIsNavDrawerOpen(false)}
          >
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
              <span className="drawer-cart-count">{cartCount}</span>
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

          {/* Footwear Accordion */}
          <div className={`drawer-category ${openSubmenu === "Footwear" ? "is-expanded" : ""}`}>
            <button
              className="drawer-category-toggle"
              type="button"
              aria-expanded={openSubmenu === "Footwear"}
              onClick={() => toggleSubmenu("Footwear")}
            >
              <span>Footwear</span>
              <span className="drawer-category-chevron" aria-hidden="true" />
            </button>
            <div
              className={`drawer-submenu-wrapper ${openSubmenu === "Footwear" ? "is-open" : ""}`}
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
                      Add <strong>₾{amountToFreeShipping.toFixed(2)}</strong> to unlock <strong>FREE SHIPPING</strong>
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
                <Link className="cart-set-link" href="/build-your-set" onClick={() => setIsCartDrawerOpen(false)}>
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
                        <span className="cart-item-price">₾{(product.price * quantity).toFixed(2)}</span>
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
                <Link
                  className="cart-checkout-btn"
                  id="cartCheckout"
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                >
                  <span>Continue to checkout</span>
                  <span>{displayedSubtotal}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Footer */}
      <Footer />

      {/* Notification Toast */}
      <div className={`toast gold ${isToastActive ? "on" : ""}`} id="toast" role="status">
        {toastMessage}
      </div>
    </div>
  );
}
