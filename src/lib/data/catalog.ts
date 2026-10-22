import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { Brand, Category, Product } from "@/lib/types";
import { tags } from "./tags";

const productSelect = "*, brand:brands(id, name, slug), category:categories(id, name, slug)";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  status: Product["status"];
  is_featured: boolean;
  is_new: boolean;
  instagram_post_url: string | null;
  images: string[];
  created_at: string;
  brand: Brand | null;
  category: Category | null;
};

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price === null ? null : Number(row.compare_at_price),
    status: row.status,
    isFeatured: row.is_featured,
    isNew: row.is_new,
    instagramPostUrl: row.instagram_post_url,
    images: row.images ?? [],
    brand: row.brand,
    category: row.category,
    createdAt: row.created_at,
  };
}

/** Todos los productos, en el orden definido en el admin. */
export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("days");
  cacheTag(tags.products);

  const { data, error } = await createPublicClient()
    .from("products")
    .select(productSelect)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .returns<ProductRow[]>();

  if (error) throw new Error(`No se pudieron cargar los productos: ${error.message}`);
  return data.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("days");
  cacheTag(tags.products, tags.product(slug));

  const { data, error } = await createPublicClient()
    .from("products")
    .select(productSelect)
    .eq("slug", slug)
    .returns<ProductRow[]>()
    .maybeSingle();

  if (error) throw new Error(`No se pudo cargar el producto: ${error.message}`);
  return data ? toProduct(data) : null;
}

export async function getBrands(): Promise<Brand[]> {
  "use cache";
  cacheLife("days");
  cacheTag(tags.brands);

  const { data, error } = await createPublicClient()
    .from("brands")
    .select("id, name, slug")
    .order("sort_order")
    .order("name");

  if (error) throw new Error(`No se pudieron cargar las marcas: ${error.message}`);
  return data;
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("days");
  cacheTag(tags.categories);

  const { data, error } = await createPublicClient()
    .from("categories")
    .select("id, name, slug")
    .order("sort_order")
    .order("name");

  if (error) throw new Error(`No se pudieron cargar las categorías: ${error.message}`);
  return data;
}
