# Responsive Analytics Dashboard UI

A responsive analytics dashboard built with React and TypeScript, featuring interactive charts, data filters, and a strong focus on accessibility and keyboard navigation.

## Features

- 📊 Bar and line chart visualizations using Recharts
- 🔍 Filter controls to slice data by category and date range
- ♿ Fully keyboard-navigable UI with ARIA labels and semantic HTML
- 📱 Responsive layout that works on mobile, tablet, and desktop
- 🎨 Clean CSS with CSS custom properties for theming

## Tech Stack

- React 18
- TypeScript
- Recharts
- Plain CSS (no framework)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/analytics-dashboard.git
cd analytics-dashboard
npm install
npm start
```

The app will open at `http://localhost:3000`.

## Project Structure

```
src/
├── App.tsx          # Root component, layout, and state
├── Dashboard.tsx    # Chart and filter composition
├── App.css          # Global styles and responsive layout
public/
└── index.html
```

## Accessibility

- All interactive elements are reachable and operable via keyboard (`Tab`, `Enter`, `Space`)
- Charts include descriptive `aria-label` attributes
- Filter controls use `<label>` elements linked to their inputs
- Focus styles are clearly visible
- Headings follow a logical hierarchy (`h1` → `h2`)

## Screenshots

> Add screenshots here after running the project locally.

## License

MIT