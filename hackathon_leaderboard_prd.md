# Product Requirements Document: Hackathon Leaderboard Platform

**Version:** 1.0  
**Date:** January 21, 2026  
**Status:** Draft  
**Owner:** Troy

---

## 1. Executive Summary

The Hackathon Leaderboard Platform is a web application that tracks and displays participant rankings across multiple hackathons. The platform provides a competitive ecosystem where participants earn ELO-based rankings, view hackathon details, and track their performance over time. The system serves three primary user needs: competitive ranking visibility, hackathon discovery, and personal performance tracking.

---

## 2. Problem Statement

Hackathon participants and organizers lack a unified platform to:
- Track competitive rankings across multiple events
- Discover relevant hackathons filtered by location and topic
- View team performance and composition
- Monitor individual skill progression over time

---

## 3. Goals & Objectives

### Primary Goals
1. Provide real-time leaderboard rankings with ELO-based scoring
2. Enable hackathon discovery through intuitive filtering
3. Display team compositions and achievements
4. Track individual user progression through historical data

### Success Metrics
- User engagement time on leaderboard views
- Number of hackathon detail page views
- Frequency of profile page visits
- Filter usage patterns (city/topic)

---

## 4. User Personas

### Persona 1: Competitive Participant
- **Goals:** Track ranking, compare with peers, showcase achievements
- **Pain Points:** No unified view of performance across events
- **Key Features:** Leaderboard views, profile page, historical charts

### Persona 2: Hackathon Organizer
- **Goals:** Showcase event participation, highlight top teams
- **Pain Points:** Difficulty promoting team achievements
- **Key Features:** Hackathon detail pages, team leaderboards

### Persona 3: Curious Explorer
- **Goals:** Discover hackathons, find events by interest/location
- **Pain Points:** Fragmented event information
- **Key Features:** Hackathon tab with filtering

---

## 5. Product Architecture

### 5.1 Navigation Structure

```
┌─────────────────────────────────────┐
│      Top Navigation Bar             │
│  [Leaderboard] [Hackathons] [👤]   │
└─────────────────────────────────────┘
          │           │          │
          ▼           ▼          ▼
    Leaderboard   Hackathon   Profile
       Tab          Tab         Tab
```

### 5.2 Data Model Requirements

**Required Supabase Tables:**
- `users` - User profiles and ELO rankings
- `hackathons` - Event details, dates, locations, topics
- `teams` - Team compositions and hackathon associations
- `team_members` - Many-to-many relationship between users and teams
- `rankings` - Historical ranking snapshots
- `hackathon_leaderboards` - Team performance per hackathon
- `cities` - Reference data for city filtering
- `topics` - Reference data for topic filtering

---

## 6. Detailed Feature Requirements

### 6.1 Leaderboard Tab (Default Landing)

#### 6.1.1 General Leaderboard View

**User Story:** As a user, I want to see who the top-ranked participants are globally so I can understand the competitive landscape.

**Requirements:**

**Podium Display (Top 3)**
- Display positions #1, #2, #3 with visual distinction
- Show user avatar/photo
- Display username
- Display current ELO score
- Highlight podium with medal icons (🥇🥈🥉) or visual styling
- Make usernames clickable → navigate to user profile

**Podium Visual Design (ShadCN Implementation):**
```tsx
<div className="grid grid-cols-3 gap-4 mb-8">
  {/* Second Place */}
  <Card className="relative pt-12 hover:shadow-lg transition-shadow">
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
      <Badge className="text-2xl bg-gray-200">🥈</Badge>
    </div>
    <CardContent className="text-center">
      <Avatar className="w-16 h-16 mx-auto mb-2">
        <AvatarImage src={user2.avatar} />
      </Avatar>
      <h3 className="font-semibold">{user2.name}</h3>
      <p className="text-blue-600 font-bold text-xl">{user2.elo}</p>
      <Badge variant="secondary">#2</Badge>
    </CardContent>
  </Card>

  {/* First Place - Elevated */}
  <Card className="relative pt-12 shadow-lg border-blue-200 scale-105">
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
      <Badge className="text-3xl bg-yellow-100">🥇</Badge>
    </div>
    <CardContent className="text-center">
      <Avatar className="w-20 h-20 mx-auto mb-2 border-2 border-blue-400">
        <AvatarImage src={user1.avatar} />
      </Avatar>
      <h3 className="font-bold text-lg">{user1.name}</h3>
      <p className="text-blue-600 font-bold text-2xl">{user1.elo}</p>
      <Badge className="bg-blue-500 text-white">#1</Badge>
    </CardContent>
  </Card>

  {/* Third Place */}
  <Card className="relative pt-12 hover:shadow-lg transition-shadow">
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
      <Badge className="text-2xl bg-amber-100">🥉</Badge>
    </div>
    <CardContent className="text-center">
      <Avatar className="w-16 h-16 mx-auto mb-2">
        <AvatarImage src={user3.avatar} />
      </Avatar>
      <h3 className="font-semibold">{user3.name}</h3>
      <p className="text-blue-600 font-bold text-xl">{user3.elo}</p>
      <Badge variant="secondary">#3</Badge>
    </CardContent>
  </Card>
</div>
```

**Design Notes:**
- First place card is slightly larger (scale-105) and has stronger shadow
- Medal badges positioned above cards
- White card backgrounds with blue accents for first place
- All cards have hover effects
- Mobile: Stack vertically with first place on top

**List View (Rank 4+)**
- Tabular layout showing:
  - Rank number
  - User avatar (thumbnail)
  - Username (clickable)
  - ELO score
  - Trend indicator (↑↓↔ if available)
- Infinite scroll or pagination (show 25 users per page)
- Smooth animations for rank changes

**Performance Considerations:**
- Load initial top 100 users
- Implement virtual scrolling for large datasets
- Cache leaderboard data (5-minute refresh)

#### 6.1.2 City-Based Leaderboard

**User Story:** As a user, I want to see rankings filtered by city so I can compare with local competitors.

**Requirements:**
- Dropdown/tab selector for city filtering
- Same visual layout as general leaderboard (podium + list)
- Available cities populated from `cities` table
- Display city name in page header when filtered
- "All Cities" option to return to general view
- Maintain scroll position when switching cities

**Data Query:**
```sql
-- Pseudocode
SELECT users.*, rankings.elo 
FROM users 
JOIN rankings ON users.id = rankings.user_id
WHERE users.city_id = [selected_city_id]
ORDER BY rankings.elo DESC
```

#### 6.1.3 Topic-Based Leaderboard

**User Story:** As a user, I want to see rankings filtered by topic/technology so I can find specialists in specific areas.

**Requirements:**
- Dropdown/tab selector for topic filtering
- Same visual layout as general leaderboard
- Available topics populated from `topics` table
- Display topic name in page header when filtered
- "All Topics" option to return to general view
- Support multi-topic filtering if user participates in multiple domains

**Data Considerations:**
- Topics should be derived from hackathons participated in
- Users inherit topics from their team's hackathon participation

#### 6.1.4 Sub-Tab Navigation

**Implementation:**
- Horizontal tab bar beneath main navigation
- Tabs: "Global" | "By City" | "By Topic"
- Active tab highlighted
- Smooth transitions between views
- Preserve filter state in URL parameters

---

### 6.2 Hackathon Tab

#### 6.2.1 Hackathon Overview Grid

**User Story:** As a user, I want to browse all available hackathons so I can find events to participate in.

**Requirements:**

**Card Layout:**
- Grid display (responsive: 3 cols desktop, 2 cols tablet, 1 col mobile)
- Each card shows:
  - Hackathon cover image/banner
  - Hackathon name
  - Date (start - end)
  - Location (city)
  - Topic tags (max 3 visible)
  - Participant count
  - Status badge (Upcoming/Ongoing/Completed)
- Hover effect with subtle elevation
- Click anywhere on card → navigate to hackathon detail

**Sorting Options:**
- Default: Upcoming first, then by date descending
- Options: Date (newest/oldest), Popularity (participant count), Status

**Empty State:**
- Display "No hackathons found" with illustration
- Suggest clearing filters or checking back later

#### 6.2.2 Filtering System

**User Story:** As a user, I want to filter hackathons by city and topic so I can find relevant events.

**Requirements:**

**Filter UI:**
- Persistent filter panel (sidebar on desktop, drawer on mobile)
- Multi-select dropdowns for:
  - City (checkboxes, search functionality)
  - Topic (checkboxes, search functionality)
- "Apply Filters" button (auto-apply on desktop)
- "Clear All" button
- Active filter chips displayed above results
- Filter count indicator (e.g., "Filters (2)")

**Filter Logic:**
- Multiple cities = OR logic (show hackathons in ANY selected city)
- Multiple topics = OR logic (show hackathons with ANY selected topic)
- City + Topic = AND logic (must match city AND topic)
- Real-time result count update as filters change

**Data Query:**
```sql
-- Pseudocode
SELECT hackathons.*
FROM hackathons
LEFT JOIN hackathon_topics ON hackathons.id = hackathon_topics.hackathon_id
WHERE 
  (city_id IN [selected_cities] OR [no_city_filter])
  AND (hackathon_topics.topic_id IN [selected_topics] OR [no_topic_filter])
GROUP BY hackathons.id
ORDER BY start_date DESC
```

#### 6.2.3 Hackathon Detail Page

**User Story:** As a user, I want to view detailed information about a hackathon including top-performing teams.

**URL Pattern:** `/hackathons/[hackathon_id]`

**Requirements:**

**Header Section:**
- Hero banner image
- Hackathon name (H1)
- Date range with calendar icon
- Location with pin icon
- Topic tags
- Participant/team count
- Description (expandable if >200 chars)

**Team Leaderboard Section:**
- Section title: "Top Teams"
- Podium display for top 3 teams:
  - Team position (#1, #2, #3)
  - Team name (clickable)
  - Team score/points
  - Team avatar/logo (if available)
  - Award badges (Winner, Runner-up, Third Place)
- List view for ranks 4-10 (if applicable)
- "View All Teams" expandable section for complete rankings

**Team Card Click Behavior:**
- Modal/drawer slides in showing:
  - Team name (header)
  - Team score
  - Member list:
    - Member avatar
    - Member name (clickable → profile)
    - Member role (if available)
  - Close button (X)
- Alternative: Navigate to dedicated team detail page

**Additional Sections (Optional):**
- Project submissions (if applicable)
- Event photos gallery
- Organizer information
- Sponsors logos

**Navigation:**
- Back button → return to hackathon list
- Breadcrumb: Home > Hackathons > [Hackathon Name]

**Data Query:**
```sql
-- Get hackathon details
SELECT * FROM hackathons WHERE id = [hackathon_id]

-- Get top teams
SELECT teams.*, hackathon_leaderboards.score
FROM teams
JOIN hackathon_leaderboards ON teams.id = hackathon_leaderboards.team_id
WHERE hackathon_leaderboards.hackathon_id = [hackathon_id]
ORDER BY hackathon_leaderboards.score DESC
LIMIT 10

-- Get team members (when team clicked)
SELECT users.*
FROM users
JOIN team_members ON users.id = team_members.user_id
WHERE team_members.team_id = [team_id]
```

**Navigation Bar Specifications:**
```tsx
// Top navigation bar design
<nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo - Blau Tech blue sparkle */}
      <div className="flex items-center">
        <span className="text-2xl">✨</span>
        <span className="ml-2 text-xl font-semibold text-gray-900">
          Hackathon Leaderboard
        </span>
      </div>
      
      {/* Navigation Links */}
      <div className="flex space-x-8">
        <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
          Leaderboard
        </Button>
        <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
          Hackathons
        </Button>
      </div>
      
      {/* Profile Avatar */}
      <Avatar>
        <AvatarImage src={userAvatar} />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  </div>
</nav>
```

**Key Navigation Features:**
- Sticky positioned (stays at top on scroll)
- White background with subtle bottom border
- Active link highlighted with light blue color
- Logo uses Blau Tech sparkle (✨) icon
- Profile avatar on right side (clickable → profile page)
- Responsive: collapses to hamburger menu on mobile (use ShadCN Sheet component)

---

### 6.3 User Profile Tab

#### 6.3.1 Profile Overview

**User Story:** As a user, I want to view my profile to see my current rank and performance history.

**URL Pattern:** `/profile/[user_id]` or `/profile/me` (own profile)

**Requirements:**

**Header Section:**
- Large user avatar (centered)
- Username (H1)
- Current ELO score (large, prominent)
- Current rank (e.g., "#42 Globally")
- City badge
- Join date
- Edit profile button (if viewing own profile)

**Stats Cards:**
- Grid of 2-4 cards showing:
  - Total hackathons participated
  - Teams joined
  - Best rank achieved
  - Win rate (1st place finishes)

**Additional Info:**
- Bio/About section (editable)
- Social links (GitHub, LinkedIn, Twitter)
- Skills/topics (tags derived from participation)

#### 6.3.2 Historical Rank Chart

**User Story:** As a user, I want to see how my rank has changed over time so I can track my improvement.

**Requirements:**

**Chart Specifications:**
- Line chart showing rank position over time
- X-axis: Timeline (dates)
- Y-axis: Rank position (inverted: lower number = higher on chart)
- Data points: Individual hackathon results
- Tooltip on hover:
  - Date
  - Rank at that time
  - Hackathon name (if point represents event)
  - ELO change (+/-)
- Time range selector:
  - Last 3 months (default)
  - Last 6 months
  - Last year
  - All time

**Visual Design:**
- Line color: Gradient from red (lower ranks) to green (higher ranks)
- Shaded area under line
- Highlight current position with dot
- Milestone markers for achievements (1st place, top 10, etc.)

**Data Query:**
```sql
-- Get historical ranking data
SELECT 
  rankings.created_at,
  rankings.rank,
  rankings.elo,
  hackathons.name as hackathon_name
FROM rankings
LEFT JOIN hackathons ON rankings.hackathon_id = hackathons.id
WHERE rankings.user_id = [user_id]
  AND rankings.created_at >= [time_range_start]
ORDER BY rankings.created_at ASC
```

**Library Recommendation:**
- Use Recharts or Chart.js for React
- Ensure responsive design (different aspect ratios for mobile)
- Smooth animations on load

**Empty State:**
- Display message: "No historical data yet. Participate in hackathons to start tracking!"
- Illustration of chart placeholder

#### 6.3.3 Recent Activity Feed

**Optional Enhancement:**
- List of recent hackathon participations
- Each item shows:
  - Hackathon name
  - Date
  - Team name
  - Placement
  - Points earned
- Link to hackathon detail page

---

## 7. Technical Requirements

### 7.1 Frontend Stack
- **Framework:** React (Next.js recommended for SSR/SSG)
- **UI Library:** ShadCN/ui (REQUIRED - all components must use ShadCN)
- **Styling:** Tailwind CSS (included with ShadCN)
- **Charts:** Recharts (required for historical rank charts)
- **State Management:** React Context or Zustand
- **Data Fetching:** React Query or SWR (with Supabase client)

**ShadCN Component Usage:**
- Buttons: `<Button>`
- Cards: `<Card>`, `<CardHeader>`, `<CardContent>`
- Dropdowns: `<Select>`, `<SelectTrigger>`, `<SelectContent>`
- Modals: `<Dialog>`, `<DialogContent>`, `<DialogHeader>`
- Tabs: `<Tabs>`, `<TabsList>`, `<TabsTrigger>`
- Avatars: `<Avatar>`, `<AvatarImage>`, `<AvatarFallback>`
- Badges: `<Badge>`
- Inputs: `<Input>`, `<Textarea>`
- Navigation: Custom with ShadCN primitives

### 7.2 Backend/Database
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Real-time:** Supabase Realtime (for live leaderboard updates)
- **Storage:** Supabase Storage (for avatars, hackathon images)

### 7.3 Performance Requirements
- Initial page load: < 2 seconds
- Leaderboard refresh: < 500ms
- Chart rendering: < 1 second
- Image optimization: WebP format, lazy loading
- API response time: < 300ms (P95)

### 7.4 Database Schema Validation

**Critical Tables to Verify in Supabase:**

1. **users**
   - id (uuid, primary key)
   - username (text)
   - avatar_url (text)
   - city_id (foreign key)
   - created_at (timestamp)
   - bio (text)

2. **rankings**
   - id (uuid, primary key)
   - user_id (foreign key)
   - elo (integer)
   - rank (integer)
   - hackathon_id (foreign key, nullable)
   - created_at (timestamp)

3. **hackathons**
   - id (uuid, primary key)
   - name (text)
   - description (text)
   - start_date (date)
   - end_date (date)
   - city_id (foreign key)
   - banner_url (text)
   - status (enum: upcoming/ongoing/completed)

4. **teams**
   - id (uuid, primary key)
   - name (text)
   - hackathon_id (foreign key)
   - avatar_url (text)

5. **team_members**
   - id (uuid, primary key)
   - team_id (foreign key)
   - user_id (foreign key)
   - role (text, optional)

6. **hackathon_leaderboards**
   - id (uuid, primary key)
   - hackathon_id (foreign key)
   - team_id (foreign key)
   - score (integer)
   - rank (integer)

7. **cities**
   - id (uuid, primary key)
   - name (text)
   - country (text)

8. **topics**
   - id (uuid, primary key)
   - name (text)
   - slug (text)

9. **hackathon_topics** (junction table)
   - hackathon_id (foreign key)
   - topic_id (foreign key)

### 7.5 API Endpoints (Supabase Functions)

**Leaderboard:**
- `GET /api/leaderboard?city=[id]&topic=[id]`
- `GET /api/leaderboard/user/[id]`

**Hackathons:**
- `GET /api/hackathons?city=[ids]&topic=[ids]&status=[status]`
- `GET /api/hackathons/[id]`
- `GET /api/hackathons/[id]/teams`

**Users:**
- `GET /api/users/[id]`
- `GET /api/users/[id]/rankings?range=[period]`
- `PATCH /api/users/[id]` (profile updates)

**Teams:**
- `GET /api/teams/[id]`
- `GET /api/teams/[id]/members`

---

## 8. User Experience Flows

### 8.1 Primary Flow: Discover Hackathon and Check Leaderboard

1. User lands on Leaderboard tab (default)
2. User clicks "Hackathons" in navigation
3. User applies filters (e.g., city: Munich, topic: AI)
4. User browses filtered hackathon cards
5. User clicks on hackathon card
6. User views hackathon details and top 3 teams
7. User clicks on winning team
8. User sees team members in modal
9. User clicks on team member name
10. User lands on member's profile page
11. User views historical rank chart

### 8.2 Secondary Flow: Self Profile Check

1. User clicks profile icon in navigation
2. User lands on own profile page
3. User views current rank and ELO
4. User scrolls to historical chart
5. User hovers over data points to see details
6. User changes time range to "All Time"
7. User reviews progression

---

## 9. Design Specifications

### 9.0 Overall Design Aesthetic

**Blau Tech Brand Identity:**
The platform embodies a clean, modern, and professional aesthetic inspired by Blau Tech's branding. The design prioritizes clarity, readability, and a calm user experience through generous use of white space and subtle light blue accents.

**Visual Characteristics:**
- **Clean & Airy:** Predominantly white and off-white backgrounds create an open, uncluttered feel
- **Subtle Depth:** Soft shadows and hover effects provide depth without visual noise
- **Light Blue Sparkle:** Strategic use of light blue (#3B82F6) as accent color for interactive elements, matching Blau Tech's signature sparkle theme
- **Content-First:** Typography and content hierarchy take precedence over decorative elements
- **Minimal Borders:** Use elevation (shadows) rather than heavy borders to separate elements

**Reference Style:**
- Similar aesthetic to: Linear, Vercel, Stripe Dashboard
- Clean SaaS/B2B application design
- Not: Bright colors, gradients, heavy illustrations

### 9.1 Color Palette (Blau Tech Branding)

**Primary Colors:**
- **Background:** White (#FFFFFF) and Off-White (#FAFBFC, #F8F9FA)
- **Primary Accent:** Light Blue (#3B82F6 or #60A5FA) - matching Blau Tech sparkle
- **Secondary Accent:** Sky Blue (#0EA5E9 or #38BDF8)
- **Text Primary:** Dark Gray (#1F2937 or #111827)
- **Text Secondary:** Medium Gray (#6B7280)

**Semantic Colors:**
- **Success:** Green (#10B981) - Rank improvements, wins
- **Warning:** Amber (#F59E0B) - Rank drops
- **Error:** Red (#EF4444) - Errors, alerts
- **Info:** Light Blue (#3B82F6) - Information, highlights

**UI Elements:**
- **Borders:** Light Gray (#E5E7EB)
- **Hover States:** Very Light Blue (#EFF6FF)
- **Active States:** Light Blue (#DBEAFE)
- **Shadows:** Subtle gray shadows for cards

**Brand Consistency:**
- All interactive elements use light blue accent color
- Cards have white background with subtle shadows
- Page background is off-white (#FAFBFC)
- Maintain high contrast for readability (WCAG AA compliance)

**ShadCN Theme Configuration:**
```css
:root {
  --background: 0 0% 100%; /* white */
  --foreground: 222.2 84% 4.9%; /* dark gray */
  --primary: 221.2 83.2% 53.3%; /* light blue */
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%; /* off-white */
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%; /* off-white */
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 199.2 95.2% 73.1%; /* sky blue */
  --accent-foreground: 222.2 47.4% 11.2%;
  --border: 214.3 31.8% 91.4%; /* light gray */
  --radius: 0.5rem;
}
```

### 9.2 Typography
- **Headings:** Inter or system-ui (ShadCN default)
- **Body:** Same as headings for consistency
- **Code/Numbers:** Monospace for ELO scores (JetBrains Mono or Fira Code)

**Type Scale:**
- H1: 2.5rem (40px) - Page titles
- H2: 2rem (32px) - Section headers
- H3: 1.5rem (24px) - Card titles
- Body: 1rem (16px) - Default text
- Small: 0.875rem (14px) - Captions, metadata

### 9.3 Visual Design Principles

**Clean & Minimal:**
- Generous white space between elements
- Subtle shadows on cards (ShadCN default shadow-sm or shadow-md)
- No heavy borders - use light gray dividers sparingly
- Focus on content hierarchy through typography and spacing

**Card Design:**
- White background (#FFFFFF)
- Rounded corners (border-radius: 0.5rem)
- Subtle shadow: `shadow-sm hover:shadow-md` transition
- Light gray border on hover: `hover:border-blue-200`
- Padding: 24px (p-6)

**Interactive Elements:**
- Light blue accent on hover/focus states
- Smooth transitions (200ms ease)
- Clear focus indicators for accessibility
- Button styles: default, outline, ghost (ShadCN variants)

**Leaderboard Specific:**
- Podium cards slightly elevated with stronger shadows
- Medal icons or gradient backgrounds for top 3
- Alternating row backgrounds in list view (white / off-white #FAFBFC)
- Rank badges with light blue background

### 9.4 ShadCN Component Usage Guide

**Required Components (install via CLI):**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add input
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add skeleton
```

**Component Patterns:**

**Leaderboard Cards:**
```tsx
<Card className="hover:shadow-md transition-shadow">
  <CardHeader>
    <CardTitle>Leaderboard</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Leaderboard content */}
  </CardContent>
</Card>
```

**Hackathon Grid Cards:**
```tsx
<Card className="cursor-pointer hover:border-blue-200 transition-colors">
  <CardHeader>
    <Badge variant="outline">{status}</Badge>
    <CardTitle>{hackathonName}</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Hackathon details */}
  </CardContent>
</Card>
```

**Team Modal:**
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Card className="cursor-pointer">...</Card>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{teamName}</DialogTitle>
    </DialogHeader>
    {/* Team members list */}
  </DialogContent>
</Dialog>
```

**Filter Dropdowns:**
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select city" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="munich">Munich</SelectItem>
    <SelectItem value="berlin">Berlin</SelectItem>
  </SelectContent>
</Select>
```

**Navigation Tabs:**
```tsx
<Tabs defaultValue="global">
  <TabsList className="bg-white border">
    <TabsTrigger value="global">Global</TabsTrigger>
    <TabsTrigger value="city">By City</TabsTrigger>
    <TabsTrigger value="topic">By Topic</TabsTrigger>
  </TabsList>
</Tabs>
```

**User Avatar:**
```tsx
<Avatar>
  <AvatarImage src={userAvatarUrl} />
  <AvatarFallback>{userInitials}</AvatarFallback>
</Avatar>
```

**Rank Badges:**
```tsx
<Badge variant="secondary" className="bg-blue-50 text-blue-700">
  #{rank}
</Badge>
```

### 9.6 Spacing System
- Use 8px base unit (8, 16, 24, 32, 48, 64px)
- Container max-width: 1280px
- Side padding: 16px mobile, 32px desktop

### 9.7 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile-Specific Design Adjustments:**

**Navigation (< 640px):**
- Hamburger menu using ShadCN Sheet component
- Bottom navigation bar with icons for Leaderboard/Hackathons/Profile
- Logo centered in top bar

**Leaderboard:**
- Podium cards stack vertically (first → second → third)
- List view shows simplified cards (avatar, name, ELO only)
- Filters open in bottom sheet modal

**Hackathon Grid:**
- Single column layout
- Larger touch targets (min 44px height)
- Filters in slide-up drawer

**Profile:**
- Stats cards in 2x2 grid
- Chart full width with swipe navigation
- Time range selector as horizontal scroll

**General Mobile Patterns:**
- Increased padding (px-4 instead of px-6)
- Larger touch targets
- Bottom sheets for filters/modals (instead of side panels)
- Simplified typography (slightly smaller for space)

### 9.8 Page Layout Examples

**Leaderboard Page Layout:**
```
┌────────────────────────────────────────────┐
│  [Logo] Leaderboard  Hackathons  Profile   │ ← Navigation (white bg, light shadow)
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ [Global] [By City] [By Topic]        │ │ ← Tab navigation (ShadCN Tabs)
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │           🥇 Podium 🥈 🥉           │ │ ← White cards with shadow
│  │  [#1 Card] [#2 Card] [#3 Card]      │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ 4  [@] Username       1234 ELO  ↑   │ │ ← Alternating bg (white/off-white)
│  │ 5  [@] Username       1230 ELO  ↓   │ │
│  │ 6  [@] Username       1225 ELO  ↑   │ │
│  └──────────────────────────────────────┘ │
│                                            │
└────────────────────────────────────────────┘
Background: #FAFBFC (off-white)
```

**Hackathon Grid Layout:**
```
┌────────────────────────────────────────────┐
│  [Logo] Leaderboard  Hackathons  Profile   │
├────────────────────────────────────────────┤
│                                            │
│  [🔍 Search] [City ▼] [Topic ▼]  Active:2 │ ← Filter bar (white card)
│                                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │[Image]  │  │[Image]  │  │[Image]  │   │ ← 3 column grid (desktop)
│  │Title    │  │Title    │  │Title    │   │   White cards, hover shadow
│  │📅 Date  │  │📅 Date  │  │📅 Date  │   │
│  │📍 City  │  │📍 City  │  │📍 City  │   │
│  │[AI][ML] │  │[Web3]   │  │[Data]   │   │ ← Light blue topic badges
│  └─────────┘  └─────────┘  └─────────┘   │
│                                            │
└────────────────────────────────────────────┘
```

**Profile Page Layout:**
```
┌────────────────────────────────────────────┐
│  [Logo] Leaderboard  Hackathons  Profile   │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │         [@Avatar]                    │ │ ← Header card (white)
│  │       John Doe                       │ │
│  │      1234 ELO                        │ │
│  │      Rank #42 🏆                     │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │ ← Stats grid
│  │  15  │ │   3  │ │  #12 │ │  2   │    │   (4 small cards)
│  │Hacks │ │Teams │ │ Best │ │ Wins │    │
│  └──────┘ └──────┘ └──────┘ └──────┘    │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Rank History                         │ │ ← Chart card
│  │                                      │ │
│  │        [Line Chart]                  │ │ ← Recharts component
│  │                                      │ │
│  │ [3M] [6M] [1Y] [All]                │ │ ← Time selector
│  └──────────────────────────────────────┘ │
│                                            │
└────────────────────────────────────────────┘
```

## 10. Accessibility Requirements

- **WCAG 2.1 Level AA compliance**
- Keyboard navigation support (Tab, Enter, Esc)
- Screen reader friendly (proper ARIA labels)
- Color contrast ratios: 4.5:1 for text, 3:1 for UI components
- Focus indicators on all interactive elements
- Alt text for all images
- Semantic HTML structure

---

## 11. Security & Privacy

### 11.1 Authentication
- Supabase Auth with email/password
- Optional: OAuth providers (Google, GitHub)
- Protected routes for profile editing

### 11.2 Authorization
- Users can only edit their own profiles
- Public read access to leaderboards and hackathons
- RLS (Row Level Security) policies in Supabase

### 11.3 Data Privacy
- GDPR compliance for EU users
- User data deletion capability
- Private profile option (hide from leaderboards)
- No sensitive data displayed publicly

---

## 12. Analytics & Tracking

**Events to Track:**
- Page views (each tab)
- Leaderboard filter usage
- Hackathon detail views
- Team card clicks
- Profile visits
- Chart interactions
- Time spent on each section

**Tools:**
- Google Analytics 4 or Plausible (privacy-focused)
- Supabase built-in analytics

---

## 13. Future Enhancements (Out of Scope for v1.0)

### Phase 2 Features:
- User notifications (rank changes, new hackathons)
- Social features (follow users, comment on profiles)
- Team formation tool (find teammates)
- Advanced filtering (date ranges, skill requirements)
- Hackathon registration directly in platform
- Badge/achievement system
- Leaderboard challenges and streaks

### Phase 3 Features:
- Mobile app (React Native)
- Live updates during hackathons
- Integration with project submission platforms
- Mentor matching system
- Sponsor dashboard

---

## 14. Success Criteria

### Launch Criteria (MVP)
- [ ] All three tabs functional (Leaderboard, Hackathons, Profile)
- [ ] City and topic filtering working
- [ ] Top 100 users displayed correctly
- [ ] Hackathon detail pages with team leaderboards
- [ ] Profile pages with historical charts
- [ ] Responsive design on all devices
- [ ] < 2s page load time

### Post-Launch KPIs (3 months)
- 500+ registered users
- 80% of users visit leaderboard within first session
- Average session duration > 3 minutes
- 50% of users filter by city or topic
- 30% of users visit at least one profile page

---

## 15. Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Database performance issues with large datasets | High | Medium | Implement pagination, caching, and database indexes |
| Incomplete Supabase schema | High | Low | Validate schema before frontend development |
| ELO calculation accuracy | Medium | Medium | Document algorithm, add manual adjustment capability |
| User privacy concerns | High | Low | Clear privacy policy, opt-out options |
| Real-time updates causing UI jank | Medium | Medium | Debounce updates, use optimistic UI |

---

## 16. Development Timeline Estimate

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Setup & Infrastructure** | 1 week | Supabase schema validation, Next.js setup, CI/CD |
| **Leaderboard Tab** | 2 weeks | General leaderboard, city/topic filters, podium UI |
| **Hackathon Tab** | 2 weeks | Overview grid, filtering, detail pages, team modals |
| **Profile Tab** | 1.5 weeks | Profile page, historical charts, stats cards |
| **Polish & Testing** | 1.5 weeks | Responsive design, accessibility, performance optimization |
| **Total** | **8 weeks** | Fully functional MVP |

---

## 17. Appendix

### 17.1 Glossary
- **ELO:** Rating system to calculate relative skill levels
- **Podium:** Visual representation of top 3 positions
- **Leaderboard:** Ranked list of participants
- **RLS:** Row Level Security (Supabase security feature)

### 17.2 References
- [Supabase Documentation](https://supabase.com/docs)
- [ELO Rating System](https://en.wikipedia.org/wiki/Elo_rating_system)
- [Next.js Documentation](https://nextjs.org/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### 17.3 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-21 | Troy | Initial PRD creation |
| 1.1 | 2026-01-21 | Troy | Updated design specs: ShadCN-only components, Blau Tech white/light blue aesthetic, added component usage guide and layout examples |

---

## Notes for Implementation

**Before starting development:**
1. ✅ Validate Supabase schema matches requirements in Section 7.4
2. ✅ Confirm all required tables exist and have proper relationships
3. ✅ Set up RLS policies for data security
4. ✅ Create sample data for testing
5. ✅ Document any schema deviations in this PRD

**Supabase MCP Integration:**
- Use Supabase MCP to query and validate existing table structures
- Verify column names, data types, and foreign key relationships
- Check if additional tables or columns are needed
- Document actual schema in technical specification document

