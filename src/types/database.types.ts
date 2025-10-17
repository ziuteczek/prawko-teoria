export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      answers: {
        Row: {
          answer: string
          created_at: string
          id: number
          profile_id: string
          question_id: number
        }
        Insert: {
          answer: string
          created_at?: string
          id?: number
          profile_id: string
          question_id: number
        }
        Update: {
          answer?: string
          created_at?: string
          id?: number
          profile_id?: string
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "answer_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: number
          title: string
        }
        Insert: {
          id: number
          title: string
        }
        Update: {
          id?: number
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          subscription_expires_at: string | null
          username: string | null
        }
        Insert: {
          id: string
          subscription_expires_at?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          subscription_expires_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      question_type: {
        Row: {
          question_id: number
          type_id: number
        }
        Insert: {
          question_id: number
          type_id: number
        }
        Update: {
          question_id?: number
          type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_categoryx_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_type_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "types"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          answer_a: string | null
          answer_b: string | null
          answer_c: string | null
          category_id: number
          content: string
          correct_answer: string
          de_answer_a: string | null
          de_answer_b: string | null
          de_answer_c: string | null
          de_question: string | null
          eng_answer_a: string | null
          eng_answer_b: string | null
          eng_answer_c: string | null
          eng_question: string | null
          explanation: string | null
          id: number
          media: string | null
          ua_answer_a: string | null
          ua_answer_b: string | null
          ua_answer_c: string | null
          ua_question: string | null
        }
        Insert: {
          answer_a?: string | null
          answer_b?: string | null
          answer_c?: string | null
          category_id: number
          content: string
          correct_answer: string
          de_answer_a?: string | null
          de_answer_b?: string | null
          de_answer_c?: string | null
          de_question?: string | null
          eng_answer_a?: string | null
          eng_answer_b?: string | null
          eng_answer_c?: string | null
          eng_question?: string | null
          explanation?: string | null
          id?: number
          media?: string | null
          ua_answer_a?: string | null
          ua_answer_b?: string | null
          ua_answer_c?: string | null
          ua_question?: string | null
        }
        Update: {
          answer_a?: string | null
          answer_b?: string | null
          answer_c?: string | null
          category_id?: number
          content?: string
          correct_answer?: string
          de_answer_a?: string | null
          de_answer_b?: string | null
          de_answer_c?: string | null
          de_question?: string | null
          eng_answer_a?: string | null
          eng_answer_b?: string | null
          eng_answer_c?: string | null
          eng_question?: string | null
          explanation?: string | null
          id?: number
          media?: string | null
          ua_answer_a?: string | null
          ua_answer_b?: string | null
          ua_answer_c?: string | null
          ua_question?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      types: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_unanswered_or_incorrect_questions: {
        Args: { category_id: number; max_questions: number; user_uuid: string }
        Returns: {
          answerA: string
          answerB: string
          answerC: string
          categoryID: number
          categoryName: string
          content: string
          correctAnswer: string
          mediaSrc: string
          questionID: number
        }[]
      }
      is_active_subscriber: {
        Args: Record<PropertyKey, never>
        Returns: boolean
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
