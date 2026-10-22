import { Banknote, Camera, Heart, MapPinned, Package, ShoppingBag, type LucideIcon } from "lucide-react";
import type { IconKey } from "@/lib/types";

export const brandIcons: Record<IconKey, LucideIcon> = {
  bag: ShoppingBag,
  camera: Camera,
  money: Banknote,
  heart: Heart,
  box: Package,
  map: MapPinned,
};
