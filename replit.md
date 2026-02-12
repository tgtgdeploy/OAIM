# OAIM - One AI Management

## Overview
Multi-tenant WhatsApp-first AI sales platform for e-commerce and restaurant businesses. Framework and UI design only — functionality will be migrated later from existing Loveyoung system.

## Architecture
- **Frontend**: React + Vite, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (database, auth, edge functions) — NOT Express
- **Routing**: wouter with lazy-loaded pages
- **State**: @tanstack/react-query

## Project Structure

### Three Main Panels + Marketing Site

1. **Marketing Site** (`/`) — Public landing pages
   - Pages: home, products, solutions, pricing, cases, contact
   - Files: `client/src/pages/marketing/`

2. **Super Admin Panel** (`/superadmin`) — Platform admin managing all tenants
   - Platform: tenants, plans, modules, templates
   - Marketing: ads & campaigns, design & pages, referral commission
   - Operations: automation, support, logs
   - Files: `client/src/pages/superadmin/`
   - Sidebar: `client/src/components/superadmin/superadmin-sidebar.tsx`
   - Layout: `SuperAdminLayout` component

3. **Merchant Dashboard** (`/app`) — Merchant SaaS backend
   - Main: inbox, contacts, pipeline, orders, products
   - Advanced: automation, follow-ups, customer support, ads & ROI, referral
   - Management: team & roles, settings
   - Files: `client/src/pages/app/`
   - Sidebar: `client/src/components/app/app-sidebar.tsx`

4. **Member Portal** (`/member`) — End customer portal
   - Pages: dashboard, orders, track, loyalty, refer & earn, profile
   - Files: `client/src/pages/member/`
   - Sidebar: `client/src/components/member/member-sidebar.tsx`

### Shared Reusable Module Components
- `client/src/components/modules/` — Components used across panels:
  - `ads-module.tsx` — Ad campaigns (superadmin + merchant)
  - `support-module.tsx` — Customer support tickets (superadmin + merchant)
  - `referral-module.tsx` — Referral program (superadmin + merchant + member)
  - `automation-module.tsx` — Workflow automation (superadmin + merchant)

### Shared UI Components
- `client/src/components/shared/` — StatCard, PageHeader, SearchInput, StatusBadge, EmptyState, LockedFeature

### CSS Modules
- `client/src/styles/` — shared.css, superadmin.css, dashboard.css, marketing.css, member.css

## Design
- Primary color: Emerald green (152 76% 36%) for WhatsApp aesthetic
- Dark mode support via ThemeProvider

### Auth Pages
- `client/src/pages/auth/login.tsx` — Login page with demo account switcher (superadmin/merchant/member)
- `client/src/pages/auth/register.tsx` — Registration page with business type selection
- Demo accounts: click to navigate directly to each panel without real auth

## Recent Changes (Feb 12, 2026)
- Created login page (`/auth/login`) with demo account panel switcher
- Created registration page (`/auth/register`) with WhatsApp number and business type fields
- Renamed `/admin` to `/superadmin` with dedicated folder and components
- Created shared reusable module components (ads, support, referral, automation)
- Updated Super Admin sidebar with 3 groups: Platform, Marketing, Operations
- Added new superadmin pages: modules, ads, design, referral, automation
- Updated Merchant sidebar with new pages: automation, support, referral, team & roles
- Added Member Portal referral page
- All three panels now share reusable module components for cross-cutting features

## User Preferences
- Chinese-speaking user
- Prefers clear folder separation by role/section
- Wants shared/reusable components for features used across panels
- Framework/UI only — no backend functionality yet
