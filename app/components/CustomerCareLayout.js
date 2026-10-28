"use client";

import { useState } from "react";
import Link from "next/link";

const LOGO_PATH =
  "M80 24 L182 24 L207 32 L222 45 L229 58 L231 66 L231 85 L225 100 L215 111 L226 120 L231 128 L235 142 L235 153 L233 164 L228 175 L217 188 L203 197 L186 202 L78 202 L72 197 L70 193 L70 33 L74 27 L80 24 Z M325 24 L351 24 L359 31 L390 104 L428 186 L429 196 L425 201 L392 201 L386 191 L373 159 L301 159 L288 190 L281 201 L250 202 L245 197 L245 189 L285 104 L315 34 L317 30 L325 24 Z M439 24 L468 24 L473 26 L516 82 L520 79 L529 65 L533 62 L560 26 L565 24 L594 24 L600 29 L600 39 L540 110 L540 113 L544 116 L580 164 L599 186 L601 196 L597 201 L561 201 L517 142 L473 200 L469 202 L438 202 L433 198 L433 187 L437 184 L451 164 L493 113 L493 110 L484 101 L480 94 L474 89 L470 82 L454 65 L440 46 L434 41 L432 31 L434 27 L439 24 Z M629 24 L760 24 L764 26 L768 32 L768 54 L766 58 L760 62 L628 62 L621 55 L621 31 L626 25 L629 24 Z M796 24 L887 25 L910 33 L932 50 L945 69 L950 82 L954 104 L954 122 L951 140 L946 154 L939 167 L924 184 L905 196 L884 202 L794 202 L789 198 L787 194 L787 174 L792 166 L877 165 L889 162 L905 150 L913 136 L916 124 L916 101 L913 90 L903 74 L901 74 L894 67 L880 62 L795 62 L791 60 L787 53 L787 33 L790 27 L796 24 Z M109 60 L108 94 L173 95 L185 92 L190 88 L193 82 L193 72 L191 68 L187 64 L180 61 L109 60 Z M338 77 L333 84 L317 123 L358 123 L338 77 Z M630 93 L754 93 L759 95 L763 100 L763 125 L756 132 L628 132 L621 125 L621 100 L625 95 L630 93 Z M109 130 L108 165 L179 165 L191 160 L196 152 L195 140 L191 135 L183 131 L109 130 Z M628 165 L761 165 L767 170 L768 173 L768 195 L761 202 L627 202 L621 196 L621 171 L628 165 Z";

const CUSTOMER_CARE_LINKS = [
  { label: "Contact Us", href: "/contact", key: "contact" },
  { label: "FAQs", href: "/faq", key: "faq" },
  { label: "Size Guide", href: "/size-guide", key: "size-guide" },
  { label: "Shipping & Returns", href: "/shipping-returns", key: "shipping-returns" },
];

export default function CustomerCareLayout({
  children,
  activeKey,
  pageTitle,
  pageSubtitle,
}) {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setIsToastActive(true);
    setTimeout(() => {
      setIsToastActive(false);
    }, 2800);
  };

  return (
    <div className="site-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Announcement Bar */}
      <div className="promo">BUILD YOUR OWN SET · SAVE UP TO 20% + 3 FREE GIFTS</div>

      {/* Primary Header */}
      <header className="header" role="banner">
        <button
          className="menu-toggle"
          id="menuToggle"
          aria-label="Open navigation menu"
          aria-expanded={isNavDrawerOpen}
          type="button"
          onClick={() => {
            if (!isNavDrawerOpen && isCartDrawerOpen) setIsCartDrawerOpen(false);
            setIsNavDrawerOpen(!isNavDrawerOpen);
          }}
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
            <Link href="/products/shower-duo" className="nav-link">
              Hair
            </Link>
            <Link href="/products/shower-duo" className="nav-link">
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
            id="accountBtn"
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
            <span className="cart-badge">0</span>
          </button>
        </div>
      </header>

      {/* Slide-out Navigation Drawer (Mobile) */}
      <div
        className={`nav-drawer-backdrop ${isNavDrawerOpen ? "open" : ""}`}
        onClick={() => setIsNavDrawerOpen(false)}
      ></div>
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
              <span className="drawer-cart-count">0</span>
            </button>
          </div>
        </div>
        <nav className="nav-drawer-links">
          <div className="drawer-links-group" style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <Link href="/" onClick={() => setIsNavDrawerOpen(false)} style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Shop All
            </Link>
            <Link href="/products/shower-duo" onClick={() => setIsNavDrawerOpen(false)} style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Shower Duo
            </Link>
            <Link href="/#sets" onClick={() => setIsNavDrawerOpen(false)} style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Build A Set
            </Link>
          </div>

          <div style={{ height: 1, background: "var(--line)", margin: "8px 24px" }} />

          <div style={{ padding: "16px 24px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>
              Customer Care
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {CUSTOMER_CARE_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsNavDrawerOpen(false)}
                  style={{
                    fontSize: "13px",
                    color: activeKey === link.key ? "var(--text)" : "var(--muted)",
                    fontWeight: activeKey === link.key ? 600 : 400,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
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
          <h2 className="cart-drawer-title">Your cart is empty</h2>
          <button
            className="cart-drawer-close"
            type="button"
            aria-label="Close cart"
            onClick={() => setIsCartDrawerOpen(false)}
          ></button>
        </div>
        <div className="cart-drawer-content">
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
        </div>
      </aside>

      {/* Sub-header Breadcrumb & Navigation */}
      <div className="cc-subnav-bar">
        <div className="cc-subnav-inner">
          <div className="cc-breadcrumbs">
            <Link href="/" className="cc-breadcrumb-link">Home</Link>
            <span className="cc-breadcrumb-separator">/</span>
            <span className="cc-breadcrumb-current">Customer Care</span>
            {pageTitle && (
              <>
                <span className="cc-breadcrumb-separator">/</span>
                <span className="cc-breadcrumb-active">{pageTitle}</span>
              </>
            )}
          </div>

          {/* Quick Tab Switcher */}
          <nav className="cc-tab-list" aria-label="Customer care pages">
            {CUSTOMER_CARE_LINKS.map((tab) => {
              const isActive = activeKey === tab.key;
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className={`cc-tab-item ${isActive ? "active" : ""}`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Page Content */}
      <main className="cc-main-wrapper" style={{ flex: "1 0 auto" }}>
        {/* Header Hero Area */}
        <section className="cc-hero-section">
          <div className="cc-hero-container">
            <span className="cc-hero-badge">BASED CUSTOMER CARE</span>
            <h1 className="cc-hero-title">{pageTitle}</h1>
            {pageSubtitle && <p className="cc-hero-subtitle">{pageSubtitle}</p>}
          </div>
        </section>

        {/* Child Content */}
        <div className="cc-content-container">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer id="footer">
        <div className="footer-watermark" aria-hidden="true">
          BAXED
        </div>
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="footer-brand-name" href="/" aria-label="BAXED home">
              <svg viewBox="65 20 895 185" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d={LOGO_PATH} />
              </svg>
            </Link>
            <p className="footer-mission">
              Essential grooming engineered for men. Peak performance with natural ingredients.
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
                <Link href="/contact" style={{ color: activeKey === "contact" ? "var(--text)" : undefined }}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" style={{ color: activeKey === "faq" ? "var(--text)" : undefined }}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/size-guide" style={{ color: activeKey === "size-guide" ? "var(--text)" : undefined }}>
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" style={{ color: activeKey === "shipping-returns" ? "var(--text)" : undefined }}>
                  Shipping &amp; Returns
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="footer-column" aria-label="Quick links">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link href="/">Shop All</Link>
              </li>
              <li>
                <Link href="/products/shower-duo">Shower Duo</Link>
              </li>
              <li>
                <Link href="/#sets">Build A Set</Link>
              </li>
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
