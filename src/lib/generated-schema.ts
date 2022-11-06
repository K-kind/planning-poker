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
      players: {
        Row: {
          id: string;
          room_id: string;
          name: string;
          number: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          room_id: string;
          name: string;
          number?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          room_id?: string;
          name?: string;
          number?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      rooms: {
        Row: {
          id: string;
          card_status: Database["public"]["Enums"]["card_status"];
          cards: number[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          card_status?: Database["public"]["Enums"]["card_status"];
          cards?: number[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          card_status?: Database["public"]["Enums"]["card_status"];
          cards?: number[];
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
