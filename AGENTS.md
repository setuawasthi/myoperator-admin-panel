# myOperator Design System Rules

This file is read by AI coding assistants (GitHub Copilot, Gemini CLI, Cursor, Windsurf, Aider, Continue, and others) to enforce the myOperator design system when generating UI code.

---

## CRITICAL: Never Use Hardcoded Colors

All UI code must use CSS custom properties (variables), never raw hex values.

**The full token set to include in generated standalone files:**

```css
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');

:root {
  /* Primary (Blue-gray) */
  --semantic-primary: #343E55;
  --semantic-primary-hover: #2F384D;
  --semantic-primary-selected: #777E8D;
  --semantic-primary-highlighted: #252C3C;
  --semantic-primary-surface: #EBECEE;
  --semantic-primary-100: #C0C3CA;
  --semantic-primary-200: #A2A6B1;
  --semantic-primary-300: #777E8D;
  --semantic-primary-400: #5D6577;

  /* Brand (Turquoise) */
  --semantic-brand: #2BBCCA;
  --semantic-brand-hover: #1F858F;
  --semantic-brand-selected: #71D2DB;
  --semantic-brand-surface: #EAF8FA;

  /* Background */
  --semantic-bg-primary: #FFFFFF;
  --semantic-bg-secondary: #0C0F12;
  --semantic-bg-ui: #F5F5F5;
  --semantic-bg-grey: #E9EAEB;
  --semantic-bg-hover: #D5D7DA;
  --semantic-bg-inverted: #000000;

  /* Text */
  --semantic-text-primary: #181D27;
  --semantic-text-secondary: #343E55;
  --semantic-text-muted: #717680;
  --semantic-text-placeholder: #A2A6B1;
  --semantic-text-link: #4275D6;
  --semantic-text-inverted: #FFFFFF;

  /* Border */
  --semantic-border-primary: #343E55;
  --semantic-border-secondary: #777E8D;
  --semantic-border-accent: #27ABB8;
  --semantic-border-layout: #E9EAEB;
  --semantic-border-input: #E9EAEB;
  --semantic-border-input-focus: #2BBCCA;

  /* Disabled */
  --semantic-disabled-primary: #A2A6B1;
  --semantic-disabled-secondary: #EBECEE;
  --semantic-disabled-text: #717680;
  --semantic-disabled-border: #D5D7DA;

  /* Error (Red) */
  --semantic-error-25: #FEF2F1;
  --semantic-error-50: #FEF2F1;
  --semantic-error-100: #FEE3E1;
  --semantic-error-200: #FECDC9;
  --semantic-error-300: #FCA19B;
  --semantic-error-400: #F97066;
  --semantic-error-500: #F04438;
  --semantic-error-600: #D92C20;
  --semantic-error-700: #B32218;
  --semantic-error-800: #901F17;
  --semantic-error-900: #7A2619;
  --semantic-error-950: #54150C;
  --semantic-error-primary: #F04438;
  --semantic-error-hover: #D92C20;
  --semantic-error-surface: #FEF3F2;
  --semantic-error-text: #B42318;
  --semantic-error-border: #FDA29B;

  /* Warning (Amber) */
  --semantic-warning-25: #FFFCF4;
  --semantic-warning-50: #FFF9EB;
  --semantic-warning-100: #FEEFC6;
  --semantic-warning-200: #FEDE88;
  --semantic-warning-300: #FEC84A;
  --semantic-warning-400: #FCB022;
  --semantic-warning-500: #F78F08;
  --semantic-warning-600: #DB6803;
  --semantic-warning-700: #B54707;
  --semantic-warning-800: #93370C;
  --semantic-warning-900: #792D0D;
  --semantic-warning-950: #4E1D08;
  --semantic-warning-primary: #F79009;
  --semantic-warning-surface: #FFFAEB;
  --semantic-warning-text: #B54708;
  --semantic-warning-border: #FEC84B;

  /* Success (Green) */
  --semantic-success-50: #ECFDF3;
  --semantic-success-100: #DBF9E6;
  --semantic-success-200: #AAEFC6;
  --semantic-success-300: #75DFA6;
  --semantic-success-400: #47CD89;
  --semantic-success-500: #17B169;
  --semantic-success-600: #069454;
  --semantic-success-700: #057647;
  --semantic-success-800: #075D39;
  --semantic-success-900: #074C30;
  --semantic-success-950: #043320;
  --semantic-success-primary: #17B26A;
  --semantic-success-hover: #067647;
  --semantic-success-surface: #ECFDF3;
  --semantic-success-text: #067647;
  --semantic-success-border: #75E0A7;

  /* Info (Blue) */
  --semantic-info-primary: #4275D6;
  --semantic-info-surface: #ECF1FB;
  --semantic-info-text: #2F5398;
  --semantic-info-border: #C4D4F2;
}
```

**Figma hex → token mapping (from Figma file):**

| Figma Name | Hex | Token |
|-----------|-----|-------|
| Primary/500 | `#343E55` | `--semantic-primary` |
| Primary/600 | `#2F384D` | `--semantic-primary-hover` |
| Primary/400 | `#5D6577` | `--semantic-primary-400` |
| Primary/300 | `#777E8D` | `--semantic-primary-300` |
| Primary/200 | `#A2A6B1` | `--semantic-primary-200` |
| Primary/100 | `#C0C3CA` | `--semantic-primary-100` |
| Error/500 | `#F04437` | `--semantic-error-primary` |
| Error/600 | `#D92C20` | `--semantic-error-hover` |
| Error/700 | `#B32218` | `--semantic-error-text` |
| Error/400 | `#F97066` | `--semantic-error-400` |
| Error/50 | `#FEF2F1` | `--semantic-error-surface` |
| Success/500 | `#17B169` | `--semantic-success-primary` |
| Success/600 | `#069454` | `--semantic-success-hover` |
| Success/700 | `#057647` | `--semantic-success-text` |
| Warning/500 | `#F78F08` | `--semantic-warning-primary` |
| Warning/700 | `#B54707` | `--semantic-warning-text` |
| Info/500 | `#4275D6` | `--semantic-info-primary` |
| Brand | `#2BBCCA` | `--semantic-brand` |
| Background | `#F5F5F5` | `--semantic-bg-ui` |
| Border | `#E9EAEB` | `--semantic-border-layout` |

---

## Typography

- **Font**: `'Source Sans Pro', sans-serif` — always import from Google Fonts with `wght@400;600;700`
- Default body text = **16px**. Use 14px only for secondary/helper text. 12px for rare metadata.
- Apply to body: `font-family: 'Source Sans Pro', sans-serif;`

---

## Modal and Overlay z-index

**Always use `z-[9999]`** for modals, dialogs, drawers, and overlays.

The host myOperator app has a navigation bar at `z-index: 1000+`. Using Tailwind's default `z-50` (z-index: 50) causes modals to render behind the navigation. This is a known bug pattern.

```jsx
{/* CORRECT */}
<div className="fixed inset-0 z-[9999] bg-black/50" />
<div className="fixed left-1/2 top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2 ...">

{/* WRONG — renders behind nav */}
<div className="fixed inset-0 z-50 bg-black/50" />
```

---

## Brand Color Usage

**Turquoise (#2BBCCA / `--semantic-brand`) is ONLY for:**
- Input focus rings
- Active/selected states (nav items, toggles)
- Interactive badge indicators (e.g., "Live")
- Clickable link text

**Do NOT use turquoise for:** charts, graphs, data visualization, decorative elements, large backgrounds, non-interactive content. Use `--semantic-primary` (#343E55) for data visualization.

---

## Design Language

myOperator's aesthetic is **enterprise SaaS** — professional, clean, purposeful. Not flashy, not playful, not experimental.

- Border radius: `rounded` (4px) for small elements, `rounded-lg` (8px) for cards/modals
- Transitions: `transition-all duration-200` for smooth interactions
- Shadows: `shadow-sm` (cards), `shadow-lg` (modals) — never heavy shadows
- All interactive elements need visible focus rings

---

## Component Installation (if project uses myoperator-ui)

```bash
npx myoperator-ui add button
npx myoperator-ui add input
npx myoperator-ui add select
npx myoperator-ui add table
npx myoperator-ui add dialog
npx myoperator-ui add badge
npx myoperator-ui add alert
npx myoperator-ui add spinner
npx myoperator-ui add pagination
```

Otherwise, generate standalone React + Tailwind code using the CSS variables defined above.

---

## Figma Connection

This project is connected to Figma MCP server. Design tokens are synced from:
- **File**: New Design System - MyO
- **URL**: https://www.figma.com/design/q84boKV4Bly9HKXzdtBj2K/New-Design-System---MyO
- **Node**: Components (30:11225)

When updating tokens, fetch from Figma first, then update `src/index.css` and `AGENTS.md`.
