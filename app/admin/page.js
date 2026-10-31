import AdminClient from "./AdminClient";

export const metadata = {
  title: "Store Admin — BAXED",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminClient />;
}
