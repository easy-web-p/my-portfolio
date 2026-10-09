---
name: Playful Intelligence
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#494454'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#7b7486'
  outline-variant: '#cbc3d7'
  surface-tint: '#6d3bd7'
  primary: '#6b38d4'
  on-primary: '#ffffff'
  primary-container: '#8455ef'
  on-primary-container: '#fffbff'
  inverse-primary: '#d0bcff'
  secondary: '#486800'
  on-secondary: '#ffffff'
  secondary-container: '#b7f249'
  on-secondary-container: '#4b6c00'
  tertiary: '#555c6e'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e7487'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#baf54c'
  secondary-fixed-dim: '#9fd830'
  on-secondary-fixed: '#131f00'
  on-secondary-fixed-variant: '#354e00'
  tertiary-fixed: '#dce2f7'
  tertiary-fixed-dim: '#c0c6db'
  on-tertiary-fixed: '#141b2b'
  on-tertiary-fixed-variant: '#404758'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 4rem
    fontWeight: '700'
    lineHeight: 4.5rem
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: 3rem
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: 3rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-badge:
    fontFamily: Space Grotesk
    fontSize: 0.75rem
    fontWeight: '700'
    lineHeight: 1rem
    letterSpacing: 0.05em
  label-code:
    fontFamily: Space Grotesk
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  grid-gutter-sm: 1rem
  grid-gutter-md: 1.5rem
  grid-gutter-lg: 2rem
  margin-mobile: 1.25rem
  margin-tablet: 2.5rem
  margin-desktop: 4rem
  card-padding-sm: 1.25rem
  card-padding-md: 1.75rem
  card-padding-lg: 2.5rem
  section-gap: 6rem
---

## Brand & Style

This design system expresses a "Playful Intelligence" ethos: a synthesis of rigorous creative-technology engineering and spontaneous, tactile delight. Tailored for creative technologists, system designers, and forward-looking product portfolios, it balances editorial precision with unexpected kinetic moments.

The aesthetic marries Swiss-style architectural alignment with micro-moments of joy. Structural discipline is sustained through balanced typography and modular grids, while expressive violet accents, electric lime badges, and pillowy, high-radii surfaces introduce physical warmth. The emotional objective is clear credibility paired with magnetic curiosity—a portfolio experience that feels both institutional and inventive.

## Colors

The palette grounds high-voltage accents within a warm, gallery-grade foundation:

- **Background & Base Canvas (`#FAF9F6`)**: Warm off-white that avoids harsh digital glare and softens overall contrast.
- **Deep Navy / Primary Surface (`#111827`)**: The grounding anchor for high-impact typography, primary structural framing, and dark visual nodes.
- **Charcoal Neutral (`#1F2937`)**: Secondary typographic color offering softer hierarchy for body copy and supporting meta-details.
- **Electric Violet (`#8B5CF6`)**: The primary kinetic accent—used for interactive states, key focal points, active badges, and directional links.
- **Bright Lime (`#B8F34A`)**: A high-energy companion accent deployed sparingly for availability tags, callout stickers, status signals, and hover surprises.
- **Subtle Surface Stroke (`#E5E7EB`)**: A quiet, low-contrast neutral divider used to retain edge definition on white and tinted pastel surfaces without visual heaviness.
- **Pastel Tints**: Derived light washes of violet (`#F5F3FF`) and lime (`#F7FEE7`) reserved for pillowy feature cards and container zones.

## Typography

Typography establishes an intentional dynamic: the structural, technological flavor of `Space Grotesk` is set against the calm, highly legible baseline of `Inter`.

- **Space Grotesk** drives headlines, navigational anchors, and badges. Its geometric construction and idiosyncratic tech quirks inject a playful, experimental edge into titles without hindering reading comprehension.
- **Inter** supports long-form case studies, project narratives, and technical descriptions. It acts as an uncolored structural anchor, ensuring readability across all viewports.
- All display headers use tight negative letter-spacing (`-0.02em` to `-0.04em`) to maintain editorial punch and density, while labels and micro-copy expand slightly (`0.02em` to `0.05em`) for snappy, capsule-style readability.

## Layout & Spacing

The layout is built on a 12-column responsive fluid grid with strict max-width constraints (1320px) to maintain editorial balance on ultra-wide displays.

- **Desktop (1024px+)**: 12 columns, 32px gutters, 64px outer margins. Supports asymmetric card pairings (e.g., 8-column visual showcase paired with a 4-column contextual card).
- **Tablet (768px – 1023px)**: 8 columns, 24px gutters, 40px outer margins. Elements reorient to even double-column tiles or stacked cards.
- **Mobile (< 768px)**: 4 columns, 16px gutters, 20px outer margins. Heavy horizontal padding is removed; cards collapse to single-column flows while retaining their distinct rounded profiles.

Vertical cadence relies on a disciplined 8px baseline rhythm. Sections breathe through wide vertical separation (`section-gap: 6rem`), counterbalancing the density of stickers, pill badges, and node networks.

## Elevation & Depth

Visual hierarchy uses ambient diffusion paired with crisp structural containment rather than heavy, realistic drops.

- **Flat Neutral Depth**: Cards sit quietly on `#FAF9F6` framed by a 1px `#E5E7EB` stroke, relying on pastel fills rather than heavy shadow offsets.
- **Ambient Pillows**: Hoverable cards and floating modals employ an extra-diffused, violet-tinted shadow: `box-shadow: 0 16px 36px -12px rgba(139, 92, 246, 0.12), 0 4px 12px -2px rgba(17, 24, 39, 0.04)`. This creates an airy, floating sensation.
- **Kinetic Lift**: When triggered, interactive components translate slightly upward (`-3px`) while expanding their subtle violet shadow spread, mimicking weightless tactile physics.
- **Node & Network Connectors**: Layered diagrams, interactive graph surfaces, and node trees use hair-thin connecting lines (`rgba(17, 24, 39, 0.08)`) to establish horizontal depth across overlapping panels.

## Shapes

The shape system embraces pillowy, generous curvatures, balancing software-grade utility with friendly, tactile product surfaces.

- **Cards and Containers**: Set between `20px` (smaller feature cards) and `28px` (large showcase units), creating soft, organic windows into technical work.
- **Buttons and Badges**: Full pill architecture (`border-radius: 9999px`).
- **Stickers and Dynamic Accents**: Free-form rounded capsules tilted at slight angles (`-2deg` to `3deg`) to interrupt static grid lines and provide an informal, workshop-like aesthetic.
- **Inner Elements**: Nested inputs and media assets within cards inherit a proportional radius (`14px` to `16px`), maintaining concentric visual harmony throughout child components.

## Components

### Buttons
- **Primary**: Full pill silhouette, background `#111827`, text `#FAF9F6`, Space Grotesk medium font. On hover, background shifts to `#8B5CF6` with a soft purple glow.
- **Secondary (Playful Accent)**: Background `#B8F34A`, text `#111827`, full pill. Transitions to dark text over subtle lime lift on hover.
- **Ghost/Tertiary**: 1px `#E5E7EB` border, transparent background, `#111827` text. On hover, fills with light pastel violet (`#F5F3FF`) and shifts border to `#8B5CF6`.

### Badges & Stickers
- **Status Badges**: Small pill container (`height: 28px`), Space Grotesk uppercase micro-type. Featuring an internal pulsing green/lime dot indicator for active availability or experiments.
- **Editorial Stickers**: Pastel background (`#F7FEE7` or `#F5F3FF`), dark navy text, rotated slightly (`transform: rotate(-2deg)`). Used as decorative contextual annotations across hero zones and case study headers.

### Cards
- **Pastel Showcase Cards**: Background colors vary across soft neutral white (`#FFFFFF`), light lavender (`#F5F3FF`), and subtle sage/lime (`#F7FEE7`). Features `24px` to `28px` border radius, bounded by a 1px `#E5E7EB` border.
- **Interactive Node Cards**: Feature technical headers with mono-styled metadata labels, dot grids, or connector anchor points on card perimeters.

### Form Inputs
- **Text Fields**: Height `48px`, `16px` border-radius, background `#FFFFFF`, border 1px `#E5E7EB`. Active focus state features an explicit 2px `#8B5CF6` outline with zero offset.

### Lists & Network Nodes
- **Connected Milestone Lists**: Vertical timeline connecting nodes through a 1.5px dashed violet or slate path. Node points are circular pills holding mini icons or mono numbers.
- **Tag Cloud**: Horizontal cluster of pill-shaped tags in neutral gray with soft violet hover fills.