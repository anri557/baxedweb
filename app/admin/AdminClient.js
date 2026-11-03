"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const EMPTY_PRODUCT = {
  name: "",
  slug: "",
  category: "tops",
  sub: "T-Shirts & Basics",
  price: "",
  description: "",
  image: "",
  tag: "NEW",
  inStock: true,
};

const CATEGORY_OPTIONS = [
  {
    value: "tops",
    label: "Tops",
    subcategories: [
      "T-Shirts & Basics",
      "Blouses & Shirts",
      "Sweaters & Knitwear",
      "Casual & Sleeveless Wear",
    ],
  },
  {
    value: "bottoms",
    label: "Bottoms",
    subcategories: [
      "Jeans & Denim",
      "Trousers & Chinos",
      "Shorts",
      "Joggers",
    ],
  },
  {
    value: "outerwear",
    label: "Outerwear",
    subcategories: [
      "Jackets & Coats",
      "Hoodies & Sweatshirts",
    ],
  },
];

const TAG_OPTIONS = [
  { value: "NEW", label: "New Release", pillClass: "tag-pill-new" },
  { value: "BESTSELLER", label: "Bestseller", pillClass: "tag-pill-bestseller" },
  { value: "FEATURED_SET", label: "Featured Set", pillClass: "tag-pill-limited" },
  { value: "LIMITED", label: "Limited Edition", pillClass: "tag-pill-limited" },
  { value: "SALE", label: "Sale", pillClass: "tag-pill-sale" },
  { value: "ESSENTIAL", label: "Core Essential", pillClass: "tag-pill-essential" },
  { value: "", label: "None", pillClass: "tag-pill-none" },
];

const PRESET_IMAGES = [
  { label: "Studio Tops", src: "/ShopTop.jpeg", category: "tops" },
  { label: "Studio Bottoms", src: "/ShopBottoms.jpeg", category: "bottoms" },
  { label: "Studio Outerwear", src: "/outwear.jpeg", category: "outerwear" },
  { label: "Hero Editorial", src: "/hero.jpeg", category: "outerwear" },
  { label: "Chelsea Boots", src: "/chelsea.jpg", category: "bottoms" },
  { label: "Minimal Sneaker", src: "/sneaker.jpg", category: "bottoms" },
  { label: "Shower Duo Studio", src: "/shower-duo-2.jpg", category: "tops" },
  { label: "Shower Duo Macro", src: "/shower-duo-3.jpg", category: "tops" },
  { label: "Shower Duo Lifestyle", src: "/shower-duo-4.jpg", category: "tops" },
];

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminClient() {
  const [authenticated, setAuthenticated] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStep, setAuthStep] = useState("email"); // "email" | "password"

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [product, setProduct] = useState(EMPTY_PRODUCT);
  const [editingId, setEditingId] = useState(null);
  const [autoSlug, setAutoSlug] = useState(true);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [toast, setToast] = useState(null);

  // Search, Filter & View Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  const [activeAdminSection, setActiveAdminSection] = useState("products");
  const [isProductEditorOpen, setIsProductEditorOpen] = useState(false);

  // Delete confirmation modal
  const [productToDelete, setProductToDelete] = useState(null);

  const formRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const triggerToast = useCallback((message, type = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  const loadProducts = useCallback(async () => {
    const response = await fetch("/api/products", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load products.");
    setProducts(Array.isArray(data) ? data : []);
  }, []);

  const loadOrders = useCallback(async () => {
    const response = await fetch("/api/admin/orders", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load orders.");
    setOrders(Array.isArray(data) ? data : []);
  }, []);

  const handleSelectOrders = async () => {
    setActiveAdminSection("orders");
    setOrdersLoading(true);
    setOrdersError("");
    try {
      await loadOrders();
    } catch (loadError) {
      setOrdersError(loadError.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleSyncProducts = async () => {
    setBusy(true);
    try {
      if (activeAdminSection === "orders") {
        await loadOrders();
        triggerToast("Orders are up to date.", "success");
      } else {
        await loadProducts();
        triggerToast("Product catalog is up to date.", "success");
      }
    } catch (syncError) {
      setError(syncError.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json())
      .then(async (data) => {
        if (cancelled) return;
        setAuthenticated(data.authenticated);
        if (data.email) setAdminEmail(data.email);
        if (data.authenticated) {
          try {
            await Promise.all([loadProducts(), loadOrders()]);
          } catch (loadError) {
            setError(loadError.message);
          }
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAuthenticated(false);
          setError("Could not reach the admin service.");
        }
      });

    return () => {
      cancelled = true;
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [loadOrders, loadProducts]);

  useEffect(() => {
    if (!isProductEditorOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsProductEditorOpen(false);
        setEditingId(null);
        setProduct(EMPTY_PRODUCT);
        setAutoSlug(true);
      }
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isProductEditorOpen]);

  const handleShopContinue = async () => {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "baxedadmin@gmail.com",
          password: "baxedadminpassword2026!",
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Sign-in failed.");
      setAuthenticated(true);
      setAdminEmail("baxedadmin@gmail.com");
      setEmail("");
      setPassword("");
      await loadProducts();
      triggerToast("Welcome back! Signed in with shop.", "success");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setBusy(false);
    }
  };

  const handleEmailStep = (event) => {
    event.preventDefault();
    setError("");
    if (!email.trim()) return;
    setAuthStep("password");
  };

  const handlePasswordStep = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Invalid password or email.");
      setAuthenticated(true);
      setAdminEmail(email);
      setPassword("");
      await loadProducts();
      triggerToast("Signed in successfully!", "success");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setAuthenticated(false);
      setProducts([]);
      setEditingId(null);
      setProduct(EMPTY_PRODUCT);
      setAuthStep("email");
      setEmail("");
      setPassword("");
      triggerToast("Signed out successfully.", "info");
    } finally {
      setBusy(false);
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setProduct((current) => ({
      ...current,
      name: newName,
      slug: autoSlug ? slugify(newName) : current.slug,
    }));
  };

  const handleSlugChange = (event) => {
    setAutoSlug(false);
    setProduct((current) => ({
      ...current,
      slug: slugify(event.target.value),
    }));
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");

    const targetSlug = product.slug ? slugify(product.slug) : slugify(product.name);
    const payload = {
      ...product,
      slug: targetSlug,
      price: Number(product.price),
      tag: product.tag || "",
      inStock: product.inStock !== false,
    };

    try {
      if (editingId) {
        // Update product via PUT
        const response = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, id: editingId }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not update product.");

        setProducts((current) =>
          current.map((item) => (item.id === editingId ? data : item))
        );
        setEditingId(null);
        setProduct(EMPTY_PRODUCT);
        setAutoSlug(true);
        setIsProductEditorOpen(false);
        triggerToast(`Updated "${data.name}" successfully!`, "success");
      } else {
        // Create product via POST
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not add product.");

        setProducts((current) => [data, ...current]);
        setProduct(EMPTY_PRODUCT);
        setAutoSlug(true);
        setIsProductEditorOpen(false);
        triggerToast(`Added "${data.name}" to the catalog!`, "success");
      }
    } catch (saveError) {
      setError(saveError.message);
      triggerToast(saveError.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const handleStartEdit = (item) => {
    setIsProductEditorOpen(true);
    setEditingId(item.id);
    setAutoSlug(false);
    setProduct({
      name: item.name || "",
      slug: item.slug || "",
      category: item.category || "tops",
      sub: item.sub || "T-Shirts & Basics",
      price: item.price !== undefined ? String(item.price) : "",
      description: item.description || "",
      image: item.image || "",
      tag: item.tag || "",
      inStock: item.inStock !== false,
    });
    setError("");
    setNotice("");
    triggerToast(`Editing "${item.name}"`, "info");
  };

  const handleCancelEdit = () => {
    setIsProductEditorOpen(false);
    setEditingId(null);
    setProduct(EMPTY_PRODUCT);
    setAutoSlug(true);
    setError("");
  };

  const handleDuplicate = (item) => {
    setIsProductEditorOpen(true);
    setEditingId(null);
    setAutoSlug(false);
    const newName = `${item.name} (Copy)`;
    const newSlug = slugify(`${item.slug}-copy`);
    setProduct({
      name: newName,
      slug: newSlug,
      category: item.category || "tops",
      sub: item.sub || "T-Shirts & Basics",
      price: item.price !== undefined ? String(item.price) : "",
      description: item.description || "",
      image: item.image || "",
      tag: item.tag || "NEW",
      inStock: item.inStock !== false,
    });
    setError("");
    triggerToast(`Created draft duplicate of "${item.name}"`, "info");
  };

  const handleQuickToggleStock = async (item) => {
    setBusy(true);
    const nextStock = !item.inStock;
    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, inStock: nextStock }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update stock status.");

      setProducts((current) =>
        current.map((p) => (p.id === item.id ? { ...p, inStock: nextStock } : p))
      );
      triggerToast(
        `"${item.name}" is now ${nextStock ? "In Stock" : "Out of Stock"}`,
        nextStock ? "success" : "info"
      );
    } catch (toggleError) {
      triggerToast(toggleError.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!productToDelete) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(
        `/api/products?id=${encodeURIComponent(productToDelete.id)}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not remove product.");

      setProducts((current) => current.filter((item) => item.id !== productToDelete.id));
      if (editingId === productToDelete.id) {
        handleCancelEdit();
      }
      triggerToast(`Removed "${productToDelete.name}" from catalog.`, "info");
      setProductToDelete(null);
    } catch (deleteError) {
      setError(deleteError.message);
      triggerToast(deleteError.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    setBusy(true);
    setError("");
    try {
      const uploadData = new FormData();
      uploadData.set("image", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: uploadData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not upload image.");
      setProduct((current) => ({ ...current, image: data.image }));
      triggerToast("Image uploaded successfully!", "success");
    } catch (uploadError) {
      setError(uploadError.message);
      triggerToast(uploadError.message, "error");
    } finally {
      setBusy(false);
    }
  };

  // KPI Metrics
  const metrics = useMemo(() => {
    const total = products.length;
    const tops = products.filter((p) => p.category === "tops").length;
    const bottoms = products.filter((p) => p.category === "bottoms").length;
    const outerwear = products.filter((p) => p.category === "outerwear").length;
    const inStock = products.filter((p) => p.inStock !== false).length;
    const totalValue = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
    const avgPrice = total > 0 ? totalValue / total : 0;
    return {
      total,
      tops,
      bottoms,
      outerwear,
      inStock,
      outOfStock: total - inStock,
      totalValue,
      avgPrice,
      bestSellers: products.filter((p) => ["BESTSELLER", "BEST SELLER"].includes(String(p.tag || "").toUpperCase())).length,
      featuredSets: products.filter((p) => ["FEATURED_SET", "FEATURED SET", "FEATURED"].includes(String(p.tag || "").toUpperCase())).length,
      missingImages: products.filter((p) => !p.image).length,
      needsAttention: products.filter((p) => p.inStock === false || !p.image).length,
    };
  }, [products]);

  // Filtered & Sorted Product List
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.slug?.toLowerCase().includes(q) ||
          p.sub?.toLowerCase().includes(q) ||
          p.tag?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      list = list.filter((p) => p.category === categoryFilter);
    }

    // Stock filter
    if (stockFilter === "inStock") {
      list = list.filter((p) => p.inStock !== false);
    } else if (stockFilter === "outOfStock") {
      list = list.filter((p) => p.inStock === false);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
      if (sortBy === "name-asc") return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "oldest") return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return list;
  }, [products, searchQuery, categoryFilter, stockFilter, sortBy]);

  const visibleProducts = useMemo(() => {
    if (activeAdminSection === "best-seller") {
      return filteredProducts.filter((item) => ["BESTSELLER", "BEST SELLER"].includes(String(item.tag || "").toUpperCase()));
    }
    if (activeAdminSection === "featured-set") {
      return filteredProducts.filter((item) => ["FEATURED_SET", "FEATURED SET", "FEATURED"].includes(String(item.tag || "").toUpperCase()));
    }
    if (activeAdminSection === "attention") {
      return filteredProducts.filter((item) => item.inStock === false || !item.image);
    }
    return filteredProducts;
  }, [activeAdminSection, filteredProducts]);

  if (authenticated === null) {
    return (
      <main className="admin-page">
        <div className="admin-loading-card">
          <div className="admin-spinner" />
          <p>Verifying secure administrator session…</p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="admin-signin-screen">
        <div className="admin-signin-center">
          <h1 className="admin-signin-title">Sign in</h1>
          <p className="admin-signin-subtitle">
            {authStep === "email" ? "Sign in or create an account" : "Enter your store account password"}
          </p>

          <button
            type="button"
            className="admin-signin-shop-btn"
            onClick={handleShopContinue}
            disabled={busy}
          >
            {busy ? (
              <span className="admin-signin-shop-spinner" />
            ) : (
              <span>Continue with <strong>shop</strong></span>
            )}
          </button>

          <div className="admin-signin-divider">
            <span>or</span>
          </div>

          {authStep === "email" ? (
            <form onSubmit={handleEmailStep} className="admin-signin-form">
              <div className="admin-signin-input-box">
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoFocus
                  className="admin-signin-input"
                />
                <button
                  type="submit"
                  className="admin-signin-arrow-btn"
                  aria-label="Continue with email"
                  title="Continue"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordStep} className="admin-signin-form">
              <div className="admin-signin-email-pill">
                <span>{email}</span>
                <button
                  type="button"
                  className="admin-signin-change-btn"
                  onClick={() => {
                    setAuthStep("email");
                    setError("");
                  }}
                >
                  Edit
                </button>
              </div>

              <div className="admin-signin-input-box">
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoFocus
                  className="admin-signin-input"
                />
                <button
                  type="submit"
                  className="admin-signin-arrow-btn"
                  disabled={busy}
                  aria-label="Submit password"
                  title="Sign in"
                >
                  {busy ? (
                    <span className="admin-signin-spinner" />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          )}

          {error && <p className="admin-signin-error" role="alert">{error}</p>}

          <div
            style={{
              marginTop: "20px",
              padding: "14px 16px",
              background: "#ede9df",
              borderRadius: "10px",
              border: "1px solid #ded8cb",
              fontSize: "12.5px",
              color: "#333",
              lineHeight: 1.5,
            }}
          >
       
            <button
              type="button"
              onClick={() => {
                setEmail("baxedadmin@gmail.com");
                setPassword("baxedadminpassword2026!");
                setAuthStep("password");
                setError("");
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                background: "#ffffff",
                border: "1px solid #dcdcdc",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#5a31f4",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
            >
              Autofill Admin Credentials
            </button>
          </div>

          <p className="admin-signin-terms">
            By continuing, you agree to our <Link href="/shipping-returns">Terms of service</Link>
          </p>
        </div>

        <footer className="admin-signin-footer">
          <Link href="/faq" className="admin-signin-privacy">
            Privacy policy
          </Link>
          <Link href="/" className="admin-signin-return">
            ← Return to store
          </Link>
        </footer>
      </main>
    );
  }

  const selectedCategory =
    CATEGORY_OPTIONS.find((option) => option.value === product.category) ||
    CATEGORY_OPTIONS[0];
  const adminSectionTitle = {
    products: "Products & Stock Inventory",
    attention: "Needs Attention",
    orders: "Orders",
    "best-seller": "Best Seller",
    "featured-set": "Featured Set",
    messages: "Messages",
  }[activeAdminSection] || "Products & Stock Inventory";

  return (
    <main className="admin-page admin-dashboard">
      {/* Toast Notification */}
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`} role="status">
          <span className="admin-toast-dot" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="admin-modal-backdrop" onClick={() => setProductToDelete(null)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
              </svg>
            </div>
            <h3>Delete Product?</h3>
            <p>
              Are you sure you want to remove <strong>{productToDelete.name}</strong> from the store?
              This will unpublish the product URL <code>/products/{productToDelete.slug}</code>.
            </p>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setProductToDelete(null)}
                disabled={busy}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-danger-btn"
                onClick={handleDeleteConfirmed}
                disabled={busy}
              >
                {busy ? "Deleting…" : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-shell">
        <aside className="admin-sidebar" aria-label="Admin navigation">
          <Link className="admin-side-brand" href="/" aria-label="BAXED Admin home">
            <span className="admin-side-brand-mark">B</span>
            <span className="admin-side-brand-copy"><strong>BAXED</strong><small>ADMIN</small></span>
          </Link>

          <div className="admin-side-group-label">CORE MANAGEMENT</div>
          <nav className="admin-side-nav">
            <button type="button" className={`admin-side-nav-item ${activeAdminSection === "products" ? "active" : ""}`} onClick={() => setActiveAdminSection("products")}>
              <span className="admin-side-nav-icon" aria-hidden="true">▣</span><span>Products &amp; Stock</span><span className="admin-side-nav-count">{metrics.total}</span>
            </button>
            <button type="button" className={`admin-side-nav-item ${activeAdminSection === "orders" ? "active" : ""}`} onClick={handleSelectOrders}>
              <span className="admin-side-nav-icon" aria-hidden="true">▤</span><span>Orders</span><span className="admin-side-nav-count">{orders.length}</span>
            </button>
            <button type="button" className={`admin-side-nav-item ${activeAdminSection === "best-seller" ? "active" : ""}`} onClick={() => setActiveAdminSection("best-seller")}>
              <span className="admin-side-nav-icon" aria-hidden="true">★</span><span>Best Seller</span><span className="admin-side-nav-count">{metrics.bestSellers}</span>
            </button>
            <button type="button" className={`admin-side-nav-item ${activeAdminSection === "featured-set" ? "active" : ""}`} onClick={() => setActiveAdminSection("featured-set")}>
              <span className="admin-side-nav-icon" aria-hidden="true">✦</span><span>Featured Set</span><span className="admin-side-nav-count">{metrics.featuredSets}</span>
            </button>
            <button type="button" className={`admin-side-nav-item ${activeAdminSection === "messages" ? "active" : ""}`} onClick={() => setActiveAdminSection("messages")}>
              <span className="admin-side-nav-icon" aria-hidden="true">✉</span><span>Messages</span>
            </button>
          </nav>

          <div className="admin-side-group-label admin-side-shortcuts-label">QUICK SHORTCUTS</div>
          <nav className="admin-side-nav">
            <Link href="/" target="_blank" rel="noreferrer" className="admin-side-nav-item">
              <span className="admin-side-nav-icon" aria-hidden="true">↗</span><span>Live Storefront</span><span className="admin-side-nav-hint">View</span>
            </Link>
            <button type="button" className={`admin-side-nav-item ${activeAdminSection === "attention" ? "active" : ""}`} onClick={() => setActiveAdminSection("attention")}>
              <span className="admin-side-nav-icon attention" aria-hidden="true">!</span><span>Needs Attention</span><span className="admin-side-nav-count">{metrics.needsAttention}</span>
            </button>
          </nav>

          <div className="admin-sidebar-account">
            <span className="admin-user-avatar">{(adminEmail || "Owner")[0].toUpperCase()}</span>
            <span className="admin-sidebar-account-copy"><strong>Logged In Admin</strong><small>{adminEmail || "Store Owner"}</small></span>
            <button type="button" className="admin-sidebar-exit" onClick={handleLogout} disabled={busy}>Exit</button>
          </div>
        </aside>

        <div className="admin-main-shell">
          <header className="admin-topbar">
            <div className="admin-page-heading">
              <div className="admin-breadcrumb"><span>Admin</span><b>/</b>{adminSectionTitle}</div>
              <h1>{adminSectionTitle}</h1>
            </div>
            <div className="admin-topbar-actions">
              <button type="button" className="admin-sync-btn" onClick={handleSyncProducts} disabled={busy}>
                <span aria-hidden="true">⟳</span>{busy ? "Syncing…" : "Sync"}
              </button>
              <button type="button" className="admin-add-product-btn" aria-haspopup="dialog" onClick={() => {
                setActiveAdminSection("products");
                setEditingId(null);
                setProduct(EMPTY_PRODUCT);
                setAutoSlug(true);
                setIsProductEditorOpen(true);
              }}>
                <span aria-hidden="true">+</span>Add New Product
              </button>
            </div>
          </header>

          <div className="admin-content">
            {activeAdminSection === "orders" ? (
              <section className="admin-orders-panel" aria-labelledby="admin-orders-title">
                <header className="admin-orders-heading">
                  <div>
                    <span className="admin-editor-eyebrow">CUSTOMER MANAGEMENT</span>
                    <h2 id="admin-orders-title">Customer Orders <span className="admin-badge-count">{orders.length}</span></h2>
                  </div>
                  <p>Order and delivery details are visible only to signed-in admins.</p>
                </header>

                {ordersLoading ? (
                  <div className="admin-orders-empty"><div className="admin-spinner" /><p>Loading orders…</p></div>
                ) : ordersError ? (
                  <div className="admin-orders-empty" role="alert"><h3>Could not load orders</h3><p>{ordersError}</p></div>
                ) : orders.length === 0 ? (
                  <div className="admin-orders-empty"><span aria-hidden="true">▤</span><h3>No orders yet</h3><p>Customer orders will appear here after checkout is completed.</p></div>
                ) : (
                  <div className="admin-orders-list">
                    {orders.map((order) => (
                      <article className="admin-order-card" key={order.id}>
                        <header className="admin-order-card-header">
                          <div>
                            <strong>{order.orderNumber}</strong>
                            <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleString()}</time>
                          </div>
                          <div className="admin-order-status-group">
                            <span className="admin-order-status">{order.status}</span>
                            <span className="admin-order-payment">{order.paymentMethod}</span>
                          </div>
                        </header>

                        <div className="admin-order-details-grid">
                          <section className="admin-order-customer">
                            <h3>Customer &amp; Delivery</h3>
                            <strong>{order.customer.fullName}</strong>
                            <a href={`mailto:${order.customer.email}`}>{order.customer.email}</a>
                            <a href={`tel:${order.customer.phone}`}>{order.customer.phone}</a>
                            <address>
                              {order.customer.address}
                              {order.customer.apartment && <>, {order.customer.apartment}</>}
                              <br />
                              {order.customer.city}{order.customer.postalCode ? `, ${order.customer.postalCode}` : ""}
                              <br />
                              {order.customer.country}
                            </address>
                          </section>

                          <section className="admin-order-items">
                            <h3>Items</h3>
                            {order.items.map((item, index) => (
                              <div className="admin-order-line" key={`${item.id || item.name}-${index}`}>
                                <span><strong>{item.name}</strong><small>{item.quantity} × ₾{item.price.toFixed(2)}</small></span>
                                <strong>₾{(item.quantity * item.price).toFixed(2)}</strong>
                              </div>
                            ))}
                            <div className="admin-order-subtotal"><span>Subtotal</span><strong>₾{order.subtotal.toFixed(2)}</strong></div>
                            {order.discount > 0 && <div className="admin-order-subtotal"><span>Discount</span><strong>−₾{order.discount.toFixed(2)}</strong></div>}
                            <div className="admin-order-total"><span>Order total</span><strong>₾{order.total.toFixed(2)} GEL</strong></div>
                          </section>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            ) : activeAdminSection === "messages" ? (
              <section className="admin-empty-state admin-section-placeholder">
                <div className="admin-empty-icon">✉</div>
                <h3>Messages are ready for setup</h3>
                <p>Customer messages will appear here once a messaging inbox is connected.</p>
                <button type="button" className="admin-secondary-btn" onClick={() => setActiveAdminSection("products")}>Back to Products &amp; Stock</button>
              </section>
            ) : (
              <>
      {/* KPI Analytics Cards */}
      <section className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-label">
            <span>Catalog Products</span>
            <span className="admin-kpi-badge">{metrics.total} / 200</span>
          </div>
          <div className="admin-kpi-value">{metrics.total}</div>
          <div className="admin-progress-bar">
            <div
              className="admin-progress-fill"
              style={{ width: `${Math.min(100, (metrics.total / 200) * 100)}%` }}
            />
          </div>
          <div className="admin-kpi-subtext">
            {200 - metrics.total} slots remaining in active catalog
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">
            <span>Active Inventory Value</span>
            <span className="admin-kpi-badge">GEL</span>
          </div>
          <div className="admin-kpi-value">
            ₾{metrics.totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="admin-kpi-subtext">
            Avg item price: ₾{metrics.avgPrice.toFixed(2)}
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">
            <span>Department Mix</span>
            <span className="admin-kpi-badge">3 Categories</span>
          </div>
          <div className="admin-category-pills">
            <button
              type="button"
              className={`admin-cat-pill ${categoryFilter === "tops" ? "active" : ""}`}
              onClick={() => setCategoryFilter((c) => (c === "tops" ? "all" : "tops"))}
            >
              Tops <strong>{metrics.tops}</strong>
            </button>
            <button
              type="button"
              className={`admin-cat-pill ${categoryFilter === "bottoms" ? "active" : ""}`}
              onClick={() => setCategoryFilter((c) => (c === "bottoms" ? "all" : "bottoms"))}
            >
              Bottoms <strong>{metrics.bottoms}</strong>
            </button>
            <button
              type="button"
              className={`admin-cat-pill ${categoryFilter === "outerwear" ? "active" : ""}`}
              onClick={() => setCategoryFilter((c) => (c === "outerwear" ? "all" : "outerwear"))}
            >
              Outerwear <strong>{metrics.outerwear}</strong>
            </button>
          </div>
          <div className="admin-kpi-subtext">Click pill to filter catalog view</div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-label">
            <span>Availability</span>
            <span className="admin-kpi-badge">{metrics.inStock} In Stock</span>
          </div>
          <div className="admin-kpi-split">
            <div className="admin-split-item in-stock">
              <span className="admin-split-dot" />
              <span className="admin-split-num">{metrics.inStock}</span>
              <span className="admin-split-label">In Stock</span>
            </div>
            <div className="admin-split-item out-stock">
              <span className="admin-split-dot" />
              <span className="admin-split-num">{metrics.outOfStock}</span>
              <span className="admin-split-label">Sold Out</span>
            </div>
          </div>
          <div className="admin-kpi-subtext">Instant one-click stock toggle on cards</div>
        </div>
      </section>

      {notice && <p className="admin-notice" role="status">{notice}</p>}
      {error && <p className="admin-error admin-banner-error" role="alert">{error}</p>}

      {/* Main Work Area: Product Editor & Product Catalog Explorer */}
      <div className="admin-layout-grid">
        {isProductEditorOpen && (
          <div
            className="admin-product-modal-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) handleCancelEdit();
            }}
          >
            <section
              className="admin-product-modal"
              ref={formRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="admin-product-modal-title"
            >
              <header className="admin-product-modal-header">
                <div>
                  <span className="admin-editor-eyebrow">{editingId ? "EDIT ITEM" : "NEW ITEM"}</span>
                  <h2 id="admin-product-modal-title">
                    {editingId ? "Edit Catalog Product" : "Add New Catalog Product"}
                  </h2>
                </div>
                <button
                  type="button"
                  className="admin-product-modal-close"
                  onClick={handleCancelEdit}
                  aria-label="Close product form"
                >
                  ×
                </button>
              </header>

              <div className="admin-product-modal-body">
                <div className="admin-editor-card">
            {editingId && (
              <div className="admin-editing-banner">
                <span>Currently editing: <strong>{product.name}</strong></span>
                <small>ID: {editingId.slice(0, 8)}…</small>
              </div>
            )}

            <form className="admin-product-form" onSubmit={handleSaveProduct}>
              {/* Product Name */}
              <div className="admin-field-group">
                <div className="admin-label-row">
                  <label htmlFor="product-name">Product Name *</label>
                  <span className="admin-char-count">{product.name.length}/100</span>
                </div>
                <input
                  id="product-name"
                  value={product.name}
                  maxLength={100}
                  placeholder="e.g. Heavyweight Relaxed Crewneck"
                  onChange={handleNameChange}
                  required
                />
              </div>

              {/* Slug Preview & Customization */}
              <div className="admin-field-group">
                <div className="admin-label-row">
                  <label htmlFor="product-slug">Store URL Slug</label>
                  <button
                    type="button"
                    className="admin-slug-reset-btn"
                    onClick={() => {
                      setAutoSlug(true);
                      setProduct((c) => ({ ...c, slug: slugify(c.name) }));
                    }}
                  >
                    Regenerate
                  </button>
                </div>
                <div className="admin-slug-input-wrapper">
                  <span className="admin-slug-prefix">/products/</span>
                  <input
                    id="product-slug"
                    value={product.slug}
                    placeholder={slugify(product.name) || "product-slug"}
                    onChange={handleSlugChange}
                    required
                  />
                </div>
              </div>

              {/* Category & Collection */}
              <div className="admin-form-row">
                <div className="admin-field-group">
                  <label htmlFor="product-category">Department</label>
                  <select
                    id="product-category"
                    value={product.category}
                    onChange={(event) => {
                      const nextCategory =
                        CATEGORY_OPTIONS.find((option) => option.value === event.target.value) ||
                        CATEGORY_OPTIONS[0];
                      setProduct((current) => ({
                        ...current,
                        category: nextCategory.value,
                        sub: nextCategory.subcategories[0],
                      }));
                    }}
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-field-group">
                  <label htmlFor="product-subcategory">Collection</label>
                  <select
                    id="product-subcategory"
                    value={product.sub}
                    onChange={(event) =>
                      setProduct((current) => ({ ...current, sub: event.target.value }))
                    }
                  >
                    {selectedCategory.subcategories.map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Tag */}
              <div className="admin-form-row">
                <div className="admin-field-group">
                  <label htmlFor="product-price">Price (GEL) *</label>
                  <div className="admin-currency-input">
                    <span className="admin-currency-symbol">₾</span>
                    <input
                      id="product-price"
                      type="number"
                      min="0"
                      max="100000"
                      step="0.01"
                      placeholder="78.00"
                      value={product.price}
                      onChange={(event) =>
                        setProduct((current) => ({ ...current, price: event.target.value }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="admin-field-group">
                  <label htmlFor="product-tag">Tag Badge</label>
                  <select
                    id="product-tag"
                    value={product.tag}
                    onChange={(event) =>
                      setProduct((current) => ({ ...current, tag: event.target.value }))
                    }
                  >
                    {TAG_OPTIONS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stock Status Toggle */}
              <div className="admin-stock-toggle-row">
                <label htmlFor="product-stock-toggle" className="admin-toggle-label">
                  <span>Stock Status</span>
                  <small>
                    {product.inStock
                      ? "Available for purchase on store"
                      : "Marked as sold out"}
                  </small>
                </label>
                <label className="admin-switch">
                  <input
                    id="product-stock-toggle"
                    type="checkbox"
                    checked={product.inStock}
                    onChange={(e) =>
                      setProduct((current) => ({ ...current, inStock: e.target.checked }))
                    }
                  />
                  <span className="admin-slider" />
                </label>
              </div>

              {/* Description */}
              <div className="admin-field-group">
                <div className="admin-label-row">
                  <label htmlFor="product-description">Description *</label>
                  <span className="admin-char-count">{product.description.length}/2000</span>
                </div>
                <textarea
                  id="product-description"
                  rows="4"
                  maxLength={2000}
                  placeholder="Meticulously crafted silhouette with tailored drape, double-stitched hem, and custom hardware."
                  value={product.description}
                  onChange={(event) =>
                    setProduct((current) => ({ ...current, description: event.target.value }))
                  }
                  required
                />
              </div>

              {/* Image Section */}
              <div className="admin-field-group">
                <label htmlFor="product-image-file">Product Media</label>
                <div className="admin-upload-zone">
                  <input
                    id="product-image-file"
                    className="admin-image-file"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    disabled={busy}
                  />
                  <p className="admin-help">
                    Upload high-res JPEG, PNG, or WebP (up to 8 MB)
                  </p>
                </div>

                {/* Preset quick picks */}
                <div className="admin-preset-picker">
                  <span className="admin-preset-title">Or pick a studio asset:</span>
                  <div className="admin-preset-chips">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img.src}
                        type="button"
                        className={`admin-preset-chip ${product.image === img.src ? "active" : ""}`}
                        onClick={() => setProduct((c) => ({ ...c, image: img.src }))}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                </div>

                {product.image && (
                  <div className="admin-image-preview-card">
                    <div className="admin-image-preview-thumb">
                      <Image
                        src={product.image}
                        alt="Selected product"
                        fill
                        sizes="120px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="admin-image-preview-info">
                      <span className="admin-image-src-label">{product.image}</span>
                      <button
                        type="button"
                        className="admin-clear-img-btn"
                        onClick={() => setProduct((c) => ({ ...c, image: "" }))}
                      >
                        Remove image
                      </button>
                    </div>
                  </div>
                )}

                <label htmlFor="product-image" className="admin-sublabel">
                  Image Public Path
                </label>
                <input
                  id="product-image"
                  placeholder="/ShopTop.jpeg or /product-uploads/…"
                  value={product.image}
                  onChange={(event) =>
                    setProduct((current) => ({ ...current, image: event.target.value }))
                  }
                  required
                />
              </div>

              {/* Form Buttons */}
              <div className="admin-form-actions">
                <button
                  type="submit"
                  className="admin-primary-btn"
                  disabled={busy || (!editingId && products.length >= 200)}
                >
                  {busy
                    ? "Saving Product…"
                    : editingId
                    ? "Save Product Changes"
                    : "Publish to Catalog"}
                </button>

                {editingId ? (
                  <button
                    type="button"
                    className="admin-secondary-btn"
                    onClick={handleCancelEdit}
                    disabled={busy}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    className="admin-secondary-btn"
                    onClick={() => {
                      setProduct(EMPTY_PRODUCT);
                      setAutoSlug(true);
                    }}
                    disabled={busy}
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
            </div>
              </div>
            </section>
          </div>
        )}

        {/* Right Column: Catalog Browser & Manager */}
        <section className="admin-catalog-col">
          <div className="admin-catalog-card">
            {/* Header & Controls */}
            <div className="admin-catalog-header">
              <div>
                <h2>
                  Store Catalog{" "}
                  <span className="admin-badge-count">{visibleProducts.length}</span>
                </h2>
                <p className="admin-catalog-subtitle">
                    {visibleProducts.length === products.length
                    ? `Showing all ${products.length} catalog items`
                      : `Filtered ${visibleProducts.length} of ${products.length} items`}
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="admin-view-toggle">
                <button
                  type="button"
                  className={`admin-view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`admin-view-btn ${viewMode === "table" ? "active" : ""}`}
                  onClick={() => setViewMode("table")}
                  title="Table View"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="admin-toolbar">
              {/* Search Bar */}
              <div className="admin-search-wrap">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  placeholder="Search by title, slug, tag, collection…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="admin-clear-search"
                    onClick={() => setSearchQuery("")}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Category Filter Tabs */}
              <div className="admin-filter-tabs">
                <button
                  type="button"
                  className={`admin-tab-btn ${categoryFilter === "all" ? "active" : ""}`}
                  onClick={() => setCategoryFilter("all")}
                >
                  All ({products.length})
                </button>
                <button
                  type="button"
                  className={`admin-tab-btn ${categoryFilter === "tops" ? "active" : ""}`}
                  onClick={() => setCategoryFilter("tops")}
                >
                  Tops ({metrics.tops})
                </button>
                <button
                  type="button"
                  className={`admin-tab-btn ${categoryFilter === "bottoms" ? "active" : ""}`}
                  onClick={() => setCategoryFilter("bottoms")}
                >
                  Bottoms ({metrics.bottoms})
                </button>
                <button
                  type="button"
                  className={`admin-tab-btn ${categoryFilter === "outerwear" ? "active" : ""}`}
                  onClick={() => setCategoryFilter("outerwear")}
                >
                  Outerwear ({metrics.outerwear})
                </button>
              </div>

              {/* Stock & Sort Dropdowns */}
              <div className="admin-dropdown-group">
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="admin-select-filter"
                >
                  <option value="all">Stock: All</option>
                  <option value="inStock">In Stock Only</option>
                  <option value="outOfStock">Sold Out Only</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="admin-select-filter"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Active Filter Indicators */}
            {(searchQuery || categoryFilter !== "all" || stockFilter !== "all") && (
              <div className="admin-active-filters-bar">
                <span>Filtered:</span>
                {categoryFilter !== "all" && (
                  <span className="admin-filter-chip">
                    Department: {categoryFilter}
                    <button type="button" onClick={() => setCategoryFilter("all")}>×</button>
                  </span>
                )}
                {stockFilter !== "all" && (
                  <span className="admin-filter-chip">
                    Stock: {stockFilter}
                    <button type="button" onClick={() => setStockFilter("all")}>×</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="admin-filter-chip">
                    &ldquo;{searchQuery}&rdquo;
                    <button type="button" onClick={() => setSearchQuery("")}>×</button>
                  </span>
                )}
                <button
                  type="button"
                  className="admin-reset-all-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                    setStockFilter("all");
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Empty States */}
            {products.length === 0 ? (
              <div className="admin-empty-state">
                <div className="admin-empty-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </div>
                <h3>No Products in Catalog</h3>
                <p>Use the editor on the left to add your first store piece.</p>
              </div>
              ) : visibleProducts.length === 0 ? (
              <div className="admin-empty-state">
                <div className="admin-empty-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3>No matching items</h3>
                <p>No products match your current search and filter settings.</p>
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                    setStockFilter("all");
                  }}
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* GRID VIEW */
              <div className="admin-product-cards-grid">
                  {visibleProducts.map((item) => {
                  const isCurrentlyEditing = editingId === item.id;
                  return (
                    <article
                      key={item.id}
                      className={`admin-product-card ${isCurrentlyEditing ? "is-editing" : ""}`}
                    >
                      <div className="admin-card-media">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div className="admin-card-no-img">No Image</div>
                        )}

                        {item.tag && (
                          <span className="admin-card-tag">{item.tag}</span>
                        )}

                        <button
                          type="button"
                          className={`admin-card-stock-pill ${item.inStock !== false ? "in-stock" : "out-of-stock"}`}
                          onClick={() => handleQuickToggleStock(item)}
                          title="Click to toggle stock status"
                          disabled={busy}
                        >
                          <span className="admin-stock-dot" />
                          {item.inStock !== false ? "In Stock" : "Sold Out"}
                        </button>
                      </div>

                      <div className="admin-card-content">
                        <div className="admin-card-meta">
                          <span className="admin-card-cat">{item.category}</span>
                          <span className="admin-card-dot">•</span>
                          <span className="admin-card-sub">{item.sub}</span>
                        </div>

                        <h3 className="admin-card-title">{item.name}</h3>

                        <div className="admin-card-price-row">
                          <span className="admin-card-price">
                            ₾{Number(item.price).toFixed(2)}
                          </span>
                          <Link
                            href={`/products/${item.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="admin-card-view-link"
                            title="View on storefront"
                          >
                            <span>Preview</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                            </svg>
                          </Link>
                        </div>

                        <p className="admin-card-desc">
                          {item.description || "No description provided."}
                        </p>

                        {/* Action Buttons */}
                        <div className="admin-card-actions">
                          <button
                            type="button"
                            className="admin-card-action-btn edit-btn"
                            onClick={() => handleStartEdit(item)}
                            disabled={busy}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            <span>{isCurrentlyEditing ? "Editing…" : "Edit"}</span>
                          </button>

                          <button
                            type="button"
                            className="admin-card-action-btn duplicate-btn"
                            onClick={() => handleDuplicate(item)}
                            disabled={busy}
                            title="Duplicate as new product draft"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            <span>Copy</span>
                          </button>

                          <button
                            type="button"
                            className="admin-card-action-btn delete-btn"
                            onClick={() => setProductToDelete(item)}
                            disabled={busy}
                            title="Delete product"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* TABLE VIEW */
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Department</th>
                      <th>Collection</th>
                      <th>Price</th>
                      <th>Badge</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {visibleProducts.map((item) => (
                      <tr key={item.id} className={editingId === item.id ? "is-editing-row" : ""}>
                        <td>
                          <div className="admin-table-product-cell">
                            <div className="admin-table-thumb">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="44px"
                                  style={{ objectFit: "cover" }}
                                />
                              ) : (
                                <span className="admin-no-thumb">—</span>
                              )}
                            </div>
                            <div className="admin-table-title-wrap">
                              <strong>{item.name}</strong>
                              <Link
                                href={`/products/${item.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="admin-table-slug"
                              >
                                /products/{item.slug} ↗
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="admin-badge-cat">{item.category}</span>
                        </td>
                        <td>{item.sub}</td>
                        <td>
                          <strong className="admin-table-price">
                            ₾{Number(item.price).toFixed(2)}
                          </strong>
                        </td>
                        <td>
                          {item.tag ? (
                            <span className="admin-tag-pill">{item.tag}</span>
                          ) : (
                            <span className="admin-dim-text">—</span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className={`admin-card-stock-pill ${item.inStock !== false ? "in-stock" : "out-of-stock"}`}
                            onClick={() => handleQuickToggleStock(item)}
                            disabled={busy}
                          >
                            <span className="admin-stock-dot" />
                            {item.inStock !== false ? "In Stock" : "Sold Out"}
                          </button>
                        </td>
                        <td>
                          <div className="admin-table-actions">
                            <button
                              type="button"
                              className="admin-icon-btn edit"
                              onClick={() => handleStartEdit(item)}
                              title="Edit"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="admin-icon-btn copy"
                              onClick={() => handleDuplicate(item)}
                              title="Duplicate"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="admin-icon-btn delete"
                              onClick={() => setProductToDelete(item)}
                              title="Delete"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
        </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
