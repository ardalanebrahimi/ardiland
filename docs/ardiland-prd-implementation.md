# Product Requirements Document (PRD)
## Ardiland Website — Implementation Specification

**Version:** 1.0  
**Author:** Ardalan Ebrahimi  
**Status:** Ready for Development

---

## 1. Executive Summary

This PRD specifies the implementation requirements for Ardiland's public website. The site establishes Ardiland as a founder-led engineering studio, showcases products and thinking, and enables future consulting and partnership conversations.

**Tech Stack Decision:** Angular frontend, Node.js backend, monorepo architecture.

---

## 2. Product Goals

### Primary Objectives
1. Communicate Ardiland's identity within 10 seconds of landing
2. Showcase products with transparency about their state
3. Present engineering thinking as timeless, concept-based essays
4. Enable low-friction contact for conversations
5. Support future evolution toward a company website

### Success Metrics
- Time to first meaningful content: < 2 seconds
- Clear CTA visibility on all pages
- Mobile performance score: > 90 (Lighthouse)
- Zero fake scale signals

---

## 3. User Stories

### Visitor (Engineering Leader / Founder)
- As a visitor, I want to understand what Ardiland does within seconds so I can decide if it's relevant to me
- As a visitor, I want to see real products with honest status indicators so I can assess credibility
- As a visitor, I want to read engineering perspectives that demonstrate senior thinking
- As a visitor, I want a frictionless way to start a conversation

### Admin (Founder)
- As the founder, I want to add/edit products without code changes
- As the founder, I want to publish essays with minimal friction
- As the founder, I want to update product status as they evolve
- As the founder, I want analytics on visitor behavior

---

## 4. Functional Requirements

### 4.1 Pages & Routes

| Route | Page | Priority |
|-------|------|----------|
| `/` | Home | P0 |
| `/products` | Products listing | P0 |
| `/products/:slug` | Product detail | P0 |
| `/thinking` | Essays listing | P0 |
| `/thinking/:slug` | Essay detail | P0 |
| `/about` | About | P0 |
| `/contact` | Contact / Let's talk | P0 |
| `/admin/*` | Admin panel | P1 |

### 4.2 Home Page

**Sections (in order):**

1. **Hero**
   - Primary positioning statement (h1)
   - Supporting copy (1-2 sentences)
   - Primary CTA: "Let's talk" → `/contact`
   - Secondary CTA: "See what we're building" → `/products`

2. **Products Preview**
   - Section title: "What we build"
   - Display 4 most recent/featured products
   - Link to full products page
   - Each card: name, one-liner, status badge

3. **Essays Preview**
   - Section title: "How we think"
   - Display 3 featured essays
   - Link to full essays page
   - Each item: title, summary

4. **Founder Context**
   - Light introduction block
   - Link to About page
   - No CV details

5. **Footer**
   - Copyright
   - Social links (GitHub, YouTube, LinkedIn)

### 4.3 Products Page

**Listing View:**
- Page title and introduction copy
- Grid layout (2 columns desktop, 1 mobile)
- Product cards with: name, description, status badge, "Learn more" link
- Filterable by status (optional P1)

**Status Types:**
- `live` — Shipped and operational
- `beta` — Functional, testing with users
- `in-progress` — Actively being built
- `experiment` — Exploring with intent

**Detail View (`/products/:slug`):**
- Back link to listing
- Product name + status badge
- Description
- Structured sections: Why it exists, The problem, Current state, What's next
- CTAs: Primary action (Try/Follow/Learn), GitHub link (optional)

### 4.4 Essays Page (Thinking)

**Listing View:**
- Page title and introduction copy
- Vertical list layout (not grid)
- Each essay: title, summary
- No dates displayed (timeless framing)
- Maximum 12 essays displayed

**Detail View (`/thinking/:slug`):**
- Back link to listing
- Essay title
- Full content (Markdown rendered)
- No author byline (implied)
- No comments or social sharing

### 4.5 About Page

**Content:**
- Founder photo (placeholder initially)
- Name and title
- Current role mention (Head of Engineering at KMS)
- Narrative bio (3-4 paragraphs)
- Link to Contact page

**Constraints:**
- No skill lists
- No full CV
- No buzzword stacking

### 4.6 Contact Page

**Content:**
- Page title: "Let's talk"
- Introduction copy (no-pressure framing)
- Two contact options:
  - Book a call (Calendly/Cal.com placeholder)
  - Send email (mailto or form)
- Closing statement (no sales pitch)

**P1 Enhancement:**
- Contact form with backend storage
- Email notification on submission

### 4.7 Admin Panel (P1)

**Features:**
- Authentication (simple, single-user)
- Products CRUD
- Essays CRUD (Markdown editor)
- Image upload for products/essays
- Preview before publish

---

## 5. Content Model

### Product
```
{
  id: string (UUID)
  slug: string (unique, URL-safe)
  name: string
  description: string (one-liner)
  status: 'live' | 'beta' | 'in-progress' | 'experiment'
  why: string (Markdown)
  problem: string (Markdown)
  currentState: string (Markdown)
  next: string (Markdown)
  ctaLabel: string (optional)
  ctaUrl: string (optional)
  githubUrl: string (optional)
  featured: boolean
  sortOrder: number
  createdAt: datetime
  updatedAt: datetime
}
```

### Essay
```
{
  id: string (UUID)
  slug: string (unique, URL-safe)
  title: string
  summary: string (1-2 sentences)
  content: string (Markdown)
  featured: boolean
  sortOrder: number
  createdAt: datetime
  updatedAt: datetime
}
```

### ContactSubmission (P1)
```
{
  id: string (UUID)
  name: string
  email: string
  message: string
  createdAt: datetime
  read: boolean
}
```

---

## 6. Non-Functional Requirements

### Performance
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Bundle size (initial): < 150KB gzipped

### SEO
- Server-side rendering or prerendering for all public pages
- Meta tags: title, description, og:image per page
- Sitemap.xml generation
- Semantic HTML throughout

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader friendly
- Color contrast ratios met

### Security
- HTTPS only
- CSP headers
- Admin authentication (P1)
- Input sanitization

---

## 7. Design Specifications

### Typography
- Font family: System font stack (no external fonts for performance)
- Headings: Medium weight (500)
- Body: Regular weight (400)
- Scale: 14/16/18/24/32/48px

### Colors
- Background: #FFFFFF
- Text primary: #111827 (gray-900)
- Text secondary: #6B7280 (gray-500)
- Border: #E5E7EB (gray-200)
- Status badges:
  - Live: #ECFDF5 bg, #047857 text
  - Beta: #FFFBEB bg, #B45309 text
  - In Progress: #EFF6FF bg, #1D4ED8 text
  - Experiment: #F5F3FF bg, #7C3AED text

### Spacing
- Base unit: 4px
- Section padding: 64px vertical
- Container max-width: 1024px (5xl)
- Content max-width: 768px (3xl) for prose

### Components
- Buttons: Rounded-full, 12px horizontal padding, 48px height
- Cards: 1px border, 12px radius, 24px padding
- Badges: Rounded-full, 8px horizontal padding, 12px font

---

## 8. Internationalization (Deferred)

- English is primary and only language for v1
- Architecture should support i18n addition later
- No hardcoded strings in components

---

## 9. Analytics (P1)

- Privacy-respecting analytics (Plausible, Fathom, or self-hosted)
- Track: page views, CTA clicks, product views
- No personally identifiable information

---

## 10. Deployment Requirements

- Hosting: Vercel, Railway, or similar
- Domain: ardiland.com (assumed)
- SSL: Required
- Environment separation: Development, Production

---

## 11. Out of Scope (v1)

- Multi-language support
- Blog/RSS feed
- Newsletter signup
- E-commerce/payments
- User accounts
- Comments system
- Search functionality

---

## 12. Implementation Phases

### Phase 1: Foundation (Week 1-2)
- Monorepo setup
- Angular app scaffold with routing
- Node.js API scaffold
- Database schema and migrations
- Basic styling system

### Phase 2: Public Pages (Week 2-3)
- Home page implementation
- Products listing and detail
- Essays listing and detail
- About page
- Contact page
- Responsive design

### Phase 3: Content & Polish (Week 3-4)
- Seed initial content
- SEO implementation
- Performance optimization
- Accessibility audit
- Deployment pipeline

### Phase 4: Admin (Week 4-5) — P1
- Authentication
- Admin dashboard
- Content management UI
- Image uploads

---

**End of PRD**
