"use client";

import Link from "next/link";

const LOGO_PATH =
  "M80 24 L182 24 L207 32 L222 45 L229 58 L231 66 L231 85 L225 100 L215 111 L226 120 L231 128 L235 142 L235 153 L233 164 L228 175 L217 188 L203 197 L186 202 L78 202 L72 197 L70 193 L70 33 L74 27 L80 24 Z M325 24 L351 24 L359 31 L390 104 L428 186 L429 196 L425 201 L392 201 L386 191 L373 159 L301 159 L288 190 L281 201 L250 202 L245 197 L245 189 L285 104 L315 34 L317 30 L325 24 Z M439 24 L468 24 L473 26 L516 82 L520 79 L529 65 L533 62 L560 26 L565 24 L594 24 L600 29 L600 39 L540 110 L540 113 L544 116 L580 164 L599 186 L601 196 L597 201 L561 201 L517 142 L473 200 L469 202 L438 202 L433 198 L433 187 L437 184 L451 164 L493 113 L493 110 L484 101 L480 94 L474 89 L470 82 L454 65 L440 46 L434 41 L432 31 L434 27 L439 24 Z M629 24 L760 24 L764 26 L768 32 L768 54 L766 58 L760 62 L628 62 L621 55 L621 31 L626 25 L629 24 Z M796 24 L887 25 L910 33 L932 50 L945 69 L950 82 L954 104 L954 122 L951 140 L946 154 L939 167 L924 184 L905 196 L884 202 L794 202 L789 198 L787 194 L787 174 L792 166 L877 165 L889 162 L905 150 L913 136 L916 124 L916 101 L913 90 L903 74 L901 74 L894 67 L880 62 L795 62 L791 60 L787 53 L787 33 L790 27 L796 24 Z M109 60 L108 94 L173 95 L185 92 L190 88 L193 82 L193 72 L191 68 L187 64 L180 61 L109 60 Z M338 77 L333 84 L317 123 L358 123 L338 77 Z M630 93 L754 93 L759 95 L763 100 L763 125 L756 132 L628 132 L621 125 L621 100 L625 95 L630 93 Z M109 130 L108 165 L179 165 L191 160 L196 152 L195 140 L191 135 L183 131 L109 130 Z M628 165 L761 165 L767 170 L768 173 L768 195 L761 202 L627 202 L621 196 L621 171 L628 165 Z";

const DEFAULT_ITEMS = [
  { label: "Shop", href: "/" },
  { label: "Tops", href: "/tops" },
  { label: "Bottoms", href: "/bottoms" },
  { label: "Outerwear", href: "/outerwear" },
  { label: "Sets", href: "/build-your-set" },
];

export default function Navbar({
  navItems = DEFAULT_ITEMS,
  onItemSelect,
  onCartClick,
  onAccountClick,
  isNavDrawerOpen = false,
  onMenuToggle,
  cartCount = 0,
  variant = "",
  isBuildActive = false,
  promoText = "BUILD YOUR OWN SET · SAVE UP TO 20% + 3 FREE GIFTS",
}) {
  return (
    <>
      <div className="promo">{promoText}</div>
      <header className={`header ${variant}`.trim()} role="banner">
        <button
          className="menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isNavDrawerOpen}
          aria-controls="navDrawer"
          onClick={onMenuToggle}
        >
          <span className="bar" />
          <span className="bar" />
        </button>

        <div className="nav-left">
          <Link className="logo" href="/" aria-label="BAXED">
            <svg viewBox="65 20 895 185" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d={LOGO_PATH} />
            </svg>
          </Link>
          <nav className="desktop-nav" aria-label="Desktop Navigation">
            {navItems.map((item) => (
              item.onSelect ? (
                <button
                  key={item.label}
                  type="button"
                  className={`nav-link ${item.active ? "active" : ""}`}
                  onClick={() => onItemSelect?.(item.onSelect)}
                >
                  {item.label}
                </button>
              ) : (
                <Link key={item.label} href={item.href} className={`nav-link ${item.active ? "active" : ""}`}>
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        </div>

        <div className="nav-actions">
          <Link className={`nav-pill-btn ${isBuildActive ? "active-pill" : ""}`} href="/build-your-set">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pill-icon"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
            </svg>
            <span>BUILD YOUR OWN SET</span>
          </Link>
          <button type="button" className="nav-icon-btn" aria-label="Account" onClick={onAccountClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button type="button" className="nav-icon-btn cart-btn" aria-label="Cart" onClick={onCartClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </header>
    </>
  );
}
