-- =============================================================================
-- OAIM Commercial Restructure Migration
-- =============================================================================
-- Adds: members, subscriptions, bot_configs, ai_conversations, ai_messages
-- Extends: users, tenants, ai_logs
-- =============================================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- Extend existing tables
-- ─────────────────────────────────────────────────────────────────────────────

-- users: trial + industry + platform fields
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS trial_start_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS trial_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS industry_type TEXT,
  ADD COLUMN IF NOT EXISTS bot_platform TEXT DEFAULT 'whatsapp';

-- tenants: expand industry enum, add telegram fields
-- Drop and recreate industry constraint to add new values
ALTER TABLE tenants
  DROP CONSTRAINT IF EXISTS tenants_industry_check;

ALTER TABLE tenants
  ADD CONSTRAINT tenants_industry_check
  CHECK (industry IN ('ecommerce', 'restaurant', 'fnb', 'beauty', 'service', 'quant'));

ALTER TABLE tenants
  ADD COLUMN IF NOT EXISTS telegram_bot_token TEXT,
  ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;

-- ai_logs: add request_type field
ALTER TABLE ai_logs
  ADD COLUMN IF NOT EXISTS request_type TEXT;

-- ─────────────────────────────────────────────────────────────────────────────
-- New tables
-- ─────────────────────────────────────────────────────────────────────────────

-- Members / Leads table
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  tags TEXT[] DEFAULT '{}',
  tier TEXT DEFAULT 'free',
  total_spent NUMERIC(12,2) DEFAULT 0,
  referral_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  plan_id UUID REFERENCES plans(id),
  status TEXT NOT NULL DEFAULT 'trialing',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_start_at TIMESTAMPTZ DEFAULT now(),
  trial_expires_at TIMESTAMPTZ DEFAULT now() + INTERVAL '7 days',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Bot Configs table
CREATE TABLE IF NOT EXISTS bot_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  platform TEXT NOT NULL DEFAULT 'whatsapp',
  system_prompt TEXT,
  industry_type TEXT NOT NULL,
  welcome_message TEXT,
  is_active BOOLEAN DEFAULT false,
  openclaw_agent_id TEXT,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI Conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  contact_id UUID REFERENCES contacts(id),
  member_id UUID REFERENCES members(id),
  title TEXT,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- AI Messages table
CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id),
  role TEXT NOT NULL DEFAULT 'user',
  content TEXT NOT NULL,
  actions JSONB,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_members_tenant ON members(tenant_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_tenant ON subscriptions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_bot_configs_tenant ON bot_configs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_tenant ON ai_conversations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_ai_messages_conversation ON ai_messages(conversation_id);

COMMIT;
