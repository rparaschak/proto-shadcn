# Analytics Demo 1

## Overview
A user analytics dashboard that demonstrates a two-page navigation pattern with detailed per-user statistics. Built to showcase Recharts visualizations, Shadcn UI components, and sidebar navigation.

## Pages

### Users (default)
- Table listing 8 test users with ID, name, last activity, and total visits
- Clicking a row navigates to that user's statistics page

### User Statistics
- Header with back button, user name, and user ID
- Responsive 2-column grid with 6 chart cards:
  1. **Monthly Visits** — Bar chart, 6 months of visit counts
  2. **Daily Sessions** — Line chart, session activity by time of day
  3. **Device Usage** — Pie chart, Desktop / Mobile / Tablet split
  4. **Page Views** — Horizontal bar chart, top 5 pages by views
  5. **Engagement Rate** — Area chart, 6-month trend
  6. **Bounce Rate** — Bar chart, weekly percentages

### Charts (placeholder)
- Stub page with "coming soon" message

## Interactions
- Row click on Users table navigates to user detail
- Back button returns to Users table
- Collapsible sidebar toggle
- Hover states on table rows
- Chart tooltips and legends

## Data
All data is static mock data defined in the `data/` folder. User statistics are shared across all users (not individualized).
