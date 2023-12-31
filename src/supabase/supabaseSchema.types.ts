export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          id: string;
          postId: string;
          userId: string;
        };
        Insert: {
          id?: string;
          postId: string;
          userId: string;
        };
        Update: {
          id?: string;
          postId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmarks_postId_fkey';
            columns: ['postId'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookmarks_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      co_authors: {
        Row: {
          id: string;
          postId: string;
          userId: string;
        };
        Insert: {
          id?: string;
          postId: string;
          userId: string;
        };
        Update: {
          id?: string;
          postId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'co_authors_postId_fkey';
            columns: ['postId'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'co_authors_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      comments: {
        Row: {
          avatar_url: string | null;
          content: string;
          created_at: string;
          id: string;
          nickname: string | null;
          postId: string;
          type: number;
          userId: string;
        };
        Insert: {
          avatar_url?: string | null;
          content: string;
          created_at?: string;
          id?: string;
          nickname?: string | null;
          postId: string;
          type: number;
          userId: string;
        };
        Update: {
          avatar_url?: string | null;
          content?: string;
          created_at?: string;
          id?: string;
          nickname?: string | null;
          postId?: string;
          type?: number;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_postId_fkey';
            columns: ['postId'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      likes: {
        Row: {
          id: string;
          postId: string;
          userId: string;
        };
        Insert: {
          id?: string;
          postId: string;
          userId: string;
        };
        Update: {
          id?: string;
          postId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_postId_fkey';
            columns: ['postId'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      posts: {
        Row: {
          author: string;
          category: string;
          contents: string;
          created_at: string;
          email: string | null;
          id: string;
          summary: string;
          thumbnail_url: string;
          title: string;
        };
        Insert: {
          author: string;
          category: string;
          contents: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          summary: string;
          thumbnail_url: string;
          title: string;
        };
        Update: {
          author?: string;
          category?: string;
          contents?: string;
          created_at?: string;
          email?: string | null;
          id?: string;
          summary?: string;
          thumbnail_url?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'posts_author_fkey';
            columns: ['author'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          avatar_url: string;
          email: string;
          id: string;
          nickname: string;
        };
        Insert: {
          avatar_url: string;
          email: string;
          id: string;
          nickname: string;
        };
        Update: {
          avatar_url?: string;
          email?: string;
          id?: string;
          nickname?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      notifications: {
        Row: {
          id: string;
          recipientUserId: string;
          type: string;
          checked: boolean;
          createdAt: string;
          actionUserNickname: string;
          postId: string;
        };
        Insert: {
          id?: string;
          recipientUserId: string;
          type: string;
          checked?: boolean;
          createdAt?: string;
          actionUserNickname: string;
          postId?: string;
        };
        Update: {
          id?: string;
          recipientUserId?: string;
          type?: string;
          checked?: boolean;
          createdAt?: string;
          actionUserNickname?: string;
          postId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notifications_recipientUserId_fkey';
            columns: ['recipientUserId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
export type TableKeys = keyof Database['public']['Tables'];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
