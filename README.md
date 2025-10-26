# 🌾 BiGeo
**Connecting Rural Producers with Urban Consumers Through Smart, Low-Literacy Logistics**

---

## 📋 Table of Contents
- [Overview](#overview)
- [Design Attributes](#design-attributes)
- [Core Components](#core-components)
  - [WhatsApp Fulfillment Bot (WIFB)](#whatsapp-fulfillment-bot-wifb)
  - [RCA Mobile App](#rca-mobile-app)
  - [RRR Hub Operations System](#rrr-hub-operations-system)
  - [Consumer Marketplace](#consumer-marketplace)
  - [Operations & Analytics Dashboard](#operations--analytics-dashboard)
- [UX & Microcopy Guidance](#ux--microcopy-guidance)
- [Validation Logic](#validation-logic)
- [System Interactions](#system-interactions)
- [Implementation Context](#implementation-context)

---

## 🎯 Overview

BiGeo is a **rural-to-urban supply chain platform** that enables rural producers to deliver high-demand products directly to urban consumers. The system is designed for **low digital literacy** environments, with WhatsApp-first interactions and dedicated mobile apps for operational control.

### Key Benefits
✅ Direct market access for rural producers  
✅ Fresh, verified products for urban consumers  
✅ Transparent logistics with escrow-based payments  
✅ Minimal digital literacy requirements  
✅ Offline-first architecture for rural connectivity

---

## 🎨 Design Attributes

All BiGeo interfaces follow a unified design philosophy optimized for rural and low-connectivity scenarios:

- **Minimalist Interface** – Simple layouts suitable for rural conditions
- **High Legibility** – Prominent action buttons with clear labels
- **Lightweight Iconography** – QR codes, trucks, and checklists
- **Accessibility Support** – Offline mode and low-network resilience
- **Standardized Status Colors**:
  - 🔘 **Grey** – Pending
  - 🔵 **Blue** – Confirmed
  - 🟡 **Yellow** – En-route
  - 🟢 **Green** – Delivered
  - 🔴 **Red** – Issue

---

## 🛠️ Core Components

### 📱 WhatsApp Fulfillment Bot (WIFB)

The primary ordering and communication interface for producers and early-phase consumers.

#### Core Functions
- **Category-Based Guided Ordering** – Step-by-step product selection
- **Pickup Slot Scheduling** – Time-based collection windows
- **Automated Order Tracking** – Real-time WhatsApp status updates
- **Secure Escrow Payment Communication** – Trust-building payment flows
- **Inline Microcopy** – Context-aware guidance messages

#### Sample Interactions
```
🤖 "Please pick your product type."
💰 "Funds are protected until quality is verified."
📦 "Order confirmed! Pickup scheduled for tomorrow 9 AM."
```

---

### 📲 RCA Mobile App
**Rural Collection Agent App** – Handles first-mile aggregation, pickup validation, and quality compliance.

#### Functional Areas
- **🔐 OTP Authentication** – Secure agent login
- **📍 Assignment View** – Sorted by urgency and location
- **📷 QR Scan Confirmation** – Instant pickup validation
- **✅ QC Checklist** – Mandatory tolerance rules enforcement
- **📦 SOP-Based Packaging** – Guided workflow for compliance
- **🗺️ Route Planning** – Optimized daily routes with incentives

#### Offline-First Requirements
- Local storage of scans and QC data
- Sync queue with retry logic
- Error banners when data integrity is at risk

**📱 Designed for low-end Android devices with intermittent connectivity**

---

### 🏢 RRR Hub Operations System
**Rural-Regional-Route Hub Dashboard** – Tablet/web interface for consolidation, quality assurance, and dispatch.

#### Operational Features
- **📋 Bulk Manifest Check-In** – Fast intake processing
- **⚠️ Automatic Flagging** – Alerts for missing loads
- **❄️ Cold-Chain Compliance** – Temperature monitoring alerts
- **🚚 Dynamic Routing** – SKU and destination-based optimization
- **📄 Driver Handover** – Invoice generation with traceability codes

#### Critical Controls
- Multi-scan tools for rapid intake
- Quarantine logic for compromised goods
- Real-time load balancing across vehicles

---

### 🛒 Consumer Marketplace (Phase 2)

Frontend e-commerce interface for Hyderabad-area consumers purchasing verified rural goods.

#### Primary Modules
- **🔍 Category & Search** – Intuitive product discovery
- **🏘️ Village Provenance** – Transparent origin information
- **🔄 Subscription Workflows** – Recurring delivery options
- **💵 Transparent Pricing** – Clear delivery fees and scheduling
- **⭐ Post-Delivery Ratings** – Quality signaling mechanism

#### Eligibility Logic
- **COD Access** – Available for verified returning customers
- **Mandatory Details** – Contact and geolocation for first-time orders

---

### 📊 Operations & Analytics Dashboard

Internal tool for logistics optimization and performance monitoring.

#### Monitoring KPIs
- **🚛 Fleet Efficiency Scores** – Vehicle utilization metrics
- **⏱️ SLA Breach Alerts** – Perishable goods monitoring
- **💰 Income Uplift Analytics** – Producer cluster performance
- **📈 Demand Prediction** – SKU trend analysis

#### Strategic Actions
- Premium pricing enablement for top-performing producers
- Route optimization recommendations
- Predictive maintenance alerts

---

## ✍️ UX & Microcopy Guidance

All interactions maintain a **positive, supportive tone** to build trust across digital touchpoints.

### Tone Categories

| Category | Example |
|----------|--------|
| ✅ **Motivation** | "Everything looks good. Keep going." |
| 💬 **Clarification** | "One more detail is needed." |
| ⚠️ **Caution** | "Please review this entry." |
| 🔒 **Trust-Building** | "Payment held securely in escrow." |

---

## 🔒 Validation Logic

Robust validation across all user interactions:

### Order Creation
- **Constraint**: Mandatory SKU, location, and time slot
- **Feedback**: *"Provide all required details to continue."*

### Quantity Input
- **Constraint**: Numeric and capped by SKU limit
- **Feedback**: *"Quantity must be within permissible limits."*

### QR Scan
- **Constraint**: Order and RCA must be linked
- **Feedback**: *"This pickup is not assigned to your route."*

### QC Scoring
- **Constraint**: Threshold required to clear
- **Feedback**: *"Supervisor approval needed. Add a photo."*

### Offline Mode
- **Constraint**: Allowed for RCA app only
- **Feedback**: *"Data saved securely, syncing once connected."*

---

## 🔄 System Interactions

Seamless cross-system workflows:

```
📱 Bot Order → 🚗 RCA Assignment
            ↓
📷 Pickup Scan → 💰 Escrow Release
                ↓
✅ Hub QC → 🚚 Urban Dispatch
           ↓
🏠 Delivery → ⭐ Rating & Settlement
```

### Interaction Principles
- Bot order triggers automated RCA assignment
- RCA pickup scan triggers escrow fund release
- Hub QC triggers eligibility for urban dispatch
- Urban delivery triggers rating and settlement cycles

---

## 🌍 Implementation Context

### Phase 1 Features
- **🗣️ Multilingual Interface**: English and Telugu
- **📲 WhatsApp-First Rollout**: Rapid producer onboarding
- **📍 Sensor-Less Traceability**: Timestamps and geo-coordinates
- **🧩 Modular Architecture**: Phased expansion to consumers

### Technical Stack
- **Backend**: Scalable API with retry logic
- **Mobile**: Offline-first Android apps
- **Messaging**: WhatsApp Business API
- **Storage**: Local-first with cloud sync

---

## 🚀 Getting Started

### For Producers
1. Register via WhatsApp
2. Browse product categories
3. Schedule pickups
4. Track orders in real-time

### For Rural Collection Agents
1. Download RCA app
2. Complete OTP verification
3. View daily assignments
4. Scan and validate pickups

### For Hub Operators
1. Access hub dashboard
2. Check in manifests
3. Perform quality checks
4. Dispatch to urban routes

---

## 📞 Support

For technical queries or onboarding assistance:
- 📧 Email: support@bigeo.in
- 📱 WhatsApp: +91-XXXXX-XXXXX

---

## 📜 License

MIT License - See LICENSE file for details

---

**Built with ❤️ for rural prosperity and urban access**
