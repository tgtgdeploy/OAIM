export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      tenants: {
        Row: {
          id: string;
          name: string;
          industry: "ecommerce" | "restaurant";
          status: "active" | "trial" | "suspended" | "cancelled";
          plan: "trial" | "starter" | "pro" | "business";
          owner_id: string;
          whatsapp_phone_id: string | null;
          whatsapp_token: string | null;
          logo_url: string | null;
          settings: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          industry: "ecommerce" | "restaurant";
          status?: "active" | "trial" | "suspended" | "cancelled";
          plan?: "trial" | "starter" | "pro" | "business";
          owner_id: string;
          whatsapp_phone_id?: string | null;
          whatsapp_token?: string | null;
          logo_url?: string | null;
          settings?: Record<string, unknown>;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          industry?: "ecommerce" | "restaurant";
          status?: "active" | "trial" | "suspended" | "cancelled";
          plan?: "trial" | "starter" | "pro" | "business";
          owner_id?: string;
          whatsapp_phone_id?: string | null;
          whatsapp_token?: string | null;
          logo_url?: string | null;
          settings?: Record<string, unknown>;
          created_at?: string;
        };
        Relationships: [];
      };
      tenant_users: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          role: "super_admin" | "tenant_owner" | "tenant_admin" | "staff" | "customer";
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id: string;
          role?: "super_admin" | "tenant_owner" | "tenant_admin" | "staff" | "customer";
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          user_id?: string;
          role?: "super_admin" | "tenant_owner" | "tenant_admin" | "staff" | "customer";
          created_at?: string;
        };
        Relationships: [];
      };
      contacts: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          phone: string;
          email: string | null;
          tags: string[];
          stage: "new_inquiry" | "quoted" | "follow_up" | "closed_won" | "closed_lost";
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          phone: string;
          email?: string | null;
          tags?: string[];
          stage?: "new_inquiry" | "quoted" | "follow_up" | "closed_won" | "closed_lost";
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          phone?: string;
          email?: string | null;
          tags?: string[];
          stage?: "new_inquiry" | "quoted" | "follow_up" | "closed_won" | "closed_lost";
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      conversations: {
        Row: {
          id: string;
          tenant_id: string;
          contact_id: string;
          last_message: string | null;
          last_message_at: string | null;
          unread_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          contact_id: string;
          last_message?: string | null;
          last_message_at?: string | null;
          unread_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          contact_id?: string;
          last_message?: string | null;
          last_message_at?: string | null;
          unread_count?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          tenant_id: string;
          direction: "inbound" | "outbound";
          content: string;
          message_type: "text" | "image" | "document" | "template";
          status: "sent" | "delivered" | "read" | "failed";
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          tenant_id: string;
          direction: "inbound" | "outbound";
          content: string;
          message_type?: "text" | "image" | "document" | "template";
          status?: "sent" | "delivered" | "read" | "failed";
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          tenant_id?: string;
          direction?: "inbound" | "outbound";
          content?: string;
          message_type?: "text" | "image" | "document" | "template";
          status?: "sent" | "delivered" | "read" | "failed";
          created_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          description: string | null;
          price: string;
          currency: string;
          stock: number | null;
          category: string | null;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          description?: string | null;
          price: string;
          currency?: string;
          stock?: number | null;
          category?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          description?: string | null;
          price?: string;
          currency?: string;
          stock?: number | null;
          category?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          tenant_id: string;
          contact_id: string;
          status: "draft" | "confirmed" | "shipped" | "completed" | "cancelled";
          total: string;
          currency: string;
          items: Record<string, unknown>[];
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          contact_id: string;
          status?: "draft" | "confirmed" | "shipped" | "completed" | "cancelled";
          total: string;
          currency?: string;
          items?: Record<string, unknown>[];
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          contact_id?: string;
          status?: "draft" | "confirmed" | "shipped" | "completed" | "cancelled";
          total?: string;
          currency?: string;
          items?: Record<string, unknown>[];
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      follow_ups: {
        Row: {
          id: string;
          tenant_id: string;
          contact_id: string;
          contact_name: string | null;
          type: "manual" | "automated";
          message: string;
          scheduled_at: string;
          status: "pending" | "completed" | "overdue" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          contact_id: string;
          contact_name?: string | null;
          type?: "manual" | "automated";
          message: string;
          scheduled_at: string;
          status?: "pending" | "completed" | "overdue" | "cancelled";
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          contact_id?: string;
          contact_name?: string | null;
          type?: "manual" | "automated";
          message?: string;
          scheduled_at?: string;
          status?: "pending" | "completed" | "overdue" | "cancelled";
          created_at?: string;
        };
        Relationships: [];
      };
      plans: {
        Row: {
          id: string;
          name: string;
          tier: "trial" | "starter" | "pro" | "business";
          price_monthly: string;
          features: string[];
          limits: Record<string, unknown>;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          tier: "trial" | "starter" | "pro" | "business";
          price_monthly: string;
          features?: string[];
          limits?: Record<string, unknown>;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          tier?: "trial" | "starter" | "pro" | "business";
          price_monthly?: string;
          features?: string[];
          limits?: Record<string, unknown>;
          is_active?: boolean;
        };
        Relationships: [];
      };
      feature_flags: {
        Row: {
          id: string;
          key: string;
          name: string;
          description: string | null;
          icon: string | null;
          is_core: boolean;
          is_enabled: boolean;
          plans: string[];
        };
        Insert: {
          id?: string;
          key: string;
          name: string;
          description?: string | null;
          icon?: string | null;
          is_core?: boolean;
          is_enabled?: boolean;
          plans?: string[];
        };
        Update: {
          id?: string;
          key?: string;
          name?: string;
          description?: string | null;
          icon?: string | null;
          is_core?: boolean;
          is_enabled?: boolean;
          plans?: string[];
        };
        Relationships: [];
      };
      case_studies: {
        Row: {
          id: string;
          title: string;
          industry: "ecommerce" | "restaurant";
          description: string;
          metrics: Record<string, unknown>;
          screenshots: string[];
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          industry: "ecommerce" | "restaurant";
          description: string;
          metrics?: Record<string, unknown>;
          screenshots?: string[];
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          industry?: "ecommerce" | "restaurant";
          description?: string;
          metrics?: Record<string, unknown>;
          screenshots?: string[];
          is_published?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      webhook_logs: {
        Row: {
          id: string;
          tenant_id: string;
          event_type: string;
          payload: Record<string, unknown>;
          status: "success" | "failed";
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          event_type: string;
          payload?: Record<string, unknown>;
          status: "success" | "failed";
          error_message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          event_type?: string;
          payload?: Record<string, unknown>;
          status?: "success" | "failed";
          error_message?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      support_tickets: {
        Row: {
          id: string;
          tenant_id: string;
          from_name: string | null;
          subject: string;
          description: string;
          status: "open" | "in_progress" | "resolved" | "closed";
          priority: "low" | "medium" | "high" | "urgent";
          channel: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          from_name?: string | null;
          subject: string;
          description: string;
          status?: "open" | "in_progress" | "resolved" | "closed";
          priority?: "low" | "medium" | "high" | "urgent";
          channel?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          from_name?: string | null;
          subject?: string;
          description?: string;
          status?: "open" | "in_progress" | "resolved" | "closed";
          priority?: "low" | "medium" | "high" | "urgent";
          channel?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      campaigns: {
        Row: {
          id: string;
          tenant_id: string | null;
          name: string;
          platform: string;
          status: "active" | "paused" | "draft" | "completed";
          budget: string;
          spent: string;
          leads: number;
          cost_per_lead: string | null;
          roas: string | null;
          currency: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          name: string;
          platform?: string;
          status?: "active" | "paused" | "draft" | "completed";
          budget?: string;
          spent?: string;
          leads?: number;
          cost_per_lead?: string | null;
          roas?: string | null;
          currency?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          name?: string;
          platform?: string;
          status?: "active" | "paused" | "draft" | "completed";
          budget?: string;
          spent?: string;
          leads?: number;
          cost_per_lead?: string | null;
          roas?: string | null;
          currency?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      automations: {
        Row: {
          id: string;
          tenant_id: string | null;
          name: string;
          type: "trigger" | "sequence" | "scheduled" | "ai";
          description: string | null;
          is_enabled: boolean;
          tenants_using: number;
          fired_count: number;
          is_template: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          name: string;
          type?: "trigger" | "sequence" | "scheduled" | "ai";
          description?: string | null;
          is_enabled?: boolean;
          tenants_using?: number;
          fired_count?: number;
          is_template?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          name?: string;
          type?: "trigger" | "sequence" | "scheduled" | "ai";
          description?: string | null;
          is_enabled?: boolean;
          tenants_using?: number;
          fired_count?: number;
          is_template?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      referrals: {
        Row: {
          id: string;
          tenant_id: string | null;
          customer_name: string | null;
          referral_count: number;
          conversions: number;
          commission: string;
          earned: string;
          reward: string | null;
          currency: string;
          status: "active" | "pending" | "paused" | "completed";
          context: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          customer_name?: string | null;
          referral_count?: number;
          conversions?: number;
          commission?: string;
          earned?: string;
          reward?: string | null;
          currency?: string;
          status?: "active" | "pending" | "paused" | "completed";
          context?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          customer_name?: string | null;
          referral_count?: number;
          conversions?: number;
          commission?: string;
          earned?: string;
          reward?: string | null;
          currency?: string;
          status?: "active" | "pending" | "paused" | "completed";
          context?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      landing_pages: {
        Row: {
          id: string;
          tenant_id: string | null;
          name: string;
          status: "published" | "draft" | "archived";
          visits: number;
          conversions: number;
          template: "ecommerce" | "restaurant";
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          name: string;
          status?: "published" | "draft" | "archived";
          visits?: number;
          conversions?: number;
          template: "ecommerce" | "restaurant";
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          name?: string;
          status?: "published" | "draft" | "archived";
          visits?: number;
          conversions?: number;
          template?: "ecommerce" | "restaurant";
          updated_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      design_assets: {
        Row: {
          id: string;
          name: string;
          type: string;
          format: string;
          uses: number;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          format: string;
          uses?: number;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          format?: string;
          uses?: number;
          image_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      industry_templates: {
        Row: {
          id: string;
          key: string;
          label: string;
          industry: "ecommerce" | "restaurant";
          version: string;
          components: Record<string, unknown>[];
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          label: string;
          industry: "ecommerce" | "restaurant";
          version?: string;
          components?: Record<string, unknown>[];
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          label?: string;
          industry?: "ecommerce" | "restaurant";
          version?: string;
          components?: Record<string, unknown>[];
          updated_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      appointments: {
        Row: {
          id: string;
          tenant_id: string | null;
          client_name: string;
          service: string;
          therapist: string | null;
          date: string;
          time: string;
          duration: string | null;
          status: "pending" | "confirmed" | "completed" | "cancelled";
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          client_name: string;
          service: string;
          therapist?: string | null;
          date: string;
          time: string;
          duration?: string | null;
          status?: "pending" | "confirmed" | "completed" | "cancelled";
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          client_name?: string;
          service?: string;
          therapist?: string | null;
          date?: string;
          time?: string;
          duration?: string | null;
          status?: "pending" | "confirmed" | "completed" | "cancelled";
          created_at?: string;
        };
        Relationships: [];
      };
      reservations: {
        Row: {
          id: string;
          tenant_id: string | null;
          guest_name: string;
          date: string;
          time: string;
          pax: number;
          table_label: string | null;
          status: "pending" | "confirmed" | "seated" | "completed" | "cancelled";
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          guest_name: string;
          date: string;
          time: string;
          pax?: number;
          table_label?: string | null;
          status?: "pending" | "confirmed" | "seated" | "completed" | "cancelled";
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          guest_name?: string;
          date?: string;
          time?: string;
          pax?: number;
          table_label?: string | null;
          status?: "pending" | "confirmed" | "seated" | "completed" | "cancelled";
          note?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      staff: {
        Row: {
          id: string;
          tenant_id: string | null;
          name: string;
          role: string | null;
          specialties: string[];
          rating: string | null;
          today_bookings: number;
          weekly_hours: number;
          status: "available" | "busy" | "off";
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          name: string;
          role?: string | null;
          specialties?: string[];
          rating?: string | null;
          today_bookings?: number;
          weekly_hours?: number;
          status?: "available" | "busy" | "off";
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          name?: string;
          role?: string | null;
          specialties?: string[];
          rating?: string | null;
          today_bookings?: number;
          weekly_hours?: number;
          status?: "available" | "busy" | "off";
          created_at?: string;
        };
        Relationships: [];
      };
      restaurant_tables: {
        Row: {
          id: string;
          tenant_id: string | null;
          table_number: string;
          seats: number;
          zone: string;
          status: "available" | "occupied" | "reserved" | "cleaning";
          guest_name: string | null;
          occupied_since: string | null;
          reserved_time: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          table_number: string;
          seats?: number;
          zone?: string;
          status?: "available" | "occupied" | "reserved" | "cleaning";
          guest_name?: string | null;
          occupied_since?: string | null;
          reserved_time?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          table_number?: string;
          seats?: number;
          zone?: string;
          status?: "available" | "occupied" | "reserved" | "cleaning";
          guest_name?: string | null;
          occupied_since?: string | null;
          reserved_time?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      shipments: {
        Row: {
          id: string;
          tenant_id: string | null;
          order_id: string | null;
          customer_name: string;
          courier: string | null;
          tracking_number: string | null;
          destination: string | null;
          status: "pending" | "shipped" | "in_transit" | "completed" | "returned";
          shipped_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          order_id?: string | null;
          customer_name: string;
          courier?: string | null;
          tracking_number?: string | null;
          destination?: string | null;
          status?: "pending" | "shipped" | "in_transit" | "completed" | "returned";
          shipped_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          order_id?: string | null;
          customer_name?: string;
          courier?: string | null;
          tracking_number?: string | null;
          destination?: string | null;
          status?: "pending" | "shipped" | "in_transit" | "completed" | "returned";
          shipped_date?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      deliveries: {
        Row: {
          id: string;
          tenant_id: string | null;
          order_id: string | null;
          customer_name: string;
          address: string | null;
          rider: string | null;
          status: "pending" | "confirmed" | "delivering" | "completed" | "failed";
          eta: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          order_id?: string | null;
          customer_name: string;
          address?: string | null;
          rider?: string | null;
          status?: "pending" | "confirmed" | "delivering" | "completed" | "failed";
          eta?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          order_id?: string | null;
          customer_name?: string;
          address?: string | null;
          rider?: string | null;
          status?: "pending" | "confirmed" | "delivering" | "completed" | "failed";
          eta?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      transactions: {
        Row: {
          id: string;
          tenant_id: string | null;
          order_id: string | null;
          customer_name: string;
          amount: string;
          currency: string;
          method: string;
          status: "pending" | "success" | "failed" | "refunded";
          transaction_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          order_id?: string | null;
          customer_name: string;
          amount: string;
          currency?: string;
          method: string;
          status?: "pending" | "success" | "failed" | "refunded";
          transaction_date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          order_id?: string | null;
          customer_name?: string;
          amount?: string;
          currency?: string;
          method?: string;
          status?: "pending" | "success" | "failed" | "refunded";
          transaction_date?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      ai_logs: {
        Row: {
          id: string;
          tenant_id: string;
          tenant_name: string | null;
          model: string;
          tokens: number;
          latency_ms: number | null;
          status: "success" | "failed";
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          tenant_name?: string | null;
          model?: string;
          tokens?: number;
          latency_ms?: number | null;
          status: "success" | "failed";
          error_message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          tenant_name?: string | null;
          model?: string;
          tokens?: number;
          latency_ms?: number | null;
          status?: "success" | "failed";
          error_message?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: "super_admin" | "tenant_owner" | "tenant_admin" | "staff" | "customer";
      industry_template: "ecommerce" | "restaurant";
      tenant_status: "active" | "trial" | "suspended" | "cancelled";
      plan_tier: "trial" | "starter" | "pro" | "business";
      pipeline_stage: "new_inquiry" | "quoted" | "follow_up" | "closed_won" | "closed_lost";
      order_status: "draft" | "confirmed" | "shipped" | "completed" | "cancelled";
      follow_up_status: "pending" | "completed" | "overdue" | "cancelled";
      message_direction: "inbound" | "outbound";
      message_type: "text" | "image" | "document" | "template";
      message_status: "sent" | "delivered" | "read" | "failed";
      follow_up_type: "manual" | "automated";
      webhook_status: "success" | "failed";
      ticket_status: "open" | "in_progress" | "resolved" | "closed";
      ticket_priority: "low" | "medium" | "high" | "urgent";
      campaign_status: "active" | "paused" | "draft" | "completed";
      automation_type: "trigger" | "sequence" | "scheduled" | "ai";
      referral_status: "active" | "pending" | "paused" | "completed";
      landing_page_status: "published" | "draft" | "archived";
      appointment_status: "pending" | "confirmed" | "completed" | "cancelled";
      reservation_status: "pending" | "confirmed" | "seated" | "completed" | "cancelled";
      staff_status: "available" | "busy" | "off";
      table_status: "available" | "occupied" | "reserved" | "cleaning";
      shipment_status: "pending" | "shipped" | "in_transit" | "completed" | "returned";
      delivery_status: "pending" | "confirmed" | "delivering" | "completed" | "failed";
      transaction_status: "pending" | "success" | "failed" | "refunded";
    };
  };
}

// Convenience type helpers
type Tables = Database["public"]["Tables"];
export type TableName = keyof Tables;
export type Row<T extends TableName> = Tables[T]["Row"];
export type Insert<T extends TableName> = Tables[T]["Insert"];
export type Update<T extends TableName> = Tables[T]["Update"];
