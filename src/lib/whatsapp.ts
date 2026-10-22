import type { Product } from "@/lib/types";
import { formatPrice, siteUrl, whatsappUrl } from "@/lib/utils";

/** Mensaje prellenado para pedir un producto por WhatsApp. */
export function productOrderMessage(product: Pick<Product, "name" | "price" | "slug" | "brand">) {
  const brand = product.brand?.name ? `${product.brand.name} ` : "";
  return `¡Hola Bossa! 👜 Me interesa: ${brand}${product.name} – ${formatPrice(product.price)}. ¿Está disponible? ${siteUrl(`/producto/${product.slug}`)}`;
}

export function productOrderUrl(
  phone: string,
  product: Pick<Product, "name" | "price" | "slug" | "brand">,
) {
  return whatsappUrl(phone, productOrderMessage(product));
}
