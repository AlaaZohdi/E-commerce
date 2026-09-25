import { notFound } from "next/navigation";
import { fetSubcategoryById } from "@/api/services/categoriesApi";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SubcategoryPage({
  params,
}: PageProps) {
  const { id } = await params;

  let subcategory;

  try {
    subcategory = await fetSubcategoryById(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-700">
        {subcategory.name}
      </h1>
    </div>
  );
}