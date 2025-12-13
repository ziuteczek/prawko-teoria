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
      ai_requests: {
        Row: {
          cost: number
          created_at: string
          id: string
          profile_id: string
          question_id: number
          response_id: string
          user_question: string
        }
        Insert: {
          cost: number
          created_at?: string
          id?: string
          profile_id: string
          question_id: number
          response_id: string
          user_question: string
        }
        Update: {
          cost?: number
          created_at?: string
          id?: string
          profile_id?: string
          question_id?: number
          response_id?: string
          user_question?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "ai_requests_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      answers: {
        Row: {
          answer: string | null
          created_at: string
          profile_id: string
          question_id: number
        }
        Insert: {
          answer?: string | null
          created_at?: string
          profile_id: string
          question_id: number
        }
        Update: {
          answer?: string | null
          created_at?: string
          profile_id?: string
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "answer_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
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
          profile_picture_path: string
          subscription_expires_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          profile_picture_path: string
          subscription_expires_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          profile_picture_path?: string
          subscription_expires_at?: string | null
          user_id?: string
          username?: string
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
      ai_request_count_last_month: {
        Args: { p_profile_id: string }
        Returns: number
      }
      extend_user_subscription: {
        Args: { p_days: number; p_profile_id: string }
        Returns: undefined
      }
      get_correct_answers_count: {
        Args: { p_profile_id: string }
        Returns: number
      }
      get_incorrect_or_unanswered_questions: {
        Args: {
          p_category_id: number
          p_limit: number
          p_profile_id: string
          p_question_ignore: number[]
        }
        Returns: {
          answer: string
          answerA: string
          answerB: string
          answerC: string
          categoryId: number
          content: string
          correctAnswer: string
          createdAt: string
          deAnswerA: string
          deAnswerB: string
          deAnswerC: string
          deQuestion: string
          engAnswerA: string
          engAnswerB: string
          engAnswerC: string
          engQuestion: string
          explanation: string
          id: number
          media: string
          profileId: string
          questionId: number
          uaAnswerA: string
          uaAnswerB: string
          uaAnswerC: string
          uaQuestion: string
        }[]
      }
      get_user_stats: {
        Args: { p_user_id: string }
        Returns: {
          categoryId: number
          categoryTitle: string
          correctAnswers: number
          incorrectAnswers: number
          totalQuestions: number
        }[]
      }
      is_active_subscriber: { Args: never; Returns: boolean }
      upsert_answer: {
        Args: { p_answer: string; p_profile_id: string; p_question_id: number }
        Returns: undefined
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
