import Link from "next/link";

export const metadata = {
  title: "Order confirmed — BAXED",
  description: "Your BAXED order has been submitted successfully.",
};

export default function OrderSuccessPage() {
  return (
    <main className="order-success-page">
      <section className="order-success-card" aria-labelledby="order-success-title">
        <div className="order-success-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="m6 12.5 4 4L18.5 8" />
          </svg>
        </div>
        <p className="order-success-eyebrow">BAXED ORDER</p>
        <h1 id="order-success-title">Thank you for your order!</h1>
        <p className="order-success-copy">
          Your checkout details have been submitted successfully. We’ll be in touch with the next steps.
        </p>
        <Link className="order-success-link" href="/">
          Continue shopping
        </Link>
      </section>
    </main>
  );
}
