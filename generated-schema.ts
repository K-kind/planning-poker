export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      room_users: {
        Row: {
          id: number;
          room_id: string;
          user_id: string;
        };
        Insert: {
          id?: number;
          room_id: string;
          user_id: string;
        };
        Update: {
          id?: number;
          room_id?: string;
          user_id?: string;
        };
      };
      rooms: {
        Row: {
          id: string;
          name: string;
          card_status: Database["public"]["Enums"]["card_status"];
          cards: number[];
          players: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          card_status?: Database["public"]["Enums"]["card_status"];
          cards?: number[];
          players?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          card_status?: Database["public"]["Enums"]["card_status"];
          cards?: number[];
          players?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      card_status: "hidden" | "open";
    };
  };
}
