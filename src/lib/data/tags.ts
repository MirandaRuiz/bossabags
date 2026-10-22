/** Etiquetas de caché. El admin las invalida al guardar cambios. */
export const tags = {
  settings: "settings",
  products: "products",
  product: (slug: string) => `product:${slug}`,
  brands: "brands",
  categories: "categories",
} as const;
