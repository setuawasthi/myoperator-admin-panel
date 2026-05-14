# Admin Login Project

## Overview
Admin login interface built with the myOperator design system.

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### myOperator Plugins Installed

This project includes the following myOperator plugins:

| Plugin | Description | Location |
|--------|-------------|----------|
| `myoperator-design` | Design system generation and UI guidance | `.claude/skills/myoperator-design/` |
| `design-system-validator` | Validates CSS variables and design consistency | `.claude/skills/design-system-validator/` |
| `component-analysis` | Analyzes codebase for component creation | `.claude/skills/component-analysis/` |
| `storybook-generator` | Generates Storybook stories | `.claude/skills/storybook-generator/` |

### Claude Code Setup
The marketplace is already registered in `.claude/settings.json`.

Available skills:
- **myoperator-design**: Use this skill when creating UI components
- **design-system-validator**: Use this to validate design system compliance
- **component-analysis**: Use this when creating new components
- **storybook-generator**: Use this to generate Storybook stories

### Cursor Setup
Cursor rules and commands are available in `.cursor/rules/` and `.cursor/commands/`.

## Design System

The project follows the myOperator design system:
- **Primary Color**: #343E55 (Blue-gray)
- **Accent Color**: #2BBCCA (Turquoise - interactive elements only)
- **Font**: Source Sans Pro
- **Style**: Enterprise SaaS - professional, clean, purposeful

See `AGENTS.md` for complete design system rules.

## Available Commands

### Component Creator
- `create-component` - Create a new component following myOperator design system
- `add-prop` - Add props to existing components

## Project Structure

```
admin-login/
├── .claude/
│   ├── skills/          # Claude skills
│   └── settings.json    # Claude configuration
├── .cursor/
│   ├── rules/           # Cursor rules
│   └── commands/        # Cursor commands
├── .claude-plugin/      # Claude plugin config
├── .cursor-plugin/      # Cursor plugin config
├── plugins/             # Plugin source files
├── ai-rules/            # AI rule templates
└── AGENTS.md            # Universal agent instructions
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development:
   ```bash
   npm run dev
   ```

## License
MIT
