"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Reusable SVG Placeholder Component for products
function ProductPlaceholder({ title = "Product", aspect = "1/1", className = "" }) {
  return (
    <div
      className={`cart-placeholder-box ${className}`}
      style={{ aspectRatio: aspect }}
      aria-label={`${title} image placeholder`}
    >
      <div className="cart-placeholder-content">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          className="cart-placeholder-icon"
          aria-hidden="true"
        >
          <rect x="18" y="14" width="28" height="42" rx="6" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M26 14V8C26 6.89543 26.8954 6 28 6H36C37.1046 6 38 6.89543 38 8V14" strokeWidth="2" />
          <line x1="24" y1="26" x2="40" y2="26" strokeWidth="1.5" />
          <line x1="24" y1="32" x2="36" y2="32" strokeWidth="1.5" />
          <circle cx="32" cy="42" r="4" strokeWidth="1.5" />
        </svg>
        <span className="cart-placeholder-tag">BAXED</span>
      </div>
    </div>
  );
}

// Google Pay Logo SVG
function GooglePayLogo() {
  return (
    <svg viewBox="0 0 100 32" className="pay-logo gpay-logo" aria-hidden="true">
      {/* Google G icon */}
      <path
        d="M20.5 16.2c0-.5 0-.9-.1-1.3H11v2.7h5.4c-.2 1.3-1 2.4-2.1 3.1v2.5h3.4c2-1.9 3.2-4.7 3.2-7z"
        fill="#4285F4"
      />
      <path
        d="M11 25.8c3 0 5.5-1 7.3-2.7l-3.4-2.5c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.1v2.6C2.9 23.2 6.7 25.8 11 25.8z"
        fill="#34A853"
      />
      <path
        d="M4.6 17c-.2-.7-.4-1.5-.4-2.3 0-.8.1-1.6.4-2.3V9.8H1.1C.4 11.2 0 12.8 0 14.7s.4 3.5 1.1 4.9L4.6 17z"
        fill="#FBBC05"
      />
      <path
        d="M11 8.6c1.6 0 3.1.6 4.3 1.7l3.2-3.2C16.5 5.3 14 4.5 11 4.5 6.7 4.5 2.9 7.1 1.1 10.7l3.5 2.6c.9-2.7 3.4-4.7 6.4-4.7z"
        fill="#EA4335"
      />
      {/* Pay text */}
      <text
        x="26"
        y="21.5"
        fill="#1F2937"
        fontSize="17"
        fontWeight="600"
        letterSpacing="-0.02em"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Pay
      </text>
    </svg>
  );
}

// Apple Pay Logo SVG
function ApplePayLogo() {
  return (
    <svg viewBox="0 0 100 32" className="pay-logo applepay-logo" fill="#FFFFFF" aria-hidden="true">
      {/* Apple icon */}
      <path d="M12.4 8.7c-.7.8-1.7 1.4-2.7 1.3-.1-1.1.4-2.2 1-2.9.7-.8 1.8-1.4 2.8-1.4.1 1.1-.4 2.2-1.1 3zm.8 1.4c-1.5-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 1-3.7 2.4-1.7 2.8-.4 6.9 1.2 9.2.8 1.1 1.7 2.3 3 2.3 1.1 0 1.6-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.4-2.7-.1 0-2.6-1-2.6-4 .1-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.7-1.9z" />
      {/* Pay text */}
      <text
        x="24"
        y="22.5"
        fill="#FFFFFF"
        fontSize="17"
        fontWeight="600"
        letterSpacing="-0.02em"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        Pay
      </text>
    </svg>
  );
}

// Default recommendations matching user's Image 2
const RECOMMENDED_PRODUCTS = [
  {
    id: "shampoo",
    name: "Shampoo",
    price: 28.0,
    originalPrice: 56.0,
    savings: 28.0,
    hasSaleBadge: false,
    subtitle: "Everyday Purifying Cleanse",
  },
  {
    id: "conditioner",
    name: "Conditioner",
    price: 28.0,
    originalPrice: 56.0,
    savings: 28.0,
    hasSaleBadge: false,
    subtitle: "Hydrating Keratin Moisture",
  },
  {
    id: "hair-elixir",
    name: "Hair Elixir",
    price: 20.0,
    originalPrice: 31.0,
    savings: 11.0,
    hasSaleBadge: true,
    subtitle: "Nourishing Weightless Oil",
  },
  {
    id: "texture-powder",
    name: "Texture Powder",
    price: 20.0,
    originalPrice: null,
    savings: 0,
    hasSaleBadge: false,
    subtitle: "Matte Volume & Lift",
  },
];

export default function CartClient() {
  // Initial cart matching user's Image 1
  const [cartItems, setCartItems] = useState([
    {
      id: "style-hydration-duo",
      name: "Style & Hydration Duo",
      subtitle: "Style & Hydration Duo",
      price: 42.3,
      originalPrice: 47.0,
      savings: 4.7,
      quantity: 1,
      category: "Set",
    },
  ]);

  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState("");
  const [toast, setToast] = useState({ message: "", visible: false });
  const [checkoutModal, setCheckoutModal] = useState(null);

  // Read stored cart if present on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem("baxed_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          if (parsed.length > 0) {
            // Normalize items
            const normalized = parsed.map((item, idx) => ({
              id: item.id || `cart-item-${idx}`,
              name: item.name || item.title || "BAXED Item",
              subtitle: item.subtitle || item.description || "BAXED Premium Grooming",
              price: typeof item.price === "number" ? item.price : 42.3,
              originalPrice: item.originalPrice || (typeof item.price === "number" ? item.price + 5 : 47.0),
              savings: item.savings || 4.7,
              quantity: item.quantity || item.qty || 1,
              category: item.category || "Apparel",
            }));
            setCartItems(normalized);
          } else {
            setCartItems([]);
          }
        }
      }
    } catch {
      // fallback to initial state
    }
  }, []);

  useEffect(() => {
    if (!isNavDrawerOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsNavDrawerOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isNavDrawerOpen]);

  // Save changes to localStorage
  const updateCart = (nextItems) => {
    setCartItems(nextItems);
    try {
      localStorage.setItem("baxed_cart", JSON.stringify(nextItems));
    } catch {
      // ignore
    }
  };

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: "", visible: false });
    }, 2800);
  };

  // Quantity updates
  const handleIncreaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const handleDecreaseQty = (id) => {
    const target = cartItems.find((item) => item.id === id);
    if (!target) return;
    if (target.quantity > 1) {
      const updated = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      updateCart(updated);
    } else {
      handleRemoveItem(id);
    }
  };

  const handleRemoveItem = (id) => {
    const target = cartItems.find((item) => item.id === id);
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
    if (target) {
      showToast(`Removed "${target.name}" from cart`);
    }
  };

  // Add recommended product
  const handleAddRecommended = (prod) => {
    const existing = cartItems.find((i) => i.id === prod.id || i.name === prod.name);
    if (existing) {
      handleIncreaseQty(existing.id);
      showToast(`Added another "${prod.name}" to cart`);
    } else {
      const newItem = {
        id: prod.id,
        name: prod.name,
        subtitle: prod.subtitle,
        price: prod.price,
        originalPrice: prod.originalPrice || prod.price,
        savings: prod.savings || 0,
        quantity: 1,
        category: "Grooming",
      };
      updateCart([...cartItems, newItem]);
      showToast(`"${prod.name}" added to cart!`);
    }
  };

  // Discount code application
  const handleApplyDiscount = (e) => {
    e.preventDefault();
    setDiscountError("");
    const cleaned = discountCode.trim().toUpperCase();

    if (!cleaned) {
      setDiscountError("Please enter a code");
      return;
    }

    if (cleaned === "TBILISI" || cleaned === "TBILISI20") {
      setAppliedDiscount({ code: cleaned, rate: 0.2, label: "20% Off Tbilisi Special" });
      showToast("Promo applied: 20% discount on entire order!");
      setDiscountCode("");
    } else if (cleaned === "BAXED10") {
      setAppliedDiscount({ code: cleaned, rate: 0.1, label: "10% Off Welcome" });
      showToast("Promo applied: 10% discount on order!");
      setDiscountCode("");
    } else {
      setDiscountError("Invalid discount code. Try 'TBILISI' or 'BAXED10'");
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    showToast("Discount code removed");
  };

  // Math Calculations
  const totalItemCount = cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0);
  const rawSubtotal = cartItems.reduce(
    (acc, it) => acc + (Number(it.price) || 0) * (it.quantity || 1),
    0
  );
  const baseSavings = cartItems.reduce(
    (acc, it) => acc + (Number(it.savings) || 0) * (it.quantity || 1),
    0
  );

  const discountAmount = appliedDiscount ? rawSubtotal * appliedDiscount.rate : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);
  const combinedSavings = baseSavings + discountAmount;
  const installmentAmount = (finalTotal / 2).toFixed(2);

  // Handle Checkout / Payment clicks
  const triggerPaymentAction = (provider) => {
    setCheckoutModal({
      provider,
      title: `${provider} Checkout`,
      message: `Connecting to ${provider} secure checkout for ₾${finalTotal.toFixed(2)} GEL...`,
    });
  };

  return (
    <div className="cart-page-wrapper">
      {/* Top Notification Toast */}
      {toast.visible && (
        <div className="cart-toast" role="status" aria-live="polite">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Payment Processing Modal */}
      {checkoutModal && (
        <div className="cart-modal-backdrop" onClick={() => setCheckoutModal(null)}>
          <div className="cart-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="cart-modal-header">
              <h3 className="cart-modal-title">{checkoutModal.title}</h3>
              <button
                type="button"
                className="cart-modal-close"
                onClick={() => setCheckoutModal(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>
            <div className="cart-modal-body">
              <div className="cart-modal-spinner" aria-hidden="true" />
              <p className="cart-modal-text">{checkoutModal.message}</p>
              <div className="cart-modal-summary">
                <span>Order Total:</span>
                <strong>₾{finalTotal.toFixed(2)} GEL</strong>
              </div>
              <p className="cart-modal-note">
                FREE Tbilisi Shipping is automatically applied to this order.
              </p>
            </div>
            <div className="cart-modal-actions">
              <button
                type="button"
                className="cart-modal-btn"
                onClick={() => {
                  showToast(`Order initiated via ${checkoutModal.provider}!`);
                  setCheckoutModal(null);
                }}
              >
                Confirm & Pay ₾{finalTotal.toFixed(2)}
              </button>
              <button
                type="button"
                className="cart-modal-cancel"
                onClick={() => setCheckoutModal(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purple & White Header Navigation */}
      <Navbar
        variant="cart-navbar-purple"
        cartCount={totalItemCount}
        isNavDrawerOpen={isNavDrawerOpen}
        onMenuToggle={() => setIsNavDrawerOpen((isOpen) => !isOpen)}
        onCartClick={() => { }}
        onAccountClick={() => showToast("Account portal opening soon")}
      />

      <div
        className={`nav-drawer-backdrop ${isNavDrawerOpen ? "open" : ""}`}
        onClick={() => setIsNavDrawerOpen(false)}
        aria-hidden="true"
      />
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
            aria-label="Close menu"
            type="button"
            onClick={() => setIsNavDrawerOpen(false)}
          >
            &times;
          </button>
          <Link
            className="nav-drawer-title"
            href="/"
            onClick={() => setIsNavDrawerOpen(false)}
            style={{ fontSize: 16, fontWeight: 900, letterSpacing: "0.12em", lineHeight: 1 }}
          >
            BAXED
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
            <Link
              href="/cart"
              className="drawer-cart-btn"
              aria-label={`Cart, ${totalItemCount} items`}
              onClick={() => setIsNavDrawerOpen(false)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="drawer-cart-count">{totalItemCount}</span>
            </Link>
          </div>
        </div>
        <nav className="nav-drawer-links" aria-label="Main menu">
          <Link href="/" onClick={() => setIsNavDrawerOpen(false)}>Shop All</Link>
          <Link href="/tops" onClick={() => setIsNavDrawerOpen(false)}>Tops</Link>
          <Link href="/bottoms" onClick={() => setIsNavDrawerOpen(false)}>Bottoms</Link>
          <Link href="/outerwear" onClick={() => setIsNavDrawerOpen(false)}>Outerwear</Link>
          <Link href="/build-your-set" onClick={() => setIsNavDrawerOpen(false)}>Build A Set</Link>
          <Link href="/contact" onClick={() => setIsNavDrawerOpen(false)}>Contact Us</Link>
          <Link href="/faq" onClick={() => setIsNavDrawerOpen(false)}>FAQs</Link>
          <Link href="/size-guide" onClick={() => setIsNavDrawerOpen(false)}>Size Guide</Link>
          <Link href="/shipping-returns" onClick={() => setIsNavDrawerOpen(false)}>Shipping &amp; Returns</Link>
        </nav>
      </aside>

      <main className="cart-page-main" id="cartMainContent">
        <div className="cart-container">
          {/* Header Title with Counter Pill */}
          <div className="cart-title-row">
            <h1 className="cart-main-heading">
              Cart <span className="cart-heading-pill">{totalItemCount}</span>
            </h1>
          </div>

          {/* FREE Tbilisi Shipping Banner */}
          <section className="cart-shipping-banner" aria-label="Shipping status">
            <div className="cart-shipping-banner-content">
              <span className="cart-shipping-check" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <p className="cart-shipping-text">
                You unlocked <strong>FREE Tbilisi Shipping</strong>
              </p>
            </div>
            <div className="cart-shipping-bar-track" aria-hidden="true">
              <div className="cart-shipping-bar-fill" style={{ width: "100%" }} />
            </div>
          </section>

          {/* Main Content Layout: 2 Columns */}
          <div className="cart-layout-grid">
            {/* Left Column: Items List */}
            <div className="cart-items-column">
              {cartItems.length === 0 ? (
                <div className="cart-empty-box">
                  <div className="cart-empty-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <h2 className="cart-empty-title">Your cart is currently empty</h2>
                  <p className="cart-empty-subtitle">
                    Add items below from recommended grooming essentials to unlock free Tbilisi shipping!
                  </p>
                  <button
                    type="button"
                    className="cart-shop-now-btn"
                    onClick={() => handleAddRecommended(RECOMMENDED_PRODUCTS[0])}
                  >
                    Add {RECOMMENDED_PRODUCTS[0].name} (₾28.00)
                  </button>
                </div>
              ) : (
                <div className="cart-items-list" role="list">
                  {cartItems.map((item) => {
                    const itemTotal = (item.price * item.quantity).toFixed(2);
                    const itemOriginal = (item.originalPrice * item.quantity).toFixed(2);
                    const itemSavings = ((item.originalPrice - item.price) * item.quantity).toFixed(2);

                    return (
                      <article key={item.id} className="cart-item-card" role="listitem">
                        {/* Placeholder image container */}
                        <div className="cart-item-thumbnail">
                          <ProductPlaceholder title={item.name} aspect="1/1" />
                        </div>

                        {/* Item Details */}
                        <div className="cart-item-info">
                          <div className="cart-item-header">
                            <div>
                              <h3 className="cart-item-title">{item.name}</h3>
                              <p className="cart-item-subtitle">{item.subtitle}</p>
                            </div>
                            <span className="cart-item-total-price">₾{itemTotal}</span>
                          </div>

                          <div className="cart-item-pricing-row">
                            <span className="cart-item-unit-price">₾{item.price.toFixed(2)}</span>
                            {item.originalPrice > item.price && (
                              <span className="cart-item-strikethrough">
                                ₾{item.originalPrice.toFixed(2)}
                              </span>
                            )}
                            {Number(itemSavings) > 0 && (
                              <span className="cart-item-save-badge">
                                (Save ₾{itemSavings})
                              </span>
                            )}
                          </div>

                          {/* Quantity and Remove Controls */}
                          <div className="cart-item-bottom-controls">
                            <div className="cart-qty-stepper" aria-label="Item quantity">
                              <button
                                type="button"
                                className="cart-qty-btn minus"
                                aria-label="Decrease quantity"
                                onClick={() => handleDecreaseQty(item.id)}
                              >
                                −
                              </button>
                              <span className="cart-qty-val">{item.quantity}</span>
                              <button
                                type="button"
                                className="cart-qty-btn plus"
                                aria-label="Increase quantity"
                                onClick={() => handleIncreaseQty(item.id)}
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              className="cart-trash-btn"
                              aria-label={`Remove ${item.name} from cart`}
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Order Summary & Pay Options */}
            <aside className="cart-summary-column" aria-label="Order summary">
              <div className="cart-summary-card">
                {/* Collapsible Discount Accordion */}
                <div className="cart-discount-section">
                  <button
                    type="button"
                    className="cart-discount-toggle"
                    onClick={() => setDiscountOpen(!discountOpen)}
                    aria-expanded={discountOpen}
                  >
                    <span>Discount</span>
                    <span className="cart-discount-icon">{discountOpen ? "−" : "+"}</span>
                  </button>

                  {discountOpen && (
                    <form className="cart-discount-form" onSubmit={handleApplyDiscount}>
                      <div className="cart-discount-input-row">
                        <input
                          type="text"
                          className="cart-discount-input"
                          placeholder="Promo code (e.g. TBILISI)"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          aria-label="Discount code"
                        />
                        <button type="submit" className="cart-discount-apply-btn">
                          Apply
                        </button>
                      </div>
                      {discountError && <p className="cart-discount-error">{discountError}</p>}
                    </form>
                  )}

                  {appliedDiscount && (
                    <div className="cart-applied-badge">
                      <span>✓ {appliedDiscount.label}</span>
                      <button
                        type="button"
                        onClick={handleRemoveDiscount}
                        aria-label="Remove promo code"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Total Savings Highlight */}
                {combinedSavings > 0 && (
                  <div className="cart-savings-highlight">
                    <span className="cart-savings-label">TOTAL SAVINGS</span>
                    <span className="cart-savings-amount">₾{combinedSavings.toFixed(2)}</span>
                  </div>
                )}

                {/* Estimated Total */}
                <div className="cart-total-row">
                  <span className="cart-total-label">Estimated total</span>
                  <div className="cart-total-price-group">
                    <span className="cart-total-value">₾{finalTotal.toFixed(2)}</span>
                    <span className="cart-total-currency">GEL</span>
                  </div>
                </div>

                {/* Duties and shipping disclaimer */}
                <p className="cart-shipping-disclaimer">
                  Duties and taxes included. Shipping is calculated at checkout.
                </p>

                {/* Primary Continue to Checkout Button */}
                <Link href="/checkout" className="cart-primary-checkout-btn">
                  <span className="cart-primary-btn-label">Continue to Checkout</span>
                  <span className="cart-primary-btn-divider" aria-hidden="true">|</span>
                  <span className="cart-primary-btn-total">₾{finalTotal.toFixed(2)}</span>
                </Link>
                <div className="cart-pay-options-divider">
                  <span>OR PAY WITH</span>
                </div>

                <div className="">
                  {/* Apple Pay */}
                  <div className="checkout-express-buttons">
                    <button
                      type="button"
                      className="checkout-express-apple"
                      aria-label="Apple Pay"
                      onClick={() => handleExpressCheckout("Apple Pay")}
                    >
                      <img
                        src="/applegooglesvg/apple-logo-png-svg.webp"
                        alt="Apple"
                        className="checkout-express-icon apple-icon"
                      />
                      <span>Pay</span>
                    </button>
                    <button
                      type="button"
                      className="checkout-express-google"
                      aria-label="Google Pay"
                      onClick={() => handleExpressCheckout("Google Pay")}
                    >
                      <img
                        src="/applegooglesvg/google-logo.webp"
                        alt="Google"
                        className="checkout-express-icon google-icon"
                      />
                      <span>Pay</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* "You may also like" Section (Matching Screenshot 2) */}
          <section className="cart-recommendations-section" aria-label="Recommended products">
            <div className="cart-recommendations-header">
              <h2 className="cart-recommendations-title">You may also like</h2>
              <Link href="/" className="cart-view-all-link">
                View all
              </Link>
            </div>

            <div className="cart-recommendations-grid">
              {RECOMMENDED_PRODUCTS.map((prod) => (
                <div key={prod.id} className="cart-rec-card">
                  {/* Placeholder image for recommended item */}
                  <div className="cart-rec-media">
                    <ProductPlaceholder title={prod.name} aspect="1/1" />
                    {prod.hasSaleBadge && <span className="cart-rec-sale-badge">Sale</span>}
                  </div>

                  <div className="cart-rec-info">
                    <h3 className="cart-rec-name">{prod.name}</h3>
                    <div className="cart-rec-price-row">
                      <span className="cart-rec-price">₾{prod.price.toFixed(2)}</span>
                      {prod.originalPrice && (
                        <span className="cart-rec-strikethrough">
                          ₾{prod.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="cart-rec-add-btn"
                      onClick={() => handleAddRecommended(prod)}
                      aria-label={`Add ${prod.name} to cart`}
                    >
                      + Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer component */}
      <Footer activeKey="cart" />
    </div>
  );
}
