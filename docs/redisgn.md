# Website Redesign Brief — Modern Manufacturing

## Design Reference

Use the provided reference image as the main visual inspiration. Redesign the existing website into a **modern, premium, editorial-style manufacturing company profile**.

The result should feel:

- Modern
- Premium
- Industrial
- Minimal
- Professional
- Technical
- Trustworthy
- International B2B

Do not copy the reference pixel-for-pixel. Recreate its **visual language, hierarchy, spacing, typography, image treatment, and composition** while adapting the design to the existing brand and content.

---

## 1. Visual Direction

### Core Style

Combine:

**Industrial + Editorial + Minimal + Technical + Premium**

Use:

- Large typography
- Generous whitespace
- Asymmetric layouts
- Large rounded images
- Black-and-white contrast
- Small orange/yellow accents
- Thin borders and subtle grid lines
- Editorial compositions
- Rounded cards
- Minimal pill-shaped buttons

Avoid:

- Generic corporate templates
- Excessive gradients
- Excessive shadows
- Glassmorphism
- Too many colors
- Dense text blocks
- Excessive rounded cards
- Unnecessary animations

---

## 2. Color System

```text
Black       #050505
White       #FFFFFF
Off White   #F7F7F5
Light Gray  #E8E8E5
Gray        #8A8A86
Dark Gray   #2B2B29
Accent      #F5A623
```

The orange/yellow accent should be used sparingly for:

- Small decorative marks
- CTA accents
- Icons
- Highlighted words
- Arrows
- Indicators
- Underlines

---

## 3. Typography

Typography must be one of the strongest visual elements.

### Hero

```css
font-size: clamp(64px, 9vw, 150px);
font-weight: 700-800;
line-height: 0.85-0.95;
letter-spacing: -0.06em;
```

Example:

```text
Crafting
Tomorrow
```

Use black for the primary word and gray for the secondary word when appropriate.

### Section Headings

```css
font-size: clamp(48px, 7vw, 100px);
font-weight: 700-800;
line-height: 0.9-1;
letter-spacing: -0.05em;
```

### Body

```css
font-size: 15px-18px;
line-height: 1.5-1.7;
```

### Small Labels

```css
font-size: 10px-12px;
font-weight: 600;
letter-spacing: 0.05em-0.12em;
```

---

## 4. Layout

Use a spacious editorial grid.

### Desktop

- Max-width: 1280px–1440px
- 12-column grid where useful
- 32px–48px horizontal padding
- Large vertical spacing
- Intentional asymmetry
- Images may overlap sections or text

### Tablet

- 24px–32px horizontal padding
- Simplify complex grids
- Reduce typography
- Preserve asymmetry when practical

### Mobile

- 16px–20px horizontal padding
- Single-column layout
- Large readable headings
- Prominent images
- Horizontal card scrolling where appropriate

Do not simply shrink the desktop design. Recompose it for mobile.

---

# 5. Navbar

Create a minimal floating/sticky navigation.

```text
[Logo]   Home   About   Services   Projects   [Contact]
```

Requirements:

- Small logo
- Minimal navigation
- Rounded CTA
- Sticky on scroll
- Subtle border/backdrop on scroll
- Clean mobile menu

---

# 6. Hero Section

Create a visually dominant hero inspired by the reference.

### Content

Large headline:

```text
Crafting
Tomorrow
```

Add:

- Short supporting text
- Primary CTA
- Small orange/yellow decorative accent

Example CTA:

```text
Start a Project →
```

### Hero Image

Place a large industrial/manufacturing photograph beneath or partially overlapping the hero.

Requirements:

- Wide image
- 24px–32px border radius
- High-quality photography
- Strong visual impact
- Minimal overlay

### Floating Information Card

Overlay a small white card on the image.

Example:

```text
Advanced CAD
and rapid
prototyping for
optimal results

Learn More About Our Process →
```

---

# 7. About / Trust Section

Create an editorial introduction.

Example:

```text
ABOUT US

Trusted partner for over 20 years
of industry excellence
```

Include:

- Company introduction
- Experience
- Expertise
- Industry focus

Add small circular images, customer logos, or team imagery.

Keep this section spacious and lightweight.

---

# 8. Statistics Section

Use an asymmetric image + typography layout.

Example:

```text
[Large Industrial Image]

10M+
Parts Manufactured

98%
On-Time Delivery
```

Statistics should be large and editorial.

Do not use traditional dashboard cards.

---

# 9. Services Section

Create a large black rounded section.

Example:

```text
OUR SERVICES

Comprehensive
Manufacturing
Services
```

On the right, use a service grid:

```text
01
Custom CNC Machining

02
Injection Molding

03
Metal Fabrication

04
Assembly & Packaging
```

Each service can include:

- Number
- Icon
- Title
- Short description

### Hover Interaction

Use subtle:

- Translation
- Accent highlight
- Border/indicator
- Arrow movement

Avoid excessive animation.

---

# 10. Customer Stories

Create an oversized editorial heading:

```text
Customer
Stories
```

Add supporting text beside it.

### Layout

Use:

- One large featured case study
- Smaller supporting case studies

Example:

```text
[Large Image]
Client / Project Name
Short Description
▶

[Image]
Client Name

[Image]
Client Name
```

Use large photography and minimal copy.

---

# 11. Project CTA

Create a spacious CTA section.

Example:

```text
Ready To Start
Your Project?
```

Supporting text:

```text
Let's build something precise,
efficient, and ready for tomorrow.
```

CTA:

```text
Start a Project →
```

Place small industrial images around the section for an editorial composition.

---

# 12. Blog / Insights

Create a large rounded section/card.

Heading:

```text
Building Tomorrow's
Success Stories
```

Include:

- Categories
- Articles
- Dates
- Short descriptions
- Arrow navigation

Possible categories:

```text
All
Engineering
Manufacturing
Technology
Company News
```

---

# 13. Newsletter

Place a simple newsletter block.

```text
Subscribe to
our newsletter

Get the latest insights,
projects, and manufacturing news.

[ Your email address                → ]
```

Use a clean rounded input.

---

# 14. Footer

Create a minimal footer.

### Content

```text
Company Logo
Short company description

Company
About
Services
Projects
Careers
Contact

Social
Instagram
LinkedIn
YouTube
```

Bottom:

```text
© 2026 Company Name
Privacy Policy
Terms & Conditions
```

Add subtle oversized background typography:

```text
MANUFACTURE
```

Use it as a decorative background element.

---

# 15. Image Direction

Photography should be a major part of the visual identity.

Prioritize:

- Manufacturing facilities
- Engineers
- CNC machines
- Industrial workers
- Production lines
- CAD/design work
- Machinery
- Product inspection
- Team collaboration

Image treatment:

- High quality
- Natural colors
- Strong composition
- Rounded corners
- Minimal filters
- Minimal overlays

Prefer real company photography over generic stock images.

---

# 16. Decorative Elements

Use subtle editorial details:

- Thin vertical grid lines
- Small orange arrows
- Small yellow accents
- Circular indicators
- Thin borders
- Oversized faded typography
- Small uppercase labels

Decorations should support the composition rather than compete with content.

---

# 17. Animation

Use premium, restrained animation.

Recommended:

- Fade-up on section entrance
- Image reveal
- Text stagger
- Smooth hover
- Slight card translation
- Carousel transitions
- Smooth scrolling
- Sticky navbar transition

Timing:

```text
UI hover: 200–500ms
Large entrance: 600–1000ms
```

Avoid:

- Bouncing
- Excessive parallax
- Large rotations
- Animation on every element
- Distracting loading effects

Support:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 18. Buttons

Use pill-shaped buttons.

### Primary

```css
background: #050505;
color: #FFFFFF;
border-radius: 999px;
```

### Accent

```css
background: #F5A623;
color: #050505;
border-radius: 999px;
```

Example:

```text
Start a Project →
```

Hover should use a subtle movement and arrow transition.

---

# 19. Border Radius

```text
Small cards:       12px–16px
Images:            20px–28px
Hero image:        24px–32px
Large sections:    24px–32px
Buttons:            999px
```

Keep the radius system consistent.

---

# 20. Responsive Structure

### Desktop

Use:

- Large typography
- Asymmetrical layouts
- Image overlaps
- Multi-column grids
- Editorial compositions

### Mobile

Recommended flow:

```text
Navbar
↓
Hero
↓
Hero Image
↓
About
↓
Trust Indicators
↓
Statistics
↓
Services
↓
Customer Stories
↓
Project CTA
↓
Insights
↓
Newsletter
↓
Footer
```

Cards can become horizontally scrollable where useful.

---

# 21. Accessibility

Implement:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Good color contrast
- Alt text
- Accessible buttons
- Proper form labels
- Reduced-motion support

---

# 22. Performance

Because the design is image-heavy:

- Use WebP/AVIF
- Use responsive images
- Lazy-load below-the-fold images
- Define image dimensions
- Optimize fonts
- Avoid unnecessary JavaScript animation libraries
- Optimize the hero image because it is above the fold

---

# 23. Component Structure

Suggested structure:

```text
Navbar
Hero
HeroImage
AboutSection
TrustIndicators
StatsSection
ServicesSection
ServiceCard
CustomerStories
CaseStudyCard
ProjectCTA
InsightsSection
ArticleCard
Newsletter
Footer
```

Use reusable, data-driven components.

Example:

```ts
const services = [
  {
    number: "01",
    title: "Custom CNC Machining",
    description: "...",
    icon: ...
  },
  {
    number: "02",
    title: "Injection Molding",
    description: "...",
    icon: ...
  }
];
```

---

# 24. Content Storytelling

The page should tell a clear story:

```text
Who we are
↓
Why customers trust us
↓
What we manufacture
↓
Our capabilities and achievements
↓
Customer stories
↓
Why customers should contact us
```

Every section should have a clear purpose.

---

# 25. Final Design Principles

### Typography First
Large typography drives the composition.

### Photography Second
Images should feel like editorial content rather than generic cards.

### Whitespace
Do not fill every empty area.

### Contrast
Alternate between:

- Off-white sections
- Black feature sections
- Large photography

### Controlled Accent
Use orange/yellow only for emphasis.

### Asymmetry
Avoid making every section a centered 50/50 layout.

### Premium Simplicity
Use fewer elements with stronger hierarchy.

### Consistency
Maintain the same spacing, radius, typography, buttons, and interaction language throughout the website.

---

# Final Goal

Transform the existing website into a **premium modern manufacturing company profile** inspired by the provided reference.

The final visual language should combine:

```text
INDUSTRIAL
+
EDITORIAL
+
MINIMAL
+
TECHNICAL
+
PREMIUM
```

Prioritize implementation in this order:

1. Visual hierarchy
2. Typography
3. Layout composition
4. Image quality
5. Responsive behavior
6. Interaction quality
7. Decorative details

The redesign should feel intentional, spacious, modern, and high-end rather than like a conventional corporate website.
