export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      athletes: {
        Row: {
          created_at: string
          customer_id: number
          date_of_birth: string
          full_name: string
          gender: string | null
          id: number
          media_release: boolean
          subscription_code: string | null
          wants_kit: boolean | null
        }
        Insert: {
          created_at?: string
          customer_id: number
          date_of_birth: string
          full_name: string
          gender?: string | null
          id?: number
          media_release?: boolean
          subscription_code?: string | null
          wants_kit?: boolean | null
        }
        Update: {
          created_at?: string
          customer_id?: number
          date_of_birth?: string
          full_name?: string
          gender?: string | null
          id?: number
          media_release?: boolean
          subscription_code?: string | null
          wants_kit?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "athletes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      credentials: {
        Row: {
          created_at: string
          email_hash: string
          password_hash: string
        }
        Insert: {
          created_at?: string
          email_hash: string
          password_hash: string
        }
        Update: {
          created_at?: string
          email_hash?: string
          password_hash?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          city_town: string
          country: string
          created_at: string
          email: string
          full_name: string
          id: number
          phone: string
          postal_zip_code: string
          state_province: string
          street_1: string
          street_2: string | null
        }
        Insert: {
          city_town: string
          country: string
          created_at?: string
          email: string
          full_name: string
          id?: number
          phone: string
          postal_zip_code: string
          state_province: string
          street_1: string
          street_2?: string | null
        }
        Update: {
          city_town?: string
          country?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: number
          phone?: string
          postal_zip_code?: string
          state_province?: string
          street_1?: string
          street_2?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          city_town: string
          country: string
          created_at: string
          id: number
          name: string
          postal_zip_code: string
          state_province: string
          street_1: string
          street_2: string | null
        }
        Insert: {
          city_town: string
          country: string
          created_at?: string
          id?: number
          name: string
          postal_zip_code: string
          state_province: string
          street_1: string
          street_2?: string | null
        }
        Update: {
          city_town?: string
          country?: string
          created_at?: string
          id?: number
          name?: string
          postal_zip_code?: string
          state_province?: string
          street_1?: string
          street_2?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          created_at: string
          email: string
          id: number
          is_active: boolean
          organization_id: number
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          is_active?: boolean
          organization_id: number
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          is_active?: boolean
          organization_id?: number
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_email_fkey"
            columns: ["email"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          administrator_id: number
          city_town: string
          country: string
          created_at: string
          email: string
          id: number
          is_active: boolean
          name: string
          organization_type: string
          phone: string
          postal_zip_code: string
          street_1: string
          street_2: string | null
        }
        Insert: {
          administrator_id?: number
          city_town: string
          country: string
          created_at?: string
          email: string
          id?: number
          is_active?: boolean
          name: string
          organization_type?: string
          phone: string
          postal_zip_code: string
          street_1: string
          street_2?: string | null
        }
        Update: {
          administrator_id?: number
          city_town?: string
          country?: string
          created_at?: string
          email?: string
          id?: number
          is_active?: boolean
          name?: string
          organization_type?: string
          phone?: string
          postal_zip_code?: string
          street_1?: string
          street_2?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_administrator_id_fkey"
            columns: ["administrator_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          coaches: string[] | null
          created_at: string
          description: string | null
          id: number
          image_url: string | null
          is_active: boolean
          max_age: number
          min_age: number
          name: string | null
          schedule_id: number
        }
        Insert: {
          coaches?: string[] | null
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean
          max_age?: number
          min_age?: number
          name?: string | null
          schedule_id: number
        }
        Update: {
          coaches?: string[] | null
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean
          max_age?: number
          min_age?: number
          name?: string | null
          schedule_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "programs_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          created_at: string
          ends_at: string | null
          fridays: string | null
          id: number
          is_active: boolean
          location_id: number
          mondays: string | null
          name: string
          organization_id: number
          saturdays: string | null
          starts_at: string
          sundays: string | null
          thursdays: string | null
          tuesdays: string | null
          wednesdays: string | null
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          fridays?: string | null
          id?: number
          is_active?: boolean
          location_id: number
          mondays?: string | null
          name: string
          organization_id: number
          saturdays?: string | null
          starts_at: string
          sundays?: string | null
          thursdays?: string | null
          tuesdays?: string | null
          wednesdays?: string | null
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          fridays?: string | null
          id?: number
          is_active?: boolean
          location_id?: number
          mondays?: string | null
          name?: string
          organization_id?: number
          saturdays?: string | null
          starts_at?: string
          sundays?: string | null
          thursdays?: string | null
          tuesdays?: string | null
          wednesdays?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedules_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          athlete_id: number
          code: string
          created_at: string
          id: number
          organization_id: number
          price: number
        }
        Insert: {
          athlete_id: number
          code: string
          created_at?: string
          id?: number
          organization_id: number
          price?: number
        }
        Update: {
          athlete_id?: number
          code?: string
          created_at?: string
          id?: number
          organization_id?: number
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "pricing_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          author_description: string
          body: string
          created_at: string
          customer_id: number
          feature: boolean
          id: number
          organization_id: number
        }
        Insert: {
          author_description: string
          body: string
          created_at?: string
          customer_id: number
          feature?: boolean
          id?: number
          organization_id?: number
        }
        Update: {
          author_description?: string
          body?: string
          created_at?: string
          customer_id?: number
          feature?: boolean
          id?: number
          organization_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
