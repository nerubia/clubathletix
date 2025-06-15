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
      athlete_payments: {
        Row: {
          athlete_id: number
          athlete_registration_id: number | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          installment_no: number | null
          organization_id: number
          payment_amount: number | null
          payment_date: string | null
          payment_due: number | null
          payment_due_date: string | null
          payment_method: string | null
          payment_status: string | null
          program_id: number | null
          transaction_reference: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id: number
          athlete_registration_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          installment_no?: number | null
          organization_id: number
          payment_amount?: number | null
          payment_date?: string | null
          payment_due?: number | null
          payment_due_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          program_id?: number | null
          transaction_reference?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number
          athlete_registration_id?: number | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          installment_no?: number | null
          organization_id?: number
          payment_amount?: number | null
          payment_date?: string | null
          payment_due?: number | null
          payment_due_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          program_id?: number | null
          transaction_reference?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_payments_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_athlete_registration_id_fkey"
            columns: ["athlete_registration_id"]
            isOneToOne: false
            referencedRelation: "athlete_registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_payments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_registrations: {
        Row: {
          athlete_id: number
          coupon_code: string | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          discount_amount: number | null
          id: number
          organization_id: number
          payment_mode: string | null
          payment_status: string | null
          program_id: number
          registration_date: string | null
          total_amount_due: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id: number
          coupon_code?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          discount_amount?: number | null
          id?: number
          organization_id: number
          payment_mode?: string | null
          payment_status?: string | null
          program_id: number
          registration_date?: string | null
          total_amount_due?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number
          coupon_code?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          discount_amount?: number | null
          id?: number
          organization_id?: number
          payment_mode?: string | null
          payment_status?: string | null
          program_id?: number
          registration_date?: string | null
          total_amount_due?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_registrations_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_registrations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_registrations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_registrations_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_registrations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athletes: {
        Row: {
          created_at: string
          created_by: number | null
          customer_id: number | null
          date_of_birth: string
          deleted_at: string | null
          first_name: string | null
          full_name: string
          gender: string | null
          id: number
          last_name: string | null
          media_release: boolean
          photo: string | null
          profile_slug: string | null
          profile_url: string | null
          subscription_code: string | null
          updated_at: string | null
          updated_by: number | null
          user_id: number | null
          wants_kit: boolean | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          customer_id?: number | null
          date_of_birth: string
          deleted_at?: string | null
          first_name?: string | null
          full_name: string
          gender?: string | null
          id?: number
          last_name?: string | null
          media_release?: boolean
          photo?: string | null
          profile_slug?: string | null
          profile_url?: string | null
          subscription_code?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
          wants_kit?: boolean | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          customer_id?: number | null
          date_of_birth?: string
          deleted_at?: string | null
          first_name?: string | null
          full_name?: string
          gender?: string | null
          id?: number
          last_name?: string | null
          media_release?: boolean
          photo?: string | null
          profile_slug?: string | null
          profile_url?: string | null
          subscription_code?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
          wants_kit?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "athletes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athletes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athletes_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athletes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          athlete_id: number | null
          coupon_code: string
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          discount_amount: number | null
          discount_mode: string
          discount_percentage: number | null
          id: number
          is_active: boolean | null
          name: string
          organization_id: number | null
          program_id: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          athlete_id?: number | null
          coupon_code: string
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_mode: string
          discount_percentage?: number | null
          id?: number
          is_active?: boolean | null
          name: string
          organization_id?: number | null
          program_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          athlete_id?: number | null
          coupon_code?: string
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_mode?: string
          discount_percentage?: number | null
          id?: number
          is_active?: boolean | null
          name?: string
          organization_id?: number | null
          program_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "coupons_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupons_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupons_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupons_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      credentials: {
        Row: {
          created_at: string
          email: string | null
          email_hash: string
          password_hash: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          email_hash: string
          password_hash: string
        }
        Update: {
          created_at?: string
          email?: string | null
          email_hash?: string
          password_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "credentials_email_fkey"
            columns: ["email"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["email"]
          },
        ]
      }
      currencies: {
        Row: {
          created_at: string
          created_by: number | null
          currency_code: string
          decimal_places: number
          deleted_at: string | null
          id: number
          is_active: boolean | null
          name: string
          symbol: string
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          currency_code: string
          decimal_places?: number
          deleted_at?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          symbol: string
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          currency_code?: string
          decimal_places?: number
          deleted_at?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          symbol?: string
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "currencies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "currencies_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          city_town: string
          country: string
          created_at: string
          created_by: number | null
          deleted_at: string | null
          email: string
          first_name: string | null
          full_name: string
          id: number
          last_name: string | null
          otp: number | null
          phone: string
          postal_zip_code: string
          state_province: string
          street_1: string
          street_2: string | null
          updated_at: string | null
          updated_by: number | null
          user_id: number | null
        }
        Insert: {
          city_town: string
          country: string
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email: string
          first_name?: string | null
          full_name: string
          id?: number
          last_name?: string | null
          otp?: number | null
          phone: string
          postal_zip_code: string
          state_province: string
          street_1: string
          street_2?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
        }
        Update: {
          city_town?: string
          country?: string
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email?: string
          first_name?: string | null
          full_name?: string
          id?: number
          last_name?: string | null
          otp?: number | null
          phone?: string
          postal_zip_code?: string
          state_province?: string
          street_1?: string
          street_2?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_updated_by_fkey1"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      domains: {
        Row: {
          created_at: string
          id: number
          name: string | null
          organization_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          organization_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          organization_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "domains_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      household_users: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          household_id: number
          id: number
          role: string | null
          updated_at: string | null
          updated_by: number | null
          user_id: number
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          household_id: number
          id?: number
          role?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id: number
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          household_id?: number
          id?: number
          role?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "household_users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_users_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: true
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_users_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      households: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          id: number
          name: string
          organizer_user_id: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          name: string
          organizer_user_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          name?: string
          organizer_user_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "households_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "households_organizer_user_id_fkey"
            columns: ["organizer_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
      media_components: {
        Row: {
          created_at: string
          id: number
          organization_id: number
          segment_index: number
          segment_name: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          organization_id: number
          segment_index?: number
          segment_name?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          organization_id?: number
          segment_index?: number
          segment_name?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_components_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
      organization_users: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          id: number
          organization_id: number
          role: string
          updated_at: string | null
          updated_by: number | null
          user_id: number
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          organization_id: number
          role?: string
          updated_at?: string | null
          updated_by?: number | null
          user_id: number
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          id?: number
          organization_id?: number
          role?: string
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "organization_users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_users_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          administrator_id: number
          city_town: string
          colours: string | null
          country: string
          created_at: string
          created_by: number | null
          currency_code: string | null
          deleted_at: string | null
          email: string
          id: number
          is_active: boolean
          logo_url: string | null
          name: string
          organization_type: string
          phone: string
          postal_zip_code: string
          short_name: string | null
          slug: string | null
          state_province: string | null
          street_1: string
          street_2: string | null
          subdomain: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          administrator_id?: number
          city_town: string
          colours?: string | null
          country: string
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          email: string
          id?: number
          is_active?: boolean
          logo_url?: string | null
          name: string
          organization_type?: string
          phone: string
          postal_zip_code: string
          short_name?: string | null
          slug?: string | null
          state_province?: string | null
          street_1: string
          street_2?: string | null
          subdomain?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          administrator_id?: number
          city_town?: string
          colours?: string | null
          country?: string
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          email?: string
          id?: number
          is_active?: boolean
          logo_url?: string | null
          name?: string
          organization_type?: string
          phone?: string
          postal_zip_code?: string
          short_name?: string | null
          slug?: string | null
          state_province?: string | null
          street_1?: string
          street_2?: string | null
          subdomain?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_administrator_id_fkey"
            columns: ["administrator_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["currency_code"]
          },
          {
            foreignKeyName: "organizations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      parents: {
        Row: {
          city_town: string | null
          country: string | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          email_notifications: boolean | null
          first_name: string | null
          full_name: string | null
          id: number
          last_name: string | null
          otp: number | null
          postal_zip_code: string | null
          relationship: string
          state_province: string | null
          street_1: string | null
          street_2: string | null
          updated_at: string | null
          updated_by: number | null
          user_id: number | null
          whatsapp_notifications: boolean | null
        }
        Insert: {
          city_town?: string | null
          country?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email_notifications?: boolean | null
          first_name?: string | null
          full_name?: string | null
          id?: number
          last_name?: string | null
          otp?: number | null
          postal_zip_code?: string | null
          relationship: string
          state_province?: string | null
          street_1?: string | null
          street_2?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
          whatsapp_notifications?: boolean | null
        }
        Update: {
          city_town?: string | null
          country?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email_notifications?: boolean | null
          first_name?: string | null
          full_name?: string | null
          id?: number
          last_name?: string | null
          otp?: number | null
          postal_zip_code?: string | null
          relationship?: string
          state_province?: string | null
          street_1?: string | null
          street_2?: string | null
          updated_at?: string | null
          updated_by?: number | null
          user_id?: number | null
          whatsapp_notifications?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "parents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parents_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          athlete_id: number
          created_at: string
          id: string
          url: string
        }
        Insert: {
          athlete_id: number
          created_at?: string
          id: string
          url: string
        }
        Update: {
          athlete_id?: number
          created_at?: string
          id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      program_fee_installments: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          installment_amount: number
          installment_due_date: string | null
          installment_no: number
          organization_id: number
          program_fee_id: number
          program_id: number
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          installment_amount: number
          installment_due_date?: string | null
          installment_no: number
          organization_id: number
          program_fee_id: number
          program_id: number
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          installment_amount?: number
          installment_due_date?: string | null
          installment_no?: number
          organization_id?: number
          program_fee_id?: number
          program_id?: number
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_fee_installments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fee_installments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fee_installments_program_fee_id_fkey"
            columns: ["program_fee_id"]
            isOneToOne: false
            referencedRelation: "program_fees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fee_installments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fee_installments_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      program_fees: {
        Row: {
          created_at: string
          created_by: number | null
          currency_code: string | null
          deleted_at: string | null
          description: string | null
          fee: number | null
          fee_end_date: string | null
          fee_start_date: string | null
          id: number
          installment_available: boolean | null
          name: string | null
          organization_id: number
          program_id: number
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          description?: string | null
          fee?: number | null
          fee_end_date?: string | null
          fee_start_date?: string | null
          id?: number
          installment_available?: boolean | null
          name?: string | null
          organization_id: number
          program_id: number
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          currency_code?: string | null
          deleted_at?: string | null
          description?: string | null
          fee?: number | null
          fee_end_date?: string | null
          fee_start_date?: string | null
          id?: number
          installment_available?: boolean | null
          name?: string | null
          organization_id?: number
          program_id?: number
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_fees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fees_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["currency_code"]
          },
          {
            foreignKeyName: "program_fees_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fees_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_fees_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          birth_year_from: string | null
          birth_year_to: string | null
          coaches: string[] | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_active: boolean
          max_age: number | null
          min_age: number | null
          name: string | null
          organization_id: number | null
          registration_end_date: string | null
          registration_start_date: string | null
          schedule_id: number | null
          season_id: number | null
          slug: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          birth_year_from?: string | null
          birth_year_to?: string | null
          coaches?: string[] | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean
          max_age?: number | null
          min_age?: number | null
          name?: string | null
          organization_id?: number | null
          registration_end_date?: string | null
          registration_start_date?: string | null
          schedule_id?: number | null
          season_id?: number | null
          slug?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          birth_year_from?: string | null
          birth_year_to?: string | null
          coaches?: string[] | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean
          max_age?: number | null
          min_age?: number | null
          name?: string | null
          organization_id?: number | null
          registration_end_date?: string | null
          registration_start_date?: string | null
          schedule_id?: number | null
          season_id?: number | null
          slug?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "programs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
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
          index: number | null
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
          index?: number | null
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
          index?: number | null
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
      seasons: {
        Row: {
          created_at: string
          created_by: number | null
          deleted_at: string | null
          description: string | null
          end_date: string | null
          id: number
          is_active: boolean | null
          name: string | null
          organization_id: number | null
          start_date: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          is_active?: boolean | null
          name?: string | null
          organization_id?: number | null
          start_date?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          is_active?: boolean | null
          name?: string | null
          organization_id?: number | null
          start_date?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "seasons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seasons_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seasons_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
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
      users: {
        Row: {
          activated_at: string | null
          city_town: string | null
          country: string | null
          created_at: string
          created_by: number | null
          deleted_at: string | null
          email: string | null
          first_name: string | null
          household_id: number | null
          id: number
          is_activated: boolean | null
          is_locked: boolean | null
          last_name: string | null
          login_attempt: number | null
          password_hash: string | null
          password_reset_expiry: string | null
          password_reset_token: string | null
          phone: string | null
          postal_zip_code: string | null
          registration_verification_token: string | null
          role: string | null
          state_province: string | null
          street_1: string | null
          street_2: string | null
          stripe_customer_id: string | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          activated_at?: string | null
          city_town?: string | null
          country?: string | null
          created_at: string
          created_by?: number | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          household_id?: number | null
          id?: number
          is_activated?: boolean | null
          is_locked?: boolean | null
          last_name?: string | null
          login_attempt?: number | null
          password_hash?: string | null
          password_reset_expiry?: string | null
          password_reset_token?: string | null
          phone?: string | null
          postal_zip_code?: string | null
          registration_verification_token?: string | null
          role?: string | null
          state_province?: string | null
          street_1?: string | null
          street_2?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          activated_at?: string | null
          city_town?: string | null
          country?: string | null
          created_at?: string
          created_by?: number | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          household_id?: number | null
          id?: number
          is_activated?: boolean | null
          is_locked?: boolean | null
          last_name?: string | null
          login_attempt?: number | null
          password_hash?: string | null
          password_reset_expiry?: string | null
          password_reset_token?: string | null
          phone?: string | null
          postal_zip_code?: string | null
          registration_verification_token?: string | null
          role?: string | null
          state_province?: string | null
          street_1?: string | null
          street_2?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
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
      user_role: "Super Admin" | "Org Admin" | "User"
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
    Enums: {
      user_role: ["Super Admin", "Org Admin", "User"],
    },
  },
} as const
