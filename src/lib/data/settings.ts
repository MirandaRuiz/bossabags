import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { Json } from "@/lib/supabase/database.types";
import type { IconKey, OrderStep, PurchasePolicy, SiteSettings } from "@/lib/types";
import { siteDefaults } from "@/lib/site";
import { tags } from "./tags";

const iconKeys: IconKey[] = ["bag", "camera", "money", "heart", "box", "map"];

function asIcon(value: unknown): IconKey {
  return iconKeys.includes(value as IconKey) ? (value as IconKey) : "bag";
}

function isRecord(v: Json): v is { [key: string]: Json | undefined } {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function parseSteps(json: Json): OrderStep[] {
  if (!Array.isArray(json)) return [];
  return json.filter(isRecord).map((s) => ({
    icon: asIcon(s.icon),
    title: String(s.title ?? ""),
    items: Array.isArray(s.items) ? s.items.map(String) : undefined,
  }));
}

function parsePolicies(json: Json): PurchasePolicy[] {
  if (!Array.isArray(json)) return [];
  return json.filter(isRecord).map((p) => ({
    icon: asIcon(p.icon),
    title: String(p.title ?? ""),
    text: String(p.text ?? ""),
  }));
}

const fallback: SiteSettings = {
  businessName: siteDefaults.businessName,
  logoUrl: siteDefaults.logoUrl,
  whatsappNumber: siteDefaults.whatsappNumber,
  instagramHandle: siteDefaults.instagramHandle,
  heroTitleLine1: "Bolsas originales",
  heroTitleLine2: "de diseñador",
  heroSubtitle: "",
  heroImageUrl: null,
  bankName: "",
  accountType: "",
  accountNumber: "",
  accountHolder: "",
  shippingCost: siteDefaults.shippingCost,
  deliveryTimeText: siteDefaults.deliveryTimeText,
  orderSteps: [],
  purchasePolicies: [],
};

export async function getSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("days");
  cacheTag(tags.settings);

  const { data, error } = await createPublicClient()
    .from("settings")
    .select("*")
    .eq("id", true)
    .maybeSingle();

  if (error || !data) {
    console.error("No se pudo leer la configuración:", error?.message ?? "sin fila");
    return fallback;
  }

  return {
    businessName: data.business_name,
    logoUrl: data.logo_url,
    whatsappNumber: data.whatsapp_number,
    instagramHandle: data.instagram_handle,
    heroTitleLine1: data.hero_title_line1,
    heroTitleLine2: data.hero_title_line2,
    heroSubtitle: data.hero_subtitle,
    heroImageUrl: data.hero_image_url,
    bankName: data.bank_name,
    accountType: data.account_type,
    accountNumber: data.account_number,
    accountHolder: data.account_holder,
    shippingCost: Number(data.shipping_cost),
    deliveryTimeText: data.delivery_time_text,
    orderSteps: parseSteps(data.order_steps),
    purchasePolicies: parsePolicies(data.purchase_policies),
  };
}
