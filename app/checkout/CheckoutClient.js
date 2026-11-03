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
  return `${Number(value || 0).toFixed(2).replace(".", ",")} $`;
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

  const handleExpressCheckout = () => {
    showNotice("Express checkout is not configured yet. Use the payment form below.", 3200);
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
            <small>USD</small>
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
          BAXED
        </Link>
        <div className="checkout-proof">
          <div className="checkout-proof-top">
            <div className="checkout-avatars" aria-hidden="true">
              <span className="checkout-avatar a1" />
              <span className="checkout-avatar a2" />
              <span className="checkout-avatar a3" />
            </div>
            <strong>
              Chosen By <span>3,000,000+</span>
            </strong>
          </div>
          <div className="checkout-proof-details">
            <span className="checkout-stars" aria-label="5 out of 5 stars">
              ★★★★★
            </span>
            <span>✓ 60-Day Money Back Guarantee</span>
            <span>🎧 24/7 Support</span>
            <span>🛡 Secure Checkout</span>
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
                <button type="button" className="checkout-express-shop" onClick={handleExpressCheckout}>
                  shop
                </button>
                <button type="button" className="checkout-express-paypal" onClick={handleExpressCheckout}>
                  PayPal
                </button>
                <button type="button" className="checkout-express-google" onClick={handleExpressCheckout}>
                  <span className="g-icon" aria-hidden="true">G</span> Pay
                </button>
              </div>
            </section>

            <div className="checkout-or">
              <span>OR</span>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
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
                    <small>USD</small>
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