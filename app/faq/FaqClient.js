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

  // Materials & Garment Care
  {
    category: "Materials & Garment Care",
    q: "What fabrics and materials are used in your collection?",
    a: "Our menswear is crafted from premium natural textiles: 280gsm heavyweight combed cotton for our tees, 100% fine Italian merino wool for our knitwear, and durable high-twist stretch twill for our chinos and outerwear. Everything is engineered for durability, structure, and everyday comfort."
  },
  {
    category: "Materials & Garment Care",
    q: "Are BASED garments pre-shrunk?",
    a: "Yes. All our cotton tees, shirts, and fleece undergo garment pre-washing and pre-shrinking. As long as standard cold care instructions are followed, your garments will maintain their true-to-size fit."
  },
  {
    category: "Materials & Garment Care",
    q: "How should I wash and care for my garments?",
    a: "We recommend machine washing cold inside out with similar colors, and hanging to dry or tumble drying on low heat. Avoid chlorine bleach. Use a low iron if needed."
  },
  {
    category: "Materials & Garment Care",
    q: "Where is BASED menswear engineered and produced?",
    a: "Our silhouettes and patterns are developed in-house with a modern athletic profile. We partner exclusively with certified ethical mills and textile producers who meet strict quality and environmental benchmarks."
  },

  // Returns & Exchanges
  {
    category: "Returns & Exchanges",
    q: "What is your 30-Day Fit & Satisfaction Guarantee?",
    a: "We want every piece you wear to fit perfectly. If an item does not fit or meet your expectations, you may return or exchange it within 30 days of delivery, provided it is unworn with tags attached."
  },
  {
    category: "Returns & Exchanges",
    q: "Are size exchanges free?",
    a: "Yes. Size exchanges are 100% free on all domestic orders. We provide a prepaid shipping label to make swapping for your ideal size completely seamless."
  },
  {
    category: "Returns & Exchanges",
    q: "What is the return process for refunds?",
    a: "For standard refunds to your original payment method, a flat $6.95 return shipping fee is deducted from your refund when using our prepaid return label. Alternatively, you can opt for 100% store credit with zero return fees."
  },
  {
    category: "Returns & Exchanges",
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
    q: "What if I am between sizes?",
    a: "If you prefer a relaxed, draped aesthetic, we recommend sizing up. For a sharp, fitted look, stay with your measured true size. Remember that domestic size exchanges are always free."
  }
];

const CATEGORIES = [
  "All",
  "Orders & Shipping",
  "Materials & Garment Care",
  "Returns & Exchanges",
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
      pageSubtitle="Find instant answers to common questions about our menswear collection, order fulfillment, 30-day fit guarantee, and sizing."
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
