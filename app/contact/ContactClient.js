"use client";

import { useState } from "react";
import Link from "next/link";
import CustomerCareLayout from "../components/CustomerCareLayout";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    topic: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      orderNumber: "",
      topic: "General Inquiry",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <CustomerCareLayout
      activeKey="contact"
      pageTitle="Contact Us"
      pageSubtitle="Have a question about your order, garment sizing, or materials? Our customer care team is here to assist."
    >
      {/* 3 Contact Info Cards */}
      <div className="cc-grid-3" style={{ marginBottom: "48px" }}>
        <div className="cc-card">
          <div className="cc-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h3 className="cc-card-title">Email Customer Support</h3>
          <p className="cc-card-desc">
            Directly email our care team for order inquiries, returns, or product advice. We reply within 24 hours.
          </p>
          <a href="mailto:support@basedmenswear.com" className="cc-card-link">
            support@basedmenswear.com &rarr;
          </a>
        </div>

        <div className="cc-card">
          <div className="cc-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h3 className="cc-card-title">Operating Hours</h3>
          <p className="cc-card-desc">
            Our support desk is online Monday through Friday, with limited coverage on weekends.
          </p>
          <div style={{ fontSize: "13px", color: "var(--text)", lineHeight: "1.6" }}>
            <div><strong>Mon &ndash; Fri:</strong> 9:00 AM &ndash; 6:00 PM EST</div>
            <div><strong>Saturday:</strong> 10:00 AM &ndash; 4:00 PM EST</div>
            <div style={{ color: "var(--muted)" }}><strong>Sunday:</strong> Closed</div>
          </div>
        </div>

        <div className="cc-card">
          <div className="cc-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
              <path d="m7.5 4.27 9 5.15" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" x2="12" y1="22" y2="12" />
            </svg>
          </div>
          <h3 className="cc-card-title">Returns &amp; Guarantee</h3>
          <p className="cc-card-desc">
            Looking to initiate a return or exchange under our 30-Day Guarantee? Check our guidelines.
          </p>
          <Link href="/shipping-returns" className="cc-card-link">
            Shipping &amp; Returns Policy &rarr;
          </Link>
        </div>
      </div>

      {/* Contact Form Section */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="cc-form-wrapper">
          <div className="cc-section-header">
            <h2 className="cc-section-title">Send a Direct Message</h2>
            <p className="cc-section-desc">
              Fill out the form below and a representative will respond to your registered email address.
            </p>
          </div>

          {isSubmitted ? (
            <div className="cc-form-success">
              <div style={{ width: 44, height: 44, margin: "0 auto 16px", borderRadius: "50%", background: "var(--gold1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>Message Received</h3>
              <p>
                Thank you for contacting BASED Customer Care. We have received your inquiry regarding <strong>{formData.topic}</strong> and will get back to you at <strong>{formData.email}</strong> within 24 hours.
              </p>
              <button
                type="button"
                className="cc-submit-btn"
                onClick={handleReset}
                style={{ marginTop: "12px" }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="cc-form" onSubmit={handleSubmit}>
              <div className="cc-form-row">
                <div className="cc-form-group">
                  <label className="cc-label" htmlFor="name">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    className="cc-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="cc-form-group">
                  <label className="cc-label" htmlFor="email">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="cc-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="cc-form-row">
                <div className="cc-form-group">
                  <label className="cc-label" htmlFor="orderNumber">
                    Order Number <span style={{ color: "var(--muted)", textTransform: "none", fontSize: "10px" }}>(Optional)</span>
                  </label>
                  <input
                    id="orderNumber"
                    type="text"
                    placeholder="e.g. #BSD-84920"
                    className="cc-input"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  />
                </div>
                <div className="cc-form-group">
                  <label className="cc-label" htmlFor="topic">
                    Topic / Subject <span className="req">*</span>
                  </label>
                  <select
                    id="topic"
                    className="cc-select"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Tracking & Status">Order Tracking &amp; Status</option>
                    <option value="Returns & Exchanges">Returns &amp; Exchanges (30-Day Guarantee)</option>
                    <option value="Sizing & Fit Advice">Sizing &amp; Fit Advice</option>
                    <option value="Product & Fabric Questions">Product &amp; Fabric Questions</option>
                    <option value="Wholesale & Press">Wholesale &amp; Press</option>
                  </select>
                </div>
              </div>

              <div className="cc-form-group">
                <label className="cc-label" htmlFor="message">
                  How can we help? <span className="req">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Provide any relevant details, measurements, or questions..."
                  className="cc-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="cc-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>

        {/* Quick Reference links */}
        <div className="cc-callout">
          <h4>Looking for instant answers?</h4>
          <p>
            Check out our <Link href="/faq" style={{ color: "var(--text)", textDecoration: "underline" }}>Frequently Asked Questions</Link> or review our <Link href="/size-guide" style={{ color: "var(--text)", textDecoration: "underline" }}>Size Guide</Link> for detailed garment measurements and fit advice.
          </p>
        </div>
      </div>
    </CustomerCareLayout>
  );
}
