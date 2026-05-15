# myOperator Design System — Unified Sync Configuration

> **Single source of truth for Figma ↔ Storybook ↔ Code sync**
>
> This file ensures all AI assistants use the same design tokens, component patterns, and sync workflows.
> Reference this file whenever updating tokens, creating components, or deploying changes.

---

## 🎯 Quick Activation Prompt

Use this prompt to activate all three systems at once:

```
Load the myOperator unified design system from .opencode/design-system-sync.md.
Sync Figma tokens, update Storybook stories, and ensure all code uses the
latest semantic variables. Follow the sync workflow in this file.
```

---

## 🔗 Connected Systems

### 1. Figma Design System (Source of Truth)
- **File**: New Design System - MyO
- **URL**: https://www.figma.com/design/q84boKV4Bly9HKXzdtBj2K/New-Design-System---MyO
- **Node**: Components (30:11225)
- **MCP Server**: `figma-mcp` (configured in `~/.config/opencode/opencode.json`)
- **Token Sync Command**: Use Figma MCP to fetch latest tokens before any update

### 2. Storybook Component Library
- **Repo**: https://github.com/Ankish8/storybook-npm.git
- **Local Path**: `/tmp/storybook-npm/` (clone for reference)
- **Port**: 6006
- **Stories Location**: `src/components/ui/{Component}.stories.tsx`
- **Required Stories Per Component**:
  1. Overview (interactive with args controls)
  2. Individual variant stories (one per variant)
  3. All Variants (side-by-side comparison)
  4. All Sizes (side-by-side comparison)
  5. With Icons / States / Usage examples

### 3. GitHub Repository
- **URL**: https://github.com/setuawasthi/myoperator-admin-panel
- **Deploy Target**: Vercel (auto-deploy on push to main)
- **Design Docs**: `AGENTS.md` (myOperator design rules)

---

## 🔄 Sync Workflow (Run This Every Time)

### Before Making Any Design Changes

1. **Fetch Figma Tokens**
   ```bash
   # Use Figma MCP to get latest tokens
   # Or manually check: https://www.figma.com/design/q84boKV4Bly9HKXzdtBj2K/New-Design-System---MyO
   ```

2. **Compare with Current Code**
   ```bash
   cat src/index.css        # Check current CSS tokens
   cat AGENTS.md            # Check design rules
   ```

3. **Update CSS Tokens** (`src/index.css`)
   - Add any new Figma tokens
   - Update hex values if Figma changed
   - Never use hardcoded hex in JSX — only CSS variables

4. **Update AGENTS.md**
   - Update Figma hex → token mapping table
   - Add new component rules if introduced in Figma

5. **Update Storybook Stories**
   ```bash
   cd /path/to/storybook-npm
   npm run storybook    # Verify visually
   ```
   - Ensure stories use semantic tokens
   - Update Design Tokens table in docs

6. **Update Components**
   - Use tokens from `src/index.css`
   - Follow patterns in `src/components/ui/`
   - Add/Update Storybook stories

7. **Build & Test**
   ```bash
   npm run build        # Must pass
   npm run storybook    # Visual check
   ```

8. **Commit & Deploy**
   ```bash
   git add -A
git commit -m "sync: figma tokens + storybook + component updates"
   git push origin main
   npx vercel --prod    # Or auto-deploy via GitHub
   ```

---

## 🎨 Token Architecture

### CSS Custom Properties (Source File: `src/index.css`)

```css
:root {
  /* Primary (Blue-gray) */
  --semantic-primary: #343E55;
  --semantic-primary-hover: #2F384D;
  /* ... full token set ... */

  /* Border */
  --semantic-border-input: #E9EAEB;        /* Default input border */
  --semantic-border-input-focus: #2BBCCA;  /* Focus ring (turquoise) */

  /* Input States */
  /* Default: gray (#E9EAEB) */
  /* Focus: turquoise (#2BBCCA) + subtle glow shadow */
}
```

### Token Rules (ENFORCED)

| Rule | Value | Notes |
|------|-------|-------|
| Input default border | `#E9EAEB` | `--semantic-border-input` |
| Input focus border | `#2BBCCA` | `--semantic-border-input-focus` |
| Input focus shadow | `rgba(43,188,202,0.1)` | 3px glow, NOT ring |
| Transition type | `transition-colors` | NOT `transition-all` |
| Transition duration | `200ms` | Smooth, not abrupt |
| Button primary | `#343E55` | `--semantic-primary` |
| Button primary hover | `#2F384D` | `--semantic-primary-hover` |
| Delete button | outline (red border) | `bg-transparent`, NOT solid |
| Modal overlay | `bg-black/30` | NOT `/50` |
| Card shadow | `shadow-sm` | Dropdown: `shadow-md`, Modal: `shadow-lg` |
| Table layout | `table-fixed` | Lock column widths |
| Focus outline | killed on inputs only | Buttons keep `focus-visible` ring |

---

## 📦 Component Patterns

### Input Pattern (All Inputs Must Follow)

```jsx
const inputBase = 'h-10 w-full rounded px-4 text-sm ' +
  'bg-[var(--semantic-bg-primary)] ' +
  'text-[var(--semantic-text-primary)] ' +
  'border border-[var(--semantic-border-input)] ' +     /* width + color */
  'transition-colors duration-200 ' +                    /* smooth border */
  'focus:border-[var(--semantic-border-input-focus)] ' + /* turquoise */
  'focus:shadow-[0_0_0_3px_rgba(43,188,202,0.1)]';      /* glow */
```

**CRITICAL:**
- Use `border border-[var(...)]` (both width + color utilities)
- Use `transition-colors` (NOT `transition-all`)
- NEVER use `focus:outline-none` on inputs (handled globally in CSS)

### Button Pattern

```jsx
// Primary (Save, Submit)
className="bg-[var(--semantic-primary)] text-[var(--semantic-text-inverted)]
  hover:bg-[var(--semantic-primary-hover)]
  transition-all duration-200"

// Outline (Cancel, Filter, Google Sign In)
className="bg-transparent border border-[var(--semantic-border-layout)]
  text-[var(--semantic-text-secondary)]
  hover:bg-[var(--semantic-bg-ui)]
  transition-all duration-200"

// Delete (Outline, NOT solid)
className="bg-transparent border border-[var(--semantic-error-primary)]
  text-[var(--semantic-error-primary)]
  hover:bg-[var(--semantic-error-surface)]
  transition-all duration-200"
```

### Table Pattern

```jsx
<table className="w-full text-sm table-fixed">
  {/* Columns MUST have exact pixel widths */}
  <th className="w-[56px]">Id</th>
  <th className="w-[200px]">Name</th>
  {/* ... */}
</table>
```

### Modal Pattern

```jsx
// Backdrop
<div className="fixed inset-0 z-[9999] bg-black/30 animate-fade-in" />

// Content
<div className="fixed z-[9999] ... shadow-lg animate-fade-in" />
```

---

## 📁 File Map

```
myoperator-admin-panel/
├── AGENTS.md                          # Design system rules + Figma mapping
├── src/index.css                      # All CSS tokens (source of truth)
├── src/components/ui/                 # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Tabs.jsx
│   ├── Badge.jsx
│   ├── Table.jsx
│   └── Skeleton.jsx
├── src/pages/                         # Page components
│   ├── Login.jsx
│   ├── UserProfiles.jsx
│   ├── ViewProfile.jsx
│   ├── EditProfile.jsx
│   └── AddProfile.jsx
├── .opencode/
│   └── design-system-sync.md          # THIS FILE
└── .config/opencode/opencode.json     # MCP servers (global)
```

---

## 🚀 One-Command Sync Checklist

Run this checklist before any design change:

```markdown
- [ ] Figma tokens fetched via MCP
- [ ] `src/index.css` updated with new tokens
- [ ] `AGENTS.md` mapping table updated
- [ ] All inputs use `border border-[var(--semantic-border-input)]`
- [ ] All inputs use `transition-colors` (NOT `transition-all`)
- [ ] Storybook stories updated with new tokens
- [ ] Component code uses semantic variables (no hardcoded hex)
- [ ] Build passes (`npm run build`)
- [ ] Dev server tested (`npm run dev`)
- [ ] Committed and pushed to GitHub
- [ ] Deployed to Vercel
```

---

## 📝 Component Story Template

When adding a new component, create this Storybook story:

```tsx
// src/components/ui/NewComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NewComponent } from './NewComponent';

const meta: Meta<typeof NewComponent> = {
  title: 'Components/NewComponent',
  component: NewComponent,
  parameters: {
    docs: {
      description: {
        component: `
## NewComponent
Brief description here.

### Install
\`\`\`bash
npx myoperator-ui add new-component
\`\`\`

### Import
\`\`\`tsx
import { NewComponent } from '@/components/ui/NewComponent';
\`\`\`

### Design Tokens
| Token | Value | Usage |
|-------|-------|-------|
| --semantic-primary | #343E55 | Primary background |
| --semantic-border-input | #E9EAEB | Default border |
| --semantic-border-input-focus | #2BBCCA | Focus border |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NewComponent>;

export const Overview: Story = {
  args: {
    // Default props
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <NewComponent variant="default" />
      <NewComponent variant="secondary" />
    </div>
  ),
};
```

---

## 🔧 Global MCP Configuration

Location: `~/.config/opencode/opencode.json`

```json
{
  "mcpServers": {
    "figma-developer-mcp": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "your-api-key"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@github/github-mcp"]
    }
  }
}
```

---

## 🎓 Quick Reference

### myOperator Brand Colors
- **Primary (Blue-gray)**: `#343E55` → `--semantic-primary`
- **Brand (Turquoise)**: `#2BBCCA` → `--semantic-brand`
- **Success (Green)**: `#17B26A` → `--semantic-success-primary`
- **Error (Red)**: `#F04438` → `--semantic-error-primary`

### Input State Flow
```
Default  →  Hover  →  Focus
#E9EAEB     #E9EAEB    #2BBCCA
  ↓           ↓           ↓
gray        gray      turquoise
            (no dark   + glow shadow
             change)   [0_0_0_3px]
```

### Transition Rules
- **Input borders**: `transition-colors duration-200`
- **Buttons/cards**: `transition-all duration-200`
- **Tab underline**: `transition-all duration-200`
- **Sort arrow**: `transition-transform duration-200`

---

*Last synced: Auto-generated. Update this file whenever Figma tokens change.*
