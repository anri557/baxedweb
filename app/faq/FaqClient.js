"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import CustomerCareLayout from "../components/CustomerCareLayout";

const FAQ_DATA = [
  // Orders & Shipping
  {
    category: "Orders & Shipping",
    q: "How long will my order take to arrive?",
    a: "Orders placed before 2:00 PM EST on business days are dispatched same-day. Standard domestic shipping arrives within 3 to 5 business days. Express shipping delivers in 1 to 2 business days. Free standard shipping applies to all domestic orders over $60."
  },
  {
    category: "Orders & Shipping",
    q: "Do you ship internationally?",
    a: "Yes, we ship to over 40 countries worldwide, including Canada, the UK, Europe, Australia, and New Zealand. International transit generally takes 6 to 10 business days. Import duties and taxes are calculated and collected directly at checkout so there are no unexpected customs fees upon delivery."
  },
  {
    category: "Orders & Shipping",
    q: "How can I track my shipment?",
    a: "As soon as your package is scanned by our carrier, you will receive an automatic dispatch notification containing your tracking number and a direct tracking link. You can also contact support with your order number at any time to verify current status."
  },
  {
    category: "Orders & Shipping",
    q: "Can I cancel or amend my order after placing it?",
    a: "Our warehouse operates on rapid automated fulfillment. If you need to make changes to your delivery address, size selection, or cancel an order, please submit a message via our Contact Us page within 1 hour of placing the order."
  },

  // Products & Formulas
  {
    category: "Products & Formulas",
    q: "What makes BASED grooming formulas different?",
    a: "Engineered specifically for men's hair, scalp, and skin biology. Our formulas are powered by clean, concentrated botanical actives—free of sulfates, parabens, phthalates, synthetic dyes, and heavy silicones. They deliver maximum lather and cleansing performance without stripping essential natural oils."
  },
  {
    category: "Products & Formulas",
    q: "How long does a bottle of the Shower Duo last?",
    a: "With daily use, each 8.4 fl oz (250 ml) bottle lasts approximately 6 to 8 weeks. Because our formulas are highly concentrated, a nickel-sized amount provides a rich lather."
  },
  {
    category: "Products & Formulas",
    q: "Are BASED grooming products cruelty-free?",
    a: "Yes, 100%. We never test our formulas or ingredients on animals, and we strictly partner with certified cruelty-free suppliers."
  },
  {
    category: "Products & Formulas",
    q: "What fabrics are used in your apparel collection?",
    a: "Our menswear is crafted from premium natural textiles: 280gsm heavyweight combed cotton for our tees, 100% fine Italian merino wool for our knitwear, and durable high-twist twill for our chinos and outerwear. Everything is pre-shrunk for consistent fit wash after wash."
  },
  {
    category: "Products & Formulas",
    q: "How should I wash and care for my garments?",
    a: "We recommend washing cold with like colors inside out, and hanging to dry or tumble drying on low heat. Avoid chlorine bleach. Iron on low heat if needed."
  },

  // Returns & Guarantee
  {
    category: "Returns & Guarantee",
    q: "What is your 60-Day Satisfaction Guarantee?",
    a: "We believe in our products completely. If you do not love how your hair, scalp, or body feels after using our grooming essentials within 60 days, email our customer care team and we will issue a full refund—no return shipping required for first-time bottles."
  },
  {
    category: "Returns & Guarantee",
    q: "What is the return window for apparel and footwear?",
    a: "Garments and footwear may be returned or exchanged within 30 days of delivery. Items must be in their original unworn condition with tags attached and packaging preserved."
  },
  {
    category: "Returns & Guarantee",
    q: "Are return shipments free?",
    a: "Size exchanges are 100% free on all domestic orders. For standard refunds on apparel, a flat $6.95 return shipping fee is deducted from your refund amount when using our prepaid shipping label."
  },
  {
    category: "Returns & Guarantee",
    q: "How quickly are refunds processed?",
    a: "Once your returned package is received and checked in at our fulfillment facility, refunds are issued to your original payment method within 3 to 5 business days."
  },

  // Sizing & Fit
  {
    category: "Sizing & Fit",
    q: "How do BASED garments fit?",
    a: "Our apparel is engineered with an athletic, tailored cut true to standard US sizing. It offers clean lines through the shoulders and torso without feeling restrictive. Please consult our detailed Size Guide for chest, shoulder, sleeve, and waist measurements."
  },
  {
    category: "Sizing & Fit",
    q: "What if an item does not fit the way I expected?",
    a: "We provide seamless, hassle-free size exchanges. Simply get in touch with our customer care team or visit our Shipping & Returns section to request an exchange for another size."
  }
];

const CATEGORIES = [
  "All",
  "Orders & Shipping",
  "Products & Formulas",
  "Returns & Guarantee",
  "Sizing & Fit"
];

export default function FaqClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndices, setOpenIndices] = useState([0, 9]); // default first and guarantee open

  const toggleAccordion = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <CustomerCareLayout
      activeKey="faq"
      pageTitle="Frequently Asked Questions"
      pageSubtitle="Find instant answers to common questions about our products, order fulfillment, 60-day satisfaction guarantee, and sizing."
    >
      {/* Search & Category Filter Toolbar */}
      <div className="cc-toolbar">
        <div className="cc-pill-group">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cc-pill-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", minWidth: "240px", flex: "1 0 auto", maxWidth: "340px" }}>
          <input
            type="text"
            placeholder="Search questions or keywords..."
            className="cc-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "36px", fontSize: "13px" }}
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 16,
              height: 16,
              color: "var(--muted)"
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {filteredFaqs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: "var(--muted)", fontSize: "16px", marginBottom: "16px" }}>
              No questions found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              className="cc-pill-btn active"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear Search Filters
            </button>
          </div>
        ) : (
          <div className="pdp-faq-list">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div className="pdp-faq-item" key={faq.q}>
                  <button
                    type="button"
                    className="pdp-faq-trigger"
                    aria-expanded={isOpen}
                    onClick={() => toggleAccordion(idx)}
                  >
                    <span>{faq.q}</span>
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
                  {isOpen && (
                    <div className="pdp-faq-body">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Assistance CTA Card */}
        <div className="cc-card" style={{ marginTop: "56px", textAlign: "center", padding: "40px 24px" }}>
          <h3 className="cc-card-title" style={{ fontSize: "20px", marginBottom: "10px" }}>
            Still have questions?
          </h3>
          <p className="cc-card-desc" style={{ maxWidth: "520px", margin: "0 auto 24px" }}>
            Can&rsquo;t find the information you need? Our customer care specialists are ready to help with orders, product guidance, or sizing.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="cc-submit-btn" style={{ textDecoration: "none" }}>
              Contact Customer Care
            </Link>
            <Link href="/size-guide" className="cc-pill-btn" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              Explore Size Guide
            </Link>
          </div>
        </div>
      </div>
    </CustomerCareLayout>
  );
}
