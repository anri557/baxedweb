"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CHECKOUT_RECOMMENDATIONS = [
  { id: "texture-powder", name: "Texture Powder", subtitle: "Texture Essentials", price: 36, originalPrice: 40, image: "/shower-duo-2.jpg" },
  { id: "hair-elixir", name: "Hair Elixir", subtitle: "Haircare Set", price: 64.8, originalPrice: 81, image: "/shower-duo-3.jpg" },
  { id: "shampoo", name: "Shampoo", subtitle: "Shampoo + Conditioner", price: 50.4, originalPrice: 56, image: "/shower-duo-4.jpg" },
];

const INITIAL_CART = [
  { id: "style-hydration-duo", name: "Style & Hydration Duo", subtitle: "Style & Hydration Duo", price: 42.3, quantity: 1 },
];

function formatPrice(value) {
  return `${Number(value || 0).toFixed(2).replace(".", ",")} $`;
}

export default function CheckoutClient() {
  const [items, setItems] = useState(INITIAL_CART);
  const [discountCode, setDiscountCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    let updateTimer;
    try {
      const stored = JSON.parse(localStorage.getItem("baxed_cart") || "null");
      if (Array.isArray(stored) && stored.length) {
        const storedItems = stored.map((item, index) => ({
          id: item.id || `checkout-item-${index}`,
          name: item.name || item.title || "BAXED Item",
          subtitle: item.subtitle || item.description || "Just one",
          price: Number(item.price) || 0,
          quantity: Number(item.quantity || item.qty) || 1,
        }));
        updateTimer = window.setTimeout(() => setItems(storedItems), 0);
      }
    } catch {
      // Keep the example order if stored cart data cannot be read.
    }

    return () => window.clearTimeout(updateTimer);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const discount = subtotal * discountRate;
  const total = Math.max(0, subtotal - discount);

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
      ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { ...product, subtitle: product.subtitle, quantity: 1 }];
    setItems(next);
    try {
      localStorage.setItem("baxed_cart", JSON.stringify(next));
    } catch {
      // Keep the checkout view usable if storage is unavailable.
    }
    setNotice(`${product.name} added to your order`);
    window.setTimeout(() => setNotice(""), 2400);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice("Checkout details saved. Payment processing is not configured yet.");
    window.setTimeout(() => setNotice(""), 3200);
  };

  return (
    <main className="checkout-page">
      <div className="checkout-header">
        <Link href="/" className="checkout-wordmark" aria-label="BAXED home">BAXED</Link>
        <nav className="checkout-breadcrumbs" aria-label="Checkout steps">
          <Link href="/cart">Cart</Link><span>›</span><strong>Information</strong><span>›</span><span>Shipping</span><span>›</span><span>Payment</span>
        </nav>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-section">
            <div className="checkout-section-heading"><h1>Contact</h1><Link href="/signin">Sign in</Link></div>
            <label className="checkout-field-label" htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" className="checkout-field" type="email" placeholder="Email" required />
          </section>

          <section className="checkout-section">
            <h2>Delivery</h2>
            <label className="checkout-field-label" htmlFor="country">Country/Region</label>
            <select id="country" className="checkout-field" defaultValue="Georgia">
              <option>Georgia</option><option>United States</option><option>United Kingdom</option>
            </select>
            <div className="checkout-field-row">
              <input className="checkout-field" name="firstName" placeholder="First name" required />
              <input className="checkout-field" name="lastName" placeholder="Last name" required />
            </div>
            <input className="checkout-field" name="address" placeholder="Address" required />
            <input className="checkout-field" name="apartment" placeholder="Apartment, suite, etc. (optional)" />
            <div className="checkout-field-row">
              <input className="checkout-field" name="postalCode" placeholder="Postal code" />
              <input className="checkout-field" name="city" placeholder="City" required />
            </div>
            <input className="checkout-field" name="phone" type="tel" placeholder="Phone" />
            <label className="checkout-checkbox"><input type="checkbox" /> Text me with news and offers.</label>
          </section>

          <section className="checkout-section checkout-shipping-section">
            <h2>Shipping method</h2>
            <p>Enter your shipping address to view available shipping methods.</p>
          </section>

          <section className="checkout-section checkout-payment-section">
            <h2>Payment</h2>
            <p className="checkout-muted">All transactions are secure and encrypted.</p>
            <div className="checkout-payment-options">
              <label className={paymentMethod === "card" ? "checkout-payment-option selected" : "checkout-payment-option"}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                <span>Credit card</span><span className="checkout-card-brands">VISA　●●　AMEX</span>
              </label>
              <div className="checkout-card-fields">
                <input className="checkout-field" placeholder="Card number" inputMode="numeric" autoComplete="cc-number" />
                <div className="checkout-field-row">
                  <input className="checkout-field" placeholder="Expiration date (MM / YY)" autoComplete="cc-exp" />
                  <input className="checkout-field" placeholder="Security code" inputMode="numeric" autoComplete="cc-csc" />
                </div>
                <input className="checkout-field" placeholder="Name on card" autoComplete="cc-name" />
                <label className="checkout-checkbox"><input type="checkbox" defaultChecked /> Use shipping address as billing address</label>
              </div>
              <label className="checkout-payment-option">
                <input type="radio" name="payment" value="shop" checked={paymentMethod === "shop"} onChange={() => setPaymentMethod("shop")} />
                <span>Shop Pay</span><span className="checkout-payment-brand">shop</span>
              </label>
              <label className="checkout-payment-option">
                <input type="radio" name="payment" value="paypal" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} />
                <span>PayPal</span><span className="checkout-payment-brand paypal">PayPal</span>
              </label>
            </div>
          </section>

          <button type="submit" className="checkout-submit">Pay now · {formatPrice(total)}</button>
          <Link href="/shipping-returns" className="checkout-policies">Terms and policies</Link>
        </form>

        <aside className="checkout-summary" aria-label="Order summary">
          <div className="checkout-summary-inner">
            <div className="checkout-shipping-progress">
              <div className="checkout-progress-track"><span /></div>
              <p>You&apos;re <strong>40,00 US$</strong> away from free shipping!</p>
            </div>

            <div className="checkout-item-list">
              {items.map((item, index) => (
                <article className="checkout-item" key={`${item.id}-${index}`}>
                  <div className="checkout-item-image">
                    <Image src="/shower-duo-2.jpg" alt="" fill sizes="64px" />
                    <span className="checkout-item-quantity">{item.quantity}</span>
                  </div>
                  <div className="checkout-item-copy"><strong>{item.name}</strong><span>{item.subtitle}</span></div>
                  <span className="checkout-item-price">{formatPrice(item.price * item.quantity)}</span>
                </article>
              ))}
            </div>

            <form className="checkout-discount-form" onSubmit={applyDiscount}>
              <input aria-label="Discount code or gift card" placeholder="Discount code or gift card" value={discountCode} onChange={(event) => setDiscountCode(event.target.value)} />
              <button type="submit">Apply</button>
            </form>
            {discountMessage && <p className={discountRate ? "checkout-discount-message success" : "checkout-discount-message"}>{discountMessage}</p>}

            <div className="checkout-totals">
              <div><span>Subtotal · {totalQuantity} {totalQuantity === 1 ? "item" : "items"}</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
              <div><span>Shipping</span><span className="checkout-muted">Enter shipping address</span></div>
              <div className="checkout-grand-total"><strong>Total</strong><span><small>USD</small><strong>{formatPrice(total)}</strong></span></div>
            </div>

            <section className="checkout-recommendations">
              <h2>Complete Your Routine</h2>
              {CHECKOUT_RECOMMENDATIONS.map((product) => (
                <article className="checkout-recommendation" key={product.id}>
                  <div className="checkout-recommendation-image"><Image src={product.image} alt="" fill sizes="80px" /></div>
                  <div className="checkout-recommendation-info">
                    <strong>{product.name}</strong>
                    <span>{product.subtitle}</span>
                  </div>
                  <div className="checkout-recommendation-prices"><span>{formatPrice(product.price)}</span><del>{formatPrice(product.originalPrice)}</del></div>
                  <button type="button" onClick={() => addRecommendation(product)}>Add</button>
                </article>
              ))}
            </section>

            <div className="checkout-trust-list">
              <p><span>♧</span><strong>Secure payments</strong><small>Safe and encrypted checkout.</small></p>
              <p><span>◇</span><strong>60-Day Money Back Guarantee</strong><small>Return your item within 60 days for a full refund.</small></p>
              <p><span>↗</span><strong>Fast Shipping</strong><small>Receive your order within 3–5 business days.</small></p>
            </div>
          </div>
        </aside>
      </div>
      {notice && <div className="checkout-notice" role="status">{notice}</div>}
    </main>
  );
}
