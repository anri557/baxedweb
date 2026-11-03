"use client";

import Link from "next/link";
import CustomerCareLayout from "../components/CustomerCareLayout";

export default function ShippingReturnsClient() {
  return (
    <CustomerCareLayout
      activeKey="shipping-returns"
      pageTitle="Shipping & Returns"
      pageSubtitle="Fast fulfillment, global delivery, and our risk-free 30-day fit & quality guarantee."
    >
      {/* 4 Policy Highlights */}
      <div className="cc-grid-4" style={{ marginBottom: "52px" }}>
        <div className="cc-card">
          <div className="cc-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <h3 className="cc-card-title">Free Shipping</h3>
          <p className="cc-card-desc">
            All domestic US orders over ₾60 automatically unlock free standard shipping at checkout.
          </p>
        </div>

        <div className="cc-card">
          <div className="cc-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h3 className="cc-card-title">Same-Day Dispatch</h3>
          <p className="cc-card-desc">
            Orders submitted by 2:00 PM EST Monday through Friday are packed and dispatched same day.
          </p>
        </div>

        <div className="cc-card">
          <div className="cc-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 className="cc-card-title">30-Day Guarantee</h3>
          <p className="cc-card-desc">
            100% risk-free fit guarantee on all menswear. Free size exchanges and easy returns.
          </p>
        </div>

        <div className="cc-card">
          <div className="cc-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <polyline points="23 20 23 14 17 14" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
          </div>
          <h3 className="cc-card-title">Free Size Exchanges</h3>
          <p className="cc-card-desc">
            30-day apparel return window with zero return shipping fees on domestic size exchanges.
          </p>
        </div>
      </div>

      {/* Shipping Options & Rates Table */}
      <section style={{ marginBottom: "56px" }}>
        <div className="cc-section-header">
          <h2 className="cc-section-title">Shipping Rates &amp; Estimated Delivery</h2>
          <p className="cc-section-desc">
            We partner with premium carriers (FedEx, UPS, USPS Priority, and DHL Express) to ensure prompt and secure delivery.
          </p>
        </div>

        <div className="cc-table-wrapper">
          <table className="cc-table">
            <thead>
              <tr>
                <th>Service Level</th>
                <th>Destination</th>
                <th>Estimated Transit Time</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Standard Ground</strong></td>
                <td>Continental United States</td>
                <td>3 &ndash; 5 business days</td>
                <td><strong>FREE</strong> on orders ₾60+ (₾6.95 under ₾60)</td>
              </tr>
              <tr>
                <td><strong>Express Air</strong></td>
                <td>Continental United States</td>
                <td>1 &ndash; 2 business days</td>
                <td>₾12.00 flat rate</td>
              </tr>
              <tr>
                <td><strong>Standard International (DDP)</strong></td>
                <td>Canada &amp; Mexico</td>
                <td>5 &ndash; 8 business days</td>
                <td>₾14.00 (Duties &amp; taxes included)</td>
              </tr>
              <tr>
                <td><strong>Standard International (DDP)</strong></td>
                <td>UK &amp; European Union</td>
                <td>6 &ndash; 9 business days</td>
                <td>₾18.00 (Duties &amp; taxes included)</td>
              </tr>
              <tr>
                <td><strong>Global Express</strong></td>
                <td>Australia, Asia &amp; Rest of World</td>
                <td>7 &ndash; 12 business days</td>
                <td>₾24.00 flat rate</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="cc-callout">
          <h4>Delivered Duty Paid (DDP)</h4>
          <p>
            For all international orders shipped to Canada, the UK, and Europe, applicable customs duties and VAT are calculated directly at checkout. You will never be asked to pay additional import fees upon doorstep delivery.
          </p>
        </div>
      </section>

      {/* 30-Day Fit Guarantee Feature */}
      <section style={{ marginBottom: "56px" }}>
        <div className="cc-card" style={{ background: "linear-gradient(135deg, #141414 0%, #171120 100%)", borderColor: "rgba(113, 24, 201, 0.4)", padding: "clamp(28px, 4vw, 44px)" }}>
          <div style={{ display: "inline-block", background: "var(--gold1)", color: "#fff", fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "2px", marginBottom: "16px" }}>
            PERFECT FIT PROMISE
          </div>
          <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#ffffff", margin: "0 0 12px 0" }}>
            The 30-Day Fit &amp; Satisfaction Guarantee
          </h2>
          <p style={{ fontSize: "14.5px", color: "#c8c4bc", lineHeight: "1.7", maxWidth: "800px", margin: "0 0 20px 0" }}>
            We want every garment you purchase to fit cleanly and comfortably. If your items aren&rsquo;t quite the right size or cut, simply contact our customer care team within 30 days of delivery. We provide 100% free size exchanges and prepaid return labels.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/contact" className="cc-submit-btn" style={{ textDecoration: "none" }}>
              Request an Exchange
            </Link>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              Free size exchanges on all domestic US orders.
            </span>
          </div>
        </div>
      </section>

      {/* Apparel & Footwear Returns Policy */}
      <section style={{ marginBottom: "56px" }}>
        <div className="cc-section-header">
          <h2 className="cc-section-title">Apparel &amp; Footwear 30-Day Policy</h2>
          <p className="cc-section-desc">
            We want you to feel confident in the fit and feel of every garment. If an item isn&rsquo;t quite right, we offer simple returns and free size exchanges.
          </p>
        </div>

        <div className="cc-grid-2">
          <div className="cc-card">
            <h3 className="cc-card-title">Return Requirements</h3>
            <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--muted)", fontSize: "13.5px", lineHeight: "1.7" }}>
              <li>Items must be returned within 30 days of delivery.</li>
              <li>Garments must be unworn, unwashed, and unaltered.</li>
              <li>Original hangtags and branded packaging must remain attached.</li>
              <li>Footwear must include the original shoe box in protective outer packaging.</li>
            </ul>
          </div>

          <div className="cc-card">
            <h3 className="cc-card-title">Exchange &amp; Refund Options</h3>
            <ul style={{ margin: 0, paddingLeft: "18px", color: "var(--muted)", fontSize: "13.5px", lineHeight: "1.7" }}>
              <li><strong>Size Exchanges:</strong> 100% free of charge with prepaid shipping labels.</li>
              <li><strong>Store Credit:</strong> Receive full refund value + 10% bonus credit toward your next order.</li>
              <li><strong>Original Payment Method:</strong> Refund issued minus a ₾6.95 return shipping fee.</li>
              <li>Refund processing takes 3 to 5 business days upon warehouse arrival.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step by Step Return Process */}
      <section style={{ marginBottom: "56px" }}>
        <div className="cc-section-header">
          <h2 className="cc-section-title">How To Return or Exchange in 4 Steps</h2>
          <p className="cc-section-desc">
            Our self-service process makes returning an item straightforward and seamless.
          </p>
        </div>

        <div className="cc-steps-grid">
          <div className="cc-step-item">
            <div className="cc-step-number">01</div>
            <h4 className="cc-step-title">Submit Request</h4>
            <p className="cc-step-text">
              Visit our <Link href="/contact" style={{ color: "var(--text)", textDecoration: "underline" }}>Contact page</Link> with your order number and select Return or Exchange.
            </p>
          </div>

          <div className="cc-step-item">
            <div className="cc-step-number">02</div>
            <h4 className="cc-step-title">Print Return Label</h4>
            <p className="cc-step-text">
              You will receive an automated prepaid shipping label via email with QR code options for label-free drop-off.
            </p>
          </div>

          <div className="cc-step-item">
            <div className="cc-step-number">03</div>
            <h4 className="cc-step-title">Package &amp; Ship</h4>
            <p className="cc-step-text">
              Pack items securely in original packaging and drop the box at any designated carrier location.
            </p>
          </div>

          <div className="cc-step-item">
            <div className="cc-step-number">04</div>
            <h4 className="cc-step-title">Fast Refund</h4>
            <p className="cc-step-text">
              Once scanned at our warehouse, your exchange is dispatched or your refund is credited within 3&ndash;5 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Damaged or Incorrect Items */}
      <div className="cc-card" style={{ textAlign: "center", padding: "36px 24px" }}>
        <h3 className="cc-card-title" style={{ fontSize: "19px", marginBottom: "8px" }}>
          Received a damaged, defective, or incorrect order?
        </h3>
        <p className="cc-card-desc" style={{ maxWidth: "560px", margin: "0 auto 20px" }}>
          We inspect every parcel before dispatch, but in the rare event of transit damage, we will send an immediate priority replacement at zero cost to you.
        </p>
        <Link href="/contact" className="cc-submit-btn" style={{ textDecoration: "none", display: "inline-block" }}>
          Report an Issue &rarr;
        </Link>
      </div>
    </CustomerCareLayout>
  );
}
