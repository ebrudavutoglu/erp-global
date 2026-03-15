# Notion Tarzı Business Platform – Web & Mobile UI Ekran Planı (MVP)

---

## 1️⃣ Auth & Workspace

### Web
- Login / Signup  
- Forgot password  
- Workspace switch  
- User profile / settings  

### Mobile
- Login / Logout  
- Workspace switch  
- User profile  
- Push notification izin ekranı  

---

## 2️⃣ Dashboard

### Web
- KPI widget: toplam fatura, teklif, müşteri  
- Günlük / haftalık özetler  
- Quick action buttons: Yeni Lead, Yeni Teklif, Yeni Fatura  
- Minimal grafik / chart placeholder  

### Mobile
- KPI özetleri  
- Günlük kritik aksiyonlar (ör. onay bekleyen teklif, fatura)  
- Push notification listesi  
- Quick action shortcut: Lead / Teklif / Fatura ekle  

---

## 3️⃣ Database / Tables

### Web
- Table view: Customers, Leads, Orders, Products  
- Column filter, sort, search  
- Relation: Customer ↔ Orders  
- Add / Edit / Delete records  

### Mobile
- List view: Customers / Leads / Orders  
- Quick add form (minimal)  
- Search & filter  

---

## 4️⃣ CRM & Sales

### Web
- Customer / Lead profile  
- Activity timeline  
- Pipeline / Kanban view  
- Teklif oluşturma ve gönderme  

### Mobile
- Customer / Lead arama ve güncelleme  
- Quick lead creation  
- Teklif onay ve gönderme  
- Pipeline özet (sadece renk / durum)  

---

## 5️⃣ Invoices & Payments

### Web
- Fatura oluşturma, PDF export  
- e-Fatura / e-Arşiv / e-İrsaliye integration  
- Ödeme takibi  
- Invoice history  

### Mobile
- Fatura görüntüleme / onay  
- Ödeme linkleri  
- Push notification: yeni fatura, ödeme hatırlatması  

---

## 6️⃣ Tasks & Projects

### Web
- Task list & assign  
- Kanban / Timeline / Calendar view  
- Task detail, attachments  
- Project overview  

### Mobile
- Task list & quick update  
- Deadline reminder / push  
- Minimal Kanban view  

---

## 7️⃣ Templates & Automation

### Web
- Templates: CRM, Invoice, Project, Task  
- Automation: Trigger → Action  
- Simple workflow setup  

### Mobile
- Use templates for quick data entry  
- Receive notification when automated action triggered  

---

## 8️⃣ Reporting / Analytics

### Web
- KPI charts: Revenue, Leads, Conversion  
- Custom report builder (basic)  
- Export CSV / PDF  

### Mobile
- Simple summary charts  
- Recent KPI alerts  

---

## Notlar

- Mobile = sadece kritik aksiyon + hızlı veri girişi (heavy CRUD Web’de)  
- Web = tam platform, tüm detaylar  
- Bu plan **tek kişi MVP geliştirmeye uygun**, UI tasarım ve geliştirme rehberi olarak kullanılabilir  
- Tasarım basit, minimal ve Notion / Airtable tarzı olmalı  