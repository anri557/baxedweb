import CategoryPageClient from "@/app/components/CategoryPageClient";

export const metadata = {
  title: "Tops — BASED",
  description:
    "Shop high-performance menswear tops, heavyweight tees, tailored oxford shirts, fine knitwear, and sleeveless essentials.",
};

export default function TopsPage() {
  return <CategoryPageClient categoryType="tops" />;
}
