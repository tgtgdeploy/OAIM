# OAIM - One AI Management

## Overview
Multi-tenant WhatsApp-first AI sales platform for e-commerce and restaurant businesses. Framework and UI design only — functionality will be migrated later from existing Loveyoung system.

## Architecture
- **Frontend**: React + Vite, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (database, auth, edge functions) — NOT Express
- **Routing**: wouter with lazy-loaded pages
- **State**: @tanstack/react-query

## Project Structure

### Four Main Sections
1. **Marketing Site** (`/`) — Public landing pages
   - Pages: home, products, solutions, pricing, cases, contact
   - Files: `client/src/pages/marketing/`

2. **Merchant Dashboard** (`/app`) — Merchant SaaS backend
   - Pages: onboarding, inbox, contacts, pipeline, orders, products, follow-ups, ads, settings
   - Files: `client/src/pages/app/`
   - Sidebar: `client/src/components/app/app-sidebar.tsx`

3. **Super Admin Panel** (`/superadmin`) — Platform admin managing all tenants
   - Pages: tenants, plans, templates, case-library, logs, support
   - Files: `client/src/pages/superadmin/`
   - Sidebar: `client/src/components/superadmin/superadmin-sidebar.tsx`
   - Layout: `SuperAdminLayout` component

4. **Member Portal** (`/member`) — End customer portal
   - Pages: dashboard, orders, track, profile, loyalty
   - Files: `client/src/pages/member/`
   - Sidebar: `client/src/components/member/member-sidebar.tsx`

### Shared Components
- `client/src/components/shared/` — StatCard, PageHeader, SearchInput, StatusBadge, EmptyState, LockedFeature

### CSS Modules
- `client/src/styles/` — shared.css, admin.css, dashboard.css, marketing.css, member.css

## Design
- Primary color: Emerald green (152 76% 36%) for WhatsApp aesthetic
- Dark mode support via ThemeProvider

## Recent Changes (Feb 12, 2026)
- Renamed `/admin` route to `/superadmin` with dedicated folder and components
- Created all Member Portal pages (orders, track, profile, loyalty)
- Updated App.tsx routes to use `/superadmin` paths
- Three clear sections: superadmin (platform admin), app (merchant), member (customer)

## User Preferences
- Chinese-speaking user
- Prefers clear folder separation by role/section
- Framework/UI only — no backend functionality yet
