# PRD Delta: Ardiland Website v1 → v4

**Summary:** Evolution from static prototype to functional CMS-enabled application with dark mode, enhanced product pages, and full admin capabilities.

---

## 1. Theme & Appearance

| Aspect | v1 | v4 |
|--------|----|----|
| Default theme | Light only | Light (with toggle) |
| Dark mode | ❌ Not available | ✅ Full dark mode support |
| Theme toggle | — | Sun/moon icon in nav |
| Theme persistence | — | Respects system preference |

---

## 2. Navigation Changes

| Element | v1 | v4 |
|---------|----|----|
| "Let's talk" CTA | Bold button with background | Regular text link (de-emphasized) |
| Admin access | Not present | "Admin" pill in nav (when authenticated) |
| Section name | "Thinking" | "Essays" |

---

## 3. Homepage Changes

| Section | v1 | v4 |
|---------|----|----|
| YouTube "From the channel" | ✅ Dedicated section with 3 video previews | ❌ Removed entirely |
| YouTube mention | Prominent homepage feature | Moved to About page only (coaching/enablement context) |
| Products preview | Basic cards | Cards with sample images |
| Essays preview | Basic list | Unchanged |

---

## 4. Product Detail Page Enhancements

| Feature | v1 | v4 |
|---------|----|----|
| Layout | Single column, plain text sections | 2×2 grid cards for content sections |
| Product icon | Not present | Colored initials badge (e.g., "LU" for Luma) |
| Screenshots | Static gallery or none | **Image slider** with prev/next navigation + dot indicators |
| Live demo | Not present | Browser chrome frame with URL bar |
| Hero image | Not present | Full-width cover image |
| Tech stack | Plain text | Styled pill badges |

---

## 5. Admin Panel (New in v4)

### 5.1 Overview
- Full CRUD for Products and Essays
- Tab-based navigation (Products, Essays, Messages)
- Item counts per tab
- Session-based state (changes persist in session)

### 5.2 Product Editor Dialog

| Feature | Description |
|---------|-------------|
| Layout | Two-column form |
| Icon selector | 2-character initials input + 6-color picker with live preview |
| Cover image | Click-to-upload with preview and remove |
| Screenshots | Multi-image grid with add/remove per image |
| Fields | Name, description, status (dropdown), why, problem, current state, what's next, CTA label, tech stack (comma-separated) |
| Status options | Live, Beta, In Progress, Experiment |

### 5.3 Essay Editor Dialog

| Feature | Description |
|---------|-------------|
| Rich text editor | WYSIWYG with toolbar |
| Toolbar actions | Bold, Italic, H2, H3, Bullet list, Numbered list, Blockquote, Code block |
| Fields | Title, summary, content (rich text) |
| Content storage | HTML format |
| Rendering | Essay detail page renders HTML content |

---

## 6. Component Additions

| Component | Purpose |
|-----------|---------|
| `ImageSlider` | Screenshot carousel with navigation |
| `RichTextEditor` | WYSIWYG editor using contentEditable |
| `ImageUpload` | Drag/click upload with preview |
| `IconSelector` | Initials + color picker for product icons |
| `ProductDialog` | Full product edit modal |
| `EssayDialog` | Full essay edit modal |
| `ProductIcon` | Colored initials display |

---

## 7. Data Model Changes

### Product (v4 additions)
```diff
+ icon: {
+   initials: string (2 chars)
+   color: string (Tailwind class)
+ }
+ image: string (base64 or URL)
+ screenshots: string[] (base64 or URLs)
```

### Essay (v4 changes)
```diff
- content: string (plain text with \n\n)
+ content: string (HTML from rich text editor)
```

---

## 8. About Page Changes

| Aspect | v1 | v4 |
|--------|----|----|
| YouTube reference | Not mentioned | Added paragraph on content creation |
| Framing | — | Coaching, consulting, enablement, giving back to community |

**New copy added:**
> "Beyond building, I'm passionate about giving back to the community. I create educational content on software engineering — covering architecture patterns, development practices, and lessons from production systems. This is part of a broader commitment to coaching and enablement, helping other engineers and teams grow their capabilities and ship better software."

---

## 9. Removed Features

| Feature | Reason |
|---------|--------|
| YouTube homepage section | Not relevant for English-speaking audience (channel is Persian) |
| Bold "Let's talk" button | Too aggressive for tone |
| "Thinking" nomenclature | Ambiguous; "Essays" is clearer |

---

## 10. Technical Changes

| Aspect | v1 | v4 |
|--------|----|----|
| State management | Static data | `useState` with lifting for products/essays |
| Image handling | External URLs only | Base64 upload support |
| Content format | Plain text | HTML (essays) |
| Theme | Hardcoded light | Dynamic with `useDarkMode` hook |

---

## 11. Visual/UX Improvements

- Product cards now show cover images
- Consistent dark mode across all components
- Modal dialogs with proper headers, scroll areas, and footer actions
- Form inputs with proper labels and spacing
- Color-coded status badges adapt to light/dark themes
- Screenshot slider replaces static grid

---

## Summary of Scope Change

| Metric | v1 | v4 |
|--------|----|----|
| Pages | 5 + detail views | 5 + detail views + admin |
| Interactive features | Navigation only | Full CMS capabilities |
| Theme support | Light | Light + Dark |
| Admin functions | None | Create, Read, Update, Delete |
| Rich text | None | Full WYSIWYG editor |
| Image management | None | Upload, preview, remove |

---

**End of Delta PRD**
