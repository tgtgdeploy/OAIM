import { supabase } from '@/lib/supabase';
import type { Industry } from '@/lib/industry-context';

interface RegisterTenantParams {
  userId: string;
  businessName: string;
  industry: Industry;
  phone?: string;
}

interface RegisterTenantResult {
  tenantId: string;
  error: string | null;
}

export async function registerTenant(params: RegisterTenantParams): Promise<RegisterTenantResult> {
  const { userId, businessName, industry, phone } = params;

  // 1. Create tenant
  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .insert({
      name: businessName,
      industry,
      status: 'active',
      plan: 'trial',
      owner_id: userId,
      whatsapp_phone_id: phone || null,
      settings: { timezone: 'Asia/Kuala_Lumpur', language: 'en' },
    })
    .select('id')
    .single();

  if (tenantError || !tenant) {
    return { tenantId: '', error: tenantError?.message ?? 'Failed to create tenant' };
  }

  const tenantId = tenant.id;

  // 2. Create tenant_user (role = tenant_owner)
  const { error: tuError } = await supabase
    .from('tenant_users')
    .insert({
      tenant_id: tenantId,
      user_id: userId,
      role: 'tenant_owner',
    });

  if (tuError) {
    return { tenantId, error: tuError.message };
  }

  // 3. Create trial subscription
  const trialPlanId = 'b0000000-0000-0000-0000-000000000001'; // Trial plan from seed
  const now = new Date();
  const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await supabase.from('subscriptions').insert({
    tenant_id: tenantId,
    plan_id: trialPlanId,
    status: 'trialing',
    trial_start_at: now.toISOString(),
    trial_expires_at: trialEnd.toISOString(),
    current_period_start: now.toISOString(),
    current_period_end: trialEnd.toISOString(),
  });

  // 4. Create default bot_config
  const industryPrompts: Record<Industry, { prompt: string; welcome: string }> = {
    ecommerce: {
      prompt: `You are a helpful e-commerce sales assistant for ${businessName}. Help customers find the right products, provide pricing info, and close sales.`,
      welcome: `Hi! Welcome to ${businessName}. How can I help you today?`,
    },
    fnb: {
      prompt: `You are a helpful restaurant assistant for ${businessName}. Help guests with reservations, menu inquiries, and orders.`,
      welcome: `Welcome to ${businessName}! How can I help you?`,
    },
    beauty: {
      prompt: `You are a helpful beauty salon assistant for ${businessName}. Help clients book appointments and recommend treatments.`,
      welcome: `Hi! Welcome to ${businessName}. How can I help you today?`,
    },
  };

  const prompts = industryPrompts[industry];
  await supabase.from('bot_configs').insert({
    tenant_id: tenantId,
    platform: 'whatsapp',
    system_prompt: prompts.prompt,
    industry_type: industry,
    welcome_message: prompts.welcome,
    is_active: true,
    config: { tone: 'friendly', goal: 'close_sales', language: 'en' },
  });

  return { tenantId, error: null };
}
