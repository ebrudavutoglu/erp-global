Fullstack ERP/CRM Platform - Implementation Plan
Context
Sıfırdan "Business OS" platformu inşa ediyoruz (Notion + Airtable + Coda benzeri).
Kullanıcı içinde CRM, ERP, Inventory, Project Management kurabilir.

Stack: NestJS + Next.js + PostgreSQL + Prisma + Redis + MinIO + Docker (Turborepo monorepo)

Monorepo Klasör Yapısı

erp/
├── turbo.json
├── package.json
├── .env.example
├── docker-compose.yml
│
├── apps/
│ ├── api/ # NestJS backend
│ ├── web/ # Next.js frontend
│ └── worker/ # BullMQ worker (automation, notifications)
│
└── packages/
├── database/ # Prisma schema + PrismaClient export
├── types/ # Shared TypeScript types
├── ui/ # Shared React components (shadcn/ui base)
├── utils/ # Shared utilities
└── config/ # Shared eslint + tsconfig
NestJS Backend Modules (apps/api/src/modules/)
Module Açıklama
auth JWT, refresh token, SSO (Google/GitHub), 2FA (TOTP)
workspace Multi-workspace, davet sistemi
user Profil yönetimi
permission CASL tabanlı granüler permission engine
database Dynamic database (fieldlar ile birlikte)
field Field type registry (text, number, select, formula, relation...)
record CRUD, query builder (filter/sort/group)
relation Record-to-record relations
view table/kanban/calendar/timeline/gallery/list/chart
automation Trigger → Condition → Action engine
dashboard Widget tabanlı dashboard
notification In-app, email, webhook, mobile
file S3/MinIO upload, folder yönetimi
billing Stripe entegrasyonu, plan/subscription/usage
integration Webhook platform, external integrations
audit AuditLog + Activity log (interceptor ile)
api-token API token yönetimi
event-bus Global event emitter (automation engine besler)
realtime Socket.io WebSocket gateway
health Health check endpoint
Prisma Schema - Ana Modeller

User, Session, OAuthAccount
Workspace, WorkspaceMember, WorkspaceInvitation
Role, RolePermission, ResourcePermission
Database, Field, Record, RecordRelation
View, ViewField, FilterGroup, FilterCondition, ViewSort, ViewGroupBy
Automation, AutomationTrigger, AutomationCondition, AutomationAction, AutomationRun
Dashboard, DashboardWidget
Notification, NotificationDelivery, NotificationSetting
FileFolder, File
Plan, Subscription, SubscriptionUsage, Invoice
Integration, IntegrationConnection, Webhook, WebhookDelivery, ApiToken
AuditLog, Activity
Next.js Frontend Yapısı (apps/web/src/app/)

app/
├── (auth)/ # login, register, forgot-password, 2fa, sso callback
├── (workspace)/
│ ├── workspaces/ # workspace switcher / create
│ └── [workspaceSlug]/
│ ├── page.tsx # Home / activity
│ ├── db/[databaseId]/[viewId]/ # Database views
│ ├── dashboards/[dashboardId]/ # Dashboard
│ ├── automations/ # Automation builder
│ ├── notifications/ # Notification center
│ ├── files/ # File manager
│ └── settings/ # Workspace settings, billing, members
Frontend Bileşenleri:

components/database/ - TableView, KanbanView, CalendarView, TimelineView, GalleryView, ChartView
components/record/ - RecordModal, FieldRenderer, RelationPicker
components/filters/ - FilterBuilder, SortBuilder, GroupBuilder
components/automation/ - AutomationBuilder (node-based UI)
components/dashboard/ - DashboardGrid, WidgetCard
components/ui/ - shadcn/ui based components
State Management: Zustand + React Query (TanStack Query)

Docker Compose Servisleri

services:
postgres: # PostgreSQL 16
redis: # Redis 7 (cache + BullMQ queues)
minio: # MinIO (S3-compatible file storage)
api: # NestJS API (port 3001)
worker: # BullMQ worker
web: # Next.js (port 3000)
Key Dependencies
Backend (apps/api)

@nestjs/core, @nestjs/passport, passport-jwt, passport-local
@nestjs/jwt, bcryptjs
@nestjs/websockets, socket.io
@nestjs/bull, bullmq
@prisma/client
@casl/ability
@nestjs/event-emitter
stripe
nodemailer
speakeasy (2FA TOTP)
@aws-sdk/client-s3 (MinIO)
swagger-ui-express, @nestjs/swagger
Frontend (apps/web)

next 15, react 19
@tanstack/react-query
zustand
socket.io-client
shadcn/ui, tailwindcss, radix-ui
react-hook-form, zod
@dnd-kit/core (drag & drop)
recharts (charts)
date-fns
Implementation Sırası (Aşamalar)
Faz 1 - Foundation (Monorepo Setup)
Turborepo kurulumu, packages/ yapısı
packages/database - Prisma schema tam olarak yaz
packages/types - Shared types
packages/config - tsconfig, eslint
Docker Compose hazırla (postgres, redis, minio)
Faz 2 - Backend Core
NestJS app scaffold (apps/api)
PrismaModule (global)
ConfigModule + validation
AuthModule (JWT, register, login, refresh token)
WorkspaceModule (CRUD, invite)
UserModule (profile)
PermissionModule (CASL)
Faz 3 - Dynamic Database Engine
DatabaseModule (CRUD)
FieldModule (type registry, all 15+ field types)
RecordModule (CRUD + query builder)
RelationModule
Faz 4 - View Engine
ViewModule (table, kanban, calendar, timeline, gallery, list, chart)
FilterModule (nested filter groups)
SortModule, GroupByModule
Faz 5 - Automation & Events
EventBusModule (global)
AutomationModule (trigger/condition/action)
Worker app (BullMQ processors)
Faz 6 - Supporting Systems
NotificationModule
FileModule (MinIO)
DashboardModule
AuditModule (interceptor)
ApiTokenModule
IntegrationModule + WebhookModule
BillingModule (Stripe)
RealtimeModule (Socket.io)
Faz 7 - Frontend
Next.js scaffold (apps/web)
Auth pages + auth state
Workspace layout + navigation
Database table view
All other views (kanban, calendar, etc.)
Record modal + field renderers
Filter/sort/group UI
Automation builder UI
Dashboard builder UI
Settings, billing, notifications UI
Verification
docker-compose up ile tüm servisler ayağa kalkar
http://localhost:3001/api Swagger UI açılır
http://localhost:3000 Next.js açılır
Register → create workspace → create database → add fields → add records → create view → create automation
User approved the plan
Planlama tamamlandı! Şimdi Faz 1: Foundation ile başlıyoruz.

Adımlar:

Turborepo setup + root package.json, turbo.json
packages/ yapısı (database, types, config, ui, utils)
Prisma schema (tüm 40+ modeller)
Docker Compose (postgres, redis, minio)
