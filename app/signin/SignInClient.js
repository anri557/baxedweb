"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LOGO_PATH =
  "M80 24 L182 24 L207 32 L222 45 L229 58 L231 66 L231 85 L225 100 L215 111 L226 120 L231 128 L235 142 L235 153 L233 164 L228 175 L217 188 L203 197 L186 202 L78 202 L72 197 L70 193 L70 33 L74 27 L80 24 Z M325 24 L351 24 L359 31 L390 104 L428 186 L429 196 L425 201 L392 201 L386 191 L373 159 L301 159 L288 190 L281 201 L250 202 L245 197 L245 189 L285 104 L315 34 L317 30 L325 24 Z M439 24 L468 24 L473 26 L516 82 L520 79 L529 65 L533 62 L560 26 L565 24 L594 24 L600 29 L600 39 L540 110 L540 113 L544 116 L580 164 L599 186 L601 196 L597 201 L561 201 L517 142 L473 200 L469 202 L438 202 L433 198 L433 187 L437 184 L451 164 L493 113 L493 110 L484 101 L480 94 L474 89 L470 82 L454 65 L440 46 L434 41 L432 31 L434 27 L439 24 Z M629 24 L760 24 L764 26 L768 32 L768 54 L766 58 L760 62 L628 62 L621 55 L621 31 L626 25 L629 24 Z M796 24 L887 25 L910 33 L932 50 L945 69 L950 82 L954 104 L954 122 L951 140 L946 154 L939 167 L924 184 L905 196 L884 202 L794 202 L789 198 L787 194 L787 174 L792 166 L877 165 L889 162 L905 150 L913 136 L916 124 L916 101 L913 90 L903 74 L901 74 L894 67 L880 62 L795 62 L791 60 L787 53 L787 33 L790 27 L796 24 Z M109 60 L108 94 L173 95 L185 92 L190 88 L193 82 L193 72 L191 68 L187 64 L180 61 L109 60 Z M338 77 L333 84 L317 123 L358 123 L338 77 Z M630 93 L754 93 L759 95 L763 100 L763 125 L756 132 L628 132 L621 125 L621 100 L625 95 L630 93 Z M109 130 L108 165 L179 165 L191 160 L196 152 L195 140 L191 135 L183 131 L109 130 Z M628 165 L761 165 L767 170 L768 173 L768 195 L761 202 L627 202 L621 196 L621 171 L628 165 Z";

export default function SignInClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastUsedEmail, setLastUsedEmail] = useState("");
  const [step, setStep] = useState("email"); // 'email' | 'password' | 'authenticated'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Check for previously saved email on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("baxed_user_email");
      if (saved) {
        setLastUsedEmail(saved);
      }
    } catch {
      // localStorage unavailable or restricted
    }
  }, []);

  const handleUseLastUsed = () => {
    if (lastUsedEmail) {
      setEmail(lastUsedEmail);
      setError("");
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      localStorage.setItem("baxed_user_email", trimmed);
      setLastUsedEmail(trimmed);
    } catch {
      // Ignore storage errors
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("password");
    }, 450);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!password || password.length < 4) {
      setError("Please enter your account password (at least 4 characters).");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("authenticated");
      setSuccessMsg("Welcome back! Signed in successfully.");
      setTimeout(() => {
        router.push("/cart");
      }, 1400);
    }, 700);
  };

  const handleShopContinue = () => {
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      setStep("authenticated");
      setSuccessMsg("Connected with Shop Pay! Redirecting...");
      setTimeout(() => {
        router.push("/cart");
      }, 1200);
    }, 800);
  };

  return (
    <div className="signin-page-wrapper">
      {/* Top Header */}
      <header className="signin-header">
        <Link href="/" className="signin-logo" aria-label="BAXED Home">
          <svg viewBox="65 20 895 185" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d={LOGO_PATH} />
          </svg>
        </Link>

        {/* Trust Badges */}
        <div className="signin-trust-badge">
          <div className="signin-avatars" aria-hidden="true">
            <div className="signin-avatar">MK</div>
            <div className="signin-avatar">JR</div>
            <div className="signin-avatar">AL</div>
          </div>
          <div className="signin-trust-info">
            <h2 className="signin-trust-heading">Chosen by 3,000,000+</h2>
            <div className="signin-trust-subtext">
              <span className="signin-trust-stars" aria-label="5 stars">★★★★★</span>
              <span className="signin-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>60-Day Money Back Guarantee</span>
              </span>
              <span className="signin-trust-sep" aria-hidden="true">|</span>
              <span className="signin-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                <span>24/7 Support</span>
              </span>
              <span className="signin-trust-sep" aria-hidden="true">|</span>
              <span className="signin-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Secure Checkout</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Centered Sign-in Box */}
      <main className="signin-main-container">
        <h1 className="signin-title">Sign in</h1>
        <p className="signin-subtitle">
          {step === "email" ? "Sign in or create an account" : step === "password" ? "Enter your account password" : "Signed in"}
        </p>

        {step === "authenticated" ? (
          <div className="signin-success" role="status">
            <p>{successMsg}</p>
          </div>
        ) : (
          <>
            {/* Continue with shop */}
            <button
              type="button"
              className="signin-shop-btn"
              onClick={handleShopContinue}
              disabled={isLoading}
              aria-label="Continue with shop"
            >
              {isLoading ? (
                <span className="signin-spinner" />
              ) : (
                <span>Continue with <strong>shop</strong></span>
              )}
            </button>

            {/* Divider */}
            <div className="signin-divider">
              <span>or</span>
            </div>

            {/* Email Step */}
            {step === "email" ? (
              <form onSubmit={handleEmailSubmit} className="signin-form" noValidate>
                <div className="signin-input-wrapper">
                  <div className="signin-input-box">
                    <input
                      id="signin-email-field"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      className="signin-input"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      className="signin-arrow-btn"
                      disabled={isLoading}
                      aria-label="Continue with email"
                      title="Continue"
                    >
                      {isLoading ? (
                        <span className="signin-spinner" style={{ borderTopColor: "#111", borderColor: "rgba(0,0,0,0.15)" }} />
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* "Last used" pill badge */}
                  <button
                    type="button"
                    className="signin-last-used-pill"
                    onClick={handleUseLastUsed}
                    title={lastUsedEmail ? `Use ${lastUsedEmail}` : "Autofill last used email"}
                  >
                    Last used
                  </button>
                </div>
              </form>
            ) : (
              /* Password Step */
              <form onSubmit={handlePasswordSubmit} className="signin-form">
                <div className="signin-email-pill">
                  <span>{email}</span>
                  <button
                    type="button"
                    className="signin-change-btn"
                    onClick={() => {
                      setStep("email");
                      setError("");
                    }}
                  >
                    Edit
                  </button>
                </div>

                <div className="signin-input-box">
                  <input
                    id="signin-password-field"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                    className="signin-input"
                    aria-label="Password"
                  />
                  <button
                    type="submit"
                    className="signin-arrow-btn"
                    disabled={isLoading}
                    aria-label="Submit password"
                    title="Sign in"
                  >
                    {isLoading ? (
                      <span className="signin-spinner" style={{ borderTopColor: "#111", borderColor: "rgba(0,0,0,0.15)" }} />
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            )}

            {error && (
              <p className="signin-error" role="alert">
                {error}
              </p>
            )}

            <p className="signin-terms">
              By continuing, you agree to our{" "}
              <Link href="/shipping-returns">Terms of service</Link>
            </p>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="signin-footer">
        <Link href="/shipping-returns" className="signin-privacy-link">
          Privacy policy
        </Link>
        <Link href="/" className="signin-return-link">
          ← Return to store
        </Link>
      </footer>
    </div>
  );
}
