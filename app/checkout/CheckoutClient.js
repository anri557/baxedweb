"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CHECKOUT_RECOMMENDATIONS = [
  { id: "heavyweight-boxy-tee", name: "Heavyweight Boxy Tee", subtitle: "Everyday essential", price: 32, image: "/ShopTop.jpeg" },
  { id: "tapered-chinos", name: "Tapered Chinos", subtitle: "Tailored everyday fit", price: 68, image: "/ShopBottoms.jpeg" },
  { id: "bomber-jacket", name: "Bomber Jacket", subtitle: "Lightweight outerwear", price: 149, image: "/outwear.jpeg" },
];

const INITIAL_CART = [
  { id: "heavyweight-boxy-tee", name: "Heavyweight Boxy Tee", subtitle: "Everyday essential", price: 32, quantity: 1, image: "/ShopTop.jpeg" },
];

const CHECKOUT_REVIEWS = [
  {
    id: 1,
    quote: "Best quality essentials on the market. Fits better than anything else in my wardrobe.",
    author: "Travis D.",
  },
  {
    id: 2,
    quote: "Clean aesthetic, heavyweight fabric, and fast delivery right to my door.",
    author: "Anthony M.",
  },
];

const FREE_SHIPPING_GOAL = 100;

function formatPrice(value) {
  return `${Number(value || 0).toFixed(2).replace(".", ",")}₾`;
}

export default function CheckoutClient() {
  const router = useRouter();
  const [items, setItems] = useState(INITIAL_CART);
  const [discountCode, setDiscountCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [showBottomDiscount, setShowBottomDiscount] = useState(false);
  const [notice, setNotice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const noticeTimerRef = useRef(null);

  const showNotice = (msg, duration = 3000) => {
    setNotice(msg);
    if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => setNotice(""), duration);
  };

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("baxed_cart") || "null");
      if (Array.isArray(stored) && stored.length) {
        const storedItems = stored.map((item, index) => ({
          id: item.id || `checkout-item-${index}`,
          name: item.name || item.title || "BAXED Item",
          subtitle: item.subtitle || item.description || "Just One",
          price: Number(item.price) || 0,
          quantity: Number(item.quantity || item.qty) || 1,
          image: item.image || item.imageUrl || "/ShopTop.jpeg",
        }));
        setItems(storedItems);
      }
    } catch {
      // Keep fallback cart if localStorage is unavailable
    }

    return () => {
      if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    };
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const discount = subtotal * discountRate;
  const total = Math.max(0, subtotal - discount);

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_GOAL - total);
  const freeShippingPercent = Math.min(100, Math.round((total / FREE_SHIPPING_GOAL) * 100));

  const applyDiscount = (event) => {
    event.preventDefault();
    const code = discountCode.trim().toUpperCase();
    if (["TBILISI", "TBILISI20"].includes(code)) {
      setDiscountRate(0.2);
      setDiscountMessage("20% discount applied");
    } else if (code === "BAXED10") {
      setDiscountRate(0.1);
      setDiscountMessage("10% discount applied");
    } else {
      setDiscountRate(0);
      setDiscountMessage(code ? "This code is not valid" : "Enter a discount code");
    }
  };

  const addRecommendation = (product) => {
    const current = items.find((item) => item.id === product.id);
    const next = current
      ? items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      : [...items, { ...product, subtitle: product.subtitle, quantity: 1 }];
    setItems(next);
    try {
      localStorage.setItem("baxed_cart", JSON.stringify(next));
    } catch {
      // Ignore storage error
    }
    showNotice(`${product.name} added to your order`, 2400);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      customer: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        apartment: formData.get("apartment"),
        city: formData.get("city"),
        postalCode: formData.get("postalCode"),
        country: formData.get("country"),
      },
      items,
      discountCode: discountRate ? discountCode.trim().toUpperCase() : "",
      paymentMethod,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not place your order. Please try again.");

      try {
        localStorage.removeItem("baxed_cart");
      } catch {
        // The saved order remains valid even when local storage is unavailable.
      }
      router.push("/order-success");
    } catch (submitError) {
      showNotice(submitError.message || "We couldn't save your order. Please check your connection and try again.", 4500);
    }
  };

  const handleExpressCheckout = (provider) => {
    showNotice(
      provider
        ? `${provider} is not configured yet. Please complete your order below.`
        : "Express checkout is not configured yet. Please complete your order below.",
      3200
    );
  };

  const renderSummaryDetails = () => (
    <>
      <div className="checkout-shipping-progress">
        <div className="checkout-progress-track">
          <span style={{ width: `${freeShippingPercent}%` }} />
        </div>
        <p>
          {freeShippingRemaining > 0
            ? `You're ${freeShippingRemaining.toFixed(2).replace(".", ",")} US$ away from free shipping!`
            : "You've unlocked free shipping!"}
        </p>
      </div>

      <div className="checkout-item-list">
        {items.map((item, index) => (
          <article className="checkout-item" key={`${item.id}-${index}`}>
            <div className="checkout-item-image">
              <Image src={item.image || "/ShopTop.jpeg"} alt={item.name} fill sizes="64px" />
              <span className="checkout-item-quantity">{item.quantity}</span>
            </div>
            <div className="checkout-item-copy">
              <strong>{item.name}</strong>
              <span>{item.subtitle}</span>
            </div>
            <span className="checkout-item-price">
              {formatPrice(item.price * item.quantity)}
            </span>
          </article>
        ))}
      </div>

      <form className="checkout-discount-form" onSubmit={applyDiscount}>
        <input
          aria-label="Discount code or gift card"
          placeholder="Discount code or gift card"
          value={discountCode}
          onChange={(event) => setDiscountCode(event.target.value)}
        />
        <button type="submit">Apply</button>
      </form>
      {discountMessage && (
        <p className={discountRate ? "checkout-discount-message success" : "checkout-discount-message"}>
          {discountMessage}
        </p>
      )}

      <div className="checkout-totals">
        <div>
          <span>
            Subtotal · {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
          </span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div>
            <span>Discount</span>
            <span>−{formatPrice(discount)}</span>
          </div>
        )}
        <div>
          <span>Shipping</span>
          <span className="checkout-muted">Enter shipping address</span>
        </div>
        <div className="checkout-grand-total">
          <strong>Total</strong>
          <span>
            <small>Lari</small>
            <strong>{formatPrice(total)}</strong>
          </span>
        </div>
      </div>

      <section className="checkout-recommendations">
        <h2>Complete your look</h2>
        {CHECKOUT_RECOMMENDATIONS.map((product) => (
          <article className="checkout-recommendation" key={product.id}>
            <div className="checkout-recommendation-image">
              <Image src={product.image} alt={product.name} fill sizes="56px" />
            </div>
            <div className="checkout-recommendation-info">
              <strong>{product.name}</strong>
              <span>{product.subtitle}</span>
            </div>
            <span className="checkout-recommendation-price">{formatPrice(product.price)}</span>
            <button type="button" onClick={() => addRecommendation(product)}>
              Add
            </button>
          </article>
        ))}
      </section>
    </>
  );

  const renderReviewsAndTrust = () => (
    <>
      <div className="checkout-reviews-row" aria-label="Customer reviews">
        {CHECKOUT_REVIEWS.map((review) => (
          <div className="checkout-review-card" key={review.id}>
            <p>{review.quote}</p>
            <strong>- {review.author}</strong>
            <span className="checkout-review-stars" aria-label="5 out of 5 stars">
              ★★★★★
            </span>
          </div>
        ))}
      </div>

      <div className="checkout-trust-list">
        <div className="checkout-trust-item">
          <span className="checkout-trust-icon" aria-hidden="true">🔒</span>
          <div>
            <strong>Secure payments</strong>
            <p>We use 100% secure payments to provide you with a simple and safe experience.</p>
          </div>
        </div>
        <div className="checkout-trust-item">
          <span className="checkout-trust-icon" aria-hidden="true">🏪</span>
          <div>
            <strong>60-Day Money Back Guarantee</strong>
            <p>Return your item within 60 days for a full refund</p>
          </div>
        </div>
        <div className="checkout-trust-item">
          <span className="checkout-trust-icon" aria-hidden="true">🚚</span>
          <div>
            <strong>Fast Shipping</strong>
            <p>Receive your order within 3–5 business days.</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <main className="checkout-page">
      {/* Static top banner */}
      <div className="checkout-masthead" role="banner">
        <Link href="/" className="checkout-wordmark" aria-label="BAXED home">
          <svg
            viewBox="50 15 920 195"
            className="checkout-logo-svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="checkoutBaxedPurpleGrad" x1="0%" y1="0%" x2="100%" y2="85%">
                <stop offset="0%" stopColor="#5900a8" />
                <stop offset="30%" stopColor="#8525dc" />
                <stop offset="65%" stopColor="#d982ff" />
                <stop offset="85%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#9b36ff" />
              </linearGradient>
            </defs>
            <path
              fill="url(#checkoutBaxedPurpleGrad)"
              fillRule="evenodd"
              d="M80 24 L182 24 L207 32 L222 45 L229 58 L231 66 L231 85 L225 100 L215 111 L226 120 L231 128 L235 142 L235 153 L233 164 L228 175 L217 188 L203 197 L186 202 L78 202 L72 197 L70 193 L70 33 L74 27 L80 24 Z M325 24 L351 24 L359 31 L390 104 L428 186 L429 196 L425 201 L392 201 L386 191 L373 159 L301 159 L288 190 L281 201 L250 202 L245 197 L245 189 L285 104 L315 34 L317 30 L325 24 Z M439 24 L468 24 L473 26 L516 82 L520 79 L529 65 L533 62 L560 26 L565 24 L594 24 L600 29 L600 39 L540 110 L540 113 L544 116 L580 164 L599 186 L601 196 L597 201 L561 201 L517 142 L473 200 L469 202 L438 202 L433 198 L433 187 L437 184 L451 164 L493 113 L493 110 L484 101 L480 94 L474 89 L470 82 L454 65 L440 46 L434 41 L432 31 L434 27 L439 24 Z M629 24 L760 24 L764 26 L768 32 L768 54 L766 58 L760 62 L628 62 L621 55 L621 31 L626 25 L629 24 Z M796 24 L887 25 L910 33 L932 50 L945 69 L950 82 L954 104 L954 122 L951 140 L946 154 L939 167 L924 184 L905 196 L884 202 L794 202 L789 198 L787 194 L787 174 L792 166 L877 165 L889 162 L905 150 L913 136 L916 124 L916 101 L913 90 L903 74 L901 74 L894 67 L880 62 L795 62 L791 60 L787 53 L787 33 L790 27 L796 24 Z M109 60 L108 94 L173 95 L185 92 L190 88 L193 82 L193 72 L191 68 L187 64 L180 61 L109 60 Z M338 77 L333 84 L317 123 L358 123 L338 77 Z M630 93 L754 93 L759 95 L763 100 L763 125 L756 132 L628 132 L621 125 L621 100 L625 95 L630 93 Z M109 130 L108 165 L179 165 L191 160 L196 152 L195 140 L191 135 L183 131 L109 130 Z M628 165 L761 165 L767 170 L768 173 L768 195 L761 202 L627 202 L621 196 L621 171 L628 165 Z"
            />
          </svg>
        </Link>
        <span className="checkout-masthead-divider" aria-hidden="true" />
        <div className="checkout-proof">
          <div className="checkout-proof-right">
            <div className="checkout-proof-heading">
              <div>Chosen By <span>3,000,000+</span></div>
            </div>
            <div className="checkout-proof-badges">
              <span className="checkout-badge-item">
                <svg
                  className="checkout-badge-icon"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                60-Day Money Back Guarantee
              </span>
              <span className="checkout-badge-pipe" aria-hidden="true">|</span>
              <span className="checkout-badge-item">
                <svg
                  className="checkout-badge-icon"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  <path d="M18 19v1a2 2 0 0 1-2 2h-4" />
                </svg>
                24/7 Support
              </span>
              <span className="checkout-badge-pipe" aria-hidden="true">|</span>
              <span className="checkout-badge-item">
                <svg
                  className="checkout-badge-icon"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <rect x="9" y="11" width="6" height="4.5" rx="1" />
                  <path d="M10 11V9.5a2 2 0 0 1 4 0V11" />
                </svg>
                Secure Checkout
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only collapsible order summary */}
      <details className="checkout-order-summary mobile-only">
        <summary>
          <div className="checkout-summary-bar-inner">
            <span>
              Order summary{" "}
              <svg className="checkout-summary-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </summary>
        <div className="checkout-summary-inner">
          {renderSummaryDetails()}
        </div>
      </details>

      {/* Desktop 2-column split wrapper (single column on mobile) */}
      <div className="checkout-body-split">
        <div className="checkout-left-pane">
          <div className="checkout-main">
            <div className="checkout-ready-notice">
              <span className="checkout-ready-icon" aria-hidden="true">
                ✓
              </span>
              <p>
                <strong>Order reserved</strong> for the next
              </p>
            </div>

            <section className="checkout-express" aria-label="Express checkout">
              <p>Express checkout</p>
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
            </section>

            <div className="checkout-or">
              <span>OR</span>
            </div>

            <form className="" onSubmit={handleSubmit}>
              <section className="checkout-section">
                <div className="checkout-section-heading">
                  <h1>Contact</h1>
                  <Link href="/signin">Sign in</Link>
                </div>
                <div className="checkout-input-wrap">
                  <input
                    id="contact-email"
                    name="email"
                    className="checkout-field has-icon"
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <span className="checkout-field-icon" aria-hidden="true">?</span>
                </div>
              </section>

              <section className="checkout-section">
                <h2>Delivery</h2>
                <div className="checkout-select-wrap">
                  <span className="checkout-floating-label">Country/Region</span>
                  <select id="country" name="country" className="checkout-field checkout-select" defaultValue="Georgia">
                    <option>Georgia</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                  <span className="checkout-select-arrow" aria-hidden="true">⌄</span>
                </div>

                <div className="checkout-field-row">
                  <input className="checkout-field" name="firstName" placeholder="First name" required />
                  <input className="checkout-field" name="lastName" placeholder="Last name" required />
                </div>
                <input className="checkout-field" name="address" placeholder="Address" required />
                <input
                  className="checkout-field"
                  name="apartment"
                  placeholder="Apartment, suite, etc. (optional)"
                />
                <div className="checkout-field-row">
                  <input className="checkout-field" name="postalCode" placeholder="Postal code" />
                  <input className="checkout-field" name="city" placeholder="City" required />
                </div>
                <div className="checkout-input-wrap">
                  <input className="checkout-field has-icon" name="phone" type="tel" placeholder="Phone" autoComplete="tel" required />
                  <span className="checkout-field-icon" aria-hidden="true">?</span>
                </div>
                <label className="checkout-checkbox">
                  <input type="checkbox" />
                  <span>Text me with news and offers.</span>
                </label>
              </section>

              <section className="checkout-section checkout-shipping-section">
                <h3>Shipping method</h3>
                <p>Enter your shipping address to view available shipping methods.</p>
              </section>

              <section className="checkout-section checkout-payment-section">
                <h2>Payment</h2>
                <p className="checkout-muted">All transactions are secure and encrypted.</p>
                <div className="checkout-payment-options">
                  <label
                    className={
                      paymentMethod === "card"
                        ? "checkout-payment-option selected"
                        : "checkout-payment-option"
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <span>Credit card</span>
                    <div className="checkout-card-brands" aria-hidden="true">
                      <span className="brand-pill visa">VISA</span>
                      <span className="brand-pill mc" />
                      <span className="brand-pill amex">AMEX</span>
                      <span className="brand-pill more">+5</span>
                    </div>
                  </label>
                  {paymentMethod === "card" && (
                    <div className="checkout-card-fields">
                      <div className="checkout-input-wrap">
                        <input
                          className="checkout-field has-icon"
                          placeholder="Card number"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          required={paymentMethod === "card"}
                        />
                        <span className="checkout-field-icon lock" aria-hidden="true">🔒</span>
                      </div>
                      <div className="checkout-field-row">
                        <input
                          className="checkout-field"
                          placeholder="Expiration date (MM / YY)"
                          autoComplete="cc-exp"
                          required={paymentMethod === "card"}
                        />
                        <div className="checkout-input-wrap">
                          <input
                            className="checkout-field has-icon"
                            placeholder="Security code"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            required={paymentMethod === "card"}
                          />
                          <span className="checkout-field-icon" aria-hidden="true">?</span>
                        </div>
                      </div>
                      <input
                        className="checkout-field"
                        placeholder="Name on card"
                        autoComplete="cc-name"
                        required={paymentMethod === "card"}
                      />
                      <label className="checkout-checkbox">
                        <input type="checkbox" defaultChecked />
                        <span>Use shipping address as billing address</span>
                      </label>
                    </div>
                  )}
                  <label
                    className={
                      paymentMethod === "cod"
                        ? "checkout-payment-option selected"
                        : "checkout-payment-option"
                    }
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <div className="checkout-option-stack">
                      <span>Cash on Delivery</span>
                      <small>Pay when your order arrives here</small>
                    </div>
                  </label>
                </div>
              </section>

              <div className="checkout-save-info">
                <div>
                  <strong>Save my information for a faster checkout</strong>
                  <p>
                    By paying, you agree to create a Shop account subject to Shop&apos;s{" "}
                    <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
                  </p>
                </div>
                <button type="button" className="checkout-not-now">
                  Not now
                </button>
              </div>

              {/* Mobile-only bottom summary before Pay Now */}
              <div className="checkout-bottom-summary mobile-only">
                <button
                  type="button"
                  className="checkout-add-discount-pill"
                  onClick={() => setShowBottomDiscount((prev) => !prev)}
                >
                  🏷 Add discount
                </button>

                {showBottomDiscount && (
                  <div className="checkout-inline-discount">
                    <input
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button type="button" onClick={applyDiscount}>
                      Apply
                    </button>
                  </div>
                )}

                <div className="checkout-bottom-total-row">
                  <div className="checkout-bottom-total-left">
                    <div className="checkout-mini-thumb">
                      <Image
                        src={items[0]?.image || "/ShopTop.jpeg"}
                        alt=""
                        fill
                        sizes="44px"
                      />
                    </div>
                    <div>
                      <strong>Total</strong>
                      <span>
                        {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                      </span>
                    </div>
                  </div>
                  <div className="checkout-bottom-total-right">
                    <small>Lari</small>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                </div>
              </div>

              <button type="submit" className="checkout-submit">
                {paymentMethod === "cod" ? "Place order" : "Pay now"}
              </button>

              {/* Mobile-only reviews & trust list below Pay Now */}
              <div className="mobile-only">
                {renderReviewsAndTrust()}
              </div>

              <Link href="/shipping-returns" className="checkout-policies">
                Terms and policies
              </Link>
            </form>
          </div>
        </div>

        {/* Desktop-only right sidebar */}
        <aside className="checkout-right-pane desktop-only" aria-label="Order summary">
          <div className="checkout-sidebar-inner">
            {renderSummaryDetails()}
            {renderReviewsAndTrust()}
          </div>
        </aside>
      </div>

      {notice && (
        <div className="checkout-notice" role="status">
          {notice}
        </div>
      )}
    </main>
  );
}