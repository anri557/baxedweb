import CategoryPageClient from "@/app/components/CategoryPageClient";

export const metadata = {
  title: "Outerwear — BAXED",
  description:
    "Shop premium menswear outerwear, matte shell bomber jackets, tailored wool overcoats, canvas overshirts, and heavyweight fleece hoodies.",
};

export default function OuterwearPage() {
  return <CategoryPageClient categoryType="outerwear" />;
}
