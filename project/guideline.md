# CARD-X Website — Front Page Implementation Guidelines

This document defines the **exact structure, animations, layout, and interactions** required to build the first page of the CARD-X website.

The page should function as a **visual storytelling product reveal**, similar to modern product launch sites.

Primary design principles:

• Minimal text  
• Strong visuals  
• Scroll-driven storytelling  
• Smooth cinematic transitions  
• Performance optimized  

No 3D models should be used anywhere on the page.

All visuals must rely on **video sequences and animation**.

---

# Page Flow Overview

Page structure:

1. Intro Loader
2. Hero Section
3. Card Explosion / Internal Components
4. Card Reassemble
5. Boy Passing Through Attendance Gate
6. Scroll Mask Reveal Transition
7. Feature Explanation Section
8. Footer

---

# Global Technical Stack

Frontend  
React / Next.js

Styling  
TailwindCSS

Animation  
GSAP  
GSAP ScrollTrigger

Video Handling  
HTML5 video + scroll scrubbing

Graphics  
SVG

Performance Rules

• Videos must be compressed and optimized  
• All scroll animations must run at 60fps  
• Lazy load non-visible assets  
• Avoid layout shifts  
• Use requestAnimationFrame for smooth scrubbing  

---

# SECTION 1 — INTRO LOADER

Purpose  
Create a cinematic product introduction.

Background  
Black

Text  

INTRODUCING CARDX

Animation sequence

1. Letters appear one by one
2. Slight glow or line sweep effect
3. Hold for 1 second
4. Text scales down
5. Slides to top-left header
6. Becomes site logo

Duration  
2.5 seconds

Accessibility

If `prefers-reduced-motion` is enabled, skip loader.

---

# SECTION 2 — HERO SECTION

Layout

Full viewport height.

Background  
Black with subtle animated grid pattern.

Use grid component already provided.

Grid must **fade at the bottom** to blend with next section.

---

## Hero Content Layout

Left side

Large headline

Example options

The Future of School Entry  
Attendance Reimagined  
Smart Entry for Smart Schools  

Subtext

Automated walk-through attendance powered by RFID.

CTA

Request Demo

---

Right side

Instead of 3D model, use the **CARD-X card image provided**.

This image acts as the **first frame of Video 1**.

The card should be positioned slightly **below hero text**, so when user scrolls the video frame enters the viewport naturally.

---

# SECTION 3 — CARD INTERNAL EXPLOSION

This section begins when the card video enters the viewport.

The card image transitions into **Video 1**.

Video shows the card **exploding into internal layers**.

---

## 8 Internal Layers

Eight component headings appear pointing toward the card.

The headings must be split across both sides.

Left Side

1. UHF RFID Antenna  
2. Passive EPC Gen2 Tag  
3. Signal Processing Layer  
4. Embedded Controller

Right Side

5. Antenna Array  
6. Direction Detection Module  
7. IoT Gateway Interface  
8. Secure ID Mapping System

---

## Animation Behavior

As the video progresses:

• Each layer floats outward  
• A line connects component to label text  
• Text fades in sequentially  

Each label should appear with:

• slight slide animation  
• subtle glow highlight  

---

# SECTION 4 — CARD REASSEMBLE

Video 2 begins automatically after explosion sequence.

Animation

• All components return to card  
• Layers align  
• Card closes smoothly  

A small pulse glow appears showing system activation.

---

# SECTION 5 — BOY PASSING THROUGH ATTENDANCE GATE

Video 3 begins.

Background transitions from dark to white.

Animation

1. A hand picks up the card
2. The card attaches to a lanyard
3. A student character wears the card
4. Student walks through the attendance gate

Gate lights briefly show detection.

---

## Text Overlay

Three text lines appear sequentially.

No tap  
No scan  
Just walk in  

Text behavior

• Sticky scroll  
• Each line reveals with mask animation  
• Lines appear in sync with student actions

---

# SECTION 6 — SCROLL MASK REVEAL TRANSITION

After the gate sequence finishes, a **mask reveal transition** occurs.

Animation

• A large black shape expands upward  
• It masks the previous white section  
• The new section slides into view

No gradient transition.

Hard reveal effect.

---

# SECTION 7 — FEATURE EXPLANATION SECTION

Background  
Dark / black.

Layout

Two columns.

Left side  
Scrolling text content

Right side  
Pinned visual element

---

## Sticky Scroll Layout

Right side remains pinned.

Left side text moves upward as user scrolls.

Large bold headings.

Example structure

---

### Walk-Through Detection

Students simply walk through the gate while wearing their ID card.

No scanning required.

---

### Instant Attendance Logging

The system reads RFID tags automatically and records attendance in real time.

---

### Parent Notifications

Parents receive instant alerts when their child enters the campus.

---

### Smart Analytics

School administrators access attendance insights through a dashboard.

---

### Campus Security

Entry and exit events are recorded for better campus monitoring.

---

## Animation Behavior

Each text block

• slides upward  
• fades in  
• previous text fades out  

Right side visual

• remains pinned  
• subtle animation

Possible visuals

• gate diagram  
• data flow animation  
• attendance dashboard illustration  

---

# SECTION 8 — FOOTER

Minimal footer.

Background  
Black

Center content

Large text

CARDX

Below it

Request Demo button

Optional small links

Contact  
Privacy  
Email

---


# PERFORMANCE OPTIMIZATION

Use video scrubbing rather than autoplay.

Pause videos when offscreen.

Use compressed formats

MP4 H264  
WEBM VP9

Lazy load assets below the fold.

---

# ACCESSIBILITY

Support reduced motion.

If reduced motion enabled

• Replace videos with static frames  
• Disable scrubbing animations  

---

# FINAL EXPERIENCE

The landing page should feel like a **product reveal story**.

User journey

Introduction  
Technology breakdown  
Real-world use  
Feature explanation  
Call to action