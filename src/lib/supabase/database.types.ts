// Generado desde Supabase (supabase gen types typescript). No editar a mano.
// Para regenerar: npm run db:types

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
        }
        Insert: {
          created_at?: string
          email: string
        }
        Update: {
          created_at?: string
          email?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      product_events: {
        Row: {
          created_at: string
          id: number
          product_id: string
          type: Database["public"]["Enums"]["product_event_type"]
        }
        Insert: {
          created_at?: string
          id?: never
          product_id: string
          type: Database["public"]["Enums"]["product_event_type"]
        }
        Update: {
          created_at?: string
          id?: never
          product_id?: string
          type?: Database["public"]["Enums"]["product_event_type"]
        }
        Relationships: [
          {
            foreignKeyName: "product_events_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand_id: string | null
          category_id: string | null
          compare_at_price: number | null
          created_at: string
          description: string
          id: string
          images: string[]
          instagram_post_url: string | null
          is_featured: boolean
          is_new: boolean
          name: string
          price: number
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["product_status"]
          updated_at: string
        }
        Insert: {
          brand_id?: string | null
          category_id?: string | null
          compare_at_price?: number | null
          created_at?: string
          description?: string
          id?: string
          images?: string[]
          instagram_post_url?: string | null
          is_featured?: boolean
          is_new?: boolean
          name: string
          price: number
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["product_status"]
          updated_at?: string
        }
        Update: {
          brand_id?: string | null
          category_id?: string | null
          compare_at_price?: number | null
          created_at?: string
          description?: string
          id?: string
          images?: string[]
          instagram_post_url?: string | null
          is_featured?: boolean
          is_new?: boolean
          name?: string
          price?: number
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["product_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          account_holder: string
          account_number: string
          account_type: string
          bank_name: string
          business_name: string
          delivery_time_text: string
          hero_image_url: string | null
          hero_subtitle: string
          hero_title_line1: string
          hero_title_line2: string
          id: boolean
          instagram_handle: string
          logo_url: string | null
          order_steps: Json
          purchase_policies: Json
          shipping_cost: number
          updated_at: string
          whatsapp_number: string
        }
        Insert: {
          account_holder?: string
          account_number?: string
          account_type?: string
          bank_name?: string
          business_name?: string
          delivery_time_text?: string
          hero_image_url?: string | null
          hero_subtitle?: string
          hero_title_line1?: string
          hero_title_line2?: string
          id?: boolean
          instagram_handle?: string
          logo_url?: string | null
          order_steps?: Json
          purchase_policies?: Json
          shipping_cost?: number
          updated_at?: string
          whatsapp_number?: string
        }
        Update: {
          account_holder?: string
          account_number?: string
          account_type?: string
          bank_name?: string
          business_name?: string
          delivery_time_text?: string
          hero_image_url?: string | null
          hero_subtitle?: string
          hero_title_line1?: string
          hero_title_line2?: string
          id?: boolean
          instagram_handle?: string
          logo_url?: string | null
          order_steps?: Json
          purchase_policies?: Json
          shipping_cost?: number
          updated_at?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      product_event_type: "view" | "whatsapp_click"
      product_status: "disponible" | "agotado" | "proximamente"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database["public"]

export type Tables<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Row"]
export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"]
export type Enums<T extends keyof PublicSchema["Enums"]> = PublicSchema["Enums"][T]

export const Constants = {
  public: {
    Enums: {
      product_event_type: ["view", "whatsapp_click"],
      product_status: ["disponible", "agotado", "proximamente"],
    },
  },
} as const
