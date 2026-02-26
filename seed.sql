-- =============================================================================
-- OAIM Demo Seed Data
-- =============================================================================
-- Run this in Supabase SQL Editor to populate all 27 tables with demo data.
-- Uses fixed UUIDs and relative dates (NOW() - interval) so data stays fresh.
-- Currency: MYR (Malaysian Ringgit)
-- =============================================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- LAYER 1: No dependencies
-- ─────────────────────────────────────────────────────────────────────────────

-- USERS (3 records)
INSERT INTO users (id, email, full_name, avatar_url, created_at) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'owner@oaim.demo', 'Ahmad Razif', NULL, NOW() - INTERVAL '90 days'),
  ('a0000000-0000-0000-0000-000000000002', 'staff@oaim.demo', 'Nurul Hana', NULL, NOW() - INTERVAL '60 days'),
  ('a0000000-0000-0000-0000-000000000099', 'admin@oaim.demo', 'Super Admin', NULL, NOW())
ON CONFLICT (id) DO NOTHING;

-- PLANS (4 records)
INSERT INTO plans (id, name, tier, price_monthly, features, limits, is_active) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Trial', 'trial', '0', ARRAY['whatsapp_basic','crm_basic','5_contacts'], '{"contacts": 5, "messages_per_day": 10}'::jsonb, TRUE),
  ('b0000000-0000-0000-0000-000000000002', 'Starter', 'starter', '99', ARRAY['whatsapp_basic','crm_full','campaigns','500_contacts'], '{"contacts": 500, "messages_per_day": 100}'::jsonb, TRUE),
  ('b0000000-0000-0000-0000-000000000003', 'Pro', 'pro', '249', ARRAY['whatsapp_advanced','crm_full','campaigns','automations','ai_basic','5000_contacts'], '{"contacts": 5000, "messages_per_day": 1000}'::jsonb, TRUE),
  ('b0000000-0000-0000-0000-000000000004', 'Business', 'business', '499', ARRAY['whatsapp_advanced','crm_full','campaigns','automations','ai_advanced','unlimited_contacts','api_access'], '{"contacts": -1, "messages_per_day": -1}'::jsonb, TRUE)
ON CONFLICT (id) DO NOTHING;

-- FEATURE_FLAGS (8 records)
INSERT INTO feature_flags (id, key, name, description, icon, is_core, is_enabled, plans) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'whatsapp', 'WhatsApp Messaging', 'Send and receive WhatsApp messages', 'MessageSquare', TRUE, TRUE, ARRAY['trial','starter','pro','business']),
  ('c0000000-0000-0000-0000-000000000002', 'crm', 'CRM Pipeline', 'Contact management and sales pipeline', 'Users', TRUE, TRUE, ARRAY['trial','starter','pro','business']),
  ('c0000000-0000-0000-0000-000000000003', 'campaigns', 'Ad Campaigns', 'Manage marketing campaigns', 'Megaphone', FALSE, TRUE, ARRAY['starter','pro','business']),
  ('c0000000-0000-0000-0000-000000000004', 'automations', 'Automations', 'Workflow automation engine', 'Zap', FALSE, TRUE, ARRAY['pro','business']),
  ('c0000000-0000-0000-0000-000000000005', 'ai_assistant', 'AI Assistant', 'AI-powered reply suggestions and summaries', 'Bot', FALSE, TRUE, ARRAY['pro','business']),
  ('c0000000-0000-0000-0000-000000000006', 'landing_pages', 'Landing Pages', 'Create marketing landing pages', 'Layout', FALSE, TRUE, ARRAY['starter','pro','business']),
  ('c0000000-0000-0000-0000-000000000007', 'referrals', 'Referral Program', 'Customer referral tracking', 'Gift', FALSE, TRUE, ARRAY['pro','business']),
  ('c0000000-0000-0000-0000-000000000008', 'api_access', 'API Access', 'REST API and webhook integrations', 'Code', FALSE, TRUE, ARRAY['business'])
ON CONFLICT (id) DO NOTHING;

-- DESIGN_ASSETS (5 records)
INSERT INTO design_assets (id, name, type, format, uses, image_url, created_at) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Hero Banner Template', 'banner', 'png', 42, 'https://placehold.co/1200x400/0ea5e9/white?text=Hero+Banner', NOW() - INTERVAL '30 days'),
  ('d0000000-0000-0000-0000-000000000002', 'Product Card Layout', 'template', 'svg', 28, 'https://placehold.co/400x300/8b5cf6/white?text=Product+Card', NOW() - INTERVAL '25 days'),
  ('d0000000-0000-0000-0000-000000000003', 'Restaurant Menu Template', 'template', 'png', 15, 'https://placehold.co/800x600/f97316/white?text=Menu+Template', NOW() - INTERVAL '20 days'),
  ('d0000000-0000-0000-0000-000000000004', 'Logo Pack - Minimal', 'logo', 'svg', 63, 'https://placehold.co/200x200/10b981/white?text=Logo', NOW() - INTERVAL '45 days'),
  ('d0000000-0000-0000-0000-000000000005', 'Social Media Kit', 'banner', 'webp', 37, 'https://placehold.co/1080x1080/ec4899/white?text=Social+Kit', NOW() - INTERVAL '15 days')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- LAYER 2: Depends on users
-- ─────────────────────────────────────────────────────────────────────────────

-- TENANTS (3 records)
INSERT INTO tenants (id, name, industry, status, plan, owner_id, whatsapp_phone_id, whatsapp_token, logo_url, settings, created_at) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'Kedai Gadget KL', 'ecommerce', 'active', 'pro',
   'a0000000-0000-0000-0000-000000000001', '601234567890', 'whsk_demo_token_ecom',
   'https://placehold.co/100x100/3b82f6/white?text=KG',
   '{"timezone": "Asia/Kuala_Lumpur", "language": "ms"}'::jsonb,
   NOW() - INTERVAL '80 days'),
  ('e0000000-0000-0000-0000-000000000002', 'Restoran Selera Kampung', 'fnb', 'active', 'business',
   'a0000000-0000-0000-0000-000000000001', '601234567891', 'whsk_demo_token_resto',
   'https://placehold.co/100x100/f97316/white?text=RS',
   '{"timezone": "Asia/Kuala_Lumpur", "language": "ms"}'::jsonb,
   NOW() - INTERVAL '70 days'),
  ('e0000000-0000-0000-0000-000000000003', 'Glow Beauty Spa', 'beauty', 'active', 'pro',
   'a0000000-0000-0000-0000-000000000001', '601234567892', 'whsk_demo_token_beauty',
   'https://placehold.co/100x100/ec4899/white?text=GB',
   '{"timezone": "Asia/Kuala_Lumpur", "language": "en"}'::jsonb,
   NOW() - INTERVAL '60 days')
ON CONFLICT (id) DO NOTHING;

-- INDUSTRY_TEMPLATES (3 records)
INSERT INTO industry_templates (id, key, label, industry, version, components, updated_at, created_at) VALUES
  ('f0000000-0000-0000-0000-000000000001', 'ecommerce_v1', 'E-Commerce Starter', 'ecommerce', '1.2.0',
   '[{"type": "hero", "title": "Shop Now"}, {"type": "product_grid", "columns": 3}, {"type": "testimonials"}, {"type": "footer"}]'::jsonb,
   NOW() - INTERVAL '10 days', NOW() - INTERVAL '60 days'),
  ('f0000000-0000-0000-0000-000000000002', 'fnb_v1', 'F&B / Restaurant Starter', 'fnb', '1.1.0',
   '[{"type": "hero", "title": "Welcome"}, {"type": "menu_section"}, {"type": "reservation_form"}, {"type": "map"}, {"type": "footer"}]'::jsonb,
   NOW() - INTERVAL '5 days', NOW() - INTERVAL '55 days'),
  ('f0000000-0000-0000-0000-000000000003', 'beauty_v1', 'Beauty & Wellness Starter', 'beauty', '1.0.0',
   '[{"type": "hero", "title": "Book Your Appointment"}, {"type": "services_grid"}, {"type": "therapists"}, {"type": "testimonials"}, {"type": "footer"}]'::jsonb,
   NOW(), NOW() - INTERVAL '30 days')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- LAYER 3: Depends on tenants + users
-- ─────────────────────────────────────────────────────────────────────────────

-- TENANT_USERS (5 records)
INSERT INTO tenant_users (id, tenant_id, user_id, role, created_at) VALUES
  ('10000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'tenant_owner', NOW() - INTERVAL '80 days'),
  ('10000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'tenant_owner', NOW() - INTERVAL '70 days'),
  ('10000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'staff', NOW() - INTERVAL '55 days'),
  ('10000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'tenant_owner', NOW() - INTERVAL '60 days'),
  ('10000000-0000-0000-0000-000000000099', 'e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000099', 'super_admin', NOW())
ON CONFLICT (id) DO NOTHING;

-- CONTACTS (12 records - 4 per tenant, different pipeline stages)
INSERT INTO contacts (id, tenant_id, name, phone, email, tags, stage, notes, created_at) VALUES
  -- Kedai Gadget KL contacts
  ('20000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'Tan Wei Ming', '+60123456001', 'weiming@example.com', ARRAY['vip','repeat'], 'closed_won', 'Loyal customer, bought 3 phones this year', NOW() - INTERVAL '45 days'),
  ('20000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'Siti Aminah', '+60123456002', 'siti.a@example.com', ARRAY['new'], 'new_inquiry', 'Asked about iPhone 15 Pro pricing', NOW() - INTERVAL '2 days'),
  ('20000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'Raj Kumar', '+60123456003', 'raj.k@example.com', ARRAY['wholesale'], 'quoted', 'Wants bulk pricing for 20 units', NOW() - INTERVAL '5 days'),
  ('20000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000001', 'Lee Mei Ling', '+60123456004', NULL, ARRAY['follow_up'], 'follow_up', 'Interested in Samsung Galaxy, comparing prices', NOW() - INTERVAL '3 days'),
  -- Restoran Selera Kampung contacts
  ('20000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000002', 'Mohd Faizal', '+60123456005', 'faizal@example.com', ARRAY['catering','corporate'], 'closed_won', 'Regular corporate catering orders', NOW() - INTERVAL '40 days'),
  ('20000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000002', 'Wong Siew Ping', '+60123456006', 'siewping@example.com', ARRAY['new'], 'new_inquiry', 'Enquired about private dining for 20 pax', NOW() - INTERVAL '1 day'),
  ('20000000-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000002', 'Aisha Binti Yusof', '+60123456007', NULL, ARRAY['event'], 'quoted', 'Wedding reception quotation sent', NOW() - INTERVAL '4 days'),
  ('20000000-0000-0000-0000-000000000008', 'e0000000-0000-0000-0000-000000000002', 'Lim Chee Keong', '+60123456008', 'limck@example.com', ARRAY['regular'], 'closed_lost', 'Chose competitor for Hari Raya event', NOW() - INTERVAL '15 days'),
  -- Glow Beauty Spa contacts
  ('20000000-0000-0000-0000-000000000009', 'e0000000-0000-0000-0000-000000000003', 'Nurul Aisyah', '+60123456009', 'aisyah@example.com', ARRAY['vip','regular'], 'closed_won', 'Monthly facial treatment customer', NOW() - INTERVAL '50 days'),
  ('20000000-0000-0000-0000-000000000010', 'e0000000-0000-0000-0000-000000000003', 'Jessica Tan', '+60123456010', 'jessica.t@example.com', ARRAY['new'], 'new_inquiry', 'Asked about hair treatment packages', NOW() - INTERVAL '1 day'),
  ('20000000-0000-0000-0000-000000000011', 'e0000000-0000-0000-0000-000000000003', 'Priya Nair', '+60123456011', 'priya.n@example.com', ARRAY['bridal'], 'quoted', 'Bridal package quotation for March wedding', NOW() - INTERVAL '3 days'),
  ('20000000-0000-0000-0000-000000000012', 'e0000000-0000-0000-0000-000000000003', 'Chen Mei Fong', '+60123456012', NULL, ARRAY['follow_up'], 'follow_up', 'Interested in body massage membership', NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

-- PRODUCTS (12 records - 4 per tenant)
INSERT INTO products (id, tenant_id, name, description, price, currency, stock, category, image_url, is_active, created_at) VALUES
  -- Kedai Gadget KL products
  ('30000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'iPhone 15 Pro Max 256GB', 'Latest Apple flagship with titanium frame', '5499.00', 'MYR', 12, 'Smartphones', 'https://placehold.co/400x400/1f2937/white?text=iPhone+15', NOW() - INTERVAL '30 days'),
  ('30000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'Samsung Galaxy S24 Ultra', 'AI-powered Samsung flagship with S Pen', '4999.00', 'MYR', 8, 'Smartphones', 'https://placehold.co/400x400/1f2937/white?text=Galaxy+S24', NOW() - INTERVAL '28 days'),
  ('30000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'AirPods Pro 2nd Gen', 'Active noise cancellation with USB-C', '1099.00', 'MYR', 25, 'Accessories', 'https://placehold.co/400x400/1f2937/white?text=AirPods', NOW() - INTERVAL '25 days'),
  ('30000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000001', 'iPad Air M2', '11-inch Liquid Retina display', '2999.00', 'MYR', 0, 'Tablets', 'https://placehold.co/400x400/1f2937/white?text=iPad+Air', NOW() - INTERVAL '20 days'),
  -- Restoran Selera Kampung products (menu items)
  ('30000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000002', 'Nasi Lemak Special', 'Nasi lemak with ayam goreng berempah, sambal, telur', '12.90', 'MYR', NULL, 'Main Course', 'https://placehold.co/400x400/f97316/white?text=Nasi+Lemak', NOW() - INTERVAL '50 days'),
  ('30000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000002', 'Mee Goreng Mamak', 'Classic mamak-style fried noodles', '10.90', 'MYR', NULL, 'Main Course', 'https://placehold.co/400x400/f97316/white?text=Mee+Goreng', NOW() - INTERVAL '50 days'),
  ('30000000-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000002', 'Teh Tarik', 'Pulled milk tea, the Malaysian classic', '3.50', 'MYR', NULL, 'Beverages', 'https://placehold.co/400x400/f97316/white?text=Teh+Tarik', NOW() - INTERVAL '50 days'),
  ('30000000-0000-0000-0000-000000000008', 'e0000000-0000-0000-0000-000000000002', 'Roti Canai Set', 'Flaky flatbread with dhal and sambal', '6.90', 'MYR', NULL, 'Main Course', 'https://placehold.co/400x400/f97316/white?text=Roti+Canai', NOW() - INTERVAL '50 days'),
  -- Glow Beauty Spa services
  ('30000000-0000-0000-0000-000000000009', 'e0000000-0000-0000-0000-000000000003', 'Signature Facial Treatment', 'Deep cleansing facial with hydration mask', '189.00', 'MYR', NULL, 'Facial', 'https://placehold.co/400x400/ec4899/white?text=Facial', NOW() - INTERVAL '55 days'),
  ('30000000-0000-0000-0000-000000000010', 'e0000000-0000-0000-0000-000000000003', 'Full Body Massage (60 min)', 'Relaxing aromatherapy full body massage', '159.00', 'MYR', NULL, 'Massage', 'https://placehold.co/400x400/ec4899/white?text=Massage', NOW() - INTERVAL '55 days'),
  ('30000000-0000-0000-0000-000000000011', 'e0000000-0000-0000-0000-000000000003', 'Hair Treatment Package', 'Keratin treatment with deep conditioning', '250.00', 'MYR', NULL, 'Hair', 'https://placehold.co/400x400/ec4899/white?text=Hair', NOW() - INTERVAL '55 days'),
  ('30000000-0000-0000-0000-000000000012', 'e0000000-0000-0000-0000-000000000003', 'Bridal Makeup Package', 'Complete bridal makeup with trial session', '1200.00', 'MYR', NULL, 'Bridal', 'https://placehold.co/400x400/ec4899/white?text=Bridal', NOW() - INTERVAL '55 days')
ON CONFLICT (id) DO NOTHING;

-- STAFF (6 records - 2 per tenant)
INSERT INTO staff (id, tenant_id, name, role, specialties, rating, today_bookings, weekly_hours, status, created_at) VALUES
  ('40000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'Ahmad Zikri', 'Sales Executive', ARRAY['smartphones','tablets'], '4.8', 3, 38, 'available', NOW() - INTERVAL '60 days'),
  ('40000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'Priya Devi', 'Technical Support', ARRAY['repairs','warranty'], '4.5', 2, 40, 'busy', NOW() - INTERVAL '55 days'),
  ('40000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'Chef Kamal', 'Head Chef', ARRAY['malay_cuisine','fusion'], '4.9', 0, 45, 'available', NOW() - INTERVAL '65 days'),
  ('40000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'Salmah', 'Floor Manager', ARRAY['service','events'], '4.7', 5, 42, 'busy', NOW() - INTERVAL '60 days'),
  ('40000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000003', 'Lisa Wong', 'Senior Therapist', ARRAY['facial','massage','body_treatment'], '4.9', 4, 40, 'busy', NOW() - INTERVAL '55 days'),
  ('40000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000003', 'Aini Razali', 'Hair Stylist', ARRAY['hair','bridal_makeup','coloring'], '4.7', 2, 38, 'available', NOW() - INTERVAL '50 days')
ON CONFLICT (id) DO NOTHING;

-- RESTAURANT_TABLES (6 records - for restaurant tenant)
INSERT INTO restaurant_tables (id, tenant_id, table_number, seats, zone, status, guest_name, occupied_since, reserved_time, created_at) VALUES
  ('50000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 'T1', 2, 'Indoor', 'available', NULL, NULL, NULL, NOW() - INTERVAL '70 days'),
  ('50000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'T2', 4, 'Indoor', 'occupied', 'Encik Ali', NOW() - INTERVAL '1 hour', NULL, NOW() - INTERVAL '70 days'),
  ('50000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'T3', 4, 'Indoor', 'reserved', NULL, NULL, (NOW() + INTERVAL '2 hours')::text, NOW() - INTERVAL '70 days'),
  ('50000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'T4', 6, 'Outdoor', 'available', NULL, NULL, NULL, NOW() - INTERVAL '70 days'),
  ('50000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000002', 'T5', 8, 'Outdoor', 'occupied', 'Puan Rosmah', NOW() - INTERVAL '30 minutes', NULL, NOW() - INTERVAL '70 days'),
  ('50000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000002', 'T6', 10, 'Private Room', 'cleaning', NULL, NULL, NULL, NOW() - INTERVAL '70 days')
ON CONFLICT (id) DO NOTHING;

-- CAMPAIGNS (4 records - 2 per tenant)
INSERT INTO campaigns (id, tenant_id, name, platform, status, budget, spent, leads, cost_per_lead, roas, currency, created_at) VALUES
  ('60000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'iPhone 15 Launch Promo', 'facebook', 'active', '2000.00', '1250.00', 45, '27.78', '3.2', 'MYR', NOW() - INTERVAL '14 days'),
  ('60000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'Year End Sale Google Ads', 'google', 'paused', '1500.00', '800.00', 22, '36.36', '2.8', 'MYR', NOW() - INTERVAL '30 days'),
  ('60000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'Nasi Lemak Festival', 'facebook', 'active', '500.00', '320.00', 68, '4.71', '5.5', 'MYR', NOW() - INTERVAL '7 days'),
  ('60000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'Catering Promo Email', 'email', 'completed', '0.00', '0.00', 12, '0.00', NULL, 'MYR', NOW() - INTERVAL '21 days'),
  ('60000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000003', 'Valentine Spa Package', 'facebook', 'active', '800.00', '520.00', 35, '14.86', '4.2', 'MYR', NOW() - INTERVAL '10 days'),
  ('60000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000003', 'Bridal Season Promo', 'instagram', 'active', '600.00', '380.00', 18, '21.11', '3.8', 'MYR', NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;

-- AUTOMATIONS (6 records - mix of tenant-specific + templates)
INSERT INTO automations (id, tenant_id, name, type, description, is_enabled, tenants_using, fired_count, is_template, created_at) VALUES
  ('70000000-0000-0000-0000-000000000001', NULL, 'Welcome Message Flow', 'sequence', 'Send welcome message series to new contacts', TRUE, 2, 156, TRUE, NOW() - INTERVAL '60 days'),
  ('70000000-0000-0000-0000-000000000002', NULL, 'Abandoned Cart Reminder', 'trigger', 'Trigger WhatsApp reminder when cart is abandoned', TRUE, 1, 89, TRUE, NOW() - INTERVAL '50 days'),
  ('70000000-0000-0000-0000-000000000003', NULL, 'AI Auto-Reply', 'ai', 'AI-powered automatic reply during off-hours', TRUE, 2, 342, TRUE, NOW() - INTERVAL '40 days'),
  ('70000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000001', 'New Order Notification', 'trigger', 'Notify staff when new order is placed', TRUE, 0, 67, FALSE, NOW() - INTERVAL '35 days'),
  ('70000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000002', 'Daily Reservation Summary', 'scheduled', 'Send daily reservation report at 8am', TRUE, 0, 28, FALSE, NOW() - INTERVAL '30 days'),
  ('70000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000001', 'Follow-up After Purchase', 'sequence', 'Send thank you + review request 3 days after purchase', FALSE, 0, 15, FALSE, NOW() - INTERVAL '20 days')
ON CONFLICT (id) DO NOTHING;

-- REFERRALS (4 records)
INSERT INTO referrals (id, tenant_id, customer_name, referral_count, conversions, commission, earned, reward, currency, status, context, created_at) VALUES
  ('80000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'Tan Wei Ming', 5, 3, '5', '824.70', 'RM50 Store Voucher', 'MYR', 'active', 'gadget_referral', NOW() - INTERVAL '30 days'),
  ('80000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'Lee Mei Ling', 2, 1, '5', '274.90', 'RM50 Store Voucher', 'MYR', 'pending', 'gadget_referral', NOW() - INTERVAL '10 days'),
  ('80000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'Mohd Faizal', 8, 6, '10', '580.00', 'Free Meal for 2', 'MYR', 'active', 'resto_referral', NOW() - INTERVAL '25 days'),
  ('80000000-0000-0000-0000-000000000004', NULL, 'Partner Agency A', 12, 4, '15', '1200.00', 'Cash Commission', 'MYR', 'active', 'superadmin_partner', NOW() - INTERVAL '45 days')
ON CONFLICT (id) DO NOTHING;

-- LANDING_PAGES (3 records)
INSERT INTO landing_pages (id, tenant_id, name, status, visits, conversions, template, updated_at, created_at) VALUES
  ('90000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'iPhone 15 Promo Page', 'published', 1250, 89, 'ecommerce', NOW() - INTERVAL '1 day', NOW() - INTERVAL '14 days'),
  ('90000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'Catering Menu 2024', 'published', 430, 32, 'restaurant', NOW() - INTERVAL '3 days', NOW() - INTERVAL '21 days'),
  ('90000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'Year End Sale (Draft)', 'draft', 0, 0, 'ecommerce', NOW() - INTERVAL '2 days', NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;

-- SUPPORT_TICKETS (4 records - various priorities and statuses)
INSERT INTO support_tickets (id, tenant_id, from_name, subject, description, status, priority, channel, created_at) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'Tan Wei Ming', 'WhatsApp messages not sending', 'Getting error 429 when trying to send broadcast messages since yesterday morning.', 'open', 'high', 'whatsapp', NOW() - INTERVAL '1 day'),
  ('a1000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'Raj Kumar', 'Need invoice for bulk order', 'Please generate tax invoice for order #ORD-003 for accounting purposes.', 'in_progress', 'medium', 'email', NOW() - INTERVAL '3 days'),
  ('a1000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'Wong Siew Ping', 'Reservation not showing on calendar', 'I made a reservation for 20 pax but it does not appear on the restaurant calendar view.', 'resolved', 'medium', 'whatsapp', NOW() - INTERVAL '5 days'),
  ('a1000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'Chef Kamal', 'Menu item photos not loading', 'Product images for Nasi Lemak and Mee Goreng show broken links on the landing page.', 'open', 'urgent', 'email', NOW() - INTERVAL '6 hours')
ON CONFLICT (id) DO NOTHING;

-- CASE_STUDIES (3 records)
INSERT INTO case_studies (id, title, industry, description, metrics, screenshots, is_published, created_at) VALUES
  ('a2000000-0000-0000-0000-000000000001', 'Kedai Gadget KL: 3x Sales with WhatsApp Commerce',
   'ecommerce',
   'How a Kuala Lumpur gadget retailer tripled their monthly sales by using OAIM WhatsApp automation to follow up with leads and send personalized promotions.',
   '{"revenue_increase": "320%", "response_time": "2 min avg", "lead_conversion": "28%", "monthly_orders": 450}'::jsonb,
   ARRAY['https://placehold.co/800x600/3b82f6/white?text=Dashboard', 'https://placehold.co/800x600/3b82f6/white?text=Pipeline'],
   TRUE, NOW() - INTERVAL '20 days'),
  ('a2000000-0000-0000-0000-000000000002', 'Restoran Selera Kampung: Filling Every Seat with Smart Reservations',
   'restaurant',
   'A popular KL restaurant reduced no-shows by 60% and increased table turnover using OAIM reservation management and automated WhatsApp reminders.',
   '{"no_show_reduction": "60%", "table_turnover": "+40%", "avg_rating": "4.8", "monthly_reservations": 320}'::jsonb,
   ARRAY['https://placehold.co/800x600/f97316/white?text=Tables', 'https://placehold.co/800x600/f97316/white?text=Reservations'],
   TRUE, NOW() - INTERVAL '15 days'),
  ('a2000000-0000-0000-0000-000000000003', 'Beauty Salon Chain: AI-Powered Appointment Booking (Draft)',
   'ecommerce',
   'Draft case study about how a beauty salon chain uses AI chatbot for 24/7 appointment booking via WhatsApp.',
   '{"appointments_booked": 200, "ai_handled_percent": "75%"}'::jsonb,
   ARRAY[]::text[],
   FALSE, NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

-- APPOINTMENTS (4 records)
INSERT INTO appointments (id, tenant_id, client_name, service, therapist, date, time, duration, status, created_at) VALUES
  ('a3000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'Siti Aminah', 'Phone Setup & Data Transfer', 'Ahmad Zikri', (NOW() + INTERVAL '1 day')::date::text, '10:00', '30 min', 'confirmed', NOW() - INTERVAL '2 days'),
  ('a3000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'Raj Kumar', 'Bulk Order Consultation', 'Ahmad Zikri', (NOW() + INTERVAL '2 days')::date::text, '14:00', '1 hour', 'pending', NOW() - INTERVAL '1 day'),
  ('a3000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'Tan Wei Ming', 'Warranty Repair Pickup', 'Priya Devi', (NOW() - INTERVAL '1 day')::date::text, '11:00', '15 min', 'completed', NOW() - INTERVAL '5 days'),
  ('a3000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'Aisha Binti Yusof', 'Wedding Tasting Session', 'Chef Kamal', (NOW() + INTERVAL '3 days')::date::text, '15:00', '2 hours', 'confirmed', NOW() - INTERVAL '4 days'),
  ('a3000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000003', 'Nurul Aisyah', 'Signature Facial Treatment', 'Lisa Wong', (NOW() + INTERVAL '1 day')::date::text, '10:00', '1 hour', 'confirmed', NOW() - INTERVAL '2 days'),
  ('a3000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000003', 'Jessica Tan', 'Hair Treatment Package', 'Aini Razali', (NOW() + INTERVAL '2 days')::date::text, '14:00', '2 hours', 'pending', NOW() - INTERVAL '1 day'),
  ('a3000000-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000003', 'Priya Nair', 'Bridal Makeup Trial', 'Aini Razali', (NOW() + INTERVAL '5 days')::date::text, '11:00', '3 hours', 'confirmed', NOW() - INTERVAL '3 days'),
  ('a3000000-0000-0000-0000-000000000008', 'e0000000-0000-0000-0000-000000000003', 'Chen Mei Fong', 'Full Body Massage', 'Lisa Wong', (NOW() - INTERVAL '1 day')::date::text, '16:00', '1 hour', 'completed', NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;

-- RESERVATIONS (4 records - for restaurant tenant)
INSERT INTO reservations (id, tenant_id, guest_name, date, time, pax, table_label, status, note, created_at) VALUES
  ('a4000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 'Mohd Faizal', (NOW())::date::text, '12:00', 6, 'T4', 'confirmed', 'Corporate lunch - need projector', NOW() - INTERVAL '3 days'),
  ('a4000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'Wong Siew Ping', (NOW() + INTERVAL '1 day')::date::text, '19:00', 20, 'T6', 'pending', 'Private dining, halal only', NOW() - INTERVAL '1 day'),
  ('a4000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'Lim Chee Keong', (NOW() - INTERVAL '2 days')::date::text, '18:30', 4, 'T3', 'completed', NULL, NOW() - INTERVAL '5 days'),
  ('a4000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'Encik Ali', (NOW())::date::text, '20:00', 2, 'T1', 'cancelled', 'Cancelled due to weather', NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

-- WEBHOOK_LOGS (4 records)
INSERT INTO webhook_logs (id, tenant_id, event_type, payload, status, error_message, created_at) VALUES
  ('a5000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'order.created', '{"order_id": "a7000000-0000-0000-0000-000000000001", "total": "5499.00"}'::jsonb, 'success', NULL, NOW() - INTERVAL '2 days'),
  ('a5000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'message.received', '{"from": "+60123456002", "body": "Hi, iPhone 15 ada stock?"}'::jsonb, 'success', NULL, NOW() - INTERVAL '1 day'),
  ('a5000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'reservation.created', '{"guest": "Wong Siew Ping", "pax": 20}'::jsonb, 'success', NULL, NOW() - INTERVAL '1 day'),
  ('a5000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000001', 'payment.failed', '{"order_id": "a7000000-0000-0000-0000-000000000003", "error": "Card declined"}'::jsonb, 'failed', 'Payment gateway returned error: card_declined', NOW() - INTERVAL '4 hours')
ON CONFLICT (id) DO NOTHING;

-- AI_LOGS (4 records)
INSERT INTO ai_logs (id, tenant_id, tenant_name, model, tokens, latency_ms, status, error_message, created_at) VALUES
  ('a6000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'Kedai Gadget KL', 'gpt-4o-mini', 350, 1200, 'success', NULL, NOW() - INTERVAL '3 hours'),
  ('a6000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'Kedai Gadget KL', 'gpt-4o-mini', 280, 950, 'success', NULL, NOW() - INTERVAL '5 hours'),
  ('a6000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'Restoran Selera Kampung', 'gpt-4o-mini', 420, 1800, 'success', NULL, NOW() - INTERVAL '1 day'),
  ('a6000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'Restoran Selera Kampung', 'gpt-4o', 150, 8500, 'failed', 'Rate limit exceeded: retry after 30s', NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- LAYER 4: Depends on contacts
-- ─────────────────────────────────────────────────────────────────────────────

-- CONVERSATIONS (4 records - linked to contacts)
INSERT INTO conversations (id, tenant_id, contact_id, last_message, last_message_at, unread_count, created_at) VALUES
  ('a7100000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Terima kasih! Barang dah sampai 👍', NOW() - INTERVAL '2 hours', 0, NOW() - INTERVAL '40 days'),
  ('a7100000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'iPhone 15 Pro ada stock tak?', NOW() - INTERVAL '30 minutes', 1, NOW() - INTERVAL '2 days'),
  ('a7100000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000005', 'OK confirm 50 pax untuk Jumaat depan', NOW() - INTERVAL '1 hour', 0, NOW() - INTERVAL '35 days'),
  ('a7100000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000006', 'Boleh saya tahu menu untuk private dining?', NOW() - INTERVAL '45 minutes', 2, NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- ORDERS (6 records - linked to contacts)
INSERT INTO orders (id, tenant_id, contact_id, status, total, currency, items, notes, created_at) VALUES
  ('a7000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'completed', '5499.00', 'MYR',
   '[{"product": "iPhone 15 Pro Max 256GB", "qty": 1, "price": "5499.00"}]'::jsonb,
   'COD payment collected', NOW() - INTERVAL '10 days'),
  ('a7000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'completed', '1099.00', 'MYR',
   '[{"product": "AirPods Pro 2nd Gen", "qty": 1, "price": "1099.00"}]'::jsonb,
   NULL, NOW() - INTERVAL '25 days'),
  ('a7000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003', 'confirmed', '99980.00', 'MYR',
   '[{"product": "Samsung Galaxy S24 Ultra", "qty": 20, "price": "4999.00"}]'::jsonb,
   'Bulk order - wholesale pricing applied', NOW() - INTERVAL '3 days'),
  ('a7000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 'draft', '4999.00', 'MYR',
   '[{"product": "Samsung Galaxy S24 Ultra", "qty": 1, "price": "4999.00"}]'::jsonb,
   'Customer still comparing prices', NOW() - INTERVAL '2 days'),
  ('a7000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000005', 'completed', '3500.00', 'MYR',
   '[{"product": "Catering Package - 50 pax", "qty": 1, "price": "3500.00"}]'::jsonb,
   'Corporate lunch delivery to KLCC', NOW() - INTERVAL '7 days'),
  ('a7000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000007', 'cancelled', '8000.00', 'MYR',
   '[{"product": "Wedding Reception Package", "qty": 1, "price": "8000.00"}]'::jsonb,
   'Cancelled - chose different venue', NOW() - INTERVAL '4 days')
ON CONFLICT (id) DO NOTHING;

-- FOLLOW_UPS (4 records - linked to contacts)
INSERT INTO follow_ups (id, tenant_id, contact_id, contact_name, type, message, scheduled_at, status, created_at) VALUES
  ('a8000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'Siti Aminah', 'manual', 'Follow up on iPhone 15 Pro inquiry - share latest promo', NOW() + INTERVAL '1 day', 'pending', NOW() - INTERVAL '1 day'),
  ('a8000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003', 'Raj Kumar', 'automated', 'Bulk order quotation follow-up - has the team reviewed the pricing?', NOW() - INTERVAL '1 day', 'overdue', NOW() - INTERVAL '4 days'),
  ('a8000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 'Lee Mei Ling', 'manual', 'Check if still interested in Samsung Galaxy S24', NOW() + INTERVAL '3 days', 'pending', NOW() - INTERVAL '2 days'),
  ('a8000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000007', 'Aisha Binti Yusof', 'automated', 'Wedding tasting session reminder - 3 days away', NOW() + INTERVAL '2 days', 'completed', NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- LAYER 5: Depends on orders / conversations
-- ─────────────────────────────────────────────────────────────────────────────

-- MESSAGES (8 records - linked to conversations)
INSERT INTO messages (id, conversation_id, tenant_id, direction, content, message_type, status, created_at) VALUES
  -- Conversation 1: Tan Wei Ming (ecommerce)
  ('a9000000-0000-0000-0000-000000000001', 'a7100000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'inbound', 'Barang saya dah sampai ke belum?', 'text', 'read', NOW() - INTERVAL '3 hours'),
  ('a9000000-0000-0000-0000-000000000002', 'a7100000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'outbound', 'Hi Tan! Order anda sudah dihantar semalam. Tracking number: MY123456789. Anggaran sampai hari ini.', 'text', 'read', NOW() - INTERVAL '2 hours' - INTERVAL '30 minutes'),
  ('a9000000-0000-0000-0000-000000000003', 'a7100000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'inbound', 'Terima kasih! Barang dah sampai 👍', 'text', 'read', NOW() - INTERVAL '2 hours'),
  -- Conversation 2: Siti Aminah (ecommerce)
  ('a9000000-0000-0000-0000-000000000004', 'a7100000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'inbound', 'iPhone 15 Pro ada stock tak?', 'text', 'delivered', NOW() - INTERVAL '30 minutes'),
  -- Conversation 3: Mohd Faizal (restaurant)
  ('a9000000-0000-0000-0000-000000000005', 'a7100000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'outbound', 'Hi Encik Faizal, untuk catering 50 pax Jumaat depan, kami boleh sediakan set Nasi Lemak Special + Teh Tarik. Harga RM70/pax. Berminat?', 'text', 'read', NOW() - INTERVAL '2 hours'),
  ('a9000000-0000-0000-0000-000000000006', 'a7100000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'inbound', 'OK confirm 50 pax untuk Jumaat depan', 'text', 'read', NOW() - INTERVAL '1 hour'),
  -- Conversation 4: Wong Siew Ping (restaurant)
  ('a9000000-0000-0000-0000-000000000007', 'a7100000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'inbound', 'Boleh saya tahu menu untuk private dining?', 'text', 'delivered', NOW() - INTERVAL '50 minutes'),
  ('a9000000-0000-0000-0000-000000000008', 'a7100000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 'outbound', 'Boleh! Kami ada set menu dari RM80/pax. Saya hantar PDF menu penuh ya.', 'document', 'sent', NOW() - INTERVAL '45 minutes')
ON CONFLICT (id) DO NOTHING;

-- DELIVERIES (3 records - linked to orders)
INSERT INTO deliveries (id, tenant_id, order_id, customer_name, address, rider, status, eta, created_at) VALUES
  ('aa000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000001', 'Tan Wei Ming', '12, Jalan Bukit Bintang, 55100 KL', 'Grab Express', 'completed', NULL, NOW() - INTERVAL '9 days'),
  ('aa000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'a7000000-0000-0000-0000-000000000005', 'Mohd Faizal', 'Level 30, Menara KLCC, 50088 KL', 'In-house rider', 'completed', NULL, NOW() - INTERVAL '6 days'),
  ('aa000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000003', 'Raj Kumar', '45, Jalan Ampang, 50450 KL', 'J&T Express', 'pending', (NOW() + INTERVAL '2 days')::text, NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- SHIPMENTS (3 records - linked to orders)
INSERT INTO shipments (id, tenant_id, order_id, customer_name, courier, tracking_number, destination, status, shipped_date, created_at) VALUES
  ('ab000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000001', 'Tan Wei Ming', 'Pos Laju', 'MY123456789', 'Bukit Bintang, KL', 'completed', (NOW() - INTERVAL '10 days')::date::text, NOW() - INTERVAL '10 days'),
  ('ab000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000002', 'Tan Wei Ming', 'J&T Express', 'JT987654321', 'Bukit Bintang, KL', 'completed', (NOW() - INTERVAL '24 days')::date::text, NOW() - INTERVAL '25 days'),
  ('ab000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000003', 'Raj Kumar', 'Pos Laju', NULL, 'Jalan Ampang, KL', 'pending', NULL, NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

-- TRANSACTIONS (4 records - linked to orders)
INSERT INTO transactions (id, tenant_id, order_id, customer_name, amount, currency, method, status, transaction_date, created_at) VALUES
  ('ac000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000001', 'Tan Wei Ming', '5499.00', 'MYR', 'card', 'success', (NOW() - INTERVAL '10 days')::text, NOW() - INTERVAL '10 days'),
  ('ac000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000002', 'Tan Wei Ming', '1099.00', 'MYR', 'wallet', 'success', (NOW() - INTERVAL '25 days')::text, NOW() - INTERVAL '25 days'),
  ('ac000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 'a7000000-0000-0000-0000-000000000005', 'Mohd Faizal', '3500.00', 'MYR', 'card', 'success', (NOW() - INTERVAL '7 days')::text, NOW() - INTERVAL '7 days'),
  ('ac000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000003', 'Raj Kumar', '99980.00', 'MYR', 'card', 'pending', (NOW() - INTERVAL '3 days')::text, NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- LAYER 6: New commercial tables
-- ─────────────────────────────────────────────────────────────────────────────

-- MEMBERS (4 records)
INSERT INTO members (id, tenant_id, user_id, name, phone, email, tags, tier, total_spent, referral_code, notes, created_at) VALUES
  ('ad000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', NULL, 'Tan Wei Ming', '+60123456001', 'weiming@example.com', ARRAY['vip','repeat'], 'gold', 6598.00, 'TANWM01', 'Loyal customer, bought 3 phones this year', NOW() - INTERVAL '45 days'),
  ('ad000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', NULL, 'Siti Aminah', '+60123456002', 'siti.a@example.com', ARRAY['new'], 'free', 0, NULL, 'Asked about iPhone 15 Pro pricing', NOW() - INTERVAL '2 days'),
  ('ad000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', NULL, 'Mohd Faizal', '+60123456005', 'faizal@example.com', ARRAY['catering','corporate'], 'gold', 3500.00, 'FAISAL01', 'Regular corporate catering orders', NOW() - INTERVAL '40 days'),
  ('ad000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', NULL, 'Wong Siew Ping', '+60123456006', 'siewping@example.com', ARRAY['new'], 'free', 0, NULL, 'Enquired about private dining for 20 pax', NOW() - INTERVAL '1 day'),
  ('ad000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000003', NULL, 'Nurul Aisyah', '+60123456009', 'aisyah@example.com', ARRAY['vip','regular'], 'gold', 2840.00, 'AISYAH01', 'Monthly facial treatment customer', NOW() - INTERVAL '50 days'),
  ('ad000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000003', NULL, 'Jessica Tan', '+60123456010', 'jessica.t@example.com', ARRAY['new'], 'free', 0, NULL, 'Asked about hair treatment packages', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- SUBSCRIPTIONS (3 records - one per tenant)
INSERT INTO subscriptions (id, tenant_id, plan_id, status, stripe_customer_id, stripe_subscription_id, current_period_start, current_period_end, trial_start_at, trial_expires_at, created_at, updated_at) VALUES
  ('ae000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 'active', 'cus_demo_ecom', 'sub_demo_ecom', NOW() - INTERVAL '30 days', NOW() + INTERVAL '30 days', NOW() - INTERVAL '90 days', NOW() - INTERVAL '83 days', NOW() - INTERVAL '90 days', NOW()),
  ('ae000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004', 'active', 'cus_demo_resto', 'sub_demo_resto', NOW() - INTERVAL '15 days', NOW() + INTERVAL '15 days', NOW() - INTERVAL '80 days', NOW() - INTERVAL '73 days', NOW() - INTERVAL '80 days', NOW()),
  ('ae000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 'active', 'cus_demo_beauty', 'sub_demo_beauty', NOW() - INTERVAL '20 days', NOW() + INTERVAL '10 days', NOW() - INTERVAL '60 days', NOW() - INTERVAL '53 days', NOW() - INTERVAL '60 days', NOW())
ON CONFLICT (id) DO NOTHING;

-- BOT_CONFIGS (3 records - one per tenant)
INSERT INTO bot_configs (id, tenant_id, platform, system_prompt, industry_type, welcome_message, is_active, openclaw_agent_id, config, created_at) VALUES
  ('af000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'whatsapp',
   'You are a helpful e-commerce sales assistant for Kedai Gadget KL. Help customers find the right products, provide pricing info, and close sales. Always be friendly and professional.',
   'ecommerce', 'Hi! Welcome to Kedai Gadget KL. How can I help you today?', TRUE, NULL,
   '{"tone": "friendly", "goal": "close_sales", "language": "en+ms"}'::jsonb, NOW() - INTERVAL '60 days'),
  ('af000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'whatsapp',
   'You are a helpful restaurant assistant for Restoran Selera Kampung. Help guests with reservations, menu inquiries, and catering orders. Be warm and welcoming.',
   'fnb', 'Selamat datang ke Restoran Selera Kampung! Boleh saya bantu anda?', TRUE, NULL,
   '{"tone": "friendly", "goal": "reservations", "language": "en+ms"}'::jsonb, NOW() - INTERVAL '55 days'),
  ('af000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000003', 'whatsapp',
   'You are a helpful beauty salon assistant for Glow Beauty Spa. Help clients book appointments, recommend treatments, and answer questions about services. Be warm and caring.',
   'beauty', 'Hi! Welcome to Glow Beauty Spa. How can I help you today?', TRUE, NULL,
   '{"tone": "friendly", "goal": "bookings", "language": "en+ms"}'::jsonb, NOW() - INTERVAL '50 days')
ON CONFLICT (id) DO NOTHING;

-- AI_CONVERSATIONS (2 records)
INSERT INTO ai_conversations (id, tenant_id, contact_id, member_id, title, message_count, created_at, updated_at) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'ad000000-0000-0000-0000-000000000002', 'iPhone 15 Pro Inquiry', 4, NOW() - INTERVAL '2 days', NOW() - INTERVAL '30 minutes'),
  ('b1000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000006', 'ad000000-0000-0000-0000-000000000004', 'Private Dining Menu', 3, NOW() - INTERVAL '1 day', NOW() - INTERVAL '45 minutes')
ON CONFLICT (id) DO NOTHING;

-- AI_MESSAGES (7 records)
INSERT INTO ai_messages (id, conversation_id, role, content, actions, feedback, created_at) VALUES
  ('b2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'user', 'iPhone 15 Pro ada stock tak?', NULL, NULL, NOW() - INTERVAL '2 days'),
  ('b2000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'assistant', 'Yes, we have the iPhone 15 Pro Max 256GB in stock at RM 5,499. Would you like to place an order?', '{"type": "NONE"}'::jsonb, 'positive', NOW() - INTERVAL '2 days' + INTERVAL '5 seconds'),
  ('b2000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 'user', 'Can I get a discount for buying 2 units?', NULL, NULL, NOW() - INTERVAL '1 day'),
  ('b2000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000001', 'assistant', 'For 2 units, I can offer you a special bundle price of RM 10,499 (save RM 499). Shall I create the order?', '{"type": "RECORD_SALE", "amount": 10499}'::jsonb, NULL, NOW() - INTERVAL '1 day' + INTERVAL '5 seconds'),
  ('b2000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000002', 'user', 'Boleh saya tahu menu untuk private dining 20 pax?', NULL, NULL, NOW() - INTERVAL '1 day'),
  ('b2000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000002', 'assistant', 'For private dining of 20 pax, we have set menus starting from RM 80/pax. Our popular options include:\n1. Set A: Nasi Lemak Special + Drinks (RM 80/pax)\n2. Set B: Full Course Malay Cuisine (RM 120/pax)\nWould you like to make a reservation?', '{"type": "CREATE_RESERVATION", "pax": 20}'::jsonb, 'positive', NOW() - INTERVAL '1 day' + INTERVAL '5 seconds'),
  ('b2000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000002', 'user', 'Set B sounds good. Saturday 7pm ok?', NULL, NULL, NOW() - INTERVAL '45 minutes')
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- =============================================================================
-- SUMMARY
-- =============================================================================
-- Layer 1: users(3), plans(4), feature_flags(8), design_assets(5)
-- Layer 2: tenants(3), industry_templates(3)
-- Layer 3: tenant_users(5), contacts(12), products(12), staff(6),
--          restaurant_tables(6), campaigns(6), automations(6), referrals(4),
--          landing_pages(3), support_tickets(4), case_studies(3),
--          appointments(8), reservations(4), webhook_logs(4), ai_logs(4)
-- Layer 4: conversations(4), orders(6), follow_ups(4)
-- Layer 5: messages(8), deliveries(3), shipments(3), transactions(4)
-- Layer 6: members(6), subscriptions(3), bot_configs(3),
--          ai_conversations(2), ai_messages(7)
-- Total: 32 tables, ~165 records (incl. superadmin + beauty demo)
-- =============================================================================
