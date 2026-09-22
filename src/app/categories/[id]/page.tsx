import Link from "next/link";
import { ArrowLeft, Folder } from "lucide-react";
import { notFound } from "next/navigation";
import { fetCategoryById, fetSubcategories } from '@/api/services/categoriesApi';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubcategoriesPage({ params }: PageProps) {
  const { id } = await params;

  let category;
  let subcategories;

  try {
    [category, subcategories] = await Promise.all([
      fetCategoryById(id),
      fetSubcategories(id),
    ]);
  } catch (error) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/categories"
        className="mb-4 inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Categories
      </Link>

      <h1 className="mb-6 text-lg font-bold text-gray-700">
        {subcategories.length} Subcategories in {category.name}
      </h1>

      {subcategories.length === 0 ? (
        <p className="text-secondary">No subcategories found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              className="group flex flex-col gap-4 rounded-2xl border border-transparent bg-white p-5 shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-primary">
                <Folder size={20} />
              </div>

              <span className="font-semibold text-gray-700 transition-colors group-hover:text-primary">
                {sub.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}