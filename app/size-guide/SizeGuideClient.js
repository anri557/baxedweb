"use client";

import { useState } from "react";
import Link from "next/link";
import CustomerCareLayout from "../components/CustomerCareLayout";

const TOPS_DATA = [
  { size: "XS", chestIn: "34 - 36", chestCm: "86 - 91", shoulderIn: "16.5", shoulderCm: "42", sleeveIn: "32.5", sleeveCm: "82.5", lengthIn: "27.0", lengthCm: "68.5" },
  { size: "S", chestIn: "36 - 38", chestCm: "91 - 96", shoulderIn: "17.2", shoulderCm: "43.7", sleeveIn: "33.5", sleeveCm: "85.0", lengthIn: "27.5", lengthCm: "70.0" },
  { size: "M", chestIn: "38 - 40", chestCm: "96 - 101", shoulderIn: "18.0", shoulderCm: "45.7", sleeveIn: "34.5", sleeveCm: "87.5", lengthIn: "28.5", lengthCm: "72.5" },
  { size: "L", chestIn: "41 - 43", chestCm: "104 - 109", shoulderIn: "18.8", shoulderCm: "47.8", sleeveIn: "35.5", sleeveCm: "90.0", lengthIn: "29.5", lengthCm: "75.0" },
  { size: "XL", chestIn: "44 - 46", chestCm: "112 - 117", shoulderIn: "19.6", shoulderCm: "49.8", sleeveIn: "36.5", sleeveCm: "92.5", lengthIn: "30.5", lengthCm: "77.5" },
  { size: "XXL", chestIn: "47 - 49", chestCm: "119 - 124", shoulderIn: "20.4", shoulderCm: "51.8", sleeveIn: "37.5", sleeveCm: "95.0", lengthIn: "31.5", lengthCm: "80.0" }
];

const BOTTOMS_DATA = [
  { waist: "28", waistIn: "28 - 29", waistCm: "71 - 74", hipIn: "35.5", hipCm: "90", inseamIn: "30.0", inseamCm: "76.0", thighIn: "22.5", thighCm: "57.0" },
  { waist: "30", waistIn: "30 - 31", waistCm: "76 - 79", hipIn: "37.5", hipCm: "95", inseamIn: "31.0", inseamCm: "78.5", thighIn: "23.5", thighCm: "60.0" },
  { waist: "32", waistIn: "32 - 33", waistCm: "81 - 84", hipIn: "39.5", hipCm: "100", inseamIn: "32.0", inseamCm: "81.0", thighIn: "24.5", thighCm: "62.0" },
  { waist: "34", waistIn: "34 - 35", waistCm: "86 - 89", hipIn: "41.5", hipCm: "105", inseamIn: "32.0", inseamCm: "81.0", thighIn: "25.5", thighCm: "65.0" },
  { waist: "36", waistIn: "36 - 37", waistCm: "91 - 94", hipIn: "43.5", hipCm: "110", inseamIn: "33.0", inseamCm: "84.0", thighIn: "26.5", thighCm: "67.0" },
  { waist: "38", waistIn: "38 - 39", waistCm: "96 - 99", hipIn: "45.5", hipCm: "115", inseamIn: "33.0", inseamCm: "84.0", thighIn: "27.5", thighCm: "70.0" }
];

const OUTERWEAR_DATA = [
  { size: "S", chestIn: "37 - 39", chestCm: "94 - 99", shoulderIn: "17.8", shoulderCm: "45.2", sleeveIn: "34.0", sleeveCm: "86.4", coatLengthIn: "28.0", coatLengthCm: "71.0" },
  { size: "M", chestIn: "40 - 42", chestCm: "101 - 107", shoulderIn: "18.5", shoulderCm: "47.0", sleeveIn: "35.0", sleeveCm: "88.9", coatLengthIn: "29.0", coatLengthCm: "73.5" },
  { size: "L", chestIn: "43 - 45", chestCm: "109 - 114", shoulderIn: "19.3", shoulderCm: "49.0", sleeveIn: "36.0", sleeveCm: "91.4", coatLengthIn: "30.0", coatLengthCm: "76.0" },
  { size: "XL", chestIn: "46 - 48", chestCm: "117 - 122", shoulderIn: "20.1", shoulderCm: "51.0", sleeveIn: "37.0", sleeveCm: "94.0", coatLengthIn: "31.0", coatLengthCm: "78.5" },
  { size: "XXL", chestIn: "49 - 51", chestCm: "124 - 130", shoulderIn: "20.9", shoulderCm: "53.0", sleeveIn: "38.0", sleeveCm: "96.5", coatLengthIn: "32.0", coatLengthCm: "81.0" }
];

const FOOTWEAR_DATA = [
  { us: "8.0", uk: "7.0", eu: "41", lengthIn: "10.2", lengthCm: "26.0" },
  { us: "8.5", uk: "7.5", eu: "41.5", lengthIn: "10.4", lengthCm: "26.5" },
  { us: "9.0", uk: "8.0", eu: "42", lengthIn: "10.6", lengthCm: "27.0" },
  { us: "9.5", uk: "8.5", eu: "42.5", lengthIn: "10.8", lengthCm: "27.5" },
  { us: "10.0", uk: "9.0", eu: "43", lengthIn: "11.0", lengthCm: "28.0" },
  { us: "10.5", uk: "9.5", eu: "43.5", lengthIn: "11.2", lengthCm: "28.5" },
  { us: "11.0", uk: "10.0", eu: "44", lengthIn: "11.4", lengthCm: "29.0" },
  { us: "11.5", uk: "10.5", eu: "44.5", lengthIn: "11.6", lengthCm: "29.5" },
  { us: "12.0", uk: "11.0", eu: "45", lengthIn: "11.8", lengthCm: "30.0" },
  { us: "13.0", uk: "12.0", eu: "46", lengthIn: "12.2", lengthCm: "31.0" }
];

export default function SizeGuideClient() {
  const [activeCategory, setActiveCategory] = useState("Tops");
  const [unit, setUnit] = useState("in"); // "in" or "cm"

  return (
    <CustomerCareLayout
      activeKey="size-guide"
      pageTitle="Size Guide"
      pageSubtitle="Engineered for an exact, tailored fit. Find your measurements below to ensure a perfect silhouette."
    >
      {/* Category Tabs & Unit Switcher Toolbar */}
      <div className="cc-toolbar">
        <div className="cc-pill-group">
          {["Tops", "Bottoms", "Outerwear", "Footwear"].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cc-pill-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Units Switcher */}
        <div className="cc-unit-switch" aria-label="Measurement units toggle">
          <button
            type="button"
            className={`cc-unit-btn ${unit === "in" ? "active" : ""}`}
            onClick={() => setUnit("in")}
          >
            Inches (IN)
          </button>
          <button
            type="button"
            className={`cc-unit-btn ${unit === "cm" ? "active" : ""}`}
            onClick={() => setUnit("cm")}
          >
            Centimeters (CM)
          </button>
        </div>
      </div>

      {/* Sizing Table Area */}
      <div style={{ marginBottom: "56px" }}>
        {activeCategory === "Tops" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#fff" }}>
                Tops &ndash; Heavyweight Tee, Merino Crew &amp; Oxford Shirt
              </h3>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                Units: {unit === "in" ? "Inches" : "Centimeters"}
              </span>
            </div>
            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest Circumference</th>
                    <th>Shoulder Width</th>
                    <th>Sleeve Length</th>
                    <th>Body Length</th>
                  </tr>
                </thead>
                <tbody>
                  {TOPS_DATA.map((row) => (
                    <tr key={row.size}>
                      <td><strong>{row.size}</strong></td>
                      <td>{unit === "in" ? `${row.chestIn} in` : `${row.chestCm} cm`}</td>
                      <td>{unit === "in" ? `${row.shoulderIn} in` : `${row.shoulderCm} cm`}</td>
                      <td>{unit === "in" ? `${row.sleeveIn} in` : `${row.sleeveCm} cm`}</td>
                      <td>{unit === "in" ? `${row.lengthIn} in` : `${row.lengthCm} cm`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeCategory === "Bottoms" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#fff" }}>
                Bottoms &ndash; Tapered Chinos, Washed Denim &amp; Cargo Joggers
              </h3>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                Units: {unit === "in" ? "Inches" : "Centimeters"}
              </span>
            </div>
            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Waist Size</th>
                    <th>Natural Waist</th>
                    <th>Hip Circumference</th>
                    <th>Inseam Length</th>
                    <th>Thigh Circumference</th>
                  </tr>
                </thead>
                <tbody>
                  {BOTTOMS_DATA.map((row) => (
                    <tr key={row.waist}>
                      <td><strong>{row.waist}</strong></td>
                      <td>{unit === "in" ? `${row.waistIn} in` : `${row.waistCm} cm`}</td>
                      <td>{unit === "in" ? `${row.hipIn} in` : `${row.hipCm} cm`}</td>
                      <td>{unit === "in" ? `${row.inseamIn} in` : `${row.inseamCm} cm`}</td>
                      <td>{unit === "in" ? `${row.thighIn} in` : `${row.thighCm} cm`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeCategory === "Outerwear" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#fff" }}>
                Outerwear &ndash; Bomber Jacket &amp; Wool Overcoat
              </h3>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                Units: {unit === "in" ? "Inches" : "Centimeters"}
              </span>
            </div>
            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest (Layered)</th>
                    <th>Shoulder Width</th>
                    <th>Sleeve Length</th>
                    <th>Garment Length</th>
                  </tr>
                </thead>
                <tbody>
                  {OUTERWEAR_DATA.map((row) => (
                    <tr key={row.size}>
                      <td><strong>{row.size}</strong></td>
                      <td>{unit === "in" ? `${row.chestIn} in` : `${row.chestCm} cm`}</td>
                      <td>{unit === "in" ? `${row.shoulderIn} in` : `${row.shoulderCm} cm`}</td>
                      <td>{unit === "in" ? `${row.sleeveIn} in` : `${row.sleeveCm} cm`}</td>
                      <td>{unit === "in" ? `${row.coatLengthIn} in` : `${row.coatLengthCm} cm`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeCategory === "Footwear" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#fff" }}>
                Footwear &ndash; Minimal Sneaker &amp; Chelsea Boot
              </h3>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                Units: {unit === "in" ? "Inches" : "Centimeters"}
              </span>
            </div>
            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>US Men</th>
                    <th>UK</th>
                    <th>EU</th>
                    <th>Foot Length</th>
                  </tr>
                </thead>
                <tbody>
                  {FOOTWEAR_DATA.map((row) => (
                    <tr key={row.us}>
                      <td><strong>US {row.us}</strong></td>
                      <td>UK {row.uk}</td>
                      <td>EU {row.eu}</td>
                      <td>{unit === "in" ? `${row.lengthIn} in` : `${row.lengthCm} cm`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* How To Measure Section */}
      <div style={{ marginTop: "48px" }}>
        <div className="cc-section-header">
          <h2 className="cc-section-title">How To Measure Accurately</h2>
          <p className="cc-section-desc">
            For the cleanest silhouette, take your measurements while wearing lightweight clothing or undergarments. Keep the measuring tape level and comfortably snug without tension.
          </p>
        </div>

        <div className="cc-grid-4">
          <div className="cc-card">
            <div className="cc-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
              </svg>
            </div>
            <h4 className="cc-card-title">1. Chest</h4>
            <p className="cc-card-desc">
              Wrap the measuring tape horizontally around the fullest part of your chest, passing under your arms and across your shoulder blades.
            </p>
          </div>

          <div className="cc-card">
            <div className="cc-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M7 15h4M15 15h2M7 9h2M13 9h4" />
              </svg>
            </div>
            <h4 className="cc-card-title">2. Waist</h4>
            <p className="cc-card-desc">
              Measure around your natural waistline where your pants waistband typically sits comfortably. Keep one finger between tape and body.
            </p>
          </div>

          <div className="cc-card">
            <div className="cc-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m4 6 8-4 8 4v10l-8 4-8-4V6z" />
                <path d="m10 12 4 4m0-4-4 4" />
              </svg>
            </div>
            <h4 className="cc-card-title">3. Inseam</h4>
            <p className="cc-card-desc">
              Measure from the crotch seam along the inside seam of your leg down to the ankle bone, or measure a favorite pair of well-fitting trousers.
            </p>
          </div>

          <div className="cc-card">
            <div className="cc-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <h4 className="cc-card-title">4. Sleeve</h4>
            <p className="cc-card-desc">
              With elbow slightly bent, measure from the center nape of your neck, across the tip of the shoulder, and down along the outside arm to the wrist bone.
            </p>
          </div>
        </div>
      </div>

      {/* Fit Advice & Guarantee Callout */}
      <div className="cc-callout" style={{ marginTop: "40px" }}>
        <h4>Between Sizes?</h4>
        <p>
          If your measurements fall between two sizes: choose the larger size for a relaxed, easy drape, or choose the smaller size for a clean, tailored fit. Remember: we provide <strong>100% free size exchanges</strong> on all domestic orders within 30 days of delivery.
        </p>
      </div>

      {/* Still unsure CTA */}
      <div className="cc-card" style={{ marginTop: "32px", textAlign: "center", padding: "32px 20px" }}>
        <h4 className="cc-card-title" style={{ fontSize: "18px", marginBottom: "8px" }}>
          Need personalized sizing assistance?
        </h4>
        <p className="cc-card-desc" style={{ maxWidth: "480px", margin: "0 auto 20px" }}>
          Tell us your height, weight, and fit preference and our team will recommend the ideal size.
        </p>
        <Link href="/contact" className="cc-submit-btn" style={{ textDecoration: "none", display: "inline-block" }}>
          Ask Sizing Support
        </Link>
      </div>
    </CustomerCareLayout>
  );
}
