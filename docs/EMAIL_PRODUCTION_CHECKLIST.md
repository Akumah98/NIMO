# 📧 NIMO — Email System TO-DO & Production Readiness Checklist

This document outlines the immediate steps to get test emails flowing in development and the checklist required to make the contact form email pipeline 100% production-ready.

---

## 🚀 Phase 1: Immediate Action (Get Test Emails Working Now)

Resend's free testing tier uses `onboarding@resend.dev` as the sender. By default, **Resend restricts test deliveries exclusively to the email address registered on your Resend account**.

- [ ] **1. Identify your registered Resend account email:**
  - Find the email you used to sign up at [resend.com](https://resend.com) (e.g. `yourname@gmail.com`).
- [ ] **2. Update `CONTACT_EMAIL_TO` in [`.env.local`](file:///c:/Users/AKUMAH98/Desktop/NIMO/.env.local):**
  - Change line 11 from:
    ```env
    CONTACT_EMAIL_TO=contact@nimo.africa
    ```
    to:
    ```env
    CONTACT_EMAIL_TO=your-registered-resend-email@example.com
    ```
- [ ] **3. Submit a test message on the Contact Page:**
  - Start local dev server (`npm run dev`).
  - Go to `http://localhost:3000/contact`.
  - Fill out the form and click Send.
  - Verify that the email arrives in your inbox and the submission appears in `/admin/inquiries`.

---

## 🌐 Phase 2: Domain Verification (Send from `@nimo.africa`)

To send emails from an official address like `inquiries@nimo.africa` and deliver to *any* destination address, you must verify domain ownership.

- [ ] **1. Add Domain in Resend Dashboard:**
  - Go to [Resend Domains](https://resend.com/domains) -> **Add Domain**.
  - Enter `nimo.africa` (or a subdomain like `mail.nimo.africa` if preferred).
  - Select your preferred region (e.g. Europe or US East).
- [ ] **2. Configure DNS Records with Domain Registrar:**
  - Log into the DNS manager for `nimo.africa` (e.g. Namecheap, GoDaddy, Cloudflare, cPanel).
  - Add the DNS records supplied by Resend:
    - **DKIM** (`TXT` record for cryptographic signature).
    - **SPF** (`TXT` record authorizing Resend to send on behalf of `nimo.africa`).
    - **DMARC** (`TXT` record: `_dmarc.nimo.africa` with `v=DMARC1; p=none; rua=mailto:dmarc@nimo.africa`).
- [ ] **3. Verify DNS Propagation:**
  - Click **Verify DNS Records** in Resend.
  - Wait until status turns to **"Verified"** (typically 5–30 minutes).

---

## 🛠️ Phase 3: Production Code & Environment Configuration

Once the domain is verified in Resend, switch from testing mode to live production mode.

- [ ] **1. Update Sender and Destination in Environment:**
  - Set official production sender:
    ```env
    CONTACT_EMAIL_FROM=NIMO Inquiries <contact@nimo.africa>
    ```
  - Set production recipient mailbox:
    ```env
    CONTACT_EMAIL_TO=contact@nimo.africa
    ```
- [ ] **2. Add Environment Variables to Deployment Platform (Vercel / Netlify):**
  - Navigate to **Project Settings** -> **Environment Variables**.
  - Add all three variables for **Production** and **Preview**:
    - `RESEND_API_KEY`: `re_your_resend_api_key` (your production Resend API key).
    - `CONTACT_EMAIL_FROM`: `NIMO Inquiries <contact@nimo.africa>`
    - `CONTACT_EMAIL_TO`: `contact@nimo.africa`
  - Trigger a redeploy to apply variables.

---

## 🛡️ Phase 4: Production Hardening & Anti-Spam (Recommended)

To ensure high deliverability and protect the free 3,000 monthly email limit from abuse:

- [ ] **1. Spam Protection (Honeypot / Cloudflare Turnstile):**
  - Add a hidden honeypot input field in [`ContactForm.tsx`](file:///c:/Users/AKUMAH98/Desktop/NIMO/src/components/contact/ContactForm.tsx) to catch automatic form-filling bots without impacting human users.
- [ ] **2. Rate Limiting:**
  - Implement a basic IP-based rate limit on [`/api/contact`](file:///c:/Users/AKUMAH98/Desktop/NIMO/src/app/api/contact/route.ts) (e.g., maximum 5 inquiries per IP per 10 minutes) to prevent scripted spam floods.
- [ ] **3. Branded HTML Email Template:**
  - Upgrade the plain text email in [`emailService.ts`](file:///c:/Users/AKUMAH98/Desktop/NIMO/src/lib/services/emailService.ts) to a clean, branded HTML email template featuring the NIMO logo, sender details, and responsive styling.
- [ ] **4. End-to-End Live Verification:**
  - Send a live inquiry from a mobile device (both iOS Safari and Android Chrome) on the production domain.
  - Verify receipt in `contact@nimo.africa`.
  - Hit **Reply** in the email client to confirm the `reply_to` header directs replies to the sender's actual email address.
