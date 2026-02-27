# 1-on-1 Consults — MVP Launch Plan
**Owner:** Arth Gupta
**Target:** Soft launch by March 1, 2026
**Demo:** https://pages.preventivehealth.ai/consults-1on1/

---

## What We're Testing

**Core question:** Is there demand for paid 1-on-1 doctor consultations within our community? If yes — at what price, with which providers, and for what concerns?

**How we'll know:** Form signups on the site. Volume, provider interest, US vs. India split, and price point sensitivity.

---

## How It Works (Intentionally Manual)

We are not automating anything yet. The product is a simple interest form. Everything after that is done by hand.

1. User visits site → browses providers by concern area → fills out interest form
2. We receive form submission via email (Formspree)
3. We manually match their timezone to provider availability
4. We reply with 2–3 time options + payment link in the same email
5. User picks a time and pays → we send calendar invite + Zoom link to both parties

**Why manual?** We're testing demand, not logistics. If people won't pay, we don't need a scheduling system.

---

## Stack

- **Site:** HTML / CSS / JS only — no frameworks, no CMS, no build step
- **Hosting:** Cloudflare Pages
- **Forms:** Formspree (free tier = 50 submissions; fine for initial test)
- **Payments:** Stripe (USD) + Razorpay (INR) — manual links per booking
- **Meetings:** Zoom (host-controlled, no login required from attendees)

---

## Launch Phases

### Phase 1 — Getting Ready

| Task | Owner | Status |
|------|-------|--------|
| Review site copy + provider bios, design | Arth | Not started |
| 2 x Set up payment links for 30-min and 60-min (INR) | Nivedita | Not started |
| 2 x Set up payment links for 30-min and 60-min (USD) | Nivedita | Not started |
| Point subdomain to Cloudflare Pages | Arif | Not started |
| Compress + swap in final provider photos | Arth | Not started |
| Final QA pass — test form submission end-to-end | TEAM | Not started |
| Send invite messages to 6 friends / individuals for a quick test | Sneha | Not started |

---

### Phase 2 — Usability Testing

Before sharing broadly, run 3–6 live sessions with people we trust. The goal is to catch confusing UX and copy issues before it goes to 3,000 people.

**Rules:**
- Do NOT share the link in advance
- Watch them navigate live on a screen share (15–20 min per person)
- Observe: where they click first, what confuses them, whether the form flow makes sense
- Ask at the end: "Would you book this? What would stop you?"

| Task | Owner | Status |
|------|-------|--------|
| Identify 6 community members for usability sessions | Nivedita | Not started |
| Schedule and run sessions (screen share, no advance link) | Nivedita + Arth | Not started |
| Collect feedback, flag top 3 issues | Arth | Not started |
| Fix critical issues before soft launch | Arth | Not started |

**Usability Test Invite (send via WhatsApp/DM):**

> Hey [Name] — we are working on a new offering in our community and would love your honest eyes on it before we share it publicly. It's a 15-min screen share, nothing to prepare. Would you be up for a quick session this weekend? We are flexible on timing — just let me know what works.

---

### Phase 3 — Soft Launch

Share the link into the community and watch what happens.

**Channels:** WhatsApp groups, direct shares, Substack
**What to monitor:** Form submission volume, which providers get interest, US vs. India split, any form errors or drop-offs

| Task | Owner | Status |
|------|-------|--------|
| Share link in community channels | Nivedita | Not started |
| Monitor Formspree inbox daily | Nivedita | Not started |
| Reply to every submission within 24 hours (manual matching + payment link) | Nivedita | Not started |
| Track submissions in a shared doc (name, provider, location, outcome) | Nivedita | Not started |

---

## Decision Points

| Signal | What We Do |
|--------|-----------|
| 10+ submissions in first week | Upgrade Formspree ($20/mo), start automating reply flow |
| Clear provider preferences emerging | Double down on those providers, update site copy |
| High drop-off at payment step | Revisit pricing or friction in the reply email |
| <3 submissions in 2 weeks | Talk to the people who *didn't* book — figure out why |

---

## What's Out of Scope (for now)

- Automated scheduling or calendar integrations
- Payment processing on-site
- CMS or dynamic provider management
- A/B testing or analytics beyond form volume

---

## Reply Template — Nivedita → Customer (after form submission)

Send within 24 hours of receiving a submission. Fill in the bracketed fields.

---

**Subject:** Your consultation with [Provider Name] — here's how to confirm

Hi [First Name],

Thanks for reaching out — we received your request for a session with [Provider Name].

Here are a few times that work on their end:

- [Day, Date] at [Time] [Timezone]
- [Day, Date] at [Time] [Timezone]
- [Day, Date] at [Time] [Timezone]

**Pick a time and complete payment to confirm your slot:**

- 30 min — USD $[XX] → [Stripe link] / INR ₹[XX] → [Razorpay link]
- 60 min — USD $[XX] → [Stripe link] / INR ₹[XX] → [Razorpay link]

Once payment goes through, we'll send a calendar invite with the Zoom link within a few hours. The session is just you and [Provider Name] — no one else on the call.

If none of these times work, just reply and we'll sort something out.

Warm regards,
Nivedita
The Longevity Circle

---

**Internal checklist for Nivedita (do not send):**

- [ ] Log in tracker: name, provider, date, duration, location, payment status
- [ ] After payment confirmed: create Zoom meeting (host-controlled), send calendar invite to patient + provider
- [ ] Include prep guide link in calendar invite description: [prepare.html URL]
- [ ] Mark submission as "Booked" in tracker
