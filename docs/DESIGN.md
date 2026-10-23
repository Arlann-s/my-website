---
name: Arlann Literary & Pedagogical Architecture
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e484f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7980'
  outline-variant: '#bdc8d1'
  surface-tint: '#00668a'
  primary: '#00668a'
  on-primary: '#ffffff'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#7bd0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#0053db'
  on-tertiary: '#ffffff'
  tertiary-container: '#94aeff'
  on-tertiary-container: '#003ba1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Newsreader
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 46px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 30px
    fontWeight: '400'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: 0em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system expresses a high-intellect literary hybrid tailored for the author, thinker, and educator persona. Built to honor writing, pedagogy, and curated scholarship, the design ethos bridges classical editorial discipline with clean digital engineering. 

The aesthetic is anchored in:
- **Literary Serenity**: Ample negative space, disciplined margins, and generous line lengths calibrated for sustained reading rather than rushed consumption.
- **Atmospheric Transparency**: Tactile frosted planes (`backdrop-blur-md` with translucent natural white surfaces) that provide gentle separation without creating visual friction or heavy box boundaries.
- **Scholarly Authority**: An editorial typographic pairing where expressive serif titling meets rigorous, low-distortion grotesk body text.
- **Refined Chromatic Restraint**: A predominantly luminous canvas composed of bleached parchment slates, anchored by structural midnight navy ink and energized by luminous sky accents that guide the reader’s eye across critical cognitive paths.

## Colors

The palette establishes an eye-comfort reading spectrum, balancing stark contrast with optical warmth.

- **Primary (`#38BDF8`)**: The luminous sky focal point. Deployed strictly for hyper-focused interactions, active learning states, reading progress anchors, and select interactive highlights.
- **Secondary / Ink Core (`#0F172A`)**: Deep charcoal navy, representing structural authority. Used for titles, display headers, solid button states, and deep framing elements.
- **Tertiary (`#2563EB`)**: Electric Royal Blue. Provides secondary actionable authority, interactive focus states, verified badges, and curriculum milestone tags.
- **Neutral (`#64748B`)**: Slate neutral bridge. Scales down to `#475569` for body prose to eliminate pure-black eye strain, and scales up to `#E2E8F0` / `#CBD5E1` for delicate ruled lines and soft architectural boundaries.
- **Canvas (`#F8FAFC` to `#FFFFFF`)**: An airy, off-white baseline that rejects harsh bleached white screens, pairing seamlessly with translucent overlays (`rgba(255, 255, 255, 0.85)`).

## Typography

The typographical engine merges the deliberate, unhurried cadence of classic literature with the efficiency of modern instructional layout.

- **Headline Hierarchy (`Newsreader`)**: Set with optical sizing and delicate proportions. Headlines, pull quotes, and chapter designations leverage standard-weight italics and regular weights to deliver editorial warmth without bombast.
- **Body Hierarchy (`Hanken Grotesk`)**: An open, high-legibility grotesque engineered for reading stamina across extended essays, interactive exercises, and linguistic breakdowns. Line heights are calibrated generously to promote effortless optical line tracking.
- **Labels & Micro-data**: Rendered in uppercase or small semi-bold weights of `Hanken Grotesk` with slightly expanded tracking, providing concise structure to metadata, syllabus tags, and index timestamps.

## Layout & Spacing

The layout is structured around an asymmetrical editorial grid balanced by strict proportional rhythms:

- **Desktop (12 Columns)**: Max container width of `1280px` for discovery grids and shop showcases, contracting to an intimate `740px` single-column layout for reading articles and essay modules to maintain an optimal 65–75 character measure.
- **Tablet (8 Columns)**: Margin collapses to `2rem` with a `1.25rem` gutter, preserving breathing room around cards and pedagogical modules.
- **Mobile (4 Columns)**: Margin adjusts to `1.25rem` with a `1rem` gutter; vertical rhythm contracts smoothly without degrading reading comfort.
- **Vertical Cadence**: Component stacks favor deliberate, breathing vertical separation (`space-xl` and above) between thematic chapters, transforming standard page scrolls into natural pacing pauses.

## Elevation & Depth

Visual hierarchy rejects aggressive drop shadows in favor of ambient diffusion, delicate borderline definition, and frosted glass planes:

- **Base Layer (Canvas)**: `#F8FAFC` matte surface, entirely flat.
- **Translucent Plane (Glassmorphic)**: Backgrounds use `rgba(255, 255, 255, 0.82)` with `backdrop-filter: blur(12px)` and a subtle border stroke of `rgba(226, 232, 240, 0.8)`. Used for sticky navigation headers, pinned pedagogical controls, and floating reading toolbars.
- **Resting Elevation**: Soft hairline borders (`1px solid #E2E8F0`) with a diffuse, low-opacity ambient cast: `0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 6px 16px -4px rgba(15, 23, 42, 0.04)`.
- **Hover & Interaction Elevation**: Modest vertical lift accompanied by a featherlight sky-tinted aura: `0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(56, 189, 248, 0.3)`.

## Shapes

The design system employs a soft, architectural shape profile (Level `1`):

- **Core Elements**: Standard buttons, inputs, and chips feature a crisp `0.25rem` (`4px`) radius, echoing finely trimmed book edges and structured stationery.
- **Cards & Modules (`rounded-lg`)**: Larger reading containers, product showcases, and curriculum blocks feature an exact `0.5rem` (`8px`) radius to balance modern approachability with literary formality.
- **Pill Exceptions**: Small contextual status indicators, bilingual audio playheads, and reading time chips use full-rounded capsules (`rounded-full`) to contrast against rectilinear text containers.

## Components

### Buttons
- **Primary Action**: Solid `#0F172A` background, pure white text, `0.25rem` border radius, subtle hover transition to `#1E293B` with an accent bottom edge or focus ring in `#38BDF8`.
- **Accent Action**: `#38BDF8` background with dark navy text (`#0F172A`), reserved for high-value studio enrollments or key conversions.
- **Subtle / Ghost**: Transparent fill with `1px solid #E2E8F0`, `#0F172A` text, shifting on hover to `#F1F5F9` and `#0F172A`.

### Cards (Showcase & Blog)
- Built on a translucent white foundation (`bg-white/90`) bounded by a subtle `1px solid #E2E8F0` border.
- Generous internal padding (`space-lg`), separating title typography in `Newsreader` from preview excerpts in `Hanken Grotesk`.
- Image containers feature a gentle desaturation by default, brightening to full vibrant fidelity upon hover.

### Chips & Badges
- Compact padding (`0.25rem 0.625rem`), uppercase `label-sm` tracking.
- Neutral states use slate fills (`bg-slate-100 text-slate-700`). Educational level badges (e.g., "Advanced English", "Linguistic Essay") utilize pale sky-tinted fills (`bg-sky-50 text-sky-700 border border-sky-200`).

### Form Inputs & Text Fields
- Clean `#FFFFFF` or `bg-slate-50/50` fill with a `1px solid #CBD5E1` border.
- Active focus smoothly transitions border color to `#38BDF8` with a muted ring shadow (`box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15)`). Placeholder copy is set in `#94A3B8`.

### Specialized Pedagogical Components
- **Vocabulary Callout / Annotation Block**: Left-bordered accent bar (`3px solid #38BDF8`), translucent background (`bg-sky-50/40`), housing phonetic notation, English term definitions, and bilingual contextual guides.
- **Reading Progress Spine**: A hairline 2px progress tracker pinned to the header surface using the sky accent (`#38BDF8`) to quietly indicate reading depth without distracting from the prose.