export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      nft_collections: {
        Row: {
          collection_description: string | null
          collection_image: string | null
          collection_name: string | null
          collection_tiplink: string | null
          created_at: string
          creator_email: string | null
          id: number
          project_id: number | null
        }
        Insert: {
          collection_description?: string | null
          collection_image?: string | null
          collection_name?: string | null
          collection_tiplink?: string | null
          created_at?: string
          creator_email?: string | null
          id?: number
          project_id?: number | null
        }
        Update: {
          collection_description?: string | null
          collection_image?: string | null
          collection_name?: string | null
          collection_tiplink?: string | null
          created_at?: string
          creator_email?: string | null
          id?: number
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nft_collections_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      nfts: {
        Row: {
          collection_id: number | null
          created_at: string
          id: number
          nft_description: string | null
          nft_image: string | null
          nft_name: string | null
          nft_price: number | null
          project_id: number | null
        }
        Insert: {
          collection_id?: number | null
          created_at?: string
          id?: number
          nft_description?: string | null
          nft_image?: string | null
          nft_name?: string | null
          nft_price?: number | null
          project_id?: number | null
        }
        Update: {
          collection_id?: number | null
          created_at?: string
          id?: number
          nft_description?: string | null
          nft_image?: string | null
          nft_name?: string | null
          nft_price?: number | null
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nfts_collection_id_fkey"
            columns: ["collection_id"]
            referencedRelation: "nft_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfts_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          created_at: string
          creator_id: string | null
          creator_image: string | null
          creator_name: string | null
          end_date: string | null
          id: number
          project_description: string | null
          project_funding: number
          project_goal: number
          project_image: string | null
          project_name: string | null
          project_num_supporters: number | null
          sphere_product_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          creator_image?: string | null
          creator_name?: string | null
          end_date?: string | null
          id?: number
          project_description?: string | null
          project_funding?: number
          project_goal?: number
          project_image?: string | null
          project_name?: string | null
          project_num_supporters?: number | null
          sphere_product_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          creator_image?: string | null
          creator_name?: string | null
          end_date?: string | null
          id?: number
          project_description?: string | null
          project_funding?: number
          project_goal?: number
          project_image?: string | null
          project_name?: string | null
          project_num_supporters?: number | null
          sphere_product_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_creator_id_fkey"
            columns: ["creator_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
