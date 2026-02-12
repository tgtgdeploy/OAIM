export type UserRole = "super_admin" | "tenant_owner" | "tenant_admin" | "staff" | "customer";

export type IndustryTemplate = "ecommerce" | "restaurant";

export type TenantStatus = "active" | "trial" | "suspended" | "cancelled";

export type PlanTier = "trial" | "starter" | "pro" | "business";

export type PipelineStage = "new_inquiry" | "quoted" | "follow_up" | "closed_won" | "closed_lost";

export type OrderStatus = "draft" | "confirmed" | "shipped" | "completed" | "cancelled";

export type FollowUpStatus = "pending" | "completed" | "overdue" | "cancelled";

export interface Tenant {
  id: string;
  name: string;
  industry: IndustryTemplate;
  status: TenantStatus;
  plan: PlanTier;
  owner_id: string;
  whatsapp_phone_id?: string;
  whatsapp_token?: string;
  logo_url?: string;
  settings: Record<string, unknown>;
  created_at: string;
}

export interface TenantUser {
  id: string;
  tenant_id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Contact {
  id: string;
  tenant_id: string;
  name: string;
  phone: string;
  email?: string;
  tags: string[];
  stage: PipelineStage;
  notes?: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  tenant_id: string;
  contact_id: string;
  last_message?: string;
  last_message_at?: string;
  unread_count: number;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  tenant_id: string;
  direction: "inbound" | "outbound";
  content: string;
  message_type: "text" | "image" | "document" | "template";
  status: "sent" | "delivered" | "read" | "failed";
  created_at: string;
}

export interface Product {
  id: string;
  tenant_id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  stock?: number;
  category?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  tenant_id: string;
  contact_id: string;
  status: OrderStatus;
  total: number;
  currency: string;
  items: OrderItem[];
  notes?: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface FollowUp {
  id: string;
  tenant_id: string;
  contact_id: string;
  contact_name?: string;
  type: "manual" | "automated";
  message: string;
  scheduled_at: string;
  status: FollowUpStatus;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  tier: PlanTier;
  price_monthly: number;
  features: string[];
  limits: Record<string, number>;
  is_active: boolean;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description?: string;
  plans: PlanTier[];
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: IndustryTemplate;
  description: string;
  metrics: Record<string, string>;
  screenshots: string[];
  is_published: boolean;
  created_at: string;
}

export interface WebhookLog {
  id: string;
  tenant_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  status: "success" | "failed";
  error_message?: string;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  tenant_id: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  created_at: string;
}

export const MODULE_KEYS = {
  WHATSAPP_INBOX: "whatsapp_inbox",
  AI_SALES_SCRIPT: "ai_sales_script",
  CRM_PIPELINE: "crm_pipeline",
  AUTO_FOLLOWUP: "auto_followup",
  ERP_LITE: "erp_lite",
  META_ADS: "meta_ads",
  TEAM_MULTI_ACCOUNT: "team_multi_account",
} as const;

export const PLAN_FEATURES: Record<PlanTier, string[]> = {
  trial: [MODULE_KEYS.WHATSAPP_INBOX, MODULE_KEYS.AI_SALES_SCRIPT],
  starter: [MODULE_KEYS.WHATSAPP_INBOX, MODULE_KEYS.AI_SALES_SCRIPT, MODULE_KEYS.CRM_PIPELINE],
  pro: [MODULE_KEYS.WHATSAPP_INBOX, MODULE_KEYS.AI_SALES_SCRIPT, MODULE_KEYS.CRM_PIPELINE, MODULE_KEYS.AUTO_FOLLOWUP, MODULE_KEYS.ERP_LITE],
  business: [MODULE_KEYS.WHATSAPP_INBOX, MODULE_KEYS.AI_SALES_SCRIPT, MODULE_KEYS.CRM_PIPELINE, MODULE_KEYS.AUTO_FOLLOWUP, MODULE_KEYS.ERP_LITE, MODULE_KEYS.META_ADS, MODULE_KEYS.TEAM_MULTI_ACCOUNT],
};
